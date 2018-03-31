import React, { Component, Fragment } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Charts from '../components/Charts';
import Import from './Import';

export default class Shop extends Component {
  constructor(props) {
    super(props)
    this.empty = this.empty.bind(this);
    this.clicke = this.clicke.bind(this);
    this.showOne = this.showOne.bind(this);
    this.showAll = this.showAll.bind(this);
    this.seeBall = this.seeBall.bind(this);
    this.genInfo = this.genInfo.bind(this);
    this.seeForm = this.seeForm.bind(this);
    this.checkout = this.checkout.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = {
      view: this.showAll(),
      title: "Àdìre Store", shouldReload: 1,
      scrolled: '', ball: false,
      checkout: false, cart: [],
      info: false, customer: this.props.data.customer
    }
  }

  componentWillMount(cart) {
    this.setState({ cart: this.props.data.cart });
  }

  empty() {
    this.props.actions.add(false);
    this.setState({ cart: [], shouldReload: 0 });
  }

  updateCart(cart) {
    this.setState({ cart });
  }

  seeForm(infoPoint) {
    this.setState(i => ({ info: !i.info, infoPoint }));
  }

  handleScroll() {
    const top = document.scrollingElement.scrollTop;
    if (top >= 150 && this.state.scrolled !== 'scrolled') this.setState({ scrolled: 'scrolled' });
    else if (top === 0 && this.state.scrolled !== 'scrolled top' && this.state.scrolled === 'scrolled') {
      this.setState({ scrolled: 'scrolled top' });
      setTimeout(() => {
        this.setState({ scrolled: '' });
      }, 1200);
    }
    else return;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    document.getElementsByTagName('html')[0].scrollIntoView();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  clicke(i){
    const { actions, data, actions: { paginate } } = this.props;
    const { cart } = this.state;
    paginate(<Import name="Item" i={i} actions={actions} data={data} cart={cart} />);
  }

  showOne(i, o){
    return(
      <div key={o}>
        <Charts title={i.title} ctg={i.ctg} img={i.picture_file} i={i} click={() => this.clicke(i)} attr="chart" tag={i.price} />
      </div>
    )
  }

  showAll(){
    const { items } = this.props;
    if(items){
      return items.map((i, o) => this.showOne(i, o));
    }
    else{
      return null;
    }
  }

  genInfo(customer){
    this.setState({ customer });
    this.props.actions.genInfo(customer);
  }

  checkout(story) {
    this.setState(i => ({ checkout: !i.checkout }));
  }

  seeBall() {
    this.setState(i => ({ ball: !i.ball }));
  }

  render() {
    const { actions } = this.props;
    const { cart, ball, info, infoPoint, shouldReload } = this.state;
    return (
      <Fragment>
        <Nav type={false} cart={cart.length} click={actions.back} blog={false} checkout={this.checkout} attr="scrolled" />
        <section className="shop">
          <h1>{this.props.ctg}</h1>
          <main>
            { this.state.view }
          </main>
        </section>    
        <Footer />
        {
          this.state.checkout &&
          <Import name="Modal" toggle={this.checkout}>
            <Import name="CheckoutTab" cart={cart} actions={actions} updateItem={this.updateCart} showInfo={this.seeForm} />
          </Import>
        }
        {
          ball &&
          <Import name="Ball" toggle={this.seeBall} cart={cart.length}>
            <Import name="Form" upload={this.genInfo} customer={this.props.data.customer} />
          </Import>
        }
        {
          info &&
          <Import name="Ball" toggle={this.seeForm} cart={cart.length} story={infoPoint} reload={shouldReload} actions={actions}>
            <Import name="Form" upload={this.genInfo} customer={this.state.customer} cart={cart} empty={this.empty} />
          </Import>
        }
      </Fragment>
    )
  }
}