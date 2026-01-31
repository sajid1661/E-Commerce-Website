import { Model } from "mongoose";
import { ProductDocument } from "./product.schema";
import { AddProductDto, RemoveProductDto, SingleProductDto } from "./product.dto";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
export declare class ProductService {
    private productModel;
    private cloudinaryService;
    constructor(productModel: Model<ProductDocument>, cloudinaryService: CloudinaryService);
    addProduct(addProductDto: AddProductDto, files: any[]): Promise<{
        success: boolean;
        message: string;
    }>;
    listProducts(): Promise<{
        success: boolean;
        products?: any[];
        message?: string;
    }>;
    removeProduct(removeProductDto: RemoveProductDto): Promise<{
        success: boolean;
        message: string;
    }>;
    singleProduct(singleProductDto: SingleProductDto): Promise<{
        success: boolean;
        product?: any;
        message?: string;
    }>;
}
