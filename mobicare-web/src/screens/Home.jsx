import React, { Component, Fragment } from "react";
import { Row, Col, Skeleton, Divider, Empty } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import "../assets/styles/home.css";

import HomeTimeSection from "../components/home/HomeTimeSection";
import HomeInfoSection from "../components/home/HomeInfoSection";
import HomeNotification from "../components/home/HomeNotification";

import notificationService from "../services/notification";
import Loader from "../components/Loader";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      totalPatients: 0,
      totalMessages: 0,
      totalAppointments: 0
    };

    this.handleInfoSectionClick = this.handleInfoSectionClick.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
  }

  componentDidMount() {
    this.getNotifications();
  }

  async getNotifications() {
    this.setState({ loadingNotifications: true });
    let notificationList = await notificationService.notificationList();
    console.log("response", notificationList);
    this.setState({
      notifications: notificationList.response,
      totalPatients: 0,
      totalMessages: notificationList.noOfUnreadMessages,
      totalAppointments: notificationList.noOfPendingAppointment,
      loadingNotifications: false
    });
  }

  handleInfoSectionClick(key) {
    switch (key) {
      case "Messages":
        this.props.history.push("/messages");
        break;
      case "Appointments":
        this.props.history.push("/appointments");
        break;
      case "Patients":
        this.props.history.push("/patients");
        break;
      default:
        this.props.history.push("/");
    }
  }

  async handleNotificationClick(data) {
    let response = await notificationService.updateNotification(data._id);
    console.log(response);
    switch (data.notificationType) {
      case "message":
        this.props.history.push("/messages");
        break;
      case "appointment":
        this.props.history.push("/appointments");
        break;
      default:
        this.props.history.push("/");
    }
  }

  renderThumb({ style, ...props }) {
    const thumbStyle = {
      // backgroundColor: `#ff9e1a`,
      backgroundColor: `#C0C0C0`,
      opacity: 1,
      borderRadius: 4,
      width: 10,
      marginLeft: -2
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  render() {
    return (
      <Fragment>
        <Row className="home animated fadeIn">
          <Col xs={24} md={12}>
            <HomeTimeSection />
            <Row className="activity">
              <HomeInfoSection
                clickHandler={this.handleInfoSectionClick}
                text={`Patient`}
                count={this.state.totalPatients}
                icon={1}
                loading={this.state.loadingNotifications}
              />
              <HomeInfoSection
                clickHandler={this.handleInfoSectionClick}
                text={"New Appointment"}
                count={this.state.totalAppointments}
                icon={2}
                loading={this.state.loadingNotifications}
              />
              <HomeInfoSection
                clickHandler={this.handleInfoSectionClick}
                text="Message"
                count={this.state.totalMessages}
                icon={3}
                loading={this.state.loadingNotifications}
              />
            </Row>
          </Col>
          <Col xs={24} md={12}>
            <div className="box-shadow">
              <p className="home_notification">Notification</p>
              <Scrollbars
                renderThumbVertical={this.renderThumb}
                style={{
                  height: 460
                }}
              >
                <div
                  className="right-box"
                  style={{
                    // borderRight: this.state.notifications.length > 5 ? "11px solid rgba(255, 158, 26, 0.34)" : "none"
                    borderRight: this.state.notifications.length > 5 ? "3px solid #D5D5D6" : "none"
                  }}
                >
                  {this.state.loadingNotifications ? (
                    <Fragment>
                      <Skeleton active avatar={{ size: "small" }} title={false} />
                      <Divider />
                      <Skeleton active avatar={{ size: "small" }} title={false} />
                      <Divider />
                      <Skeleton active avatar={{ size: "small" }} title={false} />
                      <Divider />
                      <Skeleton active avatar={{ size: "small" }} title={false} />
                      <Divider />
                      <Skeleton active avatar={{ size: "small" }} title={false} />
                    </Fragment>
                  ) : (
                    <Fragment>
                      {this.state.notifications.length === 0 && (
                        <div style={{ marginTop: "30%" }}>
                          <Empty description="No new notifications" />
                        </div>
                      )}
                      {this.state.notifications.map((data, index) => (
                        <HomeNotification
                          key={"home-notification" + index}
                          data={data}
                          clickHandler={() => this.handleNotificationClick(data)}
                        />
                      ))}
                    </Fragment>
                  )}
                </div>
              </Scrollbars>
            </div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default Home;
