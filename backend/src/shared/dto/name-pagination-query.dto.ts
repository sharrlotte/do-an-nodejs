import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Max, MaxLength, Min } from 'class-validator';

export class NamePaginationQueryDto {
  @ApiProperty({ default: 0, minimum: 0 })
  @Min(1)
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @ApiProperty({ default: 20, maximum: 50, minimum: 0 })
  @Min(20)
  @Max(50)
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  size: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @MaxLength(100)
  name?: string;
}
