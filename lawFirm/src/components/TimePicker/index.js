import React, { Component } from 'react';
import 'styles/customized/timePickerStyle/index.less';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import './style.css';

const SmallIcon = ({ name, handler }) => {
  return (
    <i
      className="material-icons left"
      onClick={handler}
      style={{ cursor: 'pointer', fontSize: '16px', position: 'absolute', top: '10px', right: '5px' }}
      role="button"
      tabIndex="-1"
    >
      {name}
    </i>
  );
};

const now = moment()
  .hour(0)
  .minute(0)
  .second(0);
class TimePickerComponent extends Component {
  render() {
    const { onChange, use12Hours, showSecond, format, style, value } = this.props;

    return (
      <div className="timePickerContainer">
        <TimePicker
          style={style}
          use12Hours={use12Hours}
          showSecond={showSecond}
          onChange={onChange}
          format={format}
          inputReadOnly
          {...this.props}
          value={value || now}
        />
        <SmallIcon name="query_builder" />
      </div>
    );
  }
}

export default TimePickerComponent;
