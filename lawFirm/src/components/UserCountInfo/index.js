import React, { Component } from 'react';
import { connect } from 'react-redux';
import { R, RU } from 'helpers/ramda';

const { licenseCalc } = RU;

class UserCountInfo extends Component {
  render() {
    const { companyPayInfo } = this.props;
    if (!companyPayInfo) return <div />;

    const { base, payHistory } = companyPayInfo;
    if (!base) return <div />;
    if (!payHistory) return <div />;

    const { companyCreateDate: compCreateDate, isTrial, userCount: userNum } = base;
    if (!compCreateDate) return <div />;

    const {
      users: userMax,
      startDate: payStartDate,
      endDate: payEndDate,
      lastPayCheckOneYear,
      thisMonth_LastDayUsers,
      nextMonth_LastDayUsers,
      reduceUserCountON,
    } = payHistory;

    const {
      trialDays,
      trialUsers,
      trialStartDate,
      trialEndDate,
      startDate,
      endDate,
      maxCount,
      usePercent,
      addAvailableCount,
      systemDisable,
    } = licenseCalc({
      compCreateDate,
      payStartDate,
      payEndDate,
      isTrial,
      userMax,
      userNum,
    });

    const NmaxCount = maxCount || 0;

    return (
      <React.Fragment>
        {systemDisable && (
          <div
            style={{
              backgroundColor: '#ffc107',
              borderRadius: '5px',
              paddingLeft: '8px',
              paddingRight: '8px',
            }}
          >
            * Trial 기간 만료 또는 결제된 유저수가 초과 되었습니다. (Trial 유저수 : {trialUsers}명, 결제된 유저수 : {NmaxCount}명, 등록된 유저수 : {userNum}명)
            <br />
            <span style={{ paddingLeft: '8px' }}>
              -> {trialStartDate} ~ {trialEndDate} ({trialDays}일)
            </span>
          </div>
        )}
        {!systemDisable && (
          <div
            style={{
              backgroundColor: '#ffc107',
              borderRadius: '5px',
              paddingLeft: '8px',
              paddingRight: '8px',
            }}
          >
            ({isTrial ? 'Trial' : 'Paid'}) 현재 : {userNum}명, 최대 : {NmaxCount}명
            {NmaxCount > 0 && <span> ({usePercent}%)</span>} /{' '}
            {addAvailableCount > 0 && <span style={{ fontWeight: 'bold' }}>{addAvailableCount}명 추가 가능</span>}
            {addAvailableCount <= 0 && (
              <span style={{ fontWeight: 'bold', color: 'red' }}>{Math.abs(addAvailableCount)}명 초과 사용 중</span>
            )}
            <br />
            <span style={{ paddingLeft: '8px' }}>
              -> {isTrial ? 'Trial 가능 유저' : '구입 유저'} : {NmaxCount}명 ({startDate} ~ {endDate})
            </span>
            <br />
            <span style={{ paddingLeft: '8px' }}>
              -> 상세 : 이번달 잔여 기준 {thisMonth_LastDayUsers}, 다음달 기준 {nextMonth_LastDayUsers}, 최근 결재{' '}
              {lastPayCheckOneYear ? '12개월' : '1개월'}, 유저가 {reduceUserCountON ? '감소' : '증가'} 하는 결재.
            </span>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ common }) => {
  const { companyPayInfo } = common;
  return { companyPayInfo };
};

export default connect(
  mapStateToProps,
  {},
)(UserCountInfo);
