import React from 'react';
import PropTypes from 'prop-types';

import '../styles/callout.css';

function Callout({ borderless }) {
  return (
    <div className={`callout ${borderless ? 'callout--borderless' : ''}`}>
      <p className="callout__title">Explore more work from Wray Ward.</p>
      <span className="callout__flat-action">View Related Work</span>
    </div>
  );
}

Callout.propTypes = {
  borderless: PropTypes.bool,
};

Callout.defaultProps = {
  borderless: false,
};

export default Callout;
