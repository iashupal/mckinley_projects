import React, { Component } from 'react';
import RadioButton from 'components/RadioButton';

class Test extends Component {
  state = { selectedValue: '' };

  render() {
    const { selectedValue } = this.state;
    return (
      <div className="app-wrapper">
        <RadioButton
          checked={selectedValue === 'a'}
          label="의뢰인1"
          value="a"
          name="group1"
          onChange={(event, checked) => {
            this.setState({ selectedValue: 'a' });
            console.log(event, checked, 'Radio Toggled');
          }}
        />
        <RadioButton
          checked={selectedValue === 'b'}
          label="의뢰인2"
          value="b"
          name="group1"
          onChange={(event, checked) => {
            this.setState({ selectedValue: 'b' });
            console.log(event, checked, 'Radio Toggled');
          }}
        />
        <RadioButton
          checked={selectedValue === 'c'}
          label="의뢰인3"
          value="c"
          name="group1"
          onChange={(event, checked) => {
            this.setState({ selectedValue: 'c' });
            console.log(event, checked, 'Radio Toggled');
          }}
        />
      </div>
    );
  }
}

export default Test;
