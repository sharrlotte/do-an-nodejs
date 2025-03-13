import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getSession } from 'src/services/auth/auth.utils';
import { Authorities } from 'src/shared/decorator/authority.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const authorities = this.reflector.get(Authorities, context.getHandler());

    if (!authorities) {
      throw new Error('No authorities registered');
    }

    const request = context.switchToHttp().getRequest();
    const user = getSession(request);

    const hasAuthority = authorities.every((authorities) => user.authorities.includes(authorities));

    if (!hasAuthority) {
      throw new ForbiddenException("You don't have authority required");
    }

    return true;
  }
}
