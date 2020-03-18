import React, { Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import { connect } from 'react-redux';
import { setReduxValues, handleCommonAlertOK } from 'actions/Default/Common';
import Box from 'components/BoxOld';
import ButtonN from 'components/ButtonN';

class AlertDialog extends React.Component {
  render() {
    const { alertMsgOpen, alertMsg, alertWaitDatas, setReduxValues, handleCommonAlertOK } = this.props;
    const { title, contents, isConfirm } = alertMsg;

    return (
      <div>
        <Dialog
          open={alertMsgOpen || false}
          onClose={e => setReduxValues({ alertMsgOpen: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContentText
            id="alert-dialog-description"
            style={{ borderTop: '1px', borderTopStyle: 'solid', marginLeft: '25px', marginRight: '25px' }}
          >
            &nbsp;
          </DialogContentText>
          <DialogContent id="alert-dialog-description">{contents}</DialogContent>
          <DialogContentText id="alert-dialog-description">&nbsp;</DialogContentText>
          <Box display="flex" justifyContent="center" flexDirection="row">
            <ButtonN
              onClick={e => {
                if (isConfirm) handleCommonAlertOK(alertWaitDatas);
                setReduxValues({ alertMsgOpen: false });
              }}
              color="primary"
              label="확인"
            />
            {isConfirm && (
              <ButtonN onClick={e => setReduxValues({ alertMsgOpen: false })} color="inverted" label="취소" />
            )}
          </Box>
          <DialogContentText id="alert-dialog-description">&nbsp;</DialogContentText>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = ({ common }) => {
  const { alertMsg, alertMsgOpen, alertWaitDatas } = common;
  return { alertMsg, alertMsgOpen, alertWaitDatas };
};

const mapDispatchToProps = {
  setReduxValues,
  handleCommonAlertOK,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlertDialog);
