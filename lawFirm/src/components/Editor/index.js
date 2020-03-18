import CKEditor from 'ckeditor4-react';
import React from 'react';
import { RU } from 'helpers/ramda';
import axios from 'axios';
import { urlMaster } from 'helpers/ajax';

const { convertEditorText } = RU;

const CK = ({ value, handleChange, myremoveButtons }) => {
  const onFileUploadRequest = async evt => {
    evt.stop();

    const { file } = evt.data.fileLoader;

    const data = new FormData();
    data.append('token', localStorage.getItem('token'));
    data.append('ACL', 'public-read');
    data.append('file', file);

    // 파일 관련된 사항은 axios 라이브러리를 직접 이용.
    const result = await axios.post(`${urlMaster}/ext/imagefileupload`, data);
    const { url } = result.data;
    const urlStr = `<img alt="" src="${url}" />`;

    const fragment = evt.editor
      .getSelection()
      .getRanges()[0]
      .extractContents();

    const container = CKEDITOR.dom.element.createFromHtml(urlStr, evt.editor.document);
    fragment.appendTo(container);
    evt.editor.insertElement(container);
  };

  return (
    <CKEditor
      onBeforeLoad={CKEDITOR => {
        CKEDITOR.disableAutoInline = true;
      }}
      data={value}
      onChange={evt => {
        const editorData = evt.editor.getData();
        handleChange(editorData);
      }}
      // 이미지 Paste 기능 (public 권한으로 동작 중, 참고)
      // https://ckeditor.com/docs/ckeditor4/latest/guide/dev_file_upload.html
      config={{
        extraPlugins: 'uploadimage',
        removeButtons: myremoveButtons,
        uploadUrl: `${urlMaster}/ext/imagefileupload`,
      }}
      onFileUploadRequest={onFileUploadRequest}
    />
  );
};

const Editor = ({ value, handleChange, isReadOnly, myremoveButtons, initHeight, initWidth }) => {
  if (isReadOnly) {
    return (
      <div className="row" style={{ wordSpacing: '5px', lineHeight: '25px', margin: '0px auto' }}>
        <div dangerouslySetInnerHTML={{ __html: convertEditorText(value) }} />
      </div>
    );
  }

  const divStyles = {};
  if (initHeight) divStyles.height = initHeight;
  if (initWidth) divStyles.width = initWidth;

  return (
    <div style={divStyles}>
      <CK value={value} handleChange={handleChange} myremoveButtons={myremoveButtons} />
    </div>
  );
};

export default Editor;
