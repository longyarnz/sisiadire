import React, { Component, Fragment } from 'react';
import Nav from './Nav';
import Banner from './Banner';
import Import from './Import';
import image from "../files/demo.jpg";

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
      modal: false, ball: false, scrolled: '', check: false,
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
    else if (top < 50 && this.state.scrolled !== 'scrolled top' && this.state.scrolled === 'scrolled') {
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
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.forceUpdate();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  
  blog(){
    const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, ducimus ab corrupti amet nihil porro esse. Ipsam vel commodi ipsa consectetur est doloribus nemo. Cumque blanditiis maiores incidunt facilis neque.";
    return [
      {
        title: "Where art thou oh fashionista!!!",
        text,
        image,
        author: "Ademiluyi Eniola",
        time: "2hrs"
      },
      {
        title: "How to slay with Adire",
        text,
        image,
        author: "Ademiluyi Eniola",
        time: "2hrs"
      },
      {
        title: "Street credibility Vs Ingenuity",
        text,
        image,
        author: "Ademiluyi Eniola",
        time: "2hrs"
      },
      {
        title: "Learn to grace an event with grace",
        text,
        image,
        author: "Ademiluyi Eniola",
        time: "2hrs"
      },
      {
        title: "No-no Accessories with your Adire",
        text,
        image,
        author: "Ademiluyi Eniola",
        time: "2hrs"
      },
      {
        title: "Where art thou oh fashionista!!!",
        text,
        image,
        author: "Ademiluyi Eniola",
        time: "2hrs"
      },
      {
        title: "How to slay with Adire",
        text,
        image,
        author: "Ademiluyi Eniola",
        time: "2hrs"
      },
      {
        title: "Street credibility Vs Ingenuity",
        text,
        image,
        author: "Ademiluyi Eniola",
        time: "2hrs"
      },
      {
        title: "Learn to grace an event with grace",
        text,
        image,
        author: "Ademiluyi Eniola",
        time: "2hrs"
      },
      {
        title: "No-no Accessories with your Adire",
        text,
        image,
        author: "Ademiluyi Eniola",
        time: "2hrs"
      }
    ]
  }

  items(){
    const desc = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque architecto, tempore quia quaerat facilis quae ullam dolorum.";
    return [
      {
        title: "Aso Ebi",
        ctg: "blouses",
        price: 10000,
        tag: "10K",
        desc,
        img: image
      },
      {
        title: "Iro Pupa",
        ctg: "gowns",
        price: 5000,
        tag: "5K",
        desc,
        img: image
      },
      {
        title: "Fila Ode",
        ctg: "caps",
        price: 7000,
        tag: "7K",
        desc,
        img: image
      },
      {
        title: "Vintage",
        ctg: "male shirts",
        price: 7000,
        tag: "7K",
        desc,
        img: image
      },
      {
        title: "Fila Abete",
        ctg: "caps",
        price: 1000,
        tag: "1K",
        desc,
        img: image
      },
      {
        title: "Ewu Oko",
        ctg: "gowns",
        price: 5000,
        tag: "5K",
        desc,
        img: image
      },
      {
        title: "Aso Opa",
        ctg: "blouses",
        price: 7000,
        tag: "7K",
        desc,
        img: image
      },
      {
        title: "Fila Abete",
        ctg: "caps",
        price: 1000,
        tag: "1K",
        desc,
        img: image
      },
      {
        title: "Ewu Oko",
        ctg: "gowns",
        price: 5000,
        tag: "5K",
        desc,
        img: image
      },
      {
        title: "Aso Opa",
        ctg: "blouses",
        price: 7000,
        tag: "7K",
        desc,
        img: image
      },
      {
        title: "Aso Ebi",
        ctg: "blouses",
        price: 10000,
        tag: "10K",
        desc,
        img: image
      },
      {
        title: "Iro Pupa",
        ctg: "gowns",
        price: 5000,
        tag: "5K",
        desc,
        img: image
      },
      {
        title: "Fila Ode",
        ctg: "caps",
        price: 7000,
        tag: "7K",
        desc,
        img: image
      },
      {
        title: "Vintage",
        ctg: "male shirts",
        price: 7000,
        tag: "7K",
        desc,
        img: image
      },
      {
        title: "Fila Abete",
        ctg: "caps",
        price: 1000,
        tag: "1K",
        desc,
        img: image
      },
      {
        title: "Ewu Oko",
        ctg: "gowns",
        price: 5000,
        tag: "5K",
        desc,
        img: image
      },
      {
        title: "Aso Opa",
        ctg: "blouses",
        price: 7000,
        tag: "7K",
        desc,
        img: image
      },
      {
        title: "Fila Abete",
        ctg: "caps",
        price: 1000,
        tag: "1K",
        desc,
        img: image
      },
      {
        title: "Ewu Oko",
        ctg: "gowns",
        price: 5000,
        tag: "5K",
        desc,
        img: image
      },
      {
        title: "Aso Opa",
        ctg: "blouses",
        price: 7000,
        tag: "7K",
        desc,
        img: image
      },
      {
        title: "Aso Ebi",
        ctg: "blouses",
        price: 10000,
        tag: "10K",
        desc,
        img: image
      },
      {
        title: "Iro Pupa",
        ctg: "gowns",
        price: 5000,
        tag: "5K",
        desc,
        img: image
      },
      {
        title: "Fila Ode",
        ctg: "caps",
        price: 7000,
        tag: "7K",
        desc,
        img: image
      },
      {
        title: "Vintage",
        ctg: "male shirts",
        price: 7000,
        tag: "7K",
        desc,
        img: image
      },
      {
        title: "Fila Abete",
        ctg: "caps",
        price: 1000,
        tag: "1K",
        desc,
        img: image
      },
      {
        title: "Ewu Oko",
        ctg: "gowns",
        price: 5000,
        tag: "5K",
        desc,
        img: image
      },
      {
        title: "Aso Opa",
        ctg: "blouses",
        price: 7000,
        tag: "7K",
        desc,
        img: image
      },
      {
        title: "Fila Abete",
        ctg: "caps",
        price: 1000,
        tag: "1K",
        desc,
        img: image
      },
      {
        title: "Ewu Oko",
        ctg: "gowns",
        price: 5000,
        tag: "5K",
        desc,
        img: image
      },
      {
        title: "Aso Opa",
        ctg: "blouses",
        price: 7000,
        tag: "7K",
        desc,
        img: image
      },
      {
        title: "Aso Ebi",
        ctg: "blouses",
        price: 10000,
        tag: "10K",
        desc,
        img: image
      },
      {
        title: "Iro Pupa",
        ctg: "gowns",
        price: 5000,
        tag: "5K",
        desc,
        img: image
      },
      {
        title: "Fila Ode",
        ctg: "caps",
        price: 7000,
        tag: "7K",
        desc,
        img: image
      },
      {
        title: "Vintage",
        ctg: "male shirts",
        price: 7000,
        tag: "7K",
        desc,
        img: image
      },
      {
        title: "Fila Abete",
        ctg: "caps",
        price: 1000,
        tag: "1K",
        desc,
        img: image
      },
      {
        title: "Ewu Oko",
        ctg: "gowns",
        price: 5000,
        tag: "5K",
        desc,
        img: image
      },
      {
        title: "Aso Opa",
        ctg: "blouses",
        price: 7000,
        tag: "7K",
        desc,
        img: image
      },
      {
        title: "Fila Abete",
        ctg: "caps",
        price: 1000,
        tag: "1K",
        desc,
        img: image
      },
      {
        title: "Ewu Oko",
        ctg: "gowns",
        price: 5000,
        tag: "5K",
        desc,
        img: image
      },
      {
        title: "Aso Opa",
        ctg: "blouses",
        price: 7000,
        tag: "7K",
        desc,
        img: image
      }
    ]
  }

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
    const { seeBlog, seeBall, checkout, seeForm, genInfo } = actions;
    const { data, data: {cart}, modal, check, ball, story, scrolled, info, infoPoint } = this.state;
    return (
      <Fragment>
        <Nav type={true} attr="null" cart={cart.length} click={seeBlog} checkout={checkout} />
        <Banner />
        <Import name="Category" items={this.items()} data={data} actions={actions} />
        <Import name="About" />
        <Import name="Contact" />
        <Import name="Footer" />
        {
          modal &&
          <Import name="Modal" toggle={seeBlog}>
            <Import name="MenuTab" slabs={this.blog()} showBall={seeBall} />
          </Import>
        }
        {
          check &&
          <Import name="Modal" toggle={checkout}>
            <Import name="CheckoutTab" slabs={cart} actions={actions} updateItem={this.updateCart} showInfo={seeForm} />
          </Import>
        }
        {
          ball &&
          <Import name="Ball" toggle={seeBall} cart={cart.length} story={story} />
        }
        { info &&
          <Import name="Ball" toggle={seeForm} cart={cart.length} story={infoPoint}>
            <Import name="Form" upload={genInfo} customer={this.state.customer} cart={cart} empty={this.empty} />
          </Import> 
        }
        {
          scrolled !== '' &&
          <Import name="ScrolledNav" attr={scrolled} cart={cart.length} click={seeBlog} checkout={checkout} />
        }
      </Fragment>
    )
  }
}
