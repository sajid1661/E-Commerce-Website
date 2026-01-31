"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
let UserService = class UserService {
    constructor(userModel, configService) {
        this.userModel = userModel;
        this.configService = configService;
    }
    createToken(id) {
        return jwt.sign({ id }, this.configService.get("JWT_SECRET"));
    }
    async register(registerDto) {
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
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async login(loginDto) {
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
            }
            else {
                return { success: false, message: "Invalid email or password" };
            }
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
    async adminLogin(adminLoginDto) {
        try {
            const { email, password } = adminLoginDto;
            if (email === this.configService.get("ADMIN_EMAIL") &&
                password === this.configService.get("ADMIN_PASSWORD")) {
                const token = jwt.sign(email + password, this.configService.get("JWT_SECRET"));
                return { success: true, token };
            }
            else {
                return { success: false, message: "Invalid email or password" };
            }
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map