import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ProductService } from "./product.service";
import {
  AddProductDto,
  RemoveProductDto,
  SingleProductDto,
} from "./product.dto";
import { AdminAuthGuard } from "../guards/admin-auth.guard";

@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("add")
  @UseGuards(AdminAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: "image1", maxCount: 1 },
      { name: "image2", maxCount: 1 },
      { name: "image3", maxCount: 1 },
      { name: "image4", maxCount: 1 },
    ]),
  )
  async addProduct(
    @Body() addProductDto: AddProductDto,
    @UploadedFiles()
    files: { image1?: any[]; image2?: any[]; image3?: any[]; image4?: any[] },
  ) {
    const allFiles = [
      files.image1?.[0],
      files.image2?.[0],
      files.image3?.[0],
      files.image4?.[0],
    ].filter(Boolean);
    return this.productService.addProduct(addProductDto, allFiles);
  }

  @Post("remove")
  @UseGuards(AdminAuthGuard)
  async removeProduct(@Body() removeProductDto: RemoveProductDto) {
    return this.productService.removeProduct(removeProductDto);
  }

  @Post("single")
  async singleProduct(@Body() singleProductDto: SingleProductDto) {
    return this.productService.singleProduct(singleProductDto);
  }

  @Get("list")
  async listProducts() {
    return this.productService.listProducts();
  }
}
