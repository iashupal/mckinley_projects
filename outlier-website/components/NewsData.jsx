/* eslint-disable comma-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import '../styles/news-data.css';

function NewsData({
  sourceURL, publisher, releaseDate, newsTitle
}) {
  return (
    <div className="news-container">
      <div className="news-meta-container">
        <div className="news-publisher">
          <a href={sourceURL}>{publisher}</a>
        </div>
        <div className="news-date">{releaseDate}</div>
      </div>
      <div className="news-heading" aria-hidden onClick={() => window.open(sourceURL)}>
        {newsTitle}
      </div>
    </div>
  );
}

NewsData.propTypes = {
  sourceURL: PropTypes.string.isRequired,
  publisher: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  newsTitle: PropTypes.string.isRequired,
};

export default NewsData;
