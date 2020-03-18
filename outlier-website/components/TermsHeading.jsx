import React from 'react';
import '../styles/terms.css';
import PropTypes from 'prop-types';
import Terms from '../pages/terms';

function TermsHeading({ heading }) {
  return <h4 className="terms__heading">{heading}</h4>;
}
Terms.propTypes = {
  heading: PropTypes.string.isRequired,
};
export default TermsHeading;
