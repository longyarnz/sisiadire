import React, { Component } from 'react';
import Welcome from './Welcome';

export default class UI extends Component {
  constructor(props) {
    super(props)
    
    this.actions = {
      back: this.back.bind(this),
      paginate: this.paginate.bind(this)
    }

    this.state = {
      view: <Welcome actions={this.actions} />,
      prev: []
    }
  }

  paginate(view){
    const { prev } = this.state;
    prev.push(this.state.view);
    this.setState(i => ({ view, prev }));
  }

  back(){
    const { prev } = this.state;
    const view = prev[prev.length - 1];
    prev.pop();
    this.setState({ view, prev });
  }

  componentDidMount() {
    document.getElementsByTagName('html')[0].scrollIntoView();
  }

  componentWillReceiveProps(nextProps) {
    // this.viewLayer(nextProps);
  }

  viewLayer(props){
    this.setState({ view: null })
  }
  
  render() {
    return this.state.view;
  }
}
