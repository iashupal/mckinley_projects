import React, { Fragment } from 'react';
import Footer from '../components/Footer';
import '../styles/join.css';
import Header from '../components/Header';
import axios from '../components/axios';
import {
  ToastContainer,
  toast,
  Bounce,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Join extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitLoading: false,
      auth: false,
      apiToken: '',
      loginEmail: '',
      loginPassword: '',
    };
  }

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

    if (
      !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        loginEmail,
      )
    ) {
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
        console.log('response', response);
        // const token = response.data.Body;
        localStorage.setItem('apiToken', response.data.Body);
        console.log("apiToken", response.data.Body);
        localStorage.setItem('auth', true);
        window.location.href = '/';
        this.setState({
          submitLoading: false,
          auth: true,
          apiToken: token,
        });
      })
      .catch((err) => {
        console.log(err);
        const errMessage = err.response.data.Body;
        if (err.response.status === 500) {
          this.toastify('Server Error. Please try again later!', 'error', 1500);
          this.setState({
            submitLoading: false,
          });
          return;
        } if (errMessage === 'EMAIL_NOT_FOUND') {
          this.toastify('Email Not Found!', 'error', 1500);
          this.setState({
            submitLoading: false,
          });
          return;
        } if (errMessage === 'INCORRECT_PASSWORD') {
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
        <Header />

        <div className="registrationSection">

          <div className="formContent">
            <h1>Login</h1>
            <div className="formContainer">

              <div className="formContent">
                <div className="formContentFields">
                  <label htmlFor="loginEmail">Email Address</label>
                  {/* <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} name="email" id="email" /> */}
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
                  {/* <label htmlFor="password">Password</label>
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} value={password} name="password" id="password" /> */}
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
                {/* <button type="submit" onClick={() => handleSubmit()} className="submit-button">Login</button> */}
                <button
                  type="submit"
                  onClick={this.loginSubmit}
                  className="submit-button"
                >
                  {this.state.submitLoading ? 'Loading...' : 'Login'}
                </button>
              </div>
            </div>

          </div>
        </div>


        <Footer />
      </Fragment>
    );
  }
}


export default Join;
