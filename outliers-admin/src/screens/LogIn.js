import React, { Component } from "react";
import LoginForm from "../components/LoginForm";
import "../css/login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.toggleLoading = this.toggleLoading.bind(this);
  }
  toggleLoading() {
    this.setState({ loading: !this.state.loading });
  }
  render() {
    const { loading } = this.state;
    return (
      <div className="login">
        <div className="login__form">
          <LoginForm toggleLoading={this.toggleLoading} loading={loading} />
        </div>
      </div>
    );
  }
}

export default Login;
