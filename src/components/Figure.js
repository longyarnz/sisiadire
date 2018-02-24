import React from 'react';
export default function Figure(props) {
  const { attr } = props;
  return (
    <figure onClick={props.click} className={attr}>
      <img src={props.img} alt={props.alt} />
      {props.title && <h3>{props.title}</h3>}
      <figcaption>{props.caption}</figcaption>
    </figure>
  )
}