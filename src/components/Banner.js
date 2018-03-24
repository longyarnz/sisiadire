import React from 'react';
import Figure from './Figure';

export default function Banner({ src }) {
  const images = ['Integrity', 'Smart', 'Awesome', 'Smooth', 'Style', 'Bold', 'Creativity', 'Expression', 'Gusto', 'Fitting'];
  return (
    <section className="banner">
      {
        images.map((i, o) => <Figure caption={<main><span>+ </span>{i}</main>} img={`banner/s${o}.jpg`} attr="item-figure" key={o} />)
      }
    </section>
  )
}