import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequestModel } from './models/authRequestModel';

@Controller('/auth')
export class AuthController {
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  async login(@Request() request: AuthRequestModel) {
    return request.user;
  }
}
