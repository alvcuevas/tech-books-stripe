import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import { BooksContext } from '../../contexts/books';
import { CartContext } from '../../contexts/cart';
import { Link, useLocation } from 'react-router-dom';

import './index.scss';

export default function NavigationBar() {
  let location = useLocation();
  const { fetchBook } = useContext(BooksContext);
  const { state } = useContext(CartContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <h3 className="title">Tech-Books Store</h3>
          </Link>
        </li>
        {location.pathname !== '/cart' && (
          <li>
            <input
              type="text"
              placeholder="Search a book..."
              onChange={e => fetchBook(e.target.value)}
            />
          </li>
        )}
        <li>
          <IconButton color="inherit">
            <Badge badgeContent={state.cart.length} color="secondary">
              <Link to="/cart">
                <ShoppingCart />
              </Link>
            </Badge>
          </IconButton>
        </li>
      </ul>
    </nav>
  );
}
