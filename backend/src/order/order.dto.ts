import { IsArray, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class PlaceOrderDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  items: any[];

  @IsNumber()
  amount: number;

  @IsObject()
  address: any;
}

export class PlaceOrderStripeDto extends PlaceOrderDto {}

export class VerifyStripeDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  success: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class AllOrdersDto {} // No body needed, but for consistency

export class UserOrdersDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class UpdateStatusDto {
  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}