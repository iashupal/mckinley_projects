import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { setReduxValues } from '../../Redux/Action';
import DueDateList from './DueDateList';
import DueDateForm from './DueDateForm';

const styles = theme => ({
  taskTabContainer: {
    display: 'grid',
    gridTemplateColumns: '8fr 4fr',
    gridTemplateRows: '1fr',
    gridGap: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
});

class DueDate extends Component{
  componentDidMount = () => {
    const { setReduxValues } = this.props;
    setReduxValues({formMode: ''})
  }

  render(){
    const { classes, formMode } = this.props;
    return(
      <div className={classes.taskTabContainer}>
        <DueDateList />
        {formMode!==''&&
        <DueDateForm />
      }
      </div>
    );
  }
}
const mapStateToProps = ({ case_ }) => {
  const { formMode } = case_;
  return {
    formMode,
  }
};
const mapDispatchToProps = {
  setReduxValues,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(DueDate));