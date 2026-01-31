import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from "cloudinary";

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>("CLOUD_NAME"),
      api_key: this.configService.get<string>("CLOUD_API_KEY"),
      api_secret: this.configService.get<string>("CLOUD_API_SECRET"),
    });
  }

  async uploadImage(filePath: string): Promise<string> {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });
    return result.secure_url;
  }
}
