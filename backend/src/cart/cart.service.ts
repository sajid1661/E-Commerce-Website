import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/user.schema';
import { AddToCartDto, UpdateCartDto, GetUserCartDto } from './cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async addToCart(addToCartDto: AddToCartDto): Promise<{ success: boolean; message: string }> {
    try {
      const { userId, itemId, size } = addToCartDto;
      const userData = await this.userModel.findById(userId);
      let cartData = userData.cartData || {};

      if (cartData[itemId]) {
        if (cartData[itemId][size]) {
          cartData[itemId][size] += 1;
        } else {
          cartData[itemId][size] = 1;
        }
      } else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
      }

      await this.userModel.findByIdAndUpdate(userId, { cartData });
      return { success: true, message: 'Added To Cart' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async updateCart(updateCartDto: UpdateCartDto): Promise<{ success: boolean; message: string }> {
    try {
      const { userId, itemId, size, quantity } = updateCartDto;
      const userData = await this.userModel.findById(userId);
      let cartData = userData.cartData || {};

      cartData[itemId][size] = quantity;
      await this.userModel.findByIdAndUpdate(userId, { cartData });
      return { success: true, message: 'Cart Updated' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async getUserCart(getUserCartDto: GetUserCartDto): Promise<{ success: boolean; cartData?: any; message?: string }> {
    try {
      const { userId } = getUserCartDto;
      const userData = await this.userModel.findById(userId);
      let cartData = userData.cartData || {};
      return { success: true, cartData };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}