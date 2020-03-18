import React, { useState } from 'react';
import Dialog from 'components/Dialog';
import Button from 'components/Button';
import { EditorW } from 'helpers/ui';

const EditorTest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState('<p>init-editor-value</p>');

  return (
    <div className="app-wrapper">
      <EditorW value={value} handleChange={e => setValue(e)} />
      <br />
      EDITOR-VALUE >> <br />
      {value}
      <br />
      <br />
      <br />
      <div>* EditorW 의 initHeight 속성 테스트 (고정 길이로, Editor 로드 완료시 변화 없도록.)</div>
      <Button
        size="small"
        color="primary"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Dialog Open
      </Button>
      <Dialog title="test" open={isOpen}>
        <EditorW initHeight={380} initWidth={550} />
        <Button
          size="small"
          color="dark"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Dialog Close
        </Button>
      </Dialog>
    </div>
  );
};

export default EditorTest;
