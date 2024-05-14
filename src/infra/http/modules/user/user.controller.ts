import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase/createUserUseCase';
import { CreateUserDto } from './dtos/createUser.dto';

@Controller('users')
export class UserController {
  constructor(private userUseCase: CreateUserUseCase) {}

  @Post()
  public async createUser(@Body() body: CreateUserDto) {
    const { name, email, password } = body;

    const user = await this.userUseCase.execute({ name, email, password });

    return user;
  }
}
