import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';
import { User, UserDocument } from '../user/user.schema';
import { PlaceOrderDto, PlaceOrderStripeDto, VerifyStripeDto, UserOrdersDto, UpdateStatusDto } from './order.dto';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderService {
  private stripe: Stripe;
  private currency = 'eur';
  private deliveryCharge = 10;

  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'));
  }

  async placeOrder(placeOrderDto: PlaceOrderDto): Promise<{ success: boolean; message: string }> {
    try {
      const { userId, items, amount, address } = placeOrderDto;

      const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod: 'COD',
        payment: false,
        date: Date.now(),
      };

      const newOrder = new this.orderModel(orderData);
      await newOrder.save();
      await this.userModel.findByIdAndUpdate(userId, { cartData: {} });

      return { success: true, message: 'Order Placed' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async placeOrderStripe(placeOrderStripeDto: PlaceOrderStripeDto, origin: string): Promise<{ success: boolean; session_url: string }> {
    try {
      const { userId, items, amount, address } = placeOrderStripeDto;

      const orderData = {
        userId,
        items,
        address,
        amount,
        paymentMethod: 'Stripe',
        payment: false,
        date: Date.now(),
      };

      const newOrder = new this.orderModel(orderData);
      await newOrder.save();

      const line_items = items.map((item) => ({
        price_data: {
          currency: this.currency,
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }));

      line_items.push({
        price_data: {
          currency: this.currency,
          product_data: {
            name: 'Delivery Charge',
          },
          unit_amount: this.deliveryCharge * 100,
        },
        quantity: 1,
      });

      const session = await this.stripe.checkout.sessions.create({
        success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
        line_items,
        mode: 'payment',
      });

      return { success: true, session_url: session.url };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async verifyStripe(verifyStripeDto: VerifyStripeDto): Promise<{ success: boolean }> {
    const { orderId, success, userId } = verifyStripeDto;
    try {
      if (success === 'true') {
        await this.orderModel.findByIdAndUpdate(orderId, { payment: true });
        await this.userModel.findByIdAndUpdate(userId, { cartData: {} });
        return { success: true };
      } else {
        await this.orderModel.findByIdAndDelete(orderId);
        return { success: false };
      }
    } catch (error) {
      return { success: false };
    }
  }

  async placeOrderRazorpay(): Promise<any> {
    // Implement Razorpay logic
    return { success: false, message: 'Not implemented' };
  }

  async allOrders(): Promise<{ success: boolean; orders?: any[]; message?: string }> {
    try {
      const orders = await this.orderModel.find({});
      return { success: true, orders };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async userOrders(userOrdersDto: UserOrdersDto): Promise<{ success: boolean; orders?: any[]; message?: string }> {
    try {
      const { userId } = userOrdersDto;
      const orders = await this.orderModel.find({ userId });
      return { success: true, orders };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async updateStatus(updateStatusDto: UpdateStatusDto): Promise<{ success: boolean; message: string }> {
    try {
      const { orderId, status } = updateStatusDto;
      await this.orderModel.findByIdAndUpdate(orderId, { status });
      return { success: true, message: 'Status Updated' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}