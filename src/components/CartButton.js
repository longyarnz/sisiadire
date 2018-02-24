import React from 'react';
export default function CartButton({ click, attr }){
  return (
    <div className={attr} onClick={click}>
      <a>
        <main></main>
        <i className="material-icons">add_shopping_cart</i>
      </a>
    </div>
  )
}