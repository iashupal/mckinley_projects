import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { ButtonW } from 'helpers/ui';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { PostCall } from 'helpers/ajax';
import produce from 'immer';

const container = {
  width: '100%',
  height: '100%',
  margin: '1em auto',
};
const outer = {
  display: 'table',
  width: '100%',
  height: '100%',
};
const inner = {
  display: 'table-cell',
  verticalAlign: 'middle',
  textAlign: 'center',
};
const centered = {
  position: 'relative',
  display: 'inline-block',
  width: '85%',
  paddingTop: '1em',
  paddingBottom: '1em',
};
const buttonMargin = {
  marginTop: '1em',
  marginBottom: '1em',
};

const TabContainer = ({ children }) => {
  return (
    <Typography component="div" style={{ padding: '0.5em' }}>
      {children}
    </Typography>
  );
};

class ForgotIDAndPassword extends Component {
  state = {
    // tab
    tabValue: 0,
    idScreenNo: 0,
    pwScreenNo: 0,

    // 아이디 찾기
    name: '', // 사용자 이름
    mobilePhoneNumber: '', // 사용자 핸드폰 번호
    userIdResult: '', // 사용자 아이디 (아이디 찾기 결과 값)
    phoneCheckButtonDisabled: true, // 핸드폰번호 입력 값 형식 체크 후 버튼 disabled or abled
    phoneCheckString: '', // 핸드폰번호 입력 값 형식 체크 후 결과 문자열
    phoneCheckStringColor: '', // 핸드폰 번호 체크 문자열 색깔

    // 비밀번호 찾기
    userIdInput: '', // 사용자 아이디 (비밀번호 찾기 입력 값)
    emailCheckButtonDisabled: true, // 이메일 입력 값 형식 체크 후 버튼 disabled or abled
    emailCheckString: '', // 이메일 입력 값 형식 체크 후 결과 문자열
    emailCheckStringColor: '', // 이메일 체크 문자열 색깔
  };

  handleChange = async e => {
    await this.setState(
      produce(this.state, draft => {
        draft[e.target.name] = e.target.value;
      }),
    );
    // 유효성 검사
    this.isCellPhone();
    this.isEmail();
  };

  handleChangeTabValue = (event, tabValue) => {
    this.setState(
      produce(this.state, draft => {
        draft.tabValue = tabValue;
        draft.idScreenNo = 0;
        draft.pwScreenNo = 0;
      }),
    );
  };

  // 아이디 찾기 결과 값 받기
  setUserIdResult = async () => {
    const { name, mobilePhoneNumber } = this.state;
    const result = await PostCall('/auth/checkMyLoginID', { name, mobilePhoneNumber });
    const d = result.data;

    this.setState(
      produce(this.state, draft => {
        draft.userIdResult = d.length > 0 ? d[0].LoginID : '';
        draft.name = '';
        draft.mobilePhoneNumber = '';
        draft.idScreenNo = 1;
      }),
    );
  };

  // 비밀번호 재설정 이메일 전송
  sendResetEmail = async () => {
    const { userIdInput } = this.state;
    // E-mail이 가용하던 가용하지 않던, 해당 프로세스는 성공으로 회신받기에 따로 에러처리 하지 않음
    await PostCall('/auth/requestPasswordChangeEmail', { email: userIdInput });
    this.setState(
      produce(this.state, draft => {
        draft.pwScreenNo = 1;
      }),
    );
  };

  // 핸드폰번호 형식 유효성 체크
  isCellPhone = () => {
    const { name, mobilePhoneNumber } = this.state;

    // 핸드폰번호 정규식
    const regExpPhone = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    this.setState(
      produce(this.state, draft => {
        if (!name || !mobilePhoneNumber) {
          draft.phoneCheckString = '';
          draft.phoneCheckButtonDisabled = true;
        } else if (!regExpPhone.test(mobilePhoneNumber)) {
          draft.phoneCheckString = '잘못된 휴대폰 번호입니다. - 를 포함한 숫자만 입력하세요.';
          draft.phoneCheckStringColor = 'red';
          draft.phoneCheckButtonDisabled = true;
        } else {
          draft.phoneCheckString = '';
          draft.phoneCheckButtonDisabled = false;
        }
      }),
    );
  };

  // 이메일 형식 유효성 체크
  isEmail = () => {
    const { userIdInput } = this.state;

    // 이메일 정규식
    const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    this.setState(
      produce(this.state, draft => {
        if (!userIdInput) {
          draft.emailCheckString = '';
          draft.emailCheckButtonDisabled = true;
        } else if (!regExpEmail.test(userIdInput)) {
          draft.emailCheckString = '잘못된 이메일 형식입니다. @ 를 포함한 문자열만 입력하세요.';
          draft.emailCheckStringColor = 'red';
          draft.emailCheckButtonDisabled = true;
        } else {
          draft.emailCheckString = '';
          draft.emailCheckButtonDisabled = false;
        }
      }),
    );
  };

  render() {
    const { handleClose } = this.props;
    const {
      tabValue,
      idScreenNo,
      userIdResult,
      pwScreenNo,
      phoneCheckButtonDisabled,
      phoneCheckString,
      phoneCheckStringColor,
      emailCheckButtonDisabled,
      emailCheckString,
      emailCheckStringColor,
    } = this.state;

    return (
      <div className="app-login-main-content animated fadeInDown">
        <AppBar position="static" color="default">
          <Tabs
            value={tabValue}
            onChange={this.handleChangeTabValue}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Find email" />
            <Tab label="Find password" />
          </Tabs>
        </AppBar>
        <SwipeableViews index={tabValue}>
          <TabContainer>
            {idScreenNo === 0 && (
              <div style={container}>
                <div style={outer}>
                  <div style={inner}>
                    <div style={centered}>
                      <TextField
                        margin="dense"
                        id="name"
                        label="Enter your name"
                        name="name"
                        type="text"
                        onChange={this.handleChange}
                        autoFocus
                        style={{
                          width: '80%',
                        }}
                      />
                      <TextField
                        margin="dense"
                        id="phone"
                        label="Enter your phone number, ex)010-xxxx-xxxx"
                        name="mobilePhoneNumber"
                        type="text"
                        onChange={this.handleChange}
                        style={{
                          width: '80%',
                        }}
                      />
                      {phoneCheckString && (
                        <p style={{ textAlign: 'center', color: phoneCheckStringColor }}>{phoneCheckString}</p>
                      )}
                      <div style={buttonMargin}>
                        <ButtonW
                          name="확인"
                          handleClick={e => {
                            this.setUserIdResult();
                          }}
                          option="4"
                          disabled={phoneCheckButtonDisabled}
                        />
                        <ButtonW
                          name="취소"
                          handleClick={e => {
                            this.props.handleClose();
                          }}
                          option="2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {idScreenNo === 1 && (
              <div style={container}>
                <div style={outer}>
                  <div style={inner}>
                    <div style={centered}>
                      <dl>
                        {userIdResult && (
                          <React.Fragment>
                            <dt style={{ fontSize: '1.5em' }}>{userIdResult} 입니다.</dt>
                            <br /> <br />
                            <dt>여전히 귀하의 계정이 확인되지 않을 경우, </dt>
                            <dt>회사 시스템 담당자에게 문의바랍니다.</dt>
                          </React.Fragment>
                        )}
                        {!userIdResult && (
                          <React.Fragment>
                            <dt style={{ fontSize: '1.5em' }}>등록된 ID를 찾을 수 없습니다.</dt>
                            <br /> <br />
                            <dt>여전히 귀하의 계정이 확인되지 않을 경우, </dt>
                            <dt>회사 시스템 담당자에게 문의바랍니다.</dt>
                          </React.Fragment>
                        )}
                      </dl>
                      <div style={buttonMargin}>
                        <ButtonW
                          name="취소"
                          handleClick={e => {
                            handleClose();
                            setTimeout(() => {
                              this.setState(
                                produce(this.state, draft => {
                                  draft.idScreenNo = 0;
                                  draft.pwScreenNo = 0;
                                }),
                              );
                            }, 100);
                          }}
                          option="2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabContainer>
          <TabContainer>
            {pwScreenNo === 0 && (
              <div style={container}>
                <div style={outer}>
                  <div style={inner}>
                    <div style={centered}>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="userId"
                        label="Enter your Email"
                        name="userIdInput"
                        type="text"
                        onChange={this.handleChange}
                        style={{
                          width: '80%',
                          marginTop: '0px',
                        }}
                      />
                      {emailCheckString && (
                        <p style={{ textAlign: 'center', color: emailCheckStringColor }}>{emailCheckString}</p>
                      )}
                      <div style={buttonMargin}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={e => {
                            this.sendResetEmail();
                          }}
                          style={{
                            width: '80%',
                          }}
                          disabled={emailCheckButtonDisabled}
                        >
                          비밀번호 재설정 이메일 받기
                        </Button>
                      </div>
                      <dl>
                        <dt>비밀번호 재설정 안내가 이메일로 전송됩니다.</dt>
                        <dt>전자 메일을 받지 못한 경우 정크 메일 폴더를 확인하십시오.</dt>
                        <dt>
                          여전히 로그인하는 데 문제가 있습니까?{' '}
                          <a href="https://www.cloudlawai.com/center/contact.html" target="_blank">
                            저희에게 연락하십시오.
                          </a>
                        </dt>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {pwScreenNo === 1 && (
              <div style={container}>
                <div style={outer}>
                  <div style={inner}>
                    <div style={centered}>
                      <dl>
                        <dt>입력 한 사용자 이름이 유효하면</dt>
                        <dt>암호 재설정 지침이 포함 된 이메일을 보조 이메일 주소로 보내드립니다.</dt>
                        <br /> <br />
                        <dt>이 전자 메일을 받지 못한 경우 정크 메일 폴더를 확인하거나</dt>
                        <dt>
                          <a href="https://www.cloudlawai.com/center/contact.html" target="_blank">
                            도움말 페이지
                          </a>
                          를 방문하여 추가 지원을 받으십시오.
                        </dt>
                      </dl>
                      <div style={buttonMargin}>
                        <ButtonW
                          name="취소"
                          handleClick={e => {
                            handleClose();
                            setTimeout(() => {
                              this.setState(
                                produce(this.state, draft => {
                                  draft.idScreenNo = 0;
                                  draft.pwScreenNo = 0;
                                }),
                              );
                            }, 100);
                          }}
                          option="2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

export default withTheme(ForgotIDAndPassword);
