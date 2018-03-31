import React, { Component } from 'react'

export default class Import extends Component {
  constructor(props) {
    super(props);
    this.state = { view: null }
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  async componentWillReceiveProps(props) {
    const { name } = props;
    const { default: Load } = await import(`./${name}`);
    this.setState(i => ({ view: <Load {...this.props} /> }));
  }

  render() {
    return this.state.view;
  }
}