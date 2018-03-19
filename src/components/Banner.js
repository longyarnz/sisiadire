import React from 'react';
import Figure from './Figure';
import image from "../files/demo.jpg";

export default function Banner({ src }) {
  const images = ['Classy', 'Awesome', 'Fitting', 'Stylish'];
  return (
    <section className="banner">
      {/* <main>
        <span>Àdìre</span>
        <span>swags</span>
        <span>your</span>
        <span>STYLE</span>
      </main> */}
      {
        images.map((i, o) => <Figure caption={<main><span>+ </span>{i}</main>} img={image} attr="item-figure" key={o} />)
      }
    </section>
  )
}