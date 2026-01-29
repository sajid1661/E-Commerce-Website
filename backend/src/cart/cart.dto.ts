import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class AddToCartDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsString()
  @IsNotEmpty()
  size: string;
}

export class UpdateCartDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsNumber()
  quantity: number;
}

export class GetUserCartDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}