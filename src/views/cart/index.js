import React, { useState, useContext } from 'react';
import { CartContext } from '../../contexts/cart';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import CheckoutForm from '../../components/checkout-form';

import './index.scss';

const CartView = () => {
  const [shippingCost, setShippingCost] = useState(0);
  const [checkout, setCheckout] = useState(null);

  const {
    state: { cart },
    removeBookFromCart
  } = useContext(CartContext);
  const booksOnCart = cart.length > 0;

  const renderCart = () =>
    cart.map(book => (
      <div key={book.id} className="items">
        <div className="item">
          <span>
            {book.title} - {book.price} €
          </span>
        </div>
        <DeleteRoundedIcon color="secondary" onClick={() => removeBookFromCart(book.id)} />
      </div>
    ));

  const checkItemsPrice = () => cart.reduce((total, book) => total + book.price, 0);
  const checkTotalPrice = () => checkItemsPrice() + shippingCost;

  return (
    <div className="shopping-cart">
      <div className="cart-items">
        <h3>Cart</h3>
        {booksOnCart ? renderCart() : <span>Shopping cart is empty.</span>}
      </div>
      <div className="checkout">
        <table>
          <thead />
          <tbody>
            <tr className="checkout__item">
              <td>{cart.length} items</td>
              <td className="checkout__quantity">{checkItemsPrice()} €</td>
            </tr>
            <tr className="checkout__item">
              <td>Shipping</td>
              <td className="checkout__quantity">
                <select onChange={e => setShippingCost(Number(e.target.value))}>
                  <option disabled selected>
                    Select one
                  </option>
                  <option value="9">One day (9€)</option>
                  <option value="6">Three days (6€)</option>
                  <option value="3">One week or more (3€)</option>
                </select>
              </td>
            </tr>
            <tr className="checkout__item">
              <td>Total</td>
              <td className="checkout__quantity">
                {shippingCost && booksOnCart ? `${checkTotalPrice()} €` : '---'}
              </td>
            </tr>
          </tbody>
        </table>
        <button className="checkout__btn" onClick={() => shippingCost && setCheckout(true)}>
          Check out
        </button>
        {checkout && (
          <div className="payment">
            <CheckoutForm amount={checkTotalPrice()} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartView;
