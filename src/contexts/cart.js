import React, { createContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  cart: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BOOK_TO_CART':
      const alreadyOnCart = state.cart.some(book => book.id === action.value.id);
      if (!alreadyOnCart) {
        return {
          ...state,
          cart: [...state.cart, action.value]
        };
      }
      return state;
    case 'REMOVE_BOOK_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(book => book.id !== action.value)
      };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addBookToCart = book => dispatch({ type: 'ADD_BOOK_TO_CART', value: book });
  const removeBookFromCart = id => dispatch({ type: 'REMOVE_BOOK_FROM_CART', value: id });

  return (
    <CartContext.Provider
      value={{
        state,
        addBookToCart,
        removeBookFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
