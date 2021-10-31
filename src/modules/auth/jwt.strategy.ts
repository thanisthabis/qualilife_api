
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import env from '../../utils/env'
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
@Injectable()
// export class JWtStrategy extends PassportStrategy(Strategy) {
//   constructor(private authService: AuthService) {
//     super();
//   }

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY || env.SECRET_KEY,
      ignoreExpiration: false,
    });
  }
  
  async validate(payload: any, done: VerifiedCallback) {

    return done(null, { fullname: payload.firstName + " " + payload.lastName, roles: payload.roles});
  }

 
}