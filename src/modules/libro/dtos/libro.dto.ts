export class CreateBookDto {
  readonly titulo: string;
  readonly autor: string;
  readonly publicacion: number;
}
export class UpdateBookDto {
  readonly titulo?: string;
  readonly autor?: string;
  readonly publicacion?: number;
}
