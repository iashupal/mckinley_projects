import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import './style.css';

const modifiers = {
  sundays: { daysOfWeek: [0] },
  saturdays: { daysOfWeek: [6] },
};
const modifiersStyles = {
  sundays: {
    color: 'red',
  },
  saturdays: {
    color: 'blue',
  },
};
class Picker extends Component {
  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.state = {
      selectedDay: undefined,
    };
  }

  handleDayClick(day, { selected, disabled }) {
    if (disabled) {
      // Day is disabled, do nothing
      return;
    }
    if (selected) {
      // Unselect the day if already selected
      this.setState({ selectedDay: undefined });
      return;
    }
    this.setState({ selectedDay: day });
  }

  render() {
    return (
      <div>
        <DayPicker
          onDayClick={this.handleDayClick}
          selectedDays={this.state.selectedDay}
          //   disabledDays={{ daysOfWeek: [0] }}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
        />
        {this.state.selectedDay ? (
          <p style={{ textAlign: 'center' }}>You clicked {this.state.selectedDay.toLocaleDateString()}</p>
        ) : (
          <p style={{ textAlign: 'center' }}>Please select a day.</p>
        )}
      </div>
    );
  }
}
export default Picker;
