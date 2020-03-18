import React, { forwardRef } from 'react';
import RDatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';

registerLocale('ko', ko);

const CustomInput = React.forwardRef((props = { value, onClick, onChange }, ref) => (
  <div className="input-group">
    <div className="input-group-addon">
      <i
        className="material-icons"
        role="button"
        tabIndex={0}
        onClick={props.onClick}
        style={{ outline: 'none', cursor: 'pointer' }}
      >
        date_range
      </i>
    </div>
    <input
      type="text"
      readOnly
      className="form-control"
      style={{ padding: '0.485rem 0.75rem', outline: 'none', cursor: 'pointer', backgroundColor: 'white' }}
      value={props.value}
      onClick={props.onClick}
      onChange={props.onChange}
    />
  </div>
));

class DatePicker extends React.Component {
  CustomInputRef = React.createRef();

  state = {
    startDate: new Date(),
  };

  handleChange = date => {
    this.setState({
      startDate: date,
    });
    this.props.onChange(date);
  };

  render() {
    const { readOnly, value, clearable } = this.props;
    const applyWidth = clearable ? '146px' : '136px';
    const selectedDate = value ? new Date(value) : this.state.startDate;

    return (
      <>
        {!readOnly && (
          <div style={{ width: applyWidth }}>
            <RDatePicker
              {...this.props}
              dateFormat="yyyy-MM-dd"
              placeholder={this.state.date}
              selected={selectedDate}
              onChange={date => this.handleChange(date)}
              isClearable={clearable}
              peekNextMonth
              locale="ko"
              showMonthDropdown
              showYearDropdown
              dropdownMode="scroll"
              dayClassName={date => {
                const day = date.getDay();
                if (day === 6) return 'text-primary';
                if (day === 0) return 'text-danger';
                return 'text-body';
              }}
              customInput={<CustomInput ref={this.CustomInputRef} />}
            />
          </div>
        )}
        {readOnly && <div>{value}</div>}
      </>
    );
  }
}

export default DatePicker;
