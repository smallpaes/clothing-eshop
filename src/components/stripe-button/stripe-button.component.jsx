import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  // stripe needs the price to be in cent
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51Iue64FEIGJKrv8uWh6pWU3ciNwKZ4TCQEaCzEOhTunAfkWPxUZsOKwFMPwEwMcKar4ohW3Fb9bqAzUrMoXWZgs600KcRHLXhg';

  const onToken = token => {
    console.log(token);
    alert('Payment Successful');
  };


  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Lth.'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/en/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pat Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;