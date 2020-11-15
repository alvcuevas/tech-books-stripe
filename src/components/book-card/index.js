import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import RemoveShoppingCartRoundedIcon from '@material-ui/icons/RemoveShoppingCartRounded';

import './index.scss';

export default function BookCard({ book }) {
  const {
    state: { cart },
    addBookToCart,
    removeBookFromCart
  } = useContext(CartContext);

  const onCart = cart.some(b => b.id === book.id);

  return (
    <div className="book">
      <div className="img">
        <img alt={book.title} src={`http://localhost:3001/images/${book.img}`} />
      </div>
      <div className="content">
        <div className="title">{book.title}</div>
        <div className="desc">{book.description}</div>
        <div className="actions">
          {book.price} €
          {onCart ? (
            <RemoveShoppingCartRoundedIcon
              color="secondary"
              onClick={() => removeBookFromCart(book.id)}
            />
          ) : (
            <ShoppingCartOutlinedIcon onClick={() => addBookToCart(book)} />
          )}
        </div>
      </div>
    </div>
  );
}
