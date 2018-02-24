import { Component } from 'react';

export default class ErrorBoundary extends Component {
  componentDidCatch(e, i){
    this.setState({ view: [e, i]})
    alert(e);
  }

  render() {
    return this.props.children;
  }
}