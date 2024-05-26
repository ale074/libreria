import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('libros')
export class Libro {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'El identificador del libro' })
  id: number;

  @Column()
  @ApiProperty({ description: 'El titulo del libro' })
  titulo: string;

  @Column()
  @ApiProperty({ description: 'El autor del libro' })
  autor: string;

  @Column()
  @ApiProperty({ description: 'El año de publicación del libro' })
  publicacion: number;
}
