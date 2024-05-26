import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequestModel } from './models/authRequestModel';
import { LoginUseCase } from 'src/modules/auth/useCases/loginUseCase/loginUseCase';

@Controller('/auth')
export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  async login(@Request() request: AuthRequestModel) {
    const access_token = await this.loginUseCase.execute({ user: request.user });

    return { access_token };
  }
}
