import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BooksProvider } from './contexts/books';
import { CartProvider } from './contexts/cart';

ReactDOM.render(
  <BooksProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </BooksProvider>,
  document.getElementById('root')
);
