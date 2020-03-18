import React from 'react';
import PropTypes from 'prop-types';
import '../styles/tile-teaser-heading.css';

function TileTeaserHeading({ children }) {
  return <div className="tile-teaser__heading">{children}</div>;
}

TileTeaserHeading.propTypes = {
  children: PropTypes.string.isRequired,
};

export default TileTeaserHeading;
