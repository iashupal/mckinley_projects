import "./auth.css";
import React, { Component } from "react";
import { Row, Col, Typography, Form, Input, Button, Icon } from "antd";
import { Link } from "react-router-dom";
// import axios from "axios";

const { Title, Paragraph, Text } = Typography;

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

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row>
          <Col xs={0} m={0} md={0} lg={10}>
            <img
              className='auth__banner'
              src='https://images.unsplash.com/photo-1534238151781-c62af32c97a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80'
              alt='Auth banner'
            />
          </Col>
          <Col className='auth__form' xs={24} sm={24} md={24} lg={14}>
            <Typography>
              <Title>Tourcom Content Management System</Title>
              <Paragraph>
                ADDING INNOVATION TO TRAVEL BLOCKCHAIN BLOCKCHAIN-BASED TRAVEL
                PLATFORM CUSTOMIZES TO SATISFY EVERYONE’S TRAVEL NEEDS, TOURCOM
                BLOCKCHAIN
              </Paragraph>
              <Paragraph>
                After massive project practice and summaries, Ant Design, a
                design language for background applications, is refined by Ant
                UED Team, which aims to{" "}
                <Text strong>
                  uniform the user interface specs for internal background
                  projects, lower the unnecessary cost of design differences and
                  implementation and liberate the resources of design and
                  front-end development
                </Text>
                .
              </Paragraph>
              <Title level={2}>Guidelines and Resources</Title>
              <Paragraph>
                We supply a series of design principles, practical patterns and
                high quality design resources (<Text code>Sketch</Text> and{" "}
                <Text code>Axure</Text>), to help people create their product
                prototypes beautifully and efficiently.
              </Paragraph>
              <Paragraph>
                <ul>
                  <li>
                    <a href='/'>Principles</a>
                  </li>
                  <li>
                    <a href='/'>Patterns</a>
                  </li>
                  <li>
                    <a href='/'>Resource Download</a>
                  </li>
                </ul>
              </Paragraph>
            </Typography>
            <Form onSubmit={this.handleSubmit} className='login-form'>
              <Form.Item>
                {getFieldDecorator("email", {
                  rules: [{ required: true, message: "이메일을 입력하세요." }]
                })(
                  <Input
                    prefix={
                      <Icon type='mail' style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder='example@example.com'
                    size='large'
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator("password", {
                  rules: [{ required: true, message: "비빌번호를 입력하세요" }]
                })(
                  <Input
                    prefix={
                      <Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type='password'
                    placeholder='*******'
                    size='large'
                  />
                )}
              </Form.Item>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                >
                  로그인
                </Button>
                &nbsp;&nbsp;
                <Link to='/register'>회원가입</Link>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create({ name: "signInForm" })(SignIn);
