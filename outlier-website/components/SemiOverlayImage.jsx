import React from 'react';

import '../styles/semi-overlay-image.css';

function SemiOverlayImage() {
  return (
    <div className="semi-overlay-image">
      <div className="semi-overlay-image__background" />
      <h2 className="semi-overlay-image__content">DREAMER AND QUESTIONER TO CHALLENGE THE STATUS QUO</h2>
      <img src="/static/images/team/team_img-1.jpg" alt="Semi Overlay" className="semi-overlay-image__image" />
    </div>
  );
}

export default SemiOverlayImage;
