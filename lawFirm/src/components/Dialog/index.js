import React, { Component } from 'react';
import { Dialog as MaterialDialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class Dialog extends Component {
  render() {
    const { title, children, actions, onClose, open, maxWidth, fullWidth } = this.props;

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
        open={open || false}
        fullWidth={applyFullWidth}
        maxWidth={maxWidth || 'sm'}
      >
        {title && (
          <DialogTitle id="customized-dialog-title" onClose={onClose}>
            {title}
          </DialogTitle>
        )}
        <DialogContent dividers>{children}</DialogContent>
        {actions && <DialogActions className="justify-content-center mb-3">{actions}</DialogActions>}
      </MaterialDialog>
    );
  }
}

export default Dialog;
