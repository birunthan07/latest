import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51Q7DZt1RpkHfFiUIAgrv2uSadu7aTjWwagCmxpPNQ6TG0Mi1ANX5YVngI3AzBNpPd3yCzNDZUxOl6zcoEEcSKqB900yHuw1Cv5');

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { data } = await axios.post('http://localhost:8000/create-payment-intent', {
      amount: 1000, // Example: amount in cents
      currency: 'usd',
    });

    const clientSecret = data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setSuccess(true);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {error && <div>{error}</div>}
      {success && <div>Payment successful!</div>}
    </form>
  );
}

function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

export default PaymentPage;
