export declare class AddProductDto {
    name: string;
    description: string;
    price: number;
    category: string;
    subCategory: string;
    sizes: string[];
    bestseller?: boolean;
}
export declare class RemoveProductDto {
    id: string;
}
export declare class SingleProductDto {
    productId: string;
}
