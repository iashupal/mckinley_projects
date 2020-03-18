import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import PageTitle from 'components/PageTitle';
import DocumentComponent from 'components/Document';
import { RU } from 'helpers/ramda';
import { NotificationManager } from 'react-notifications';
import { handleCommonAlertConfirmSet } from 'actions/Default/Common';
import {
  setReduxValues,
  handleFetch,
  handleSave,
  handleDelete,
  handleChange,
  clearFileList,
  clearDialogData,
  clearAllData,
  handleCaseFileFetch,
} from '../Redux/Action';

const { mlMessage, checkDocumentData, removeFileOnS3, addCategoryInFileList } = RU;

class DocumentMng extends Component {
  componentDidMount = () => {
    this.clearDocumentStoreValue();
    const { handleFetch, MyLFID, selectedCase, setReduxValues } = this.props;
    setReduxValues({ isTotalDocMode: !selectedCase });

    if (selectedCase) {
      setReduxValues({ existingFileIDOfSelectedCase: selectedCase.fileRefID });
    }

    handleFetch({ LFID: MyLFID });
  };

  clearDocumentStoreValue = async () => {
    const { clearAllData, files, bizCode } = this.props;

    if (files && files.length > 0) {
      for (const file of files) {
        if (!file.flag || file.flag === 0) removeFileOnS3(file.key);
      }
    }
    clearAllData({ bizCode });
  };

  handleFileAddInList = target => {
    const { files, setReduxValues } = this.props;
    const result = files.concat(target);
    setReduxValues({ files: result });
  };

  handleFileRemoveInList = target => {
    const { files, setReduxValues } = this.props;
    const result = files.filter(file => file.key !== target);
    setReduxValues({ files: result });
  };

  handleFileDivisionAdd = (fileKey, fileDivision) => {
    const { files, setReduxValues } = this.props;
    const result = addCategoryInFileList({ files, fileKey, fileDivision });
    setReduxValues({ files: result });
    setReduxValues({ _path: 'documentSave', fileDivision: { fileKey, key: fileDivision } });
  };

  checkValidation = () => {
    const { files, documentSave, isTotalDocMode, selectedItem } = this.props;
    const alertMsg = checkDocumentData({ files, documentSave, isTotalDocMode, selectedItem });
    if (alertMsg.length > 0) {
      NotificationManager.info(alertMsg.join(', '), '아래 값들을 확인해 주시기 바랍니다.');
      return false;
    }
    return true;
  };

  handleDocumentSave = () => {
    const { files, handleSave, MyLFID, documentSave, selectedCase, selectedItem, isTotalDocMode } = this.props;
    const { fileInflux } = documentSave;

    if (!isTotalDocMode) {
      const { caseID, fileRefID } = selectedCase;
      handleSave({ files, LFID: MyLFID, bizCode: fileInflux.key, id: caseID, fileRefID, isNewFileRefID: true });
    } else if (selectedItem.id && selectedItem.fileRefID) {
      const { id, fileRefID } = selectedItem;
      handleSave({ files, LFID: MyLFID, bizCode: fileInflux.key, id, fileRefID });
    } else if (selectedItem.id && !selectedItem.fileRefID) {
      const { id } = selectedItem;
      handleSave({ files, LFID: MyLFID, bizCode: fileInflux.key, id });
    } else {
      handleSave({ files, LFID: MyLFID, bizCode: fileInflux.key });
    }

    return true;
  };

  handleDocumentDelete = id => {
    const { MyLFID, handleCommonAlertConfirmSet } = this.props;
    const idInfo = id.split('_');
    const fileID = idInfo[0];
    const key = idInfo[1];

    handleCommonAlertConfirmSet({
      msgObj: {
        title: mlMessage('alertDialog.delete'),
        contents: '',
        isConfirm: true,
      },
      waitDatas: {
        name: 'documentDelete',
        value: { key, fileRefID: fileID, LFID: MyLFID },
      },
    });
  };

  searchDocument = () => {
    const { documentSearch, handleFetch, MyLFID } = this.props;
    const { fileInflux, fileDivision, searchText } = documentSearch;
    handleFetch({ LFID: MyLFID, bizCode: fileInflux, categoryCode: fileDivision, searchText });
  };

  handleChange = (flag, value, key) => {
    this.props.handleChange({ flag, value, key });
  };

  render() {
    const {
      files,
      fetchFiles,
      documentSearch,
      documentSave,
      isLoading,
      classes,
      BIZCODE_SELECT,
      FILECAT_SELECT,
      bizCode,
      inputBoxPlaceHolder,
      isHideProviderSelectBox,
      isHideInfluxSelectBoxAndInputBox,
      clearFileList,
      clearDialogData,
      rows,
      existingFileIDOfSelectedCase,
    } = this.props;

    return (
      <div className={bizCode ? '' : classes.container}>
        {!bizCode && (
          <Box
            mb={1}
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
          >
            <PageTitle icon="class">{mlMessage('pages.document.title')}</PageTitle>
          </Box>
        )}

        <div className={bizCode ? '' : classes.content}>
          <div>
            <DocumentComponent
              files={files}
              fetchFiles={fetchFiles || []}
              handleFileAdd={this.handleFileAddInList}
              handleFileRemove={this.handleFileRemoveInList}
              handleFileDivisionAdd={this.handleFileDivisionAdd}
              handleSave={this.handleDocumentSave}
              handleDelete={this.handleDocumentDelete}
              handleChange={this.handleChange}
              searchDocument={this.searchDocument}
              searchKeysOfDivision={documentSearch.fileDivision.map(val => val.key)}
              searchKeysOfInflux={documentSearch.fileInflux.map(val => val.key)}
              saveKeyOfInflux={documentSave.fileInflux.key}
              bizCode={BIZCODE_SELECT || []}
              fileChart={FILECAT_SELECT || []}
              inputBoxPlaceHolder={inputBoxPlaceHolder || '파일/사건/등록자'}
              isHideInfluxSelectBoxAndInputBox={isHideInfluxSelectBoxAndInputBox}
              isLoading={isLoading}
              initOrder="desc"
              initOrderBy="createDate"
              isHideProviderSelectBox={isHideProviderSelectBox || false}
              isHideTitle={!!bizCode || false}
              clearFileList={clearFileList}
              clearDialogData={clearDialogData}
              checkValidation={this.checkValidation}
              existingFileIDOfSelectedCase={existingFileIDOfSelectedCase}
              rows={
                rows || [
                  { id: 'name', type: 'text', label: '파일', align: 'left', width: '20%' },
                  { id: 'caseTitle', type: 'text', label: '송무/자문', align: 'left', width: '30%' },
                  { id: 'categoryCode', type: 'text', label: '구분', width: '10%' },
                  { id: 'bizCode', type: 'text', label: '유입처', width: '10%' },
                  { id: 'size', type: 'text', align: 'right', label: '크기', width: '10%' },
                  { id: 'createDate', type: 'date', label: '등록일', width: '10%' },
                  { id: 'createUser', type: 'text', label: '등록자', width: '10%' },
                ]
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    gridTemplateColumns: '1fr',
    padding: 30,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    },
  },
});

const mapStateToProps = ({ documentMng, auth, common }) => {
  const {
    files,
    fetchFiles,
    documentSave,
    documentSearch,
    dialogListInfo,
    isLoading,
    isTotalDocMode,
    existingFileIDOfSelectedCase,
  } = documentMng;
  const { MyLFID } = auth.authUser;
  const { BIZCODE_SELECT, FILECAT_SELECT } = common.allCodes;
  const { selectedItem } = dialogListInfo;
  return {
    files,
    fetchFiles,
    documentSave,
    documentSearch,
    isLoading,
    MyLFID,
    BIZCODE_SELECT,
    FILECAT_SELECT,
    selectedItem,
    isTotalDocMode,
    existingFileIDOfSelectedCase,
  };
};

const mapDispatchToProps = {
  setReduxValues,
  handleFetch,
  handleSave,
  handleDelete,
  handleChange,
  handleCommonAlertConfirmSet,
  clearFileList,
  clearDialogData,
  clearAllData,
  handleCaseFileFetch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(DocumentMng));
