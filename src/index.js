import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import './scss/main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import GrayArea from './GrayArea';
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(<GrayArea />, document.getElementById('root'));
registerServiceWorker();