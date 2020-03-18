import React from 'react';
import PropTypes from 'prop-types';

import '../styles/contact-section.css';

function ContactSection({ children }) {
  return <div className="contact-section">{children}</div>;
}

ContactSection.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default ContactSection;
