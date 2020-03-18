import React from 'react';
import { Link } from 'react-router-dom';
import IntlMessages from 'util/IntlMessages';

const Error404 = () => (
  <div className="app-wrapper page-error-container animated slideInUpTiny animation-duration-3">
    <div className="page-error-content">
      <div className="error-code mb-4 animated zoomInDown">404</div>
      <h2 className="text-center fw-regular title bounceIn animation-delay-10 animated">
        <IntlMessages id="extraPages.404Msg" />
      </h2>
    </div>
  </div>
);

export default Error404;
