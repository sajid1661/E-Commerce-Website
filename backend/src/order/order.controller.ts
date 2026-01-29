import { Controller, Post, Body, UseGuards, Headers } from '@nestjs/common';
import { OrderService } from './order.service';
import { PlaceOrderDto, PlaceOrderStripeDto, VerifyStripeDto, UserOrdersDto, UpdateStatusDto } from './order.dto';
import { UserAuthGuard } from '../guards/user-auth.guard';
import { AdminAuthGuard } from '../guards/admin-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('place')
  @UseGuards(UserAuthGuard)
  async placeOrder(@Body() placeOrderDto: PlaceOrderDto) {
    return this.orderService.placeOrder(placeOrderDto);
  }

  @Post('stripe')
  @UseGuards(UserAuthGuard)
  async placeOrderStripe(@Body() placeOrderStripeDto: PlaceOrderStripeDto, @Headers('origin') origin: string) {
    return this.orderService.placeOrderStripe(placeOrderStripeDto, origin);
  }

  @Post('razorpay')
  @UseGuards(UserAuthGuard)
  async placeOrderRazorpay() {
    return this.orderService.placeOrderRazorpay();
  }

  @Post('verifyStripe')
  @UseGuards(UserAuthGuard)
  async verifyStripe(@Body() verifyStripeDto: VerifyStripeDto) {
    return this.orderService.verifyStripe(verifyStripeDto);
  }

  @Post('list')
  @UseGuards(AdminAuthGuard)
  async allOrders() {
    return this.orderService.allOrders();
  }

  @Post('userorders')
  @UseGuards(UserAuthGuard)
  async userOrders(@Body() userOrdersDto: UserOrdersDto) {
    return this.orderService.userOrders(userOrdersDto);
  }

  @Post('status')
  @UseGuards(AdminAuthGuard)
  async updateStatus(@Body() updateStatusDto: UpdateStatusDto) {
    return this.orderService.updateStatus(updateStatusDto);
  }
}