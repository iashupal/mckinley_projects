import React, { Component } from 'react';
import imagesrc from 'assets/images/components/slider.png';
import RangeSlider from 'components/RangeSlider';

class Test extends Component {
  state = {
    value: 20,
    value2: 50,
  };

  render() {
    const { value, value2 } = this.state;
    return (
      <div className="app-wrapper">
        <RangeSlider
          onChange={(e, v) => {
            this.setState({ value: v });
          }}
          value={value}
        />
        <RangeSlider
          onChange={(e, v) => {
            this.setState({ value2: v });
          }}
          value={value2}
          disabled
        />
      </div>
    );
  }
}

export default Test;
