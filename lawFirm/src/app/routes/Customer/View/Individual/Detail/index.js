import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';
import ContentCard from 'components/ContentCard';
import Fields from 'components/Fields';
import Box from 'components/BoxOld';
import Tab from 'components/Tab';
import AlignBox from 'components/AlignBox';
import profile from 'assets/images/profile.png';
import CaseDetailTab from 'app/routes/Case/View/Detail';
import TaskTab from 'app/routes/Case/View/Task';
import CaseMemo from 'app/routes/Case/View/Memo';
import DueDate from 'app/routes/Case/View/DueDate';
import Document from 'app/routes/Case/View/Document';
import SMS from 'app/routes/Case/View/SMS';
import ContractConsulationHistory from 'app/routes/Case/View/ContractConsulationHistory';
import DialogUserInfo from 'app/routes/Customer/View/ShareComponents/DialogUserInfo';
import DialogLawFirmInfo from 'app/routes/Customer/View/ShareComponents/DialogLawFirmInfo';
import { setReduxValues } from 'app/routes/Customer/Redux/Action';

/*---------------------------------------------

현재 사용하지 않는 페이지

---------------------------------------------*/

class Detail extends Component {
  state = {
    tab: 0,
  };

  componentWillUnmount() {
    const { setReduxValues } = this.props;

    setReduxValues({ _path: 'individual', nowMode: 'list' }); // 다른 URL 로 벗어나면, 다시 접속시 list 부터 시작
  }

  changeTab(tab) {
    this.setState({ tab });
  }

  render() {
    const { classes, customerMng } = this.props;
    const { tab } = this.state;

    const { individual, company } = customerMng;

    return (
      <div>
        <ContentCard
          title="고객 정보"
          contents={[
            <div className="row">
              <div
                className={classnames(classes.detailLeft, 'col-md-6 pb-3')}
                style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}
              >
                <div style={{ flexGrow: 1 }}>
                  <Box>
                    <Box style={{ textAlign: 'center' }}>
                      <img
                        style={{ width: '15em', height: '15em', margin: '0px 20px 20px 20px' }}
                        src={individual.detail.photoURL === null ? profile : individual.detail.photoURL}
                        alt="프로필 사진"
                      />
                    </Box>
                  </Box>
                </div>
                <div style={{ flexGrow: 3 }}>
                  {/* <Fields
                    fieldArray={[
                      { title: '이름', contents: `${individual.detail.name}` },
                      { title: '핸드폰', contents: `${individual.detail.mobile}` },
                      { title: '이메일', contents: `${individual.detail.email}` },
                      { title: '전화번호', contents: `${individual.detail.phone}` },
                      { title: '팩스번호', contents: `${individual.detail.faxNumber}` },
                      {
                        title: '주소',
                        contents: (
                          <div>
                            {individual.detail.zipCode}
                            <br />
                            <br />
                            {individual.detail.address}
                            <br />
                            <br />
                            {individual.detail.detailAddress}
                          </div>
                        ),
                      },
                      {
                        title: '비고',
                        contents: <div>{individual.detail.remark}</div>,
                        hide: company.detail.cardID === '',
                      },
                    ]}
                  /> */}
                  <div style={{ textAlign: 'right' }}>
                    <DialogUserInfo title="정보 수정" dialogMode="mod" />
                  </div>
                </div>
              </div>

              {company.detail.cardID !== '' && (
                <div
                  className={classnames(classes.detailRight, 'col-md-6 pb-3')}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    margin: 'auto 0px',
                  }}
                >
                  <div style={{ flexGrow: 1 }}>
                    <Box>
                      <Box style={{ textAlign: 'center' }}>
                        <img
                          style={{ width: '15em', height: '15em', margin: '0px 20px 20px 20px' }}
                          src={company.photoURL === null ? profile : company.detail.photoURL}
                          alt="프로필 사진"
                        />
                      </Box>
                    </Box>
                  </div>
                  <div style={{ flexGrow: 3 }}>
                    {/* <Fields
                      fieldArray={[
                        { title: '회사명', contents: `${company.detail.name}` },
                        { title: '대표명', contents: `${company.detail.representativeName}` },
                        { title: '이메일', contents: `${company.detail.email}` },
                        { title: '사업자 등록번호', contents: `${company.detail.corRegNumber}` },
                        { title: '전화번호', contents: `${company.detail.phone}` },
                        { title: '팩스', contents: `${company.detail.faxNumber}` },
                        {
                          title: '주소',
                          contents: (
                            <div>
                              {company.detail.zipCode}
                              <br />
                              <br />
                              {company.detail.address}
                              <br />
                              <br />
                              {company.detail.detailAddress}
                            </div>
                          ),
                        },
                      ]}
                    /> */}
                    <div style={{ textAlign: 'right' }}>
                      <DialogLawFirmInfo buttonTitle="정보 수정" title='단체/회사' dialogMode="mod" />
                    </div>
                  </div>
                </div>
              )}
            </div>,
          ]}
        />

        <AlignBox className="mt-3">
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
            {/* 클라이언트 포탈 미사용 ->  Phase2 에서 사용 */}
            {/* <div>
                  <span style={{ flexGrow: 1 }}>클라이언트 포탈 사용</span>
                  <BlankSpan num={2} />
                </div>
                <div>
                  <SwitchNew />
                </div> */}
          </div>

          <div style={{ flexGrow: 2, border: '1px solid #868e96', display: 'flex', flexDirection: 'row' }}>
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div
                style={{
                  flexGrow: 1,
                  backgroundColor: '#ddd',
                  height: '100%',
                  lineHeight: '25px',
                  border: '1px solid #a1a1a1',
                }}
              >
                청구건수 <br />
                (진행중/완료)
              </div>
              <div className="pl-2" style={{ flexGrow: 2 }}>
                1/2
              </div>
            </div>

            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div
                style={{
                  flexGrow: 1,
                  backgroundColor: '#ddd',
                  height: '100%',
                  lineHeight: '25px',
                  border: '1px solid #a1a1a1',
                }}
              >
                의뢰 건수 <br />
                (진행중/완료)
              </div>
              <div className="pl-2" style={{ flexGrow: 2 }}>
                1/2
              </div>
            </div>

            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div
                style={{
                  flexGrow: 1,
                  backgroundColor: '#ddd',
                  height: '100%',
                  lineHeight: '50px',
                  border: '1px solid #a1a1a1',
                }}
              >
                상담 건수
              </div>
              <div className="pl-2" style={{ flexGrow: 2 }}>
                2
              </div>
            </div>

            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <div
                style={{
                  flexGrow: 1,
                  backgroundColor: '#ddd',
                  height: '100%',
                  lineHeight: '50px',
                  border: '1px solid #a1a1a1',
                }}
              >
                계약 건수
              </div>
              <div className="pl-2" style={{ flexGrow: 2 }}>
                1
              </div>
            </div>
          </div>
        </AlignBox>

        <Box display="flex" flexDirection="row" flexWrap="wrap">
          <Tab selected={tab === 0} text="송무 상세" onClick={() => this.changeTab(0)} />
          <Tab selected={tab === 1} text="Task (업무)" onClick={() => this.changeTab(1)} />
          <Tab selected={tab === 2} text="송무 메모" onClick={() => this.changeTab(2)} />
          <Tab selected={tab === 3} text="기일" onClick={() => this.changeTab(3)} />
          <Tab selected={tab === 4} text="문서/파일" onClick={() => this.changeTab(4)} />
          <Tab selected={tab === 5} text="SMS" onClick={() => this.changeTab(5)} />
          <Tab selected={tab === 6} text="계약/상담 이력" onClick={() => this.changeTab(6)} />
        </Box>

        {tab === 0 && <CaseDetailTab />}
        {tab === 1 && <TaskTab />}
        {tab === 2 && <CaseMemo />}
        {tab === 3 && <DueDate />}
        {tab === 4 && <Document />}
        {tab === 5 && <SMS />}
        {tab === 6 && <ContractConsulationHistory />}
      </div>
    );
  }
}

const styles = theme => ({
  cntBox: {
    backgroundColor: 'red',
  },
  detailLeft: {
    borderRight: '1px solid lightgray',
    // margin:'auto 0px',
    '@media screen and (max-width: 767px)': {
      borderRight: '0',
      borderBottom: '1px solid lightgray',
      marginBottom: '20px',
    },
  },
  detailRight: {
    flexWrap: 'nowrap',
    '@media screen and (max-width: 1637px)': {
      flexWrap: 'wrap',
    },
  },
  profilePhoto: {
    width: '100%',
    '@media screen and (min-width: 1700px)': {
      width: '30%',
    },
  },
  profileInfo: {
    width: '100%',
    '@media screen and (min-width: 1700px)': {
      width: '70%',
    },
  },
});

const mapStateToProps = ({ customerMng }) => {
  return { customerMng };
};

const mapDispatchToProps = {
  setReduxValues,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Detail));
