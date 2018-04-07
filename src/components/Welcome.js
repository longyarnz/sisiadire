import React, { Component, Fragment } from 'react';
import Nav from './Nav';
import Ball from './Ball';
import Banner from './Banner';
import OrderButton from './OrderButton';
import OrderForm from './OrderForm';
import Form from './Form';
import Import from './Import';
import CheckoutTab from './CheckoutTab';
import MenuTab from './MenuTab';
import Modal from './Modal';
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
      info: false, customer: this.props.data.customer, cart: [], shouldReload: 1
    }
  }

  updateCart(cart) {
    this.setState({ cart });
  }

  handleScroll() {
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

  componentWillMount() {
    this.setState({ data: this.props.data, cart: this.props.data.cart });
  }

  componentWillReceiveProps({ data }) {
    this.setState({ data, cart: data.cart });
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

  genInfo(customer) {
    const { view } = this.props.data;
    view !== null && view.props.name === 'Welcome' && this.setState({ customer });
    this.props.actions.genInfo(customer);
  }

  seeForm(infoPoint, FormType) {
    this.setState(i => ({ info: !i.info, infoPoint, FormType }));
  }

  seeBlogList() {
    this.setState(i => ({ modal: !i.modal }));
  }

  seeBall(story) {
    this.setState(i => ({ ball: !i.ball, story }));
  }

  checkout() {
    this.setState(i => ({ check: !i.check }));
  }

  empty() {
    this.props.actions.add(false);
    this.setState({ cart: [], shouldReload: 0 });
  }

  render() {
    const actions = Object.assign({}, this.props.actions, this.actions);
    const { seeBlog, seeBall, checkout, seeForm, genInfo } = actions;
    const { cart, data, data: { blog, items }, modal, check, ball, story, scrolled, info, infoPoint, FormType, shouldReload } = this.state;
    let Tab = <CheckoutTab cart={cart} actions={actions} updateItem={this.updateCart} showInfo={seeForm} />;
    return (
      <Fragment>
        <Nav type={true} attr="null" cart={cart.length} click={seeBlog} checkout={checkout} />
        <Banner />
        <Import name="Category" items={items} data={data} actions={actions} />
        <OrderButton click={seeForm} />
        <Import name="About" />
        <Import name="Contact" />
        <Import name="Footer" />
        {
          modal &&
          <Modal toggle={seeBlog}>
            <MenuTab slabs={blog} showBall={seeBall} />
          </Modal>
        }
        {
          check &&
          <Modal toggle={checkout} cart={cart}>
            {Tab}
          </Modal>
        }
        {
          ball &&
          <Ball toggle={seeBall} cart={cart.length} story={story} />
        }
        {info &&
          <Ball toggle={seeForm} cart={cart.length} story={infoPoint} reload={shouldReload} actions={actions}>
            {FormType === "Form" && <Form upload={genInfo} customer={this.state.customer} cart={cart} empty={this.empty} />}
            {FormType === "OrderForm" && <OrderForm upload={genInfo} customer={this.state.customer} cart={cart} empty={this.empty} />}
          </Ball>
        }
        {
          scrolled !== '' &&
          <ScrolledNav attr={scrolled} cart={cart.length} click={seeBlog} checkout={checkout} type={true} />
        }
      </Fragment>
    )
  }
}