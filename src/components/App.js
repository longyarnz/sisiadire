import React, { Component } from 'react';
import UI from './UI';

export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      view: null
    }

    this.actions = {
      a: 1
    }
  }
  
  render() {
    return <UI />;
  }
}