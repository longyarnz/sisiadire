import React, { Fragment, Component } from 'react';
import Import from './Import';
export default class Ball extends Component {
  constructor(props) {
    super(props)
    this.e = [];
    this.close = this.close.bind(this);
    this.get = this.get.bind(this);
    this.state = {
      x: 0, y: 0, phase: '', children: null
    }
  }
  
  componentWillMount() {
    // document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    const {story: { x, y }} = this.props;
    this.setState({ x, y });
  }

  componentWillUnmount() {
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }

  componentWillReceiveProps({ x, y }) {
    if (x && y) this.setState({ x, y });
  }
  
  close(){
    this.setState({ phase: 'reverse' });
    this.e[0].style.animation = 'none';
    setTimeout(() => {
      this.e[0].style.animation = '';
    }, 50);
    setTimeout(() => {
      this.props.toggle();
    }, 700);
  }

  componentDidMount() {
    let { children } = this.props;
    if(!children){
      const i = this.props.story;
      const caption = (
        <Fragment>
          <h3>{i.title}</h3>
          <h5>By: <span>{i.author}</span></h5>
          <p>{i.text}</p>
        </Fragment>
      );
      children = (
        <Fragment>
          <Import name="Nav" attr="scrolled" cart={this.props.cart} type={false} blog={true} click={this.close} />
          <Import name="Figure" caption={caption} img={i.image} attr="item-figure" />
          <Import name="Footer" />
        </Fragment>
      );
    }
    else{
      children = (
        <Fragment>
          <Import name="Nav" attr="scrolled" cart={this.props.cart} type={false} blog={true} click={this.close} />
          {children}
          <Import name="Footer" />
        </Fragment>
      );
    }
    setTimeout(() => {
      document.getElementsByTagName('html')[0].style.overflow = 'hidden';
      this.setState({ x: 0, y: 0, phase: 'mounted', children });
    }, 500);
  }

  get(x) {
    this.e.push(x);
  }
  
  render() {
    let { x, y, children } = this.state;
    x = (x - 5 < 0) ? 0 : (x - 5);
    y = (y - 5 < 0) ? 0 : (y - 5);
    const style = {
      top: y, left: x
    }
    return (
      <section className={`ball ${this.state.phase}`} ref={this.get} style={style}>
        {children}
      </section>
    )
  }
}
