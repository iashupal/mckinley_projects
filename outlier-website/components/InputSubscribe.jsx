import React, { Component } from 'react';

import '../styles/input-subscribe.css';

export default class InputEmail extends Component {
  constructor() {
    super();
    this.state = {
      focus: false,
    };

    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
  }

  handleInputFocus() {
    this.setState({
      focus: true,
    });
  }

  handleInputBlur() {
    this.setState({
      focus: false,
    });
  }

  render() {
    const { focus } = this.state;
    return (
      <form
        className={`input-subscribe ${focus ? 'input-subscribe--focus' : ''}`}
      >
        <input
          type="email"
          name="sub-email"
          className="input-subscribe__input"
          placeholder="Your Email Address"
          onFocus={this.handleInputFocus}
          onBlur={this.handleInputBlur}
        />
        <input
          type="submit"
          value="Submit"
          className="input-subscribe__submit"
        />
      </form>
    );
  }
}
