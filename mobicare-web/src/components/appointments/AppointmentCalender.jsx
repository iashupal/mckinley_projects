import React, { Component } from "react";
import PropTypes from "prop-types";
import { Calendar, Select, Col, Row } from "antd";

import "../../assets/styles/appointments/appointment-calender.css";
import AppointmentTable from "./AppointmentTable";
import moment from "moment";

class AppointmentCalender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment()
    };

    this.monthCellView = this.monthCellView.bind(this);
  }

  componentDidMount() {
    this.props.handleCalenderDateChange(moment());
  }

  monthCellView(date) {
    let isFound = this.props.data.find(appointment => {
      return (
        moment(appointment.appointmentDate).format("YYYY-MM-DD") ===
          date.format("YYYY-MM-DD") &&
        appointment.appointmentStatus === "pending"
      );
    });
    return (
      <div className="ant-fullcalendar-date">
        <div className="ant-fullcalendar-value">
          {isFound && <span className="point" />}
          {date.date()}
        </div>
      </div>
    );
  }

  render() {
    const { date } = this.props;
    return (
      <div className="appointment-calendar-div">
        <div className="calender-section">
          <Calendar
            fullscreen={false}
            defaultValue={this.props.date}
            value={this.props.date}
            headerRender={({ value, type, onChange, onTypeChange }) => {
              const start = 0;
              const end = 12;
              const monthOptions = [];

              const current = value.clone();
              const localeData = value.localeData();
              const months = [];
              for (let i = 0; i < 12; i++) {
                current.month(i);
                months.push(localeData.monthsShort(current));
              }

              for (let index = start; index < end; index++) {
                monthOptions.push(
                  <Select.Option className="month-item" key={`${index}`}>
                    {months[index]}
                  </Select.Option>
                );
              }
              const month = value.month();

              const year = value.year();
              const options = [];
              for (let i = year - 10; i < year + 10; i += 1) {
                options.push(
                  <Select.Option key={i} value={i} className="year-item">
                    {i}
                  </Select.Option>
                );
              }
              return (
                <div style={{ padding: 10 }}>
                  <Row type="flex" justify="space-between">
                    <Col>
                      <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        value={date.format("MMM")}
                        onChange={selectedMonth => {
                          const newValue = value.clone();
                          newValue.month(parseInt(selectedMonth, 10));
                          onChange(newValue);
                        }}
                        disabled
                        className="disabled-dropdown"
                      >
                        {monthOptions}
                      </Select>
                    </Col>
                    <Col>
                      <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        className="my-year-select"
                        onChange={newYear => {
                          const now = value.clone().year(newYear);
                          onChange(now);
                        }}
                        value={date.format("YYYY")}
                        disabled
                        className="disabled-dropdown"
                      >
                        {options}
                      </Select>
                    </Col>
                  </Row>
                  <div className="next-pre">
                    <img
                      alt="prev-month"
                      onClick={this.props.handlePrevMonth}
                      src="/icon/left-arrow.svg"
                    />
                    <img
                      alt="next-month"
                      onClick={this.props.handleNextMonth}
                      className="rotate"
                      src="/icon/left-arrow.svg"
                    />
                  </div>
                </div>
              );
            }}
            onPanelChange={this.props.onPanelChange}
            onSelect={this.props.handleCalenderDateChange}
          />
        </div>
        <div className="table-section">
          <AppointmentTable
            data={this.props.data}
            view={2}
            messageClick={this.props.messageClick}
            cancelClick={this.props.cancelClick}
            confirmClick={this.props.confirmClick}
          />
        </div>
      </div>
    );
  }
}

AppointmentCalender.propTypes = {
  messageClick: PropTypes.func,
  cancelClick: PropTypes.func,
  confirmClick: PropTypes.func
};

export default AppointmentCalender;
