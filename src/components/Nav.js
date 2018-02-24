import React from 'react';
import Sandwich from './Sandwich';

export default function Nav ({ type, click }) {
  return (
    <nav>
      <Sandwich fill="orange" view={type} click={click} />
      <span>
        Sisí Àdìre
      </span>
    </nav>
  )
}
