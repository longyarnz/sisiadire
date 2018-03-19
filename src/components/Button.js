import React from 'react';

export default function Button({ ext, text, goog, icon, attr, click=()=>{} }) {
  return (
    <button onClick={click} className={attr}>
      {text}
      {icon && <i className={icon} />}
      {goog && <i className={`material-icons ${ext}`}>{goog}</i>}
    </button>
  )
}