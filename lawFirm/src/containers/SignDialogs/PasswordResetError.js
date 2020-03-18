import React, { Component } from 'react';
import { ButtonW } from 'helpers/ui';
import { withTheme } from '@material-ui/core/styles';
import Logo from 'components/Logo';

class PasswordResetError extends Component {
  render() {
    const { handleRedirect } = this.props;
    return (
      <div className="app-login-main-content animated fadeInDown">
        <div className="app-logo-content d-flex align-items-center justify-content-center">
          <Logo />
        </div>
        <div className="app-login-content">
          <div className="app-login-header mb-4">
            <h1>
              {/* <IntlMessages id="appModule.login" /> */}
              비밀번호 재설정 오류
            </h1>
          </div>
          <div className="app-login-form">
            <dl margin="normal" className="mt-1 my-sm-3">
              <dt>비밀번호 찾기 링크가 24시간이 지나 만료되었거나,</dt>
              <dt>해당 식별코드가 일치하지 않습니다.</dt>
              <br />
              <dt>비밀번호 찾기를 다시 시도해 주세요.</dt>
            </dl>
            <div style={{ textAlign: 'right', marginTop: '1em' }}>
              <ButtonW name="로그인 화면으로 이동" option="4" handleClick={handleRedirect} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTheme(PasswordResetError);
