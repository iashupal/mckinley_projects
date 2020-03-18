import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import TaskComponent from 'components/Task';
import Box from 'components/BoxOld';
import PageTitle from 'components/PageTitle';
import Tab from 'components/Tab';

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

class TaskMng extends Component {
  state = {
    tab: 0,
  };

  changeTab = tab => {
    this.setState({ tab });
    console.log(tab);
  };

  render() {
    const { tab } = this.state;
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
          <PageTitle icon="class">Task</PageTitle>
        </Box>
        <div>
          <TaskComponent />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(TaskMng);
