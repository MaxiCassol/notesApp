import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsArray()
  @ArrayNotEmpty()
  categoryIds: string[];

  @IsOptional()
  @IsBoolean()
  archived?: boolean;
}
