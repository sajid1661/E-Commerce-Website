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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const product_service_1 = require("./product.service");
const product_dto_1 = require("./product.dto");
const admin_auth_guard_1 = require("../guards/admin-auth.guard");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async addProduct(addProductDto, files) {
        const allFiles = [
            files.image1?.[0],
            files.image2?.[0],
            files.image3?.[0],
            files.image4?.[0],
        ].filter(Boolean);
        return this.productService.addProduct(addProductDto, allFiles);
    }
    async removeProduct(removeProductDto) {
        return this.productService.removeProduct(removeProductDto);
    }
    async singleProduct(singleProductDto) {
        return this.productService.singleProduct(singleProductDto);
    }
    async listProducts() {
        return this.productService.listProducts();
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)("add"),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "image1", maxCount: 1 },
        { name: "image2", maxCount: 1 },
        { name: "image3", maxCount: 1 },
        { name: "image4", maxCount: 1 },
    ])),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.AddProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Post)("remove"),
    (0, common_1.UseGuards)(admin_auth_guard_1.AdminAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.RemoveProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "removeProduct", null);
__decorate([
    (0, common_1.Post)("single"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.SingleProductDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "singleProduct", null);
__decorate([
    (0, common_1.Get)("list"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "listProducts", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)("product"),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map