import React, { Fragment, Component } from 'react';
import Figure from './Figure';
import Button from './Button';
import OverButton from './OverButton';

export default class CheckoutTab extends Component {
  constructor(props) {
    super(props)
    this.tabs = this.tabs.bind(this);
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.seeInfo = this.seeInfo.bind(this); 
    this.handleClick = this.handleClick.bind(this); 
  }

  componentWillMount(){
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps({ slabs }) {
    this.setState({ cart: slabs });
  }
  
  handleClick(invoiceNumber){
    const cart = this.props.actions.remove(invoiceNumber);
    this.props.updateItem ? this.props.updateItem(cart) : this.setState({ cart });
  }

  seeInfo(e) {
    const { clientX: x, clientY: y } = e.nativeEvent;
    this.props.showInfo({ x, y });
  }

  tabs() {
    const x = '', y = '';
    return (
      <Fragment>
        {
          this.state.cart.map((i, o) => {
            const click = () => this.handleClick(i.invoiceNumber);
            const key = Math.floor(Math.random() * 100);
            const caption = (
              <Fragment>
                <h5>
                  {i.title}
                  <i className="material-icons" onClick={click}>close</i>
                </h5>
                <div className="checkout-tab">
                  <span>#{i.invoiceNumber}</span>
                  <Button ext={x} goog={`remove`} attr="checkout-tab-button" click={() => this.subtract(o)} />
                  <span>{i.quantity}</span>
                  <Button ext={y} goog={`add`} attr="checkout-tab-button" click={() => this.add(o)} />
                  <span>₦{i.cost}</span>
                </div>
              </Fragment>
            );
            return <Figure attr="checkout-tab" alt="Blog photo" caption={caption} key={key * o} />
          })
        }
        <Button text="Checkout" click={this.seeInfo} />
      </Fragment>
    )
  }

  add(i){
    const { cart } = this.state;
    ++cart[i].quantity;
    cart[i].cost = cart[i].quantity * cart[i].price;
    this.setState({ cart });
    this.props.actions.update(cart);
  }

  subtract(i){
    const { cart } = this.state;
    if (cart[i].quantity <= 1) return;
    --cart[i].quantity;
    cart[i].cost = cart[i].quantity * cart[i].price;
    this.setState({ cart });
    this.props.actions.update(cart);
  }

  render() {
    const emptyCart = this.state.cart.length > 0;
    return (
      <div className="menutab checkout-tab">
        <header className="menutab checkout-tab"><h4>Your Cart</h4></header>
        <main className={`menutab checkout-tab ${!emptyCart && 'empty'}`}>{
          emptyCart > 0 ? this.tabs() : <OverButton icon="add_shopping_cart" />
        }</main>
      </div>
    )
  }
}