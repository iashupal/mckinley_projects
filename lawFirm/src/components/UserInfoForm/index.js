import React, { Component } from 'react';
import { BlankSpan, SelectW } from 'helpers/ui';
import TextField from '@material-ui/core/TextField';
import File from 'components/File';
import { RU } from 'helpers/ramda';
import { authList, isUseList, countryCodePhone } from 'helpers/data';
import { connect } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MobileNumberInput from 'components/MobileNumberInput';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const { imageURL_prefix, mlMessage } = RU;

class UserInfoForm extends Component {
  render() {
    const {
      dialogMode,
      disableLoginID,
      handleChange,
      detail_loginID,
      detail_phone,
      detail_name_kor,
      detail_name_eng,
      detail_image,
      detail_authList,
      detail_isUse,
      detail_pass,
      detail_pass2,
      detail_phoneCountry,
      detail_companyName_kor,
      detail_companyName_eng,
      invitationUUID,

      changeStateValuePhone,
      addRoleInRoleCodeList,
      removeRoleInRoleCodeList,
    } = this.props;

    const isSignupEmail = dialogMode === 'signupEmail';
    const isSignupEmailAdmin = dialogMode === 'signupEmailAdmin';
    const isDetail = dialogMode === 'detail';
    const isCreate = dialogMode === 'create';

    return (
      <div className="row">
        {isSignupEmailAdmin && (
          <div className="col-md-6">
            <TextField
              label="회사명 (한글)"
              value={detail_companyName_kor}
              onChange={e => handleChange({ name: 'detail_companyName_kor', value: e.target.value })}
              margin="normal"
              fullWidth
            />
          </div>
        )}
        {isSignupEmailAdmin && (
          <div className="col-md-6">
            <TextField
              label="회사명 (영문)"
              value={detail_companyName_eng}
              onChange={e => handleChange({ name: 'detail_companyName_eng', value: e.target.value })}
              margin="normal"
              fullWidth
            />
          </div>
        )}
        <div className="col-md-6">
          <TextField
            label="LoginID"
            value={detail_loginID}
            disabled={isDetail || isSignupEmail || isSignupEmailAdmin || disableLoginID}
            onChange={e => handleChange({ name: 'detail_loginID', value: e.target.value })}
            margin="normal"
            fullWidth
          />
        </div>
        {!isSignupEmailAdmin && (
          <div className="col-md-6">
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <FormControl style={{ width: '170px' }}>
                <InputLabel>국가</InputLabel>
                <Select
                  value={detail_phoneCountry}
                  onChange={e => handleChange({ name: 'detail_phoneCountry', value: e.target.value })}
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
                label={mlMessage('pages.common.phone2')}
                value={detail_phone}
                disabled={isDetail}
                onChange={e => handleChange({ name: 'detail_phone', value: e.target.value })}
                margin="normal"
                fullWidth
              />
            </div>
          </div>
        )}
        {isSignupEmailAdmin && (
          <div className="col-md-12">
            <MobileNumberInput invitationUUID={invitationUUID} changeStateValuePhone={changeStateValuePhone} />
          </div>
        )}
        <div className="col-md-6">
          <TextField
            label={mlMessage('user.profile.name.kor')}
            value={detail_name_kor}
            disabled={isDetail}
            onChange={e => handleChange({ name: 'detail_name_kor', value: e.target.value })}
            margin="normal"
            fullWidth
          />
        </div>
        <div className="col-md-6">
          <TextField
            label={mlMessage('user.profile.name.eng')}
            value={detail_name_eng}
            disabled={isDetail}
            onChange={e => handleChange({ name: 'detail_name_eng', value: e.target.value })}
            margin="normal"
            fullWidth
          />
        </div>
        <div className="col-md-6">
          <TextField
            label={mlMessage('user.profile.name.pass1')}
            value={detail_pass}
            onChange={e => handleChange({ name: 'detail_pass', value: e.target.value })}
            disabled={isSignupEmailAdmin || isSignupEmail ? false : this.props.isDemoMode}
            margin="normal"
            type="password"
            fullWidth
          />
        </div>
        <div className="col-md-6">
          <TextField
            label={mlMessage('user.profile.name.pass2')}
            value={detail_pass2}
            onChange={e => handleChange({ name: 'detail_pass2', value: e.target.value })}
            disabled={isSignupEmailAdmin || isSignupEmail ? false : this.props.isDemoMode}
            margin="normal"
            type="password"
            fullWidth
          />
        </div>
        {!isSignupEmailAdmin && !isSignupEmail && (
          <div className="col-md-6 pt-2">
            <FormLabel className="mb-2">
              {mlMessage('pages.common.auth')}
              <FormGroup>
                {authList.map(auth => {
                  let hasRole = false;
                  detail_authList.forEach(item => {
                    if (item === auth.value) {
                      hasRole = true;
                    }
                  });

                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={hasRole}
                          onChange={e =>
                            e.target.checked
                              ? addRoleInRoleCodeList(e.target.value)
                              : removeRoleInRoleCodeList(e.target.value)
                          }
                          value={auth.value}
                          color="primary"
                        />
                      }
                      label={auth.name}
                    />
                  );
                })}
              </FormGroup>
            </FormLabel>
          </div>
        )}
        {!isSignupEmailAdmin && !isSignupEmail && !isCreate && (
          <div className="col-md-6 pt-2">
            <SelectW
              value={detail_isUse}
              items={isUseList}
              handleChange={e => handleChange({ name: 'detail_isUse', value: e.target.value })}
              isUseAll={false}
              isReadOnly={false}
              label={mlMessage('pages.common.isActive')}
            />
          </div>
        )}
        {(isSignupEmailAdmin || isSignupEmail) && (
          <div className="col-md-12 pt-4">
            {detail_image && (
              <React.Fragment>
                <img className="size-40 rounded-circle" src={detail_image} alt="" />
                <BlankSpan num={2} />
              </React.Fragment>
            )}
            <File
              files={[]}
              handleFileAdd={e => {
                const newKey = e[0].key;
                const newImageURL = imageURL_prefix + newKey;
                this.props.handleChange({ name: 'detail_image', value: newImageURL });
              }}
              isPublicFile
            />
            {mlMessage('user.profile.name.image')}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ common }) => {
  const { isDemoMode } = common;
  return { isDemoMode };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserInfoForm);
