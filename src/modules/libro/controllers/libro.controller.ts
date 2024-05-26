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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('libros')
@Controller('libros')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Get()
  @ApiOperation({ summary: 'Trae la lista de Libros' })
  findAll(): Promise<Libro[]> {
    return this.libroService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Trae un libro por su id' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Libro> {
    return this.libroService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crea un libro nuevo' })
  create(@Body() libro: CreateBookDto): Promise<Libro> {
    return this.libroService.create(libro);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Actualiza un libro por su id' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() libro: UpdateBookDto,
  ): Promise<void> {
    return this.libroService.update(id, libro);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Elimina un libro por su id' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.libroService.remove(id);
  }
}
