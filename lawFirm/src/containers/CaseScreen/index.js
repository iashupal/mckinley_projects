import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import AlignBox from '../../components/AlignBox';
import PageTitle from '../../components/PageTitle';
import Button from '../../components/Button';
import Tab from '../../components/Tab';
import CaseDetailTab from './CaseDetailsTab';
import EditCaseTab from './EditCaseTab';
import TaskTab from './TaskTab';
import CaseMemo from './CaseMemo';
import SmsTest from '.../../../src/app/routes/ComponentsTest2/SmsTest';

class CaseScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditTab: false,
      tab: 0,
    };
    this.toggleInitial = this.toggleEditTab.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  toggleEditTab() {
    this.setState({ isEditTab: !this.state.isEditTab });
  }

  changeTab(tab) {
    this.setState({ tab });
  }

  render() {
    const { classes } = this.props;
    const { isEditTab, tab } = this.state;
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
          <PageTitle icon="class">한국 애자일 / 0001-주주권 확인</PageTitle>
          <Button icon="add_to_queue" mode="rightIcon" color="primary" onClick={() => this.toggleEditTab()}>
            <Box pr={2}>사건 수정하기</Box>
          </Button>
        </Box>
        <div className={classes.content}>
          {isEditTab ? (
            <EditCaseTab />
          ) : (
            <div>
              <Box display="flex" flexDirection="row">
                <Tab selected={tab === 0} text="사건 상세" onClick={() => this.changeTab(0)} />
                <Tab selected={tab === 1} text="Task (업무)" onClick={() => this.changeTab(1)} />
                <Tab selected={tab === 2} text="사건 메모" onClick={() => this.changeTab(2)} />
                <Tab selected={tab === 3} text="SMS" onClick={() => this.changeTab(3)} />
              </Box>
              {tab === 0 && <CaseDetailTab />}
              {tab === 1 && <TaskTab />}
              {tab === 2 && <CaseMemo />}
              {tab === 3 && <SmsTest />}
            </div>
          )}
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

export default withStyles(styles)(CaseScreen);
