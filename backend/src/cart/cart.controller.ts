import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { CartService } from "./cart.service";
import { AddToCartDto, UpdateCartDto, GetUserCartDto } from "./cart.dto";
import { UserAuthGuard } from "../guards/user-auth.guard";

@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post("add")
  @UseGuards(UserAuthGuard)
  async addToCart(@Body() addToCartDto: AddToCartDto) {
    return this.cartService.addToCart(addToCartDto);
  }

  @Post("update")
  @UseGuards(UserAuthGuard)
  async updateCart(@Body() updateCartDto: UpdateCartDto) {
    return this.cartService.updateCart(updateCartDto);
  }

  @Post("get")
  @UseGuards(UserAuthGuard)
  async getUserCart(@Body() getUserCartDto: GetUserCartDto) {
    return this.cartService.getUserCart(getUserCartDto);
  }
}
