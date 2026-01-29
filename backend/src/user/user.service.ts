import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./user.schema";
import { RegisterDto, LoginDto, AdminLoginDto } from "./user.dto";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private configService: ConfigService,
  ) {}

  private createToken(id: string): string {
    return jwt.sign({ id }, this.configService.get<string>("JWT_SECRET"));
  }

  async register(
    registerDto: RegisterDto,
  ): Promise<{ success: boolean; token?: string; message?: string }> {
    try {
      const { name, email, password } = registerDto;

      const exists = await this.userModel.findOne({ email });
      if (exists) {
        return { success: false, message: "User already exists" };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new this.userModel({
        name,
        email,
        password: hashedPassword,
      });

      const user = await newUser.save();
      const token = this.createToken(user._id.toString());

      return { success: true, token };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ success: boolean; token?: string; message?: string }> {
    try {
      const { email, password } = loginDto;

      const user = await this.userModel.findOne({ email });
      if (!user) {
        return { success: false, message: "User doesn't exist" };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = this.createToken(user._id.toString());
        return { success: true, token };
      } else {
        return { success: false, message: "Invalid email or password" };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  async adminLogin(
    adminLoginDto: AdminLoginDto,
  ): Promise<{ success: boolean; token?: string; message?: string }> {
    try {
      const { email, password } = adminLoginDto;
      if (
        email === this.configService.get<string>("ADMIN_EMAIL") &&
        password === this.configService.get<string>("ADMIN_PASSWORD")
      ) {
        const token = jwt.sign(
          email + password,
          this.configService.get<string>("JWT_SECRET"),
        );
        return { success: true, token };
      } else {
        return { success: false, message: "Invalid email or password" };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
