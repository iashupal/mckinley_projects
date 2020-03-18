import React, { Component, Fragment } from 'react';
import File from 'components/File';

class FileUploadTest extends Component {
  state = {
    files: [],
  };

  handleFileAdd = target => {
    const { files } = this.state;
    const result = files.concat(target);
    this.setState({ files: result });
  };

  handleFileRemove = target => {
    const { files } = this.state;
    const result = files.filter(file => file.key !== target);
    this.setState({ files: result });
  };

  render() {
    const { files } = this.state;
    return (
      <div className="app-wrapper">
        파일 선택이 바로 동작해야 할 상황에서만 사용, 일반적으로 DragNDrop 사용!
        <br />
        <File
          // LFID : 저장할 파일의 위치이므로 자신이 파일을 저장시키고자하는 법인의 아이디를 기입
          files={files || null}
          handleFileAdd={target => this.handleFileAdd(target)}
          handleFileRemove={target => this.handleFileRemove(target)}
          LFID={1}
        />
      </div>
    );
  }
}

export default FileUploadTest;
