import React, { Component } from 'react'

export default class Import extends Component {
  constructor(props) {
    super(props);
    this.state = { view: null }
  }

  async componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  async componentWillReceiveProps(props) {
    const { name } = props;
    const { default: Load } = await import(`./${name}`);
    try {
      Load.defaultProps = props;
    }
    finally {
      this.setState(i => { return { view: <Load /> } });
    }
  }

  render() {
    return this.state.view;
  }
}