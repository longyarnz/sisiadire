import React, { Component } from 'react';
import LoadingPage from './LoadingPage';
import Welcome from './Welcome';

export default class UI extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      view: <LoadingPage />
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    nextProps.load && this.setState({ view: <Welcome /> })
  }
  
  
  render() {
    return this.state.view;
  }
}
