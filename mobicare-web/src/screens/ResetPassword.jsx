import "../assets/styles/sign-in.css";
import React, { Component } from "react";
import { Input, Button, Icon, message } from "antd";
import { Link, withRouter } from "react-router-dom";
import logo from "../assets/images/logo.png";

import authService from "../services/auth";

class ResetPassword extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false
    };
    this.toggleLoading = this.toggleLoading.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleLoading() {
    this.setState({ loading: !this.state.loading });
  }
  async handleSubmit() {
    if (
      !!this.state.password &&
      this.state.password === this.state.confirmPassword &&
      this.state.password.length >= 6
    ) {
      this.toggleLoading();
      const data = this.props.match.params;
      data.password = this.state.password;
      delete data.loading;
      const response = await authService.resetPassword(data);
      if (response.status === 0) {
        message.error(response.response);
      } else {
        console.log(response);
      }
      this.toggleLoading();
    } else {
      message.error("Please check your password");
    }
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
            <h2>Reset Password</h2>
            <p>Set a new password to recover your Mobicare account</p>
            <Input
              placeholder="Enter new password"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              size="large"
              name="password"
              onChange={this.handleTextChange}
              onPressEnter={this.handleSubmit}
              type="password"
            />
            <Input
              placeholder="Confirm password"
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              size="large"
              name="confirmPassword"
              onChange={this.handleTextChange}
              onPressEnter={this.handleSubmit}
              type="password"
            />
            <Button
              type="primary"
              icon="arrow-right"
              size="large"
              loading={loading}
              onClick={this.handleSubmit}
            >
              Reset Password
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ResetPassword);
