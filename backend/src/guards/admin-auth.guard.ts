import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['token'];

    if (!token) {
      throw new UnauthorizedException('Not Authorized Login Again');
    }

    try {
      const token_decode = jwt.verify(token, this.configService.get<string>('JWT_SECRET'));
      const adminKey = this.configService.get<string>('ADMIN_EMAIL') + this.configService.get<string>('ADMIN_PASSWORD');
      if (token_decode !== adminKey) {
        throw new UnauthorizedException('Not Authorized Login Again');
      }
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}