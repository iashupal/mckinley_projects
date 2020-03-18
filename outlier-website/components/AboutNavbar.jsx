import React, { Component } from 'react';

import '../styles/about-navbar.css';

class AboutNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = [];
  }

  render() {
    return (
      <div className="about__section-navbar-small">
        <div className="about-navbar-small-content">Our Story </div>
        <div className="about-navbar-small-content">Leadership</div>
        <div className="about-navbar-small-content">Our Home </div>
        <div className="about-navbar-small-content">Clients</div>
        <div className="about-navbar-small-content">Community</div>
        <div className="about-navbar-small-content">EmpoWWer</div>
      </div>
    );
  }
}

export default AboutNavbar;
