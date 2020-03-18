import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import Box from 'components/BoxOld';
import Button from 'components/Button';
import { setReduxValues } from '../../Redux/Action';

class SMSSend extends Component {
  render(){
    const { setReduxValues } = this.props;
    return (
      <div style={{textAlign:'right'}}>
        <Button 
          color="primary"
          onClick={()=>{ setReduxValues({_path: 'SMS', isDialogOpen: true})}}
        >
          <Box>안내 문구 불러오기</Box>
        </Button>
      </div>
    );
  }
}
const mapStateToProps = () => {
};
const mapDispatchToProps = {
  setReduxValues,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SMSSend);