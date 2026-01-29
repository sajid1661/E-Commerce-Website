import { CartService } from "./cart.service";
import { AddToCartDto, UpdateCartDto, GetUserCartDto } from "./cart.dto";
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
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
