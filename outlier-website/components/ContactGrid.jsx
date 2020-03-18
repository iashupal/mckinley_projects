import React from 'react';
import PropTypes from 'prop-types';

import '../styles/contact-grid.css';

function ContactGrid({ children }) {
  return <div className="contact-grid">{children}</div>;
}

ContactGrid.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default ContactGrid;
