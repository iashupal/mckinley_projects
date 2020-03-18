import React from 'react';
import PropTypes from 'prop-types';
import '../styles/tile-teaser-desc.css';

function TileTeaserDesc({ children }) {
  return <div className="tile-teaser__desc">{children}</div>;
}

TileTeaserDesc.propTypes = {
  children: PropTypes.string.isRequired,
};

export default TileTeaserDesc;
