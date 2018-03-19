import React from 'react';
import Nav from './Nav';

export default function ScrolledNav ({ click, attr, cart, type, checkout }) {
  return <Nav type={type} cart={cart}  attr={attr} click={click} blog={false} checkout={checkout} />
}