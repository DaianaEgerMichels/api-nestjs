import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/isPublic';
import { InvalidAccessTokenException } from 'src/exceptions/invalidAccessToken.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // code get docs nestjs
  // https://docs.nestjs.com/recipes/passport#implement-protected-route-and-jwt-strategy-guards

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleRequest(err, user) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new InvalidAccessTokenException();
    }
    return user;
  }
}
