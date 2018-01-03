import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './scss/css/index.css';
import GrayArea from './GrayArea';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<GrayArea />, document.getElementById('root'));
registerServiceWorker();
