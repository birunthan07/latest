const express = require('express');
const Stripe = require('stripe');
const Payment = require('../models/Payments.js'); 
const router = express.Router();

const stripe = Stripe('sk_test_51Q7DZt1RpkHfFiUIiMz9Ouj9DTkPqGcp6PynCn75Y1jCS03KYzYyM9SGRJU86U6nfLQh9eAWbyUtRaC4ZlvyL9ge006oBsjR0J');

router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    // Save payment details to the database
    const newPayment = new Payment({
      amount,
      currency,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
    });

    await newPayment.save();

    console.log('Payment intent created and saved successfully');
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
