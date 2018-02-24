import React, { Component } from 'react';

export default class Modal extends Component {
  constructor(props){
    super(props);
    this.e = [];
    this.close = this.close.bind(this);
    this.get = this.get.bind(this);
    this.state = { confirmed: false }
  }

  componentWillMount(){
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
  }

  componentWillUnmount(){
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
  }

  close() {
    this.setState({ direction: 'reverse' });
    setTimeout(() => {
      this.e[0].style.animation = 'none';
    }, 100);
    setTimeout(() => {
      this.e[0].style.animation = '';
    }, 200);
    setTimeout(() => {
      this.props.toggle();
    }, 650);
  }

  get(x){
    this.e.push(x);
  }

  render() {
    return (
      <main ref={this.get} className="modal">
        <div className={this.state.direction} ref={this.get}>
          <i className="material-icons" onClick={this.close}>close</i>
          {this.props.children}
        </div>
      </main>
    );
  }
}