import React, { Component, Fragment } from 'react';
import { Typography, Table, Row, Col, Button, message, Empty } from 'antd';
import moment from 'moment';
import '../assets/styles/profile.css';
import AppointmentHistory from '../components/patients/appointmentHistory';
import email from '../assets/images/email.png';
import call from '../assets/images/call.png';
import patientService from '../services/patients';
import appointmentService from '../services/appointment';
import assessmentService from '../services/assessment';
import measurementService from '../services/measurement';
import imageService from '../services/images';
import videoConfService from '../services/videoConference';
import ChatModal from '../components/ChatModal';
import { CALL_BASE_URL } from '../utils/api';
import { getDoctorName } from '../utils/auth';
import Loader from '../components/Loader';
import MeasurementHistory from '../components/patients/MeasurementHistory';
import calendar from '../assets/images/calendar.png';
import assessment from '../assets/images/assessment.png';
import human from '../assets/images/human.png';
import heartrate from '../assets/images/heartrate.png';
const { Column } = Table;

const { Title } = Typography;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalConfig: {
        visible: false,
      },
      measurementModalConfig: {
        visible: false,
      },
      patientId: this.props.match.params.patientId,
      patientData: [],
      pendingAppointment: [],
      assessments: [],
      measurements: [],
      images: [],
      loading: false,
    };

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleAppointmentShowAll = this.handleAppointmentShowAll.bind(this);
    this.handleMeasurementShowAll = this.handleMeasurementShowAll.bind(this);
    this.navigateToAssessment = this.navigateToAssessment.bind(this);
    this.navigateToPhotos = this.navigateToPhotos.bind(this);
    this.openChatModal = this.openChatModal.bind(this);
    this.startVideoConf = this.startVideoConf.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params) {
      this.setState({ patientId: this.props.match.params.patientId });

      this.getPatientDetail(this.props.match.params.patientId);
      const condition = {};
      condition.patientId = this.props.match.params.patientId;
      this.getAssessmentList(condition.patientId);
      this.getMeasurementList(condition.patientId);
      this.getImageList(condition.patientId);
      condition.appointmentStatus = 'pending';
      this.getAppointments(condition);
    }
  }

  async getAppointments(condition) {
    let pendingAppointment = await appointmentService.appointmentList(
      condition
    );
    pendingAppointment = pendingAppointment || {};
    this.setState({ pendingAppointment: pendingAppointment.response || [] });
  }

  async getMeasurementList(patientId) {
    let measurements = await measurementService.measurementList(patientId);
    measurements = measurements || {};
    console.log('Measurements', measurements.response);
    this.setState({ measurements: measurements.response || [] });
  }

  async getImageList(patientId) {
    let images = await imageService.imageList(patientId);
    images = images || {};
    this.setState({ images: images.response || [] });
  }

  async getAssessmentList(patientId) {
    let assessment = await assessmentService.assessmentList(patientId);
    assessment = assessment || {};
    this.setState({ assessments: assessment.response || [] });
  }

  async getPatientDetail(patientId) {
    this.setState({ loading: true });
    let patientData = await patientService.getPatientDetail(patientId);
    patientData = patientData || { response: [] };
    this.setState({
      patientData: patientData.response[0] || {},
      loading: false,
    });
  }

  openChatModal() {
    let modalConfig = { ...this.state.modalConfig };
    modalConfig.showMessageModal = true;
    this.setState({
      modalConfig,
    });
  }

  handleModalClose() {
    let modalConfig = { ...this.state.modalConfig };
    let measurementModalConfig = { ...this.state.measurementModalConfig };
    modalConfig.visible = false;
    modalConfig.showMessageModal = false;
    measurementModalConfig.visible = false;
    measurementModalConfig.showMessageModal = false;
    this.setState({
      modalConfig,
      measurementModalConfig,
    });
  }

  handleAppointmentShowAll() {
    let modalConfig = { ...this.state.modalConfig };
    modalConfig.visible = true;
    this.setState({
      modalConfig,
    });
  }

  handleMeasurementShowAll() {
    let measurementModalConfig = { ...this.state.measurementModalConfig };
    measurementModalConfig.visible = true;
    this.setState({
      measurementModalConfig,
    });
  }

  navigateToPhotos() {
    this.props.history.push('/photos/' + this.state.patientId);
  }

  navigateToAssessment() {
    this.props.history.push('/patient/' + this.state.patientId + '/assessment');
  }

  async startVideoConf() {
    let appointment = await appointmentService.appointmentList({
      appointmentStatus: 'confirmed',
    });
    appointment.response.sort((a, b) => {
      return new Date(a.updatedAt) - new Date(b.updatedAt);
    });
    let latestAppointment = appointment.response.pop();
    const data = {
      appointmentId: latestAppointment._id,
      userType: 'doctor',
    };
    let doctor = getDoctorName();
    let videoResponse = await videoConfService.getVideoUrl(data);
    const VcallRoom = videoResponse.VcallRoom;
    console.log('videoResponse', videoResponse);
    if (VcallRoom && VcallRoom.apiKey) {
      let link = `${CALL_BASE_URL}?apiKey=${VcallRoom.apiKey}&sessionId=${VcallRoom.sessionId}&token=${VcallRoom.tokens[0].token}&name=${doctor.firstName}${doctor.lastName}`;

      window.open(link, '_blank');
    } else {
      message.error('Some error occurred.');
    }
  }

  render() {
    let chatModalData = this.state.patientData
      ? {
          patient: [
            {
              firstName: this.state.patientData.firstName,
              lastName: this.state.patientData.lastName,
            },
          ],
          patientId: this.state.patientId,
        }
      : {
          patient: [{ firstName: '', lastName: '' }],
          patientId: this.state.patientId,
        };

    return (
      <div className="profile">
        {this.state.loading ? (
          <Loader />
        ) : (
          <Fragment>
            <Row className="">
              <Col span={12}>
                <Title type="secondary" bordered={false} level={4} />
              </Col>
            </Row>
            <Row gutter={18}>
              <Col lg={12}>
                <div className="card-box card-boxProfile">
                  <div className="profile-box1">
                    <Row>
                      <Col md={4}>
                        <img src="/images/profile.jpg" alt="Patient" />
                      </Col>
                      {this.state.patientData !== '' ? (
                        <Col md={13}>
                          <div className="profile-name">
                            {this.state.patientData.firstName
                              ? this.state.patientData.firstName +
                                ' ' +
                                this.state.patientData.lastName
                              : ''}
                          </div>
                        </Col>
                      ) : (
                        <Col md={13}>
                          <span>Loading</span>
                        </Col>
                      )}

                      <Col md={7}>
                        <Button
                          type="default"
                          size="small"
                          className="message-btn-width"
                          onClick={this.openChatModal}
                          style={{ backgroundColor: '#F0F0F0' }}
                        >
                          {/* <i class="material-icons">chat</i> */}
                          <img
                            className="profile_img"
                            src={email}
                            alt="Message"
                          />
                          <span>Message </span>
                        </Button>
                        <Button
                          type="default"
                          size="small"
                          className="message-btn-width"
                          onClick={this.startVideoConf}
                          style={{ backgroundColor: '#F0F0F0' }}
                        >
                          <img
                            className="profile_call_Img"
                            src={call}
                            alt="Message"
                          />
                          <span>Video Call</span>
                          {/* <i class="material-icons">video_call</i> */}
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="card-box left-card">
                  <div className="common-box">
                    <Row className="head">
                      <Col span={12}>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path fill="none" d="M0 0h24v24H0V0z" />
                          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm2 4h10v2H7zm0 4h7v2H7z" />
                        </svg> */}
                        <img
                          style={{ width: '20px', marginRight: '10px' }}
                          src={calendar}
                          alt="Calendar"
                        />
                        <strong style={{ color: '#202020' }}>
                          Appointments
                        </strong>
                      </Col>
                      <Col span={12}>
                        <Button
                          size="small"
                          className="profile_show_btn"
                          type="primary"
                          onClick={() => this.handleAppointmentShowAll()}
                          ghost
                        >
                          Show all appointment history
                        </Button>
                      </Col>
                    </Row>
                    {this.state.pendingAppointment !== '' ? (
                      this.state.pendingAppointment
                        .slice(0, 8)
                        .map(appointment => (
                          <Row>
                            <Col span={20} className="profile_appointment">
                              New appointment on&nbsp;
                              <strong>
                                {moment(appointment.appointmentDate).format(
                                  'MM-DD-YYYY | h:mm A'
                                )}
                              </strong>
                            </Col>
                            <Col span={4}>
                              <Button
                                className="confirm"
                                type="default"
                                style={{ color: '#0cBDA3' }}
                              >
                                <b>Confirm</b>
                              </Button>
                            </Col>
                          </Row>
                        ))
                    ) : (
                      <span>Loading</span>
                    )}
                    {this.state.pendingAppointment.length === 0 && (
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )}
                  </div>
                </div>
                <div className="card-box left-card">
                  <div className="common-box">
                    <Row className="head">
                      <Col span={15}>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path fill="none" d="M0 0h24v24H0V0z" />
                          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zM5 7V5h14v2H5zm2 4h10v2H7zm0 4h7v2H7z" />
                        </svg> */}
                        <img
                          style={{ width: '20px', marginRight: '10px' }}
                          src={assessment}
                          alt="Assessment"
                        />
                        <strong style={{ color: '#202020' }}>
                          Assessments
                        </strong>
                      </Col>
                      <Col span={9}>
                        <Button
                          size="small"
                          className="profile_show_btn"
                          type="primary"
                          ghost
                          onClick={() => this.navigateToAssessment()}
                        >
                          Show all assessment
                        </Button>
                      </Col>
                    </Row>
                    {this.state.assessments !== '' ? (
                      this.state.assessments.slice(0, 8).map(assessment => (
                        <Row>
                          <Col span={20} className="profile_appointment">
                            New assessment on&nbsp;
                            <strong>
                              {moment(assessment.createdAt).format(
                                'MM-DD-YYYY | h:mm A'
                              )}
                            </strong>
                          </Col>
                        </Row>
                      ))
                    ) : (
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )}
                  </div>
                </div>
              </Col>
              <Col lg={12}>
                <div className="card-box">
                  <div className="common-box meas-box">
                    <Row className="head">
                      <Col span={20}>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path fill="none" d="M0 0h24v24H0V0z" />
                          <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2 2H5V5h14v14zm0-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                        </svg> */}
                        <img
                          style={{ width: '20px', marginRight: '10px' }}
                          src={heartrate}
                          alt="Measurement"
                        />
                        <strong style={{ color: '#202020' }}>
                          Measurement
                        </strong>
                      </Col>
                      <Col span={4}>
                        {/* <Button
                          onClick={this.handleMeasurementShowAll}
                          style={{ float: 'right' }}
                          size="small"
                          type="primary"
                          ghost
                        >
                          Show All
                        </Button> */}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={24}>
                        <Table
                          size="small"
                          bordered={0}
                          pagination={{ pageSize: 5 }}
                          dataSource={this.state.measurements}
                        >
                          {/* <Column
                            title="No"
                            className={'column-header'}
                            dataIndex="id"
                            key={'id'}
                            render={(id, record, index) => (
                              <span className="normal-text">
                                {console.log(id, record, index)}
                              </span>
                            )}
                          /> */}
                          <Column
                            title="Time"
                            className={'column-header'}
                            dataIndex="time"
                            key={'time'}
                            render={(id, record, index) => (
                              <span className="normal-text">
                                {moment(
                                  record.measurement[
                                    record.measurement.length - 1
                                  ]
                                ).format('MM-DD-YYYY | hh:mm A')}
                              </span>
                            )}
                          />
                          <Column
                            title="Measurement"
                            className={'column-header'}
                            dataIndex="measurement"
                            key={'measurement'}
                            render={(id, record, index) => (
                              <span className="normal-text">
                                {record.measurement[0]}
                              </span>
                            )}
                          />
                          <Column
                            title="Value"
                            className={'column-header'}
                            dataIndex="value"
                            key={'value'}
                            render={(id, record, index) => (
                              <span className="normal-text">
                                {typeof record.measurement[1] === 'object'
                                  ? record.measurement[1].join('/')
                                  : record.measurement[1]}
                              </span>
                            )}
                          />
                        </Table>
                      </Col>
                    </Row>
                  </div>
                </div>
                {
                  <div className="card-box">
                    <div className="common-box gallery-box">
                      <Row className="head">
                        <Col span={18}>
                          {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path fill="none" d="M0 0h24v24H0V0z" />
                            <path d="M20 4v12H8V4h12m0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 9.67l1.69 2.26 2.48-3.1L19 15H9zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
                          </svg> */}
                          <img
                            style={{ width: '20px', marginRight: '10px' }}
                            src={human}
                            alt="Image"
                          />
                          <strong style={{ color: '#202020' }}>Images</strong>
                        </Col>
                        <Col span={6}>
                          <Button
                            onClick={this.navigateToPhotos}
                            className="profile_images_btn"
                            size="small"
                            type="primary"
                            ghost
                          >
                            View image file
                          </Button>
                        </Col>
                      </Row>
                      <Row className="gallery" gutter={12}>
                        {this.state.images !== '' ? (
                          this.state.images
                            .reverse()
                            .slice(0, 8)
                            .map(image => (
                              <Col span={6}>
                                <img
                                  src={image.imageURL}
                                  alt="1"
                                  onClick={this.navigateToPhotos}
                                />
                              </Col>
                            ))
                        ) : (
                          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        )}
                      </Row>
                    </div>
                  </div>
                }
              </Col>
            </Row>

            <AppointmentHistory
              visible={this.state.modalConfig.visible}
              clickCancel={this.handleModalClose}
              patientId={this.state.patientId}
              patientData={this.state.patientData}
            />

            <MeasurementHistory
              visible={this.state.measurementModalConfig.visible}
              clickCancel={this.handleModalClose}
              patientId={this.state.patientId}
              patientData={this.state.patientData}
            />

            {this.state.modalConfig.showMessageModal && (
              <ChatModal
                visible={this.state.modalConfig.showMessageModal}
                clickCancel={this.handleModalClose}
                data={chatModalData}
              />
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

export default Profile;
