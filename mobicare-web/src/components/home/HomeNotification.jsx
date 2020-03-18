import React from "react";
import PropTypes from "prop-types";
import { Row, Col, Icon, Typography } from "antd";
import call from "../../assets/images/call.png";
import email from "../../assets/images/email.png";
import calendar from "../../assets/images/calendar.png";
import "../../assets/styles/home/home-notification.css";
import moment from "moment";

const { Text } = Typography;

const calendarIcon = (
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   width="32"
  //   height="32"
  //   viewBox="0 0 30 30"
  //   style={{ verticalAlign: "middle", marginLeft: "7", marginTop: "2" }}
  // >
  //   <path fill="none" d="M0 0h24v24H0V0z" />
  //   <path
  //     style={{ fill: "#ff9e1a" }}
  //     d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm2 4h10v2H7zm0 4h7v2H7z"
  //   />
  // </svg>
  <img style={{ width: "25px" }} src={calendar} alt="Calendar" />
);

const messageIcon = (
  // <svg
  //   xmlns="http://www.w3.org/2000/svg"
  //   width="32"
  //   height="32"
  //   viewBox="0 0 30 30"
  //   style={{ verticalAlign: "middle", marginLeft: "7", marginTop: "2" }}
  // >
  //   <path fill="none" d="M0 0h24v24H0V0z" />
  //   <path
  //     style={{ fill: "#ff9e1a" }}
  //     d="M4 4h16v12H5.17L4 17.17V4m0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4zm2 10h12v2H6v-2zm0-3h12v2H6V9zm0-3h12v2H6V6z"
  //   />
  // </svg>
  <img style={{ width: "25px" }} src={email} alt="Email" />
);

function HomeNotification({ data, clickHandler }) {
  let icon = calendarIcon;
  let message = "";

  if (data.notificationType === "message") {
    icon = messageIcon;
    message = (
      <div className="chat-content">
        You have a new message from{" "}
        <Text type="warning">
          {data.patientId.firstName} {data.patientId.lastName}
        </Text>
      </div>
    );
  }

  if (data.notificationType === "appointment") {
    icon = calendarIcon;
    message = (
      <div className="chat-content">
        You have an appointment with &nbsp;
        <Text type="warning">
          {data.patientId.firstName} {data.patientId.lastName}
        </Text>
        {data.notifyTime && (
          <Text>
            &nbsp; at &nbsp;
            <Text type="warning">
              {moment(data.notifyTime).format("HH:mm")}
            </Text>
          </Text>
        )}
      </div>
    );
  }

  return (
    <Row className="chat-box" onClick={() => clickHandler(data)}>
      <Col xs={4} lg={3}>
        <div className="chat-icon">{icon}</div>
      </Col>
      <Col xs={20} lg={21}>
        {message}
      </Col>
    </Row>
  );
}

HomeNotification.propTypes = {
  clickHandler: PropTypes.func,
  data: PropTypes.object
};

HomeNotification.defaultProps = {
  clickHandler: () => {}
};

export default HomeNotification;
