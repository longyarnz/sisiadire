import React, { Component } from 'react';

export default class OrderButton extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(e) {
    const { clientX: x, clientY: y } = e.nativeEvent;
    this.props.click({ x, y }, 'OrderForm');
  }

  render() {
    return (
      <div className="order-button">
        <button onClick={this.handleClick}>CUSTOM ORDER <i className="material-icons under">add_shopping_cart</i></button>
      </div>
    )
  }
}