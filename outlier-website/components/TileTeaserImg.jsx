import React from 'react';
import PropTypes from 'prop-types';
import '../styles/tile-teaser-img.css';

function TileTeaserImg({ src }) {
  return <img src={src} alt="" className="tile-teaser__img" />;
}

TileTeaserImg.propTypes = {
  src: PropTypes.string.isRequired,
};

export default TileTeaserImg;
