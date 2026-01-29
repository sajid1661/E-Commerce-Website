import { Model } from 'mongoose';
import { OrderDocument } from './order.schema';
import { UserDocument } from '../user/user.schema';
import { PlaceOrderDto, PlaceOrderStripeDto, VerifyStripeDto, UserOrdersDto, UpdateStatusDto } from './order.dto';
import { ConfigService } from '@nestjs/config';
export declare class OrderService {
    private orderModel;
    private userModel;
    private configService;
    private stripe;
    private currency;
    private deliveryCharge;
    constructor(orderModel: Model<OrderDocument>, userModel: Model<UserDocument>, configService: ConfigService);
    placeOrder(placeOrderDto: PlaceOrderDto): Promise<{
        success: boolean;
        message: string;
    }>;
    placeOrderStripe(placeOrderStripeDto: PlaceOrderStripeDto, origin: string): Promise<{
        success: boolean;
        session_url: string;
    }>;
    verifyStripe(verifyStripeDto: VerifyStripeDto): Promise<{
        success: boolean;
    }>;
    placeOrderRazorpay(): Promise<any>;
    allOrders(): Promise<{
        success: boolean;
        orders?: any[];
        message?: string;
    }>;
    userOrders(userOrdersDto: UserOrdersDto): Promise<{
        success: boolean;
        orders?: any[];
        message?: string;
    }>;
    updateStatus(updateStatusDto: UpdateStatusDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
