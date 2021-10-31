
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
@Injectable()
// export class JWtStrategy extends PassportStrategy(Strategy) {
//   constructor(private authService: AuthService) {
//     super();
//   }

export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, "jwt-refreshtoken") {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: process.env.SECRET_KEY,
            passReqToCallback: true
        });
    }
    async validate(req, payload: any, done: VerifiedCallback) {
        // console.log('validate refresh token ', req.body.refreshToken)
        const user = await this.authService.validate(payload, req.body.refreshToken);
        if (!user) {
            return done(
                new UnauthorizedException({status: "ERR_AUTH_2", message: "Refresh token invalid."}),
                false,
            );
        }
        
        return done(null, {user: user, refreshToken: req.body.refreshToken}, payload.iat);
    }
}