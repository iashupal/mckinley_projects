import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Paper } from '@material-ui/core';
import classnames from 'classnames';
import ContentCard from 'components/ContentCard';
import Box from 'components/BoxOld';
import Button from 'components/Button';
import ButtonN from 'components/ButtonN';
import PageTitle from 'components/PageTitle';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import Fields, { FieldItem } from 'components/Fields';
import { R, RU } from 'helpers/ramda';
import profile from 'assets/images/profile.png';
import DialogUserInfo from 'app/routes/Customer/View/ShareComponents/DialogUserInfo';
import DialogLawFirmInfo from 'app/routes/Customer/View/ShareComponents/DialogLawFirmInfo';
import {
  setDetailBindCompany,
  setReduxValues,
  handleDataCompanyMember,
  setListFetchCompanyMember,
} from 'app/routes/Customer/Redux/Action';

const { parseQueryStr, changeURL } = RU;

class Detail extends Component {
  state = {
    tab: 0,
  };

  componentDidMount() {
    const { setDetailBindCompany, setReduxValues } = this.props;

    const { cardID } = this.props.queryString;

    setDetailBindCompany({
      cardID,
      searchValue: '',
    });
    setReduxValues({ _path: 'company', nowMode: 'detail' });
  }

  componentWillUnmount() {
    const { setReduxValues } = this.props;

    setReduxValues({ _path: 'company', nowMode: 'list' }); // 다른 URL 로 벗어나면, 다시 접속시 list 부터 시작
    setReduxValues({ _path: 'company.list', memberList: [] }); // 다른 URL 로 벗어나면, 멤버리스트 초기화 -> 신규 고객 등록에서 대표여부 체크 여부 따지기 위해
  }

  corRegNumberFormat = data => {
    const result = `${data.substr(0, 3)}-${data.substr(3, 2)}-${data.substr(5, 5)}`;

    return result;
  };

  setListData = list => {
    return list.map(item => {
      return {
        id: item.CardID,
        isRepresentative: item.IsRepresentative,
        name: item.Name,
        mobile: item.MobilePhoneNumber,
        email: item.Email,
        phoneNumber: item.PhoneNumber,
        claim: '1건',
        request: '2건/6건',
        consulation: '3건',
        contract: '1건',
      };
    });
  };

  changeTab(tab) {
    this.setState({ tab });
  }

  render() {
    const {
      classes,
      customerMng,
      setReduxValues,
      setDetailBindCompany,
      handleDataCompanyMember,
      setListFetchCompanyMember,
    } = this.props;
    const { tab } = this.state;

    const { isLoading } = customerMng;
    const { detail, list } = customerMng.company;
    const { memberList, memberSearch } = list;

    const {
      cardID,
      photoURL,
      name,
      representativeName,
      email,
      corRegNumber,
      phone,
      faxNumber,
      zipCode,
      address,
      detailAddress,
    } = detail;

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
          <PageTitle icon="class">단체/회사 관리</PageTitle>
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
              label="단체/회사 목록"
              onClick={e => {
                changeURL(`/company`);
              }}
            />
          </Box>
        </Box>
        <div>
          <ContentCard
            title={`${name} 상세`}
            actionButton={
              <div style={{ flexGrow: 3, alignSelf: 'flex-end' }}>
                <DialogLawFirmInfo
                  buttonTitle="단체/회사 수정"
                  title="단체/회사"
                  dialogMode="mod"
                  icon="add_to_queue"
                />
              </div>
            }
            contents={[
              <div className={classnames('pb-3', 'pt-3', 'd-flex', 'flex-direction-row', 'flex-wrap')}>
                <div className="mt-1" style={{ flexGrow: 1 }}>
                  <Box>
                    <Box style={{ textAlign: 'center' }}>
                      <img
                        style={{ width: '12em', height: '12em' }}
                        src={photoURL === null ? profile : photoURL}
                        alt="프로필 사진"
                      />
                    </Box>
                  </Box>
                </div>

                <div className="mt-4 d-flex flex-wrap  justify-content-center" style={{ flexGrow: 1 }}>
                  <div style={{ width: '450px' }}>
                    <Fields>
                      <FieldItem title="회사명">{name}</FieldItem>
                      <FieldItem title="대표명">{representativeName}</FieldItem>
                      <FieldItem title="이메일">{email}</FieldItem>
                      <FieldItem title="사업자 등록번호">{this.corRegNumberFormat(corRegNumber)}</FieldItem>
                      <FieldItem title="전화번호">{phone}</FieldItem>
                    </Fields>
                  </div>
                  <div style={{ width: '450px' }}>
                    <Fields>
                      <FieldItem title="팩스">{faxNumber}</FieldItem>
                      <FieldItem title="주소">
                        <div>
                          {zipCode}
                          <br />
                          <br />
                          {address}
                          <br />
                          <br />
                          {detailAddress}
                        </div>
                      </FieldItem>
                    </Fields>
                  </div>
                </div>
                {/* <div className="mt-4" style={{ flexGrow: 1 }}>
                <Fields>
                  <FieldItem title="팩스">{faxNumber}</FieldItem>
                  <FieldItem title="주소">
                    <div>
                      {zipCode}
                      <br />
                      <br />
                      {address}
                      <br />
                      <br />
                      {detailAddress}
                    </div>
                  </FieldItem>
                </Fields>
              </div> */}
              </div>,
            ]}
          />

          <div className="mt-3">
            <ContentCard
              title={`${name} 고객 목록`}
              actionButton={
                <DialogUserInfo
                  buttonTitle="신규 고객"
                  title="고객"
                  dialogMode="create"
                  icon="add_to_queue"
                  companyInfo={detail}
                />
              }
              contents={[
                <Table
                  isLoading={isLoading}
                  initOrder="asc"
                  initOrderBy="name"
                  condComponents={
                    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                      <div style={{ flexGorw: 1 }}>
                        <InputBox
                          type="text"
                          value={memberSearch.searchValue}
                          placeholder="고객명"
                          iconName="Search"
                          onChange={e => {
                            setReduxValues({ _path: 'company.list.memberSearch', searchValue: e.target.value });
                          }}
                          handleSubmit={() => {
                            setListFetchCompanyMember({ cardID, searchValue: memberSearch.searchValue });
                          }}
                        />
                      </div>
                    </div>
                  }
                  mngIconsWidth="50px"
                  mngIcons={id => (
                    <>
                      <Button
                        size="square"
                        icon="border_color"
                        color="success"
                        onClick={async e => {
                          handleDataCompanyMember({ cardID: id });
                        }}
                      />
                    </>
                  )}
                  customColumn={[
                    {
                      field: 'name',
                      component: ({ row }) => (
                        <div>
                          {row.name}
                          {row.isRepresentative === 1 && <i className="zmdi zmdi-star" />}
                        </div>
                      ),
                    },
                  ]}
                  rows={[
                    { id: 'name', numeric: false, type: 'text', disablePadding: true, label: '고객명', width: '15%' },
                    { id: 'mobile', numeric: false, type: 'text', disablePadding: true, label: '핸드폰' },
                    { id: 'email', numeric: false, type: 'text', disablePadding: true, label: '이메일', width: '15%' },
                    { id: 'phoneNumber', numeric: false, type: 'text', disablePadding: true, label: '전화번호' },
                    { id: 'claim', numeric: false, disablePadding: true, label: '청구 건수', width: '9%' },
                    { id: 'request', numeric: false, disablePadding: true, label: '의뢰 건수', width: '9%' },
                    { id: 'consulation', numeric: false, disablePadding: true, label: '상담 건수', width: '9%' },
                    { id: 'contract', numeric: false, disablePadding: true, label: '계약 건수', width: '9%' },
                  ]}
                  data={this.setListData(memberList)}
                />,
              ]}
            >
              /
            </ContentCard>
          </div>
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
});

const mapStateToProps = ({ customerMng, router }) => {
  const queryString = parseQueryStr(router.location.search);
  return { customerMng, queryString };
};

const mapDispatchToProps = {
  setReduxValues,
  setDetailBindCompany,
  handleDataCompanyMember,
  setListFetchCompanyMember,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Detail));
