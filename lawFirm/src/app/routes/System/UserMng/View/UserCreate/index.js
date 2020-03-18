import React, { Component } from 'react';
import { withStyles, Paper } from '@material-ui/core';
import { EditorW, BlankSpan, DialogBtnBox } from 'helpers/ui';
import { connect } from 'react-redux';
import { R, RU } from 'helpers/ramda';
import classnames from 'classnames';
import ContentCard from 'components/ContentCard';
import FieldRow from 'components/FieldRow';
import Fields, { FieldItem } from 'components/Fields';
import Button from 'components/Button';
import Select from 'components/Select';
import InputBox from 'components/InputBox';
import PageTitle from 'components/PageTitle';
import AlignBox from 'components/AlignBox';
import CheckBox from 'components/CheckBox';
import PostCode from 'components/PostCode';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import FileImage from 'components/FileImage';
import NumberFormat from 'react-number-format';
import profile from 'assets/images/profile.png';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import Box from 'components/BoxOld';
import ImageCropper from 'components/ImageCropper';
import InputBoxNumber from 'components/InputBoxNumber';
import { setReduxValues, setRoleCode, checkEmail, checkInputData, setSelect } from '../../Redux/Action';

const { changeURL, mlMessage, imageURL_prefix } = RU;

class UserCreate extends Component {
  state = {
    dialog: false,
  };

  componentDidMount() {
    const { userMng, setReduxValues } = this.props;

    if (userMng.nowMode === 'list') {
      setReduxValues({
        nowMode: 'create',
      });
    }
  }

  toggleDialog = () => {
    this.setState({
      dialog: !this.state.dialog,
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
    setReduxValues({ _path: 'save', ZipCode: data.zonecode, Address: fullAddress });
    this.toggleDialog();
  };

  handleFileAdd = e => {
    const { setReduxValues } = this.props;
    const newKey = e[0].key;
    const newImageURL = imageURL_prefix + newKey;

    setReduxValues({ _path: 'save', PhotoURL: newImageURL });
  };

  render() {
    const {
      classes,
      userMng,
      common,
      setReduxValues,
      setRoleCode,
      checkEmail,
      checkInputData,
      auth,
      setSelect,
    } = this.props;
    const { authUser } = auth;
    const { MyLFIDInfo } = authUser;
    const { LFID, LawFirmBrand } = MyLFIDInfo;
    const {
      Email,
      Password,
      FirstName,
      LastName,
      Profile,
      PhotoURL,
      EmployeeTypeCode,
      TCShareLevelCode,
      WorkingStatusCode,
      OfficeMobilePhoneNumber,
      OfficePhoneNumber,
      TimeCharge,
      Address,
      Address2,
      ZipCode,
      RoleCodeList,
      GroupCodeList,
    } = userMng.save;

    const { allCodes, roleList } = common;

    return (
      <div className={classes.container}>
        <Box
          mb={1}
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <PageTitle icon="class">
            [{LawFirmBrand}]
            {userMng.nowMode === 'create' ? mlMessage('pages.UserMng.create') : mlMessage('pages.UserMng.modify')}
          </PageTitle>
        </Box>

        <Paper className="p-5">
          <div className="row" style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div
              className="col-lg-4 col-md-5"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ImageCropper width={250} prevImg={PhotoURL} handleFileAdd={target => this.handleFileAdd(target)} />
            </div>
            <div className="col-lg-6 col-md-7" style={{ padding: '10px 30px' }}>
              <Fields>
                <FieldItem title={mlMessage('pages.common.lastName')} redstar>
                  <InputBox
                    placeholder={mlMessage('pages.common.lastName')}
                    value={LastName}
                    maxLength={50}
                    onChange={e =>
                      setReduxValues({
                        _path: 'save',
                        LastName: e.target.value,
                      })
                    }
                  />
                </FieldItem>
                <FieldItem title={mlMessage('pages.common.firstName')} redstar>
                  <InputBox
                    placeholder={mlMessage('pages.common.firstName')}
                    value={FirstName}
                    maxLength={50}
                    onChange={e =>
                      setReduxValues({
                        _path: 'save',
                        FirstName: e.target.value,
                      })
                    }
                  />
                </FieldItem>
                <FieldItem title={mlMessage('pages.common.profile')} />
                <FieldItem isFull>
                  <EditorW
                    value={Profile}
                    handleChange={value =>
                      setReduxValues({
                        _path: 'save',
                        Profile: value,
                      })
                    }
                  />
                </FieldItem>
              </Fields>
            </div>
          </div>

          <ContentCard
            title={mlMessage('pages.UserMng.userInfo')}
            contents={[
              <div className="row">
                <div className="col-lg-6" style={{ padding: '10px 30px', width: '80%' }}>
                  <Fields>
                    <FieldItem title={mlMessage('pages.common.email')} redstar>
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ flexGrow: 1 }}>
                          <InputBox
                            disabled={userMng.nowMode === 'mod'}
                            placeholder="example@example.com"
                            value={Email}
                            onChange={e => {
                              setReduxValues({
                                _path: 'save',
                                Email: e.target.value,
                              });
                              setReduxValues({
                                emailCheck: false,
                              });
                            }}
                          />
                        </div>
                        {userMng.nowMode === 'create' && (
                          <div className="pt-1 pb-1">
                            <Button
                              color={userMng.emailCheck ? 'inverted' : 'primary'}
                              size="square"
                              onClick={e => {
                                checkEmail();
                              }}
                            >
                              <Box pr={1} pl={1}>
                                {mlMessage('pages.common.checkDuplicate')}
                              </Box>
                            </Button>
                          </div>
                        )}
                      </div>
                    </FieldItem>
                    {userMng.nowMode === 'create' && (
                      <FieldItem title={mlMessage('pages.common.password')} redstar>
                        <InputBox
                          placeholder={mlMessage('pages.common.password')}
                          value={Password}
                          width="100%"
                          onChange={e =>
                            setReduxValues({
                              _path: 'save',
                              Password: e.target.value,
                            })
                          }
                        />
                      </FieldItem>
                    )}
                    <FieldItem title={mlMessage('pages.common.employeeType')} redstar>
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Select
                          selectedKey={EmployeeTypeCode}
                          style={{ marginLeft: '-5px' }}
                          options={
                            allCodes.EMPTYPE &&
                            allCodes.EMPTYPE.map(list => ({
                              key: list.FullCode,
                              text: list.CodeName,
                            }))
                          }
                          onChange={(e, o) => {
                            setReduxValues({
                              _path: 'save',
                              EmployeeTypeCode: o.key,
                            });
                          }}
                        />
                        <div className="pt-1 pb-1">
                          <Button color="primary" size="square">
                            <Box pr={1} pl={1}>
                              {mlMessage('pages.UserMng.settingType')}
                            </Box>
                          </Button>
                        </div>
                      </div>
                    </FieldItem>
                    <FieldItem title={mlMessage('user.profile.name.phone')} redstar>
                      <div style={{ width: '100%' }}>
                        <MaskedTextField
                          mask="***-****-****"
                          maskChar=""
                          maxLength="13"
                          placeholder="010-0000-0000"
                          value={OfficeMobilePhoneNumber}
                          onChange={e =>
                            setReduxValues({
                              _path: 'save',
                              OfficeMobilePhoneNumber: e.target.value,
                            })
                          }
                        />
                      </div>
                    </FieldItem>
                    <FieldItem title={mlMessage('pages.common.OfficePhoneNumber')}>
                      <InputBox
                        placeholder={mlMessage('pages.common.OfficePhoneNumber')}
                        maxLength={32}
                        width="100%"
                        value={OfficePhoneNumber}
                        onChange={e =>
                          setReduxValues({
                            _path: 'save',
                            OfficePhoneNumber: e.target.value,
                          })
                        }
                      />
                    </FieldItem>
                    <FieldItem title={mlMessage('pages.common.address')}>
                      <>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                          <div style={{ flexGrow: 1 }}>
                            <InputBox placeholder={mlMessage('pages.common.zipCode')} value={ZipCode} disabled />
                          </div>
                          <div className="pt-1 pb-1">
                            <Button color="primary" size="square" onClick={e => this.toggleDialog()}>
                              <Box pr={1} pl={1}>
                                {mlMessage('pages.common.searchAddress')}
                              </Box>
                            </Button>
                          </div>
                        </div>
                        <br />
                        <InputBox
                          placeholder={mlMessage('pages.common.address')}
                          value={Address}
                          disabled
                          maxLength={255}
                          width="100%"
                        />
                        <br />
                        <InputBox
                          placeholder={mlMessage('pages.common.detailaddress')}
                          value={Address2}
                          maxLength={256}
                          width="100%"
                          onChange={e =>
                            setReduxValues({
                              _path: 'save',
                              Address2: e.target.value,
                            })
                          }
                        />
                      </>
                    </FieldItem>
                  </Fields>
                </div>

                {/* 향후 등록 컬럼 추가 생성시 이곳에 추가 */}
                <div className="col-lg-6" style={{ padding: '10px 30px', width: '80%' }}>
                  <Fields>
                    <FieldItem title={mlMessage('pages.common.group')}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                        <Select
                          placeholder={mlMessage('pages.common.group')}
                          selectedKeys={GroupCodeList}
                          style={{ marginLeft: '-5px' }}
                          options={userMng.group.groupList
                            .filter(item => item.IsActive === 1)
                            .map(list => ({ key: list.id, text: list.GroupName }))}
                          multiSelect
                          onChange={async (e, o) => {
                            await setSelect({
                              list: 'GroupCodeList',
                              name: 'save',
                              o,
                            });
                          }}
                        />
                        <div className="pt-1 pb-1">
                          <Button color="primary" size="square">
                            <Box pr={1} pl={1}>
                              {mlMessage('pages.UserMng.settingGroup')}
                            </Box>
                          </Button>
                        </div>
                      </div>
                    </FieldItem>
                    <FieldItem title={mlMessage('pages.common.workingStatus')} redstar>
                      <Select
                        selectedKey={WorkingStatusCode}
                        style={{ marginLeft: '-5px' }}
                        options={
                          allCodes.WORKST &&
                          allCodes.WORKST.map(list => ({
                            key: list.FullCode,
                            text: list.CodeName,
                          }))
                        }
                        onChange={(e, o) => {
                          setReduxValues({
                            _path: 'save',
                            WorkingStatusCode: o.key,
                          });
                        }}
                      />
                    </FieldItem>
                    <FieldItem title={mlMessage('pages.common.timeCharge')} redstar>
                      <InputBoxNumber
                        thousandSeparator
                        value={TimeCharge}
                        onValueChange={obj =>
                          setReduxValues({
                            _path: 'save',
                            TimeCharge: obj.value,
                          })
                        }
                        unit="원"
                      />
                    </FieldItem>
                    <FieldItem title={mlMessage('pages.UserMng.TCShareLevel')} redstar>
                      <Select
                        selectedKey={TCShareLevelCode}
                        style={{ marginLeft: '-5px', width: 140 }}
                        options={
                          allCodes.TCSRLVL &&
                          allCodes.TCSRLVL.map(list => ({
                            key: list.FullCode,
                            text: list.CodeName,
                          }))
                        }
                        onChange={(e, o) => {
                          setReduxValues({
                            _path: 'save',
                            TCShareLevelCode: o.key,
                          });
                        }}
                      />
                    </FieldItem>
                    <FieldItem title={mlMessage('pages.common.auth')}>
                      <Box display="flex" flexDirection="column">
                        {roleList.map((list, index) => (
                          <CheckBox
                            key={index}
                            label={list.RoleNameKor}
                            value={list.RoleCode}
                            checked={!!userMng.save.RoleCodeList.find(a => a === list.RoleCode)}
                            onChange={(event, checked) =>
                              setRoleCode({
                                list: 'RoleCodeList',
                                value: event.target.value,
                                checked,
                              })
                            }
                          />
                        ))}
                      </Box>
                    </FieldItem>
                  </Fields>
                </div>
              </div>,
            ]}
          />
        </Paper>

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
                {mlMessage('pages.common.button.cancel')}
              </Box>
            </Button>
          </DialogBtnBox>
        </Dialog>

        <AlignBox>
          <AlignBox
            style={{
              margin: '0px auto',
              marginTop: '15px',
            }}
          >
            <Button
              color="primary"
              size="large"
              onClick={() => {
                checkInputData({ userMngDetail: userMng.save });
              }}
            >
              <Box pl={5} pr={5}>
                {mlMessage('pages.common.button.save')}
              </Box>
            </Button>
            <Button
              color="inverted"
              size="large"
              onClick={() => {
                setReduxValues({
                  nowMode: 'list',
                });
                changeURL('/UserMng');
              }}
            >
              <Box pl={5} pr={5}>
                {mlMessage('pages.common.button.cancel')}
              </Box>
            </Button>
          </AlignBox>
        </AlignBox>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    gridTemplateColumns: '1fr',
    padding: 30,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    },
  },
});

const mapStateToProps = ({ userMng, common, auth }) => {
  return { userMng, common, auth };
};

const mapDispatchToProps = {
  setReduxValues,
  setRoleCode,
  checkEmail,
  checkInputData,
  setSelect,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(UserCreate));
