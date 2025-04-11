import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    console.log('Required roles:', requiredRoles);

    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      console.error('No token found!');
      return false;
    }

    try {
      const user = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      console.log('User role from token:', user.role);

      const hasRole = requiredRoles.includes(user.role);
      console.log('User has required role:', hasRole);
      return hasRole;
    } catch (error) {
      console.error('Error verifying token:', error.message);
      return false;
    }
  }
}
