import { ExecutionContext, CanActivate, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtRoleGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        // console.log('roles', roles)
        if (!roles) return true;
        const request = context.switchToHttp().getRequest();
        // console.log('request', request)
        const user = request.user;
        if (!this.matchRoles(roles, user.roles))
            throw new HttpException(`You're not authorized - invalid role.`, HttpStatus.UNAUTHORIZED);
        return true;
    }

    private matchRoles(validRoles: string[] = [], userRoles: string[] = []): boolean {
        let result = true;
        const validRoleSet = new Set(validRoles.filter(r => r.trim()));
        let userRole;
        for (let i = 0; i < userRoles.length; i++) {
            userRole = userRoles[i];
            if (!userRole || !userRole.trim()) continue;
            result = validRoleSet.has(userRole);
            if (result) break;
        }
        return result;
    }
}
