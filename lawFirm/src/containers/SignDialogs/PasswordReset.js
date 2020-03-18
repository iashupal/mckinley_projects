import React, { Component } from 'react';
import { ButtonW } from 'helpers/ui';
import produce from 'immer';
import { PostCall } from 'helpers/ajax';
import { withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Logo from 'components/Logo';

class PasswordReset extends Component {
  state = {
    password: '', // 비밀번호
    confirmPassword: '', // 비밀번호 확인
    passwordCheckString: '', // 비밀번호 입력 값 형식 체크 후 결과 문자열
    passwordCheckStringColor: '', // 비밀번호 체크 문자열 색깔,
    buttonDisabled: true, // 비밀번호 입력 값 형식 체크 후 버튼 disabled or abled
  };

  handleChange = async e => {
    await this.setState(
      produce(this.state, draft => {
        draft[e.target.name] = e.target.value;
      }),
    );
    this.handlePasswordCheck();
  };

  // 비밀번호 형식 유효성 체크
  handlePasswordCheck = () => {
    const { password, confirmPassword } = this.state;

    this.setState(
      produce(this.state, draft => {
        if (!confirmPassword) {
          draft.passwordCheckString = '';
          draft.buttonDisabled = true;
        } else if (password !== confirmPassword || password.length < 8) {
          draft.passwordCheckString = '비밀번호가 8자리 이하이거나 일치하지 않습니다.';
          draft.passwordCheckStringColor = 'red';
          draft.buttonDisabled = true;
        } else {
          draft.passwordCheckString = 'pawssword가 일치합니다.';
          draft.passwordCheckStringColor = 'blue';
          draft.buttonDisabled = false;
        }
      }),
    );
  };

  // 비밀번호 재설정
  handleSubmit = async () => {
    const { password } = this.state;
    const { pwdResetUUID, handleRedirect } = this.props;
    const result = await PostCall('/auth/changePassword', { pwdResetUUID, password });

    if (!result.data) {
      window.alert('비밀번호 변경되었습니다. 다시 로그인 해주세요');
    } else {
      // 링크가 만료되거나, UUID가 일치하지 않을 때 에러메시지 출력
      window.alert(result.data.message);
    }
    // window.location.replace(history.replaceState({}, null, window.location.pathname));
    handleRedirect();
  };

  render() {
    const { passwordCheckString, passwordCheckStringColor, buttonDisabled } = this.state;
    const { handleRedirect } = this.props;
    return (
      <div className="app-login-main-content animated fadeInDown">
        <div className="app-logo-content d-flex align-items-center justify-content-center">
          <Logo />
        </div>
        <div className="app-login-content">
          <div className="app-login-header mb-4">
            <h1>비밀번호 재설정</h1>
          </div>

          <div className="app-login-form">
            <TextField
              margin="dense"
              id="nPassword"
              label="New Password"
              name="password"
              type="password"
              onChange={this.handleChange}
              autoFocus
              fullWidth
            />
            <TextField
              margin="dense"
              id="cPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              onChange={this.handleChange}
              fullWidth
            />
            {passwordCheckString && (
              <p style={{ textAlign: 'left', color: passwordCheckStringColor }}>{passwordCheckString}</p>
            )}
            <div style={{ textAlign: 'right', marginTop: '1em' }}>
              <ButtonW name="저장" option="4" handleClick={this.handleSubmit} disabled={buttonDisabled} />
              <ButtonW name="취소" option="2" handleClick={handleRedirect} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTheme(PasswordReset);
