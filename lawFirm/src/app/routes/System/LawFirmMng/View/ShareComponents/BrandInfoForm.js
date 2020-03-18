import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import Button from 'components/Button';
import ContentCard from 'components/ContentCard';
import InputBox from 'components/InputBox';
import FieldRow from 'components/FieldRow';
import Fields, { FieldItem } from 'components/Fields';
import { BlankSpan, DialogBtnBox } from 'helpers/ui';
import AlignBox from 'components/AlignBox';
import File from 'components/File';
import { RU } from 'helpers/ramda';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import PostCode from 'components/PostCode';

const { imageURL_prefix, mlMessage } = RU;

class BrandInfoForm extends Component {
  state = {
    dialog: '',
  };

  openPostCodeDialog = () => {
    this.setState({
      dialog: 'open',
    });
  };

  closePostCodeDialog = () => {
    this.setState({
      dialog: '',
    });
  };

  handleFileAdd = e => {
    const { handleChange } = this.props;
    const newKey = e[0].key;
    const newImageURL = imageURL_prefix + newKey;
    handleChange({ _path: 'LawFirmDetail', lawFirmLogoURL: newImageURL });
  };

  handleAddress = data => {
    const { handleChange } = this.props;
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
    handleChange({ _path: 'LawFirmDetail', zipCode: data.zonecode, address: fullAddress });
    this.closePostCodeDialog();
  };

  render() {
    const { classes, LawFirmDetail, handleChange, handleSave, setLawFirmInfo } = this.props;
    const {
      lawFirmID,
      lawFirmBrand,
      lawFirmLogoURL,
      address,
      address2,
      zipCode,
      phoneNumber,
      fax,
      email,
      webSiteURL,
    } = LawFirmDetail;

    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'no-wrap' }}>
        <div className={classes.initial} style={{ width: '100%' }}>
          <div>
            <ContentCard
              title={mlMessage('pages.lawFirmMng.brandMng.brandTitle')}
              contents={[
                <div className="row">
                  <div className="col-md-10">
                    <Fields fullScreen>
                      <FieldItem title={mlMessage('pages.lawFirmMng.brandMng.logo')}>
                        <AlignBox>
                          <div className="form-group">
                            {lawFirmLogoURL && (
                              <img style={{ width: '11em', height: '11em' }} src={lawFirmLogoURL} alt="" />
                            )}
                            <BlankSpan num={2} />
                            <File
                              files={[]}
                              handleFileAdd={target => this.handleFileAdd(target)}
                              isPublicFile
                              LFID={lawFirmID}
                            />
                          </div>
                        </AlignBox>
                      </FieldItem>
                      <FieldItem title={mlMessage('pages.lawFirmMng.brandMng.brandName')}>
                        <InputBox
                          value={lawFirmBrand}
                          onChange={e => handleChange({ _path: 'LawFirmDetail', lawFirmBrand: e.target.value })}
                          style={{ width: '19em' }}
                        />
                      </FieldItem>
                    </Fields>
                  </div>
                </div>,
              ]}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <ContentCard
              title={mlMessage('pages.lawFirmMng.brandMng.addressTitle')}
              contents={[
                <div className="row">
                  <div className="col-md-10">
                    <Fields fullScreen>
                      <FieldItem title={mlMessage('pages.lawFirmMng.brandMng.address')}>
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                          <InputBox value={address} readOnly style={{ width: '30em' }} />
                          <Button
                            color="primary"
                            onClick={e => {
                              this.openPostCodeDialog();
                            }}
                          >
                            {mlMessage('pages.lawFirmMng.brandMng.findAddress')}
                          </Button>
                        </div>
                      </FieldItem>
                      <FieldItem title={mlMessage('pages.lawFirmMng.brandMng.detailAddress')}>
                        <InputBox
                          value={address2}
                          onChange={e => handleChange({ _path: 'LawFirmDetail', address2: e.target.value })}
                          style={{ width: '19em' }}
                        />
                      </FieldItem>
                      <FieldItem title={mlMessage('pages.lawFirmMng.brandMng.zipcode')}>
                        <InputBox value={zipCode} readOnly style={{ width: '19em' }} />
                      </FieldItem>
                    </Fields>
                  </div>
                </div>,
              ]}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <ContentCard
              title={mlMessage('pages.lawFirmMng.brandMng.contactTitle')}
              contents={[
                <div className="row">
                  <div className="col-md-10">
                    <Fields fullScreen>
                      <FieldItem title={mlMessage('pages.lawFirmMng.brandMng.phone')}>
                        <InputBox
                          value={phoneNumber}
                          onChange={e => handleChange({ _path: 'LawFirmDetail', phoneNumber: e.target.value })}
                          style={{ width: '19em' }}
                        />
                      </FieldItem>
                      <FieldItem title={mlMessage('pages.lawFirmMng.brandMng.fax')}>
                        <InputBox
                          value={fax}
                          onChange={e => handleChange({ _path: 'LawFirmDetail', fax: e.target.value })}
                          style={{ width: '19em' }}
                        />
                      </FieldItem>
                      <FieldItem title={mlMessage('pages.lawFirmMng.brandMng.email')} redstar>
                        <InputBox
                          value={email}
                          onChange={e => handleChange({ _path: 'LawFirmDetail', email: e.target.value })}
                          style={{ width: '19em' }}
                        />
                      </FieldItem>
                      <FieldItem title={mlMessage('pages.lawFirmMng.brandMng.website')}>
                        <InputBox
                          value={webSiteURL}
                          onChange={e => handleChange({ _path: 'LawFirmDetail', webSiteURL: e.target.value })}
                          style={{ width: '19em' }}
                        />
                      </FieldItem>
                    </Fields>
                  </div>
                </div>,
              ]}
            />
          </div>

          <div className={classes.submitButtonContainer}>
            <Button color="primary" size="large" mode="regular" onClick={e => handleSave()}>
              <Box pl={5} pr={5}>
                {mlMessage('pages.common.button.save')}
              </Box>
            </Button>
            <Button
              className={classes.subBtnMargin}
              color="inverted"
              size="large"
              mode="regular"
              onClick={e => {
                setLawFirmInfo();
              }}
            >
              <Box pl={5} pr={5}>
                {mlMessage('pages.common.button.reset')}
              </Box>
            </Button>
          </div>
        </div>
        <Dialog
          open={this.state.dialog !== ''}
          onClose={e => this.closePostCodeDialog()}
          fullWidth
          disableBackdropClick
        >
          <DialogContent>
            <PostCode autoClose handleAddress={this.handleAddress} />
          </DialogContent>
          <DialogBtnBox>
            <Button
              color="inverted"
              size="large"
              mode="regular"
              onClick={e => {
                this.closePostCodeDialog();
              }}
            >
              <Box pl={5} pr={5}>
                {mlMessage('pages.common.button.cancel')}
              </Box>
            </Button>
          </DialogBtnBox>
        </Dialog>
      </div>
    );
  }
}

const styles = theme => ({
  initial: {
    display: 'grid',
  },
  btnMargin: {
    marginRight: 5,
    display: 'inline-block',
  },
  subBtnMargin: {
    float: 'left',
    marginLeft: 10,
  },
  select: {
    width: '50%',
    display: 'inline-block',
  },
  submitButtonContainer: {
    marginTop: '10px',
    width: '100%',
    textAlign: 'center',
  },
});

export default withStyles(styles)(BrandInfoForm);
