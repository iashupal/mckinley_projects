import React, { Component } from 'react';
import TimePicker from 'components/TimePicker';

const format = 'h:mm a';
const format2 = 'H:mm:ss';
class TimePickerTest extends Component {
  state = {
    value: '',
    value2: '',
  };

  onChange = val => {
    console.log(val && val.format(format));
    this.setState({ value: val });
  };

  onChange2 = val => {
    console.log(val && val.format(format2));
    this.setState({ value2: val });
  };

  render() {
    return (
      <div className="app-wrapper">
        <div>
          * AM, PM
          <br />
          <TimePicker use12Hours showSecond={false} value={this.state.value} onChange={this.onChange} format={format} />
        </div>
        <div>
          * 24시간 + 초
          <br />
          <TimePicker
            use12Hours={false}
            showSecond
            value={this.state.value2}
            onChange={this.onChange2}
            format={format2}
          />
        </div>
        <div>
          * 길이
          <br />
          <TimePicker style={{ width: '170px' }} use12Hours showSecond={false} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}

export default TimePickerTest;
