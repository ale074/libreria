import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './entities/libro.entity';
import { LibroService } from './services/libro.service';
import { LibroController } from './controllers/libro.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Libro])],
  providers: [LibroService],
  controllers: [LibroController],
})
export class LibroModule {}
