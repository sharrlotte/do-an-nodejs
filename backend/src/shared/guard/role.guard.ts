import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getSession } from 'src/services/auth/auth.utils';
import { Roles } from 'src/shared/decorator/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      throw new Error('No roles registered');
    }

    const request = context.switchToHttp().getRequest();
    const user = getSession(request);

    const hasRole = roles.every((role) => user.roles.includes(role));

    if (!hasRole) {
      throw new ForbiddenException("You don't have role required");
    }

    return true;
  }
}
