import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button, Table, Popconfirm } from "antd";
import "../../assets/styles/appointments/appointment-table.css";
import moment from "moment";
import email from "../../assets/images/email.png";
import call from "../../assets/images/call.png";
const { Column } = Table;
function* nextUniqueKey() {
  var number = 1;
  while (true) {
    yield number++;
  }
}
let numberGenerator = nextUniqueKey();

function AppointmentTable({ data, confirmClick, cancelClick, messageClick, view, loading, callClick }) {
  const showHeaderBackgound = view !== 1 ? " no-header-background" : "";
  const showDropShadow = view !== 1 ? "no-drop-shadow" : "";
  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <Table
            className={"appointment-table " + showDropShadow}
            pagination={false}
            dataSource={data}
            rowKey={() => numberGenerator.next().value}
            loading={loading}
          >
            {view === 1 && (
              <Column
                title="Status"
                className={"column-header" + showHeaderBackgound}
                dataIndex="appointmentStatus"
                key={"appointmentStatus"}
                render={appointmentStatus =>
                  appointmentStatus === "pending" ? (
                    <span>
                      <b>Waiting Approval</b>
                    </span>
                  ) : /*(
                    <span className="normal-text">Confirmed</span>
                  )*/
                  appointmentStatus === "cancelled" ? (
                    <span className="normal-text">Cancelled</span>
                  ) : (
                    <span className="normal-text">Confirmed</span>
                  )
                }
              />
            )}
            <Column
              title="Name"
              className={"column-header" + showHeaderBackgound}
              dataIndex="patientId"
              key={"patientId"}
              render={patientId => (
                <span className="normal-text">
                  {patientId.firstName} {patientId.lastName}
                </span>
              )}
            />
            {view === 1 && (
              <Column
                title="Date"
                className={"column-header" + showHeaderBackgound}
                dataIndex="appointmentDate"
                key={"appointmentDate"}
                render={appointmentDate => (
                  <span className="normal-text">
                    {moment(appointmentDate).month() + 1}-{moment(appointmentDate).date()}-{moment(appointmentDate).year()}{" "}
                  </span>
                )}
              />
            )}
            {view === 1 && (
              <Column
                title="Time"
                className={"column-header" + showHeaderBackgound}
                dataIndex="appointmentDate"
                key={"appointmentTime"}
                render={appointmentDate => <span className="normal-text">{moment(appointmentDate).format("HH:mm A")}</span>}
              />
            )}
            {view !== 1 && (
              <Column
                title="Date & Time"
                className={"column-header" + showHeaderBackgound}
                dataIndex="appointmentDate"
                key={"appointmentDateTime"}
                render={appointmentDate => (
                  <Fragment>
                    <span className="normal-text">
                      {moment(appointmentDate).month() + 1}-{moment(appointmentDate).date()}-
                      {moment(appointmentDate).year() + " "}
                    </span>
                    <span className="normal-text">{moment(appointmentDate).format("HH:mm A")}</span>
                  </Fragment>
                )}
              />
            )}

            <Column
              title="State"
              className={"column-header" + showHeaderBackgound}
              dataIndex="appointmentStatus"
              key={"xyz"}
              render={(appointmentStatus, record) =>
                appointmentStatus === "pending" ? (
                  <>
                    <Button
                      onClick={() => confirmClick(record._id)}
                      type="default"
                      size="small"
                      className="mr-5"
                      style={{
                        width: "40%",
                        padding: view === 1 ? "" : "0px 5px",
                        color: "#0FBEA4"
                      }}
                      icon={view === 2 ? "check" : ""}
                    >
                      {view === 1 ? "Confirm" : ""}
                    </Button>
                    <Popconfirm
                      title="Do you really want to can cancel this appointment?"
                      onConfirm={() => cancelClick(record._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        type="secondary"
                        size="small"
                        style={{
                          width: "40%",
                          padding: view === 1 ? "" : "0px 5px",
                          color: "#FF6464"
                        }}
                        icon={view === 2 ? "cross" : ""}
                      >
                        {view === 1 ? "Cancel" : ""}
                      </Button>
                    </Popconfirm>
                  </>
                ) : appointmentStatus === "cancelled" ? (
                  <Button size="small" className="message-btn-width" disabled style={{ width: "80%" }}>
                    <span className="normal-text">Cancelled </span>
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => messageClick(record.patientId)}
                      type="default"
                      size="small"
                      className="message-btn-width mr-5"
                      
                    >
                      {/* <span className="normal-text">Message </span> */}
                      <img style={{ width: "25px" }} src={email} alt="Message" />
                      {/* {view === 1 && <i className="material-icons chat-icon">chat</i>} */}
                    </Button>
                    <Button
                      onClick={callClick}
                      
                      type="default"
                      size="small"
                      className="message-btn-width"
                    
                    >
                      {/* <span className="normal-text">Message </span> */}
                      <img style={{ width: "15px" }} src={call} alt="Call" />
                      {/* {view === 1 && <i className="material-icons chat-icon">chat</i>} */}
                    </Button>
                  </>
                )
              }
            />
          </Table>
        </Col>
      </Row>
    </Fragment>
  );
}

AppointmentTable.propTypes = {
  data: PropTypes.array.isRequired
};

AppointmentTable.defaultProps = {
  view: 1,
  messageClick: () => {},
  cancelClick: () => {},
  confirmClick: () => {}
};

export default AppointmentTable;
