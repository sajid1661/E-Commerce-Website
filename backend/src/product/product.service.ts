import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Product, ProductDocument } from "./product.schema";
import {
  AddProductDto,
  RemoveProductDto,
  SingleProductDto,
} from "./product.dto";
import { CloudinaryService } from "../cloudinary/cloudinary.service";

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async addProduct(
    addProductDto: AddProductDto,
    files: any[],
  ): Promise<{ success: boolean; message: string }> {
    try {
      const {
        name,
        description,
        price,
        category,
        subCategory,
        sizes,
        bestseller,
      } = addProductDto;

      const images = files.filter((file) => file);
      const imagesUrl = await Promise.all(
        images.map(async (file) => {
          return await this.cloudinaryService.uploadImage(file.path);
        }),
      );

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
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async listProducts(): Promise<{
    success: boolean;
    products?: any[];
    message?: string;
  }> {
    try {
      const products = await this.productModel.find({});
      return { success: true, products };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async removeProduct(
    removeProductDto: RemoveProductDto,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.productModel.findByIdAndDelete(removeProductDto.id);
      return { success: true, message: "Product removed" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async singleProduct(
    singleProductDto: SingleProductDto,
  ): Promise<{ success: boolean; product?: any; message?: string }> {
    try {
      const product = await this.productModel.findById(
        singleProductDto.productId,
      );
      return { success: true, product };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
