import React from 'react';
import PropTypes from 'prop-types';

import '../styles/featured-media-with-card.css';
import FeaturedMedia from './FeaturedMedia';

function FeaturedMediaWithCard({
  title, children, link, src,
}) {
  return (
    <div className="featured-media-with-card">
      <FeaturedMedia src={src} />
      <div className="featured-media-with-card__card">
        <div className="featured-media-with-card__content">
          <span className="featured-media-with-card__title">{title}</span>
          <span className="featured-media-with-card__desc">{children}</span>
        </div>
        <div className="featured__media-btn">
          <a href={link} className="featured-media-with-card__btn-view">
            {/* <i className="fab fa-google-play" /> */}
            <img className="btn_img" src="../static/images/svg/googlePlay.svg" alt="google play" />
						Google Play
          </a>
          <a href={link} className="featured-media-with-card__btn-view">
            <img className="btn_img" src="../static/images/svg/apple.svg" alt="App store" />
						App Store
          </a>
        </div>
      </div>
    </div>
  );
}

FeaturedMediaWithCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  link: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export default FeaturedMediaWithCard;
