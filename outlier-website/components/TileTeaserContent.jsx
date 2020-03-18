import React from 'react';
import PropTypes from 'prop-types';
import '../styles/tile-teaser-content.css';

function TileTeaserContent({ children }) {
  return <div className="tile-teaser__content-box">{children}</div>;
}

TileTeaserContent.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default TileTeaserContent;
