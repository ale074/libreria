import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from '../entities/libro.entity';
import { CreateBookDto, UpdateBookDto } from '../dtos/libro.dto';

@Injectable()
export class LibroService {
  constructor(
    @InjectRepository(Libro)
    private librosRepository: Repository<Libro>,
  ) {}

  findAll(): Promise<Libro[]> {
    return this.librosRepository.find().then((libros) => {
      if (!libros.length) {
        throw new NotFoundException(`Found ${libros.length} books`);
      }
      return libros;
    });
  }

  findOne(id: number): Promise<Libro> {
    return this.librosRepository.findOneBy({ id }).then((libro) => {
      if (!libro) {
        throw new NotFoundException(`Book #${libro} not found`);
      }
      return libro;
    });
  }

  async create(libro: CreateBookDto): Promise<Libro> {
    return this.librosRepository.save(libro);
  }

  async update(id: number, libro: UpdateBookDto): Promise<void> {
    await this.librosRepository.update(id, libro).then((res) => {
      if (!res.affected) {
        throw new NotFoundException(`Book #${id} not found`);
      }
    });
  }

  async remove(id: number): Promise<void> {
    await this.librosRepository.delete(id).then((res) => {
      if (!res.affected) {
        throw new NotFoundException(`Book #${id} not found`);
      }
    });
  }
}
