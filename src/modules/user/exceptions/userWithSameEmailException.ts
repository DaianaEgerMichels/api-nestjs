import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/app.exception';

export class UserWithSameEmailException extends AppException {
  constructor() {
    super({
      message: 'User with same email already exists',
      status: HttpStatus.CONFLICT,
    });
  }
}
