import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateUserUseCase } from 'src/modules/user/useCases/createUserUseCase/createUserUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUserUseCase],
})
export class UserModule {}
