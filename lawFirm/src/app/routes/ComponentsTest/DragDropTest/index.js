import React, { Component } from 'react';
import DragDropPopUp from 'components/FileUpload';
import DragDrop from 'components/FileUpload/DropZone';

// DragDrop LFID props는 파일을 저장할 회사 ID가 들어가야함.
class DragDropTest extends Component {
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
        * normal
        <DragDropPopUp
          files={files || []}
          handleFileAdd={target => this.handleFileAdd(target)}
          handleFileRemove={target => this.handleFileRemove(target)}
          LFID={1}
        />
        <br /> * showDownloadList
        <DragDropPopUp
          files={files || []}
          handleFileAdd={target => this.handleFileAdd(target)}
          handleFileRemove={target => this.handleFileRemove(target)}
          LFID={1}
          showDownloadList
        />
        <br /> * hideButton, showDownloadList
        <DragDropPopUp
          files={files || []}
          handleFileAdd={target => this.handleFileAdd(target)}
          handleFileRemove={target => this.handleFileRemove(target)}
          LFID={1}
          showDownloadList
          hideButton
        />
        <br /> * isHideInfluxSelectBoxAndInputBox
        <DragDropPopUp
          files={files || []}
          handleFileAdd={target => this.handleFileAdd(target)}
          handleFileRemove={target => this.handleFileRemove(target)}
          LFID={1}
          isHideInfluxSelectBoxAndInputBox
        />
        <br /> * PopUp X
        <div
          style={{
            width: '800px',
            height: '400px',
          }}
        >
          <DragDrop
            files={files || null}
            handleFileAdd={target => this.handleFileAdd(target)}
            handleFileRemove={target => this.handleFileRemove(target)}
            LFID={1}
          />
        </div>
      </div>
    );
  }
}

export default DragDropTest;
