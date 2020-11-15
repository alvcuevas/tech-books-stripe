const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const books = require('./books.json');
require('dotenv').config();

const app = express();

const stripe = new Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

app.use(express.json());
app.use(cors());

app.get('/books', (req, res) => res.send(books));
app.use('/images', express.static(__dirname + '/assets'));

app.post('/checkout', async (req, res) => {
  const { id, amount } = req.body;

  try {
    await stripe.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: 'EUR',
      description: 'Tech book',
      payment_method: id,
      confirm: true
    });
    res.send({ status: 'OK', msg: 'Successful payment!' });
  } catch (error) {
    res.status(500).send({ status: 'ERR', msg: error.raw.message });
  }
});

app.listen(3001, () => console.log(`Server running!`));
