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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./product.schema");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
let ProductService = class ProductService {
    constructor(productModel, cloudinaryService) {
        this.productModel = productModel;
        this.cloudinaryService = cloudinaryService;
    }
    async addProduct(addProductDto, files) {
        try {
            const { name, description, price, category, subCategory, sizes, bestseller, } = addProductDto;
            const images = files.filter((file) => file);
            const imagesUrl = await Promise.all(images.map(async (file) => {
                return await this.cloudinaryService.uploadImage(file.path);
            }));
            const productData = {
                name,
                description,
                price: Number(price),
                category,
                subCategory,
                bestseller: bestseller || false,
                sizes,
                image: imagesUrl,
                date: Date.now(),
            };
            const product = new this.productModel(productData);
            await product.save();
            return { success: true, message: "Product added" };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async listProducts() {
        try {
            const products = await this.productModel.find({});
            return { success: true, products };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async removeProduct(removeProductDto) {
        try {
            await this.productModel.findByIdAndDelete(removeProductDto.id);
            return { success: true, message: "Product removed" };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async singleProduct(singleProductDto) {
        try {
            const product = await this.productModel.findById(singleProductDto.productId);
            return { success: true, product };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cloudinary_service_1.CloudinaryService])
], ProductService);
//# sourceMappingURL=product.service.js.map