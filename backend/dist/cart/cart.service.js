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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../user/user.schema");
let CartService = class CartService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async addToCart(addToCartDto) {
        try {
            const { userId, itemId, size } = addToCartDto;
            const userData = await this.userModel.findById(userId);
            const cartData = userData.cartData || {};
            if (cartData[itemId]) {
                if (cartData[itemId][size]) {
                    cartData[itemId][size] += 1;
                }
                else {
                    cartData[itemId][size] = 1;
                }
            }
            else {
                cartData[itemId] = {};
                cartData[itemId][size] = 1;
            }
            await this.userModel.findByIdAndUpdate(userId, { cartData });
            return { success: true, message: "Added To Cart" };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async updateCart(updateCartDto) {
        try {
            const { userId, itemId, size, quantity } = updateCartDto;
            const userData = await this.userModel.findById(userId);
            const cartData = userData.cartData || {};
            cartData[itemId][size] = quantity;
            await this.userModel.findByIdAndUpdate(userId, { cartData });
            return { success: true, message: "Cart Updated" };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async getUserCart(getUserCartDto) {
        try {
            const { userId } = getUserCartDto;
            const userData = await this.userModel.findById(userId);
            const cartData = userData.cartData || {};
            return { success: true, cartData };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CartService);
//# sourceMappingURL=cart.service.js.map