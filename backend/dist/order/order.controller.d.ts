import { OrderService } from './order.service';
import { PlaceOrderDto, PlaceOrderStripeDto, VerifyStripeDto, UserOrdersDto, UpdateStatusDto } from './order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    placeOrder(placeOrderDto: PlaceOrderDto): Promise<{
        success: boolean;
        message: string;
    }>;
    placeOrderStripe(placeOrderStripeDto: PlaceOrderStripeDto, origin: string): Promise<{
        success: boolean;
        session_url: string;
    }>;
    placeOrderRazorpay(): Promise<any>;
    verifyStripe(verifyStripeDto: VerifyStripeDto): Promise<{
        success: boolean;
    }>;
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
