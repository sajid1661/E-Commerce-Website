"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./order.schema");
const user_schema_1 = require("../user/user.schema");
const stripe_1 = require("stripe");
const config_1 = require("@nestjs/config");
let OrderService = class OrderService {
    constructor(orderModel, userModel, configService) {
        this.orderModel = orderModel;
        this.userModel = userModel;
        this.configService = configService;
        this.currency = 'eur';
        this.deliveryCharge = 10;
        this.stripe = new stripe_1.default(this.configService.get('STRIPE_SECRET_KEY'));
    }
    async placeOrder(placeOrderDto) {
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
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async placeOrderStripe(placeOrderStripeDto, origin) {
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
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async verifyStripe(verifyStripeDto) {
        const { orderId, success, userId } = verifyStripeDto;
        try {
            if (success === 'true') {
                await this.orderModel.findByIdAndUpdate(orderId, { payment: true });
                await this.userModel.findByIdAndUpdate(userId, { cartData: {} });
                return { success: true };
            }
            else {
                await this.orderModel.findByIdAndDelete(orderId);
                return { success: false };
            }
        }
        catch (error) {
            return { success: false };
        }
    }
    async placeOrderRazorpay() {
        return { success: false, message: 'Not implemented' };
    }
    async allOrders() {
        try {
            const orders = await this.orderModel.find({});
            return { success: true, orders };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async userOrders(userOrdersDto) {
        try {
            const { userId } = userOrdersDto;
            const orders = await this.orderModel.find({ userId });
            return { success: true, orders };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async updateStatus(updateStatusDto) {
        try {
            const { orderId, status } = updateStatusDto;
            await this.orderModel.findByIdAndUpdate(orderId, { status });
            return { success: true, message: 'Status Updated' };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        config_1.ConfigService])
], OrderService);
//# sourceMappingURL=order.service.js.map