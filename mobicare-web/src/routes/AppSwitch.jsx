import React, { Fragment, Component } from "react";
import { Switch, Route } from "react-router-dom";
import Loadable from "react-loadable";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AppLayout from "../components/AppLayout";
import appointmentService from "../services/appointment";
import jwt_decode from "jwt-decode";
import moment from "moment";
import { Modal, message, Button } from "antd";
import { CALL_BASE_URL } from "../utils/api";
import videoConfService from "../services/videoConference";
import patientService from "../services/patients";

const Patients = Loadable({
  loader: () => import("../screens/Patients"),
  loading: Loader
});

const Home = Loadable({
  loader: () => import("../screens/Home"),
  loading: Loader
});

const Appointments = Loadable({
  loader: () => import("../screens/Appointments"),
  loading: Loader
});

const Messages = Loadable({
  loader: () => import("../screens/Messages"),
  loading: Loader
});

const Profile = Loadable({
  loader: () => import("../screens/Profile"),
  loading: Loader
});

const Photos = Loadable({
  loader: () => import("../screens/Photos"),
  loading: Loader
});

const PatientAssessment = Loadable({
  loader: () => import("../screens/PatientAssessment"),
  loading: Loader
});

const DoctorProfile = Loadable({
  loader: () => import("../screens/DoctorProfile"),
  loading: Loader
});

export default class AppSwitch extends Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false
    };
  }
  async componentDidMount() {
    const doctorId = jwt_decode(localStorage.getItem("token")).userId;
    const doctor = await patientService.getPatientDetail(doctorId);
    this.setState({
      name: `Dr. ${doctor.response[0].firstName} ${doctor.response[0].lastName}`,
      profileImage: doctor.response[0].profileImage,
      speciality: doctor.response[0].doctorDetail[0].speciality
    });
    const appointmentDetails = await appointmentService.getNextAppoinmentDetails(doctorId);
    if (appointmentDetails.response[0]) {
      this.setState({
        appointment: appointmentDetails.response[0]
      });
      const nextAppointmentTime = appointmentDetails.response[0].appointmentDate;
      this.startTimer(nextAppointmentTime);
    }
  }

  async startVideoConf(appointmentId) {
    const doctorName = `${jwt_decode(localStorage.getItem("token")).firstName} ${
      jwt_decode(localStorage.getItem("token")).lastName
    }`;
    const data = {
      appointmentId: appointmentId,
      userType: "doctor"
    };
    let videoResponse = await videoConfService.getVideoUrl(data);
    const VcallRoom = videoResponse.VcallRoom;
    console.log("videoResponse", videoResponse);
    if (VcallRoom && VcallRoom.apiKey) {
      let link = `${CALL_BASE_URL}?apiKey=${VcallRoom.apiKey}&sessionId=${VcallRoom.sessionId}&token=${
        VcallRoom.tokens[0].token
      }&name=${doctorName}`;
      window.open(link, "_blank");
    } else {
      message.error("Some error occurred.");
    }
  }

  startTimer(time) {
    const start = moment().format();
    const end = moment(time)
      .subtract(3, "minutes")
      .toISOString();
    const duration = moment.duration(moment(end).diff(moment(start))).asMilliseconds();
    console.log(duration);

    setTimeout(() => this.setState({ modalVisible: true }), duration);
  }

  render() {
    return (
      <div style={{ backgroundColor: "#f0f0f0" }}>
        <Fragment>
          <Navbar name={this.state.name} profileImage={this.state.profileImage} specialization={this.state.speciality} />

          <AppLayout>
            <div className="switch-container">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/patients" exact component={Patients} />
                <Route path="/appointments" exact component={Appointments} />
                <Route path="/messages" exact component={Messages} />
                <Route path="/profile/:patientId" exact component={Profile} />
                <Route path="/photos/:patientId" exact component={Photos} />

                <Route path="/profile" exact component={DoctorProfile} />
                <Route path="/patient/:patientId/assessment" exact component={PatientAssessment} />
              </Switch>
            </div>
          </AppLayout>

          <Footer />
          {!!this.state.appointment && (
            <Modal
              title={`Remote Appointment ${this.state.appointment.appointmentTitle}` || "No one"}
              visible={this.state.modalVisible}
              footer={[
                <Button key="back" onClick={() => this.setState({ modalVisible: false })}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={() => this.startVideoConf(this.state.appointment._id || "No ID")}>
                  Confirm
                </Button>
              ]}
            >
              <h2>You have an appointment scheduled after 5 minutes.</h2>
            </Modal>
          )}
        </Fragment>
      </div>
    );
  }
}
