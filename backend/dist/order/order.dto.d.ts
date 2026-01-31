export declare class PlaceOrderDto {
    userId: string;
    items: any[];
    amount: number;
    address: any;
}
export declare class PlaceOrderStripeDto extends PlaceOrderDto {
}
export declare class VerifyStripeDto {
    orderId: string;
    success: string;
    userId: string;
}
export declare class AllOrdersDto {
}
export declare class UserOrdersDto {
    userId: string;
}
export declare class UpdateStatusDto {
    orderId: string;
    status: string;
}
