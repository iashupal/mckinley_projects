import React from 'react';
import ButtonN from 'components/ButtonN';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import Box from 'components/BoxOld';
import PropTypes from 'prop-types';

const ConfirmDialog = ({
  title,
  message,
  labelOK,
  labelNO,
  isNoClickHide,
  isOpen,
  handleClose,
  handleOK,
  handleNO,
}) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContentText
          style={{ borderTop: '1px', borderTopStyle: 'solid', marginLeft: '25px', marginRight: '25px' }}
        >
          &nbsp;
        </DialogContentText>
        <DialogContent>{message}</DialogContent>
        <DialogContentText>&nbsp;</DialogContentText>
        <Box display="flex" justifyContent="center" flexDirection="row">
          <ButtonN onClick={handleOK} color="primary" label={labelOK} />
          {!isNoClickHide && <ButtonN onClick={handleNO} color="inverted" label={labelNO} />}
        </Box>
        <DialogContentText>&nbsp;</DialogContentText>
      </Dialog>
    </div>
  );
};

export default ConfirmDialog;

ConfirmDialog.propTypes = {
  title: PropTypes.string, // 제목
  message: PropTypes.string, // 메세지
  labelOK: PropTypes.string, // '확인' text 변경
  labelNO: PropTypes.string, // '취소' text 변경
  isNoClickHide: PropTypes.bool, // 취소버튼 감추기
  isOpen: PropTypes.bool, // Open 여부
  handleClose: PropTypes.func, // 화면 밖에 클릭시 처리 -> Yes 또는 No 가 꼭 클릭되어야 한다면 사용금지.
  handleOK: PropTypes.func, // OK 선택시
  handleNO: PropTypes.func, // NO 선택시
};

ConfirmDialog.defaultProps = {
  title: '',
  message: '',
  labelOK: '확인',
  labelNO: '취소',
  isNoClickHide: false,
  isOpen: false,
  handleClose: () => {},
  handleOK: () => {},
  handleNO: () => {},
};
