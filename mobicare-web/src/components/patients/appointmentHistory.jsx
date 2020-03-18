import React, { Component } from "react";
import { Modal, Table, Row, Col } from "antd";
import PropTypes from "prop-types";
import "../../assets/styles/patients/appointment-history.css";
import { Scrollbars } from "react-custom-scrollbars";
import moment from "moment";
import appointmentService from "../../services/appointment";
import calendar from "../../assets/images/calendar.png";
const { Column } = Table;

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    // backgroundColor: `#ff9e1a`,
    backgroundColor: `#C0C0C0`
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

class AppointmentHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointmentList: [],
      counter: 1
    };

    this.offset = 0;
  }

  incrementCounter() {
    let counter = this.state.counter + 1;
    this.setState({ counter: counter });
  }

  componentDidMount() {
    this.getAppointmentList(this.props.patientId);
  }

  async getAppointmentList(patiendId) {
    const condition = {};
    condition.patiendId = patiendId;
    const appointmentList = await appointmentService.appointmentList(condition);
    this.setState({ appointmentList: appointmentList.response });
  }

  render() {
    const { visible, clickCancel, patientData } = this.props;
    return (
      <Modal
        style={{ backgroundColor: "white" }}
        className="appointment-history-modal"
        width={550}
        title={
          <Row className="header details">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="55"
              height="55"
              viewBox="0 0 30 30"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm2 4h10v2H7zm0 4h7v2H7z" />
            </svg> */}
            <Col span={20}>
              <Col span={3}>
                <img style={{ height: "30px", marginRight: "10px" }} src={calendar} alt="Appointment History" />
              </Col>
              <Col span={12}>
                <strong style={{ fontSize: "18px", color: "black", lineHeight: '20px', verticalAlign: "text-top" }}>
                  Appointment History
                </strong>
                <div style={{ fontSize: "12px", lineHeight: '0' }}>{patientData.firstName + " " + patientData.lastName}</div>
              </Col>
            </Col>
            {/* <span className="title">Appointments History - {patientData.firstName + " " + patientData.lastName}</span> */}
          </Row>
        }
        visible={visible}
        onCancel={clickCancel}
        centered={true}
        footer={null}
      >
        <div style={{ backgroundColor: "white" }}>
          <Scrollbars renderThumbVertical={renderThumb} style={{ height: 500 }} autoHide>
            <Table className="appointment-table" pagination={false} dataSource={this.state.appointmentList}>
              <Column
                title="Id"
                className={"column-header"}
                dataIndex="id"
                key={"id"}
                render={(id, record, index) => <span className="normal-text">{index + 1}</span>}
              />
              <Column
                title="Date"
                className={"column-header"}
                dataIndex="appointmentDate"
                key={"appointmentDate"}
                render={appointmentDate => (
                  <span className="normal-text">{moment(appointmentDate).format("YYYY-MM-DD HH:MM")}</span>
                )}
              />
              <Column
                title="Status"
                className={"column-header"}
                dataIndex="appointmentStatus"
                key={"appointmentStatus"}
                render={appointmentStatus => <span className="normal-text">{appointmentStatus}</span>}
              />
              />
            </Table>
          </Scrollbars>
        </div>
      </Modal>
    );
  }
}

AppointmentHistory.propTypes = {
  visible: PropTypes.bool.isRequired,
  clickCancel: PropTypes.func.isRequired
};

export default AppointmentHistory;
