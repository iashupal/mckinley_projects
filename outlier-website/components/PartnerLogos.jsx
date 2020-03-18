import React from 'react';

import '../styles/partner-logos.css';

export default function LogoSection() {
  const logos = [
    '/static/images/brands/logo-buzzfeed-1.png',
    '/static/images/brands/logo-glamour-1.png',
    '/static/images/brands/logo-new-yorker-1.png',
    '/static/images/brands/logo-refinery-1.png',
    // '/static/images/brands/logo-sharktank-1.png'
  ];
  const content = logos.map((logo, i) => (
    <div className="brandLogo" key={i}>
      <img key={i} alt={i} src={logo} />
    </div>
  ));
  return (
    <div className="logo-section">
      <div className="brandLogos">{content}</div>
    </div>
  );
}
