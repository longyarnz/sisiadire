import React, { Component, Fragment } from 'react';

export default class InvoiceCard extends Component {
  constructor(props) {
    super(props);
    this.e = [];
    this.get = this.get.bind(this);
    this.confirmOrder = this.confirmOrder.bind(this);
    this.state = {
      direction: '', icon: 'error_outline',
      print: '', alert: 'Confirm Order', confirmed: false
    }
  }

  confirmOrder() {
    this.setState({ icon: 'check_circle', confirmed: true, print: 'print', alert: 'Order Completed 💖' });
    this.e[1].classList.add('click');
    this.e[0].classList.add('click');
  }

  get(x) {
    this.e.push(x);
  }

  render() {
    const { invoice } = this.props;
    const { print, icon, alert } = this.state;
    return (
      <Fragment>
        <header className="invoice-card">
          <h4><span>Order</span> #{invoice}</h4>
          <i className="material-icons">{print}</i>
        </header>
        <div className="invoice-card">
          <h3>₦{this.props.price}</h3>
          <i className="material-icons" ref={this.get}>{icon}</i>
          <h3 ref={this.get} onClick={this.confirmOrder}>{alert}</h3>
        </div>
      </Fragment>
    )
  }
}
