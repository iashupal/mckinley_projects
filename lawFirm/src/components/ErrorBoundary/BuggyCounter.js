import React from 'react';

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(({ counter }) => ({
      counter: counter + 1,
    }));
  }

  render() {
    if (this.state.counter === 5) {
      // Simulate a JS error
      throw new Error('I crashed!');
    }
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    return <h1 onClick={this.handleClick}>{this.state.counter}</h1>;
  }
}

export default BuggyCounter;
