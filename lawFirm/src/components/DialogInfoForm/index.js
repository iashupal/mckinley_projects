import React, { Component } from 'react';
import { Divider, Dialog as MaterialDialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class DialogInfoForm extends Component {
  render() {
    const { title, children, actions, onClose, open, maxWidth, fullWidth, topContent } = this.props;

    if (open) {
      setTimeout(() => {
        // MS-Fabric/Select 를 내부에서 사용시, 바로 닫히는 현상으로 인해 추가 (TabIndex 부분을 직접 제거)
        document.getElementsByClassName('MuiDialog-container')[0].removeAttribute('tabIndex');
      }, 0);
    }

    const applyFullWidth = fullWidth === undefined ? true : fullWidth;

    return (
      <MaterialDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={applyFullWidth}
        maxWidth={maxWidth || 'sm'}
      >
        {title && (
          <DialogTitle id="customized-dialog-title" onClose={onClose}>
            {title}
          </DialogTitle>
        )}
        {topContent && <div>{topContent}</div>}
        {/* 구분선이 2개씩 나와 주석 처리함 -> 필요시 주석 제거 */}
        {/* <Divider className="mb-3" /> */}
        <DialogContent dividers>{children}</DialogContent>
        {/* 구분선이 2개씩 나와 주석 처리함 -> 필요시 주석 제거 */}
        {/* <Divider className="mb-3" /> */}
        {actions && <DialogActions className="justify-content-center mb-3">{actions}</DialogActions>}
      </MaterialDialog>
    );
  }
}

export default DialogInfoForm;
