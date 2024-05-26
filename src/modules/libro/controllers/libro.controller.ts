import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { Libro } from '../entities/libro.entity';
import { LibroService } from '../services/libro.service';
import { CreateBookDto, UpdateBookDto } from '../dtos/libro.dto';

@Controller('libros')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Get()
  findAll(): Promise<Libro[]> {
    return this.libroService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Libro> {
    return this.libroService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() libro: CreateBookDto): Promise<Libro> {
    return this.libroService.create(libro);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() libro: UpdateBookDto,
  ): Promise<void> {
    return this.libroService.update(id, libro);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.libroService.remove(id);
  }
}
