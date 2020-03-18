import React from 'react';

import '../styles/career-side-menu.css';

export default function CareerSideMenu({ children }) {
  return (
    <div className="career-side-menu">
      <p>Featured Openings</p>
      {children}
    </div>
  );
}
