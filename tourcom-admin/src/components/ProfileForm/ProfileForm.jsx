import React, { Component } from "react";
import { Drawer, Form, Button, Col, Row, Input, message } from "antd";

class ProfileFormRaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      firstname: null,
      lastname: null,
      email: null,
      status: null,
      age: null,
      phone: null,
      education: null,
      company: null,
      address: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //   handleTextChange = e => {
  //     const user = this.state.user;
  //     user[e.target.name] = e.target.value;
  //     this.setState({ user });
  //   };

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  }

  componentDidMount(props) {
    if (this.props.mode === "edit") {
      this.setState({ user: this.props.entry });
    }
  }

  componentWillReceiveProps(props) {
    if (props.mode === "edit") {
      this.setState({ user: props.entry });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, hideForm, mode } = this.props;
    return (
      <div>
        <Drawer
          title={`Edit details ${this.state.user && this.state.user.name}`}
          width={720}
          onClose={hideForm}
          visible={visible}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="First Name">
                  {getFieldDecorator("firstname", {
                    rules: [{ required: true, message: "Please enter first name." }]
                  })(
                    <Input
                      placeholder="Please enter first name"
                      // value={this.state.user && this.state.user.firstName}
                      name="firstname"
                      onChange={this.handleTextChange}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last Name">
                  {getFieldDecorator("lastname", {
                    rules: [{ required: true, message: "Please enter last name." }]
                  })(
                    <Input
                      placeholder="Please enter last name"
                      // value={this.state.user && this.state.user.lastName}
                      name="lastname"
                      onChange={this.handleTextChange}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Email">
                  {getFieldDecorator("email", {
                    rules: [{ required: true, message: "Please enter email address." }]
                  })(
                    <Input
                      placeholder="Please enter email"
                      // value={this.state.user && this.state.user.email}
                      name="email"
                      onChange={this.handleTextChange}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Status">
                  {getFieldDecorator("status", {
                    rules: [{ required: true, message: "Please enter status." }]
                  })(
                    <Input
                      placeholder="Please enter Status"
                      // value={this.state.user && this.state.user.email}
                      name="status"
                      onChange={this.handleTextChange}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Age">
                  {getFieldDecorator("age", {
                    rules: [{ required: true, message: "Please enter age." }]
                  })(
                    <Input
                      placeholder="Age"
                      // value={this.state.user && this.state.user.phone}
                      name="age"
                      type="number"
                      onChange={this.handleTextChange}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phone">
                  {getFieldDecorator("phone", {
                    rules: [{ required: true, message: "Please enter phone number." }]
                  })(
                    <Input
                      placeholder="Phone"
                      // value={this.state.user && this.state.user.phone}
                      name="phone"
                      onChange={this.handleTextChange}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Education">
                  {getFieldDecorator("education", {
                    rules: [{ required: true, message: "Please enter Education." }]
                  })(
                    <Input
                      placeholder="Education"
                      // value={this.state.user && this.state.user.phone}
                      name="education"
                      onChange={this.handleTextChange}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Company">
                  {getFieldDecorator("company", {
                    rules: [{ required: true, message: "Please enter company name." }]
                  })(
                    <Input
                      placeholder="Company"
                      // value={this.state.user && this.state.user.phone}
                      name="company"
                      onChange={this.handleTextChange}
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="Address">
                  {getFieldDecorator("address", {
                    rules: [{ required: true, message: "Please enter address." }]
                  })(
                    <Input
                      placeholder="Address"
                      // value={this.state.user && this.state.user.phone}
                      name="address"
                      onChange={this.handleTextChange}
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
            <Button htmlType="submit" onClick={this.handleSubmit} type="primary">
              Submit
            </Button>
          </div>
        </Drawer>
        {/* )} */}
      </div>
    );
  }
}

const ProfileForm = Form.create()(ProfileFormRaw);
export default ProfileForm;
