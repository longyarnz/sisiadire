import React, { Component, Fragment } from 'react';
import validateNumber from './ValidatePhoneNumber';
import { renderToString } from 'react-dom/server';
import Import from './Import';

export default class Form extends Component {
  constructor(props) {
    super(props)
    this.rows = this.rows.bind(this);
    this.info = this.info.bind(this);
    this.done = this.done.bind(this);
    this.form = this.form.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.submitMail = this.submitMail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      button: false, customer: this.props.customer, submit: false, invoiceNumber: 0
    }
  }

  componentWillMount() {
    fetch(process.env.REACT_APP_API, {
      method: 'POST',
      body: JSON.stringify({
        type: 'getInvoiceNumber',
        params: ""
      })
    })
    .then(res => res.json())
    .then(invoiceNumber => this.setState({ invoiceNumber }))
    .catch(err => console.log(err));
  }
  

  async handleSubmit(e){
    e.preventDefault();
    e.persist();
    this.setState({ submit: true });
    let form = false, mail = false;
    do{
      mail = await this.submitMail();
      form = await this.submitForm();
      console.log(mail, form);
    }
    while(!form)
    if(form) setTimeout(() => {
      this.setState({ submit: true });
      this.props.empty(false);
      this.props.upload({ _name: "", email: "", phone: "" });
    }, 30000);
  }

  async submitMail(){
    let record = this.done(), result;
    record = renderToString(record).replace(/<!-- -->/g, "");
    result = await fetch('http://sisiadire.io:8080/mail', {
      method: 'POST',
      body: JSON.stringify({ record })
    }).then(res => res.json());
    console.log(result);
    return result;
  }

  async submitForm(){
    let cost = 0, products = "", { invoiceNumber: invoice } = this.state;
    this.props.cart.map((i, o, u) => {
      cost += i.cost;
      products += `${i.title}(${i.quantity}pc${i.quantity > 1 ? 's' : ''}), `;
      return null;
    });
    products = products.slice(0, products.length - 2);
    const params = { invoice, products, cost, ...this.state.customer };
    params['name'] = params['_name'];
    delete params['_name'];
    const result = await fetch('http://sisiadire.io:8080/req', {
      method: 'POST',
      body: JSON.stringify({
        type: 'addInvoice', params
      })
    }).then(res => res.json());
    console.log(result);
    return result[0]['invoice'] === invoice;
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
            return (
              <Fragment key={o}>
                <h5>{i.title}</h5>
                <div>
                  <span>#{i.invoiceNumber}</span>
                  <span>{i.quantity} {i.quantity > 1 ? 'pcs' : 'pc'}</span>
                  <span>₦{i.cost}</span>
                </div>
              </Fragment>
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
        <h4>#{this.state.invoiceNumber}</h4>  
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
        <input type="text" placeholder="First name - Last name" value={_name} spellCheck="false" onChange={this.onChange} required />
        <input type="email" placeholder="Email" value={email} spellCheck="false" onChange={this.onChange} autoComplete="email" required />
        <input type="number" placeholder="Phone Number" value={phone} onChange={this.onChange} autoComplete="tel" required />
        {!this.state.submit ? (
            <button className={button ? 'ready' : 'freezed'} type={button ? "submit" : "reset"}>
              Complete Order
            </button>
          ) : <Import name="LoadingBar" />
        }
      </form>
    )
  }

  render() {
    return this.state.submit ? this.done() : this.form();
  }
}
