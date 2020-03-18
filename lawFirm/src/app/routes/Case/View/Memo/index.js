import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { RU } from 'helpers/ramda';
import { setReduxValues } from '../../Redux/Action';
import MemoList from './MemoList';
import MemoForm from './MemoForm';

const { mlMessage } = RU;

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
  submitButtonContainer: {
    width: '100%',
    textAlign: 'center',
  },
});

const GridTitle = ({titleMessage, isNecessary, isDetail})=>{
  const titleStyle = {fontSize:'0.875rem', fontWeight: 'bold', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',};
  return(
    <div style={titleStyle}>
      {mlMessage(titleMessage)}
      {!isDetail && isNecessary && <span className="text-danger">*</span>}
    </div>
  );
};

class Memo extends Component {
  componentDidMount = () => {
    const { setReduxValues } = this.props;
    setReduxValues({formMode: ''})
  }
  
  render(){
    const { classes, formMode } = this.props;
    const style = {
      color: 'rgba(0, 0, 0, 0.7)',
      fontSize: '0.875rem',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1',
    };
    
    return (
      <div>
        <div className={classes.taskTabContainer}>
          <MemoList />
          {formMode!==''&&
          <MemoForm />
      }
        </div>

      </div>
    )
  }
}

const mapStateToProps = ({ case_ }) => {
  const { formMode } = case_;
  return{
    formMode,
  };
};
const mapDispatchToProps = {
  setReduxValues,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Memo));