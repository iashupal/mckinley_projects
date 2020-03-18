import React from 'react';
import PropTypes from 'prop-types';

function ContactSectionTitle({ children }) {
  return <div className="contact-section__title">{children}</div>;
}

ContactSectionTitle.propTypes = {
  children: PropTypes.string.isRequired
};

export default ContactSectionTitle;
