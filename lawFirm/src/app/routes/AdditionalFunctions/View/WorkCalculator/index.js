import React from 'react';
import Tab from 'components/Tab';
import Box from 'components/BoxOld';
import { withStyles } from '@material-ui/core';
import PageTitle from 'components/PageTitle';
import SequestrationCost from './SequestrationCost';
import LawsuitCost from './LawsuitCost';
import ValueOfRealProperty from './ValueOfRealProperty';
import PeriodInterest from './PeriodInterest';

class WorkCalculator extends React.Component {
  state = {
    tab: 0,
  };

  changeTab = tab => {
    this.setState({ tab });
  };

  render() {
    const { tab } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Box mb={1}>
          <PageTitle icon="class">추가기능</PageTitle>
        </Box>
        <div className={classes.content}>
          <Box display="flex" flexDirection="row" flexWrap="wrap">
            <Tab selected={tab === 0} text="부동산가액 계산기" onClick={() => this.changeTab(0)} />
            <Tab selected={tab === 1} text="소송비용 계산기" onClick={() => this.changeTab(1)} />
            <Tab selected={tab === 2} text="기간, 이자 계산기" onClick={() => this.changeTab(2)} />
            <Tab selected={tab === 3} text="가압류비용 계산기" onClick={() => this.changeTab(3)} />
          </Box>
          {tab === 0 && <ValueOfRealProperty />}
          {tab === 1 && <LawsuitCost />}
          {tab === 2 && <PeriodInterest />}
          {tab === 3 && <SequestrationCost />}
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

export default withStyles(styles)(WorkCalculator);
