import { IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/isNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/isStringCustom';

export class EditNote {
  @IsStringCustom()
  @IsNotEmptyCustom()
  title: string;

  @IsStringCustom()
  @IsOptional()
  description?: string;
}
