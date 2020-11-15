import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BooksProvider } from './contexts/books';
import { CartProvider } from './contexts/cart';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

ReactDOM.render(
  <BooksProvider>
    <CartProvider>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </CartProvider>
  </BooksProvider>,
  document.getElementById('root')
);
