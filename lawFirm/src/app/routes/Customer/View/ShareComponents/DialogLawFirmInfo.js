import React from 'react';
import { R, RU } from 'helpers/ramda';
import { connect } from 'react-redux';
import { DialogBtnBox } from 'helpers/ui';
import Dialog from 'components/Dialog';
import DialogInfoForm from 'components/DialogInfoForm';
import Button from 'components/Button';
import ButtonN from 'components/ButtonN';
import Fields, { FieldItem } from 'components/Fields';
import PostCode from 'components/PostCode';
import { MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import Box from 'components/BoxOld';
import InputBox from 'components/InputBox';
import DialogContent from '@material-ui/core/DialogContent';
import ImageCropper from 'components/ImageCropper';
import DialogLawFirmList from 'app/routes/Customer/View/ShareComponents/DialogLawFirmList';
import { setReduxValues, checkInpuatDataCompany } from 'app/routes/Customer/Redux/Action';

const { mlMessage, imageURL_prefix } = RU;

class DialogLawFirmInfo extends React.Component {
  state = {
    addressDialog: false,
    listDialog: false,
  };

  addressDialog = () => {
    this.setState({
      addressDialog: !this.state.addressDialog,
    });
  };

  listDialog = () => {
    this.setState({
      listDialog: !this.state.listDialog,
    });
  };

  handleAddress = data => {
    const { setReduxValues } = this.props;
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

    setReduxValues({ _path: 'company.save', zipCode: data.zonecode });
    setReduxValues({ _path: 'company.save', address: fullAddress });

    this.addressDialog();
  };

  handleFileAdd = e => {
    const { setReduxValues } = this.props;
    const newKey = e[0].key;
    const newImageURL = imageURL_prefix + newKey;

    setReduxValues({ _path: 'company.save', photoURL: newImageURL });
  };

  handleData = () => {
    const { setReduxValues, customerMng } = this.props;

    const { company } = customerMng;

    setReduxValues({
      _path: 'company.save',
      cardID: company.detail.cardID,
      name: company.detail.name,
      photoURL: company.detail.photoURL,
      phone: company.detail.phone,
      email: company.detail.email,
      faxNumber: company.detail.faxNumber === '-' ? null : company.detail.faxNumber,
      zipCode: company.detail.zipCode,
      address: company.detail.address,
      detailAddress: company.detail.detailAddress,
      representativeName: company.detail.representativeName,
      corRegNumber: company.detail.corRegNumber,
    });
  };

  render() {
    const { buttonTitle, title, customerMng, setReduxValues, checkInpuatDataCompany, icon } = this.props;
    const { company, dialogMode } = customerMng;
    const { save } = company;
    const {
      isOpen,
      photoURL,
      name,
      email,
      phone,
      faxNumber,
      zipCode,
      address,
      detailAddress,
      representativeName,
      corRegNumber,
    } = save;
    return (
      <div>
        <Button
          icon={icon}
          color="primary"
          onClick={async () => {
            await setReduxValues({ _path: 'company.save', isOpen: true });
            await setReduxValues({ dialogMode: this.props.dialogMode });

            if (this.props.dialogMode === 'mod') {
              this.handleData();
            }
          }}
        >
          {
            <Box pr={1} pl={1}>
              {!buttonTitle ? 'DialogLawFirmInfo' : buttonTitle}
            </Box>
          }
        </Button>
        <DialogInfoForm
          title={dialogMode === 'create' ? `${title} 등록` : `${title} 수정`}
          open={isOpen}
          actions={
            <div className="mb-3">
              <Box>
                {dialogMode === 'create' ? (
                  <>
                    <ButtonN
                      color="primary"
                      type="large"
                      onClick={() => {
                        checkInpuatDataCompany({ save, isKeep: false, dialogMode });
                      }}
                      label="등록 후 닫기"
                    />
                    <ButtonN
                      color="primary"
                      type="large"
                      onClick={() => {
                        checkInpuatDataCompany({ save, isKeep: true, dialogMode });
                      }}
                      label="계속 등록"
                    />
                  </>
                ) : (
                  <>
                    <ButtonN
                      color="primary"
                      type="large"
                      onClick={() => {
                        checkInpuatDataCompany({ save, isKeep: false, dialogMode });
                      }}
                      label="수정"
                    />
                  </>
                )}

                <ButtonN
                  color="inverted"
                  size="middle"
                  type="large"
                  onClick={() => {
                    setReduxValues({
                      _path: 'company.save',
                      isOpen: false,
                      photoURL: null,
                      name: '',
                      email: '',
                      phone: '',
                      faxNumber: '',
                      zipCode: '',
                      address: '',
                      detailAddress: '',
                      representativeName: '',
                      corRegNumber: '',
                      corporationMasterID: null,
                    });
                  }}
                  label={mlMessage('pages.common.button.cancel')}
                />
              </Box>
            </div>
          }
        >
          <div className="mb-3" style={{ display: 'flex', justifyContent: 'center' }}>
            <ImageCropper prevImg={photoURL} handleFileAdd={target => this.handleFileAdd(target)} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', padding: '30px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Fields>
                <FieldItem title="회사명" redstar>
                  <>
                    <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
                      <InputBox
                        placeholder="회사명"
                        value={name}
                        width="100%"
                        maxLength={100}
                        onChange={e => {
                          setReduxValues({ _path: 'company.save', name: e.target.value });
                        }}
                      />
                    </div>
                    {dialogMode === 'create' && (
                      <DialogLawFirmList
                        title="단체/회사 공용DB에서 불러오기"
                        toggleDialog={this.listDialog}
                        open={this.state.listDialog}
                      />
                    )}
                  </>
                </FieldItem>
                <FieldItem title="대표명" redstar>
                  <InputBox
                    placeholder="대표명"
                    value={representativeName}
                    width="100%"
                    maxLength={100}
                    onChange={e => {
                      setReduxValues({ _path: 'company.save', representativeName: e.target.value });
                    }}
                  />
                </FieldItem>
                <FieldItem title="Email" redstar>
                  <InputBox
                    placeholder="example@example.com"
                    value={email}
                    width="100%"
                    maxLength={250}
                    onChange={e => {
                      setReduxValues({ _path: 'company.save', email: e.target.value });
                    }}
                  />
                </FieldItem>
                <FieldItem title="사업자 등록번호" redstar>
                  <MaskedTextField
                    mask="**-***-*****"
                    maskChar=""
                    maxLength="12"
                    placeholder="XX-XXX-XXXXX"
                    value={corRegNumber}
                    onChange={e => setReduxValues({ _path: 'company.save', corRegNumber: e.target.value })}
                  />
                </FieldItem>
                <FieldItem title="전화번호" redstar>
                  <InputBox
                    placeholder="전화번호"
                    value={phone}
                    width="100%"
                    maxLength={31}
                    onChange={e => {
                      setReduxValues({ _path: 'company.save', phone: e.target.value });
                    }}
                  />
                </FieldItem>
                <FieldItem title="팩스">
                  <InputBox
                    placeholder="팩스"
                    value={faxNumber}
                    width="100%"
                    maxLength={30}
                    onChange={e => {
                      setReduxValues({ _path: 'company.save', faxNumber: e.target.value });
                    }}
                  />
                </FieldItem>
                <FieldItem title="주소" redstar>
                  <>
                    <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
                      <InputBox
                        placeholder="우편번호"
                        value={zipCode}
                        disabled
                        maxLength={10}
                        width="70%"
                        className="mr-2"
                      />
                      <ButtonN color="primary" size="square" onClick={e => this.addressDialog()} label="주소찾기" />
                    </div>

                    <br />
                    <InputBox placeholder="주소" value={address} disabled maxLength={255} width="100%" />
                    <br />
                    <InputBox
                      placeholder="상세주소"
                      value={detailAddress}
                      width="100%"
                      maxLength={256}
                      onChange={e => {
                        setReduxValues({ _path: 'company.save', detailAddress: e.target.value });
                      }}
                    />
                  </>
                </FieldItem>
              </Fields>
            </div>
          </div>
        </DialogInfoForm>

        <Dialog
          open={this.state.addressDialog !== false}
          onClose={e => this.addressDialog()}
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
                this.addressDialog();
              }}
            >
              <Box pl={5} pr={5}>
                취소
              </Box>
            </Button>
          </DialogBtnBox>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ customerMng }) => {
  return { customerMng };
};

const mapDispatchToProps = {
  setReduxValues,
  checkInpuatDataCompany,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DialogLawFirmInfo);
