import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { RU, R } from 'helpers/ramda';
import DialogInfoForm from 'components/DialogInfoForm';
import Table from 'components/Table/EnhancedTable';
import ActivityItem from 'components/ActivityItem';
import RadioButton from 'components/RadioButton';
import InputBox from 'components/InputBox';
import DatePicker from 'components/DatePicker';
import AutoComplete from 'components/AutoComplete';
import Button from 'components/Button';
import ButtonN from 'components/ButtonN';
import ContentCard from 'components/ContentCard';
import GridTable, { GridRow } from 'components/GridTable';
import Box from 'components/BoxOld';
import Popper from '@material-ui/core/Popper';
import Information from 'components/Information';
import Filter from 'components/Table/Filter';
import 'styles/ui/_datepicker.scss';
import 'styles/pages/_screen.scss';
import Fields, { FieldItem } from 'components/Fields';
import { clearData, handleDetailBindFetch as handleContractDetailBindFetch } from 'app/routes/Contract/Redux/Action';
import ContractDetail from 'app/routes/Contract/View/SharedComponents/DetailComponent';
import { setDetailBindList, handleContractID, setContractList, clearCaseInfo } from '../../Redux/Action';
import CaseDetail from './CaseDetail';

const { parseQueryStr, mlMessage, changeURL } = RU;

class Detail extends Component {
  state = {
    anchorEl: null,
    contractDetialdialog: false,
    contractSelectDialog: false,
    contractSearchValue: '',
  };

  componentDidMount = () => {
    const { queryString, setDetailBindList } = this.props;
    const { LFID, caseUUID, caseType } = queryString;
    setDetailBindList({
      LFID,
      caseUUID,
      caseType,
    });
  };

  setDetailDialogTrue = async () => {
    const { MyLFID, case_, handleContractDetailBindFetch } = this.props;
    const { contractUUID } = case_.detail.caseInfo;

    await handleContractDetailBindFetch({ LFID: MyLFID, contractID: contractUUID, formMode: 'des' });
    this.setState({
      contractDetialdialog: true,
    });
  };

  setSelectDialogTrue = async () => {
    const { setContractList } = this.props;
    const { contractSearchValue } = this.state;
    setContractList({ searchValue: contractSearchValue });
    this.setState({
      contractSelectDialog: true,
    });
  };

  render() {
    const {
      classes,
      case_,
      contractDetail,
      MyLFID,
      handleContractID,
      clearCaseInfo,
      setContractList,
      clearData,
    } = this.props;
    const { caseType, detail, common } = case_;
    const { selectedCase, contractList } = common;
    const { caseID, caseUUID } = selectedCase;
    const { caseInfo, supremeCourt, party } = detail;

    const { anchorEl, contractSearchValue } = this.state;

    return (
      <div className={classes.mainContainer}>
        {/* Flex Column 1 */}
        <div>
          <div className="mb-3">
            <ContentCard
              title={`${caseType === 'L' ? '송무' : '자문'} 상세 정보`}
              contents={[
                <>
                  <CaseDetail
                    caseInfo={caseInfo}
                    MyLFID={MyLFID}
                    setSelectDialogTrue={this.setSelectDialogTrue}
                    setDetailDialogTrue={this.setDetailDialogTrue}
                    clearCaseInfo={clearCaseInfo}
                  />
                </>,
              ]}
            />
          </div>
          {caseType === 'L' && (
            <div className="mb-3">
              <ContentCard
                title="대법원 사건정보"
                actionButton={<Button color="primary">대법원 사건매치/업데이트</Button>}
                contents={[
                  <div className="row">
                    {supremeCourt.caseNumber !== null && (
                      <>
                        <div className="col-md-5 pl-4">
                          <Fields>
                            <FieldItem title="법원 기관명">{supremeCourt.courtOrg}</FieldItem>
                            <FieldItem title="장소 (재판정)">{supremeCourt.courtLocation}</FieldItem>
                          </Fields>
                        </div>
                        <div className="col-md-7">
                          <GridTable colWidth1="30%" colWidth2="70%">
                            <GridRow title="사건번호">{supremeCourt.caseNumber}</GridRow>
                            <GridRow title="사건명">{supremeCourt.caseName}</GridRow>
                            <GridRow title="전자소송 여부">
                              {supremeCourt.isElectronicLitigation === 0 ? '미소송' : '소송'}
                            </GridRow>
                            <GridRow title="재판부">{supremeCourt.courtPanel}</GridRow>
                            <GridRow title="재판부 연락처">{supremeCourt.phoneNumber}</GridRow>
                          </GridTable>
                        </div>
                      </>
                    )}
                  </div>,
                ]}
              />
            </div>
          )}

          <div className="mb-3">
            <ContentCard
              title=""
              contents={[<div className={classes.timeSheetSection}>타임시트 (타임 항목과 청구 현황)</div>]}
            />
          </div>
        </div>
        {/* Flex Column 2 */}
        <div>
          <div className="mb-3">
            <ContentCard
              title="의뢰인/상대방 정보"
              actionButton={<Button color="dark">관련자 연결하기</Button>}
              contents={[
                <div className={classes.clientSectionLeft}>
                  <div className={classes.profileIconContainer}>
                    <i className="material-icons icon-color">account_circle</i>
                    <span className={classes.profileText}>{party.client}</span>
                  </div>
                  <Fields>
                    <FieldItem title="전화번호">
                      {`${party.mobilePhoneNumber ? `${party.mobilePhoneNumber} (HP)` : ''}`}
                    </FieldItem>
                    <FieldItem title="이메일">{party.email}</FieldItem>
                  </Fields>
                </div>,
                <div className={classes.clientSectionRight}>
                  <Fields>
                    <FieldItem title="상대방">{party.opposing}</FieldItem>
                    <FieldItem title="제 3자 (관계인)">{party.third}</FieldItem>
                  </Fields>
                </div>,
              ]}
            />
          </div>
          <div className="mb-3">
            <ContentCard
              title={`${caseType === 'L' ? '송무' : '자문'} 이력`}
              actionButton={
                <div>
                  <Button
                    aria-describedby="simple-popper"
                    variant="contained"
                    onClick={e => {
                      this.setState({ anchorEl: anchorEl ? null : e.currentTarget });
                    }}
                  >
                    <i className="material-icons icon-color">filter_list</i>
                  </Button>
                  <Popper
                    id="simple-popper"
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    transition
                    placement="bottom-end"
                    onClose={e => {
                      this.setState({ anchorEl: null });
                    }}
                  >
                    <Filter
                      filterList={
                        [
                          // { id: 'Name', numeric: false, disablePadding: true, label: '이름'},
                          // { id: 'Test', numeric: false, disablePadding: true, label: '직원 유형'},
                          // { id: 'Date', numeric: false, disablePadding: true, label: '날짜'},
                        ]
                      }
                      filterAvailFields={[
                        { key: 'Name', text: '이름', type: 'text' },
                        { key: 'Test', text: '직원 유형', type: 'text' },
                        { key: 'Date', text: '날짜', type: 'text' },
                      ]}
                      allFieldInfo={[
                        { id: 'Name', numeric: false, disablePadding: true, label: '이름', type: 'text' },
                        { id: 'Test', numeric: false, disablePadding: true, label: '직원 유형', type: 'text' },
                        { id: 'Date', numeric: false, disablePadding: true, label: '날짜', type: 'text' },
                      ]}
                      originalData={[{ id: 1, Name: '이희규', Test: '변호사', Date: '2019-07-22' }]}
                      // handleAdd={this.props.handleFilterAdd}
                      // handleReset={this.props.handleFilterReset}
                      handleClose={e => {
                        this.setState({ anchorEl: null });
                      }}
                    />
                  </Popper>
                </div>
              }
              contents={[
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Information
                    contents={[
                      {
                        title: '2018-03-30 (목)',
                        child: (
                          <div>
                            <br />
                            <ActivityItem name="박정필-변호사" addedItem="타임시트" time="3:32PM" />
                            <br />
                            <ActivityItem name="박정필-변호사" addedItem="메시지" time="3:32PM" />
                          </div>
                        ),
                      },
                      {
                        title: '2018-03-30 (화)',
                        child: (
                          <div>
                            <br />
                            <ActivityItem name="박정필-변호사" addedItem="송무메모" time="3:32PM" />
                            <br />
                            <ActivityItem name="박정필-변호사" addedItem="사진" time="3:32PM" />
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>,
              ]}
            />
          </div>
        </div>

        {/* 계약 상세 Dialog */}
        <DialogInfoForm
          open={this.state.contractDetialdialog}
          maxWidth="md"
          onClose={() => {}}
          fullWidth
          noMargin
          title="계약 상세"
          actions={
            <ButtonN
              color="inverted"
              type="large"
              onClick={() => this.setState({ contractDetialdialog: false })}
              label="닫기"
            />
          }
        >
          <ContractDetail formMode="des" MyLFID={MyLFID} contractDetail={contractDetail} clearData={clearData} />
        </DialogInfoForm>

        {/* 계약 선택 Dialog */}
        <DialogInfoForm
          title={mlMessage('pages.consultation.choiceContract')}
          open={this.state.contractSelectDialog}
          actions={
            <ButtonN
              color="inverted"
              type="large"
              onClick={() => this.setState({ contractSelectDialog: false })}
              label={mlMessage('pages.common.button.close')}
            />
          }
          fullWidth
          maxWidth="md"
        >
          <Table
            initRowsPerPage={5}
            initOrder="desc"
            initOrderBy="ContractDate"
            multiKey={['ContractUUID']}
            rows={[
              { id: 'clientName', label: '의뢰인' },
              { id: 'managerName', label: '담당자' },
              { id: 'Title', label: mlMessage('pages.contract.title'), align: 'left' },
              { id: 'ContractDate', label: mlMessage('pages.contract.contractDate') },
            ]}
            data={contractList || []}
            mngIcons={(id, rows) => (
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  handleContractID({
                    LawFirmID: MyLFID,
                    CaseID: caseID,
                    ContractID: rows.ContractID,
                    CaseUUID: caseUUID,
                    CaseType: caseType,
                  });
                  this.setState({ ...this.state, contractSelectDialog: false });
                }}
              >
                <Box>{mlMessage('pages.common.button.choice')}</Box>
              </Button>
            )}
            condComponents={
              <>
                <div style={{ marginLeft: '5px' }}>
                  <InputBox
                    placeholder={mlMessage('pages.contract.searchPlaceholder')}
                    iconName="Search"
                    value={contractSearchValue}
                    onChange={e => {
                      this.setState({
                        ...this.state,
                        contractSearchValue: e.target.value,
                      });
                    }}
                    handleSubmit={e => {
                      setContractList({ searchValue: contractSearchValue });
                    }}
                  />
                </div>
              </>
            }
            mngIconsWidth="80px"
          />
        </DialogInfoForm>
      </div>
    );
  }
}
// }

const styles = theme => ({
  // 사건 상세 탭 그리드 컨테이너
  mainContainer: {
    display: 'grid',
    gridTemplateColumns: '6fr 5fr',
    gridColumnGap: '15px',
    paddingTop: '10px',
    paddingBottom: '10px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  // 의뢰인/상대방 정보 카드 섹션
  clientSectionLeft: {
    padding: 10,
    position: 'relative',
    borderRight: '1.5px dotted lightgray',
    [theme.breakpoints.down('sm')]: {
      borderRight: '0',
    },
  },
  clientSectionRight: {
    padding: 10,
    marginTop: 35,
    marginLeft: 10,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginTop: 35,
    },
  },
  profileIconContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileText: {
    verticalAlign: 'middle',
    marginLeft: 10,
  },
  // 대법원 사건 정보 카드 섹션
  timeSheetSection: {
    marginTop: -50, // Header margin (15) + content padding  (35)
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    color: '#e8e8e8',
  },
});

const mapStateToProps = ({ auth, case_, router, contract }) => {
  const { MyLFID } = auth.authUser;
  const { contractDetail } = contract;
  const queryString = parseQueryStr(router.location.search);
  return {
    MyLFID,
    contractDetail,
    case_,
    queryString,
  };
};

const mapDispatchToProps = {
  setDetailBindList,
  handleContractDetailBindFetch,
  handleContractID,
  setContractList,
  clearCaseInfo,
  clearData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Detail));
