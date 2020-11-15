import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });

    setLoading(true);

    if (!error) {
      try {
        const res = await axios.post('http://localhost:3001/checkout', {
          id: paymentMethod.id,
          amount
        });
        elements.getElement(CardElement).clear();
        setSuccess(res.data?.msg);
      } catch (error) {
        setError(error.response?.data?.msg);
      }

      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" className="checkout__btn" disabled={!stripe}>
        {loading ? <CircularProgress color={'#e1f5fe'} size={20} /> : 'Pay'}
      </button>
      {error && <p className="checkout__error">{error}</p>}
      {success && <p className="checkout__success">{success}</p>}
    </form>
  );
};

export default CheckoutForm;
