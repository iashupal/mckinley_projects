import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { DialogBtnBox } from 'helpers/ui';
import ListDetailContainer from 'components/ListDetailContainer';
import ContentCard from 'components/ContentCard';
import Box from 'components/BoxOld';
import Divider from '@material-ui/core/Divider';
import { RU } from 'helpers/ramda';
import InputBox from 'components/InputBox';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Table from 'components/Table/EnhancedTable';
import Button from 'components/Button';
import { handleCommonAlertConfirmSet } from 'actions/Default/Common';
import SMSList from './SMSList';
import SMSSend from './SMSSend';
import SMSContents from './SMSContents';
import { setReduxValues } from '../../Redux/Action';

const { mlMessage } = RU;

const styles = theme => ({
  sectionLayout: {
    display: 'grid',

    gridTemplateColumns: 'auto 450px',
    gridTemplateRows: '1fr',
    gridGap: '10px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  halfSectionLeft: {
    padding: '10px',
    borderRight: '1px solid lightgray',
    [theme.breakpoints.down('md')]: {
      borderRight: '0',
    },
  },
});

class SMS extends Component {
  componentDidMount = () => {
    const { setReduxValues } = this.props;
    setReduxValues({
      _path: 'SMS',
      isDialogOpen: false,
    });
  };

  render() {
    const { classes, handleCommonAlertConfirmSet, setReduxValues, SMS } = this.props;
    const { isDialogOpen } = SMS;
    return (
      <div>
        <ContentCard
          title="title"
          customHeader={<h2>SMS 발신 관리</h2>}
          contents={[
            <div style={{ marginTop: '-10px' }}>
              <div className={classes.sectionLayout}>
                <div className={classes.halfSectionLeft}>
                  <SMSList />
                </div>
                <div>
                  <SMSSend />
                </div>
              </div>
            </div>,
          ]}
        />
        <Dialog
          open={isDialogOpen}
          fullWidth
          // fullScreen
          maxWidth="sm"
        >
          <DialogTitle>SMS 문구 관리</DialogTitle>
          <Divider />
          <br />
          <DialogContent style={{ height: '600px' }}>
            <SMSContents />
          </DialogContent>
          <DialogBtnBox>
            <Button
              size="large"
              mode="regular"
              color="inverted"
              onClick={() => setReduxValues({ _path: 'SMS', isDialogOpen: false })}
            >
              <Box pl={5} pr={5}>
                닫기
              </Box>
            </Button>
          </DialogBtnBox>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ case_ }) => {
  const { SMS } = case_;
  return {
    SMS,
  };
};
const mapDispatchToProps = {
  setReduxValues,
  handleCommonAlertConfirmSet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SMS));
