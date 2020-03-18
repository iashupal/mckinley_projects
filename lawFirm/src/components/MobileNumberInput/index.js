import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { BlankSpan } from 'helpers/ui';
import produce from 'immer';
import { PostCall } from 'helpers/ajax';
import { NotificationManager } from 'react-notifications';
import { R, RU } from 'helpers/ramda';
const { getErrObj, validatePhone } = RU;
const time_expired_default = 180;

class MobileNumberInput extends React.Component {
  state = {
    phone_num: '', // 외부 필요 값. (+handler)
    recognitionUUID: '', // 외부 필요 값. (+handler)
    mobileVerifiedUUID: '', // 외부 필요 값. (+handler)
    auth_expired: time_expired_default,
    auth_code: '',
    is_valid: false,
    ing_code_check: false,
    interval_value: null,
  };

  countDown = e => {
    const { auth_expired, interval_value } = this.state;

    const new_auth_expired = auth_expired - 1;
    if (new_auth_expired < 0) {
      clearInterval(interval_value);
    } else {
      this.setState(
        produce(this.state, draft => {
          draft.auth_expired = new_auth_expired;
        }),
      );
    }
  };

  sendAuthCode = async e => {
    const { phone_num, interval_value } = this.state;

    try {
      const result = await PostCall('/auth/getMobileRecognitionNumber', {
        invitationUUID: this.props.invitationUUID,
        mobilePhoneNumber: phone_num,
      });
      const { recognitionUUID } = result.data.data;
      if (recognitionUUID) {
        NotificationManager.info('', phone_num + '번호로 인증코드(6자리)를 발송 했습니다.');
      }

      this.setState(
        produce(this.state, draft => {
          draft.auth_expired = time_expired_default;
          draft.ing_code_check = true;
          draft.auth_code = '';
          draft.recognitionUUID = recognitionUUID;
        }),
        e => {
          clearInterval(interval_value);
          const result = setInterval(this.countDown, 1000);
          this.setState(
            produce(this.state, draft => {
              draft.interval_value = result;
            }),
          );
        },
      );

      this.props.changeStateValuePhone({ name: 'recognitionUUID', value: recognitionUUID }); // 외부
    } catch (error) {
      const { eCode, type, code, message, data } = getErrObj(error, true);
      NotificationManager.info(message, phone_num + '번호의 인증코드(6자리) 발송이 실패 했습니다.');
    }
  };

  checkAuthCode = async e => {
    const { phone_num, recognitionUUID, auth_code, interval_value } = this.state;

    try {
      const result = await PostCall('/auth/checkMobileRecognitionNumber', {
        mobilePhoneNumber: phone_num,
        recognitionUUID: recognitionUUID,
        recognitionNumber: parseInt(auth_code),
      });
      const { mobileVerifiedUUID } = result.data.data;
      clearInterval(interval_value);
      this.setState(
        produce(this.state, draft => {
          draft.ing_code_check = false;
          draft.is_valid = true;
          draft.mobileVerifiedUUID = mobileVerifiedUUID;
        }),
      );

      this.props.changeStateValuePhone({ name: 'mobileVerifiedUUID', value: mobileVerifiedUUID }); // 외부
      NotificationManager.info('', phone_num + '번호 인증이 성공 했습니다.');
    } catch (error) {
      const { eCode, type, code, message, data } = getErrObj(error, true);
      NotificationManager.info(message, phone_num + '번호 인증이 실패 했습니다.');
    }
  };

  render() {
    const { auth_expired, auth_code, ing_code_check, is_valid, phone_num } = this.state;

    return (
      <div
        style={{
          borderStyle: 'solid',
          borderWidth: '2px',
          borderRadius: '5px',
          marginTop: '10px',
          marginBottom: '10px',
          padding: '5px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '6px',
            paddingBottom: '6px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <BlankSpan num={1} />
            <TextField
              label={"휴대폰 번호 ('-' 포함)"}
              value={phone_num}
              onChange={e => {
                this.setState(
                  produce(this.state, draft => {
                    draft.phone_num = e.target.value;
                    draft.ing_code_check = false;
                    draft.is_valid = false;
                  }),
                );

                this.props.changeStateValuePhone({ name: 'phone_num', value: e.target.value }); // 외부
              }}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  this.sendAuthCode();
                }
              }}
              style={{ width: '160px' }}
              disabled={phone_num && is_valid}
            />
            <BlankSpan num={2} />
            {phone_num && is_valid && <i className="zmdi zmdi-check-circle zmdi-hc-lg" style={{ color: 'green' }} />}
            {phone_num && !is_valid && <i className="zmdi zmdi-alert-triangle zmdi-hc-lg" style={{ color: 'red' }} />}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              onClick={e => this.sendAuthCode()}
              variant="contained"
              color="primary"
              disabled={!validatePhone(phone_num) || ing_code_check || is_valid}
            >
              인증코드 발송
            </Button>
            <BlankSpan num={1} />
          </div>
        </div>
        {ing_code_check && (
          <div style={{ display: 'flex', alignItems: 'flex-end', paddingTop: '6px', paddingBottom: '6px' }}>
            <BlankSpan num={3} />
            <TextField
              label={
                '인증번호 (' +
                ((parseInt(auth_expired / 60) + '').length === 1 ? '0' : '') +
                (parseInt(auth_expired / 60) + '') +
                ':' +
                (((auth_expired % 60) + '').length === 1 ? '0' : '') +
                ((auth_expired % 60) + '') +
                ')'
              }
              onChange={e => {
                this.setState(
                  produce(this.state, draft => {
                    if (e.target.value.length <= 6) {
                      draft.auth_code = e.target.value;
                    }
                  }),
                );
              }}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  this.checkAuthCode();
                }
              }}
              value={auth_code}
              style={{ width: '120px' }}
              disabled={auth_expired === 0}
            />
            <BlankSpan num={2} />
            <Button
              onClick={e => this.checkAuthCode()}
              variant="contained"
              color="primary"
              disabled={auth_expired === 0 || auth_code.length !== 6}
            >
              입력
            </Button>
            <BlankSpan num={2} />
            <Button onClick={e => this.sendAuthCode()} variant="contained" color="secondary">
              재발송
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default MobileNumberInput;
