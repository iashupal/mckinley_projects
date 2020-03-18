import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import axios from 'axios';
import { ADMIN_LOGIN_URL } from '../utils/endpoints';
import caster_logo_large from '../images/caster-logo_large.png';

class Login extends Component {
  handleSubmit = e => {
    console.log('handle clicked');
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.toggleLoading();
        axios
          .post(ADMIN_LOGIN_URL, {
            email: values.email,
            password: values.password,
            // userType: "admin"
          })
          .then(res => {
            console.log('Api response', res);
            localStorage.setItem('token', res.data.Body);
            console.log('token', res.data.Body);
            this.props.toggleLoading();
            window.location.href = '/';
          })
          .catch(error => {
            message.error('Unable to signin, please retry!');
            this.props.toggleLoading();
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <img
          src={caster_logo_large}
          alt="Caster Admin"
          width="60"
          style={{ paddingBottom: 20 }}
        />
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Required' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Required' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              size="large"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <br />
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={loading}
          >
            Log in
          </Button>
          <br />
          <a className="login-form-forgot" href="../reset-password">
            Forgot password?
          </a>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create({ name: 'normal_login' })(Login);

export default LoginForm;
