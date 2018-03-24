import React, { Component } from 'react';
import Nav from './Nav';

export default class Modal extends Component {
  constructor(props){
    super(props);
    this.e = [];
    this.close = this.close.bind(this);
    this.get = this.get.bind(this);
    const child = Object.assign({}, this.props.children);
    const char = Object.assign({}, child.props);
    char.closeModal = this.close;
    child.props = char;
    this.state = { confirmed: false, notReady: false, child }
  }

  componentWillMount(){
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }

  componentWillUnmount(){
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }
  
  close() {
    if(this.state.notReady) return;
    this.setState({ direction: 'reverse', notReady: true });
    this.e[0].style.animation = 'none';
    setTimeout(() => {
      this.e[0].style.animation = '';
    }, 50);
    setTimeout(() => {
      this.props.toggle();
    }, 750);
  }

  get(x){
    this.e.push(x);
  }

  render() {
    return (
      <section ref={this.get} className="modal">
        <Nav type={false} attr="modal" click={this.close} />
        <div className={this.state.direction} ref={this.get}>
          {this.state.child}
        </div>
      </section>
    );
  }
}