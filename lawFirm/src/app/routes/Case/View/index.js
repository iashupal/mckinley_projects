import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import PageTitle from 'components/PageTitle';
import Button from 'components/Button';
import Tab from 'components/Tab';
import { RU } from 'helpers/ramda';
import CaseDetailTab from './Detail';
import Create from './Create';
import TaskTab from './Task';
import CaseMemo from './Memo';
import DueDate from './DueDate';
import Document from './Document';
import SMS from './SMS';
import ContractConsulationHistory from './ContractConsulationHistory';
import TC from './TC';
import Consultation from './Consultation';
import { handleFetch, setReduxValues } from '../Redux/Action';

const { parseQueryStr, mlMessage, changeURL } = RU;

class Case extends Component {
  state = {
    isEditTab: false,
    tab: 0,
  };

  componentDidMount = () => {
    const { queryString, handleFetch, setReduxValues } = this.props;
    const { LFID, caseUUID, caseType } = queryString;
    setReduxValues({ caseType });
    handleFetch({ LFID, caseUUID, caseType });
  };

  toggleEditTab = () => {
    this.setState({ isEditTab: !this.state.isEditTab });
  };

  changeTab = tab => {
    this.setState({ tab });
  };

  render() {
    const { classes, common, case_, auth } = this.props;
    const { caseType } = case_;
    const { authUser } = auth;
    const { isEditTab, tab } = this.state;
    const { selectedCase } = common;
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
          <PageTitle icon="class">
            {authUser.MyLFIDInfo.LawFirmBrand} / {`${selectedCase.managementNo} - ${selectedCase.title}`}
          </PageTitle>
          <Button
            icon="add_to_queue"
            mode="rightIcon"
            color="primary"
            onClick={() => changeURL(`/Case/save?caseType=${caseType}&mode=2&caseUUID=${selectedCase.caseUUID}`)}
          >
            <Box pr={2}>{`${caseType === 'L' ? '송무' : '자문'} 수정하기`}</Box>
          </Button>
        </Box>
        <div className={classes.content}>
          <div>
            <Box display="flex" flexDirection="row" flexWrap="wrap">
              <Tab
                selected={tab === 0}
                text={`${caseType === 'L' ? '송무' : '자문'} 상세`}
                onClick={() => this.changeTab(0)}
              />
              <Tab selected={tab === 1} text="Task" onClick={() => this.changeTab(1)} />
              <Tab selected={tab === 2} text="메모" onClick={() => this.changeTab(2)} />
              <Tab selected={tab === 3} text="기일" onClick={() => this.changeTab(3)} />
              <Tab selected={tab === 4} text="문서/파일" onClick={() => this.changeTab(4)} />
              <Tab selected={tab === 5} text="SMS" onClick={() => this.changeTab(5)} />
              <Tab selected={tab === 6} text="상담" onClick={() => this.changeTab(6)} />
              <Tab selected={tab === 7} text="TC" onClick={() => this.changeTab(7)} />
            </Box>
            {tab === 0 && <CaseDetailTab />}
            {tab === 1 && <TaskTab />}
            {tab === 2 && <CaseMemo />}
            {tab === 3 && <DueDate />}
            {tab === 4 && <Document caseType={caseType} selectedCase={selectedCase || {}} />}
            {tab === 5 && <SMS />}
            {tab === 6 && <Consultation selectedCase={selectedCase || {}} />}
            {tab === 7 && <TC />}
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

const mapStateToProps = ({ case_, router, auth }) => {
  const { common } = case_;
  const queryString = parseQueryStr(router.location.search);
  return {
    auth,
    case_,
    common,
    queryString,
  };
};

const mapDispatchToProps = { handleFetch, setReduxValues };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Case));
