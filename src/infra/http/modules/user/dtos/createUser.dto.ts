import { IsEmailCustom } from 'src/infra/http/classValidator/decorators/isEmailCustom';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/isNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/isStringCustom';
import { MinLengthCustom } from 'src/infra/http/classValidator/decorators/minLengthCustom';

export class CreateUserDto {
  @IsStringCustom()
  @IsNotEmptyCustom()
  name: string;

  @IsStringCustom()
  @IsNotEmptyCustom()
  @IsEmailCustom()
  email: string;

  @IsStringCustom()
  @MinLengthCustom(8)
  password: string;
}
