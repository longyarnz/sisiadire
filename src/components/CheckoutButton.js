import React from 'react';

export default function CheckoutButton ({ badge, click }) {
  return (
    <button className="checkout-button" onClick={click}>
      <i className="material-icons">add_shopping_cart</i>
      <span>{badge}</span>
    </button>
  )
}
