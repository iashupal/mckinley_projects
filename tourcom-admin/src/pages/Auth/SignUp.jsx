import "./auth.css";
import React, { Component } from "react";
import { Row, Col, DatePicker, Form, Input, Button, Icon, message } from "antd";
import { Link } from "react-router-dom";
import locale from "antd/es/date-picker/locale/ko_KR";
import AuthApiService from "../../services/AuthApiService";
import axios from 'axios';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: null,
      password: null,
      username: null,
      mobile: null,
      affiliation: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleDOB = this.handleDOB.bind(this);
  }

  toggleLoading() {
    this.setState({ loading: !this.state.loading });
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleDOB(date) {
    this.setState({
      dateOfBirth: date.toString()
    });
  }

  handleSubmit = async e => {
    this.toggleLoading();
    e.preventDefault();
  //   axios.post(`https://y08rn7befe.execute-api.us-east-1.amazonaws.com/dev/users`)
  //   .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
    const payload = { ...this.state };
    console.log("payload", payload);
    const response = await AuthApiService.register(payload);
    // console.log(response);
    // if (response.status === 0) {
    //   message.error(response.response);
    //   console.log("Response ", response);
    // } else {
    //   message.success(response.response);
    //   this.props.history.push("/");
    // }
    // this.toggleLoading();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
    // console.log(payload);
  };

  render() {
    const {loading} = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row>
          <Col xs={0} m={0} md={0} lg={10}>
            <img
              className="auth__banner"
              src="https://images.unsplash.com/photo-1534238151781-c62af32c97a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
              alt="Auth banner"
            />
          </Col>
          <Col className="auth__form" xs={24} sm={24} md={24} lg={14}>
            <Form className="login-form" onSubmit={this.handleSubmit} loading={loading}>
              <Form.Item label="이메일">
                {getFieldDecorator("email", {
                  rules: [{ required: true, message: "이메일을 입력하세요." }]
                })(
                  <Input
                    prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
                    placeholder="ex) example@example.com"
                    size="large"
                  />
                )}
              </Form.Item>
              <Form.Item label="아이디">
                {getFieldDecorator("username", {
                  rules: [{ required: true, message: "아이디를 입력하세요." }]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                    placeholder="ex) 홍길동1234"
                    size="large"
                  />
                )}
              </Form.Item>
              <Form.Item label="비밀번호">
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "비빌번호를 입력하세요" }]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                    type="password"
                    placeholder="*******"
                    size="large"
                  />
                )}
              </Form.Item>
              <Form.Item label="휴대전화">
                {getFieldDecorator("mobile", {
                  rules: [{ required: true, message: "휴대전화를 입력하세요" }]
                })(
                  <Input
                    prefix={<Icon type="phone" style={{ color: "rgba(0,0,0,.25)" }} />}
                    type="tel"
                    placeholder="ex) 010-1234-5678"
                    size="large"
                  />
                )}
              </Form.Item>
              <Form.Item label="소속">
                {getFieldDecorator("affiliation", {
                  rules: [{ required: true, message: "소속을 입력하세요" }]
                })(
                  <Input
                    prefix={<Icon type="home" style={{ color: "rgba(0,0,0,.25)" }} />}
                    type="text"
                    placeholder="(주) 투어컴"
                    size="large"
                    onChange={this.handleTextChange}
                  />
                )}
              </Form.Item>
              <Form.Item label="생년월일">
                {getFieldDecorator("dob", {
                  rules: [{ required: true, message: "날짜를 입력하세요" }]
                })(<DatePicker locale={locale} size="large" onChange={this.handleDOB} />)}
              </Form.Item>
              <br />
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" size="large">
                  회원가입
                </Button>
                &nbsp;&nbsp;
                <Link to="/">이미 계정이 있습니다</Link>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create({ name: "signUpForm" })(SignUp);
