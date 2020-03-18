import React, { Component } from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "antd";
import moment from "moment";
import "../../assets/styles/appointments/appointment-confirm-modal.css";

class AppointmentConfirmModal extends Component {
  render() {
    const { showModal, clickClose, data, clickConfirm, consult } = this.props;

    return (
      <Modal
        visible={showModal}
        footer={null}
        centered={true}
        onCancel={clickClose}
        closable={false}
        className="appointment-confirm-modal"
      >
        <img className="profile-icon" src="/images/profile.jpg" alt="Patient" />
        <div className="event-name">
          Appointment with {data.patientId && data.patientId.firstName}{" "}
          {data.patientId && data.patientId.lastName}
        </div>
        <div className="box" style={{ textAlign: "center" }}>
          <div className="date">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z" />
            </svg>{" "}
            on
            <b>
              {" " + (moment(data.appointmentDate).month() + 1)}-
              {moment(data.appointmentDate).date()}-
              {moment(data.appointmentDate).year() + " "}
            </b>{" "}
            at <b>{moment(data.appointmentDate).format("HH:mm")}</b>
          </div>
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path fill="none" d="M0 0h24v24H0V0z" />
              <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" />
            </svg>
            {consult ? " " + data.appointmentAgenda : "" + "Consultation"}
          </div>
          <div className="btn-section">
            <Button
              type="primary"
              size="small"
              className="message-btn-width"
              onClick={() => clickConfirm(data._id)}
            >
              Confirm
            </Button>
            <Button
              type="secondry"
              size="small"
              className="message-btn-width"
              onClick={() => clickClose()}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

AppointmentConfirmModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  clickClose: PropTypes.func.isRequired
};

AppointmentConfirmModal.defaultProps = {
  showModal: false,
  data: {}
};

export default AppointmentConfirmModal;
