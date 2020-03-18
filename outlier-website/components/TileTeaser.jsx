/* {<div className="tile-teaser">
      <img src="/static/insights.png" alt="" className="tile-teaser__img" />
      <div className="tile-teaser__content-box">
        <span className="tile-teaser__heading">
          Insights
        </span>
        <p className="tile-teaser__desc">
          Guided by research, our Insights team creates targeted
          strategies and measures results to constantly identify
          opportunities for improvement.
        </p>
        <div className="tile-teaser__flat-action">
          Learn More
        </div>
      </div>
    </div>
  );} */
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/tile-teaser.css';

function TileTeaser({ children }) {
  return <div className="tile-teaser">{children}</div>;
}

TileTeaser.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default TileTeaser;
