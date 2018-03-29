import React from 'react';
import Sandwich from './Sandwich';
import CheckoutButton from './CheckoutButton';
import Logo from '../files/logo.png'

export default function Nav(props){
  const { type, click, attr, cart, checkout, blog = false } = props;
  return (
    <nav className={attr}>
      <Sandwich fill="orange" view={type} click={click} attr={attr} />
      {(blog || type) && <img src={Logo} alt='logo' />}
      {!isNaN(cart) && <CheckoutButton badge={cart} click={checkout} />}
    </nav>
  )
}