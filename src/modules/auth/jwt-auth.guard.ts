import { ExecutionContext, Injectable, UnauthorizedException ,} from '@nestjs/common';
import { Reflector, } from '@nestjs/core';
import { AuthGuard, } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './jwt-public';
import {TokenExpiredError} from 'jsonwebtoken'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

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

    handleRequest(err, user, info: Error) {
        if (err || !user) {
            throw new UnauthorizedException({status: "ERR_AUTH", message: "Unauthorized."});
        } else if (info instanceof TokenExpiredError) {
            // do stuff when token is expired
            // console.log('token expired');
            throw new UnauthorizedException({status: "ERR_AUTH_1", message: "Token is expired."});
        }   
        return user
    }
}