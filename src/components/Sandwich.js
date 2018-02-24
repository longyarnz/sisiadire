import React from 'react';
import SVG from './SVG';

export default function Sandwich ({ view = true, click=()=>{}, W = 27, fill = "purple" }) {
  const sandwich = (
    <SVG click={click} attr="sandwich">
      <rect width="100%" height="2px" />
      <rect width="80%" height="2px" y="8px" />
      <rect width="100%" height="2px" y="16px" />
    </SVG>
  );

  const arrowStyle = {
    color: 'orange', marginLeft: '-10px'
  }

  const arrow = (
    <i className="material-icons" style={arrowStyle} onClick={click}>arrow_back</i>
  );

  return view ? sandwich : arrow;
}
