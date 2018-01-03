import React, { Component } from 'react';
import { QueryRenderer } from 'react-relay';
import ENV from './env';
import UI from './UI';
import Error from './Error';

export default class App extends Component {
  _app({ error, props }) {
    if (error) {
      return <Error caption={error} info={error} />
    }
    return <UI load={props} />;    
  }

  render() {
    return (
      <QueryRenderer
        environment={ENV}
        query=""
        variables={{app: true}}
        render={this._app}
      />
    );
  }
}