import React from 'react';
export default function OverButton({ icon }) {
  return (
    <button className="over-button">
      <i className="material-icons under">{icon}</i>
      <i className="material-icons over">block</i>
    </button>
  )
}