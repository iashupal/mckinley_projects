import React from 'react';
import Popover from '@material-ui/core/Popover';
import { withStyles } from '@material-ui/core/styles';

const StyledPopover = withStyles(() => ({
  paper: {
    overflow: 'visible',
  },
}))(Popover);

export default ({ id, open, anchorEl, handleClose, children }) => {
  if (anchorEl) {
    setTimeout(() => {
      // MS-Fabric/Select 를 내부에서 사용시, 바로 닫히는 현상으로 인해 추가 (TabIndex 부분을 직접 제거)
      document.getElementsByClassName('MuiPopover-paper')[0].removeAttribute('tabIndex');
    }, 0);
  }

  return (
    <StyledPopover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {children}
    </StyledPopover>
  );
};
