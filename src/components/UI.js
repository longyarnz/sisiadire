import React, { Component } from 'react';
import Import from './Import';

export default class UI extends Component {
  constructor(props) {
    super(props)
    this.actions = {
      back: this.back.bind(this),
      paginate: this.paginate.bind(this),
      add: this.addToCart.bind(this),
      remove: this.removeFromCart.bind(this),
      update: this.updateCart.bind(this),
      genInfo: this.genInfo.bind(this)
    }

    this.state = {
      view: null, customer: {
        _name: "", phone: "", email: ""
      }, prev: [], cart: []
    }
  }

  componentWillMount(){
    this.setState({ view: <Import name="Welcome" actions={this.actions} data={this.state} /> })
  }

  genInfo(customer) {
    this.setState({ customer });
  }

  paginate(view){
    const { prev } = this.state;
    prev.push(this.state.view);
    this.setState(i => ({ view, prev }));
  }

  addToCart(item){
    console.log(1);
    if(!item) {
      this.setState({ cart: [] });
      return;
    }
    const { cart } = this.state;
    cart.push(item);
    this.setState({ cart });
  }

  updateCart(cart){
    this.setState({ cart });
  }

  removeFromCart(invoiceNumber) {
    const cart = [];
    const o = this.state.cart;
    for (let i = 0; i < o.length; i++) {
      if(o[i].invoiceNumber !== invoiceNumber) cart.push(o[i]);
    }
    this.setState({ cart });
    return cart;
  }

  back(){
    const { prev } = this.state;
    const view = Object.assign({}, prev[prev.length - 1]);
    const props = Object.assign({}, view.props);
    Object.defineProperty(props, 'data', {value: this.state});
    Object.defineProperty(view, 'props', {value: props});
    prev.pop();
    this.setState({ view, prev });
  }

  componentDidMount() {
    document.getElementsByTagName('html')[0].scrollIntoView();
  }

  viewLayer(props){
    this.setState({ view: null })
  }
  
  render() {
    return this.state.view;
  }
}
