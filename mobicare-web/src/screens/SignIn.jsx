import "../assets/styles/sign-in.css";
import React, { Component } from "react";
import { Input, Button, Icon, message } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

import authService from "../services/auth";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: null,
      password: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleLoading = this.toggleLoading.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  toggleLoading() {
    this.setState({ loading: !this.state.loading });
  }
  async handleSubmit() {
    this.toggleLoading();
    const data = { ...this.state };
    delete data.loading;
    data.userType = "doctor";
    const response = await authService.login(data);
    if (response.status === 0) {
      message.error(response.response);
    } else {
      localStorage.setItem("token", response.response);
      window.location = "/";
    }
    this.toggleLoading();
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="signin">
        <div className="hero" />
        <div className="signin-form-container">
          <div className="form animated fadeIn">
            <img src={logo} alt="Mobicare+ Home" />
            <h2>Sign in to your Mobicare doctor account</h2>
            <Input
              placeholder="Enter your email"
              prefix={<Icon type="inbox" style={{ color: "rgba(0,0,0,.25)" }} />}
              size="large"
              name="email"
              onChange={this.handleTextChange}
              onPressEnter={this.handleSubmit}
            />
            <Input
              placeholder="Enter your password"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              size="large"
              type="password"
              name="password"
              onChange={this.handleTextChange}
              onPressEnter={this.handleSubmit}
            />
            <Button type="primary" icon="login" size="large" loading={loading} onClick={this.handleSubmit}>
              Sign In
            </Button>
            <Button type="link" icon="user-add" size="large" onClick={this.handleSubmit} href="/signUp">
              Sign Up
            </Button>
            <Button type="link" icon="question" size="large" href="/forgot">
              Forgot Password
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
