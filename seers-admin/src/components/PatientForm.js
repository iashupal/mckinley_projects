import React, { Component } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  message
} from "antd";
import moment from "moment";
import Axios from "axios";
import {
  GET_PATIENTS_URL,
  PUT_PATIENTS_URL,
  REGISTER_PATIENT
} from "../utils/endpoints";

const { Option } = Select;

class PatientFormRaw extends React.Component {
  state = { visible: false, patient: {} };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  componentDidMount() {
    if (this.props.mode === "edit") {
      this.setState({ patient: this.props.entry });
    }
  }

  handleTextChange = e => {
    const patient = this.state.patient;
    patient[e.target.name] = e.target.value;
    this.setState({ patient });
  };

  handleDateChange = (date, dateString) => {
    const patient = this.state.patient;
    patient["dateOfBirth"] = moment(date).toISOString();
    this.setState({ patient });
    console.log(this.state.patient);
  };

  handleSubmit = () => {
    if (this.props.mode === "new") {
      Axios.post(
        REGISTER_PATIENT,
        { ...this.state.patient, userType: "patient" },
        {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        }
      )
        .then(res => {
          message.success("Patient created successfully!");
          window.location.reload();
        })
        .catch(err => {
          message.error(err.response.data.response);
        });
    } else {
      Axios.put(
        PUT_PATIENTS_URL,
        { ...this.state.patient, userType: "patient" },
        {
          headers: {
            "x-access-token": localStorage.getItem("token")
          }
        }
      )
        .then(res => {
          message.success("Patient updated successfully!");
          window.location.reload();
        })
        .catch(err => {
          message.error(err.response.data.response);
        });
    }
  };

  componentWillReceiveProps(props) {
    if (props.mode === "edit") {
      this.setState({ patient: props.entry });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, toggleForm, mode, entry } = this.props;
    return (
      <div>
        {mode === "new" ? (
          <Drawer
            title={mode === "new" ? "Add a new account" : "Edit patient"}
            width={720}
            onClose={toggleForm}
            visible={visible}
          >
            <Form
              layout="vertical"
              hideRequiredMark
              onSubmit={() => alert("ok")}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="First Name">
                    {getFieldDecorator("firstName", {
                      rules: [
                        { required: true, message: "Please enter first name" }
                      ]
                    })(
                      <Input
                        placeholder="Please enter first name"
                        name="firstName"
                        onChange={this.handleTextChange}
                        value={this.state.patient.firstName || null}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name">
                    {getFieldDecorator("lastName", {
                      rules: [
                        { required: true, message: "Please enter last name" }
                      ]
                    })(
                      <Input
                        placeholder="Please enter last name"
                        name="lastName"
                        onChange={this.handleTextChange}
                        value={this.state.patient.lastName || null}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Email">
                    {getFieldDecorator("email", {
                      rules: [{ required: true, message: "Please enter email" }]
                    })(
                      <Input
                        placeholder="Please enter email"
                        name="email"
                        onChange={this.handleTextChange}
                        value={this.state.patient.email || null}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Date Of Birth">
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
                        onChange={this.handleDateChange}
                        value={this.state.patient.dateOfBirth}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Password">
                    {getFieldDecorator("password", {
                      rules: [
                        { required: true, message: "Please enter password" }
                      ]
                    })(
                      <Input
                        placeholder="Please enter password"
                        name="password"
                        onChange={this.handleTextChange}
                        value={this.state.patient.password || null}
                        type="password"
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
              <Button
                onClick={toggleForm}
                type="primary"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </Drawer>
        ) : (
          <Drawer
            title={`Edit details for ${entry.name}`}
            width={720}
            onClose={toggleForm}
            visible={visible}
          >
            <Form
              layout="vertical"
              hideRequiredMark
              onSubmit={() => alert("ok")}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="First Name">
                    <Input
                      placeholder="Please enter first name"
                      value={this.state.patient.firstName}
                      onChange={this.handleTextChange}
                      name="firstName"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name">
                    <Input
                      placeholder="Please enter last name"
                      value={this.state.patient.lastName}
                      onChange={this.handleTextChange}
                      name="lastName"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Email">
                    <Input
                      placeholder="Please enter email"
                      value={this.state.patient.email}
                      onChange={this.handleTextChange}
                      name="email"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Date Of Birth">
                    <DatePicker
                      style={{ width: "100%" }}
                      getPopupContainer={trigger => trigger.parentNode}
                      value={moment(this.state.patient.dateOfBirth)}
                      onChange={this.handleDateChange}
                    />
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
              <Button
                onClick={toggleForm}
                type="primary"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </Drawer>
        )}
      </div>
    );
  }
}

const PatientForm = Form.create()(PatientFormRaw);
export default PatientForm;
