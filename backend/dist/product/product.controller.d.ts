import { ProductService } from './product.service';
import { AddProductDto, RemoveProductDto, SingleProductDto } from './product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    addProduct(addProductDto: AddProductDto, files: {
        image1?: any[];
        image2?: any[];
        image3?: any[];
        image4?: any[];
    }): Promise<{
        success: boolean;
        message: string;
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
    listProducts(): Promise<{
        success: boolean;
        products?: any[];
        message?: string;
    }>;
}
