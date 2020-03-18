import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RU } from 'helpers/ramda';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import PageTitle from 'components/PageTitle';
import ContentCard from 'components/ContentCard';
import ButtonN from 'components/ButtonN';
import Button from 'components/Button';
import DateRange from 'components/DateRange';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import ListDetailContainer from 'components/ListDetailContainer';
import { NotificationManager } from 'react-notifications';
import ConfirmDialog from 'components/ConfirmDialog';
import {
  setReduxValues,
  handleFetch,
  handleSave,
  handleModify,
  handleDelete,
  handleDetailBindFetch,
  handleAddSuccessDataForm,
  handleRemoveSuccessDataForm,
  handleChangeSuccessData,
  handleBillingTypeFilter,
  handleRemoveFile,
  handleConsultationFetch,
  clearData,
} from '../Redux/Action';
import DetailComponent from './SharedComponents/DetailComponent';

const { mlMessage, yearMonthDay, checkContractData, addCategoryInFileList } = RU;

const makeGeneralConfirm = title => ({ ...props }) => {
  return <ConfirmDialog {...props} title={title} />;
};

const ConfirmCreate = makeGeneralConfirm(mlMessage('alertDialog.save'));
const ConfirmModify = makeGeneralConfirm(mlMessage('alertDialog.save'));
const ConfirmDelete = makeGeneralConfirm(mlMessage('alertDialog.delete'));

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

class Contract extends Component {
  state = {
    formMode: '',
    formModeTitle: '',
    isOpenDetail: false,
    isOpenCreateConfirm: false,
    isOpenModifyConfirm: false,
    isOpenDeleteConfirm: false,
    isConsultationOpen: false,
    deleteID: '',
  };

  handleFileAddInList = target => {
    const { contractDetail, setReduxValues } = this.props;
    const { files } = contractDetail.common;
    const result = files.concat(target);
    setReduxValues({ _path: 'contractDetail.common', files: result });
  };

  handleFileRemoveInList = target => {
    const { contractDetail, setReduxValues, handleRemoveFile } = this.props;
    const { files, fileRefID } = contractDetail.common;
    const result = files.filter(file => {
      if (file.key === target) {
        if (file.flag === 1) handleRemoveFile({ key: target, fileRefID });
        return false;
      }
      return true;
    });
    setReduxValues({ _path: 'contractDetail.common', files: result });
  };

  handleFileDivisionAdd = (fileKey, fileDivision) => {
    const { contractDetail, setReduxValues } = this.props;
    const { files } = contractDetail.common;
    const result = addCategoryInFileList({ files, fileKey, fileDivision });
    setReduxValues({ _path: 'contractDetail.common', files: result });
  };

  handleContractSave = () => {
    const { MyLFID, contractDetail, contractSearch, handleSave } = this.props;
    const { startDate, endDate, searchText } = contractSearch;
    handleSave({ LFID: MyLFID, contractData: contractDetail, startDate, endDate, searchText });

    this.setState({
      isOpenDetail: true,
      formMode: 'des',
      formModeTitle: mlMessage('pages.contract.detailTitle'),
    });
  };

  handleContractModify = () => {
    const { MyLFID, contractDetail, contractSearch, handleModify } = this.props;
    const { startDate, endDate, searchText } = contractSearch;
    handleModify({ LFID: MyLFID, contractData: contractDetail, startDate, endDate, searchText });

    this.setState({
      isOpenDetail: true,
      formMode: 'des',
      formModeTitle: mlMessage('pages.contract.detailTitle'),
    });

    return true;
  };

  handleContractDelete = () => {
    const { MyLFID, contractSearch, handleDelete } = this.props;
    const { startDate, endDate, searchText } = contractSearch;
    const { deleteID } = this.state;
    const contractID = deleteID.split('_')[1];
    handleDelete({ LFID: MyLFID, contractID, isActive: 0, startDate, endDate, searchText });
  };

  saveConsultationUUID = id => {
    const { MyLFID, setReduxValues, contractDetail } = this.props;
    const { relatedConsultation } = contractDetail.common;
    const data = id.split('_');
    const consultUUID = data[1];
    const title = data[2];

    let flag = true;

    relatedConsultation.forEach(obj => {
      if (obj.consultUUID === consultUUID) flag = false;
    });

    if (flag) {
      setReduxValues({
        _path: 'contractDetail.common',
        relatedConsultation: [...relatedConsultation, { LFID: MyLFID, consultUUID, title }],
      });
    }
  };

  checkValidation = () => {
    const { contractDetail } = this.props;
    const { billingTypeCode } = contractDetail;
    const { files } = contractDetail.common;
    const alertMsg = checkContractData({ files, billingTypeCode, contractDetail });
    if (alertMsg.length > 0) {
      NotificationManager.info(alertMsg.join(', '), '아래 값들을 확인해 주시기 바랍니다.');
      return false;
    }
    return true;
  };

  setDetail = (formMode, LFID, contractID) => {
    const { handleDetailBindFetch } = this.props;
    handleDetailBindFetch({ LFID, contractID, formMode });
  };

  render() {
    const {
      formMode,
      formModeTitle,
      isOpenDetail,
      isOpenCreateConfirm,
      isOpenModifyConfirm,
      isOpenDeleteConfirm,
    } = this.state;
    const {
      classes,
      fetchContracts,
      fetchConsultations,
      contractSearch,
      isLoading,
      MyLFID,
      setReduxValues,
      contractDetail,
      handleChangeSuccessData,
      handleBillingTypeFilter,
      handleConsultationFetch,
      handleAddSuccessDataForm,
      handleRemoveSuccessDataForm,
      clearData,
    } = this.props;

    const TableComponent = (
      <ContentCard
        title=""
        customHeader={
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ButtonN
              type="icon"
              icon="add_to_queue"
              color="primary"
              onClick={() => {
                this.setState({
                  isOpenDetail: true,
                  formMode: 'create',
                  formModeTitle: mlMessage('pages.contract.saveTitle'),
                });
                this.setDetail('create');
              }}
              label={mlMessage('pages.contract.btn.add')}
            />
          </div>
        }
        contents={[
          <>
            <ConfirmDelete
              message=""
              isOpen={isOpenDeleteConfirm}
              handleOK={e => {
                this.setState({ isOpenDeleteConfirm: false });
                this.handleContractDelete();
              }}
              handleNO={e => {
                this.setState({ isOpenDeleteConfirm: false });
              }}
            />
            <Table
              initOrder="desc"
              initOrderBy="contractDate"
              rows={[
                { id: 'clientName', type: 'text', label: mlMessage('pages.contract.client'), width: '20%' },
                { id: 'managerNameStr', type: 'text', label: mlMessage('pages.contract.manager'), width: '15%' },
                { id: 'title', type: 'text', label: mlMessage('pages.common.title'), align: 'left', width: '30%' },
                { id: 'contractDate', type: 'date', label: mlMessage('pages.contract.contractDate'), width: '15%' },
              ]}
              data={fetchContracts || []}
              customColumn={[
                {
                  field: 'managerNameStr',
                  component: ({ row }) =>
                    row.managerNameStr === 'null ' ? mlMessage('pages.contract.undefined') : row.managerNameStr,
                },
              ]}
              mngIcons={id => (
                <>
                  <Button
                    size="square"
                    icon="description"
                    color="success"
                    onClick={e => {
                      this.setState({
                        isOpenDetail: true,
                        formMode: 'des',
                        formModeTitle: mlMessage('pages.contract.detailTitle'),
                      });
                      const valArr = id.split('_');
                      this.setDetail('mod', valArr[0], valArr[1]);
                    }}
                  />
                  <Button
                    size="square"
                    icon="border_color"
                    color="success"
                    onClick={() => {
                      this.setState({
                        ...this.state,
                        isOpenDetail: true,
                        formMode: 'mod',
                        formModeTitle: mlMessage('pages.contract.modifyTitle'),
                      });
                      const valArr = id.split('_');
                      this.setDetail('mod', valArr[0], valArr[1]);
                    }}
                  />
                  <Button
                    size="square"
                    icon="delete"
                    color="danger"
                    onClick={() => this.setState({ isOpenDeleteConfirm: true, deleteID: id })}
                  />
                </>
              )}
              mngIconsWidth="20%"
              condComponents={
                <>
                  <DateRange
                    label={mlMessage('pages.contract.contractDate')}
                    startDate={contractSearch.startDate}
                    endDate={contractSearch.endDate}
                    handleChange={obj => {
                      const { startDate, endDate } = obj;
                      if (startDate) setReduxValues({ _path: 'contractSearch', startDate });
                      if (endDate) setReduxValues({ _path: 'contractSearch', endDate });
                    }}
                    handleSubmit={(startDate, endDate) => {
                      this.props.handleFetch({
                        LFID: MyLFID,
                        startDate,
                        endDate,
                        searchText: contractSearch.searchText,
                      });
                      NotificationManager.info(`계약일: ${startDate} ~ ${endDate}`);
                    }}
                  />
                  <div style={{ marginLeft: '5px' }}>
                    <InputBox
                      placeholder={mlMessage('pages.contract.searchPlaceholder')}
                      iconName="Search"
                      value={contractSearch.searchText}
                      onChange={e => setReduxValues({ _path: 'contractSearch', searchText: e.target.value })}
                      handleSubmit={e =>
                        this.props.handleFetch({
                          LFID: MyLFID,
                          startDate: contractSearch.startDate,
                          endDate: contractSearch.endDate,
                          searchText: contractSearch.searchText,
                        })
                      }
                    />
                  </div>
                </>
              }
              multiKey={['LFID', 'contractID']}
              isLoading={isLoading}
            />
          </>,
        ]}
      />
    );

    const DetailComponentBtn = (
      <>
        {this.state.formMode !== 'des' && (
          <Button
            size="large"
            mode="regular"
            color="primary"
            onClick={async () => {
              if (this.state.formMode === 'create') {
                if (!(await this.checkValidation())) return;
                this.setState({ isOpenCreateConfirm: true });
              } else {
                if (!(await this.checkValidation())) return;
                this.setState({ isOpenModifyConfirm: true });
              }
            }}
          >
            <Box pl={5} pr={5}>
              {mlMessage('pages.common.button.save')}
            </Box>
          </Button>
        )}

        <Button color="inverted" size="large" mode="regular" onClick={() => this.setState({ isOpenDetail: false })}>
          <Box pl={5} pr={5}>
            {mlMessage('pages.common.button.close')}
          </Box>
        </Button>
        <ConfirmCreate
          message=""
          isOpen={isOpenCreateConfirm}
          handleOK={e => {
            this.setState({ isOpenCreateConfirm: false });
            this.handleContractSave();
          }}
          handleNO={e => {
            this.setState({ isOpenCreateConfirm: false });
          }}
        />
        <ConfirmModify
          message=""
          isOpen={isOpenModifyConfirm}
          handleOK={e => {
            this.setState({ isOpenModifyConfirm: false });
            this.handleContractModify();
          }}
          handleNO={e => {
            this.setState({ isOpenModifyConfirm: false });
          }}
        />
      </>
    );

    return (
      <div className={classes.container}>
        <Box
          mb={1}
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <PageTitle icon="class">{mlMessage('pages.contract.pageTitle')}</PageTitle>
        </Box>
        <ListDetailContainer
          TableComponent={TableComponent}
          DetailComponent={
            <DetailComponent
              formMode={formMode}
              MyLFID={MyLFID}
              setReduxValues={setReduxValues}
              contractDetail={contractDetail}
              fetchConsultations={fetchConsultations}
              handleChangeSuccessData={handleChangeSuccessData}
              handleBillingTypeFilter={handleBillingTypeFilter}
              handleConsultationFetch={handleConsultationFetch}
              handleFileAddInList={this.handleFileAddInList}
              handleFileRemoveInList={this.handleFileRemoveInList}
              handleFileDivisionAdd={this.handleFileDivisionAdd}
              handleAddSuccessDataForm={handleAddSuccessDataForm}
              handleRemoveSuccessDataForm={handleRemoveSuccessDataForm}
              saveConsultationUUID={this.saveConsultationUUID}
              clearData={clearData}
            />
          }
          DetailComponentTitle={formModeTitle}
          DetailComponentBtn={DetailComponentBtn}
          isOpenDetail={isOpenDetail}
          handleDialogClose={() => {}}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ contract, auth }) => {
  const { fetchContracts, fetchConsultations, contractDetail, contractSearch, isLoading } = contract;
  const { MyLFID } = auth.authUser;
  return {
    fetchContracts,
    fetchConsultations,
    contractDetail,
    contractSearch,
    isLoading,
    MyLFID,
  };
};

const mapDispatchToProps = {
  setReduxValues,
  handleFetch,
  handleSave,
  handleModify,
  handleDelete,
  handleDetailBindFetch,
  handleAddSuccessDataForm,
  handleRemoveSuccessDataForm,
  handleChangeSuccessData,
  handleBillingTypeFilter,
  handleRemoveFile,
  clearData,
  handleConsultationFetch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Contract));
