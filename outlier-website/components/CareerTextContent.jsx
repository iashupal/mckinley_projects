import React from 'react';

import '../styles/careers-text-content.css';
import PageSeparator from './PageSeparator';

export default function AboutTextContent() {
  return (
    <div className="career__section-text">
      <div className="career__section-text-left">
        <p>
          It’s what makes us special and gives us that certain glow. It’s what
          happens when you bring together a bunch of people from different
          backgrounds and points of view who all have one thing in common: we
          love what we do. We spend time together not just because we work at
          the same address, but because we genuinely enjoy one another.
        </p>
      </div>
      <div className="career__section-text-right">
        <div className="career__section-text-right-para">
          <p>
            Walk through our modern office space and you’ll see it everywhere:
            impromptu brainstorming sessions on cozy couches, collaborative
            meetings that literally reach across aisles of desks, heated
            discussions of series plotlines and ongoing ping-pong rivalries. And
            it goes beyond the office, to Panthers’ and Knights' games,
            community service projects and annual parties. It’s what gets us
            through the rare late night, helps us find solutions for every
            impossible problem and makes Wray Ward unlike any other agency.
          </p>
        </div>
        <PageSeparator />
        <div className="career__section-text-right-bio">
          <div className="section__text-right-bio-image">
            <img src="/static/CarolineArmstrong.jpg" alt="" />
          </div>
          <div className="section__text-right-bio-content">
            <h4>Talent Development</h4>
            <h3>Caroline Armstrong Talent Development Director</h3>
            <h3>View Bio</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
