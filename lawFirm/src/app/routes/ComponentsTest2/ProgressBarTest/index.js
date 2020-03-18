import React, { Component } from 'react';
import ProgressBar from 'components/ProgressBar';

class Test extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <ProgressBar percentage={10} width="100%" />
        <br />
        <ProgressBar percentage={30} width="100%" />
        <br />
        <ProgressBar percentage={60} width="100%" />
      </div>
    );
  }
}

export default Test;
