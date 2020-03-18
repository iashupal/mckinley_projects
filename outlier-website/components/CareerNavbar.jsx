import React, { Component } from 'react';

import '../styles/career-navbar.css';

class CareerNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = [];
  }

  render() {
    return (
      <div className="career__section-navbar-small">
        <div className="career-navbar-small-content"> Current Openings</div>
        <div className="career-navbar-small-content"> Our Culture</div>
        <div className="career-navbar-small-content"> Our Benefits </div>
      </div>
    );
  }
}

export default CareerNavbar;
