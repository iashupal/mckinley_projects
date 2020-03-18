import React, { Component } from 'react';
import { R, RU } from 'helpers/ramda';
import { withTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import DialogInfoForm from 'components/DialogInfoForm';
import Tab from 'components/Tab';
import Box from 'components/BoxOld';
import Button from 'components/Button';
import produce from 'immer';
import { NotificationManager } from 'react-notifications';
import { handleCommonAlertConfirmSet } from 'actions/Default/Common';
import { PostCall, getAjaxData } from 'helpers/ajax';
import LawFirmInfo from './LawFirmInfo';
import LawfirmUserInfo from './LawFirmUserInfo';

const { changeURL, mlMessage, getErrObj } = RU;

class LawFirmUI extends Component {
  state = {
    tab: 0,
    open: true,
    LawFirmInfo: {
      photoURL: '',
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
    },

    LawFirmUserInfo: {
      photoURL: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      mobilePhoneNumber: '',
      officePhoneNumber: '',
      zipCode: '',
      address: '',
      detailAddress: '',
      profile: '',
    },
  };

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

  render() {
    const { tab, open } = this.state;

    const { handleCommonAlertConfirmSet, initEmail, auth } = this.props;
    const { authUser } = auth;
    const { MyLFID } = authUser;

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
                  onClick={
                    () => {
                      handleCommonAlertConfirmSet({
                        msgObj: {
                          title: mlMessage('alertDialog.save'),
                          contents: '',
                          isConfirm: true,
                        },
                        waitDatas: {
                          name: '',
                          value: {},
                        },
                      });
                    }
                    // this.testHandleChange()
                  }
                >
                  <Box pl={5} pr={5}>
                    {mlMessage('pages.common.button.save')}
                  </Box>
                </Button>

                <Button
                  color="inverted"
                  size="large"
                  onClick={() =>
                    // {
                    //   handleCommonAlertConfirmSet({
                    //     msgObj: {
                    //     title: mlMessage('alertDialog.save'),
                    //     contents: '',
                    //     isConfirm: true,
                    //   },
                    //   waitDatas: {
                    //     name: '',
                    //     value: {},
                    //   },})
                    // }
                    this.setState({
                      open: false,
                    })
                  }
                >
                  <Box pl={5} pr={5}>
                    {mlMessage('pages.common.button.cancel')}
                  </Box>
                </Button>
              </Box>
            </div>
          }
        >
          {tab === 0 && (
            <LawFirmInfo handleChangeValues={this.handleChangeValues} info={this.state.LawFirmInfo} LFID={MyLFID} />
          )}

          {tab === 1 && (
            <LawfirmUserInfo
              handleChangeValues={this.handleChangeValues}
              info={this.state.LawFirmUserInfo}
              LFID={MyLFID}
            />
          )}
        </DialogInfoForm>
      </>
    );
  }
}

const mapStateToProps = ({ common, auth }) => {
  return { common, auth };
};

const mapDispatchToProps = {
  handleCommonAlertConfirmSet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(LawFirmUI));
