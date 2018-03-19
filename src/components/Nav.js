import React from 'react';
import Sandwich from './Sandwich';
import CheckoutButton from './CheckoutButton';

export default function Nav(props){
  const { type, click, attr, cart, checkout, blog = false } = props;
  return (
    <nav className={attr}>
      <Sandwich fill="orange" view={type} click={click} attr={attr} />
      {(blog || type) && <span>Sisí Àdìre</span>}
      {!isNaN(cart) && <CheckoutButton badge={cart} click={checkout} />}
    </nav>
  )
}