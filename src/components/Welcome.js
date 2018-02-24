import React, { Component, Fragment } from 'react';
import Nav from './Nav';
import Banner from './Banner';
import About from './About';
import Category from './Category';
import Contact from './Contact';
import Footer from './Footer';
import Import from './Import';

export default class Welcome extends Component {
  constructor(props) {
    super(props)
    this.actions = {
      blog: this.seeBlog.bind(this)
    }

    this.state = {
      modal: false
    }
  }

  seeBlog(){
    this.setState(i => ({ modal: !i.modal }));
  }
  
  render() {
    return (
      <Fragment>
        <Nav type={true} click={this.actions.blog} />
        <Banner />
        <Category actions={this.props.actions} />
        <About />
        <Contact />
        <Footer />
        {
          this.state.modal &&
          <Import name="Modal" toggle={this.actions.blog} children="Hi there!" />
        }
      </Fragment>
    )
  }
}
