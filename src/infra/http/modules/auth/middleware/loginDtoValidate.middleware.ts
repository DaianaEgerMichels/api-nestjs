import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoginDto } from './../dtos/login.dto';
import { validate } from 'class-validator';
import { IncorrectValuesException } from 'src/exceptions/incorrectValues.exception';
import { mapperClassValidationErrorToAppException } from 'src/utils/mappers';

@Injectable()
export class LoginDtoValidateMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body;

    const login = new LoginDto();
    login.email = body.email;
    login.password = body.password;

    const validations = await validate(login);

    if (validations.length) {
      throw new IncorrectValuesException({
        fields: mapperClassValidationErrorToAppException(validations),
      });
    }

    next();
  }
}
