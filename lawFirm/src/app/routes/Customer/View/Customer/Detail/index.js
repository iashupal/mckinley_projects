import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';
import { R, RU } from 'helpers/ramda';
import ContentCard from 'components/ContentCard';
import Fields, { FieldItem } from 'components/Fields';
import Box from 'components/BoxOld';
import Tab from 'components/Tab';
import profile from 'assets/images/profile.png';
import PageTitle from 'components/PageTitle';
import Button from 'components/Button';
import ButtonN from 'components/ButtonN';
import CaseDetailTab from 'app/routes/Case/View/Detail';
import TaskTab from 'app/routes/Case/View/Task';
import DueDate from 'app/routes/Case/View/DueDate';
import Document from 'app/routes/Case/View/Document';
import SMS from 'app/routes/Case/View/SMS';
import TC from 'app/routes/Case/View/TC';
import Consultation from 'app/routes/Case/View/Consultation';
import { setReduxValues, setDetailBindCustomer } from 'app/routes/Customer/Redux/Action';

const { parseQueryStr, changeURL } = RU;

class Detail extends Component {
  state = {
    tab: 0,
  };

  componentDidMount() {
    const { setDetailBindCustomer } = this.props;

    const { MemberID, CoporationID, CardType } = this.props.queryString;

    setDetailBindCustomer({
      MemberID,
      CoporationID,
      CardType,
    });
  }

  componentWillUnmount() {
    const { setReduxValues } = this.props;

    setReduxValues({ _path: 'customer', nowMode: 'list' }); // 다른 URL 로 벗어나면, 다시 접속시 list 부터 시작
  }

  corRegNumberFormat = data => {
    const result = `${data.substr(0, 3)}-${data.substr(3, 2)}-${data.substr(5, 5)}`;

    return result;
  };

  corRegNumberFormat = data => {
    const result = `${data.substr(0, 3)}-${data.substr(3, 2)}-${data.substr(5, 5)}`;

    return result;
  };

  changeTab(tab) {
    this.setState({ tab });
  }

  render() {
    const { classes, customerMng, setReduxValues } = this.props;
    const { tab } = this.state;

    const { individual, company, customer } = customerMng;

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
          <PageTitle icon="class">전체 고객 조회</PageTitle>
          <Box
            mb={1}
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
            <ButtonN
              color="primary"
              label="전체 고객 목록"
              onClick={e => {
                changeURL(`/customer`);
              }}
            />
          </Box>
        </Box>
        <div>
          <ContentCard
            // title="고객 상세"
            contents={[
              <div className="row">
                <div
                  className={classnames(classes.detailLeft, 'col-md-6 pb-3')}
                  style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                  {individual.detail.cardID !== '' && (
                    <>
                      <h2 style={{ width: '100%', marginBottom: '5px' }}>개인 정보</h2>

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
                      <div style={{ flexGrow: 3, flexBasis: '150px' }}>
                        <Fields>
                          <FieldItem title="이름">{individual.detail.name}</FieldItem>
                          <FieldItem title="핸드폰">{individual.detail.mobile}</FieldItem>
                          <FieldItem title="이메일">{individual.detail.email}</FieldItem>
                          <FieldItem title="전화번호">{individual.detail.phone}</FieldItem>
                          <FieldItem title="팩스번호">{individual.detail.faxNumber}</FieldItem>
                          <FieldItem title="주소">
                            <div>
                              {individual.detail.zipCode}
                              <br />
                              <br />
                              {individual.detail.address}
                              <br />
                              <br />
                              {individual.detail.detailAddress}
                            </div>
                          </FieldItem>
                          {company.detail.cardID !== '' && (
                            <FieldItem title="비고">
                              <div>{individual.detail.remark}</div>
                            </FieldItem>
                          )}
                        </Fields>
                      </div>
                    </>
                  )}
                </div>

                <div
                  className="col-md-6 pb-3"
                  style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                  {company.detail.cardID !== '' && (
                    <>
                      <h2 style={{ width: '100%', marginBottom: '35px' }}>회사 정보</h2>

                      <div className={classnames(classes.detailRight)}>
                        <div style={{ flexGrow: 1 }}>
                          <Box>
                            <Box style={{ textAlign: 'center' }}>
                              <img
                                style={{ width: '15em', height: '15em', margin: '0px 20px 20px 20px' }}
                                src={company.detail.photoURL === null ? profile : company.detail.photoURL}
                                alt="프로필 사진"
                              />
                            </Box>
                          </Box>
                        </div>
                        <div style={{ flexGrow: 3 }}>
                          <Fields>
                            <FieldItem title="회사명">{company.detail.name}</FieldItem>
                            <FieldItem title="대표명">{company.detail.representativeName}</FieldItem>
                            <FieldItem title="이메일">{company.detail.email}</FieldItem>
                            <FieldItem title="사업자 등록번호">
                              {this.corRegNumberFormat(company.detail.corRegNumber)}
                            </FieldItem>
                            <FieldItem title="전화번호">{company.detail.phone}</FieldItem>
                            <FieldItem title="팩스">{company.detail.faxNumber}</FieldItem>
                            <FieldItem title="주소">
                              <div>
                                {company.detail.zipCode}
                                <br />
                                <br />
                                {company.detail.address}
                                <br />
                                <br />
                                {company.detail.detailAddress}
                              </div>
                            </FieldItem>
                          </Fields>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>,
            ]}
          />

          <Box display="flex" flexDirection="row" flexWrap="wrap">
            <Tab selected={tab === 0} text="송무 상세" onClick={() => this.changeTab(0)} />
            <Tab selected={tab === 1} text="Task" onClick={() => this.changeTab(1)} />
            <Tab selected={tab === 2} text="기일" onClick={() => this.changeTab(2)} />
            <Tab selected={tab === 3} text="문서/파일" onClick={() => this.changeTab(3)} />
            <Tab selected={tab === 4} text="SMS" onClick={() => this.changeTab(4)} />
            <Tab selected={tab === 5} text="상담" onClick={() => this.changeTab(5)} />
            <Tab selected={tab === 6} text="TC" onClick={() => this.changeTab(6)} />
          </Box>

          {tab === 0 && <CaseDetailTab key={0} />}
          {tab === 1 && <TaskTab key={1} />}
          {tab === 2 && <DueDate key={2} />}
          {tab === 3 && <Document key={3} />}
          {tab === 4 && <SMS key={4} />}
          {tab === 5 && <Consultation key={5} />}
          {tab === 6 && <TC key={6} />}

          {/* <AlignBox className="mt-3">
          <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'row' }}>
            클라이언트 포탈 미사용 ->  Phase2 에서 사용
            <div>
                  <span style={{ flexGrow: 1 }}>클라이언트 포탈 사용</span>
                  <BlankSpan num={2} />
                </div>
                <div>
                  <SwitchNew />
                </div>
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
        </AlignBox> */}
        </div>
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
    // flexWrap: 'nowrap',
    display: 'flex',
    '@media screen and (max-width: 1351px)': {
      display: 'block',
    },
  },
});

const mapStateToProps = ({ customerMng, router }) => {
  const queryString = parseQueryStr(router.location.search);
  return { customerMng, queryString };
};

const mapDispatchToProps = {
  setReduxValues,
  setDetailBindCustomer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Detail));
