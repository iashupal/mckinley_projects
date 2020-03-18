import React, { Component } from 'react';
import Button from 'components/Button';
import Dropzone from 'react-dropzone';
import { R, RU } from 'helpers/ramda';
import axios from 'axios';
import { urlMaster, PostCall, getAjaxData } from 'helpers/ajax';
import NumberFormat from 'react-number-format';
import { ButtonW, BlankSpan } from 'helpers/ui';
import Box from 'components/BoxOld';
import classnames from 'classnames';
import { NotificationManager } from 'react-notifications';

const { checkUploadFileExt, mlMessage, changeURL, readFile } = RU;

class File extends Component {
  removeFile = async key => {
    // Delete : S3 File Storage.
    await PostCall('/ext/file_delete', { key });

    // Delete : File Data (DB-mysql)
    if (this.props.fileID) {
      await PostCall('/file/remove', { fileID: this.props.fileID, key });
    }

    // Delete : File Data (Redux)
    this.props.handleFileRemove(key);
  };

  render() {
    const {
      isPublicFile, // Public Image Upload (html-Editor or UserProfile) 시에는 true!
      files,
      handleFileAdd,
      isReadOnly,
      toolTipMsg,
      LFID,
      btnStyle,
    } = this.props;

    let dropzoneRef;
    return (
      <>
        {!isReadOnly && (
          <ButtonW
            handleClick={e => {
              dropzoneRef.open();
            }}
            toolTipMsg={toolTipMsg}
          >
            <i className="zmdi zmdi-attachment-alt" />
          </ButtonW>
        )}
        {btnStyle && isReadOnly && (
          <Button
            color="primary"
            size="small"
            onClick={e => {
              dropzoneRef.open();
            }}
          >
            <Box pl={1} pr={1}>
              이미지 첨부
            </Box>
          </Button>
        )}
        <div className="d-flex flex-wrap">
          {files &&
            files.map(n => {
              return (
                <div key={n.key} className="mb-1 mr-1">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={e => {
                      readFile(n.key, n.name);
                    }}
                  >
                    {n.name}
                    <BlankSpan num={1} />
                    {'('}
                    <NumberFormat value={n.size} displayType="text" thousandSeparator />
                    <BlankSpan num={1} />
                    {'byte)'}
                  </Button>
                  {!isReadOnly && (
                    <Button
                      onClick={e => {
                        this.removeFile(n.key);
                      }}
                    >
                      <i className="zmdi zmdi-delete zmdi-hc-2x " />
                    </Button>
                  )}
                </div>
              );
            })}
        </div>
        <div>
          <div className="text-right">
            <Dropzone
              ref={node => {
                dropzoneRef = node;
              }}
              onDrop={async (accepted, rejected) => {
                const data = new FormData();
                data.append('LFID', LFID);

                if (isPublicFile) {
                  data.append('ACL', 'public-read');
                }

                R.map(file => {
                  const fileExt = R.pipe(
                    R.split('.'),
                    R.last,
                  )(file.name);
                  if (checkUploadFileExt(fileExt) || isPublicFile) {
                    data.append('file', file);
                  }
                  return null;
                })(accepted);

                // 파일 관련된 사항은 axios 라이브러리를 직접 이용.
                const res = await axios.post(`${urlMaster}/ext/file`, data);
                const result = getAjaxData(res);
                handleFileAdd(result);
              }}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        <div
          className={classnames({
            'pb-3': true,
            'd-none': isPublicFile,
          })}
        />
      </>
    );
  }
}

export default File;
