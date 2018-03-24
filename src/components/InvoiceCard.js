import React, { Component, Fragment } from 'react';

export default class InvoiceCard extends Component {
  constructor(props) {
    super(props);
    this.e = [];
    this.get = this.get.bind(this);
    this.confirmOrder = this.confirmOrder.bind(this);
    this.state = {
      direction: '', icon: 'error_outline', clicked: false,
      alert: 'Confirm Order', confirmed: false
    }
  }

  confirmOrder() {
    if(this.state.clicked) return;
    this.setState({ icon: 'check_circle', confirmed: true, print: 'print', alert: `+ ${this.props.item.title}`, clicked: true });
    this.e[1].classList.add('click');
    this.e[0].classList.add('click');
    const { cost, quantity, invoiceNumber, title, price, i : {picture_file} } = this.props.item;
    this.props.add({ cost, quantity, invoiceNumber, title, price, picture_file });
    this.props.closeModal();
  }

  get(x) {
    this.e.push(x);
  }

  render() {
    const { invoiceNumber, cost } = this.props.item;
    const { icon, alert } = this.state;
    return (
      <Fragment>
        <header className="invoice-card">
          <h4><span>ORDER</span> #{invoiceNumber}</h4>
        </header>
        <div className="invoice-card">
          <h3>₦{cost}</h3>
          <i className="material-icons" ref={this.get}>{icon}</i>
          <h3 ref={this.get} onClick={this.confirmOrder}>{alert}</h3>
        </div>
      </Fragment>
    )
  }
}
