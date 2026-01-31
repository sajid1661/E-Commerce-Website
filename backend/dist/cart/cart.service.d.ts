import { Model } from "mongoose";
import { UserDocument } from "../user/user.schema";
import { AddToCartDto, UpdateCartDto, GetUserCartDto } from "./cart.dto";
export declare class CartService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    addToCart(addToCartDto: AddToCartDto): Promise<{
        success: boolean;
        message: string;
    }>;
    updateCart(updateCartDto: UpdateCartDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getUserCart(getUserCartDto: GetUserCartDto): Promise<{
        success: boolean;
        cartData?: any;
        message?: string;
    }>;
}
