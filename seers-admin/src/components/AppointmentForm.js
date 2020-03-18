import React, { Component } from "react";
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from "antd";
import moment from "moment";
import Axios from "axios";
import { GET_APPOINTMENTS_URL, POST_APPOINTMENT_URL } from "../utils/endpoints";

const { Option } = Select;

class AppointmentFormRaw extends React.Component {
  state = {
    visible: false,
    doctorId: null,
    patientId: null,
    agenda: null,
    date: null
  };

  addUser = (id, type) => this.setState({ [type]: id });
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  handleAddDate = (date, dateString) => this.setState({ date: dateString });

  handleSubmit = (id = null) => {
    let data = this.state;
    data.appointmentDate = data.date;
    if (this.props.mode === "new") {
      Axios.post(POST_APPOINTMENT_URL, data, {
        headers: { "x-access-token": localStorage.getItem("token") }
      })
        .then(res => {
          console.log(res);
          window.location.reload();
        })
        .catch(err => console.log(err));
    } else {
      Axios.put(
        POST_APPOINTMENT_URL,
        { ...data, id },
        {
          headers: { "x-access-token": localStorage.getItem("token") }
        }
      )
        .then(res => {
          console.log(res);
          window.location.reload();
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, toggleForm, doctors, patients, mode, entry } = this.props;
    return (
      <div>
        {mode === "new" ? (
          <Drawer title="Add a new appointment" width={720} onClose={toggleForm} visible={visible}>
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Doctor ID">
                    {getFieldDecorator("doctorId", {
                      rules: [{ required: true, message: "Please enter doctor ID" }]
                    })(
                      <Select placeholder="Please select doctor" onChange={value => this.addUser(value, "doctorId")}>
                        {doctors.map(doctor => (
                          <Select.Option value={doctor._id}>{doctor.fullName}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Patient ID">
                    {getFieldDecorator("patientId", {
                      rules: [{ required: true, message: "Please enter patient ID" }]
                    })(
                      <Select
                        placeholder="Please select patient"
                        value={this.state.patient}
                        onChange={value => this.addUser(value, "patientId")}
                      >
                        {patients.map(patient => (
                          <Select.Option value={patient._id}>{patient.fullName}</Select.Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Agenda">
                    {getFieldDecorator("agenda", {
                      rules: [{ required: true, message: "Please enter agenda" }]
                    })(
                      <Input.TextArea
                        placeholder="Please enter agenda"
                        name="agenda"
                        onChange={this.handleChange}
                        value={this.state.agenda}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Date">
                    {getFieldDecorator("dateTime", {
                      rules: [
                        {
                          required: true,
                          message: "Please choose the dateTime"
                        }
                      ]
                    })(
                      <DatePicker
                        style={{ width: "100%" }}
                        getPopupContainer={trigger => trigger.parentNode}
                        onChange={this.handleAddDate}
                        value={moment(this.state.date)}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                borderTop: "1px solid #e9e9e9",
                padding: "10px 16px",
                background: "#fff",
                textAlign: "right"
              }}
            >
              <Button onClick={toggleForm} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={toggleForm} type="primary" onClick={this.handleSubmit}>
                Submit
              </Button>
            </div>
          </Drawer>
        ) : (
          <Drawer title="Edit Appointmtent" width={720} onClose={toggleForm} visible={visible}>
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Date">
                    {getFieldDecorator("dateTime", {
                      rules: [
                        {
                          required: true,
                          message: "Please choose the dateTime"
                        }
                      ]
                    })(
                      <DatePicker
                        style={{ width: "100%" }}
                        getPopupContainer={trigger => trigger.parentNode}
                        onChange={this.handleAddDate}
                        value={moment(this.state.date)}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                borderTop: "1px solid #e9e9e9",
                padding: "10px 16px",
                background: "#fff",
                textAlign: "right"
              }}
            >
              <Button onClick={toggleForm} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={toggleForm} type="primary" onClick={() => this.handleSubmit(entry.id)}>
                Submit
              </Button>
            </div>
          </Drawer>
        )}
      </div>
    );
  }
}

const AppointmentForm = Form.create()(AppointmentFormRaw);
export default AppointmentForm;
