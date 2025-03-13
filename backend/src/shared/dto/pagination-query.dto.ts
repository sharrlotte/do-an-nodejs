import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @Min(0)
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty({ default: 1, minimum: 1 })
  page: number;

  @Min(0)
  @Max(50)
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty({ default: 20, maximum: 50, minimum: 20 })
  size: number;
}
