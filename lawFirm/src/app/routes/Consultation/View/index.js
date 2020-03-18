import React, { Component } from 'react';
import { connect } from 'react-redux';
import { R, RU } from 'helpers/ramda';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import PageTitle from 'components/PageTitle';
import ConsultationComponent from 'components/Consultation';
import { handleCommonAlertConfirmSet } from 'actions/Default/Common';
import {
  checkInputValue,
  setReduxValues,
  handlePushValue,
  handleRemoveValue,
  handleSaveDraft,
  setListFetch,
  setDetailBind,
  deleteFile,
  setCaseList,
  setContractList,
  handleMappingCaseContract,
  handleClearSaveData,
} from '../Redux/Action';

const { mlMessage, addCategoryInFileList } = RU;

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

class ConsultationMng extends Component {
  componentDidMount = () => {
    const { setReduxValues, handleMappingCaseContract, selectedCase } = this.props;
    if (selectedCase) {
      setReduxValues({ _path: 'save', relatedCase: { CaseUUID: selectedCase.caseUUID, Title: selectedCase.title } });
      handleMappingCaseContract({
        type: 'case',
        value: { CaseUUID: selectedCase.caseUUID, Title: selectedCase.title },
      });
    }
  };

  handleSetRelation = (_path, name, value) => {
    const { setReduxValues, handleMappingCaseContract, save } = this.props;
    setReduxValues({
      _path,
      [name]: value,
    });
    if (name === 'relatedCase') {
      handleMappingCaseContract({ type: 'case', value });
    } else if (name === 'relatedContract') {
      handleMappingCaseContract({ type: 'contract', value });
    }
  };

  setRelatedList = async (type, searchText) => {
    const { save, setCaseList, setContractList } = this.props;
    const { selectCase } = save;
    if (type === 'case') {
      setCaseList({ caseType: selectCase });
    } else if (type === 'contract') {
      setContractList({ searchText });
    }
  };

  handleSelect = async (name, selectedOption) => {
    const { handlePushValue } = this.props;
    handlePushValue({ name, selectedOption });
  };

  handleRemove = async (name, value) => {
    const { handleRemoveValue } = this.props;
    handleRemoveValue({ name, value });
  };

  handleChange = async (_path, name, value, useTable) => {
    const { setReduxValues } = this.props;
    if (useTable) {
      const checkArray = value.filter(data => data.isMain === true);
      const newData = R.clone(value);
      if (checkArray.length === 0 && newData.length > 0) {
        newData[0].isMain = true;
      }
      setReduxValues({
        _path,
        [name]: newData,
      });
    } else {
      setReduxValues({
        _path,
        [name]: value,
      });
    }
  };

  handleChangeDateRange = async (_path, obj) => {
    const { setReduxValues } = this.props;
    if (obj.startDate) {
      setReduxValues({
        _path,
        startDate: obj.startDate,
      });
    }
    if (obj.endDate) {
      setReduxValues({
        _path,
        endDate: obj.endDate,
      });
    }
  };

  handleSubmit = async (startDate, endDate) => {
    const { search, setListFetch, bizCode, selectedCase } = this.props;
    const { searchValue } = search;
    setListFetch({
      startDate,
      endDate,
      searchValue,
      bizCode,
      CaseUUID: selectedCase ? selectedCase.caseUUID : '',
    });
  };

  handleKeyPress = async () => {
    const { search, setListFetch, bizCode, selectedCase } = this.props;
    const { startDate, endDate, searchValue } = search;
    setListFetch({
      startDate,
      endDate,
      searchValue,
      bizCode,
      CaseUUID: selectedCase ? selectedCase.caseUUID : '',
    });
  };

  handleDelete = id => {
    const { handleCommonAlertConfirmSet, bizCode, selectedCase } = this.props;
    handleCommonAlertConfirmSet({
      msgObj: {
        title: mlMessage('alertDialog.delete'),
        contents: '',
        isConfirm: true,
      },
      waitDatas: {
        name: 'consultationDelete',
        value: { id, bizCode, CaseUUID: selectedCase ? selectedCase.caseUUID : '' },
      },
    });
  };

  handleSave = async formMode => {
    const { checkInputValue, bizCode, selectedCase, save } = this.props;
    checkInputValue({ save, formMode, bizCode, CaseUUID: selectedCase ? selectedCase.caseUUID : '' });
  };

  handleFileAdd = target => {
    const { save, setReduxValues } = this.props;
    const { files } = save;
    const result = files.concat(target);
    setReduxValues({
      _path: 'save',
      files: result,
    });
  };

  handleFileRemove = target => {
    const { save, setReduxValues, deleteFile } = this.props;
    const { files, fileRefID } = save;
    const result = files.filter(file => file.key !== target);
    setReduxValues({
      _path: 'save',
      files: result,
    });
    deleteFile({
      key: target,
      fileRefID,
    });
  };

  handleFileDivisionAdd = (fileKey, fileDivision) => {
    const { save, setReduxValues } = this.props;
    const { files } = save;
    const result = addCategoryInFileList({ files, fileKey, fileDivision });
    setReduxValues({ _path: 'save', files: result });
    setReduxValues({ _path: 'save', fileDivision: { fileKey, key: fileDivision } });
  };

  handleSetDetail = (id, formMode) => {
    const { setDetailBind } = this.props;
    setDetailBind({
      consultationID: id,
      formMode,
    });
  };

  render() {
    const {
      classes,
      bizCode,
      MyLFID,
      list,
      isLoading,
      save,
      search,
      caseList,
      contractList,
      lawFirmEmpList,
      clientList,
      FILECAT_SELECT,
      CSCTYPE_SELECT,
      handleClearSaveData,
    } = this.props;
    const {
      selectCase,
      checkCase,
      checkContract,
      relatedContract,
      relatedCase,
      client,
      managerRefID,
      counselor,
      owner,
      title,
      contents,
      date,
      time,
      spentMinute,
      files,
      fileRefID,
      chargeTypeCode,
      lawFirmPrice,
      clientPrice,
      targetPrice,
      fileDivision,
      isPublic,
    } = save;
    const { startDate, endDate, searchValue } = search;
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
            <PageTitle icon="class">상담</PageTitle>
          </Box>
        )}
        <div>
          <ConsultationComponent
            bizCode={bizCode}
            LFID={MyLFID}
            isLoading={isLoading}
            checkContract={checkContract}
            checkCase={checkCase}
            selectCase={selectCase}
            caseList={caseList}
            contractList={contractList}
            clientList={clientList}
            managerList={lawFirmEmpList}
            relatedContract={relatedContract}
            relatedCase={relatedCase}
            startDate={startDate}
            endDate={endDate}
            searchValue={searchValue}
            consultationList={list || []}
            client={client}
            counselor={counselor}
            managerRefID={managerRefID}
            owner={owner}
            title={title}
            contents={contents}
            date={date}
            time={time}
            spentMinute={spentMinute}
            isPublic={isPublic}
            files={files}
            fileRefID={fileRefID}
            chargeTypeCode={chargeTypeCode}
            lawFirmPrice={lawFirmPrice}
            clientPrice={clientPrice}
            targetPrice={targetPrice}
            fileChart={FILECAT_SELECT || []}
            chargeType={CSCTYPE_SELECT || []}
            saveKeyOfDivision={fileDivision}
            setRelatedList={this.setRelatedList}
            handleSelect={this.handleSelect}
            handleRemove={this.handleRemove}
            handleSetRelation={this.handleSetRelation}
            handleChange={this.handleChange}
            handleChangeDateRange={this.handleChangeDateRange}
            handleSubmit={this.handleSubmit}
            handleKeyPress={this.handleKeyPress}
            handleFileAdd={this.handleFileAdd}
            handleFileRemove={this.handleFileRemove}
            handleFileDivisionAdd={this.handleFileDivisionAdd}
            handleDelete={this.handleDelete}
            handleSave={this.handleSave}
            handleSetDetail={this.handleSetDetail}
            handleClearSaveData={handleClearSaveData}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ consultationMng, common, auth }) => {
  const { list, formMode, isLoading, save, search, caseList, contractList } = consultationMng;
  const { BIZCODE_SELECT, FILECAT_SELECT, CSCTYPE_SELECT } = common.allCodes;
  const { lawFirmEmpList, clientList } = common.autoComplete;
  const { MyLFID } = auth.authUser;
  return {
    MyLFID,
    list,
    formMode,
    isLoading,
    save,
    search,
    caseList,
    contractList,
    lawFirmEmpList,
    clientList,
    BIZCODE_SELECT,
    FILECAT_SELECT,
    CSCTYPE_SELECT,
  };
};
const mapDispatchToProps = {
  checkInputValue,
  setReduxValues,
  handlePushValue,
  handleRemoveValue,
  handleSaveDraft,
  setListFetch,
  setDetailBind,
  deleteFile,
  setCaseList,
  setContractList,
  handleMappingCaseContract,
  handleCommonAlertConfirmSet,
  handleClearSaveData,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ConsultationMng));
