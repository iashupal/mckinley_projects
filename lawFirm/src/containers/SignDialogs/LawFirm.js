import React, { Component } from 'react';
import { R, RU } from 'helpers/ramda';
import { withTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import DialogInfoForm from 'components/DialogInfoForm';
import Tab from 'components/Tab';
import Box from 'components/BoxOld';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogBtnBox } from 'helpers/ui';
import Button from 'components/Button';
import produce from 'immer';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { PostCall, getAjaxData, urlMaster } from 'helpers/ajax';
import LawFirmInfo from './LawFirmInfo';
import LawfirmUserInfo from './LawFirmUserInfo';

const { changeURL, mlMessage, getErrObj, imageURL_prefix } = RU;

class LawFirm extends Component {
  state = {
    tab: 0,
    alertDialog: false,
    LawFirmInfo: {
      photoURL: null,
      lawFirmBrand: '',
      representativeName: '',
      officePhoneNumber: '',
      faxNumber: '',
      email: '',
      corRegNumber: '',
      zipCode: '',
      address: '',
      detailAddress: '',
      webSiteURL: '',
      formData: {},
    },

    LawFirmUserInfo: {
      photoURL: null,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      mobilePhoneNumber: '',
      officePhoneNumber: '',
      zipCode: '',
      address: '',
      detailAddress: '',
      profile: null,
      formData: {},
    },
  };

  // 홈페이지 가입버튼으로 링크 생성
  // ex) http://localhost:3002/#/signin?signupEmailLawFirm=DC4BD1B9C7DB11E9B21A0242AC150002
  async componentDidMount() {
    const { initEmail } = this.props;

    if (initEmail) {
      try {
        const data = await PostCall('/auth/checkInvitationEmail', {
          InvitationUUID: initEmail,
        });

        const result = getAjaxData(data);

        if (result) {
          this.setState(
            produce(this.state, draft => {
              draft.LawFirmUserInfo.email = result[0].Email;
            }),
          );
        } else {
          // 해당 InvitationEmail 이 유효하지 않을 경우
          window.location = '#/signin';
        }
      } catch (error) {
        NotificationManager.info(message, '법무법인 등록(가입)이 불가 합니다.');
        throw error;
      }
    }
  }

  changeTab = tab => {
    this.setState({
      tab,
    });
  };

  handleChangeValues = data => {
    const { state, target, value } = data;

    this.setState(
      produce(this.state, draft => {
        draft[state][target] = value;
      }),
    );
  };

  checkInputData = () => {
    const { LawFirmInfo, LawFirmUserInfo } = this.state;

    const LawFirmalertMsg = [];
    const UserInfoalertMsg = [];

    // 이메일 정규식
    const regExpEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    const alertMsg = [];

    if (!regExpEmail.test(LawFirmInfo.email)) {
      alertMsg.push(mlMessage('pages.UserMng.emailCheck'));
    }

    if (!LawFirmInfo.lawFirmBrand) {
      LawFirmalertMsg.push('상호명');
    }
    if (!LawFirmInfo.representativeName) {
      LawFirmalertMsg.push('대표명');
    }
    if (!LawFirmInfo.email) {
      LawFirmalertMsg.push('Email');
    }
    if (!LawFirmUserInfo.firstName) {
      UserInfoalertMsg.push('이름');
    }
    if (!LawFirmUserInfo.lastName) {
      UserInfoalertMsg.push('성');
    }
    if (!LawFirmUserInfo.password) {
      UserInfoalertMsg.push('패스워드');
    }
    if (!LawFirmUserInfo.mobilePhoneNumber) {
      UserInfoalertMsg.push('핸드폰 번호');
    }

    // 필수값 체크
    if (LawFirmalertMsg.length > 0 || UserInfoalertMsg.length > 0) {
      if (LawFirmalertMsg.length > 0 && !UserInfoalertMsg.length > 0) {
        NotificationManager.info(LawFirmalertMsg.join(', '), '회사 정보에서 아래 값들을 확인해 주시기 바랍니다.');
      }
      if (UserInfoalertMsg.length > 0 && !LawFirmalertMsg.length > 0) {
        NotificationManager.info(UserInfoalertMsg.join(', '), '사용자 정보에서 아래 값들을 확인해 주시기 바랍니다.');
      }
      if (LawFirmalertMsg.length > 0 && UserInfoalertMsg.length > 0) {
        NotificationManager.info(LawFirmalertMsg.join(', '), '회사 정보에서 아래 값들을 확인해 주시기 바랍니다.');
        NotificationManager.info(UserInfoalertMsg.join(', '), '사용자 정보에서 아래 값들을 확인해 주시기 바랍니다.');
      }

      return;
    }

    // 이메일 Validation 체크
    if (alertMsg.length > 0) {
      NotificationManager.info(alertMsg.join(', '), mlMessage('notification.check'));
      return;
    }

    this.setState({
      alertDialog: true,
    });
  };

  saveDraft = async () => {
    const { LawFirmInfo, LawFirmUserInfo } = this.state;

    try {
      const data = await PostCall('/lawFirm/lawfirm/createLawFirm', {
        LawFirmBrand: LawFirmInfo.lawFirmBrand,
        CorRegNumber: LawFirmInfo.corRegNumber === '' ? null : LawFirmInfo.corRegNumber,
        LawFirmAddress: LawFirmInfo.address === '' ? null : LawFirmInfo.address,
        LawFirmAddress2: LawFirmInfo.detailAddress === '' ? null : LawFirmInfo.detailAddress,
        LawFirmZipcode: LawFirmInfo.zipCode === '' ? null : LawFirmInfo.zipCode,
        RepresentativeName: LawFirmInfo.representativeName,
        LawFirmofficePhoneNumber: LawFirmInfo.officePhoneNumber === '' ? null : LawFirmInfo.officePhoneNumber,
        FaxNumber: LawFirmInfo.faxNumber === '' ? null : LawFirmInfo.faxNumber,
        LawFirmEmail: LawFirmInfo.email,
        WebSiteURL: LawFirmInfo.webSiteURL === '' ? null : LawFirmInfo.webSiteURL,
        UserEmail: LawFirmUserInfo.email,
        Password: LawFirmUserInfo.password,
        FirstName: LawFirmUserInfo.firstName,
        LastName: LawFirmUserInfo.lastName,
        Profile: LawFirmUserInfo.profile === '' ? null : LawFirmUserInfo.profile,
        OfficeMobilePhoneNumber: LawFirmUserInfo.mobilePhoneNumber === '' ? null : LawFirmUserInfo.mobilePhoneNumber,
        UserOfficePhoneNumber: LawFirmUserInfo.officePhoneNumber === '' ? null : LawFirmUserInfo.officePhoneNumber,
        UserAddress: LawFirmUserInfo.address === '' ? null : LawFirmUserInfo.address,
        UserAddress2: LawFirmUserInfo.detailAddress === '' ? null : LawFirmUserInfo.detailAddress,
        UserZipCode: LawFirmUserInfo.zipCode === '' ? null : LawFirmUserInfo.zipCode,
      });

      const result = getAjaxData(data);

      const { token, user } = result;

      LawFirmInfo.formData.append('LFID', user.MyLFID);

      // photoURL 생성 -> Update PhotoURL (lawFirm)
      const lawFirmResult = await axios.post(`${urlMaster}/ext/file`, LawFirmInfo.formData);
      const lawFirmphotoResult = getAjaxData(lawFirmResult);

      const lawFirmNewKey = lawFirmphotoResult[0].key;
      const lawFirmNewImageURL = imageURL_prefix + lawFirmNewKey;

      await PostCall('/lawFirm/lawfirm/updateInitLawFirmLogoURL', {
        LawFirmID: user.MyLFID,
        LawFirmLogoURL: lawFirmNewImageURL,
      });

      LawFirmUserInfo.formData.append('LFID', user.MyLFID);

      // photoURL 생성 -> Update PhotoURL (lawFirmEmployee)
      const employeeResult = await axios.post(`${urlMaster}/ext/file`, LawFirmUserInfo.formData);
      const employeephotoResult = getAjaxData(employeeResult);
      const employeeNewKey = employeephotoResult[0].key;
      const employeeNewImageURL = imageURL_prefix + employeeNewKey;

      await PostCall('/lawFirm/lawfirm/updateInitLawFirmEmployeePhotoURL', {
        LawFirmID: user.MyLFID,
        UserID: user.UserID,
        PhotoURL: employeeNewImageURL,
      });

      localStorage.setItem('token', token); // ajax call을 위한 특수 용도 (일반 유저 정보는 redux-auth 에서 사용!)
      localStorage.setItem('LoginID', user.LoginID);
      localStorage.setItem('UserID', user.UserID);
      window.location = '/'; // token 로그인이 사용되도록 refresh ..
    } catch (error) {
      NotificationManager.info('관리자 정보 등록이 실패 했습니다.');
      throw error;
    }
  };

  render() {
    const { tab } = this.state;

    const { open, auth } = this.props;

    return (
      <>
        <DialogInfoForm
          title="회원가입"
          open={open}
          topContent={
            <div className="d-flex justify-content-left ml-3">
              <Tab text="회사 정보" onClick={() => this.changeTab(0)} selected={tab === 0} />
              <Tab text="사용자 정보" onClick={() => this.changeTab(1)} selected={tab === 1} />
            </div>
          }
          actions={
            <div className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
              <Box>
                <Button
                  color="primary"
                  size="large"
                  onClick={() => {
                    this.checkInputData();
                  }}
                >
                  <Box pl={5} pr={5}>
                    {mlMessage('pages.common.button.save')}
                  </Box>
                </Button>

                <Button color="inverted" size="large" onClick={() => console.log(this.state)}>
                  <Box pl={5} pr={5}>
                    {mlMessage('pages.common.button.cancel')}
                  </Box>
                </Button>
              </Box>
            </div>
          }
        >
          {tab === 0 && <LawFirmInfo handleChangeValues={this.handleChangeValues} info={this.state.LawFirmInfo} />}

          {tab === 1 && (
            <LawfirmUserInfo handleChangeValues={this.handleChangeValues} info={this.state.LawFirmUserInfo} />
          )}
        </DialogInfoForm>
        <div>
          <Dialog
            open={this.state.alertDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>저장하시겠습니까?</span>
            </DialogTitle>

            <DialogBtnBox>
              <Button
                onClick={() => {
                  this.setState({ alertDialog: false });
                }}
              >
                <span style={{ color: '#FF4081' }}>아니오</span>
              </Button>
              <Button
                onClick={e => {
                  this.saveDraft();
                }}
                autoFocus
              >
                <span style={{ color: '#3F51B5' }}>네</span>
              </Button>
            </DialogBtnBox>
          </Dialog>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ common, auth }) => {
  return { common, auth };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(LawFirm));
