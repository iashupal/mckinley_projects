import React, { Component } from "react";
import { Row, Col, Typography } from "antd";

import "../../assets/styles/home/home-time-section.css";

const { Title, Text } = Typography;
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thusday", "Friday", "Saturday"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

class HomeTimeSection extends Component {
  constructor(props) {
    super(props);

    this.timerInstance = null;

    const date = new Date();

    this.state = {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      day: DAYS[date.getDay()],
      month: MONTHS[date.getMonth()],
      date: date.getDate()
    };

    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  componentDidMount() {
    this.timerInstance = setInterval(this.handleTimeChange, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerInstance);
  }

  handleTimeChange() {
    const date = new Date();
    if (date.getMinutes !== this.state.minutes) {
      this.setState({
        hours: date.getHours(),
        minutes: date.getMinutes(),
        day: DAYS[date.getDay()],
        month: MONTHS[date.getMonth()],
        date: date.getDate()
      });
    }
  }

  render() {
    const hours = this.state.hours > 9 ? this.state.hours : "0" + this.state.hours;
    const minutes = this.state.minutes > 9 ? this.state.minutes : "0" + this.state.minutes;
    return (
      <Row className="date-section" align="top">
        <Col span={12}>
          <Title>
            {hours}:{minutes}
          </Title>
        </Col>
        <Col span={12} className="text-right">
          <Title level={3}>{this.state.day}</Title>
          <Text type="secondary" style={{ color: "#202020" }}>
            {this.state.month} {this.state.date}
          </Text>
        </Col>
      </Row>
    );
  }
}

export default HomeTimeSection;
