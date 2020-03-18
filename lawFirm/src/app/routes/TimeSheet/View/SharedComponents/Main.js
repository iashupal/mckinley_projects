import React, { Component, useState } from 'react';
import { RU } from 'helpers/ramda';
import ContentCard from 'components/ContentCard';
import DateRange from 'components/DateRange';
import ButtonN from 'components/ButtonN';
import Button from 'components/Button';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import ListDetailContainer from 'components/ListDetailContainer';
import Select from 'components/Select';
import ConsultDetail from 'components/Consultation/SharedComponents/DetailComponent';
import { NotificationManager } from 'react-notifications';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import ConfirmDialog from 'components/ConfirmDialog';
import DialogInfoForm from 'components/DialogInfoForm';
import ContractDetail from 'app/routes/Contract/View/SharedComponents/DetailComponent';
import CaseDetail from 'app/routes/Case/View/Detail/CaseDetail';
import DetailComponent from './MainDetailComponent';

const { mlMessage, checkTimeSheetData, handleTextOverFlow } = RU;

const makeGeneralConfirm = title => ({ ...props }) => {
  return <ConfirmDialog {...props} title={title} />;
};

const ConfirmCreate = makeGeneralConfirm(mlMessage('alertDialog.save'));
const ConfirmModify = makeGeneralConfirm(mlMessage('alertDialog.save'));
const ConfirmDelete = makeGeneralConfirm(mlMessage('alertDialog.delete'));

class Main extends Component {
  state = {
    formMode: '',
    formModeTitle: '',
    bizCTCode: '',
    isOpenDetail: false,
    isOpenCreateConfirm: false,
    isOpenModifyConfirm: false,
    isOpenDeleteConfirm: false,
    isOpenDetailDialog: false,
    detailCategory: '',
    TSID: '',
  };

  handleSave = () => {
    const { MyLFID, handleTimeSheetSave, timeSheet } = this.props;
    const { timeSheetDetail, timeSheetSearch, dialogListInfo } = timeSheet;
    const {
      bizCategoryCode,
      runningTime,
      billableTime,
      manager,
      contents,
      excutionDate,
      isBillable,
      defaultTimeCharge,
      changedTimeCharge,
      remark,
    } = timeSheetDetail;

    const { id } = dialogListInfo.selectedItem;
    const { startDate, endDate, searchText, category } = timeSheetSearch;

    handleTimeSheetSave({
      LFID: MyLFID,
      bizCategoryCode,
      runningTime,
      billableTime,
      bizID: id,
      manager,
      contents,
      excutionDate,
      isBillable,
      defaultTimeCharge,
      changedTimeCharge,
      startDate,
      endDate,
      searchText,
      category,
      remark,
    });

    this.setState({
      isOpenDetail: true,
      formMode: 'des',
      formModeTitle: mlMessage('pages.timeSheet.detail'),
    });
  };

  handleModify = () => {
    const { MyLFID, handleTimeSheetModify, timeSheet } = this.props;
    const { timeSheetDetail, timeSheetSearch, dialogListInfo } = timeSheet;
    const { startDate, endDate, searchText, category } = timeSheetSearch;
    const {
      TSID,
      bizCategoryCode,
      runningTime,
      billableTime,
      manager,
      contents,
      excutionDate,
      isBillable,
      changedTimeCharge,
      remark,
    } = timeSheetDetail;
    const { id } = dialogListInfo.selectedItem;

    handleTimeSheetModify({
      LFID: MyLFID,
      TSID,
      bizCategoryCode,
      runningTime,
      billableTime,
      bizID: id,
      manager,
      contents,
      excutionDate,
      isBillable,
      changedTimeCharge,
      startDate,
      endDate,
      searchText,
      category,
      remark,
    });

    this.setState({
      isOpenDetail: true,
      formMode: 'des',
      formModeTitle: mlMessage('pages.timeSheet.detail'),
    });
  };

  handleDelete = () => {
    const { handleTimeSheetDelete, MyLFID } = this.props;
    const { TSID } = this.state;
    handleTimeSheetDelete({ LFID: MyLFID, TSID, isActive: 0 });
  };

  handleListFetch = (LFID, startDate, endDate, searchText, category, categoryFlag) => {
    this.props.handleFetch({
      LFID,
      startDate,
      endDate,
      searchText,
      category,
      categoryFlag,
    });
  };

  checkValidation = () => {
    const { timeSheetDetail } = this.props.timeSheet;
    const alertMsg = checkTimeSheetData({ timeSheetDetail });
    if (alertMsg.length > 0) {
      NotificationManager.info(alertMsg.join(', '), '아래 값들을 확인해 주시기 바랍니다.');
      return false;
    }
    return true;
  };

  setCaseInputUITitle = () => {
    const { timeSheet } = this.props;
    if (timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B03') return mlMessage('pages.legalLaw');
    if (timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B04') return mlMessage('pages.contract.advice');
    return '';
  };

  setCaseInputUIAutoCompleteOption = () => {
    const { timeSheet, autoComplete } = this.props;
    if (timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B03') return autoComplete.litigationList;
    if (timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B04') return autoComplete.adviceList;
    return null;
  };

  render() {
    const {
      timeSheet,
      autoComplete,
      setReduxValues,
      bizCode,
      handleTimeChange,
      fetchDetailBind,
      handleContractDetailBindFetch,
      handleClearContractDetail,
      handleSearchTimeCharge,
      contractDetail,
      handleConsultDetailBindFetch,
      handleClearConsultDetail,
      consultDetail,
      handleCaseDetailBindFetch,
      handleClearCaseData,
      handleContractListFetch,
      handleConsultListFetch,
      handleCaseListFetch,
      caseDetail,
      MyLFID,
      FILECAT_SELECT,
      CSCTYPE_SELECT,
    } = this.props;
    const {
      formMode,
      formModeTitle,
      bizCTCode,
      isOpenDetail,
      isOpenCreateConfirm,
      isOpenModifyConfirm,
      isOpenDeleteConfirm,
      isOpenDetailDialog,
      detailCategory,
    } = this.state;

    const TableComponent = (
      <ContentCard
        title=""
        customHeader={
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <h2>{mlMessage('pages.timeSheet.timeSheetList')}</h2>
            <ButtonN
              type="icon"
              icon="add_to_queue"
              color="primary"
              onClick={() => {
                this.setState({
                  isOpenDetail: true,
                  formMode: 'create',
                  formModeTitle: mlMessage('pages.timeSheet.create'),
                });
                fetchDetailBind({ formMode: 'create', LFID: MyLFID });
              }}
              label={mlMessage('pages.timeSheet.new')}
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
                this.handleDelete();
              }}
              handleNO={e => {
                this.setState({ isOpenDeleteConfirm: false });
              }}
            />
            <Table
              initOrder="desc"
              initOrderBy="RunDate"
              rows={[
                { id: 'BizCategoryName', type: 'text', label: mlMessage('pages.timeSheet.category'), width: '5%' },
                {
                  id: 'FormattedRunningTime',
                  label: mlMessage('pages.timeSheet.runningTime'),
                  width: '5%',
                  noFilter: true,
                },
                {
                  id: 'FormattedBillableTime',
                  label: mlMessage('pages.timeSheet.billableTime'),
                  width: '5%',
                  noFilter: true,
                },
                { id: 'title', label: mlMessage('pages.common.title'), align: 'left', width: '20%', noFilter: true },
                {
                  id: 'Contents',
                  type: 'text',
                  label: mlMessage('pages.timeSheet.contents'),
                  align: 'left',
                  width: '20%',
                },
                { id: 'managerName', type: 'text', label: mlMessage('pages.timeSheet.executor'), width: '10%' },
                { id: 'IsBillable', type: 'text', label: mlMessage('pages.timeSheet.billableTarget'), width: '10%' },
                { id: 'RunDate', type: 'date', label: mlMessage('pages.timeSheet.runDate'), width: '10%' },
              ]}
              data={timeSheet.fetchTimeSheets || []}
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
                        formModeTitle: mlMessage('pages.timeSheet.detail'),
                      });
                      const valArr = id.split('_');
                      fetchDetailBind({ formMode: 'des', LFID: valArr[0], TSID: valArr[1] });
                    }}
                  />
                  <Button
                    size="square"
                    icon="border_color"
                    color="success"
                    onClick={() => {
                      this.setState({
                        isOpenDetail: true,
                        formMode: 'mod',
                        formModeTitle: mlMessage('pages.timeSheet.modify'),
                      });
                      const valArr = id.split('_');
                      fetchDetailBind({ formMode: 'mod', LFID: valArr[0], TSID: valArr[1] });
                    }}
                  />
                  <Button
                    size="square"
                    icon="delete"
                    color="danger"
                    onClick={() => {
                      const valArr = id.split('_');
                      this.setState({ isOpenDeleteConfirm: true, TSID: valArr[1] });
                    }}
                  />
                </>
              )}
              mngIconsWidth="15%"
              condComponents={
                <>
                  <div>
                    <Select
                      multiSelect
                      style={{ marginLeft: '-5px', marginRight: '-5px' }}
                      placeholder={mlMessage('pages.timeSheet.category')}
                      options={[
                        { key: 0, text: mlMessage('pages.timeSheet.category'), itemType: DropdownMenuItemType.Header },
                      ].concat(bizCode || [])}
                      onChange={(event, selectedOption) =>
                        this.handleListFetch(
                          MyLFID,
                          timeSheet.timeSheetSearch.startDate,
                          timeSheet.timeSheetSearch.endDate,
                          timeSheet.timeSheetSearch.searchText,
                          selectedOption,
                          true,
                        )
                      }
                    />
                  </div>
                  <DateRange
                    label={mlMessage('pages.timeSheet.runDate')}
                    startDate={timeSheet.timeSheetSearch.startDate}
                    endDate={timeSheet.timeSheetSearch.endDate}
                    handleChange={obj => {
                      const { startDate, endDate } = obj;
                      if (startDate) setReduxValues({ _path: 'timeSheetSearch', startDate });
                      if (endDate) setReduxValues({ _path: 'timeSheetSearch', endDate });
                    }}
                    handleSubmit={(startDate, endDate) => {
                      this.handleListFetch(
                        MyLFID,
                        startDate,
                        endDate,
                        timeSheet.timeSheetSearch.searchText,
                        timeSheet.timeSheetSearch.category,
                      );
                      NotificationManager.info(`${mlMessage('pages.timeSheet.runDate')}: ${startDate} ~ ${endDate}`);
                    }}
                  />
                  <div>
                    <InputBox
                      placeholder={mlMessage('pages.timeSheet.searchText')}
                      iconName="Search"
                      value={timeSheet.timeSheetSearch.searchText}
                      onChange={e => setReduxValues({ _path: 'timeSheetSearch', searchText: e.target.value })}
                      handleSubmit={e =>
                        this.handleListFetch(
                          MyLFID,
                          timeSheet.timeSheetSearch.startDate,
                          timeSheet.timeSheetSearch.endDate,
                          timeSheet.timeSheetSearch.searchText,
                          timeSheet.timeSheetSearch.category,
                        )
                      }
                    />
                  </div>
                </>
              }
              customColumn={[
                {
                  field: 'title',
                  component: ({ row }) => {
                    if (row.BizCategoryCode === 'BIZCT_B00') return row.title;
                    return (
                      <div
                        role="button"
                        tabIndex="0"
                        style={{ cursor: 'pointer', color: '#3F51B5', outline: 'none' }}
                        onClick={async e => {
                          if (row.caseType) {
                            this.setState({
                              isOpenDetailDialog: true,
                              detailCategory: row.caseType === 'L' ? '송무 상세' : '자문 상세',
                              bizCTCode: row.BizCategoryCode,
                            });
                            handleCaseDetailBindFetch({ LFID: MyLFID, caseUUID: row.UUID, caseType: row.caseType });
                          }
                          if (row.BizCategoryCode === 'BIZCT_B01') {
                            this.setState({
                              isOpenDetailDialog: true,
                              detailCategory: mlMessage('pages.consultation.detailTitle'),
                              bizCTCode: row.BizCategoryCode,
                            });
                            handleConsultDetailBindFetch({ consultationID: row.UUID, formMode: 'des' });
                          }
                          if (row.BizCategoryCode === 'BIZCT_B02') {
                            handleContractDetailBindFetch({ LFID: MyLFID, contractID: row.UUID, formMode: 'des' });
                            this.setState({
                              isOpenDetailDialog: true,
                              detailCategory: mlMessage('pages.contract.detailTitle'),
                              bizCTCode: row.BizCategoryCode,
                            });
                          }
                        }}
                      >
                        {row.title}
                      </div>
                    );
                  },
                },
                {
                  field: 'Contents',
                  component: ({ row }) => handleTextOverFlow({ str: row.Contents, width: 200 }),
                },
              ]}
              multiKey={['LawFirmID', 'TSID']}
              isLoading={timeSheet.isLoading}
            />
          </>,
        ]}
      />
    );

    const DetailComponentBtn = (
      <>
        {formMode !== 'des' && (
          <ButtonN
            type="large"
            color="primary"
            onClick={async e => {
              if (this.state.formMode === 'create') {
                if (!(await this.checkValidation())) return false;
                this.setState({ isOpenCreateConfirm: true });
              } else {
                if (!(await this.checkValidation())) return false;
                this.setState({ isOpenModifyConfirm: true });
              }
              return true;
            }}
            label={mlMessage('pages.common.button.save')}
          />
        )}
        <ButtonN
          type="large"
          color="inverted"
          onClick={e => {
            this.setState({ isOpenDetail: false });
          }}
          label={mlMessage('pages.common.button.close')}
        />
        <ConfirmCreate
          message=""
          isOpen={isOpenCreateConfirm}
          handleOK={e => {
            this.setState({ isOpenCreateConfirm: false });
            this.handleSave();
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
            this.handleModify();
          }}
          handleNO={e => {
            this.setState({ isOpenModifyConfirm: false });
          }}
        />
      </>
    );

    return (
      <>
        <ListDetailContainer
          TableComponent={TableComponent}
          DetailComponent={
            <DetailComponent
              timeSheet={timeSheet}
              autoComplete={autoComplete}
              setReduxValues={setReduxValues}
              bizCode={bizCode}
              handleTimeChange={handleTimeChange}
              handleSearchTimeCharge={handleSearchTimeCharge}
              MyLFID={MyLFID}
              formMode={formMode}
              handleContractListFetch={handleContractListFetch}
              handleConsultListFetch={handleConsultListFetch}
              handleCaseListFetch={handleCaseListFetch}
            />
          }
          DetailComponentTitle={formModeTitle}
          DetailComponentBtn={DetailComponentBtn}
          isOpenDetail={isOpenDetail}
          handleDialogClose={() => {}}
        />
        <DialogInfoForm
          title={detailCategory}
          open={isOpenDetailDialog}
          actions={
            <ButtonN
              color="inverted"
              type="large"
              onClick={() => this.setState({ isOpenDetailDialog: false })}
              label={mlMessage('pages.common.button.close')}
            />
          }
          fullWidth
          maxWidth="md"
        >
          {bizCTCode === 'BIZCT_B01' && (
            <ConsultDetail
              formMode="detail"
              selectCase={consultDetail.selectCase}
              checkCase={consultDetail.checkCase}
              checkContract={consultDetail.checkContract}
              relatedContract={consultDetail.relatedContract}
              relatedCase={consultDetail.relatedCase}
              client={consultDetail.client}
              owner={consultDetail.owner}
              title={consultDetail.title}
              contents={consultDetail.contents}
              date={consultDetail.date}
              time={consultDetail.time}
              spentMinute={consultDetail.spentMinute}
              files={consultDetail.files}
              chargeTypeCode={consultDetail.chargeTypeCode}
              targetPrice={consultDetail.targetPrice}
              isPublic={consultDetail.isPublic}
              LFID={MyLFID}
              fileChart={FILECAT_SELECT || []}
              chargeType={CSCTYPE_SELECT || []}
              clientList={autoComplete.clientList || []}
              managerList={autoComplete.lawFirmEmpList || []}
              handleClearSaveData={handleClearConsultDetail}
            />
          )}
          {bizCTCode === 'BIZCT_B02' && (
            <ContractDetail
              formMode="des"
              MyLFID={MyLFID}
              contractDetail={contractDetail}
              clearData={handleClearContractDetail}
            />
          )}
          {(bizCTCode === 'BIZCT_B03' || bizCTCode === 'BIZCT_B04') && (
            <CaseDetail formMode="des" caseInfo={caseDetail} clearCaseInfo={handleClearCaseData} />
          )}
        </DialogInfoForm>
      </>
    );
  }
}

export default Main;
