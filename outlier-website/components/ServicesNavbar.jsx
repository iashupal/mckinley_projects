import React, { Component } from 'react';

import '../styles/services-navbar.css';

class ServicesNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = [];
  }

  render() {
    return (
      <div className="insight__section-navbar-small">
        <div />
        <div className="insight-navbar-small-content" />
        <div className="insight-navbar-small-content" />
        <div className="insight-navbar-small-content" />
        <div />
        <div className="insight-navbar-small-link-to-all-services" />
        <div />
      </div>
    );
  }
}

export default ServicesNavbar;
