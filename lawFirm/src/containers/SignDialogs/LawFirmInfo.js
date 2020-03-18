import React, { Component } from 'react';
import Box from 'components/BoxOld';
import { withStyles } from '@material-ui/core';
import { DialogBtnBox } from 'helpers/ui';
import { R, RU } from 'helpers/ramda';
import Button from 'components/Button';
import ButtonN from 'components/ButtonN';
import Fields, { FieldItem } from 'components/Fields';
import ImageCropper from 'components/ImageCropper';
import PostCode from 'components/PostCode';
import InputBox from 'components/InputBox';
import { MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import classnames from 'classnames';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const { changeURL, mlMessage, imageURL_prefix } = RU;

const styles = theme => ({
  brandNameBox: {
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

class LawFirmInfo extends Component {
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

    handleChangeValues({ state: 'LawFirmInfo', target: 'zipCode', value: data.zonecode });
    handleChangeValues({ state: 'LawFirmInfo', target: 'address', value: fullAddress });

    this.toggleDialog();
  };

  handleFileAdd = async e => {
    const { handleChangeValues } = this.props;
    await handleChangeValues({ state: 'LawFirmInfo', target: 'formData', value: e });
  };

  render() {
    const { classes, info, handleChangeValues } = this.props;
    const {
      photoURL,
      lawFirmBrand,
      representativeName,
      email,
      faxNumber,
      corRegNumber,
      officePhoneNumber,
      zipCode,
      address,
      detailAddress,
      webSiteURL,
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
                <FieldItem title={mlMessage('pages.signIn.LawFirmInfo.LawFirmBrand')} redstar>
                  <InputBox
                    placeholder={mlMessage('pages.signIn.LawFirmInfo.LawFirmBrand')}
                    value={lawFirmBrand}
                    width="100%"
                    maxLength={255}
                    onChange={e =>
                      handleChangeValues({ state: 'LawFirmInfo', target: 'lawFirmBrand', value: e.target.value })
                    }
                  />
                </FieldItem>
                <FieldItem title={mlMessage('pages.signIn.LawFirmInfo.RepresentativeName')} redstar>
                  <InputBox
                    placeholder={mlMessage('pages.signIn.LawFirmInfo.RepresentativeName')}
                    value={representativeName}
                    width="100%"
                    maxLength={100}
                    onChange={e =>
                      handleChangeValues({
                        state: 'LawFirmInfo',
                        target: 'representativeName',
                        value: e.target.value,
                      })
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
              <FieldItem title={mlMessage('pages.signIn.LawFirmInfo.PhoneNumber')} redstar>
                <div style={{ width: '100%' }}>
                  <MaskedTextField
                    mask="***-****-****"
                    maskChar=""
                    maxLength="13"
                    placeholder="010-0000-0000"
                    value={officePhoneNumber}
                    onChange={e =>
                      handleChangeValues({
                        state: 'LawFirmInfo',
                        target: 'officePhoneNumber',
                        value: e.target.value,
                      })
                    }
                  />
                </div>
              </FieldItem>
              <FieldItem title={mlMessage('pages.signIn.LawFirmInfo.FaxNumber')}>
                <InputBox
                  placeholder={mlMessage('pages.signIn.LawFirmInfo.FaxNumber')}
                  value={faxNumber}
                  maxLength={30}
                  width="100%"
                  onChange={e =>
                    handleChangeValues({ state: 'LawFirmInfo', target: 'faxNumber', value: e.target.value })
                  }
                />
              </FieldItem>
              <FieldItem title={mlMessage('pages.signIn.LawFirmInfo.Email')} redstar>
                <InputBox
                  placeholder="email@example.com"
                  value={email}
                  maxLength={250}
                  width="100%"
                  onChange={e => handleChangeValues({ state: 'LawFirmInfo', target: 'email', value: e.target.value })}
                />
              </FieldItem>
              <FieldItem title={mlMessage('pages.signIn.LawFirmInfo.CorRegNumber')}>
                <InputBox
                  placeholder="XXX-XX-XXXXX"
                  value={corRegNumber}
                  maxLength={12}
                  width="100%"
                  onChange={e =>
                    handleChangeValues({ state: 'LawFirmInfo', target: 'corRegNumber', value: e.target.value })
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
                    />
                    <ButtonN color="primary" label="주소 찾기" onClick={e => this.toggleDialog()} />
                  </div>
                  <br />
                  <InputBox placeholder="주소" value={address} disabled maxLength={255} width="100%" />
                  <br />
                  <InputBox
                    placeholder="상세주소"
                    value={detailAddress}
                    width="100%"
                    maxLength={256}
                    onChange={e =>
                      handleChangeValues({ state: 'LawFirmInfo', target: 'detailAddress', value: e.target.value })
                    }
                  />
                </>
              </FieldItem>
              <FieldItem title="웹페이지 주소">
                <InputBox
                  placeholder="웹페이지 주소"
                  value={webSiteURL}
                  width="100%"
                  maxLength={255}
                  onChange={e =>
                    handleChangeValues({ state: 'LawFirmInfo', target: 'webSiteURL', value: e.target.value })
                  }
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

export default withStyles(styles)(LawFirmInfo);
