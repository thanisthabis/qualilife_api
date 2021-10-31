import { Controller, Post, UseGuards, Request, Body, Get, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { Public } from './jwt-public';
// import { Public } from './jwt-public';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() req) {
    console.log('req login=>', req)
    const payload = await this.authService.validateUser(req.email, req.password)
    const token = await this.authService.signPayload(payload);
    const refreshToken = await this.authService.generateRefreshToken(payload)

    return { token, refreshToken };
  }

  @Public()
  @UseGuards(AuthGuard('jwt-refreshtoken'))
  @Post('refreshtoken')
  async refreshToken(@Request() req) {
    // console.log('get in side')
    const user = req.user.user
    const token = await this.authService.signPayload(user);
    const refreshToken = await this.authService.updateRefreshTokenExpired(user._id, req.user.refreshToken)
    return { token };
  }





}
