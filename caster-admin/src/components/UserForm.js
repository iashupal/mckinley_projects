import React, { Component } from "react";
import { Drawer, Form, Button, Col, Row, Input, message,Select, DatePicker, Divider } from "antd";
import { PUT_USER_PROFILE_URL } from "../utils/endpoints";
import axios from "axios";
import moment from "moment";

class UserFormRaw extends Component {
  constructor(props){
    super(props);
    this.state = {
    visible: false,
    updateUsers: {},
    file: null
  };
  this.handlefileChange = this.handlefileChange.bind(this);
  }
 

  handleTextChange = e => {
    let updateUsers = this.state.updateUsers;
    updateUsers[e.target.name] = e.target.value;
    this.setState({ updateUsers });
  };
  handleDateChange = (date, dateString) => {
    const updateUsers = this.state.updateUsers;
    updateUsers["dob"] = moment(date).toISOString();
    this.setState({ updateUsers });
  };

  handlefileChange(e) {
    // let banner = this.state.banner;
    this.setState({ file: e.target.files[0] });
  }
  
  handleSubmit = () => {
    const token = localStorage.getItem("token");
    let updateUsers = this.state.updateUsers;
    console.log("updateUsers", updateUsers);
    var formData = new FormData();
    if (this.state.file){
      formData.append("user", this.state.file);
    }
    formData.append("username", updateUsers.username);
    formData.append("dob", updateUsers.dob);
    formData.append("gender", updateUsers.gender);
    formData.append("userId", updateUsers._id);
    if (this.props.mode === "new") {
      // axios
      //   .post(
      //     POST_FAQ_URL,
      //     {
      //       ...updateUsers
      //     },
      //     {
      //       headers: {
      //         Authorization: token
      //       }
      //     }
      //   )
      //   .then(res => {
      //     message.success("Faq created successfully!");
      //     window.location.reload();
      //   })
      //   .catch(err => {
      //     message.error(err.response.data.response);
      //   });
    } else {
      console.log("file", this.state.file);
      console.log("formData", formData);
      //  console.log("id", userId);
      axios
        .put(
          PUT_USER_PROFILE_URL,
          // {
            formData,
            // userId: updateUsers._id,
            // id: updateUsers.id
          // },
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(res => {
          message.success("User info updated successfully!");
          window.location.reload();
        })
        .catch(err => {
          message.error(err.response.data.response);
        });
    }
  };

  componentWillReceiveProps(props) {
    if (props.mode === "edit") {
      this.setState({ updateUsers: props.entry });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, hideForm, mode } = this.props;
    return (
      <div>
        {mode === "new" ? (
          <Drawer title="Add a new Faq" width={720} onClose={hideForm} visible={visible}>
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Title">
                    {getFieldDecorator("title", {
                      rules: [{ required: true, message: "Please enter title" }]
                    })(
                      <Input
                        placeholder="Please enter title"
                        onChange={this.handleTextChange}
                        name="title"
                        value={this.state.faq.title}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Content">
                    {getFieldDecorator("content", {
                      rules: [{ required: true, message: "Please enter content" }]
                    })(
                      <Input
                        placeholder="Please enter content"
                        onChange={this.handleTextChange}
                        name="content"
                        value={this.state.faq.content}
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
              <Button onClick={hideForm} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Divider type="vertical" />
              <Button onClick={this.handleSubmit} type="primary">
                Submit
              </Button>
            </div>
          </Drawer>
        ) : (
          <Drawer
            title={`Edit details ${this.state.updateUsers && this.state.updateUsers.username}`}
            width={720}
            onClose={hideForm}
            visible={visible}
            entry={this.state.entry}
          >
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Select image">
                    {getFieldDecorator("userImage", {
                      rules: [{ required: true, message: "Please select image" }]
                    })(
                      <Input
                        onChange={this.handlefileChange}
                        name="userImage"
                        type="file"
                        // value={this.state.banner.bannerImage}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="User name">
                    <Input
                      placeholder="Please enter username"
                      value={this.state.updateUsers && this.state.updateUsers.username}
                      name="username"
                      onChange={this.handleTextChange}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                <Form.Item label="Date of birth">
                    <DatePicker
                      style={{ width: "100%" }}
                      getPopupContainer={trigger => trigger.parentNode}
                      onChange={this.handleDateChange}
                      value={moment(this.state.updateUsers.dob)}
                    />
                </Form.Item>
                </Col>
                 <Col span={12}>
                  <Form.Item label="Gender">
                      <Select
                        placeholder="Please select gender"
                        value={this.state.updateUsers && this.state.updateUsers.gender}
                        onChange={value =>
                          this.handleTextChange({
                            target: {
                              name: "gender",
                              value: value
                            }
                          })
                        }
                      >
                        <Select.Option value="man">Man</Select.Option>
                        <Select.Option value="woman">Woman</Select.Option>
                      </Select>
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
