import React from 'react';
export default function Charts(props) {
  const { title, img, tag, attr, click } = props;
  return (
    <div className={attr} onClick={click}>
      <img src={img} alt="demo" />
      <div>
        <h3>{title}</h3>
        <h3>₦{tag}</h3>
      </div>
    </div>
  )
}
