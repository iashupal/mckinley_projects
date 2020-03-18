import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Head from 'next/head';
import SideModal from './SideModal';
import axios from './axios';
import '../styles/join.css';
import '../styles/header.css';

import {
 ToastContainer, toast, Bounce, Slide, Flip, Zoom 
} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

class Header extends React.Component {
  state = {
    toggleMenu: false,
    showLoginModal: false,
    showJoinModal: false,
    showForgotModal: false,
    emailForgot: '',
    email: '',
    password: '',

    /** register state */
    registerFirstName: '',
    registerLastName: '',
    registerEmail: '',
    registerConfirmPassword: '',
    registerPassword: '',
    submitLoading: false,
    auth: false,
    apiToken: '',
    loginEmail: '',
    loginPassword: '',
  };

  componentDidMount() {
    const authLocal = localStorage.getItem('auth');
    const apiTokenLocal = localStorage.getItem('apiToken');
    let auth = '';
    if (authLocal === '') {
      auth = false;
    } else if (authLocal === 'false') {
      auth = false;
    } else if (authLocal === 'true') {
      auth = true;
    } else {
      auth = false;
    }

    if (apiTokenLocal === '') {
      auth = false;
    }

    this.setState({
      auth,
      apiToken: apiTokenLocal,
    });
  }

  toastify = (message, type, duration = 5000) => toast(message, {
      transition: Bounce,
      closeButton: true,
      autoClose: duration,
      position: 'bottom-center',
      type,
      className: 'toastify',
    });

  toggle = () => {
    this.setState({
      toggleMenu: !this.state.toggleMenu,
    });
  };

  openLoginModal = (e, param = '') => {
    e.preventDefault();
    if (param === 'already') {
      this.setState({
        showLoginModal: !this.state.showLoginModal,
        showJoinModal: !this.state.showJoinModal,
        submitLoading: false,
      });
    } else {
      this.setState({
        showLoginModal: !this.state.showLoginModal,
        submitLoading: false,
      });
    }
  };

  openJoinModal = (e) => {
    e.preventDefault();
    this.setState({
      showJoinModal: !this.state.showJoinModal,
      submitLoading: false,
    });
  };

  closeLoginModal = (e) => {
    e.preventDefault();
    this.setState({
      showLoginModal: !this.state.showLoginModal,
    });
  };

  openForgotModal = (e) => {
    e.preventDefault();
    this.setState({
      showForgotModal: !this.state.showForgotModal,
      showLoginModal: !this.state.showLoginModal,
      submitLoading: false,
    });
  };

  closeForgotModal = (e) => {
    e.preventDefault();
    this.setState({
      showForgotModal: !this.state.showForgotModal,
    });
  };

  closeJoinModal = () => {
    console.log(this.state.showJoinModal);
    this.setState({
      showJoinModal: !this.state.showJoinModal,
    });
  };

  handleSubmit = () => {
    if (this.state.email === '' || this.state.password === '') {
      alert('Please Fill All Fields');
    }
  };

  setRegisterFirstNameHandler = (e) => {
    if (e.target.value === ' ') {
      return;
    }

    this.setState({ registerFirstName: e.target.value });
  };

  setRegisterLastNameHandler = (e) => {
    if (e.target.value === ' ') {
      return;
    }

    this.setState({ registerLastName: e.target.value });
  };

  setRegisterEmailHandler = (e) => {
    if (e.target.value === ' ') {
      return;
    }

    this.setState({ registerEmail: e.target.value });
  };

  setRegisterPasswordHandler = (e) => {
    if (e.target.value === ' ') {
      return;
    }

    this.setState({ registerPassword: e.target.value });
  };

  setRegisterConfirmPasswordHandler = (e) => {
    if (e.target.value === ' ') {
      return;
    }

    this.setState({ registerConfirmPassword: e.target.value });
  };

  registerHandler = () => {
    const {
 registerFirstName, registerLastName, registerEmail, registerPassword, registerConfirmPassword 
} = this.state;

    if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(registerEmail)) {
      alert('Please enter a valid email.');
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      alert('Passwords are not same!');
      return;
    }

    if (
      registerFirstName === ''
      || registerLastName === ''
      || registerEmail === ''
      || registerPassword === ''
      || registerConfirmPassword === ''
    ) {
      alert('Please fill all fields!');
      return;
    }

    if (registerPassword.length < 8) {
      alert('Password must be 8 characters long.');
      return;
    }

    if (!/[a-z]/.test(registerPassword)) {
      alert('Password must contain a lowercase character.');
      return;
    }

    if (!/[A-Z]/.test(registerPassword)) {
      alert('Password must contain an uppercase character.');
      return;
    }

    if (!/[0-9]/.test(registerPassword)) {
      alert('Password must contain atleast one digit.');
      return;
    }

    const data = {
      firstName: registerFirstName,
      lastName: registerLastName,
      email: registerEmail,
      password: registerPassword,
      confirmPassword: registerConfirmPassword,
    };

    this.setState({ submitLoading: true });

    axios
      .post('/register', data)
      .then((response) => {
        const token = response.data.Body;
        localStorage.setItem('apiToken', token);
        localStorage.setItem('auth', true);
        this.setState({
          submitLoading: false,
          auth: true,
          apiToken: token,
          showJoinModal: !this.state.showJoinModal,
        });
      })
      .catch((err) => {
        const errMessage = err.response.data.Body;
        if (err.response.status === 500) {
          this.toastify('Server Error. Please try again later!', 'error', 1500);
          this.setState({
            submitLoading: false,
          });
          return;
        }
        if (errMessage === 'EMAIL_ALREADY_REGISTERED') {
          this.toastify('Email already registered!', 'error', 1500);
          this.setState({
            submitLoading: false,
          });
          return;
        }

        this.setState({
          submitLoading: false,
        });
      });
  };

  logoutHandler = async () => {
    await localStorage.setItem('apiToken', '');
    await localStorage.setItem('auth', false);
    this.setState({
      auth: false,
      apiToken: '',
    });
  };

  setLoginEmail = (e) => {
    if (e.target.value === ' ') {
      return;
    }

    this.setState({ loginEmail: e.target.value });
  };

  setLoginPassword = (e) => {
    if (e.target.value === ' ') {
      return;
    }

    this.setState({ loginPassword: e.target.value });
  };

  loginSubmit = () => {
    const { loginEmail, loginPassword } = this.state;

    if (loginPassword === '' || loginEmail === '') {
      alert('Please fill all fields!');
      return;
    }

    if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(loginEmail)) {
      alert('Please enter a valid Email.');
      return;
    }

    const data = {
      email: loginEmail,
      password: loginPassword,
    };
    this.setState({ submitLoading: true });

    axios
      .post('/login', data)
      .then((response) => {
        const token = response.data.Body;
        localStorage.setItem('apiToken', token);
        localStorage.setItem('auth', true);
        this.setState({
          submitLoading: false,
          auth: true,
          apiToken: token,
          showLoginModal: !this.state.showLoginModal,
        });
      })
      .catch((err) => {
        const errMessage = err.response.data.Body;
        if (err.response.status === 500) {
          this.toastify('Server Error. Please try again later!', 'error', 1500);
          this.setState({
            submitLoading: false,
          });
          return;
        }
        if (errMessage === 'EMAIL_NOT_FOUND') {
          this.toastify('Email Not Found!', 'error', 1500);
          this.setState({
            submitLoading: false,
          });
          return;
        }
        if (errMessage === 'INCORRECT_PASSWORD') {
          this.toastify('Password Incorrect!', 'error', 1500);
          this.setState({
            submitLoading: false,
          });
        } else {
          this.setState({
            submitLoading: false,
          });
        }
      });
  };

  render() {
    return (
      <Fragment>
        <header className="header">
          <Head>
            <link rel="shortcut icon" href="static/images/logo/favicon.png" />
          </Head>
          <div className="headerBrand">
            <Link href="/">
              <a>
                <img src="../static/images/logo/outliers-logo.png" />
              </a>
            </Link>
          </div>
          <div className={`headerLinks ${this.state.toggleMenu ? 'showMenu' : ''}`}>
            {this.state.auth ? (
              <ul>
                <li>
                  <Link href="/events">
                    <a>Offline Events</a>
                  </Link>
                </li>
                <li>
                  <a onClick={this.logoutHandler}>Logout</a>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  {/* <a href="https://docs.google.com/forms/d/e/1FAIpQLSdLqoIlTWsTvumeFw_1gOP6BZc1Qo16pzxg_TaDVjvAFu9FfA/viewform">Early Join</a> */}
                  <a href="/login">Early Join</a>
                </li>
                {/* <li>
                  <Link href="/events">
                    <a>Offline Events</a>
                  </Link>
                </li> */}
              </ul>
            )}
          </div>
          <div className="burger" onClick={this.toggle}>
            <div className="line1" />
            <div className="line2" />
            <div className="line3" />
          </div>

          <SideModal title="" show={this.state.showLoginModal} onExit={this.closeLoginModal}>
            <h1>Login</h1>
            <div className="registrationSection">
              <div className="formContent">
                <div className="formContainer">
                  <div className="formContent">
                    <div className="formContentFields">
                      <label htmlFor="loginEmail">Email Address</label>
                      <input
                        type="email"
                        placeholder="Email"
                        onChange={this.setLoginEmail}
                        value={this.state.loginEmail}
                        name="loginEmail"
                        id="loginEmail"
                      />
                    </div>
                  </div>

                  <div className="formContent">
                    <div className="formContentFields">
                      <label htmlFor="loginPassword">Password</label>
                      <input
                        type="password"
                        placeholder="password"
                        onChange={this.setLoginPassword}
                        value={this.state.loginPassword}
                        name="loginPassword"
                        id="loginPassword"
                      />
                    </div>
                  </div>

                  <div className="formContentButton">
                    <button type="submit" onClick={this.loginSubmit} className="submit-button">
                      {this.state.submitLoading ? 'Loading...' : 'Login'}
                    </button>
                    <span onClick={this.openForgotModal}>Forgot Password</span>
                  </div>
                </div>
              </div>
            </div>
          </SideModal>

          <SideModal title="" show={this.state.showForgotModal} onExit={this.closeForgotModal}>
            <h1>Forgot Password</h1>
            <div className="registrationSection">
              <div className="formContent">
                <div className="formContainer">
                  <div className="formContent">
                    <div className="formContentFields">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        placeholder="Email"
                        onChange={e => this.setState({ forgotEmail: e.target.value })}
                        value={this.state.forgotEmail}
                        name="email"
                        id="email"
                      />
                    </div>
                  </div>

                  <div className="formContentButton">
                    <button type="submit" className="submit-button">
                      Get Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SideModal>

          <SideModal title="" show={this.state.showJoinModal} onExit={this.closeJoinModal}>
            <h1>Create Account</h1>
            <div className="registrationSection">
              <div className="formContent">
                <div className="formContainer">
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSdLqoIlTWsTvumeFw_1gOP6BZc1Qo16pzxg_TaDVjvAFu9FfA/viewform?embedded=true"
                    width="100%"
                    height="982"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                  >
                    Loading…
                  </iframe>
                </div>
              </div>
            </div>
          </SideModal>
        </header>
        <ToastContainer />
      </Fragment>
    );
  }
}

// Header.propTypes = {
//     children: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
// };

export default Header;
