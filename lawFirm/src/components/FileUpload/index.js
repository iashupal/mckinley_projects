import React, { Component } from 'react';
import { R, RU } from 'helpers/ramda';
import Button from 'components/Button';
import NumberFormat from 'react-number-format';
import Dialog from 'components/Dialog';
import Box from 'components/BoxOld';
import DropZone from './DropZone';

const { readFile, mlMessage, convertFileSize } = RU;

class DragDrop extends Component {
  state = {
    dialog: '',
  };

  openDialog = () => {
    this.setState({
      dialog: 'open',
    });
  };

  closeDialog = () => {
    this.setState({
      dialog: '',
    });
  };

  render() {
    const {
      showDownloadList,
      hideButton,
      files,
      isPublicFile, // Public Image Upload (html-Editor or UserProfile) 시에는 true!
      handleFileAdd,
      handleFileRemove,
      LFID,
      fileChart,
      saveKeyOfDivision,
      handleFileDivisionAdd,
      isHideInfluxSelectBoxAndInputBox,
      existingFileID,
    } = this.props;

    return (
      <div>
        {!hideButton && (
          <Button
            icon="unarchive"
            color="primary"
            onClick={e => {
              this.openDialog();
            }}
          >
            <Box pr={2}>{mlMessage('component.file.upload')}</Box>
          </Button>
        )}

        {showDownloadList && (
          <div>
            {files &&
              files.map((n, index) => {
                const convertedSizeInfo = convertFileSize(n.size);
                return (
                  <div style={{ paddingLeft: '5px', paddingTop: '5px' }} key={index}>
                    <div
                      role="button"
                      tabIndex="0"
                      style={{ cursor: 'pointer', color: '#3F51B5', outline: 'none' }}
                      onClick={async e => {
                        readFile(n.key, n.name);
                      }}
                    >
                      {n.name}
                      &nbsp;
                      {'('}
                      <NumberFormat
                        value={convertedSizeInfo.value}
                        displayType="text"
                        thousandSeparator
                        suffix={convertedSizeInfo.unit}
                      />
                      {')'}
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        <Dialog open={this.state.dialog !== ''}>
          <DropZone
            files={files}
            isPublicFile={isPublicFile}
            handleFileAdd={handleFileAdd}
            handleFileRemove={handleFileRemove}
            LFID={LFID}
            closeDialog={this.closeDialog}
            fileChart={fileChart || []}
            handleFileDivisionAdd={handleFileDivisionAdd}
            saveKeyOfDivision={saveKeyOfDivision}
            isHideInfluxSelectBoxAndInputBox={isHideInfluxSelectBoxAndInputBox}
            existingFileID={existingFileID}
          />

          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            <Button
              color="inverted"
              size="large"
              mode="regular"
              onClick={e => {
                this.closeDialog();
              }}
            >
              <Box pl={5} pr={5}>
                {mlMessage('pages.common.button.close')}
              </Box>
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default DragDrop;
