import React, { Fragment, Component } from 'react';
import Button from './Button';
import CartButton from "./CartButton";

export default class Caption extends Component{ 
  constructor(props){
    super(props);
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.state = {
      quantity: 1, cost: props.item.price
    }
  }

  add(){
    this.setState((i, o) => {
      const cost = ++i.quantity * o.item.price;
      this.props.click(cost);
      return {
        quantity: i.quantity,
        x: "", y: "active",
        cost
      }
    });
  }

  subtract(){
    if(this.state.quantity === 1) return;
    this.setState((i, o) => {
      const cost = --i.quantity * o.item.price;
      this.props.click(cost);
      return {
        quantity: i.quantity,
        y: "", x: "active",
        cost
      }
    });
  }

  render() {
    const { item } = this.props;
    const { x, y, quantity, cost } = this.state;
    return (
      <Fragment>
        <CartButton click={this.props.toggle} attr="cart-button" />
        <header className="caption">
          <h2>{item.title}</h2>
          <span>₦{cost}</span>
        </header>
        <p>{item.desc}</p>
        <footer className="caption">
          <Button ext={x} goog={`remove`} attr="a" click={this.subtract} />
          <input type="text" value={`${quantity}`} disabled />
          <Button ext={y} goog={`add`} attr="a" click={this.add} />
        </footer>
      </Fragment>
    )
  }
}
