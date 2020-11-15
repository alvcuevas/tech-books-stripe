import React, { createContext, useReducer } from 'react';
import axios from 'axios';

const BooksContext = createContext();

const initialState = {
  books: [],
  original: [],
  details: [],
  loading: false,
  error: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCHING_BOOKS':
      return {
        ...state,
        loading: action.value
      };
    case 'FETCH_BOOKS_SUCCESS':
      return {
        ...state,
        books: action.value,
        loading: false
      };
    case 'FETCH_BOOKS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.value
      };
    case 'FETCH_BOOK_DETAILS':
      return {
        ...state,
        details: state.books.filter(book => book.id === action.value)
      };
    case 'FETCHING_BOOK':
      if (action.value !== '') {
        return {
          ...state,
          books: state.books.filter(book => book.title.toLowerCase().includes(action.value))
        };
      }
      return {
        ...state,
        books: state.original
      };
    default:
      return state;
  }
};

const BooksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchBooks = async () => {
    fetchingBooks(true);
    try {
      const res = await axios.get('http://localhost:3001/books');
      if (res.data?.books) {
        fetchBooksSuccess(res.data.books);
        fetchingBooks(false);
      }
    } catch (err) {
      fetchBooksError(err);
    }
  };

  const fetchingBooks = status => dispatch({ type: 'FETCHING_BOOKS', value: status });
  const fetchBooksSuccess = books => dispatch({ type: 'FETCH_BOOKS_SUCCESS', value: books });
  const fetchBooksError = err => dispatch({ type: 'FETCH_BOOKS_ERROR', value: err });
  const fetchBookDetails = id => dispatch({ type: 'FETCH_BOOK_DETAILS', value: id });
  const fetchBook = title => dispatch({ type: 'FETCHING_BOOK', value: title });

  return (
    <BooksContext.Provider
      value={{
        state,
        fetchBooks,
        fetchBookDetails,
        fetchBook
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export { BooksProvider, BooksContext };
