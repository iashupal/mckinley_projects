import React from 'react';
import PropTypes from 'prop-types';

import '../styles/case-study-title-bar.css';

function CaseStudyTitleBar(props) {
  const { title } = props;
  return (
    <div className="case-study__post-heading">
      <img
        src="/static/sunbrella-dp-header-4.jpg"
        alt="Sunbrella"
        className="case-study__bg-hero"
      />
      <div className="case-study__title-bar">
        <div className="case-study__title-bar__title">{title}</div>
        <div className="case-study__title-bar__scroll-arrow" />
      </div>
    </div>
  );
}

CaseStudyTitleBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CaseStudyTitleBar;
