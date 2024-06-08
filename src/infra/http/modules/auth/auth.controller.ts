import { Controller, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthRequestModel } from './models/authRequestModel';
import { LoginUseCase } from 'src/modules/auth/useCases/loginUseCase/loginUseCase';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { Public } from './decorators/isPublic';
import { ApiTags } from '@nestjs/swagger';

@Controller('/auth')
export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {}

  @ApiTags('Auth Controller')
  @Post('/login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() request: AuthRequestModel) {
    const access_token = await this.loginUseCase.execute({ user: request.user });

    return { access_token };
  }
}
