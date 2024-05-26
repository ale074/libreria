import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Libro } from 'src/modules/libro/entities/libro.entity';
import { LibroService } from 'src/modules/libro/services/libro.service';
import { Repository } from 'typeorm';

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

describe('LibroService', () => {
  let service: LibroService;
  let repository: Repository<Libro>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LibroService,
        {
          provide: getRepositoryToken(Libro),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<LibroService>(LibroService);
    repository = module.get<Repository<Libro>>(getRepositoryToken(Libro));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of books', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue(libroArray);
    expect(await service.findAll()).toBe(libroArray);
  });

  it('should get one book by id', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(oneLibro);
    expect(await service.findOne(1)).toBe(oneLibro);
  });

  it('should insert a new book', async () => {
    jest.spyOn(repository, 'save').mockResolvedValue(oneLibro);
    expect(await service.create(oneLibro)).toBe(oneLibro);
  });
  /*..
  it('should update a book', async () => {
    jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 });
    expect(
      await service.update(1, { titulo: 'Updated Libro' }),
    ).toBeUndefined();
  });

  it('should delete a book', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 });
    expect(await service.remove(1)).toBeUndefined();
  });*/
});
