import React from 'react';

import '../styles/about-text-content.css';

export default function AboutTextContent() {
  return (
    <div className="about__text-content">
      <div className="about__text-content-left">
        <h1>
          We believe in giving everything we’ve got to our work, our clients and
          our community.
        </h1>
      </div>
      <div className="about__text-content-right">
        <p>
          Wray Ward is a team of more than 100 smart, passionate and creative
          problem solvers. We’re an independent agency with the energy and
          enthusiasm of a startup and a deep appreciation for our 40-year
          history, even as we keep our sights set squarely on the future. We
          thrive on generating wildly creative ideas and then transforming them
          into real and measurable results for clients in the home and building
          category.
        </p>

        <p>
          Every task, project and entry on our to-do list is an opportunity to
          think bigger and deliver not just great work, but better performing
          work. Our relationships with our clients — and each other — are open,
          honest and collaborative. And because of that, we’re not afraid to
          embrace bold strategies or make tough decisions. We learn from
          failures, we stay humble in our success and we never, ever stop asking
          “what if?”
        </p>
      </div>
    </div>
  );
}
