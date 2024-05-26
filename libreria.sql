-- Comando para crear la base de datos
CREATE DATABASE libreria;

-- Conectarse a la base de datos libreria
\c libreria;

-- Crear la tabla libros
CREATE TABLE libros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    publicacion INT NOT NULL
);

INSERT INTO libros (titulo, autor, publicacion) VALUES ('Título del Libro', 'Nombre del Autor', 2022), ('Otro Libro', 'Otro Autor', 2020);
