import React, { Component, Fragment } from "react";
import { Typography, Button, Row, Col, message } from "antd";
import AppointmentTable from "../components/appointments/AppointmentTable";
import AppointmentCalender from "../components/appointments/AppointmentCalender";
import AppointmentConfirmModal from "../components/appointments/AppointmentConfirmModal";
import Pagination from "../components/Pagination";
import ChatModal from "../components/ChatModal";
import "../assets/styles/appointment.css";
import appointmentService from "../services/appointment";
import moment from "moment";
import calendar from "../assets/images/calendar.png";
import videoConfService from "../services/videoConference";
import { CALL_BASE_URL } from "../utils/api";
import { getDoctorName } from "../utils/auth";
const { Title } = Typography;

class Appointments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listView: true,
      modalConfig: {
        showModal: false,
        showMessageModal: false,
        record: []
      },
      data: [],
      pagination: {
        totalRecords: 0,
        currentPage: 1
      },
      date: moment(),
      loading: false
    };

    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleListView = this.handleListView.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.getAppointment = this.getAppointment.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
    this.handleFinalConfirm = this.handleFinalConfirm.bind(this);
    this.startVideoConf = this.startVideoConf.bind(this);
    this.handleCalenderDateChange = this.handleCalenderDateChange.bind(this);
    this.onPanelChange = this.onPanelChange.bind(this);
    this.handleNextMonth = this.handleNextMonth.bind(this);
    this.handlePrevMonth = this.handlePrevMonth.bind(this);
    this.getCalendarAppointment = this.getCalendarAppointment.bind(this);
  }

  componentDidMount() {
    this.getAppointment(1);
  }

  async getAppointment(page) {
    this.setState({ loading: true });
    const offset = (page - 1) * 10;
    let patients = await appointmentService.appointmentList({
      offset
    });
    this.setState({
      data: patients.response,
      pagination: {
        totalRecords: patients.totalRecords,
        currentPage: page
      },
      loading: false
    });
  }

  handleConfirm(dataId) {
    let modalConfig = { ...this.state.modalConfig };
    modalConfig.showModal = true;
    modalConfig.data = [...this.state.data].find(data => data._id === dataId);

    this.setState({
      modalConfig
    });
  }

  async handleCancel(id) {
    await appointmentService.cancelAppointment(id);
    this.getAppointment(this.state.pagination.currentPage);
  }

  handleMessage(record) {
    const param = {
      patientId: record._id,
      patient: [{ firstName: record.firstName, lastName: record.lastName }]
    };
    let modalConfig = { ...this.state.modalConfig };
    modalConfig.showMessageModal = true;
    modalConfig.record = param;

    this.setState({
      modalConfig
    });
  }

  handleListView(showListView) {
    this.setState({
      listView: showListView
    });
    if (showListView) {
      this.getAppointment(1);
    }
  }

  handleModalClose() {
    let modalConfig = { ...this.state.modalConfig };
    modalConfig.showModal = false;
    modalConfig.showMessageModal = false;
    this.setState({
      modalConfig
    });
  }

  cancelAppointment() {}

  async handleFinalConfirm(id) {
    let isConfirmed = await appointmentService.confirmAppointment(id);
    if (isConfirmed.status === 1) {
      message.success(isConfirmed.response);
      if (this.state.listView) {
        this.getAppointment(this.state.pagination.currentPage);
      } else {
        this.getCalendarAppointment(
          moment()
            .startOf("month")
            .format("YYYY-MM-DD"),
          moment()
            .endOf("month")
            .format("YYYY-MM-DD")
        );
      }
    } else {
      message.error(isConfirmed.response);
    }

    this.handleModalClose();
    window.location.reload();
  }

  async startVideoConf() {
    let appointment = await appointmentService.appointmentList({
      appointmentStatus: "confirmed"
    });
    appointment.response.sort((a, b) => {
      return new Date(a.updatedAt) - new Date(b.updatedAt);
    });
    let latestAppointment = appointment.response.pop();
    const data = {
      appointmentId: latestAppointment._id,
      userType: "doctor"
    };
    let doctor = getDoctorName();
    let videoResponse = await videoConfService.getVideoUrl(data);
    const VcallRoom = videoResponse.VcallRoom;
    console.log("videoResponse", videoResponse);
    if (VcallRoom && VcallRoom.apiKey) {
      let link = `${CALL_BASE_URL}?apiKey=${VcallRoom.apiKey}&sessionId=${VcallRoom.sessionId}&token=${VcallRoom.tokens[0].token}&name=${doctor.firstName}${doctor.lastName}`;

      window.open(link, "_blank");
    } else {
      message.error("Some error occurred.");
    }
  }

  handlePagination(page) {
    this.getAppointment(page);
  }

  async getCalendarAppointment(startDate, endDate, specificDate = null) {
    let filter = {};
    if (startDate) {
      filter.startDate = startDate;
    }
    if (endDate) {
      filter.endDate = endDate;
    }
    if (specificDate) {
      filter.specificDate = specificDate;
    }
    let patients = await appointmentService.appointmentList(filter);
    this.setState({
      data: patients.response
    });
  }

  onPanelChange(value, mode) {
    this.setState({ date: value });
  }

  handleNextMonth() {
    const date = this.state.date;
    const newMonth = date.add(1, "M");

    this.setState({ date: newMonth });
    this.getCalendarAppointment(
      null,
      null,
      moment(this.state.date._d).format("YYYY-MM-DD")
    );
  }

  handlePrevMonth() {
    const date = this.state.date;
    const newMonth = date.subtract(1, "M");
    this.setState({ date: newMonth });
    this.getCalendarAppointment(
      null,
      null,
      moment(this.state.date._d).format("YYYY-MM-DD")
    );
  }

  handleCalenderDateChange(date) {
    this.setState({ date });
    this.getCalendarAppointment(null, null, date.format("YYYY-MM-DD"));
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row className="content-wrapper ">
          <Col span={12}>
            <img
              style={{ marginRight: "20px", width: "25px" }}
              src={calendar}
              alt="Appointment"
            />
            <div style={{ display: "inline-block" }}>
              <Title
                className="left-text"
                type="secondary"
                level={4}
                style={{ color: "black", fontWeight: "500" }}
              >
                Appointment
              </Title>
            </div>
          </Col>
          <Col span={12}>
            <div className="content-title-right">
              {/* <Button
                type={this.state.listView ? "primary" : "secondary"}
                shape="round"
                className="list-button"
                onClick={() => this.handleListView(true)}
              >
                <i class="material-icons">list</i>
                List
              </Button> */}
              <span style={{ margin: "0 10px" }}>|</span>
              <span
                style={{
                  color: this.state.listView ? "black" : "#c0c0c0",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
                onClick={() => this.handleListView(true)}
              >
                Latest
              </span>
              <span style={{ margin: "0 10px" }}>|</span>
              <span
                style={{
                  color: this.state.listView ? "#c0c0c0" : "black",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
                onClick={() => this.handleListView(false)}
              >
                Monthly
              </span>
              <span style={{ margin: "0 10px" }}>|</span>
              {/* <Button
                type={this.state.listView ? "secondary" : "primary"}
                shape="round"
                className="calender-button list-button"
                onClick={() => this.handleListView(false)}
              >
                <i class="material-icons">calendar_today</i>
                Calendar
              </Button> */}
            </div>
          </Col>
        </Row>
        {this.state.listView ? (
          <Fragment>
            <AppointmentTable
              data={this.state.data}
              columns={this.state.columns}
              messageClick={this.handleMessage}
              cancelClick={this.handleCancel}
              confirmClick={this.handleConfirm}
              loading={this.state.loading}
              callClick={this.startVideoConf}
            />
            <Pagination
              changeHandler={this.handlePagination}
              current={this.state.pagination.currentPage}
              totalRecords={this.state.pagination.totalRecords}
            />
          </Fragment>
        ) : (
          <Row>
            <AppointmentCalender
              handleCalenderDateChange={this.handleCalenderDateChange}
              data={this.state.data}
              messageClick={this.handleMessage}
              cancelClick={this.handleCancel}
              confirmClick={this.handleConfirm}
              getCalendarAppointment={this.getCalendarAppointment}
              onPanelChange={this.onPanelChange}
              handleNextMonth={this.handleNextMonth}
              handlePrevMonth={this.handlePrevMonth}
              date={this.state.date}
            />
          </Row>
        )}

        {
          <AppointmentConfirmModal
            data={this.state.modalConfig.data}
            showModal={this.state.modalConfig.showModal}
            clickConfirm={this.handleFinalConfirm}
            clickClose={this.handleModalClose}
            clickCancel={this.cancelAppointment}
          />
        }

        {this.state.modalConfig.showMessageModal && (
          <ChatModal
            visible={this.state.modalConfig.showMessageModal}
            clickCancel={this.handleModalClose}
            data={this.state.modalConfig.record}
          />
        )}
      </div>
    );
  }
}

export default Appointments;
