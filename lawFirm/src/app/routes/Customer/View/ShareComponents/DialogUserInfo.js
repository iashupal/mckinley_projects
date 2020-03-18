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
import Select from 'components/Select';
import { MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import Box from 'components/BoxOld';
import InputBox from 'components/InputBox';
import DialogContent from '@material-ui/core/DialogContent';
import DialogLawFirmInfo from 'app/routes/Customer/View/ShareComponents/DialogLawFirmInfo';
import ImageCropper from 'components/ImageCropper';
import CheckBox from 'components/CheckBox';
import AutoComplete from 'components/AutoComplete';
import { checkInputDataCustomer, setReduxValues, setListFetchCompany } from 'app/routes/Customer/Redux/Action';

const { mlMessage, imageURL_prefix } = RU;

class DialogUserInfo extends React.Component {
  state = {
    addressDialog: false,
    selectedOption: {},
  };

  componentDidMount() {
    const { setListFetchCompany, setReduxValues } = this.props;

    setListFetchCompany({ searchValue: '' });
  }

  toggleDialog = () => {
    this.setState({
      addressDialog: !this.state.addressDialog,
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
    setReduxValues({ _path: 'individual.save', zipCode: data.zonecode });
    setReduxValues({ _path: 'individual.save', address: fullAddress });

    this.toggleDialog();
  };

  handleFileAdd = e => {
    const { setReduxValues } = this.props;

    const newKey = e[0].key;
    const newImageURL = imageURL_prefix + newKey;

    setReduxValues({ _path: 'individual.save', photoURL: newImageURL });
  };

  handleData = () => {
    const { setReduxValues, customerMng } = this.props;
    const { individual, company } = customerMng;

    setReduxValues({
      _path: 'individual.save',
      cardID: individual.detail.cardID,
      photoURL: individual.detail.photoURL,
      name: individual.detail.name,
      mobile: individual.detail.mobile,
      email: individual.detail.email,
      phone: individual.detail.phone,
      faxNumber: individual.detail.faxNumber === '-' ? '' : individual.detail.faxNumber,
      zipCode: individual.detail.zipCode,
      address: individual.detail.address,
      detailAddress: individual.detail.detailAddress,
      belong: individual.detail.belong,

      company: company.detail.name,
    });
  };

  setListData = list => {
    return list.map(item => {
      return {
        value: item.CardID,
        label: item.Name,
      };
    });
  };

  render() {
    const {
      buttonTitle,
      companyInfo,
      title,
      customerMng,
      setReduxValues,
      checkInputDataCustomer,
      icon,
      router,
    } = this.props;
    const { dialogMode, individual } = customerMng;
    const { save } = individual;
    const {
      belong,
      isOpen,
      photoURL,
      isRepresentative,
      company,
      name,
      mobile,
      email,
      phone,
      faxNumber,
      zipCode,
      address,
      detailAddress,
      remark,
    } = save;

    const obj = {};
    if (companyInfo) {
      obj.company = companyInfo.name;
      obj.belong = '1';
      setReduxValues({
        _path: 'individual.save',
        ...obj,
      });
    }
    if (customerMng.company.list.memberList.length === 0 && customerMng.company.nowMode === 'detail') {
      obj.isRepresentative = true;
      setReduxValues({
        _path: 'individual.save',
        ...obj,
      });
    }

    return (
      <div>
        <Button
          color="primary"
          icon={icon}
          onClick={async () => {
            await setReduxValues({
              _path: 'individual.save',
              belong: '0',
              isOpen: true,
              photoURL: null,
              isRepresentative: false,
              company: '',
              name: '',
              cardTypeCode: '',
              mobile: '',
              email: '',
              phone: '',
              faxNumber: '',
              zipCode: '',
              address: '',
              detailAddress: '',
              remark: '',
            });
            await setReduxValues({ dialogMode: this.props.dialogMode });
          }}
        >
          {
            <Box pr={1} pl={1}>
              {!buttonTitle ? 'DialogUserInfo' : buttonTitle}
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
                        checkInputDataCustomer({ save, isKeep: false, dialogMode });
                      }}
                      label="등록 후 닫기"
                    />
                    <ButtonN
                      color="primary"
                      type="large"
                      onClick={() => {
                        checkInputDataCustomer({ save, isKeep: true, dialogMode });
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
                        checkInputDataCustomer({ save, isKeep: false, dialogMode });
                      }}
                      label="수정"
                    />
                  </>
                )}

                <ButtonN
                  color="inverted"
                  type="large"
                  onClick={() => {
                    setReduxValues({
                      _path: 'individual.save',
                      cardID: null,
                      belong: '0',
                      isOpen: false,
                      photoURL: null,
                      isRepresentative: false,
                      company: '',
                      name: '',
                      cardTypeCode: '',
                      mobile: '',
                      email: '',
                      phone: '',
                      faxNumber: '',
                      zipCode: '',
                      address: '',
                      detailAddress: '',
                      remark: '',
                    });
                  }}
                  label={mlMessage('pages.common.button.cancel')}
                />
              </Box>
            </div>
          }
        >
          <div className="mb-3 " style={{ display: 'flex', justifyContent: 'center' }}>
            <ImageCropper prevImg={photoURL} handleFileAdd={target => this.handleFileAdd(target)} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', padding: '30px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Fields>
                <FieldItem title="회사 소속 여부" redstar>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                    <Select
                      selectedKey={belong}
                      disabled={dialogMode === 'mod'}
                      style={{ marginLeft: '-5px', paddingLeft: '-5px', marginRight: '9px' }}
                      options={[
                        {
                          key: '0',
                          text: '미소속',
                        },
                        {
                          key: '1',
                          text: '소속',
                        },
                      ]}
                      onChange={(e, o) => {
                        setReduxValues({ _path: 'individual.save', belong: o.key });
                      }}
                    />
                    {belong === '1' &&
                      (dialogMode === 'create' ||
                        customerMng.company.nowMode === 'detail' ||
                        router.location.pathname === '/app/company/detail') && (
                        <CheckBox
                          label="대표 여부"
                          disabled
                          checked={isRepresentative}
                          onChange={(event, checked) =>
                            setReduxValues({ _path: 'individual.save', isRepresentative: checked })
                          }
                        />
                      )}
                  </div>
                </FieldItem>
                {belong === '1' && (
                  <FieldItem title="소속 회사" redstar>
                    <>
                      <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
                        {dialogMode === 'mod' || customerMng.company.nowMode === 'detail' ? (
                          <InputBox placeholder="소속 회사" value={company} disabled width="100%" maxLength={100} />
                        ) : (
                          <AutoComplete
                            options={this.setListData(customerMng.company.list.list)}
                            selectedOption={this.state.selectedOption}
                            handleChange={e => {
                              this.setState({ selectedOption: e });
                              setReduxValues({ _path: 'individual.save', company: e.label });
                            }}
                          />
                        )}
                      </div>
                      {dialogMode !== 'mod' && customerMng.company.nowMode !== 'detail' && (
                        <div className="mt-2" style={{ marginLeft: '-4px' }}>
                          <DialogLawFirmInfo buttonTitle="신규 단체/회사" title="단체/회사" dialogMode="create" />
                        </div>
                      )}
                    </>
                  </FieldItem>
                )}

                <FieldItem title="이름" redstar>
                  <InputBox
                    placeholder="이름"
                    value={name}
                    width="100%"
                    maxLength={100}
                    onChange={e => {
                      setReduxValues({ _path: 'individual.save', name: e.target.value });
                    }}
                  />
                </FieldItem>
                <FieldItem title="핸드폰" redstar>
                  <div style={{ width: '100%' }}>
                    <MaskedTextField
                      mask="***-****-****"
                      maskChar=""
                      value={mobile}
                      maxLength="13"
                      placeholder="010-0000-0000"
                      onChange={e => {
                        setReduxValues({ _path: 'individual.save', mobile: e.target.value });
                      }}
                    />
                  </div>
                </FieldItem>
                <FieldItem title="Email" redstar>
                  <InputBox
                    placeholder="example@example.com"
                    value={email}
                    width="100%"
                    maxLength={250}
                    onChange={e => {
                      setReduxValues({ _path: 'individual.save', email: e.target.value });
                    }}
                  />
                </FieldItem>
                <FieldItem title="전화번호">
                  <InputBox
                    placeholder="전화번호"
                    value={phone}
                    width="100%"
                    maxLength={31}
                    onChange={e => {
                      setReduxValues({ _path: 'individual.save', phone: e.target.value });
                    }}
                  />
                </FieldItem>
                <FieldItem title="팩스번호">
                  <InputBox
                    placeholder="팩스번호"
                    value={faxNumber}
                    width="100%"
                    maxLength={30}
                    onChange={e => {
                      setReduxValues({ _path: 'individual.save', faxNumber: e.target.value });
                    }}
                  />
                </FieldItem>
                <FieldItem title="주소" redstar>
                  <>
                    <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
                      <InputBox placeholder="우편번호" value={zipCode} disabled maxLength={10} width="70%" />
                      <Button color="primary" size="square" onClick={e => this.toggleDialog()}>
                        <Box pr={1} pl={1}>
                          주소찾기
                        </Box>
                      </Button>
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
                        setReduxValues({ _path: 'individual.save', detailAddress: e.target.value });
                      }}
                    />
                  </>
                </FieldItem>
                {belong === '1' && (
                  <FieldItem title="비고">
                    <InputBox
                      placeholder="비고"
                      value={remark}
                      multiline
                      width="100%"
                      maxLength={255}
                      onChange={e => {
                        setReduxValues({ _path: 'individual.save', remark: e.target.value });
                      }}
                    />
                  </FieldItem>
                )}
              </Fields>
            </div>
          </div>
        </DialogInfoForm>

        <Dialog
          open={this.state.addressDialog !== false}
          onClose={e => this.toggleDialog()}
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
                this.toggleDialog();
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

const mapStateToProps = ({ customerMng, router }) => {
  return { customerMng, router };
};

const mapDispatchToProps = {
  checkInputDataCustomer,
  setReduxValues,
  setListFetchCompany,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DialogUserInfo);
