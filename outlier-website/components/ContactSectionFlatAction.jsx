import React from 'react';
import PropTypes from 'prop-types';

function ContactSectionFlatAction({ link, children }) {
  return (
    <a href={link} className="contact-section__flat-action">
      {children}
    </a>
  );
}

ContactSectionFlatAction.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ContactSectionFlatAction;
