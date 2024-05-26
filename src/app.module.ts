import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibroModule } from './modules/libro/libro.module';
import { Libro } from './modules/libro/entities/libro.entity';
import { ConfigModule } from '@nestjs/config';
import { LibroController } from './modules/libro/controllers/libro.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'Alejo074',
      database: process.env.DB_DATABASE || 'libreria',
      entities: [Libro],
      synchronize: true,
    }),
    LibroModule,
  ],
  controllers: [AppController, LibroController],
  providers: [AppService],
})
export class AppModule {}
