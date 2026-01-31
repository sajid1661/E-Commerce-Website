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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const order_dto_1 = require("./order.dto");
const user_auth_guard_1 = require("../guards/user-auth.guard");
const admin_auth_guard_1 = require("../guards/admin-auth.guard");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async placeOrder(placeOrderDto) {
        return this.orderService.placeOrder(placeOrderDto);
    }
    async placeOrderStripe(placeOrderStripeDto, origin) {
        return this.orderService.placeOrderStripe(placeOrderStripeDto, origin);
    }
    async placeOrderRazorpay() {
        return this.orderService.placeOrderRazorpay();
    }
    async verifyStripe(verifyStripeDto) {
        return this.orderService.verifyStripe(verifyStripeDto);
    }
    async allOrders() {
        return this.orderService.allOrders();
    }
    async userOrders(userOrdersDto) {
        return this.orderService.userOrders(userOrdersDto);
    }
    async updateStatus(updateStatusDto) {
        return this.orderService.updateStatus(updateStatusDto);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)("place"),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.PlaceOrderDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "placeOrder", null);
__decorate([
    (0, common_1.Post)("stripe"),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)("origin")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.PlaceOrderStripeDto, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "placeOrderStripe", null);
__decorate([
    (0, common_1.Post)("razorpay"),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "placeOrderRazorpay", null);
__decorate([
    (0, common_1.Post)("verifyStripe"),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.VerifyStripeDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "verifyStripe", null);
__decorate([
    (0, common_1.Post)("list"),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "allOrders", null);
__decorate([
    (0, common_1.Post)("userorders"),
    (0, common_1.UseGuards)(user_auth_guard_1.UserAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.UserOrdersDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "userOrders", null);
__decorate([
    (0, common_1.Post)("status"),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.UpdateStatusDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "updateStatus", null);
exports.OrderController = OrderController = __decorate([
    (0, common_1.Controller)("order"),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map