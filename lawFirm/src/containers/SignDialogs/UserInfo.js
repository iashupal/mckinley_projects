import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import UserInfoForm from 'components/UserInfoForm';
import { ButtonW, DialogBtnBox, CheckboxW, BlankSpan } from 'helpers/ui';
import produce from 'immer';
import { NotificationManager } from 'react-notifications';
import { R, RU } from 'helpers/ramda';
import { PostCall } from 'helpers/ajax';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PrivacyExplain from './PrivacyExplain';

const { checkUserInfoData, getErrObj } = RU;

class UserInfo extends Component {
  state = {
    detail_loginID: '',
    detail_phone: '',
    detail_name_kor: '',
    detail_name_eng: '',
    detail_image: '',
    detail_pass: '',
    detail_pass2: '',
    detail_auth: 'GENERAL',
    detail_isUse: 1,
    openPrivacy: false,
    checkPrivacy: false,
  };

  // 관리자가 초대형식 유저 추가시 발송됨
  // ex) http://localhost:3002/#/signin?signupUserID=C5AFE312F9E211E8BE2C0242AC150002
  async componentDidMount() {
    if (this.props.initUserID) {
      try {
        const result = await PostCall('/auth/checkInvitationEmail', {
          invitationUUID: this.props.initUserID,
        });
        const newEmail = result.data.data.emailHint;
        this.setState(
          produce(this.state, draft => {
            draft.detail_loginID = newEmail;
          }),
        );
      } catch (error) {
        const { eCode, type, code, message, data } = getErrObj(error, true);
        NotificationManager.info(message, '사용자 정보 등록(가입)이 불가 합니다.');
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

  save = async e => {
    if (!this.state.checkPrivacy) {
      NotificationManager.info('', '개인정보 취급방침에 동의 해 주시기 바랍니다.');
      return;
    }

    const {
      detail_loginID,
      detail_name_kor,
      detail_name_eng,
      detail_phone,
      detail_image,
      detail_pass,
      detail_pass2,
      detail_auth,
      detail_isUse,
    } = this.state;

    const alertMsg = checkUserInfoData(
      {
        detail_loginID,
        detail_name_kor,
        detail_name_eng,
        detail_phone,
        detail_pass,
        detail_pass2,
      },
      true,
    );

    if (alertMsg.length > 0) {
      NotificationManager.info(alertMsg.join(', '), '아래 값들을 확인해 주시기 바랍니다.');
      return;
    }

    const param = {
      invitationUUID: this.props.initUserID,
      loginID: detail_loginID,
      password: detail_pass,
      mobilePhoneNumber: detail_phone,
      photoURL: detail_image,
      userNameList: [{ language: 'KOR', UserName: detail_name_kor }, { language: 'ENG', UserName: detail_name_eng }],
    };

    try {
      const result = await PostCall('/auth/joinInvitationUser', param);
      const { token, user } = result.data;
      localStorage.setItem('token', token); // ajax call을 위한 특수 용도 (일반 유저 정보는 redux-auth 에서 사용!)
      localStorage.setItem('user', JSON.stringify(user));
      window.location = '/'; // token 로그인이 사용되도록 refresh ..
    } catch (error) {
      const { eCode, type, code, message, data } = getErrObj(error, true);
      NotificationManager.info(message, '사용자 정보 등록에 실패 했습니다.');
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
      detail_auth,
      detail_isUse,
    } = this.state;

    const { dark, main, light, contrastText } = this.props.theme.palette.primary;

    return (
      <React.Fragment>
        <Dialog open={open} fullWidth={false}>
          <DialogTitle style={{ backgroundColor: dark }}>
            <span style={{ color: contrastText }}>사용자 정보 등록</span>
          </DialogTitle>
          <DialogContent>
            <UserInfoForm
              dialogMode="signupEmail"
              handleChange={this.changeStateValue}
              detail_loginID={detail_loginID}
              detail_phone={detail_phone}
              detail_name_kor={detail_name_kor}
              detail_name_eng={detail_name_eng}
              detail_image={detail_image}
              detail_auth={detail_auth}
              detail_isUse={detail_isUse}
              detail_pass={detail_pass}
              detail_pass2={detail_pass2}
              detail_phoneCountry={82}
            />
          </DialogContent>
          <DialogBtnBox>
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
            <ButtonW name="Save" handleClick={this.save} option="4" />
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

export default withTheme(UserInfo);
