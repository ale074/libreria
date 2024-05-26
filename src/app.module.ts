import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibroModule } from './modules/libro/libro.module';
import { Libro } from './modules/libro/entities/libro.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Alejo074',
      database: 'libreria',
      entities: [Libro],
      synchronize: true,
    }),
    LibroModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
