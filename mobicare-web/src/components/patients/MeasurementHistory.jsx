import React, { Component } from "react";
import { Modal, Table, Row, Col } from "antd";
import PropTypes from "prop-types";
import "../../assets/styles/patients/appointment-history.css";
import { Scrollbars } from "react-custom-scrollbars";
import moment from "moment";
import measurementService from "../../services/measurement";
import heartrate from "../../assets/images/heartrate.png";
const { Column } = Table;


const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    backgroundColor: `#ff9e1a`
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

class MeasurementHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      measurementList: [],
      counter: 1
    };

    this.offset = 0;
  }

  incrementCounter() {
    let counter = this.state.counter + 1;
    this.setState({ counter: counter });
  }

  componentDidMount() {
    this.getMeasurementList(this.props.patientId);
  }

  async getMeasurementList(patientId) {
    let measurments = await measurementService.measurementList(patientId);
    measurments = measurments || {};
    this.setState({ measurmentList: measurments.response || [] });
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
              viewBox="0 0 24 24"
              width="55"
              height="55"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2 2H5V5h14v14zm0-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
            </svg> */}
            <Col span={20}>
              <Col span={3}>
                <img style={{ height: "30px", marginRight: "10px" }} src={heartrate} alt="Measurement History" />
              </Col>
              <Col span={12}>
                <strong style={{ fontSize: "18px", color: "black", lineHeight: '23px', verticalAlign: "text-top" }}>
                 Measurement History
                </strong>
                <div style={{ fontSize: "12px", lineHeight: '0' }}>{patientData.firstName + " " + patientData.lastName}</div>
              </Col>
            </Col>
            {/* <span className="title">
              Measurement History -{" "}
              {patientData.firstName + " " + patientData.lastName}
            </span> */}
          </Row>
        }
        visible={visible}
        onCancel={clickCancel}
        centered={true}
        footer={null}
      >
        <div style={{ backgroundColor: "white" }}>
          <Scrollbars
            renderThumbVertical={renderThumb}
            style={{ height: 500 }}
            autoHide
          >
            <Table
              className="appointment-table"
              pagination={false}
              dataSource={this.state.measurementList}
            >
              <Column
                title="Id"
                className={"column-header"}
                dataIndex="id"
                key={"id"}
                render={(id, record, index) => (
                  <span className="normal-text">{index + 1}</span>
                )}
              />
              <Column
                title="Type"
                className={"column-header"}
                dataIndex="appointmentDate"
                key={"appointmentDate"}
                render={appointmentDate => (
                  <span className="normal-text">
                    {moment(appointmentDate).format("YYYY-MM-DD HH:MM")}
                  </span>
                )}
              />
              <Column
                title="Value"
                className={"column-header"}
                dataIndex="appointmentStatus"
                key={"appointmentStatus"}
                render={appointmentStatus => (
                  <span className="normal-text">{appointmentStatus}</span>
                )}
              />
              />
            </Table>
          </Scrollbars>
        </div>
      </Modal>
    );
  }
}

MeasurementHistory.propTypes = {
  visible: PropTypes.bool.isRequired,
  clickCancel: PropTypes.func.isRequired
};

export default MeasurementHistory;
