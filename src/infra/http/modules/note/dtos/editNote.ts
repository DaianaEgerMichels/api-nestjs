import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditNote {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
