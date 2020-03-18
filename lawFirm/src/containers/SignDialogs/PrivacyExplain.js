import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ButtonW, DialogBtnBox } from 'helpers/ui';
import produce from 'immer';
import { R, RU } from 'helpers/ramda';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';

const list = { paddingLeft: '30px' };
const align = { textAlign: 'center' };
const table = { marginLeft: '60px', width: '80%' };
const checkbox = { textAlign: 'right', paddingLeft: '10px', paddingRight: '20px' };
const font = { fontWeight: 'bold', fontSize: '13px' };

class PrivacyExplain extends Component {
  state = {
    check1: false,
    check2: false,
    check3: false,
    disabled: true,
  };

  changeStateValue = async obj => {
    await this.setState(
      produce(this.state, draft => {
        draft[obj.name] = obj.value;
      }),
    );
    this.setState(
      produce(this.state, draft => {
        draft.disabled = !(this.state.check1 && this.state.check2);
      }),
    );
  };

  initValue = async () => {
    await this.setState(
      produce(this.state, draft => {
        draft.check1 = false;
        draft.check2 = false;
        draft.check3 = false;
        draft.disabled = true;
      }),
    );
  };

  render() {
    return (
      <Dialog open={this.props.open} scroll="body" fullWidth maxWidth="md" fullScreen={this.props.fullScreen}>
        <DialogTitle>
          <div style={{ margin: '20px' }}>Privacy Policy</div>
        </DialogTitle>
        <DialogContent>
          <div style={{ margin: '0px 20px' }}>
            주식회사 휴맥스 아이티(이하 “휴맥스아이티,” “HUMAX IT” 또는 "당사")는 고객의 개인정보를 소중하게 생각하며,
            ‘정보통신망 이용촉진 및 정보보호에 관한 법률’ 및 '개인정보보호법' 등 관련법규를 준수하기 위해 노력하고
            있습니다. 휴맥스아이티는 개인정보 처리방침을 통하여 솔루션(총칭하여 "HUMAX IT 제품" 혹은 “제품”) 사용시
            이용자로부터 제공받는 개인정보를 어떠한 용도와 방식으로 이용하고 있으며, <br />
            개인정보 보호를 위해 어떠한 조치를 취하고 있는지 알려 드립니다.
            <br />
            <br />
            <Divider />
            <br />
            <br />
            <div>
              <h2>개인정보 수집∙이용에 대한 동의 (필수) </h2>
              <br />
              <div>
                <p>
                  주식회사 휴맥스아이티는 아래의 목적으로 개인정보를 수집 및 이용하며, 회원의 개인정보를 안전하게
                  취급하는데 최선을 다합니다.
                </p>
              </div>
              <br />
              <ul>
                <li>
                  수집목적
                  <br />
                  <br />
                  <table style={table} border="1">
                    <thead>
                      <tr style={align}>
                        <th>수집목적</th>
                        <th>이용목적</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={align}>회원 가입 및 관리</td>
                        <td>
                          <ul>
                            <li>회원 가입 의사 확인, 회원자격 유지/관리</li>
                            <li>제한적 본인확인제 시행에 따른 본인 확인</li>
                            <li>서비스 부정이용 방지, 각종 고지/통지</li>
                            <li>고충처리, 분쟁 조정을 위한 기록 보존</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td style={align}>재화 또는 서비스 제공</td>
                        <td>
                          <ul>
                            <li>서비스 제공, 콘텐츠 제공</li>
                            <li>서비스 이용요금, 결제 및 정산</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
                <br />
                <br />
                <li>
                  수집항목
                  <br />
                  <br />
                  가) 주식회사 휴맥스아이티는 회원가입 시 회원으로부터 아래 정보를 수집합니다.
                  <br />
                  <br />
                  <table style={table} border="1">
                    <thead>
                      <tr style={align}>
                        <th>수집항목</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <ul>
                            <li>이메일, 비밀번호, 이름, 전화번호, 휴대전화번호</li>
                            <li>대표자명, 관리자, 휴대전화번호</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                  <br />
                  나) 주식회사 휴맥스아이티는 회원의 서비스 이용 중 아래 정보를 자동으로 수집합니다.
                  <br />
                  <br />
                  <table style={table} border="1">
                    <thead>
                      <tr style={align}>
                        <th>수집항목</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <ul>
                            <li>서비스 이용에 따른 IP정보, 서비스 이용 기록, 접속 기록(자동으로 생성되는 개인정보)</li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
                <br />
                <br />
                <li>
                  보유기간
                  <br />
                  <br />
                  수집된 정보는 회원탈퇴 후 1년간 부정 가입 및 민원 처리 목적에서 보관되며, 해당 기간이 초과된 후
                  파기됩니다.
                  <br />
                  다만 아래 정보들은 각 기재된 기간 동안 보관된 이후 파기됩니다.
                  <br />
                  <br />
                  <table style={table} border="1">
                    <thead>
                      <tr style={align}>
                        <th>해당사항</th>
                        <th>기간</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={list}>관계 법령 위반에 따른 수사 ∙ 조사 등이 진행 중인 경우</td>
                        <td style={align}>해당 수사 ∙ 조사 종료 시까지</td>
                      </tr>
                      <tr>
                        <td style={list}>서비스 이용에 따른 채권 ∙ 채무관계가 잔존하는 경우</td>
                        <td style={align}>채권 ∙ 채무관계 정산 시까지</td>
                      </tr>
                      <tr>
                        <td style={list}>계약 또는 청약철회, 대금결제, 재화 등의 공급 기록</td>
                        <td style={align}>5년</td>
                      </tr>
                      <tr>
                        <td style={list}>소비자 불만 또는 분쟁처리에 관한 기록</td>
                        <td style={align}>3년</td>
                      </tr>
                      <tr>
                        <td style={list}>표시 ∙ 광고에 관한 기록</td>
                        <td style={align}>6개월</td>
                      </tr>
                      <tr>
                        <td style={list}>앱 및 홈페이지 방문 기록</td>
                        <td style={align}>3개월</td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
              <br />
              <div style={checkbox}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      checked={this.state.check1}
                      onChange={e => {
                        if (!this.state.check1) {
                          this.changeStateValue({
                            name: 'check1',
                            value: true,
                          });
                        } else {
                          this.changeStateValue({
                            name: 'check1',
                            value: false,
                          });
                        }
                      }}
                      // value="check1"
                    />
                  }
                  label={<span style={font}>(필수) 개인정보 수집 및 이용에 동의합니다.</span>}
                  labelPlacement="start"
                />
              </div>
            </div>
            <br />
            <Divider />
            <br />
            <div>
              <h2>개인정보 수집∙이용에 대한 동의 (필수) </h2>
              <br />
              <div>
                <p>
                  주식회사 휴맥스아이티는 회원 사진을 이용하여 회원 식별 등 보다 높은 수준의 서비스 제공을 위하여 회원
                  가입 시 회원으로부터 사진을 수집합니다.
                </p>
              </div>
              <br />
              <div style={checkbox}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      checked={this.state.check2}
                      onChange={e => {
                        if (!this.state.check2) {
                          this.changeStateValue({
                            name: 'check2',
                            value: true,
                          });
                        } else {
                          this.changeStateValue({
                            name: 'check2',
                            value: false,
                          });
                        }
                      }}
                      value="check2"
                    />
                  }
                  label={<span style={font}>(필수) 개인정보 수집 및 이용에 동의합니다.</span>}
                  labelPlacement="start"
                />
              </div>
            </div>
            <br />
            <Divider />
            <br />
            <div>
              <h2>마케팅을 위한 개인정보 수집∙이용에 대한 동의 (선택) </h2>
              <br />
              <div>
                <p>
                  주식회사 휴맥스아이티는 이메일, 문자메시지를 통한 마케팅 및 이벤트 정보의 제공을 위하여 이메일 및
                  휴대전화번호를 수집합니다.
                </p>
              </div>
              <br />
              <table style={table} border="1">
                <thead>
                  <tr style={align}>
                    <th>수집항목</th>
                    <th>목적</th>
                    <th>보유기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={align}>이메일, 이름, 휴대전화번호</td>
                    <td>
                      <ul style={{ marginBottom: '0px' }}>
                        <li>신규 서비스(제품) 개발 및 맞춤 서비스 제공</li>
                        <li>이벤트 및 광고성 정보 및 참여기회 제공</li>
                        <li>인구통계학적 특성에 따른 서비스 제공 및 광고 게재</li>
                        <li>서비스의 유효성 확인</li>
                        <li>접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계</li>
                      </ul>
                    </td>
                    <td style={align}>회원 탈퇴 후 1년</td>
                  </tr>
                </tbody>
              </table>
              <br />
              <p>
                위 개인정보 수집 ∙ 이용에 대한 동의를 거부하실 수 있으며, 거부하는 경우 할인 쿠폰, 이벤트 등에 관한
                정보를 받으실 수 없습니다.
              </p>
              <br />
              <div style={checkbox}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      checked={this.state.check3}
                      onChange={e => {
                        if (!this.state.check3) {
                          this.changeStateValue({
                            name: 'check3',
                            value: true,
                          });
                        } else {
                          this.changeStateValue({
                            name: 'check3',
                            value: false,
                          });
                        }
                      }}
                      value="check3"
                    />
                  }
                  label={<span style={font}>(선택) 개인정보 수집 및 이용에 동의합니다.</span>}
                  labelPlacement="start"
                />
              </div>
              <br />
            </div>
          </div>
        </DialogContent>
        <DialogBtnBox>
          {this.state.disabled === true && <ButtonW name="동의" disabled option="4" />}

          {this.state.disabled === false && (
            <ButtonW
              name="동의"
              handleClick={e => {
                this.initValue();
                this.props.handleOK();
              }}
              option="4"
            />
          )}

          <ButtonW
            name="미동의"
            handleClick={e => {
              this.initValue();
              this.props.handleNO();
            }}
            option="2"
          />
          <br />
          <br />
        </DialogBtnBox>
      </Dialog>
    );
  }
}

export default withMobileDialog()(PrivacyExplain);
