import React, { Component } from 'react';
import Toggle from 'components/Toggle';

class SwitchTest extends Component {
  state = {
    checkA: true,
    checkB: true,
  };

  onChange = e => {
    this.setState({
      [e.target.value]: !e.target.checked,
    });
  };

  render() {
    const { checkA, checkB } = this.state;
    return (
      <div className="app-wrapper">
        <Toggle checked={checkA} onChange={e => this.onChange(e)} value="checkA" />
        <Toggle checked={checkB} onChange={e => this.onChange(e)} value="checkB" />
      </div>
    );
  }
}

export default SwitchTest;
