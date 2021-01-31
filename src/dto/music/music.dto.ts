import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MusicDto {
  @ApiProperty({ type: Number })
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  readonly singer: string;

  @ApiProperty({ type: String, isArray: true })
  @IsString({ each: true })
  readonly platform: string[];
}
