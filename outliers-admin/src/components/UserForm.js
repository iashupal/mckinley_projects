import React, { Component } from "react";
import { Drawer, Form, Button, Col, Row, Input, message, DatePicker } from "antd";
import { PUT_USER_PROFILE_URL } from "../utils/endpoints";
import axios from "axios";
import moment from "moment";

class UserFormRaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      users: {},
      file: null
    };
    this.handlefileChange = this.handlefileChange.bind(this);
  }

  handleTextChange = e => {
    let users = this.state.users;
    users[e.target.name] = e.target.value;
    this.setState({ users });
  };

  handleDateChange = (date, dateString) => {
    const users = this.state.users;
    users["dob"] = moment(date).toISOString();
    this.setState({ users });
  };

  handlefileChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  handleSubmit = () => {
    const token = localStorage.getItem("token");
    let users = this.state.users;
    var formData = new FormData();
    if (this.state.file) {
      formData.append("userimage", this.state.file);
      formData.append("imageIndex", 0);
    }
    // formData.append("userimage", this.state.file);
    formData.append("username", users.username);
    formData.append("userimage", this.state.file);
    formData.append("imageIndex", 0);
    formData.append("college", users.college);
    formData.append("company", users.company);
    formData.append("location", users.location);
    formData.append("dob", users.dob);
    formData.append("occupation", users.occupation);
    formData.append("height", users.height);
    formData.append("phoneNumber", users.phoneNumber);
    formData.append("physique", users.physique);
    formData.append("rating", users.rating);
    formData.append("userId", users._id);
    if (this.props.mode === "new") {
    } else {
      axios
        .put(PUT_USER_PROFILE_URL, formData, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          message.success("User updated successfully!");
          window.location.reload();
        })
        .catch(err => {
          message.error(err.response);
        });
    }
  };

  UNSAFE_componentWillReceiveProps(props) {
    if (props.mode === "edit") {
      this.setState({ users: props.entry });
    }
  }

  render() {
    const { visible, hideForm, mode } = this.props;
    return (
      <div>
        {mode === "new" ? (
          <Drawer title="Add a new sponsored event" width={720} onClose={hideForm} visible={visible} />
        ) : (
          <Drawer
            title={`Edit details ${this.state.users && this.state.users.username}`}
            width={720}
            onClose={hideForm}
            visible={visible}
            entry={this.state.entry}
          >
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Select image">
                    <Input onChange={this.handlefileChange} name="userimage" type="file" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Username">
                    <Input
                      placeholder="Please enter Username"
                      value={this.state.users && this.state.users.username}
                      name="username"
                      onChange={this.handleTextChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="College Name">
                    <Input
                      placeholder="Please enter college name"
                      onChange={this.handleTextChange}
                      name="college"
                      value={this.state.users.college}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Company Name">
                    <Input
                      placeholder="Please enter company name"
                      onChange={this.handleTextChange}
                      name="company"
                      value={this.state.users.company}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Location">
                    <Input
                      placeholder="Please enter location"
                      onChange={this.handleTextChange}
                      name="location"
                      value={this.state.users.location}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Date of Birth">
                    <DatePicker
                      style={{ width: "100%" }}
                      getPopupContainer={trigger => trigger.parentNode}
                      onChange={this.handleDateChange}
                      value={moment(this.state.users.dob)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Occupation">
                    <Input
                      placeholder="Please enter Occupation"
                      onChange={this.handleTextChange}
                      name="occupation"
                      value={this.state.users.occupation}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Height">
                    <Input
                      placeholder="Please enter Height"
                      onChange={this.handleTextChange}
                      name="height"
                      type="number"
                      value={this.state.users.height}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Phone number">
                    <Input
                      placeholder="Please enter phone number"
                      onChange={this.handleTextChange}
                      name="phoneNumber"
                      type="number"
                      value={this.state.users.phoneNumber}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Physique">
                    <Input
                      placeholder="Please enter physique"
                      onChange={this.handleTextChange}
                      name="physique"
                      value={this.state.users.physique}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="User Rating">
                    <Input
                      placeholder="Please enter rating 0 to 5"
                      onChange={this.handleTextChange}
                      name="rating"
                      type="number"
                      value={this.state.users.rating}
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
              <Button onClick={hideForm} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} type="primary">
                Submit
              </Button>
            </div>
          </Drawer>
        )}
      </div>
    );
  }
}

const UserForm = Form.create()(UserFormRaw);
export default UserForm;
