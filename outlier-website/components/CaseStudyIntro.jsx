import React from 'react';

import '../styles/case-study-intro.css';

export default function CaseStudyIntro() {
  return (
    <div className="case-study-intro">
      <div className="case-study-intro__share-bar">
        <div className="case-study-intro__share-icon" />
        <div className="case-study-intro__share-icon" />
        <div className="case-study-intro__share-icon" />
        <div className="case-study-intro__share-icon" />
      </div>
      <div className="case-study-intro__project-type">Integrated</div>
      <div className="case-study-intro__versions">
        <div className="case-study-intro__version">Quick Version</div>
        <div className="case-study-intro__version">Full Version</div>
      </div>
      <div className="case-study-intro__project-desc">
        To help change the perception of Sunbrella as primarily an outdoor
        fabric, Wray Ward created an image-driven campaign that ensured their
        legendary fabric would be as well-known for design as it already was for
        its unmatched performance.
      </div>
    </div>
  );
}
