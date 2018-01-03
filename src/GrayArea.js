import React, { Component } from 'react';
import App from './App';

export default class GrayArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: <App />
    }
  }
  
  async componentDidCatch(error, info){
    const Error = await import('./components/Error');
    this.setState({ view: <Error caption={error} info={info} /> });
  }

  render() {
    return this.state.view
  }
}