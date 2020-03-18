import React from 'react';
import PropTypes from 'prop-types';

import '../styles/heading-section.css';

function HeadingSection({ children }) {
  return <div className="heading-section">{children}</div>;
}

HeadingSection.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default HeadingSection;
