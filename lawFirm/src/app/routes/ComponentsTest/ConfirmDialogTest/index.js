import React, { useState } from 'react';
import ButtonN from 'components/ButtonN';
import ConfirmDialog from 'components/ConfirmDialog';

const ConfirmDialogTest = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="app-wrapper">
      <ButtonN
        color="primary"
        onClick={e => {
          setOpen(true);
        }}
        label="Confirm-Test"
      />
      <ConfirmDialog
        title="제목 입니다"
        message="상세 내용 입니다"
        isOpen={isOpen}
        handleOK={e => {
          setOpen(false);
          alert('action, function 실행');
        }}
        handleNO={e => {
          setOpen(false);
        }}
      />
    </div>
  );
};

export default ConfirmDialogTest;
