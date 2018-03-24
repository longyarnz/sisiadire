import React, { Component } from 'react';
import Nav from './Nav';
import Figure from './Figure';
import Caption from './Caption';
import Import from './Import';
import Footer from './Footer';

export default class Item extends Component{ 
  constructor(props){
    super(props);
    this.empty = this.empty.bind(this);
    this.seeForm = this.seeForm.bind(this);
    this.genInfo = this.genInfo.bind(this);
    this.checkout = this.checkout.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.toggleCart = this.toggleCart.bind(this);
    this.genInvoice = this.genInvoice.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.state = {
      modal: false, cost: this.props.i.price, quantity: 1, form: false,
      title: this.props.i.title, price: this.props.i.price, i: this.props.i,
      checkout: false, cart: [], info: false, customer: this.props.data.customer
    }
  } 

  componentWillMount(){
    this.setState({ cart: this.props.actions.cart() });
  }

  updateCart(cart) {
    this.setState({ cart });
  }

  addToCart(item){
    const cart = Object.assign([], this.props.actions.cart());
    cart.push(item);
    this.setState({ cart });
    setTimeout(() => this.props.actions.add(item), 500);
  }

  componentDidMount() {
    document.getElementsByTagName('html')[0].scrollIntoView();
    this.genInvoice();
  }
  
  genInvoice(){
    this.setState({ invoiceNumber: this.state.cart.length + 1 });
  }

  genInfo(customer) {
    this.setState({ customer, form: true });
    this.props.actions.genInfo(customer);
  }
  
  toggleCart(){
    this.setState(i => ({ modal: !i.modal }));
    this.genInvoice();
  }
  
  updatePrice(cost, quantity){
    this.setState({ cost, quantity });
  }

  checkout(story) {
    this.setState(i => ({ checkout: !i.checkout }));
  }

  seeForm(infoPoint) {
    this.setState(i => ({ info: !i.info, infoPoint }));
  }

  empty(){
    this.props.actions.add(false);
    this.setState({ cart: []});
  }

  render(){
    const { i, actions } = this.props;
    const { cart, modal, checkout, info, infoPoint } = this.state;
    const caption = <Caption item={i} attr="item-caption" toggle={this.toggleCart} click={(i, o)=>this.updatePrice(i, o)} />;
    return (
      <section className="item">
        <Nav type={false} cart={cart.length} attr="scrolled" click={actions.back} checkout={this.checkout} />
        <Figure caption={caption} img={i.picture_file} attr="item-figure"  />
        <Footer />
        {
          modal && 
          <Import name="Modal" toggle={this.toggleCart}>
            <Import name="InvoiceCard" item={this.state} add={this.addToCart} close={this.toggleCart} />
          </Import>
        }
        {
          checkout &&
          <Import name="Modal" toggle={this.checkout}>
            <Import name="CheckoutTab" slabs={cart} actions={actions} updateItem={this.updateCart} showInfo={this.seeForm} />
          </Import>
        }
        {
          info &&
          <Import name="Ball" toggle={this.seeForm} cart={cart.length} story={infoPoint}>
            <Import name="Form" upload={this.genInfo} customer={this.state.customer} cart={this.state.cart} empty={this.empty} />
          </Import>
        }
      </section>
    )
  }
}