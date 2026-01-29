import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { RegisterDto, LoginDto, AdminLoginDto } from './user.dto';
import { ConfigService } from '@nestjs/config';
export declare class UserService {
    private userModel;
    private configService;
    constructor(userModel: Model<UserDocument>, configService: ConfigService);
    private createToken;
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
