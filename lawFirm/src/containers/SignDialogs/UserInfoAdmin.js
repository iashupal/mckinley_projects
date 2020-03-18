import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import UserInfoForm from 'components/UserInfoForm';
import { ButtonW, DialogBtnBox, CheckboxW, BlankSpan } from 'helpers/ui';
import produce from 'immer';
import { NotificationManager } from 'react-notifications';
import { R, RU } from 'helpers/ramda';
import Checkbox from '@material-ui/core/Checkbox';
import { withTheme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import { PostCall } from 'helpers/ajax';
import PrivacyExplain from './PrivacyExplain';

const { checkUserInfoData, getErrObj } = RU;

const AUTH = 'Role.Legal.SuperAdmin'; // detail_auth
const ISUSE = 1; // detail_isUse

class UserInfoAdmin extends Component {
  state = {
    detail_loginID: '',
    detail_phone: '',
    detail_name_kor: '',
    detail_name_eng: '',
    detail_image: '',
    detail_pass: '',
    detail_pass2: '',
    detail_companyName_kor: '',
    detail_companyName_eng: '',
    openPrivacy: false,
    checkPrivacy: false,

    phone_phone_num: '',
    phone_recognitionUUID: '',
    phone_mobileVerifiedUUID: '',
  };

  // 홈페이지 가입버튼으로 링크 생성
  // ex) http://localhost:3002/#/signin?signupEmailAdmin=BA4583DDF83311E8BE2C0242AC150002
  async componentDidMount() {
    if (this.props.initEmail) {
      try {
        const result = await PostCall('/auth/checkInvitationEmail', {
          invitationUUID: this.props.initEmail,
        });
        const newEmail = result.data.data.emailHint;
        this.setState(
          produce(this.state, draft => {
            draft.detail_loginID = newEmail;
          }),
        );
      } catch (error) {
        const { eCode, type, code, message, data } = getErrObj(error, true);
        NotificationManager.info(message, '관리자 정보 등록(가입)이 불가 합니다.');
      }

      if (this.props.history) {
        this.props.history.push('/#/signin');
      }
    }
  }

  changeStateValue = obj => {
    this.setState(
      produce(this.state, draft => {
        draft[obj.name] = obj.value;
      }),
    );
  };

  changeStateValuePhone = obj => {
    this.setState(
      produce(this.state, draft => {
        if (obj.name === 'phone_num') {
          draft.phone_phone_num = obj.value;
        }
        if (obj.name === 'recognitionUUID') {
          draft.phone_recognitionUUID = obj.value;
        }
        if (obj.name === 'mobileVerifiedUUID') {
          draft.phone_mobileVerifiedUUID = obj.value;
        }
      }),
    );
  };

  save = async e => {
    const {
      checkPrivacy,
      detail_loginID,
      detail_name_kor,
      detail_name_eng,
      detail_image,
      detail_pass,
      detail_pass2,
      detail_companyName_kor,
      detail_companyName_eng,
      phone_phone_num, // Mobile 인증 관련
      phone_recognitionUUID, // Mobile 인증 관련
      phone_mobileVerifiedUUID, // Mobile 인증 관련
    } = this.state;

    if (!checkPrivacy) {
      NotificationManager.info('', '개인정보 취급방침에 동의 해 주시기 바랍니다.');
      return;
    }

    if (!phone_phone_num || !phone_recognitionUUID || !phone_mobileVerifiedUUID) {
      NotificationManager.info('', '휴대폰 번호 입력 및 인증을 진행해 주시기 바랍니다.');
      return;
    }

    const alertMsg = checkUserInfoData(
      {
        detail_loginID,
        detail_name_kor,
        detail_name_eng,
        detail_phone: phone_phone_num,
        detail_pass,
        detail_pass2,
      },
      true,
    );

    if (!detail_companyName_kor) {
      alertMsg.push('회사명(한글)');
    }

    if (alertMsg.length > 0) {
      NotificationManager.info(alertMsg.join(', '), '아래 값들을 확인해 주시기 바랍니다.');
      return;
    }

    const param = {
      invitationUUID: this.props.initEmail,
      recognitionUUID: phone_recognitionUUID, // Mobile 인증 관련
      mobileVerifiedUUID: phone_mobileVerifiedUUID, // Mobile 인증 관련
      mobilePhoneNumber: phone_phone_num, // Mobile 인증 관련
      loginID: detail_loginID,
      password: detail_pass,
      photoURL: detail_image,
      userNameList: [{ language: 'KOR', UserName: detail_name_kor }, { language: 'ENG', UserName: detail_name_eng }],
      companyNameList: [
        { language: 'KOR', CompanyName: detail_companyName_kor },
        { language: 'ENG', CompanyName: detail_companyName_eng },
      ],
    };

    try {
      const result = await PostCall('/auth/joinInvitationAdmin', param);
      const { token, user } = result.data;
      localStorage.setItem('token', token); // ajax call을 위한 특수 용도 (일반 유저 정보는 redux-auth 에서 사용!)
      localStorage.setItem('user', JSON.stringify(user));
      window.location = '/'; // token 로그인이 사용되도록 refresh ..
    } catch (error) {
      const { eCode, type, code, message, data } = getErrObj(error, true);
      NotificationManager.info(message, '관리자 정보 등록이 실패 했습니다.');
    }
  };

  render() {
    const { open } = this.props;
    const {
      detail_loginID,
      detail_phone,
      detail_name_kor,
      detail_name_eng,
      detail_image,
      detail_pass,
      detail_pass2,
      detail_companyName_kor,
      detail_companyName_eng,
    } = this.state;

    const { dark, main, light, contrastText } = this.props.theme.palette.primary;

    return (
      <React.Fragment>
        <Dialog open={open} fullWidth={false}>
          <DialogTitle style={{ backgroundColor: dark }}>
            <span style={{ color: contrastText }}>관리자 정보 등록</span>
          </DialogTitle>
          <DialogContent>
            <UserInfoForm
              dialogMode="signupEmailAdmin"
              handleChange={this.changeStateValue}
              detail_loginID={detail_loginID}
              detail_phone={detail_phone}
              detail_name_kor={detail_name_kor}
              detail_name_eng={detail_name_eng}
              detail_image={detail_image}
              detail_auth={AUTH}
              detail_isUse={ISUSE}
              detail_pass={detail_pass}
              detail_pass2={detail_pass2}
              detail_phoneCountry={82}
              detail_companyName_kor={detail_companyName_kor}
              detail_companyName_eng={detail_companyName_eng}
              invitationUUID={this.props.initEmail}
              changeStateValuePhone={this.changeStateValuePhone}
            />
          </DialogContent>
          <DialogBtnBox>
            <Divider />
            <div style={{ textAlign: 'left', paddingLeft: '10px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    checked={this.state.checkPrivacy}
                    onChange={e => {
                      if (!this.state.checkPrivacy) {
                        this.changeStateValue({
                          name: 'openPrivacy',
                          value: true,
                        });
                      } else {
                        this.changeStateValue({
                          name: 'checkPrivacy',
                          value: false,
                        });
                      }
                    }}
                    value="checkPrivacyCB"
                  />
                }
                label={<span style={{ fontWeight: 'bold', fontSize: '13px' }}>개인정보 취급 동의 (필수)</span>}
              />
            </div>
            <ButtonW name="Create" handleClick={this.save} option="4" />
          </DialogBtnBox>
        </Dialog>
        <PrivacyExplain
          open={this.state.openPrivacy}
          handleOK={e => {
            this.setState({
              ...this.state,
              checkPrivacy: true,
              openPrivacy: false,
            });
          }}
          handleNO={e => {
            this.setState({
              ...this.state,
              checkPrivacy: false,
              openPrivacy: false,
            });
          }}
        />
      </React.Fragment>
    );
  }
}

export default withTheme(UserInfoAdmin);
