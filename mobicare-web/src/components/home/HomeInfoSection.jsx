import React from "react";
import PropTypes from "prop-types";
import { Col } from "antd";
import heartrate from "../../assets/images/heartrate.png";
import calendar from "../../assets/images/calendar.png";
import email from "../../assets/images/email.png";

import "../../assets/styles/home/home-info-section.css";
import Loader from "../Loader";

function HomeInfoSection({ text, count, icon, clickHandler, loading }) {
  return (
    <Col className="home-info-section" md={8} xs={8} onClick={() => clickHandler(text)}>
      <div className="box">
        {icon === 1 && (
          // <svg
          //   xmlns="http://www.w3.org/2000/svg"
          //   width="80"
          //   height="65"
          //   viewBox="0 0 30 30"
          //   style={{ marginLeft: 7 }}
          // >
          //   <path fill="none" d="M0 0h24v24H0V0z" />
          //   <path d="M9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm.05 10H4.77c.99-.5 2.7-1 4.23-1 .11 0 .23.01.34.01.34-.73.93-1.33 1.64-1.81-.73-.13-1.42-.2-1.98-.2-2.34 0-7 1.17-7 3.5V19h7v-1.5c0-.17.02-.34.05-.5zm7.45-2.5c-1.84 0-5.5 1.01-5.5 3V19h11v-1.5c0-1.99-3.66-3-5.5-3zm1.21-1.82c.76-.43 1.29-1.24 1.29-2.18C19 9.12 17.88 8 16.5 8S14 9.12 14 10.5c0 .94.53 1.75 1.29 2.18.36.2.77.32 1.21.32s.85-.12 1.21-.32z" />
          // </svg>
          <img src={heartrate} alt="Heartrate" />
        )}
        {icon === 2 && (
          // <svg xmlns="http://www.w3.org/2000/svg" width="80" height="65" viewBox="0 0 30 30" style={{ marginLeft: 7 }}>
          //   <path fill="none" d="M0 0h24v24H0V0z" />
          //   <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm2 4h10v2H7zm0 4h7v2H7z" />
          // </svg>
          <img src={calendar} alt="Calendar" />
        )}
        {icon === 3 && (
          // <svg xmlns="http://www.w3.org/2000/svg" width="80" height="65" viewBox="0 0 30 30" style={{ marginLeft: 7 }}>
          //   <path fill="none" d="M0 0h24v24H0V0z" />
          //   <path d="M4 4h16v12H5.17L4 17.17V4m0-2c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H4zm2 10h12v2H6v-2zm0-3h12v2H6V9zm0-3h12v2H6V6z" />
          // </svg>
          <div style={{ height: "40px" }}>
            <img src={email} alt="Email" />
          </div>
        )}
        <div className="box-title">
          {text.split(" ")[0]}
          <br />
          {text.split(" ")[1]}
        </div>
        <div className="circle">{loading ? "•••" : count}</div>
      </div>
    </Col>
  );
}

HomeInfoSection.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  clickHandler: PropTypes.func
};

HomeInfoSection.defaultProps = {
  clickHandler: null
};

export default HomeInfoSection;
