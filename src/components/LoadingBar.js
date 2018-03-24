import React from 'react';
import SVG from './SVG';

export default function LoadingBar() {
  return (
    <div className="svg-loading-bar">
      <SVG width="200" height="4">
        <rect width="35%" height="100%" fill="#0098da" x="-35%">
          <animateMotion path="M -30 0 L 285 0 L -10 0" dur="2s" repeatCount="indefinite" fill="freeze" begin="1s" />
        </rect>
      </SVG>
    </div>
  )
}