import React, { Component } from 'react';
import Import from './components/Import';

export default class GrayArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: <Import name="UI" />
    }
  }
  
  async componentDidCatch(error, info){
    this.setState({ view: <Import name="Error" error={error} info={info} /> });
  }

  render() {
    return this.state.view
  }
}