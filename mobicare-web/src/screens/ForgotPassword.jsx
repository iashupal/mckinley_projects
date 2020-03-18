import "../assets/styles/sign-in.css";
import React, { Component, Fragment } from "react";
import { Input, Button, Icon, message } from "antd";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../assets/styles/forgotPwd.css";
import authService from "../services/auth";

class ForgotPassword extends Component {
  constructor(props) {
    super();
    this.state = {
      loading: false,
      success: false
    };
    this.toggleLoading = this.toggleLoading.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.cancel = this.cancel.bind(this);
  }
  toggleLoading() {
    this.setState({ loading: !this.state.loading });
  }
  async handleSubmit() {
    this.toggleLoading();
    const data = { ...this.state };
    delete data.loading;
    delete data.success;
    const response = await authService.sendForgotEmail(data);
    if (response.status === 0) {
      message.error(response.response);
    } else {
      this.setState({ success: true });
    }
    this.toggleLoading();
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { loading, success } = this.state;
    return (
      <div className="signin">
        <div className="hero" />
        <div className="signin-form-container">
          <div className="form animated fadeIn">
            <img src={logo} alt="Mobicare+ Home" />
            <h2>Forgot Password</h2>
            {success ? (
              <Fragment>
                <p>Please check your email for a reset password link</p>
                <Button type="primary" icon="arrow-right" size="large" loading={loading} href="/signIn">
                  Sign In
                </Button>
              </Fragment>
            ) : (
              <Fragment>
                <p className="associate_mail">Enter email associated with your Mobicare account to continue</p>
                <Input
                  placeholder="email@example.com"
                  prefix={<Icon type="inbox" style={{ color: "rgba(0,0,0,.25)" }} />}
                  size="large"
                  name="email"
                  onChange={this.handleTextChange}
                  onPressEnter={this.handleSubmit}
                />
                <Button type="primary" size="large" loading={loading} onClick={this.handleSubmit}>
                  Send to email
                </Button>
                <Button style={{ border: "1px solid" }} type="link" size="large" onClick={this.cancel}>
                  Cancel
                </Button>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
