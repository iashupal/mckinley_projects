import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import LoginLeftImage from 'components/LoginLeftImage';
import Heading from 'components/Heading';
import Logo from 'components/Logo';
import Box from 'components/BoxOld';
import CheckBox from 'components/CheckBox';
import AlignBox from 'components/AlignBox';
import Button from 'components/Button';
import InputBox from 'components/InputBox';
import RegisterDialog from 'components/RegisterDialog';
import CreateUserTest from '../CreateUserTest';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    console.log('click');
    this.setState({ isOpen: true });
  }

  handleClose() {
    this.setState({ isOpen: false });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="app-wrapper">
        <div className={classes.login_wrapper}>
          <div className={classes.loginLeftContainer}>
            <LoginLeftImage image={require('../../../../assets/images/login_img.jpg')} />
            <div className={classes.loginLeftContent}>
              <Heading display="block" fontWeight="bold" color="black" fontSize="30px">
                CloudLaw
              </Heading>
              <Heading display="block" fontSize="26px">
                Heading
              </Heading>
            </div>
          </div>
          <div className={classes.loginRightContainer}>
            <div className={classes.loginRightWrapper}>
              <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                <Logo />
                <Box pt={6} pb={4}>
                  <Heading display="block" color="white" fontSize="24px">
                    Login
                  </Heading>
                </Box>
                <div className={classes.loginForm}>
                  <Heading color="black" display="block" fontSize="20px">
                    Login
                  </Heading>
                  <form>
                    <fieldset>
                      <Box mt={3} mb={2}>
                        <div style={{ position: 'relative' }}>
                          <i
                            className="material-icons"
                            style={{ position: 'absolute', left: '6px', top: '8px', zIndex: 1, color: '#B2AFB0' }}
                          >
                            account_circle
                          </i>
                          <div className="loginInputWrapper">
                            <InputBox
                              placeholder="우편발송"
                              name="text2"
                              backgroundColor="#E7EDFE"
                              borderRadius="0px"
                              padding="0 0 0 35px"
                            />
                          </div>
                        </div>
                      </Box>
                      <Box mt={2} mb={0.5}>
                        <div style={{ position: 'relative' }}>
                          <i
                            className="material-icons"
                            style={{ position: 'absolute', left: '6px', top: '8px', zIndex: 1, color: '#B2AFB0' }}
                          >
                            lock
                          </i>
                          <div className="loginInputWrapper">
                            <InputBox
                              placeholder="우편발송"
                              name="text2"
                              backgroundColor="#E7EDFE"
                              borderRadius="0px"
                              padding="0 0 0 35px"
                            />
                          </div>
                        </div>
                      </Box>
                      <AlignBox>
                        <CheckBox label="나의 Task" isCrossed onChange={value => console.log(value)} />
                      </AlignBox>
                      <Box mt={1} mb={5} ml={-0.5} mr={0.6}>
                        <Button size="large" color="warning" width="100%" borderRadius="0px">
                          Submit
                        </Button>
                      </Box>
                      <Box>
                        <span style={{ color: '#2196f3', cursor: 'pointer' }} onClick={this.handleOpen}>
                          Signup
                        </span>
                        {/* <Heading color="#2196f3" cursor="pointer" onClick={this.handleClick}>
                          Sign Up
                        </Heading> */}
                        &nbsp;<span style={{ color: '#2196f3' }}>|</span>
                        &nbsp; &nbsp;
                        {/* <Heading color="#2196f3" cursor="pointer">
                          Forget Id & Pwd
                        </Heading> */}
                        <span style={{ color: '#2196f3', cursor: 'pointer' }}>Forget Id & Pwd</span>
                      </Box>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <RegisterDialog
          fullWidth="100%"
          maxWidth="100%"
          padding="0 0"
          backgroundColor="transparent"
          open={this.state.isOpen}
        >
          {/* <CreateUserTest /> */}
          <div className={classes.createUserContainer}>
            <div className={classes.createUserCenterAlign}>
              <div style={{ display: 'table-cell', verticalAlign: 'middle', textAlign: 'center' }}>
                <Heading display="block" fontWeight="400" color="white" fontSize="32px">
                  CloudLaw
                </Heading>
                <Heading display="block" fontSize="32px" fontWeight="400" color="white">
                  Register yourself
                </Heading>
                <Box mt={3} mb={3}>
                  <div className="createInputWrapper">
                    <InputBox
                      placeholder="우편발송"
                      name="text2"
                      backgroundColor="white"
                      borderRadius="50px"
                      padding="0 0 0 35px"
                    />
                    <div style={{ position: 'absolute', top: 0, right: '-5px' }}>
                      <Button size="large" color="blue" width="100%" borderRadius="50px">
                        <Box pl={4} pr={4} pt={1.5} pb={1.4}>
                          Submit
                        </Box>
                      </Button>
                    </div>
                  </div>
                </Box>
                <Box mb={5}>
                  <Heading color="white" fontSize="16px">
                    Message
                  </Heading>
                </Box>
                <Box>
                  <span
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      cursor: 'pointer',
                      fontSize: '16px',
                      borderBottom: '1px solid white',
                    }}
                    onClick={this.handleClose}
                  >
                    로그인 하기
                  </span>
                </Box>
              </div>
            </div>
          </div>
        </RegisterDialog>
      </div>
    );
  }
}
const styles = theme => ({
  login_wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  loginLeftContainer: {
    position: 'relative',
  },
  loginLeftContent: {
    position: 'absolute',
    left: '70px',
    top: '90px',
    bottom: 0,
    right: 0,
  },
  loginRightContainer: {
    backgroundColor: '#358ee0',
  },
  loginRightWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'table',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '40px 0',
    },
  },
  loginForm: {
    backgroundColor: 'white',
    padding: 40,
    width: '50%',
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
  },
  createUserContainer: {
    padding: 30,
    minHeight: '100%',
  },
  createUserCenterAlign: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'table',
    width: '100%',
    height: '100%',
  },
});
export default withStyles(styles)(Test);
