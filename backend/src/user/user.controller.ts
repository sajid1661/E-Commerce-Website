import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterDto, LoginDto, AdminLoginDto } from "./user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Post("admin")
  async adminLogin(@Body() adminLoginDto: AdminLoginDto) {
    return this.userService.adminLogin(adminLoginDto);
  }
}
