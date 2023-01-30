import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { DirectionEnum } from 'src/common/utils/direction.enum';

export class QueryParamsFindAllDto {
  @IsOptional()
  @ApiProperty({
    required: false,
    default: 10,
    example: 10,
  })
  take?: number;

  @IsOptional()
  @ApiProperty({
    required: false,
    default: 0,
    example: 0,
  })
  skip?: number;

  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'DZ',
  })
  cod?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'Algeria',
  })
  name?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'Africa',
  })
  region?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    example: 'region',
  })
  orderBy?: string;

  @IsOptional()
  @IsEnum(DirectionEnum)
  @ApiProperty({
    required: false,
    default: 'ASC',
    example: 'ASC',
    enum: DirectionEnum,
  })
  direction?: DirectionEnum;
}
