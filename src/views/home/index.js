import React, { useEffect, useContext } from 'react';
import { BooksContext } from '../../contexts/books';
import BooksList from '../../components/books-list';

const HomeView = () => {
  const {
    state: { books, loading, error },
    fetchBooks
  } = useContext(BooksContext);

  useEffect(() => fetchBooks(), []);

  return (
    <>
      {loading && 'Cargando...'}
      {!loading && books.length > 0 && <BooksList books={books} />}
      {error && 'Error al cargar el listado de libros'}
    </>
  );
};

export default HomeView;
