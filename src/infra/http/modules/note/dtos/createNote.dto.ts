import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNote {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
