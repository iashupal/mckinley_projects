import React, { Component } from 'react';
import Box from 'components/BoxOld';
import { EditorW, DialogBtnBox } from 'helpers/ui';
import { R, RU } from 'helpers/ramda';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import FileImage from 'components/FileImage';
import AlignBox from 'components/AlignBox';
import ImageCropper from 'components/ImageCropper';
import Fields, { FieldItem } from 'components/Fields';
import FieldRow from 'components/FieldRow';
import InputBox from 'components/InputBox';
import { MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import PostCode from 'components/PostCode';
import Button from 'components/Button';
import ButtonN from 'components/ButtonN';
import Dialog from '@material-ui/core/Dialog';
import classnames from 'classnames';
import DialogContent from '@material-ui/core/DialogContent';
import profileImg from 'assets/images/profile.png';

const { changeURL, mlMessage, imageURL_prefix } = RU;

const styles = theme => ({
  userNameBox: {
    marginLeft: '-50px',
    '@media (max-width: 1500px)': {
      marginLeft: '-35px',
    },
  },
  profileBox: {
    padding: '20px 30px 0px 30px',
    '@media (max-width: 767px)': {
      padding: 0,
    },
  },
  imageBox: {
    padding: 0,
    '@media (max-width: 767px)': {
      padding: '20px',
    },
  },
  infoBox: {
    padding: '30px',
    '@media (max-width: 767px)': {
      padding: 0,
    },
  },
});

class LawFirmUserInfo extends Component {
  state = {
    dialog: false,
  };

  toggleDialog = () => {
    this.setState({
      dialog: !this.state.dialog,
    });
  };

  handleAddress = data => {
    const { handleChangeValues } = this.props;

    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    handleChangeValues({ state: 'LawFirmUserInfo', target: 'zipCode', value: data.zonecode });
    handleChangeValues({ state: 'LawFirmUserInfo', target: 'address', value: fullAddress });

    this.toggleDialog();
  };

  handleFileAdd = async e => {
    const { handleChangeValues } = this.props;
    await handleChangeValues({ state: 'LawFirmUserInfo', target: 'formData', value: e });
  };

  render() {
    const { classes, info, handleChangeValues } = this.props;
    const {
      photoURL,
      firstName,
      lastName,
      email,
      password,
      mobilePhoneNumber,
      officePhoneNumber,
      zipCode,
      address,
      detailAddress,
      profile,
    } = info;
    return (
      <>
        <div className={classnames(classes.profileBox, 'row')}>
          <div className={classnames(classes.imageBox, 'col-md-4')}>
            <ImageCropper width="150px" prevImg={photoURL} handleFileAdd={target => this.handleFileAdd(target)} />
          </div>
          <div className="col-md-8" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100%' }}>
              <Fields>
                <FieldItem title={mlMessage('pages.common.lastName')} redstar>
                  {' '}
                  <InputBox
                    placeholder={mlMessage('pages.common.lastName')}
                    value={lastName}
                    width="100%"
                    maxLength={100}
                    onChange={e =>
                      handleChangeValues({ state: 'LawFirmUserInfo', target: 'lastName', value: e.target.value })
                    }
                  />
                </FieldItem>
                <FieldItem title={mlMessage('pages.common.firstName')} redstar>
                  <InputBox
                    placeholder={mlMessage('pages.common.firstName')}
                    value={firstName}
                    width="100%"
                    maxLength={100}
                    onChange={e =>
                      handleChangeValues({ state: 'LawFirmUserInfo', target: 'firstName', value: e.target.value })
                    }
                  />
                </FieldItem>
              </Fields>
            </div>
          </div>
        </div>
        <div className={classnames(classes.infoBox, 'row')}>
          <div className="col-md-12">
            <Fields>
              <FieldItem title={mlMessage('pages.common.email')} redstar>
                <InputBox placeholder="email@example.com" disabled value={email} maxLength={250} width="100%" />
              </FieldItem>
              <FieldItem title={mlMessage('pages.common.password')} redstar>
                <InputBox
                  placeholder={mlMessage('pages.common.password')}
                  value={password}
                  maxLength={64}
                  width="100%"
                  onChange={e =>
                    handleChangeValues({ state: 'LawFirmUserInfo', target: 'password', value: e.target.value })
                  }
                />
              </FieldItem>
              <FieldItem title={mlMessage('user.profile.name.phone')} redstar>
                <div style={{ width: '100%' }}>
                  <MaskedTextField
                    mask="***-****-****"
                    maskChar=""
                    maxLength="13"
                    placeholder="010-0000-0000"
                    value={mobilePhoneNumber}
                    onChange={e =>
                      handleChangeValues({
                        state: 'LawFirmUserInfo',
                        target: 'mobilePhoneNumber',
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </FieldItem>
              <FieldItem title={mlMessage('pages.common.OfficePhoneNumber')}>
                <InputBox
                  placeholder={mlMessage('pages.common.OfficePhoneNumber')}
                  value={officePhoneNumber}
                  maxLength={32}
                  width="100%"
                  onChange={e =>
                    handleChangeValues({
                      state: 'LawFirmUserInfo',
                      target: 'officePhoneNumber',
                      value: e.target.value,
                    })
                  }
                />
              </FieldItem>
              <FieldItem title={mlMessage('pages.common.address')}>
                <>
                  <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
                    <InputBox
                      placeholder="우편번호"
                      name="ZipCode"
                      className="mr-3"
                      value={zipCode}
                      disabled
                      maxLength={10}
                      // onChange={e =>
                      //   handleChangeValues({ state: 'LawFirmUserInfo', target: 'zipCode', value: e.target.value })
                      // }
                    />
                    <ButtonN color="primary" label="주소 찾기" onClick={e => this.toggleDialog()} />
                  </div>

                  <br />
                  <InputBox
                    placeholder="주소"
                    value={address}
                    disabled
                    maxLength={255}
                    width="100%"
                    // onChange={e =>
                    //   handleChangeValues({ state: 'LawFirmUserInfo', target: 'address', value: e.target.value })
                    // }
                  />
                  <br />
                  <InputBox
                    placeholder="상세주소"
                    value={detailAddress}
                    width="100%"
                    maxLength={255}
                    // onChange={e =>
                    //   handleChangeValues({
                    //     state: 'LawFirmUserInfo',
                    //     target: 'detailAddress',
                    //     value: e.target.value,
                    //   })
                    // }
                  />
                </>
              </FieldItem>
              <FieldItem title={mlMessage('pages.common.profile')} />
              <FieldItem isFull>
                <EditorW
                  myremoveButtons="Cut,Copy,Paste,PasteText,PasteFromWord,-,Undo,Redo,Scayt,Link,Unlink,Anchor,Image,Table,HorizontalRule,SpecialChar,Maximize,Source,Styles,Format,About"
                  value={profile}
                  handleChange={value => handleChangeValues({ state: 'LawFirmUserInfo', target: 'profile', value })}
                />
              </FieldItem>
            </Fields>
          </div>
        </div>
        <Dialog open={this.state.dialog !== false} onClose={e => this.toggleDialog()} fullWidth disableBackdropClick>
          <DialogContent>
            <PostCode autoClose handleAddress={this.handleAddress} />
          </DialogContent>
          <DialogBtnBox>
            <Button
              color="inverted"
              size="large"
              mode="regular"
              onClick={e => {
                this.toggleDialog();
              }}
            >
              <Box pl={5} pr={5}>
                취소
              </Box>
            </Button>
          </DialogBtnBox>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = ({ common }) => {
  return { common };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(LawFirmUserInfo));
