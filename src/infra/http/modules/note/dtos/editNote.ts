import { IsOptional } from 'class-validator';
import { IsNotEmptyCustom } from 'src/infra/http/classValidator/decorators/isNotEmptyCustom';
import { IsStringCustom } from 'src/infra/http/classValidator/decorators/isStringCustom';

export class EditNoteDto {
  @IsStringCustom()
  @IsNotEmptyCustom()
  title: string;

  @IsStringCustom()
  @IsOptional()
  description?: string;
}
