import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { ButtonW, BlankSpan, DialogBtnBox } from 'helpers/ui';
import File from 'components/File';
import TextField from '@material-ui/core/TextField';
import { R, RU } from 'helpers/ramda';
import produce from 'immer';
import { NotificationManager } from 'react-notifications';
import { PostCall } from 'helpers/ajax';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { countryCodePhone } from 'helpers/data';

const { imageURL_prefix, wEmpStr, validatePhone, mlMessage, changeURL } = RU;

class ProfileDialog extends Component {
  state = {
    name_kor: this.props.authUser.userKorName,
    name_eng: this.props.authUser.userEngName,
    phone: this.props.authUser.phone,
    pass: '',
    pass2: '',
    image: this.props.authUser.image,
    isSlack: this.props.authUser.isSlack,
    phoneCountry: 82,
  };

  changeStateValue = obj => {
    this.setState(
      produce(this.state, draft => {
        draft[obj.name] = obj.value;
      }),
    );
  };

  changeSlackValue = async obj => {
    this.setState(
      produce(this.state, draft => {
        draft[obj.name] = obj.value;
      }),
    );

    const { host } = window.location;

    let result = '';
    if (host === 'live.cloudlawai.com') result = '524859746775.524008337989';
    if (host === 'dev.cloudlawai.com') result = '524859746775.523720249907';
    if (host === 'qa.cloudlawai.com') result = '524859746775.523720249907';
    if (host === 'localhost:3002') result = '524859746775.523720249907';

    if (obj.value) {
      window.location = `https://slack.com/oauth/authorize?client_id=${result}&scope=chat:write:bot,channels:read,groups:read,im:read,mpim:read`;
    }
  };

  handleFileAdd = e => {
    const newKey = e[0].key;
    const newImageURL = imageURL_prefix + newKey;
    this.changeStateValue({ name: 'image', value: newImageURL });
  };

  handleUpdate = async e => {
    const { name_kor, name_eng, phone, pass, pass2, image, isSlack } = this.state;

    const alertMsg = [];
    if (!name_kor) {
      alertMsg.push('한글 이름');
    }
    if (!name_eng) {
      alertMsg.push('영문 이름');
    }
    if (!phone) {
      alertMsg.push('핸드폰 번호');
    }

    if (phone && phone.length > 31) {
      alertMsg.push('핸드폰 번호는 최대 31자');
    }

    if (phone && !validatePhone(phone)) {
      alertMsg.push('핸드폰 번호 형식');
    }

    if (pass || pass2) {
      if (pass !== pass2) {
        alertMsg.push('Password 같지 않음');
      }
      if (pass.length < 8 || pass2.length < 8) {
        alertMsg.push('Password 자릿수');
      }
    }

    if (alertMsg.length > 0) {
      NotificationManager.info(alertMsg.join(', '), '아래 값들을 확인해 주시기 바랍니다.');
    } else {
      const result = await PostCall('/user/updateMyUserInfo', {
        MobilePhoneNumber: phone,
        PhotoURL: image,
        Password: pass,
        UserKorName: name_kor,
        UserEngName: name_eng,
        IsSlack: isSlack,
      });

      if (result.status === 200) {
        alert('값이 변경 되었습니다. 페이지가 다시 갱신 됩니다.');
        window.location = '/';
      }
    }
  };

  render() {
    const { isOpen, handleClose, authUser } = this.props;

    return (
      <div className="app-wrapper">
        <div className="app-module">
          <Dialog open={isOpen}>
            <DialogTitle>Profile</DialogTitle>
            <DialogContent>
              <div className="row">
                {authUser.multiCompanyUser && (
                  <React.Fragment>
                    <div className="col-md-12">{`소속 회사 : ${R.pluck('ccKorName', authUser.ccList).join(', ')}`}</div>
                    <br />
                  </React.Fragment>
                )}
                <div className="col-md-6">
                  <div className="form-group">
                    <TextField
                      label={mlMessage('user.profile.name.kor')}
                      value={this.state.name_kor}
                      onChange={e =>
                        this.changeStateValue({
                          name: 'name_kor',
                          value: e.target.value,
                        })
                      }
                      margin="normal"
                      fullWidth
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <TextField
                      label={mlMessage('user.profile.name.eng')}
                      value={this.state.name_eng}
                      onChange={e =>
                        this.changeStateValue({
                          name: 'name_eng',
                          value: e.target.value,
                        })
                      }
                      margin="normal"
                      fullWidth
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                      <FormControl style={{ width: '170px' }}>
                        <InputLabel>국가</InputLabel>
                        <Select
                          value={this.state.phoneCountry}
                          onChange={e => {
                            this.setState({
                              ...this.state,
                              phoneCountry: e.target.value,
                            });
                          }}
                          disabled
                        >
                          {countryCodePhone &&
                            countryCodePhone.map(i => (
                              <MenuItem value={i.value} key={i.value}>
                                {i.text}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                      <BlankSpan num={2} />
                      <TextField
                        label={mlMessage('user.profile.name.phone')}
                        value={this.state.phone}
                        onChange={e =>
                          this.changeStateValue({
                            name: 'phone',
                            value: e.target.value,
                          })
                        }
                        margin="normal"
                        fullWidth
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    {this.state.image && <img className="size-40 rounded-circle" src={this.state.image} alt="" />}
                    <BlankSpan num={2} />
                    <File files={[]} handleFileAdd={target => this.handleFileAdd(target)} isPublicFile />
                    {mlMessage('user.profile.name.image')}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <TextField
                      label={mlMessage('user.profile.name.pass1')}
                      value={this.state.pass}
                      onChange={e =>
                        this.changeStateValue({
                          name: 'pass',
                          value: e.target.value,
                        })
                      }
                      disabled={this.props.isDemoMode}
                      margin="normal"
                      type="password"
                      fullWidth
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <TextField
                      label={mlMessage('user.profile.name.pass2')}
                      value={this.state.pass2}
                      onChange={e =>
                        this.changeStateValue({
                          name: 'pass2',
                          value: e.target.value,
                        })
                      }
                      disabled={this.props.isDemoMode}
                      margin="normal"
                      type="password"
                      fullWidth
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        classes={{
                          checked: 'text-primary',
                          bar: 'bg-primary',
                        }}
                        checked={!!this.state.isSlack}
                        onChange={(event, checked) =>
                          this.changeSlackValue({
                            name: 'isSlack',
                            value: checked,
                          })
                        }
                      />
                    }
                    label="Add to Slack"
                  />
                </div>
              </div>
            </DialogContent>
            <DialogBtnBox>
              <ButtonW name="Save" handleClick={this.handleUpdate} option="4" />
              <ButtonW name="Close" handleClick={handleClose} option="2" />
            </DialogBtnBox>
          </Dialog>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, common }) => {
  const { authUser } = auth;
  const { isDemoMode } = common;

  return { authUser, isDemoMode };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileDialog);
