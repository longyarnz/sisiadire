import React, { Component } from 'react';
import { QueryRenderer } from 'react-relay';
import ENV from './env';

export default class App extends Component {
  _app({ error, props }) {
    if (error) import('./Error').then(({ Error }) => {
      return <Error caption={""} details={error} />
    });
    else if (props) import('./UI').then(({ UI }) => {
      return <UI />
    });
    else import('./LoadingPage').then(({ LoadingPage }) => {
      return <LoadingPage />
    });
  }

  render() {
    return (
      <QueryRenderer
        environment={ENV}
        query=""
        variables=""
        render={this._app}
      />
    );
  }
}