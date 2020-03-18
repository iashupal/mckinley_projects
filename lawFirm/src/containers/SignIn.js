import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import IntlMessages from 'util/IntlMessages';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignIn,
  userSignInEmailLink,
  userTwitterSignIn,
  handleAuthChangeValues,
  handleAuthIPPhoneCode,
  handleAuthIPPhoneReSend,
} from 'actions/Default/Auth';
import { setReduxValues } from 'actions/Default/Common';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { BlankSpan } from 'helpers/ui';
import { R, RU } from 'helpers/ramda';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { demoLoginInfo } from 'helpers/data';
import ManualDialog from 'components/Header/ManualDialog';
import { PostCall } from 'helpers/ajax';
import { DemoLoginStyle } from 'helpers/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Logo from 'components/Logo';
import UserInfo from './SignDialogs/UserInfo';
import UserInfoAdmin from './SignDialogs/UserInfoAdmin';
import ForgotIDAndPassword from './SignDialogs/ForgotIDAndPassword';
import PasswordReset from './SignDialogs/PasswordReset';
import PasswordResetError from './SignDialogs/PasswordResetError';
import LawFirm from './SignDialogs/LawFirm';

const { parseQueryStr, mlMessage } = RU;

class SignIn extends React.Component {
  state = {
    email: '', // jwchoi2@humaxdigital.com
    password: '', // 1111
    testLoginValue: 1,
    checkRememberEmail: false,
  };

  componentDidMount() {
    const {
      email: qsEmail,
      uuid: qsUUID, // IP 이메일 인증 용
      pwdReset,
    } = this.props.queryString;

    if (qsEmail || qsUUID) {
      this.props.history.push('/#/signin');
      this.props.showAuthLoader();
      this.props.userSignInEmailLink({ qsEmail, qsUUID });
    }

    if (this.props.isDemoMode) {
      const id = 1;
      const { email, password } = R.find(R.propEq('id', id))(demoLoginInfo).value;
      this.setState({
        email,
        password,
        testLoginValue: id,
      });
    }

    if (pwdReset) {
      // 링크 24시간 유효성 검사
      this.checkCPUUIDValidation(pwdReset);
    }

    this.handleGetRememberEmail();
  }

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    }
    if (this.props.authUser !== null) {
      this.props.history.push('/');
    }

    // 이메일 기억하기 해제
    if (!this.state.checkRememberEmail) {
      localStorage.removeItem('remember');
    }
  }

  handleFindPwdIDOpen = () => {
    this.props.history.push({
      pathname: '/signin',
      search: '?findPwdID=open',
    });
  };

  // 아이디/비밀번호 찾기 창 닫기
  handleClose = () => {
    // this.props.history.push('/#/signin');
    this.props.history.push({
      pathname: '/signin',
      search: '',
    });
  };

  // 비밀번호 재설정 창, 비밀번호 재설정 에러 창 닫기 (query string 초기화가 안되는 현상이 발생해 redirect로 해결)
  handleRedirect = () => {
    const redirectURL = window.location.href.split('?')[0].split('#')[0]; // query string 제거
    window.location.replace(redirectURL);
  };

  // 비밀번호 재설정 링크 24시간 유효성 체크
  checkCPUUIDValidation = async pwdResetUUID => {
    const result = await PostCall('/auth/checkCPUUIDValidation', { pwdResetUUID });
    if (result.data) {
      // 24시간이 지난 링크 (에러 페이지 이동)
      this.props.history.push({
        pathname: '/signin',
        search: '?pwdResetErrorQ=open',
      });
    }
  };

  // 이메일 기억하기
  handleSetRememberEmail = () => {
    const { email, checkRememberEmail } = this.state;
    if (checkRememberEmail) {
      localStorage.setItem('remember', email);
    } else {
      localStorage.removeItem('remember');
    }
  };

  // 이메일 불러오기
  handleGetRememberEmail = () => {
    const rememberEmail = localStorage.getItem('remember');
    if (rememberEmail) {
      this.setState({
        email: rememberEmail,
        checkRememberEmail: true,
      });
    }
  };

  render() {
    const { email, password } = this.state;
    const {
      showMessage,
      loader,
      alertMessage,
      isOpenIP_Phone,
      isOpenIP_Email,
      ipInfo_email,
      ipInfo_ip,
      ipInfo_phone,
      ipInfo_phone_expired,
      ipInfo_input_code,
      ipInfo_recognitionUUID,
      handleAuthChangeValues,
      handleAuthIPPhoneCode,
      handleAuthIPPhoneReSend,
      setReduxValues,
    } = this.props;

    const {
      signupEmailLawFirm, // 법무법인의 최초 로그인 용 링크
      findPwdID, // 아이디/비밀번호 찾기 용 링크
      pwdReset, // 메일로 송신된 비밀번호 재설정 용 링크
      pwdResetErrorQ, // 비밀번호 재설정 에러 용 링크
    } = this.props.queryString;

    return (
      // <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">

      <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        {!!findPwdID && <ForgotIDAndPassword handleClose={this.handleClose} />}
        {!!pwdReset && <PasswordReset pwdResetUUID={pwdReset} handleRedirect={this.handleRedirect} />}
        {!!pwdResetErrorQ && (
          <PasswordResetError handleFindPwdIDOpen={this.handleFindPwdIDOpen} handleRedirect={this.handleRedirect} />
        )}
        {!findPwdID && !pwdReset && !pwdResetErrorQ && (
          <div className="app-login-main-content animated fadeInUp">
            <div className="app-logo-content d-flex align-items-center justify-content-center">
              <Logo />
            </div>

            <div className="app-login-content">
              <div className="app-login-header mb-4">
                <h1>
                  <IntlMessages id="appModule.login" />
                  <br />
                  법무 법인 사용자
                </h1>
              </div>
              <div className="app-login-form">
                <form>
                  <fieldset>
                    {this.props.isDemoMode && (
                      <div style={DemoLoginStyle}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span style={{ fontWeight: 'bold' }}>DEMO 계정 : </span>
                          <div>
                            <Button
                              onClick={() => {
                                setReduxValues({ isDemoMode: false });
                              }}
                              color="primary"
                            >
                              <i className="zmdi zmdi-close-circle-o zmdi-hc-lg" />
                            </Button>
                            <ManualDialog />
                          </div>
                        </div>
                        <BlankSpan num={1} />
                        <Select
                          value={this.state.testLoginValue}
                          onChange={e => {
                            const id = e.target.value;
                            const { email, password } = R.find(R.propEq('id', id))(demoLoginInfo).value;
                            this.setState({
                              email,
                              password,
                              testLoginValue: id,
                            });
                          }}
                        >
                          {demoLoginInfo &&
                            demoLoginInfo.map(i => (
                              <MenuItem value={i.id} key={i.text}>
                                {i.text}
                              </MenuItem>
                            ))}
                        </Select>
                      </div>
                    )}
                    <TextField
                      label={<IntlMessages id="appModule.email" />}
                      fullWidth
                      onChange={e => this.setState({ email: e.target.value })}
                      value={email}
                      disabled={this.props.isDemoMode}
                      margin="normal"
                      className="mt-1 my-sm-3"
                    />
                    <TextField
                      type="password"
                      label={<IntlMessages id="appModule.password" />}
                      fullWidth
                      onChange={e => this.setState({ password: e.target.value })}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          this.props.showAuthLoader();
                          this.props.userSignIn({ email, password });
                        }
                      }}
                      disabled={this.props.isDemoMode}
                      value={password}
                      margin="normal"
                      className="mt-1 my-sm-3"
                    />
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.checkRememberEmail}
                            onChange={e => this.setState({ checkRememberEmail: e.target.checked })}
                            value="checkRememberEmail"
                            color="primary"
                          />
                        }
                        label={mlMessage('appModule.rememberEmail')}
                      />
                    </FormGroup>
                    <div className="mb-3 d-flex align-items-center justify-content-between">
                      <Button
                        onClick={() => {
                          this.props.showAuthLoader();
                          this.props.userSignIn({ email, password });
                          this.handleSetRememberEmail();
                        }}
                        variant="contained"
                        color="primary"
                      >
                        <IntlMessages id="appModule.signIn" />
                      </Button>
                      <Button onClick={this.handleFindPwdIDOpen} variant="contained" color="primary">
                        {mlMessage('appModule.forgotEmailAndPassword')}
                      </Button>
                      {/* 
                          <Link to="/signup">
                          <IntlMessages id="signIn.signUp"/>
                          </Link> 
                      */}
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        )}

        {loader && (
          <div className="loader-view">
            <CircularProgress />
          </div>
        )}
        {showMessage && NotificationManager.error(alertMessage)}
        <NotificationContainer />
        <Dialog open={isOpenIP_Phone} maxWidth={false}>
          <DialogTitle>IP 인증</DialogTitle>
          <DialogContent>
            아래 계정/IP 에 대한 <span style={{ fontWeight: 'bold' }}>문자</span>, Email 인증이 필요 합니다.
            <br />
            <br />
            계정명 : {ipInfo_email}
            <br />
            IP : {ipInfo_ip}
            <br />
            <br />
            {ipInfo_phone} 로 인증번호(숫자6자리)가 발송 되었습니다. <br />
            입력해 주시기 바랍니다.
            <br />
            <TextField
              label={`인증번호 (${`${parseInt(ipInfo_phone_expired / 60, 10)}`.length === 1 ? '0' : ''}${parseInt(
                ipInfo_phone_expired / 60,
                10,
              )}:${`${ipInfo_phone_expired % 60}`.length === 1 ? '0' : ''}${ipInfo_phone_expired % 60})`}
              onChange={e =>
                handleAuthChangeValues({
                  ipInfo_input_code: e.target.value,
                })
              }
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  handleAuthIPPhoneCode({
                    email,
                    password,
                    recognitionUUID: ipInfo_recognitionUUID,
                    code: ipInfo_input_code,
                  });
                }
              }}
              value={ipInfo_input_code}
              margin="normal"
              className="mt-1 my-sm-3"
              style={{ width: '120px' }}
              disabled={ipInfo_phone_expired === 0}
            />
            <BlankSpan num={2} />
            <Button
              onClick={() => {
                handleAuthIPPhoneCode({
                  email,
                  password,
                  recognitionUUID: ipInfo_recognitionUUID,
                  code: ipInfo_input_code,
                });
              }}
              variant="contained"
              color="primary"
              disabled={ipInfo_phone_expired === 0}
            >
              입력
            </Button>
            <BlankSpan num={2} />
            <Button
              onClick={() => {
                handleAuthIPPhoneReSend({
                  email,
                  password,
                });
              }}
              variant="contained"
              color="secondary"
            >
              재발송
            </Button>
            <br />
          </DialogContent>
        </Dialog>
        <Dialog open={isOpenIP_Email} maxWidth={false}>
          <DialogTitle>IP 인증</DialogTitle>
          <DialogContent>
            아래 계정/IP 에 대한 <span style={{ fontWeight: 'bold' }}>Email</span> 인증이 필요 합니다.
            <br />
            <br />
            계정명 : {ipInfo_email}
            <br />
            IP : {ipInfo_ip}
            <br />
            <br />
            {ipInfo_email} 로 인증 메일이 발송 되었습니다. <br />
            해당 메일을 확인 하시고,{' '}
            <span style={{ fontWeight: 'bold' }}>메일 하단 링크를 통해 재접속해 주시기 바랍니다.</span>
            <br />
          </DialogContent>
        </Dialog>
        {/* <UserInfoAdmin open={!!signupEmailAdmin} initEmail={signupEmailAdmin} /> */}
        <LawFirm open={!!signupEmailLawFirm} initEmail={signupEmailLawFirm} />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, router, common }) => {
  const {
    loader,
    alertMessage,
    showMessage,
    authUser,
    isOpenIP_Phone,
    isOpenIP_Email,
    ipInfo_email,
    ipInfo_ip,
    ipInfo_phone,
    ipInfo_phone_expired,
    ipInfo_email_expired,
    ipInfo_input_code,
    ipInfo_recognitionUUID,
  } = auth;
  const { isDemoMode } = common;
  const queryString = parseQueryStr(router.location.search);

  return {
    loader,
    alertMessage,
    showMessage,
    authUser,
    isOpenIP_Phone,
    isOpenIP_Email,
    queryString,
    ipInfo_email,
    ipInfo_ip,
    ipInfo_phone,
    ipInfo_phone_expired,
    ipInfo_email_expired,
    ipInfo_input_code,
    ipInfo_recognitionUUID,
    isDemoMode,
  };
};

export default connect(
  mapStateToProps,
  {
    userSignIn,
    userSignInEmailLink,
    hideMessage,
    showAuthLoader,
    userFacebookSignIn,
    userGoogleSignIn,
    userGithubSignIn,
    userTwitterSignIn,
    handleAuthChangeValues,
    handleAuthIPPhoneCode,
    handleAuthIPPhoneReSend,
    setReduxValues,
  },
)(SignIn);
