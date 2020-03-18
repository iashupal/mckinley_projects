import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RU } from 'helpers/ramda';
import PageTitle from 'components/PageTitle';
import ButtonN from 'components/ButtonN';
import Box from 'components/BoxOld';
import { withStyles } from '@material-ui/core';
import {
  handleDetailBindFetch as handleContractDetailBindFetch,
  clearData as handleClearContractDetail,
} from 'app/routes/Contract/Redux/Action';
import {
  setDetailBind as handleConsultDetailBindFetch,
  handleClearSaveData as handleClearConsultDetail,
} from 'app/routes/Consultation/Redux/Action';
import {
  setDetailBindList as handleCaseDetailBindFetch,
  clearCaseInfo as handleClearCaseData,
} from 'app/routes/Case/Redux/Action';
import Main from './SharedComponents/Main';
import CategoryManagement from './SharedComponents/CategoryManagement';
import MultipleRegistration from './SharedComponents/MultipleRegistration';
import TCStatus from './SharedComponents/TCStatus';
import {
  setReduxValues,
  handleTimeSheetSave,
  handleTimeSheetFetch,
  handleTimeChange,
  fetchDetailBind,
  handleTimeSheetModify,
  handleTimeSheetDelete,
  handleSearchTimeCharge,
  handleContractListFetch,
  handleConsultListFetch,
  handleCaseListFetch,
} from '../Redux/Action';

const { mlMessage } = RU;

class TimeSheetMng extends Component {
  state = {
    pageName: 'Main',
  };

  componentDidMount = () => {};

  render() {
    const { pageName } = this.state;
    const {
      classes,
      setReduxValues,
      timeSheet,
      autoComplete,
      BIZCT_SELECT,
      handleTimeSheetSave,
      handleTimeChange,
      handleTimeSheetFetch,
      MyLFID,
      fetchDetailBind,
      handleTimeSheetModify,
      handleTimeSheetDelete,
      handleSearchTimeCharge,
      handleContractDetailBindFetch,
      handleClearContractDetail,
      contractDetail,
      handleConsultDetailBindFetch,
      handleClearConsultDetail,
      consultDetail,
      handleCaseDetailBindFetch,
      handleClearCaseData,
      handleContractListFetch,
      handleConsultListFetch,
      handleCaseListFetch,
      caseDetail,
      FILECAT_SELECT,
      CSCTYPE_SELECT,
    } = this.props;

    return (
      <>
        <div className={classes.container}>
          <Box
            mb={1}
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
            <PageTitle icon="class">타임시트</PageTitle>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <ButtonN
                color="primary"
                onClick={() => {
                  this.setState({ pageName: 'TCStatus' });
                }}
                label="TC 현황"
              />
              <ButtonN
                color="primary"
                onClick={() => {
                  this.setState({ pageName: 'CategoryMng' });
                }}
                label="타임시트 분류항목"
              />
              <ButtonN
                color="primary"
                onClick={() => {
                  this.setState({ pageName: 'MultipleReg' });
                }}
                label="복수 등록"
              />
              <ButtonN
                color="primary"
                onClick={() => {
                  this.setState({ pageName: 'Main' });
                }}
                label="타임시트"
              />
            </div>
          </Box>
          {pageName === 'Main' && (
            <Main
              timeSheet={timeSheet}
              setReduxValues={setReduxValues}
              autoComplete={autoComplete}
              bizCode={BIZCT_SELECT}
              handleTimeSheetSave={handleTimeSheetSave}
              handleTimeChange={handleTimeChange}
              handleFetch={handleTimeSheetFetch}
              fetchDetailBind={fetchDetailBind}
              handleTimeSheetModify={handleTimeSheetModify}
              handleTimeSheetDelete={handleTimeSheetDelete}
              handleSearchTimeCharge={handleSearchTimeCharge}
              handleContractDetailBindFetch={handleContractDetailBindFetch}
              handleClearContractDetail={handleClearContractDetail}
              contractDetail={contractDetail}
              handleConsultDetailBindFetch={handleConsultDetailBindFetch}
              handleClearConsultDetail={handleClearConsultDetail}
              consultDetail={consultDetail}
              handleCaseDetailBindFetch={handleCaseDetailBindFetch}
              handleClearCaseData={handleClearCaseData}
              caseDetail={caseDetail}
              MyLFID={MyLFID}
              FILECAT_SELECT={FILECAT_SELECT}
              CSCTYPE_SELECT={CSCTYPE_SELECT}
              handleContractListFetch={handleContractListFetch}
              handleConsultListFetch={handleConsultListFetch}
              handleCaseListFetch={handleCaseListFetch}
            />
          )}
          {pageName === 'CategoryMng' && <CategoryManagement />}
          {pageName === 'MultipleReg' && <MultipleRegistration />}
          {pageName === 'TCStatus' && <TCStatus />}
        </div>
      </>
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

const mapStateToProps = ({ auth, timeSheet, common, contract, consultationMng, case_ }) => {
  const { MyLFID } = auth.authUser;
  const { autoComplete, allCodes } = common;
  const { contractDetail } = contract;
  const { save: consultDetail } = consultationMng;
  const { caseInfo: caseDetail } = case_.detail;
  const { BIZCT_SELECT, FILECAT_SELECT, CSCTYPE_SELECT } = allCodes;
  return {
    MyLFID,
    timeSheet,
    autoComplete,
    BIZCT_SELECT,
    contractDetail,
    consultDetail,
    caseDetail,
    FILECAT_SELECT,
    CSCTYPE_SELECT,
  };
};

const mapDispatchToProps = {
  setReduxValues,
  handleTimeSheetSave,
  handleTimeSheetFetch,
  handleTimeChange,
  fetchDetailBind,
  handleTimeSheetModify,
  handleTimeSheetDelete,
  handleSearchTimeCharge,
  handleContractDetailBindFetch,
  handleClearContractDetail,
  handleConsultDetailBindFetch,
  handleClearConsultDetail,
  handleCaseDetailBindFetch,
  handleClearCaseData,
  handleContractListFetch,
  handleConsultListFetch,
  handleCaseListFetch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(TimeSheetMng));
