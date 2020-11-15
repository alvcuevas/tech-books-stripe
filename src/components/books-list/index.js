import React from 'react';
import BookCard from '../book-card';

import './index.scss';

const BooksList = ({ books }) => (
  <div className="books-list">
    {books.map(book => (
      <BookCard key={book.id} book={book} />
    ))}
  </div>
);

export default BooksList;
