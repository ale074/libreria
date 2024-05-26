import { Test, TestingModule } from '@nestjs/testing';
import { LibroController } from './libro.controller';
import { LibroService } from '../services/libro.service';

const libroArray = [
  { id: 1, titulo: 'Libro 1', autor: 'Autor 1', publicacion: 2021 },
  { id: 2, titulo: 'Libro 2', autor: 'Autor 2', publicacion: 2022 },
];

const oneLibro = {
  id: 1,
  titulo: 'Libro 1',
  autor: 'Autor 1',
  publicacion: 2021,
};

describe('LibroController', () => {
  let controller: LibroController;
  let service: LibroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibroController],
      providers: [
        {
          provide: LibroService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(libroArray),
            findOne: jest.fn().mockResolvedValue(oneLibro),
            create: jest.fn().mockResolvedValue(oneLibro),
            update: jest.fn().mockResolvedValue(undefined),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<LibroController>(LibroController);
    service = module.get<LibroService>(LibroService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get an array of books', async () => {
    expect(await controller.findAll()).toBe(libroArray);
  });

  it('should get one book by id', async () => {
    expect(await controller.findOne(1)).toBe(oneLibro);
  });

  it('should create a new book', async () => {
    expect(await controller.create(oneLibro)).toBe(oneLibro);
  });

  it('should update a book', async () => {
    expect(
      await controller.update(1, { titulo: 'Updated Libro' }),
    ).toBeUndefined();
  });

  it('should delete a book', async () => {
    expect(await controller.remove(1)).toBeUndefined();
  });
});
