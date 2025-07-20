import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: any, context: any) {
    // You can throw an exception based on either "info" or "err" arguments
    const request = context.switchToHttp().getRequest();
    if (request.originalUrl === '/auth/me' && !user) {
      return { id: 0 };
    }
    if (err || !user) {
      throw err || new UnauthorizedException('Must be logged in!');
    }
    return user;
  }
}
