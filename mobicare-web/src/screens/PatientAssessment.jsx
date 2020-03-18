import React, { Component, Fragment } from "react";
import { Typography, Table, Row, Col, Icon, Button, Divider, Empty, Tag } from "antd";
import "../assets/styles/patient-assessment.css";
import Pagination from "../components/Pagination";
import patientService from "../services/patients";
import assessmentService from "../services/assessment";
import moment from "moment";
import assessment from "../assets/images/assessment.png";

class PatientAssessment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      modalConfig: {
        visible: false
      },
      patientId: null,
      patientName: "Loading..",
      selectedAssessment: 0,
      selectedAssessmentDetails: null,
      assessments: []
    };

    this.handleInput = this.handleInput.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params) {
      this.setState({ patientId: this.props.match.params.patientId });
      let patient = await patientService.getPatientDetail(this.props.match.params.patientId);
      this.setState({
        patientName: `${patient.response[0].firstName} ${patient.response[0].lastName}`
      });
      let assessments = await assessmentService.assessmentList(this.props.match.params.patientId);
      this.setState({
        assessments: assessments.response,
        selectedAssessmentDetails: assessments.response[0]
      });
    }
  }

  handleInput(e) {
    this.setState({
      value: e.target.value
    });
  }

  render() {
    return (
      <div className="patient-assessment">
        <Row gutter={18}>
          <Col lg={8}>
            <div className="card-box">
              <div className="common-box assessment-box" style={{ overflowY: "auto" }}>
                <Row className="head">
                  <Col span={4}>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path fill="none" d="M0 0h24v24H0V0z" />
                      <path d="M9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4zm2 2H5V5h14v14zm0-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                    </svg> */}
                    <img style={{ width: "30px", marginRight: "10px" }} src={assessment} alt="Assessment" />
                  </Col>
                  <Col span={12}>
                    <strong style={{ fontSize: "18px", color: "black", lineHeight: 1 }}>{this.state.patientName}</strong>
                    <div style={{ fontSize: "12px", color: '#202020' }}>Assessment History</div>
                  </Col>
                </Row>
                <Row className="head">
                  <Col md={24}>
                    {this.state.assessments.length > 0 ? (
                      <Fragment>
                        {this.state.assessments &&
                          this.state.assessments.map((assessment, index) => {
                            return (
                              <Button
                                type={index === this.state.selectedAssessment ? "ghost" : "link"}
                                onClick={() =>
                                  this.setState({
                                    selectedAssessment: index,
                                    selectedAssessmentDetails: this.state.assessments[index]
                                  })
                                }
                                style={{ width: "100%" }}
                              >
                                Assessment taken on {moment(assessment.createdAt).format("YYYY-MM-DD")}
                              </Button>
                            );
                          })}
                      </Fragment>
                    ) : (
                      <Empty description="No Assessments" style={{ marginTop: "40%" }} image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    )}
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          {this.state.assessments.length > 0 ? (
            <Fragment>
              <Col lg={16}>
              <div className="card-box">
              <div className="patient-box1">
                {this.state.assessments && (
                  <h3 style={{ fontWeight: "bold" }}>
                    Assessment taken on{" "}
                    {moment(this.state.assessments[this.state.selectedAssessment].createdAt).format("YYYY-MM-DD")}
                  </h3>
                )}
                <Row className="mt-5 new-content">
                  {this.state.selectedAssessmentDetails &&
                    this.state.selectedAssessmentDetails.assessment.map((a, index) => (
                      <Fragment>
                        <p className="patient-assessment__ques">
                          <b>{a.que}</b>
                        </p>
                        <p>
                          <b>{a.ques}</b>
                        </p>
                        {[0, 1, 2, 5, 6, 9, 10, 11, 12, 13].indexOf(index) !== -1 && (
                          <Tag color="blue">{(a.option && a.option.ans) || "Unanswered"}</Tag>
                        )}
                        {index === 3 && (
                          <div>
                            <p>
                              Brain Stroke:{" "}
                              <Tag color={a.option[0].ans ? "green" : "red"}>
                                {a.option[0].ans ? `Yes | ${a.option[0].text}` : "No"}
                              </Tag>
                            </p>
                            <p>
                              Heart disease:{" "}
                              <Tag color={a.option[1].ans ? "green" : "red"}>
                                {a.option[1].ans ? `Yes | ${a.option[1].text}` : "No"}
                              </Tag>
                            </p>
                            <p>
                              High blood pressure:{" "}
                              <Tag color={a.option[2].ans ? "green" : "red"}>
                                {a.option[2].ans ? `Yes | ${a.option[2].text}` : "No"}
                              </Tag>
                            </p>
                            <p>
                              Diabetes:{" "}
                              <Tag color={a.option[3].ans ? "green" : "red"}>
                                {a.option[3].ans ? `Yes | ${a.option[3].text}` : "No"}
                              </Tag>
                            </p>
                            <p>
                              Dyslipidemia:{" "}
                              <Tag color={a.option[4].ans ? "green" : "red"}>
                                {a.option[4].ans ? `Yes | ${a.option[4].text}` : "No"}
                              </Tag>
                            </p>
                            <p>
                              Tuberculosis:{" "}
                              <Tag color={a.option[5].ans ? "green" : "red"}>
                                {a.option[5].ans ? `Yes | ${a.option[5].text}` : "No"}
                              </Tag>
                            </p>
                            <p>
                              Other:{" "}
                              <Tag color={a.option[6].ans ? "green" : "red"}>
                                {a.option[6].ans ? `Yes | ${a.option[6].text}` : "No"}
                              </Tag>
                            </p>
                          </div>
                        )}
                        {index === 4 && (
                          <div>
                            <p>
                              Brain Stroke:{" "}
                              <Tag color={a.option[0].ans ? "green" : "red"}>{a.option[0].ans ? `Yes` : "No"}</Tag>
                            </p>
                            <p>
                              Heart disease:{" "}
                              <Tag color={a.option[1].ans ? "green" : "red"}>{a.option[1].ans ? `Yes` : "No"}</Tag>
                            </p>
                            <p>
                              High blood pressure:{" "}
                              <Tag color={a.option[2].ans ? "green" : "red"}>{a.option[2].ans ? `Yes` : "No"}</Tag>
                            </p>
                            <p>
                              Diabetes: <Tag color={a.option[3].ans ? "green" : "red"}>{a.option[3].ans ? `Yes` : "No"}</Tag>
                            </p>
                            <p>
                              Dyslipidemia:{" "}
                              <Tag color={a.option[4].ans ? "green" : "red"}>{a.option[4].ans ? `Yes` : "No"}</Tag>
                            </p>
                            <p>
                              Tuberculosis:{" "}
                              <Tag color={a.option[5].ans ? "green" : "red"}>{a.option[5].ans ? `Yes` : "No"}</Tag>
                            </p>
                            <p>
                              Other: <Tag color={a.option[6].ans ? "green" : "red"}>{a.option[6].ans ? `Yes` : "No"}</Tag>
                            </p>
                          </div>
                        )}
                        {index === 7 && (
                          <div>
                            <p className="patient-assessment__ques">
                              <b>8. If you used to smoke but stopped, please answer the following.</b>
                            </p>
                            <p>
                              For how many years had you smoked? <Tag color="blue">{a.value[0] || "Unanswered"}</Tag>
                            </p>
                            <p>
                              How many cigarettes in a typical day did you smoke before you stopped?{" "}
                              <Tag color="blue">{a.value[1] || "Unanswered"}</Tag>
                            </p>
                          </div>
                        )}
                        {index === 8 && (
                          <div>
                            <p>
                              How long have you been smoking? <Tag color="blue">{a.value[0] || "Unanswered"}</Tag>
                            </p>
                            <p>
                              How many cigarettes on average do you smoke on a regular day?{" "}
                              <Tag color="blue">{a.value[1] || "Unanswered"}</Tag>
                            </p>
                          </div>
                        )}
                        <Divider />
                      </Fragment>
                    ))}
                </Row>
                </div>
                </div>
              </Col>
            </Fragment>
          ) : (
            <Empty description="No Assessments" style={{ marginTop: "20%" }} />
          )}
        </Row>
      </div>
    );
  }
}

export default PatientAssessment;
