import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MusicDto {

  @ApiProperty({type: Number})
  @IsOptional()
  @IsNumber()
  readonly id?: number;

  @ApiProperty({type: String})
  @IsString()
  readonly title: string;

  @ApiProperty({type: String})
  @IsString()
  readonly singer: string;

  @ApiProperty({type: String, isArray: true})
  @IsString({ each: true })
  readonly platform: string[];
}
