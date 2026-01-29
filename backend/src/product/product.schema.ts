import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: [String], required: true })
  image: string[];

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  subCategory: string;

  @Prop({ type: [String], required: true })
  sizes: string[];

  @Prop()
  bestseller?: boolean;

  @Prop({ required: true })
  date: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
