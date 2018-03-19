import React from 'react';
import SVG from './SVG';

export default function Sandwich ({ view = true, click=()=>{}, W = 27, fill = "purple", attr }) {
  const sandwich = (
    <SVG click={click} attr="sandwich">
      <rect width="50%" height={2} y={2} />
      <rect width="40%" height="2px" y={11} />
      <rect width="50%" height="2px" y={20} />
    </SVG>
  );

  const arrowStyle = {
    marginLeft: '-5px'
  }
  console.log(attr);
  const arrow = (
    <i className="material-icons" style={arrowStyle} onClick={click}>
      {attr === "modal" && window.innerWidth >= 600 ? 'close' : 'arrow_back'}
    </i>
  );

  return view ? sandwich : arrow;
}
