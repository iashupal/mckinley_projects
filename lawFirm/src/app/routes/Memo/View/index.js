import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import PageTitle from 'components/PageTitle';
import Box from 'components/BoxOld';
import MemoComponent from 'components/Memo';

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

class MemoMng extends Component {
  render() {
    const { classes } = this.props;
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
          <PageTitle icon="class">메모</PageTitle>
        </Box>
        <div>
          <MemoComponent
          // caseList={caseList}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({}) => {
  return {};
};
const mapDispatchToProps = {};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(MemoMng));
