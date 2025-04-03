import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1000)
  content: string;

  @Type(() => Number)
  @IsInt()
  novelId: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  chapterId?: number;
}
