import React, { Fragment } from 'react';

import '../styles/showcase.css';

export default function Showcase() {
  return (
    <Fragment>
      <div className="showcase__filter-bar-container">
        <div className="showcase__filter-bar">
          <p className="showcase__filter-bar__filter">
						You are viewing
            <span className="showcase__filter-bar__btn-flat-action">all work</span>
						for
            <span className="showcase__filter-bar__btn-flat-action">all clients</span>
						.
          </p>
          <p className="showcase__filter-bar__case-study-count">Showing 31 Case Studies</p>
        </div>
      </div>
      <div className="showcase">
        <div className="showcase__case-study" />
        <div className="showcase__case-study" />
        <div className="showcase__case-study" />
        <div className="showcase__case-study" />
        <div className="showcase__case-study" />
        <div className="showcase__case-study" />
      </div>
    </Fragment>
  );
}
