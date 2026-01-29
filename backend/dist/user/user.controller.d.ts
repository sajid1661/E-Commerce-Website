import { UserService } from "./user.service";
import { RegisterDto, LoginDto, AdminLoginDto } from "./user.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(registerDto: RegisterDto): Promise<{
        success: boolean;
        token?: string;
        message?: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        token?: string;
        message?: string;
    }>;
    adminLogin(adminLoginDto: AdminLoginDto): Promise<{
        success: boolean;
        token?: string;
        message?: string;
    }>;
}
