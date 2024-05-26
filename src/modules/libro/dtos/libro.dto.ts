import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'El titulo del libro' })
  readonly titulo: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'El autor del libro' })
  readonly autor: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'El año de publicación del libro' })
  readonly publicacion: number;
}
export class UpdateBookDto extends PartialType(CreateBookDto) {}
