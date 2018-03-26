import React, { Component, Fragment } from 'react';
import Nav from './Nav';
import Banner from './Banner';
import OrderButton from './OrderButton';
import Import from './Import';
import CheckoutTab from './CheckoutTab';
import MenuTab from './MenuTab';
import ScrolledNav from './ScrolledNav';
// import image from "../files/demo.jpg";

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.empty = this.empty.bind(this);
    this.updateCart = this.updateCart.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.actions = {
      seeBlog: this.seeBlogList.bind(this),
      seeForm: this.seeForm.bind(this),
      seeBall: this.seeBall.bind(this),
      checkout: this.checkout.bind(this),
      genInfo: this.genInfo.bind(this)
    }
    this.state = {
      modal: false, ball: false, scrolled: '', check: false, items: [], blog: [],
      data: { cart: [] }, info: false, customer: this.props.data.customer
    }
  }

  updateCart(cart) {
    const { data } = this.state;
    data.cart = cart;
    this.setState({ data });
  }

  handleScroll(){
    const top = document.scrollingElement.scrollTop;
    if (top > 49 && this.state.scrolled !== 'scrolled') this.setState({ scrolled: 'scrolled' });
    else if (top === 0 && this.state.scrolled !== 'scrolled top' && this.state.scrolled === 'scrolled') {
      this.setState({ scrolled: 'scrolled top' });
      setTimeout(() => {
        this.setState({ scrolled: '' });
      }, 500);
    }
    else return;
  }

  componentWillMount(){
    this.setState({ data: this.props.data });
  }
  
  componentWillReceiveProps({ data }){
    this.setState({ data });
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.forceUpdate();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  
  // blog(){
  //   const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, ducimus ab corrupti amet nihil porro esse. Ipsam vel commodi ipsa consectetur est doloribus nemo. Cumque blanditiis maiores incidunt facilis neque.";
  //   return [
  //     {
  //       title: "Where art thou oh fashionista!!!",
  //       text,
  //       image,
  //       author: "Ademiluyi Eniola",
  //       time: "2hrs"
  //     },
  //     {
  //       title: "How to slay with Adire",
  //       text,
  //       image,
  //       author: "Ademiluyi Eniola",
  //       time: "2hrs"
  //     },
  //     {
  //       title: "Street credibility Vs Ingenuity",
  //       text,
  //       image,
  //       author: "Ademiluyi Eniola",
  //       time: "2hrs"
  //     },
  //     {
  //       title: "Learn to grace an event with grace",
  //       text,
  //       image,
  //       author: "Ademiluyi Eniola",
  //       time: "2hrs"
  //     },
  //     {
  //       title: "No-no Accessories with your Adire",
  //       text,
  //       image,
  //       author: "Ademiluyi Eniola",
  //       time: "2hrs"
  //     },
  //     {
  //       title: "Where art thou oh fashionista!!!",
  //       text,
  //       image,
  //       author: "Ademiluyi Eniola",
  //       time: "2hrs"
  //     }
  //   ]
  // }

  genInfo(customer){
    const { view } = this.props.data;
    view !== null && view.props.name === 'Welcome' && this.setState({ customer });
    this.props.actions.genInfo(customer);
  }

  seeForm(infoPoint) {
    this.setState(i => ({ info: !i.info, infoPoint }));
  }
 
  seeBlogList(){
    this.setState(i => ({ modal: !i.modal }));
  }

  seeBall(story){
    this.setState(i => ({ ball: !i.ball, story }));
  }

  checkout(){
    this.setState(i => ({ check: !i.check }));
  }

  empty() {
    this.props.actions.add(false);
    const { data } = this.state;
    data.cart = [];
    this.setState({ data });
  }
  
  render() {
    const actions = Object.assign({}, this.props.actions, this.actions);
    // eslint-disable-next-line
    const { seeBlog, seeBall, checkout, seeForm, genInfo } = actions;
    // eslint-disable-next-line
    const { data, data: {cart, blog, items}, modal, check, ball, story, scrolled, info, infoPoint } = this.state;
    return (
      <Fragment>
        <Nav type={true} attr="null" cart={cart.length} click={seeBlog} checkout={checkout} />
        <Banner />
        <OrderButton click={seeForm} />
        {/* <Import name="Category" items={items} data={data} actions={actions} /> */}
        <Import name="About" />
        <Import name="Contact" />
        <Import name="Footer" />
        {
          modal &&
          <Import name="Modal" toggle={seeBlog}>
            <MenuTab slabs={blog} showBall={seeBall} />
          </Import>
        }
        {
          check &&
          <Import name="Modal" toggle={checkout}>
            <CheckoutTab slabs={cart} actions={actions} updateItem={this.updateCart} showInfo={seeForm} />
          </Import>
        }
        {
          ball &&
          <Import name="Ball" toggle={seeBall} cart={cart.length} story={story} />
        }
        { info &&
          <Import name="Ball" toggle={seeForm} cart={cart.length} story={infoPoint}>
            <Import name="OrderForm" upload={genInfo} customer={this.state.customer} cart={cart} empty={this.empty} />
          </Import> 
        }
        {
          scrolled !== '' &&
          <ScrolledNav attr={scrolled} cart={cart.length} click={seeBlog} checkout={checkout} type={true} />
        }
      </Fragment>
    )
  }
}