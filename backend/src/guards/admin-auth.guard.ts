import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1] || request.body.token;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decoded = jwt.verify(token, this.configService.get<string>('JWT_SECRET'));
      // For admin, check if it's admin token (simple check)
      if (typeof decoded === 'string') {
        // Admin token is email+password signed
        return true;
      }
      return false;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}