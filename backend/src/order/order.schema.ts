import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop({ type: [Object], required: true })
  items: any[];

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Object, required: true })
  address: any;

  @Prop({ required: true, default: "Order Placed" })
  status: string;

  @Prop({ required: true })
  paymentMethod: string;

  @Prop({ required: true, default: false })
  payment: boolean;

  @Prop({ required: true })
  date: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
