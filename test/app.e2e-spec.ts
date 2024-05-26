import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from 'src/modules/libro/entities/libro.entity';
//import { TypeOrmModule } from '@nestjs/typeorm';
//import { Libro } from './../src/modules/libro/entities/libro.entity';
//import { ConfigModule } from '@nestjs/config';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
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
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/libros (GET)', () => {
    return request(app.getHttpServer()).get('/libros').expect(200).expect([]);
  });

  it('/libros (POST)', () => {
    return request(app.getHttpServer())
      .post('/libros')
      .send({ titulo: 'Nuevo Libro', autor: 'Nuevo Autor', publicacion: 2023 })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(Number),
          titulo: 'Nuevo Libro',
          autor: 'Nuevo Autor',
          publicacion: 2023,
        });
      });
  });

  it('/libros/:id (GET)', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/libros')
      .send({ titulo: 'Nuevo Libro', autor: 'Nuevo Autor', publicacion: 2023 })
      .expect(201);

    return request(app.getHttpServer())
      .get(`/libros/${body.id}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({
          id: body.id,
          titulo: 'Nuevo Libro',
          autor: 'Nuevo Autor',
          publicacion: 2023,
        });
      });
  });

  it('/libros/:id (PUT)', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/libros')
      .send({
        titulo: 'Libro Actualizar',
        autor: 'Autor Actualizar',
        publicacion: 2023,
      })
      .expect(201);

    return request(app.getHttpServer())
      .put(`/libros/${body.id}`)
      .send({ titulo: 'Libro Actualizado' })
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({});
      });
  });

  it('/libros/:id (DELETE)', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/libros')
      .send({
        titulo: 'Libro a Eliminar',
        autor: 'Autor a Eliminar',
        publicacion: 2023,
      })
      .expect(201);

    return request(app.getHttpServer())
      .delete(`/libros/${body.id}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual({});
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
