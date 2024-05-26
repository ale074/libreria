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
} from '@nestjs/common';
import { Libro } from '../entities/libro.entity';
import { LibroService } from '../services/libro.service';

@Controller('libros')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Get()
  findAll(): Promise<Libro[]> {
    return this.libroService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  findOne(@Param('id') id: string): Promise<Libro> {
    return this.libroService.findOne(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() libro: Libro): Promise<Libro> {
    return this.libroService.create(libro);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id') id: string,
    @Body() libro: Partial<Libro>,
  ): Promise<void> {
    return this.libroService.update(+id, libro);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  remove(@Param('id') id: string): Promise<void> {
    return this.libroService.remove(+id);
  }
}
