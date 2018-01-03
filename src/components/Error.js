import React, { Component } from 'react';

export default class Error extends Component {
  render() {
    return (
      <section>
        <h1>{this.props.error}</h1>
        <code>{this.props.info}</code>
      </section>
    )
  }
}
