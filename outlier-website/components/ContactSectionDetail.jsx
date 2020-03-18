import React from 'react';
import PropTypes from 'prop-types';

function ContactSectionDetail({ children }) {
  return <div className="contact-section__detail">{children}</div>;
}

ContactSectionDetail.propTypes = {
  children: PropTypes.node,
};

ContactSectionDetail.defaultProps = {
  children: '',
};

export default ContactSectionDetail;
