import React, { Component } from 'react';

export default class Logo extends Component {
  render() {
    const { width, height, fill = "#fff" } = this.props;
    return (
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width={width} height={height}> 
        <rect width="100%" height="100%" fill={fill} />  
      </svg>
    )
  }
}
