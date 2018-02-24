import React, { Component } from 'react';
import Nav from './Nav';
import Figure from './Figure';
import Caption from './Caption';
import Import from './Import';
import Footer from './Footer';

export default class Item extends Component{ 
  constructor(props){
    super(props);
    this.toggleCart = this.toggleCart.bind(this);
    this.genInvoice = this.genInvoice.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.state = {
      modal: false, price: this.props.i.price
    }
  }

  componentDidMount() {
    document.getElementsByTagName('html')[0].scrollIntoView();
    this.genInvoice();
  }
  
  genInvoice(){
    const invoiceNumber = Math.floor((Math.random() + 1) * 100000);
    this.setState({ invoiceNumber });
  }
  
  toggleCart(){
    this.setState(i => ({ modal: !i.modal }));
    this.genInvoice();
  }
  
  updatePrice(price){
    this.setState({ price });
  }

  render(){
    const { price, invoiceNumber } = this.state;
    const { i } = this.props;
    const caption = <Caption item={i} attr="item-caption" toggle={this.toggleCart} click={(e)=>this.updatePrice(e)} />;
    return (
      <section className="item">
        <Nav type={false} click={this.props.actions.back} />
        <Figure caption={caption} img={i.img} attr="item-figure"  />
        <Footer />
        {
          this.state.modal && 
          <Import name="Modal" toggle={this.toggleCart} children={(<Import name="InvoiceCard" price={price} invoice={invoiceNumber} />)} />
        }
      </section>
    )
  }
}