import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Button from 'components/Button';
import ButtonN from 'components/ButtonN';
import DialogInfoForm from 'components/DialogInfoForm';
import ContractListDialogInfo from 'components/ListDialog/ContractListDialogInfo';
import ConsultListDialogInfo from 'components/ListDialog/ConsultListDialogInfo';
import CaseListDialogInfo from 'components/ListDialog/CaseListDialogInfo';
import DueDateDialogInfo from 'components/ListDialog/DueDateDialogInfo';
import { withStyles } from '@material-ui/core';
import classnames from 'classnames';
import { R, RU } from 'helpers/ramda';
import axios from 'axios';
import { urlMaster, getAjaxData } from 'helpers/ajax';
import Select from 'components/Select';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import Box from 'components/BoxOld';
import { NotificationManager } from 'react-notifications';
import {
  setReduxValues,
  handleContractListFetch,
  handleContractFileFetch,
  handleConsultListFetch,
  handleConsultFileFetch,
  handleCaseListFetch,
  handleCaseFileFetch,
  handleDuedateListFetch,
  handleDuedateFileFetch,
  handleDelete,
} from 'app/routes/Document/Redux/Action';
import FileTable from './FileTable';

const { checkUploadFileExt, checkFileSize, mlMessage, removeFileOnS3, clearFilesFromS3 } = RU;
const FLAG_SAVE_SELECT_BOX_INFLUX = 'FLAG_SAVE_SELECT_BOX_INFLUX';

class DropZone extends Component {
  state = {
    isOpenDialog: false,
    dialogTitle: '',
    caseType: '',
  };

  removeFile = async (fileRefID, key, flag) => {
    const { handleDelete } = this.props;
    // Delete : S3 File Storage.
    removeFileOnS3(key);
    // Delete : File Data (Redux)
    this.props.handleFileRemove(key);
    // Delete : DB
    if (flag === 1 || flag === '1') {
      handleDelete({ fileRefID, key, noListFetch: true });
    }
  };

  checkFileSize = fileSize => {
    const alertMsg = checkFileSize(fileSize);
    if (alertMsg.length > 0) {
      NotificationManager.info(alertMsg.join(', '), '파일업로드 최대용량 1GB 초과.');
      return false;
    }
    return true;
  };

  saveSelectedItemInfo = (id, title, fileRefID) => {
    const { setReduxValues } = this.props;
    setReduxValues({
      _path: 'dialogListInfo.selectedItem',
      id,
      title,
      fileRefID,
    });
  };

  closeDialog = () => {
    this.setState({ isOpenDialog: false });
  };

  render() {
    const {
      classes,
      LFID,
      isPublicFile, // Public Image Upload (html-Editor or UserProfile) 시에는 true!
      files,
      handleFileAdd,
      handleFileDivisionAdd,
      isHideInfluxSelectBoxAndInputBox,
      handleChange,
      saveKeyOfInflux,
      bizCode,
      fileChart,
      existingFileIDOfSelectedCase,
      existingFileID,
    } = this.props;
    let dropzoneRef;

    const { isOpenDialog, dialogTitle, caseType } = this.state;

    return (
      <>
        <div>
          {isHideInfluxSelectBoxAndInputBox ? (
            <div style={{ marginBottom: '10px', textAlign: 'right' }}>
              <Button
                color="inverted"
                onClick={e => {
                  dropzoneRef.open();
                }}
              >
                {mlMessage('pages.document.chooseFile')}
              </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', wrap: 'wrap' }}>
              <div>
                <Select
                  style={{ marginLeft: '-5px', marginBottom: '5px' }}
                  placeholder={mlMessage('pages.document.fileInflux')}
                  selectedKey={saveKeyOfInflux}
                  options={[
                    { key: 0, text: mlMessage('pages.document.fileInflux'), itemType: DropdownMenuItemType.Header },
                  ].concat(bizCode || [])}
                  onChange={(event, selectedOption) => {
                    handleChange(FLAG_SAVE_SELECT_BOX_INFLUX, selectedOption.text, selectedOption.key);
                    clearFilesFromS3(files);
                    this.props.setReduxValues({ files: [] });
                  }}
                />
              </div>
              <div style={{ display: 'flex', wrap: 'wrap', justifyContent: 'space-between', flexGrow: 1 }}>
                <div style={{ marginTop: '3px' }}>
                  {saveKeyOfInflux && saveKeyOfInflux !== '' && saveKeyOfInflux !== 'BIZCODE_B99-C00' && (
                    <Button
                      size="square"
                      color="inverted"
                      onClick={() => {
                        if (saveKeyOfInflux === 'BIZCODE_B01-C00') {
                          this.setState({ dialogTitle: mlMessage('pages.consultation.listTitle') });
                          this.props.handleConsultListFetch({ LFID });
                        }
                        if (saveKeyOfInflux === 'BIZCODE_B02-C00') {
                          this.setState({ dialogTitle: mlMessage('pages.listDialog.contractList') });
                          this.props.handleContractListFetch({ LFID });
                        }
                        if (saveKeyOfInflux === 'BIZCODE_B03-C00') {
                          this.setState({ dialogTitle: mlMessage('pages.listDialog.litigationList'), caseType: 'L' });
                          this.props.handleCaseListFetch({ LFID, caseType: 'L', searchText: '' });
                        }

                        if (saveKeyOfInflux === 'BIZCODE_B03-C01') {
                          // 송무/업무 파일
                        }

                        if (saveKeyOfInflux === 'BIZCODE_B03-C02') {
                          // 송무/메모 파일
                        }

                        if (saveKeyOfInflux === 'BIZCODE_B03-C03') {
                          this.setState({
                            dialogTitle: mlMessage('pages.listDialog.litigationDueDateList'),
                            caseType: 'L',
                          });
                          this.props.handleDuedateListFetch({ LFID, caseType: 'L', searchText: '' });
                        }

                        if (saveKeyOfInflux === 'BIZCODE_B04-C00') {
                          this.setState({ dialogTitle: mlMessage('pages.listDialog.adviceList'), caseType: 'A' });
                          this.props.handleCaseListFetch({ LFID, caseType: 'A', searchText: '' });
                        }

                        if (saveKeyOfInflux === 'BIZCODE_B04-C01') {
                          // 자문/업무 파일
                        }

                        if (saveKeyOfInflux === 'BIZCODE_B04-C02') {
                          // 자문/메모 파일
                        }

                        if (saveKeyOfInflux === 'BIZCODE_B04-C03') {
                          this.setState({
                            dialogTitle: mlMessage('pages.listDialog.adviceDueDateList'),
                            caseType: 'L',
                          });
                          this.props.handleDuedateListFetch({ LFID, caseType: 'A', searchText: '' });
                        }

                        this.setState({ isOpenDialog: true });
                      }}
                    >
                      <Box>
                        {saveKeyOfInflux === 'BIZCODE_B01-C00' && mlMessage('pages.contract.choiceConsultation')}
                        {saveKeyOfInflux === 'BIZCODE_B02-C00' && mlMessage('pages.consultation.choiceContract')}
                        {saveKeyOfInflux === 'BIZCODE_B03-C00' && mlMessage('pages.listDialog.litigationChoice')}
                        {saveKeyOfInflux === 'BIZCODE_B03-C01' && '송무/업무 선택'}
                        {saveKeyOfInflux === 'BIZCODE_B03-C02' && '송무/메모 선택'}
                        {saveKeyOfInflux === 'BIZCODE_B03-C03' && mlMessage('pages.listDialog.litigationDuedateChoice')}
                        {saveKeyOfInflux === 'BIZCODE_B04-C00' && mlMessage('pages.listDialog.adviceChoice')}
                        {saveKeyOfInflux === 'BIZCODE_B04-C01' && '자문/업무 선택'}
                        {saveKeyOfInflux === 'BIZCODE_B04-C02' && '자문/메모 선택'}
                        {saveKeyOfInflux === 'BIZCODE_B04-C03' && mlMessage('pages.listDialog.adviceDuedateChoice')}
                      </Box>
                    </Button>
                  )}
                </div>

                <div style={{ marginTop: '2px' }}>
                  <Button
                    color="inverted"
                    onClick={e => {
                      dropzoneRef.open();
                    }}
                  >
                    {mlMessage('pages.document.chooseFile')}
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="text-right">
            {this.props.selectedItem.title && (
              <div style={{ textAlign: 'left', marginBottom: '2px' }}>{`제목 : ${this.props.selectedItem.title}`}</div>
            )}

            <Dropzone
              className={classes.dropzoneSize}
              ref={node => {
                dropzoneRef = node;
              }}
              onDrop={async (accepted, rejected) => {
                const data = new FormData();
                let validationFlag = true;
                data.append('LFID', LFID);

                if (isPublicFile) {
                  data.append('ACL', 'public-read');
                }

                if (existingFileIDOfSelectedCase) {
                  data.append('existingFileID', existingFileIDOfSelectedCase);
                } else if (this.props.selectedItem.fileRefID) {
                  data.append('existingFileID', this.props.selectedItem.fileRefID);
                } else if (existingFileID) {
                  data.append('existingFileID', existingFileID);
                }

                accepted.forEach(file => {
                  const fileExt = R.pipe(
                    R.split('.'),
                    R.last,
                  )(file.name);

                  if (!this.checkFileSize({ fileSize: file.size, fileName: file.name })) {
                    validationFlag = false;
                    return;
                  }

                  if (checkUploadFileExt(fileExt) || isPublicFile) {
                    data.append('file', file);
                  }
                });

                // 파일 관련된 사항은 axios 라이브러리를 직접 이용.
                if (validationFlag) {
                  const res = await axios.post(`${urlMaster}/ext/file`, data);
                  const result = getAjaxData(res);
                  handleFileAdd(result);
                }
              }}
            >
              <p style={{ marginTop: '10px', marginRight: '20px' }}>Drag N Drop Zone</p>
            </Dropzone>
          </div>
        </div>
        <div
          className={classnames({
            'pb-3': true,
            'd-none': isPublicFile,
          })}
        />
        <div
          className={classnames({
            'pb-3': true,
            'd-none': isPublicFile,
          })}
        />
        <FileTable
          files={files}
          removeFile={this.removeFile}
          fileChart={fileChart || []}
          handleFileDivisionAdd={handleFileDivisionAdd}
        />

        <>
          <DialogInfoForm
            title={dialogTitle}
            open={isOpenDialog}
            actions={
              <ButtonN
                color="inverted"
                type="large"
                onClick={() => this.setState({ isOpenDialog: false })}
                label="닫기"
              />
            }
            fullWidth
            maxWidth="md"
          >
            {saveKeyOfInflux === 'BIZCODE_B01-C00' && (
              <ConsultListDialogInfo
                LFID={LFID}
                consultList={this.props.consultList}
                saveSelectedItemInfo={this.saveSelectedItemInfo}
                handleConsultListFetch={this.props.handleConsultListFetch}
                handleConsultFileFetch={this.props.handleConsultFileFetch}
                isLoading={this.props.isLoading}
                closeDialog={this.closeDialog}
              />
            )}

            {saveKeyOfInflux === 'BIZCODE_B02-C00' && (
              <ContractListDialogInfo
                LFID={LFID}
                contractList={this.props.contractList}
                saveSelectedItemInfo={this.saveSelectedItemInfo}
                handleContractFileFetch={this.props.handleContractFileFetch}
                handleContractListFetch={this.props.handleContractListFetch}
                isLoading={this.props.isLoading}
                closeDialog={this.closeDialog}
              />
            )}

            {(saveKeyOfInflux === 'BIZCODE_B03-C00' || saveKeyOfInflux === 'BIZCODE_B04-C00') && (
              <CaseListDialogInfo
                LFID={LFID}
                caseList={caseType === 'L' ? this.props.litigationList : this.props.adviceList}
                saveSelectedItemInfo={this.saveSelectedItemInfo}
                handleCaseListFetch={this.props.handleCaseListFetch}
                handleCaseFileFetch={this.props.handleCaseFileFetch}
                isLoading={this.props.isLoading}
                closeDialog={this.closeDialog}
                caseType={caseType}
              />
            )}

            {(saveKeyOfInflux === 'BIZCODE_B03-C03' || saveKeyOfInflux === 'BIZCODE_B04-C03') && (
              <DueDateDialogInfo
                LFID={LFID}
                dueDateList={this.props.dueDateList}
                saveSelectedItemInfo={this.saveSelectedItemInfo}
                handleDuedateListFetch={this.props.handleDuedateListFetch}
                handleDuedateFileFetch={this.props.handleDuedateFileFetch}
                isLoading={this.props.isLoading}
                closeDialog={this.closeDialog}
                caseType={caseType}
              />
            )}
          </DialogInfoForm>
        </>
      </>
    );
  }
}

const styles = theme => ({
  dropzoneSize: {
    position: 'relative',
    width: '100%',
    height: '300px',
    borderWidth: '2px;',
    borderColor: 'rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderRadius: '5px',
  },
});

const mapStateToProps = ({ documentMng }) => {
  const { dialogListInfo } = documentMng;
  const {
    contractList,
    consultList,
    litigationList,
    adviceList,
    dueDateList,
    selectedItem,
    isLoading,
  } = dialogListInfo;
  return {
    contractList,
    consultList,
    litigationList,
    adviceList,
    dueDateList,
    selectedItem,
    isLoading,
  };
};

const mapDispatchToProps = {
  setReduxValues,
  handleContractListFetch,
  handleContractFileFetch,
  handleConsultListFetch,
  handleConsultFileFetch,
  handleCaseListFetch,
  handleCaseFileFetch,
  handleDuedateListFetch,
  handleDuedateFileFetch,
  handleDelete,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(DropZone));
