import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token =
      request.headers.authorization?.split(" ")[1] ||
      request.headers.token ||
      request.body.token;

    if (!token) {
      throw new UnauthorizedException("Not Authorized, Login Again");
    }

    try {
      const decoded = jwt.verify(
        token,
        this.configService.get<string>("JWT_SECRET"),
      ) as JwtPayload;
      request.body.userId = decoded.id;
      return true;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
