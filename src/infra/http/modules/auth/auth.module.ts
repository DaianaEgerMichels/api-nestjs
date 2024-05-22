import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { ValidateUserUseCase } from 'src/modules/auth/useCases/validateUserUseCase/validateUserUseCase';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { LoginDtoValidateMiddleware } from './middleware/loginDtoValidate.middleware';

@Module({
  imports: [UserModule, DatabaseModule], // for access user repository in this module
  controllers: [AuthController],
  providers: [LocalStrategy, ValidateUserUseCase],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginDtoValidateMiddleware).forRoutes('auth/login');
  }
}
