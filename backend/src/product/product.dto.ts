import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class AddProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  subCategory: string;

  @IsArray()
  @IsString({ each: true })
  sizes: string[];

  @IsOptional()
  @IsBoolean()
  bestseller?: boolean;
}

export class RemoveProductDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}

export class SingleProductDto {
  @IsString()
  @IsNotEmpty()
  productId: string;
}
