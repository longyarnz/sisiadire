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
    this.submitMail();
    let form = false;
    do{
      form = await this.submitForm();
    }
    while(!form)
    if(form) {
      this.setState({ submit: true });
      this.props.empty(false);
      this.props.upload({ _name: "", email: "", phone: "", order: "" });
    };
  }

  async submitMail(){
    let record = this.done(), result;
    record = renderToString(record).replace(/<!-- -->/g, "");
    result = await fetch(process.env.REACT_APP_MAIL, {
      method: 'POST',
      body: JSON.stringify({ record })
    }).then(res => res.json());
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
    const customer = Object.assign({}, this.state.customer);
    delete customer['order'];
    const params = { invoice, products, cost, ...customer };
    params['name'] = params['_name'];
    delete params['_name'];
    const result = await fetch(process.env.REACT_APP_API, {
      method: 'POST',
      body: JSON.stringify({
        type: 'addInvoice', params
      })
    }).then(res => res.json());
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

  rows() {
    const font = 'Roboto,-apple-system,BlinkMacSystemFont,Oxygen,Ubuntu,Cantarell,Open Sans,"Helvetica Neue",sans-serif';
    let total = 0;

    const mainStyleDiv = {
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      background: '#faffbd'
    }

    const mainStyleDivSpan = {
      fontFamily: font,
      fontSize: '80%',
      background: 'transparent',
      color: '#555'
    }

    const mainStyleDivSpanH5 = {
      background: 'transparent',
      margin: '0px',
      fontSize: '100%',
      color: '#000'
    }

    const mainStyleDivlastOfType = {
      borderBottomLeftRadius: '5px',
      borderBottomRightRadius: '5px',
      marginTop: '15px',
      backgroundColor: '#fff'
    }

    return (
      <div>
        {
          this.props.cart.map((i, o, u) => {
            total += i.cost;
            return (
              <Fragment key={o}>
                <h5>{i.title}</h5>
                <div style={mainStyleDiv}>
                  <span style={mainStyleDivSpan}>#{i.invoiceNumber}</span>
                  <span style={mainStyleDivSpan}>{i.quantity} {i.quantity > 1 ? 'pcs' : 'pc'}</span>
                  <span style={mainStyleDivSpan}>₦{i.cost}</span>
                </div>
              </Fragment>
            )
          })
        }
        <div style={Object.assign({}, mainStyleDiv, mainStyleDivlastOfType)}>
          <span style={mainStyleDivSpan}><h5 style={mainStyleDivSpanH5}>TOTAL</h5></span>
          <span style={mainStyleDivSpan}><h5 style={mainStyleDivSpanH5}>₦{total}</h5></span>
        </div>
      </div>
    )
  }

  info() {
    const { _name, phone, email } = this.state.customer;
    const font = 'Roboto,-apple-system,BlinkMacSystemFont,Oxygen,Ubuntu,Cantarell,Open Sans,"Helvetica Neue",sans-serif';
    let mainStyleDiv = {
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center'
    }
    
    const mainStyleDivSpan = {
      fontFamily: font,
      fontSize: '80%',
      background: 'transparent',
      color: '#555'
    }

    const mainStyleDivSpanH5 = {
      background: 'transparent',
      margin: '0px 5px 0px 0px',
      fontSize: '100%',
      color: '#000'
    }

    const mainStyleDivFirstOfType = {
      borderTopLeftRadius: '5px',
      borderTopRightRadius: '5px'
    }

    const mainStyleDivlastOfType = {
      borderBottomLeftRadius: '5px',
      borderBottomRightRadius: '5px'
    }

    const mainStyleDivNthOfTypeEven = {
      backgroundColor: '#faffbd',
    }
    
    const mainStyleDivNthOfTypeOdd = {
      backgroundColor: '#fff',
    }
    return (
      <div>
        <div style={Object.assign({}, mainStyleDiv, mainStyleDivNthOfTypeEven, mainStyleDivFirstOfType)}>
          <span style={mainStyleDivSpan}>Name:</span>
          <span style={mainStyleDivSpan}><h5 style={mainStyleDivSpanH5}>{_name}</h5></span>
        </div>
        <div style={Object.assign({}, mainStyleDiv, mainStyleDivNthOfTypeOdd)}>
          <span style={mainStyleDivSpan}>Email:</span>
          <span style={mainStyleDivSpan}><h5 style={mainStyleDivSpanH5}>{email}</h5></span>
        </div>
        <div style={Object.assign({}, mainStyleDiv, mainStyleDivNthOfTypeEven, mainStyleDivlastOfType)}>
          <span style={mainStyleDivSpan}>Phone:</span>
          <span style={mainStyleDivSpan}><h5 style={mainStyleDivSpanH5}>{phone}</h5></span>
        </div>
      </div>
    )
  }

  done() {
    const T1 = 'orange';
    const font = 'Roboto,-apple-system,BlinkMacSystemFont,Oxygen,Ubuntu,Cantarell,Open Sans,"Helvetica Neue",sans-serif';
    const mainStyle = {
      padding: '0px 20px 20px',
      marginTop: window.innerWidth > 600 ? '80px' : '40px'
    }

    const mainStyleH3 = {
      fontFamily: font
    }

    const mainStyleH4 = {
      color: T1,
      fontFamily: font
    }

    const mainStyleH5 = {
      fontSize: '83%',
      fontFamily: font
    }

    return (
      <main className="order-received-tab" style={mainStyle}>
        <h3 style={mainStyleH3}>ORDER RECEIVED</h3>
        <h4 style={mainStyleH4}>#{this.state.invoiceNumber}</h4>
        {this.rows()}
        <h5 style={mainStyleH5}>Customer Details</h5>
        {this.info()}
        <h5>How To Pay</h5>
        <p>
          You may purchase your order using the account details printed below to make transfer or bank payment. After payment, it is required that you send the transaction details such as <em>name, amount paid, invoice number and products ordered</em> by mail, SMS, or chat in order to fast track delivery of services.
          <span>
            <b>Bank:</b> GTBank
          </span>
          <span>
            <b>Account Name:</b> Ademiluyi Eniola
          </span>
          <span>
            <b>Account Number:</b> 0225592211
          </span>
          <span>
            <b>Phone Number:</b>09095522828
          </span>
          <span>
            <b>Email:</b>hennyiedee@gmail.com
          </span>
        </p>
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
