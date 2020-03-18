import React from 'react';
import PropTypes from 'prop-types';

import '../styles/featured-media.css';

export default function FeaturedMedia({ src, video }) {
  return !video ? (
    <img src={src} alt="" className="featured-media featured_image" />
  ) : (
    <iframe
      title="Video"
      className="featured-media featured-media--video"
      src={src}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}

FeaturedMedia.propTypes = {
  src: PropTypes.string.isRequired,
  video: PropTypes.bool,
};

FeaturedMedia.defaultProps = {
  video: false,
};
