import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import PageTitle from 'components/PageTitle';
import Button from 'components/Button';
import List from 'app/routes/Customer/View/Individual/List';
import Detail from 'app/routes/Customer/View/Individual/Detail';
import { setReduxValues } from 'app/routes/Customer/Redux/Action';

class Individual extends Component {
  render() {
    const { classes, customerMng, setReduxValues } = this.props;
    const { individual } = customerMng;
    const { nowMode, detail } = individual;

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
          <PageTitle icon="class">개인 고객 관리</PageTitle>
          <Box
            mb={1}
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
            {nowMode === 'detail' && (
              <Button
                color="primary"
                onClick={e => {
                  setReduxValues({ _path: 'individual', nowMode: 'list' });
                }}
              >
                <Box pl={1} pr={1}>
                  개인 목록
                </Box>
              </Button>
            )}
          </Box>
        </Box>
        <div className={classes.content}>
          {nowMode === 'list' && <List />}

          {nowMode === 'detail' && <Detail />}
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

const mapStateToProps = ({ customerMng }) => {
  return { customerMng };
};

const mapDispatchToProps = {
  setReduxValues,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Individual));
