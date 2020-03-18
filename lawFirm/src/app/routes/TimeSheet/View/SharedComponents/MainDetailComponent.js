import React, { Component, useState } from 'react';
import { RU } from 'helpers/ramda';
import InputBox from 'components/InputBox';
import GridTable, { GridRow } from 'components/GridTable';
import AutoComplete from 'components/AutoComplete';
import InputBoxNumber from 'components/InputBoxNumber';
import DatePicker from 'components/DatePicker';
import CheckBox from 'components/CheckBox';
import Select from 'components/Select';
import Button from 'components/Button';
import ButtonN from 'components/ButtonN';
import DialogInfoForm from 'components/DialogInfoForm';
import Box from 'components/BoxOld';
import ContractListDialogInfo from 'components/ListDialog/ContractListDialogInfo';
import ConsultListDialogInfo from 'components/ListDialog/ConsultListDialogInfo';
import CaseListDialogInfo from 'components/ListDialog/CaseListDialogInfo';

const { mlMessage, yearMonthDay } = RU;

class MainDetailComponent extends Component {
  state = {
    dialogTitle: '',
    caseType: '',
    isOpenDialog: false,
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

  saveSelectedItemInfo = (id, title) => {
    const { setReduxValues, timeSheet } = this.props;
    setReduxValues({
      _path: 'dialogListInfo.selectedItem',
      id,
      title,
    });

    if (timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B01') {
      setReduxValues({
        _path: 'timeSheetDetail',
        consult: { value: id, label: title },
      });
    }

    if (timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B02') {
      setReduxValues({
        _path: 'timeSheetDetail',
        contract: { value: id, label: title },
      });
    }

    if (
      timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B03' ||
      timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B04'
    ) {
      setReduxValues({
        _path: 'timeSheetDetail',
        case: { value: id, label: title },
      });
    }
  };

  closeDialog = () => {
    this.setState({ isOpenDialog: false });
  };

  render() {
    const {
      timeSheet,
      autoComplete,
      setReduxValues,
      bizCode,
      handleTimeChange,
      handleSearchTimeCharge,
      handleContractListFetch,
      handleConsultListFetch,
      handleCaseListFetch,
      formMode,
      MyLFID,
    } = this.props;
    const { dialogTitle, caseType, isOpenDialog } = this.state;
    const caseUI = (
      <>
        <div style={{ textAlign: 'left' }}>
          <AutoComplete
            options={this.setCaseInputUIAutoCompleteOption() || []}
            selectedOption={timeSheet.timeSheetDetail.case}
            readOnly
          />
        </div>
      </>
    );

    const contractUI = (
      <>
        <div style={{ textAlign: 'left' }}>
          <AutoComplete
            options={autoComplete.contractList || []}
            selectedOption={timeSheet.timeSheetDetail.contract}
            readOnly
          />
        </div>
      </>
    );

    const consultUI = (
      <>
        <div style={{ textAlign: 'left' }}>
          <AutoComplete
            options={autoComplete.consultationList || []}
            selectedOption={timeSheet.timeSheetDetail.consult}
            readOnly
          />
        </div>
      </>
    );

    const DetailComponent = (
      <GridTable>
        <GridRow title={mlMessage('pages.timeSheet.category')} center redStar={formMode !== 'des'}>
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'left' }}>
              <Select
                style={{ marginLeft: '-5px', marginBottom: '5px' }}
                selectedKey={timeSheet.timeSheetDetail.bizCategoryCode}
                options={bizCode || []}
                onChange={(event, selectedOption) =>
                  setReduxValues({
                    _path: 'timeSheetDetail',
                    bizCategoryCode: selectedOption.key,
                    case: { value: '', label: '' },
                    contract: { value: '', label: '' },
                    consult: { value: '', label: '' },
                  })
                }
                readOnly={formMode === 'des'}
              />

              {timeSheet.timeSheetDetail.bizCategoryCode &&
                timeSheet.timeSheetDetail.bizCategoryCode !== '' &&
                timeSheet.timeSheetDetail.bizCategoryCode !== 'BIZCT_B00' &&
                formMode !== 'des' && (
                  <div style={{ marginTop: '3px' }}>
                    <Button
                      size="square"
                      color="inverted"
                      style={{ height: '32px' }}
                      onClick={() => {
                        if (timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B01') {
                          this.setState({ dialogTitle: mlMessage('pages.consultation.listTitle') });
                          handleConsultListFetch({ LFID: MyLFID });
                        }
                        if (timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B02') {
                          this.setState({ dialogTitle: mlMessage('pages.listDialog.contractList') });
                          handleContractListFetch({ LFID: MyLFID });
                        }
                        if (timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B03') {
                          this.setState({ dialogTitle: mlMessage('pages.listDialog.litigationList'), caseType: 'L' });
                          handleCaseListFetch({ LFID: MyLFID, caseType: 'L', searchText: '' });
                        }

                        if (timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B04') {
                          this.setState({ dialogTitle: mlMessage('pages.listDialog.adviceList'), caseType: 'A' });
                          handleCaseListFetch({ LFID: MyLFID, caseType: 'A', searchText: '' });
                        }

                        this.setState({ isOpenDialog: true });
                      }}
                    >
                      <Box>
                        {timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B01' &&
                          mlMessage('pages.contract.choiceConsultation')}
                        {timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B02' &&
                          mlMessage('pages.consultation.choiceContract')}
                        {timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B03' &&
                          mlMessage('pages.listDialog.litigationChoice')}
                        {timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B04' &&
                          mlMessage('pages.listDialog.adviceChoice')}
                      </Box>
                    </Button>
                  </div>
                )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'left' }}>
              {timeSheet.timeSheetDetail.bizCategoryCode !== '' &&
                timeSheet.timeSheetDetail.bizCategoryCode !== 'BIZCT_B00' && <span> 제목 : &nbsp;</span>}

              {timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B01' && consultUI}
              {timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B02' && contractUI}
              {(timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B03' ||
                timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B04') &&
                caseUI}
            </div>
          </>
        </GridRow>
        <GridRow title={mlMessage('pages.timeSheet.runningTime')} center>
          <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'left' }}>
            {formMode === 'des' ? (
              <span>{timeSheet.timeSheetDetail.formattedRunningTime}</span>
            ) : (
              <>
                <InputBoxNumber
                  width="60px"
                  value={timeSheet.timeSheetDetail.runningTimeHM.H}
                  maxLength={3}
                  onValueChange={obj => handleTimeChange({ path: 'runningTimeHM', label: 'H', time: obj.value })}
                  unit="H"
                  decimalScale={0}
                  allowNegative={false}
                />
                <InputBoxNumber
                  width="60px"
                  value={timeSheet.timeSheetDetail.runningTimeHM.M}
                  maxLength={2}
                  onValueChange={obj => handleTimeChange({ path: 'runningTimeHM', label: 'M', time: obj.value })}
                  unit="M"
                  decimalScale={0}
                  allowNegative={false}
                />
              </>
            )}
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.timeSheet.billableTime')} center>
          <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'left' }}>
            {formMode === 'des' ? (
              <span>{timeSheet.timeSheetDetail.formattedBillableTime}</span>
            ) : (
              <>
                <InputBoxNumber
                  width="60px"
                  value={timeSheet.timeSheetDetail.billableTimeHM.H}
                  maxLength={3}
                  onValueChange={obj => handleTimeChange({ path: 'billableTimeHM', label: 'H', time: obj.value })}
                  unit="H"
                  decimalScale={0}
                  allowNegative={false}
                />
                <InputBoxNumber
                  width="60px"
                  value={timeSheet.timeSheetDetail.billableTimeHM.M}
                  maxLength={2}
                  onValueChange={obj => handleTimeChange({ path: 'billableTimeHM', label: 'M', time: obj.value })}
                  unit="M"
                  decimalScale={0}
                  allowNegative={false}
                />
              </>
            )}
          </div>
        </GridRow>

        <GridRow title={mlMessage('pages.timeSheet.contents')} center redStar={formMode !== 'des'}>
          {formMode === 'des' ? (
            <div style={{ textAlign: 'left', whiteSpace: 'pre' }}>{timeSheet.timeSheetDetail.contents}</div>
          ) : (
            <InputBox
              multiline
              value={timeSheet.timeSheetDetail.contents}
              onChange={e => setReduxValues({ _path: 'timeSheetDetail', contents: e.target.value })}
              width="400px"
            />
          )}
        </GridRow>
        <GridRow title={mlMessage('pages.timeSheet.timeCharge')} center redStar={formMode !== 'des'}>
          <div style={{ textAlign: 'left' }}>
            <InputBoxNumber
              width="200px"
              thousandSeparator
              value={timeSheet.timeSheetDetail.changedTimeCharge}
              onValueChange={obj => setReduxValues({ _path: 'timeSheetDetail', changedTimeCharge: obj.value })}
              unit="$"
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.timeSheet.remark')} center redStar={formMode !== 'des'}>
          {formMode === 'des' ? (
            <div style={{ textAlign: 'left', whiteSpace: 'pre' }}>{timeSheet.timeSheetDetail.remark}</div>
          ) : (
            <InputBox
              multiline
              value={timeSheet.timeSheetDetail.remark}
              onChange={e => setReduxValues({ _path: 'timeSheetDetail', remark: e.target.value })}
              width="400px"
            />
          )}
        </GridRow>
        <GridRow title={mlMessage('pages.timeSheet.executor')} center redStar={formMode !== 'des'}>
          <div style={{ textAlign: 'left' }}>
            <AutoComplete
              options={autoComplete.lawFirmEmpList || []}
              selectedOption={timeSheet.timeSheetDetail.manager}
              handleChange={selectedOption => {
                setReduxValues({
                  _path: 'timeSheetDetail',
                  manager: { value: selectedOption.value, label: selectedOption.label },
                });
                handleSearchTimeCharge({ LFID: MyLFID, userID: selectedOption.value });
              }}
              readOnly
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.timeSheet.runDate')} center redStar={formMode !== 'des'}>
          <div style={{ textAlign: 'left' }}>
            <DatePicker
              value={timeSheet.timeSheetDetail.excutionDate}
              onChange={date => setReduxValues({ _path: 'timeSheetDetail', excutionDate: yearMonthDay(date) })}
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.timeSheet.billableTarget')} center>
          <div style={{ textAlign: 'left' }}>
            {formMode === 'des' ? (
              <div>{timeSheet.timeSheetDetail.isBillable ? '청구' : '미청구'}</div>
            ) : (
              <CheckBox
                checked={timeSheet.timeSheetDetail.isBillable}
                onChange={(event, checked) => {
                  if (checked === false) {
                    setReduxValues({ _path: 'timeSheetDetail', isBillable: checked, billableTimeHM: { H: 0, M: 0 } });
                  } else {
                    setReduxValues({ _path: 'timeSheetDetail', isBillable: checked });
                  }
                }}
              />
            )}
          </div>
        </GridRow>
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
            {timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B01' && (
              <ConsultListDialogInfo
                LFID={MyLFID}
                consultList={timeSheet.dialogListInfo.consultList}
                saveSelectedItemInfo={this.saveSelectedItemInfo}
                handleConsultListFetch={handleConsultListFetch}
                isLoading={timeSheet.dialogListInfo.isLoading}
                closeDialog={this.closeDialog}
              />
            )}

            {timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B02' && (
              <ContractListDialogInfo
                LFID={MyLFID}
                contractList={timeSheet.dialogListInfo.contractList}
                saveSelectedItemInfo={this.saveSelectedItemInfo}
                handleContractListFetch={handleContractListFetch}
                isLoading={timeSheet.dialogListInfo.isLoading}
                closeDialog={this.closeDialog}
              />
            )}

            {(timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B03' ||
              timeSheet.timeSheetDetail.bizCategoryCode === 'BIZCT_B04') && (
              <CaseListDialogInfo
                LFID={MyLFID}
                caseList={
                  caseType === 'L' ? timeSheet.dialogListInfo.litigationList : timeSheet.dialogListInfo.adviceList
                }
                saveSelectedItemInfo={this.saveSelectedItemInfo}
                handleCaseListFetch={handleCaseListFetch}
                isLoading={timeSheet.dialogListInfo.isLoading}
                closeDialog={this.closeDialog}
                caseType={caseType}
              />
            )}
          </DialogInfoForm>
        </>
      </GridTable>
    );
    return <>{DetailComponent}</>;
  }
}

export default MainDetailComponent;
