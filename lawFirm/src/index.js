import React from 'react';
import ReactDOM from 'react-dom';
import 'remixicon/fonts/remixicon.css';
import 'react-notifications/lib/notifications.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-splitter-layout/lib/index.css';
import 'cropperjs/dist/cropper.css';
import 'react-datasheet/lib/react-datasheet.css';
import './assets/animate.css';
import * as Raven from './helpers/sentry';

Raven.install();
const rootEl = document.getElementById('app-site');

// Create a reusable render method that we can call more than once
const render = () => {
  // Dynamically import our main App component, and render it
  const MainApp = require('./MainApp').default;

  window.onbeforeunload = () => {
    localStorage.removeItem('user'); // 사용자 정보 삭제 (보안, token은 남김)
    return undefined; // 닫을때 confirm 보여주지 않음.
  };

  ReactDOM.render(<MainApp />, rootEl);
};

if (module.hot) {
  module.hot.accept('./MainApp', () => {
    const NextApp = require('./MainApp').default;
    render(<NextApp />, rootEl);
  });
}

render();
