import React from 'react';
import PropTypes from 'prop-types';

import '../styles/heading.css';

function Heading({ children }) {
  return (
    <div className="heading">
      <h1>{children}</h1>
    </div>
  );
}

Heading.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};

export default Heading;
