import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsArray()
  @ArrayNotEmpty()
  categoryIds: string[];

  @IsOptional()
  @IsBoolean()
  archived?: boolean;
}
