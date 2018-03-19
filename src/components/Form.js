import React, { Component } from 'react';
import validateNumber from './ValidatePhoneNumber';

export default class Form extends Component {
  constructor(props) {
    super(props)
    this.rows = this.rows.bind(this);
    this.info = this.info.bind(this);
    this.done = this.done.bind(this);
    this.form = this.form.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      button: false, customer: this.props.customer, submit: false
    }
  }

  handleSubmit(e){
    e.preventDefault();
    e.persist();
    this.setState({ submit: true });
    this.props.empty(false);
    this.props.upload({_name: "", email: "", phone: ""});
  }

  onChange(e){
    e.persist();
    switch (e.target.type) {
      case "text":
        this.setState(i => {
          let { customer } = i;
          customer._name = e.target.value;
          return { customer }
        });
        break;
      case "email":
        this.setState(i => {
          let { customer } = i;
          customer.email = e.target.value;
          return { customer }
        });
        break;
      default:
        this.setState(i => {
          let visitor = Object.assign({}, i.customer);
          visitor.phone = validateNumber(e.target.value);
          const button = visitor.phone.length === 11;
          return visitor.phone < 0 ? Object.assign({}, i, {button: false}) : { customer: visitor, button };
        });
      break;
    }
  }

  rows(){
    let total = 0;
    return (
      <div>
        {
          this.props.cart.map((i, o, u) => {
            total += i.cost;
            console.log(o, u);
            return (
              <div key={o}>
                <span>#{i.invoiceNumber}</span>
                <span>₦{i.cost}</span>
              </div>
            )
          })
        }
        <div key="x">
          <span><h5>TOTAL</h5></span>
          <span><h5>₦{total}</h5></span>
        </div>
      </div>
    )
  }

  info(){
    const { _name, phone, email } = this.state.customer;
    return (
      <div>        
        <div>
          <span>Name:</span>
          <span><h5>{_name}</h5></span>
        </div>
        <div>
          <span>Email:</span>
          <span><h5>{email}</h5></span>
        </div>
        <div>
          <span>Phone:</span>
          <span><h5>{phone}</h5></span>
        </div>
      </div>
    )
 }

  done(){
    return (
      <main className="order-received-tab">
        <h3>ORDER RECEIVED</h3>
        <h5>Summary</h5>
        {this.rows()}
        <h5>Customer Details</h5>
        {this.info()}
        <a href="/">CONTINUE SHOPPING</a>
      </main>
    )
  }

  form(){
    const { customer: { _name="", email="", phone="" }, button } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="info-form">
        <h3>CONTACT DETAILS</h3>
        <input type="text" placeholder="First Name & Last Name" value={_name} spellCheck="false" onChange={this.onChange} pattern="^([A-Z]|[a-z])+\s([A-Z]|[a-z])+$" required />
        <input type="email" placeholder="Email" value={email} spellCheck="false" onChange={this.onChange} autoComplete="email" required />
        <input type="number" placeholder="Phone Number" value={phone} onChange={this.onChange} autoComplete="tel" required />
        {button && <button type="submit">Complete Order</button>}
      </form>
    )
  }

  render() {
    return this.state.submit ? this.done() : this.form();
  }
}
