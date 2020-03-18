import React from 'react';

import '../styles/case-study-overview.css';
import ParagraphWithTitle from './ParagraphWithTitle';

export default function CaseStudyOverview() {
  return (
    <div className="case-study-overview">
      <div className="case-study-overview__title">Project Overview</div>
      <div className="case-study-overview__right-column">
        <ParagraphWithTitle />
        <ParagraphWithTitle />
        <div className="case-study-overview__statistic-grid">
          <div className="case-study-overview__statistic">
            <h2>800M</h2>
            <p>Total Impressions</p>
          </div>
          <div className="case-study-overview__statistic">
            <h2>800M</h2>
            <p>Total Impressions</p>
          </div>
          <div className="case-study-overview__statistic">
            <h2>800M</h2>
            <p>Total Impressions</p>
          </div>
        </div>
      </div>
    </div>
  );
}
