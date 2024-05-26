import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from '../entities/libro.entity';

@Injectable()
export class LibroService {
  constructor(
    @InjectRepository(Libro)
    private librosRepository: Repository<Libro>,
  ) {}

  findAll(): Promise<Libro[]> {
    return this.librosRepository.find();
  }

  findOne(id: number): Promise<Libro> {
    return this.librosRepository.findOneBy({ id });
  }

  async create(libro: Libro): Promise<Libro> {
    return this.librosRepository.save(libro);
  }

  async update(id: number, libro: Partial<Libro>): Promise<void> {
    await this.librosRepository.update(id, libro);
  }

  async remove(id: number): Promise<void> {
    await this.librosRepository.delete(id);
  }
}
