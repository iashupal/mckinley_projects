import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RU, R } from 'helpers/ramda';
import { Chip } from '@material-ui/core';
import Box from 'components/BoxOld';
import ButtonN from 'components/ButtonN';
import Button from 'components/Button';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import GridTable, { GridRow } from 'components/GridTable';
import CheckBox from 'components/CheckBox';
import DialogInfoForm from 'components/DialogInfoForm';
import RadioButton from 'components/RadioButton';
import DatePicker from 'components/DatePicker';
import Select from 'components/Select';
import DragDropPopUp from 'components/FileUpload';
import InputBoxNumber from 'components/InputBoxNumber';
import AutoComplete from 'components/AutoComplete';

const { mlMessage, yearMonthDay } = RU;

class DetailComponent extends Component {
  state = { isConsultationOpen: false, consultationSearchText: '' };

  componentWillUnmount = () => {
    this.props.clearData();
  };

  render() {
    const { isConsultationOpen, consultationSearchText } = this.state;
    const { formMode } = this.props;
    const { contractDetail, fetchConsultations, MyLFID } = this.props;
    const {
      setReduxValues,
      handleConsultationFetch,
      handleBillingTypeFilter,
      handleFileAddInList,
      handleFileRemoveInList,
      handleFileDivisionAdd,
      handleChangeSuccessData,
      handleAddSuccessDataForm,
      handleRemoveSuccessDataForm,
      saveConsultationUUID,
    } = this.props;

    const {
      FILECAT_SELECT,
      SUCL_SELECT,
      SUCLA_SELECT,
      SUCLB_SELECT,
      SUCLAA_SELECT,
      SUCLAB_SELECT,
      AMDTP_SELECT,
      AMTERM_SELECT,
      CURR_SELECT,
      SUCFTP_SELECT,
      autoComplete,
    } = this.props;

    const Detail_CommonUI_Part1 = (
      <>
        <GridRow title={mlMessage('pages.contract.choiceConsultation')} center>
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {formMode === 'des' ? (
                <span>{contractDetail.common.choiceOfConsultation ? '선택하지 않음' : ''}</span>
              ) : (
                <CheckBox
                  checked={contractDetail.common.choiceOfConsultation}
                  onChange={(event, checked) => {
                    setReduxValues({ _path: 'contractDetail.common', choiceOfConsultation: checked });
                    if (checked)
                      setReduxValues({
                        _path: 'contractDetail.common',
                        relatedConsultation: [],
                      });
                  }}
                  label={contractDetail.common.choiceOfConsultation ? '선택하지 않음' : ''}
                />
              )}

              {!contractDetail.common.choiceOfConsultation && formMode !== 'des' && (
                <Button
                  size="square"
                  color="inverted"
                  onClick={() => {
                    this.setState({ isConsultationOpen: true });
                    handleConsultationFetch({ LFID: MyLFID, searchText: consultationSearchText });
                  }}
                >
                  <Box>{mlMessage('pages.contract.choiceConsultation')}</Box>
                </Button>
              )}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'left' }}>
              {contractDetail.common.relatedConsultation && contractDetail.common.relatedConsultation.length > 0 && (
                <div style={{ width: '100%' }}>
                  {contractDetail.common.relatedConsultation.map(item => {
                    if (formMode === 'des') {
                      return (
                        <div key={item.consultUUID} style={{ marginRight: '3px', marginLeft: '3px' }}>
                          {item.title}
                        </div>
                      );
                    }
                    return (
                      <Chip
                        key={item.consultUUID}
                        name={item.consultUUID}
                        label={item.title}
                        onDelete={() => {
                          const newArr = [...contractDetail.common.relatedConsultation].filter(
                            option => option.consultUUID !== item.consultUUID,
                          );
                          setReduxValues({
                            _path: 'contractDetail.common',
                            relatedConsultation: newArr,
                          });
                        }}
                        style={{ marginRight: '3px', marginLeft: '3px' }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.choiceCase')} center redStar={formMode !== 'des'}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {formMode === 'des' && contractDetail.common.case === 'L' && mlMessage('pages.contract.litigation')}
            {formMode === 'des' && contractDetail.common.case === 'A' && mlMessage('pages.contract.advice')}
            {formMode !== 'des' && (
              <>
                <RadioButton
                  checked={contractDetail.common.case === 'L'}
                  label={mlMessage('pages.contract.litigation')}
                  value="L"
                  onChange={e => {
                    const { billingMethod } = contractDetail.litigation;
                    let billingType = null;
                    if (billingMethod === 'timeCharge') billingType = 'TC';
                    if (billingMethod === 'lumpSum') billingType = 'LS';
                    setReduxValues({ _path: 'contractDetail.common', case: e.target.value });
                    handleBillingTypeFilter({ caseType: 'L', billingType1Lv: billingType });
                  }}
                />
                <RadioButton
                  checked={contractDetail.common.case === 'A'}
                  label={mlMessage('pages.contract.advice')}
                  value="A"
                  onChange={e => {
                    const { contractMethod } = contractDetail.advice;
                    let billingType = null;
                    if (contractMethod === 'advisorContract') billingType = 'M';
                    if (contractMethod === 'somethingUnusualContract') billingType = 'U';
                    setReduxValues({ _path: 'contractDetail.common', case: e.target.value });
                    handleBillingTypeFilter({ caseType: 'A', billingType1Lv: billingType });
                  }}
                />
              </>
            )}
          </div>
        </GridRow>
      </>
    );

    const Detail_CommonUI_Part2 = (
      <>
        <GridRow title={mlMessage('pages.contract.client')} center redStar={formMode !== 'des'}>
          <div style={{ textAlign: 'left' }}>
            <AutoComplete
              isMulti
              options={autoComplete.clientList || []}
              selectedOptions={contractDetail.common.client}
              handleChange={selectedOptions => {
                const { value } = selectedOptions;
                const checkArray = value.filter(data => data.isMain === true);
                const newData = R.clone(value);
                if (checkArray.length === 0 && newData.length > 0) {
                  newData[0].isMain = true;
                }
                setReduxValues({
                  _path: 'contractDetail.common',
                  client: newData,
                });
              }}
              useTable
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.manager')} center>
          <div style={{ textAlign: 'left' }}>
            <AutoComplete
              isMulti
              options={autoComplete.lawFirmEmpList}
              selectedOptions={contractDetail.common.manager}
              handleChange={selectedOptions => {
                setReduxValues({
                  _path: 'contractDetail.common',
                  manager: selectedOptions.value,
                });
              }}
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.common.title')} center redStar={formMode !== 'des'}>
          <InputBox
            value={contractDetail.common.title}
            onChange={e => setReduxValues({ _path: 'contractDetail.common', title: e.target.value })}
            handleSubmit={e => {}}
            width="400px"
            readOnly={formMode === 'des'}
          />
        </GridRow>
        <GridRow title={mlMessage('pages.contract.contents')} center redStar={formMode !== 'des'}>
          <InputBox
            multiline
            value={contractDetail.common.contents}
            onChange={e => setReduxValues({ _path: 'contractDetail.common', contents: e.target.value })}
            handleSubmit={e => {}}
            width="400px"
            readOnly={formMode === 'des'}
          />
        </GridRow>
        <GridRow title={mlMessage('pages.contract.period')} center redStar={formMode !== 'des'}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'left' }}>
              <DatePicker
                value={contractDetail.common.termOfContract.start}
                onChange={date =>
                  setReduxValues({ _path: 'contractDetail.common.termOfContract', start: yearMonthDay(date) })
                }
                readOnly={formMode === 'des'}
              />
            </div>

            {formMode === 'des' ? (
              <div>&nbsp;-&nbsp;</div>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  padding: '10px',
                }}
              >
                -
              </div>
            )}

            <div style={{ textAlign: 'left' }}>
              <DatePicker
                value={contractDetail.common.termOfContract.end}
                onChange={date =>
                  setReduxValues({ _path: 'contractDetail.common.termOfContract', end: yearMonthDay(date) })
                }
                readOnly={formMode === 'des'}
              />
            </div>
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.contractDate')} center redStar={formMode !== 'des'}>
          <div style={{ textAlign: 'left' }}>
            <DatePicker
              value={contractDetail.common.dateOfContract}
              onChange={date => setReduxValues({ _path: 'contractDetail.common', dateOfContract: yearMonthDay(date) })}
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.terminationAlarm')} center>
          <div style={{ textAlign: 'left' }}>
            {formMode === 'des' ? (
              <div>
                {contractDetail.common.isTerminationAlarmSetting && '알림'}
                {!contractDetail.common.isTerminationAlarmSetting && '미알림'}
              </div>
            ) : (
              <CheckBox
                checked={contractDetail.common.isTerminationAlarmSetting}
                onChange={(event, checked) =>
                  setReduxValues({ _path: 'contractDetail.common', isTerminationAlarmSetting: checked })
                }
              />
            )}
          </div>
        </GridRow>
      </>
    );

    const Detail_CommonUI_Part3 = (
      <>
        <GridRow title={mlMessage('pages.contract.currency')} center redStar={formMode !== 'des'}>
          <div style={{ textAlign: 'left', marginLeft: formMode === 'des' ? '' : '-5px' }}>
            <Select
              options={CURR_SELECT}
              selectedKey={contractDetail.common.currency.key}
              onChange={(event, option, index) => {
                setReduxValues({ _path: 'contractDetail.common', currency: { key: option.key, value: option.text } });
              }}
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.relatedFile')} center>
          <div style={{ textAlign: 'left', marginLeft: '-5px' }}>
            <DragDropPopUp
              files={contractDetail.common.files || []}
              fileChart={FILECAT_SELECT || []}
              handleFileAdd={target => handleFileAddInList(target)}
              handleFileRemove={target => handleFileRemoveInList(target)}
              handleFileDivisionAdd={handleFileDivisionAdd}
              LFID={MyLFID}
              showDownloadList
              isHideInfluxSelectBoxAndInputBox
              hideButton={formMode === 'des'}
              existingFileID={contractDetail.common.fileRefID}
            />
          </div>
        </GridRow>
      </>
    );

    const Detail_LitigationUI_Part1 = (
      <GridRow title={mlMessage('pages.contract.billingMethod')} center redStar={formMode !== 'des'}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {formMode === 'des' && contractDetail.litigation.billingMethod === 'timeCharge' && 'Time Charge'}
          {formMode === 'des' && contractDetail.litigation.billingMethod === 'lumpSum' && 'Lump Sum'}
          {formMode !== 'des' && (
            <>
              <RadioButton
                checked={contractDetail.litigation.billingMethod === 'timeCharge'}
                label="Time Charge"
                value="timeCharge"
                onChange={e => {
                  setReduxValues({ _path: 'contractDetail.litigation', billingMethod: e.target.value });
                  handleBillingTypeFilter({ caseType: 'L', billingType1Lv: 'TC' });
                }}
              />
              <RadioButton
                checked={contractDetail.litigation.billingMethod === 'lumpSum'}
                label="Lump Sum"
                value="lumpSum"
                onChange={e => {
                  setReduxValues({ _path: 'contractDetail.litigation', billingMethod: e.target.value });
                  handleBillingTypeFilter({ caseType: 'L', billingType1Lv: 'LS' });
                }}
              />
            </>
          )}
        </div>
      </GridRow>
    );

    const Detail_LitigationUI_Part2 = (
      <>
        <GridRow title={mlMessage('pages.contract.etcOption')} center>
          <div style={{ textAlign: 'left' }}>
            <InputBox
              value={contractDetail.litigation.otherCondition}
              onChange={e => setReduxValues({ _path: 'contractDetail.litigation', otherCondition: e.target.value })}
              width="400px"
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.partialPayOption')} center>
          <div style={{ textAlign: 'left' }}>
            <InputBox
              value={contractDetail.litigation.installmentCondition}
              onChange={e =>
                setReduxValues({ _path: 'contractDetail.litigation', installmentCondition: e.target.value })
              }
              width="400px"
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
      </>
    );

    const Detail_AdviceUI_Part1 = (
      <GridRow title={mlMessage('pages.contract.contractMethod')} center redStar={formMode !== 'des'}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {formMode === 'des' &&
            contractDetail.advice.contractMethod === 'advisorContract' &&
            mlMessage('pages.contract.adviserContract')}
          {formMode === 'des' &&
            contractDetail.advice.contractMethod === 'somethingUnusualContract' &&
            mlMessage('pages.contract.somethingUnusualContract')}
          {formMode !== 'des' && (
            <>
              <RadioButton
                checked={contractDetail.advice.contractMethod === 'advisorContract'}
                label={mlMessage('pages.contract.adviserContract')}
                value="advisorContract"
                onChange={e => {
                  setReduxValues({ _path: 'contractDetail.advice', contractMethod: e.target.value });
                  handleBillingTypeFilter({ caseType: 'A', billingType1Lv: 'M' });
                }}
              />
              <RadioButton
                checked={contractDetail.advice.contractMethod === 'somethingUnusualContract'}
                label={mlMessage('pages.contract.somethingUnusualContract')}
                value="somethingUnusualContract"
                onChange={e => {
                  const { billingMethod } = contractDetail.adviceSomethingUnusualContract;
                  let billingType = null;
                  if (billingMethod === 'timeCharge') billingType = 'TC';
                  if (billingMethod === 'lumpSum') billingType = 'LS';
                  setReduxValues({ _path: 'contractDetail.advice', contractMethod: e.target.value });
                  handleBillingTypeFilter({ caseType: 'A', billingType1Lv: 'U', billingType2Lv: billingType });
                }}
              />
            </>
          )}
        </div>
      </GridRow>
    );

    const Detail_Advice_SomethingUnusualContractUI_Part1 = (
      <GridRow title={mlMessage('pages.contract.billingMethod')} center redStar={formMode !== 'des'}>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {formMode === 'des' &&
            contractDetail.adviceSomethingUnusualContract.billingMethod === 'timeCharge' &&
            'Time Charge'}
          {formMode === 'des' &&
            contractDetail.adviceSomethingUnusualContract.billingMethod === 'lumpSum' &&
            'Lump Sum'}
          {formMode !== 'des' && (
            <>
              <RadioButton
                checked={contractDetail.adviceSomethingUnusualContract.billingMethod === 'timeCharge'}
                label="Time Charge"
                value="timeCharge"
                onChange={e => {
                  setReduxValues({
                    _path: 'contractDetail.adviceSomethingUnusualContract',
                    billingMethod: e.target.value,
                  });
                  handleBillingTypeFilter({ caseType: 'A', billingType1Lv: 'U', billingType2Lv: 'TC' });
                }}
              />
              <RadioButton
                checked={contractDetail.adviceSomethingUnusualContract.billingMethod === 'lumpSum'}
                label="Lump Sum"
                value="lumpSum"
                onChange={e => {
                  setReduxValues({
                    _path: 'contractDetail.adviceSomethingUnusualContract',
                    billingMethod: e.target.value,
                  });
                  handleBillingTypeFilter({ caseType: 'A', billingType1Lv: 'U', billingType2Lv: 'LS' });
                }}
              />
            </>
          )}
        </div>
      </GridRow>
    );

    const Detail_Litigation_TimeChargeUI_Part1 = (
      <>
        <GridRow title={mlMessage('pages.contract.isAdvanceFee')} center>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {formMode === 'des' ? (
              <>
                <div>
                  {contractDetail.litigationTimeCharge.isAdvanceFee && <span>지급 : &nbsp;</span>}
                  {!contractDetail.litigationTimeCharge.isAdvanceFee && '미지급'}
                </div>
              </>
            ) : (
              <CheckBox
                checked={contractDetail.litigationTimeCharge.isAdvanceFee}
                onChange={(event, checked) =>
                  setReduxValues({ _path: 'contractDetail.litigationTimeCharge', isAdvanceFee: checked })
                }
              />
            )}

            {contractDetail.litigationTimeCharge.isAdvanceFee && (
              <InputBoxNumber
                width="200px"
                thousandSeparator
                value={contractDetail.litigationTimeCharge.advanceFee}
                onValueChange={obj =>
                  setReduxValues({ _path: 'contractDetail.litigationTimeCharge', advanceFee: obj.value })
                }
                unit="$"
                readOnly={formMode === 'des'}
              />
            )}
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.rate')} center redStar={formMode !== 'des'}>
          <div style={{ textAlign: 'left' }}>
            <InputBoxNumber
              width="100px"
              value={contractDetail.litigationTimeCharge.rate}
              maxLength={5}
              onValueChange={obj => setReduxValues({ _path: 'contractDetail.litigationTimeCharge', rate: obj.value })}
              unit="%"
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.discountRate')} center redStar={formMode !== 'des'}>
          <div style={{ textAlign: 'left' }}>
            <InputBoxNumber
              width="100px"
              value={contractDetail.litigationTimeCharge.discountRate}
              maxLength={5}
              onValueChange={obj =>
                setReduxValues({ _path: 'contractDetail.litigationTimeCharge', discountRate: obj.value })
              }
              unit="%"
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.maximumPrice')} center redStar={formMode !== 'des'}>
          <div style={{ textAlign: 'left' }}>
            <InputBoxNumber
              width="200px"
              thousandSeparator
              value={contractDetail.litigationTimeCharge.maximumPrice}
              onValueChange={obj =>
                setReduxValues({ _path: 'contractDetail.litigationTimeCharge', maximumPrice: obj.value })
              }
              unit="$"
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
      </>
    );

    const Detail_Litigation_LumpSumUI_Part1 = (
      <>
        <GridRow title={mlMessage('pages.contract.isRetainer')} center>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {formMode === 'des' ? (
              <div>
                {contractDetail.litigationLumpSum.isRetainer && <span>지급 : &nbsp;</span>}
                {!contractDetail.litigationLumpSum.isRetainer && '미지급'}
              </div>
            ) : (
              <CheckBox
                checked={contractDetail.litigationLumpSum.isRetainer}
                onChange={(event, checked) =>
                  setReduxValues({ _path: 'contractDetail.litigationLumpSum', isRetainer: checked })
                }
              />
            )}

            {contractDetail.litigationLumpSum.isRetainer && (
              <InputBoxNumber
                width="200px"
                thousandSeparator
                value={contractDetail.litigationLumpSum.retainer}
                onValueChange={obj =>
                  setReduxValues({ _path: 'contractDetail.litigationLumpSum', retainer: obj.value })
                }
                unit="$"
                readOnly={formMode === 'des'}
              />
            )}
          </div>
        </GridRow>

        {contractDetail.litigationLumpSum.arrayRelevantToSuccess.map((successForm, index) => (
          <React.Fragment key={index}>
            <GridRow
              key={index + 0.01}
              title={`${mlMessage('pages.contract.successCondition')}(${index + 1})`}
              center
              redStar={formMode !== 'des'}
            >
              <React.Fragment key={index + 0.02}>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ textAlign: 'left', marginLeft: formMode === 'des' ? '' : '-5px' }}>
                      <Select
                        placeholder={mlMessage('pages.contract.lv1')}
                        options={SUCL_SELECT || []}
                        selectedKey={successForm.successCondition1Lv.key}
                        onChange={(event, option) =>
                          handleChangeSuccessData({
                            index,
                            path: 'successCondition1Lv',
                            data: {
                              key: option.key,
                              value: option.text,
                            },
                          })
                        }
                        style={{ width: '175px' }}
                        readOnly={formMode === 'des'}
                      />
                    </div>
                    {formMode === 'des' && <span>&nbsp; / &nbsp;</span>}
                    {successForm.successCondition1Lv.key === 'SUCL_A' && (
                      <>
                        <div style={{ textAlign: 'left' }}>
                          <Select
                            placeholder={mlMessage('pages.contract.lv2')}
                            options={SUCLA_SELECT || []}
                            selectedKey={successForm.successCondition2Lv.key}
                            onChange={(event, option) =>
                              handleChangeSuccessData({
                                index,
                                path: 'successCondition2Lv',
                                data: {
                                  key: option.key,
                                  value: option.text,
                                },
                              })
                            }
                            readOnly={formMode === 'des'}
                          />
                        </div>
                        {formMode === 'des' && <span>&nbsp; / &nbsp;</span>}
                        {successForm.successCondition2Lv.key === 'SUCLA_A' && (
                          <div style={{ textAlign: 'left' }}>
                            <Select
                              placeholder={mlMessage('pages.contract.lv3')}
                              options={SUCLAA_SELECT || []}
                              selectedKey={successForm.successCondition3Lv.key}
                              onChange={(event, option) =>
                                handleChangeSuccessData({
                                  index,
                                  path: 'successCondition3Lv',
                                  data: {
                                    key: option.key,
                                    value: option.text,
                                  },
                                })
                              }
                              readOnly={formMode === 'des'}
                            />
                          </div>
                        )}
                        {successForm.successCondition2Lv.key === 'SUCLA_B' && (
                          <div style={{ textAlign: 'left' }}>
                            <Select
                              placeholder={mlMessage('pages.contract.lv3')}
                              options={SUCLAB_SELECT || []}
                              selectedKey={successForm.successCondition3Lv.key}
                              onChange={(event, option) =>
                                handleChangeSuccessData({
                                  index,
                                  path: 'successCondition3Lv',
                                  data: {
                                    key: option.key,
                                    value: option.text,
                                  },
                                })
                              }
                              readOnly={formMode === 'des'}
                            />
                          </div>
                        )}
                      </>
                    )}
                    {successForm.successCondition1Lv.key === 'SUCL_B' && (
                      <>
                        <div style={{ textAlign: 'left' }}>
                          <Select
                            placeholder={mlMessage('pages.contract.lv2')}
                            options={SUCLB_SELECT || []}
                            selectedKey={successForm.successCondition2Lv.key}
                            onChange={(event, option) =>
                              handleChangeSuccessData({
                                index,
                                path: 'successCondition2Lv',
                                data: {
                                  key: option.key,
                                  value: option.text,
                                },
                              })
                            }
                            readOnly={formMode === 'des'}
                          />
                        </div>
                        {formMode === 'des' && <span>&nbsp; / &nbsp;</span>}
                      </>
                    )}
                  </div>
                  {formMode !== 'des' && index === 0 && (
                    <div>
                      <ButtonN
                        type="icon"
                        icon="add_to_queue"
                        color="primary"
                        onClick={e => handleAddSuccessDataForm()}
                        label={mlMessage('pages.contract.add')}
                      />
                    </div>
                  )}
                  {formMode !== 'des' && index !== 0 && (
                    <div>
                      <ButtonN
                        type="icon"
                        icon="remove_to_queue"
                        color="inverted"
                        onClick={e => handleRemoveSuccessDataForm({ index })}
                        label={mlMessage('pages.contract.delete')}
                      />
                    </div>
                  )}
                </div>
                {successForm.successCondition3Lv.key === 'SUCLAB_C' && (
                  <div style={{ marginTop: '5px', textAlign: 'left' }}>
                    <InputBoxNumber
                      width="200px"
                      thousandSeparator
                      value={successForm.successConditionText}
                      onValueChange={obj =>
                        handleChangeSuccessData({
                          index,
                          path: 'successConditionText',
                          data: obj.value,
                        })
                      }
                      unit="$"
                      readOnly={formMode === 'des'}
                    />
                  </div>
                )}
                {(successForm.successCondition3Lv.key === 'SUCLAA_Z' ||
                  successForm.successCondition3Lv.key === 'SUCLAB_Z') && (
                  <div style={{ marginTop: '5px' }}>
                    <InputBox
                      value={successForm.successConditionText}
                      onChange={e =>
                        handleChangeSuccessData({
                          index,
                          path: 'successConditionText',
                          data: e.target.value,
                        })
                      }
                      width="400px"
                      readOnly={formMode === 'des'}
                    />
                  </div>
                )}
              </React.Fragment>
            </GridRow>
            <GridRow
              key={index + 0.03}
              title={`${mlMessage('pages.contract.rewardType')}(${index + 1})`}
              center
              redStar={formMode !== 'des'}
            >
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ textAlign: 'left', marginLeft: formMode === 'des' ? '' : '-5px' }}>
                  <Select
                    options={SUCFTP_SELECT}
                    selectedKey={successForm.rewardType.key}
                    onChange={(event, option) =>
                      handleChangeSuccessData({
                        index,
                        path: 'rewardType',
                        data: {
                          key: option.key,
                          value: option.text,
                        },
                      })
                    }
                    readOnly={formMode === 'des'}
                  />
                </div>
                <span>&nbsp;</span>
                {successForm.rewardType.key === 'SUCFTP_A' && (
                  <InputBoxNumber
                    width="200px"
                    thousandSeparator
                    value={successForm.successFee}
                    onValueChange={obj =>
                      handleChangeSuccessData({
                        index,
                        path: 'successFee',
                        data: obj.value,
                      })
                    }
                    unit="$"
                    readOnly={formMode === 'des'}
                  />
                )}

                {successForm.rewardType.key === 'SUCFTP_R' && (
                  <InputBoxNumber
                    width="100px"
                    value={successForm.successFee}
                    maxLength={5}
                    onValueChange={obj =>
                      handleChangeSuccessData({
                        index,
                        path: 'successFee',
                        data: obj.value,
                      })
                    }
                    unit="%"
                    readOnly={formMode === 'des'}
                  />
                )}
              </div>
            </GridRow>
          </React.Fragment>
        ))}
      </>
    );

    const Detail_Advice_AdvisorContractUI_Part1 = (
      <>
        <GridRow title={mlMessage('pages.contract.basicMonthlyConsultingFee')} center redStar={formMode !== 'des'}>
          <div style={{ textAlign: 'left' }}>
            <InputBoxNumber
              width="200px"
              thousandSeparator
              value={contractDetail.adviceAdvisorContract.basicMonthlyConsultingFee}
              onValueChange={obj =>
                setReduxValues({ _path: 'contractDetail.adviceAdvisorContract', basicMonthlyConsultingFee: obj.value })
              }
              unit="$"
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.basicConsultingHour')} center redStar={formMode !== 'des'}>
          <div style={{ textAlign: 'left' }}>
            <InputBoxNumber
              width="100px"
              value={contractDetail.adviceAdvisorContract.basicConsultingHour}
              decimalScale={1}
              maxLength={5}
              onValueChange={obj =>
                setReduxValues({ _path: 'contractDetail.adviceAdvisorContract', basicConsultingHour: obj.value })
              }
              unit="시간"
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.orderOfConsultationTime')} center redStar={formMode !== 'des'}>
          <div style={{ textAlign: 'left', marginLeft: formMode === 'des' ? '' : '-5px' }}>
            <Select
              options={AMDTP_SELECT}
              style={{ width: '300px' }}
              selectedKey={contractDetail.adviceAdvisorContract.orderOfConsultationTime.key}
              onChange={(event, option) =>
                setReduxValues({
                  _path: 'contractDetail.adviceAdvisorContract',
                  orderOfConsultationTime: { key: option.key, value: option.text },
                })
              }
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.specialDiscountRate')} center redStar={formMode !== 'des'}>
          <div style={{ textAlign: 'left' }}>
            <InputBoxNumber
              width="100px"
              value={contractDetail.adviceAdvisorContract.specialDiscountRate}
              maxLength={5}
              onValueChange={obj =>
                setReduxValues({ _path: 'contractDetail.adviceAdvisorContract', specialDiscountRate: obj.value })
              }
              unit="%"
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.additionalAdvisoryRate')} center redStar={formMode !== 'des'}>
          <div style={{ textAlign: 'left' }}>
            <InputBoxNumber
              width="100px"
              value={contractDetail.adviceAdvisorContract.additionalAdvisoryRate}
              maxLength={5}
              onValueChange={obj =>
                setReduxValues({ _path: 'contractDetail.adviceAdvisorContract', additionalAdvisoryRate: obj.value })
              }
              unit="%"
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.additionalAdvisoryDiscountRate')} center redStar={formMode !== 'des'}>
          <div style={{ textAlign: 'left' }}>
            <InputBoxNumber
              width="100px"
              value={contractDetail.adviceAdvisorContract.additionalAdvisoryDiscountRate}
              maxLength={5}
              onValueChange={obj =>
                setReduxValues({
                  _path: 'contractDetail.adviceAdvisorContract',
                  additionalAdvisoryDiscountRate: obj.value,
                })
              }
              unit="%"
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.calculationDate')} center redStar={formMode !== 'des'}>
          <div style={{ textAlign: 'left', marginLeft: formMode === 'des' ? '' : '-5px' }}>
            <Select
              options={AMTERM_SELECT}
              selectedKey={contractDetail.adviceAdvisorContract.calculationDate.key}
              onChange={(event, option, index) =>
                setReduxValues({
                  _path: 'contractDetail.adviceAdvisorContract',
                  calculationDate: { key: option.key, value: option.text },
                })
              }
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
      </>
    );

    const Detail_Advice_SomethingUnusualContract_TimeChargeUI_Part1 = (
      <>
        <GridRow title={mlMessage('pages.contract.isAdvanceFee')} center>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {formMode === 'des' ? (
              <div>
                {contractDetail.adviceSomethingUnusualContractTimeCharge.isMoneyInAdvance && <span>지급 : &nbsp;</span>}
                {!contractDetail.adviceSomethingUnusualContractTimeCharge.isMoneyInAdvance && '미지급'}
              </div>
            ) : (
              <CheckBox
                checked={contractDetail.adviceSomethingUnusualContractTimeCharge.isMoneyInAdvance}
                onChange={(event, checked) =>
                  setReduxValues({
                    _path: 'contractDetail.adviceSomethingUnusualContractTimeCharge',
                    isMoneyInAdvance: checked,
                  })
                }
              />
            )}

            {contractDetail.adviceSomethingUnusualContractTimeCharge.isMoneyInAdvance && (
              <div style={{ textAlign: 'left' }}>
                <InputBoxNumber
                  width="200px"
                  thousandSeparator
                  value={contractDetail.adviceSomethingUnusualContractTimeCharge.moneyInAdvance}
                  onValueChange={obj =>
                    setReduxValues({
                      _path: 'contractDetail.adviceSomethingUnusualContractTimeCharge',
                      moneyInAdvance: obj.value,
                    })
                  }
                  unit="$"
                  readOnly={formMode === 'des'}
                />
              </div>
            )}
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.rate')} center redStar={formMode !== 'des'}>
          <div style={{ textAlign: 'left' }}>
            <InputBoxNumber
              width="100px"
              value={contractDetail.adviceSomethingUnusualContractTimeCharge.rate}
              maxLength={5}
              onValueChange={obj =>
                setReduxValues({
                  _path: 'contractDetail.adviceSomethingUnusualContractTimeCharge',
                  rate: obj.value,
                })
              }
              unit="%"
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.discountRate')} center redStar={formMode !== 'des'}>
          <div style={{ textAlign: 'left' }}>
            <InputBoxNumber
              width="100px"
              value={contractDetail.adviceSomethingUnusualContractTimeCharge.discountRate}
              maxLength={5}
              onValueChange={obj =>
                setReduxValues({
                  _path: 'contractDetail.adviceSomethingUnusualContractTimeCharge',
                  discountRate: obj.value,
                })
              }
              unit="%"
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.maximumPrice')} center redStar={formMode !== 'des'}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <InputBoxNumber
              width="200px"
              thousandSeparator
              value={contractDetail.adviceSomethingUnusualContractTimeCharge.maximumPrice}
              onValueChange={obj =>
                setReduxValues({
                  _path: 'contractDetail.adviceSomethingUnusualContractTimeCharge',
                  maximumPrice: obj.value,
                })
              }
              unit="$"
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.option')} center>
          <div style={{ textAlign: 'left' }}>
            <InputBox
              value={contractDetail.adviceSomethingUnusualContractTimeCharge.condition}
              onChange={e =>
                setReduxValues({
                  _path: 'contractDetail.adviceSomethingUnusualContractTimeCharge',
                  condition: e.target.value,
                })
              }
              width="400px"
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
      </>
    );

    const Detail_Advice_SomethingUnusualContract_LumpSumUI_Part1 = (
      <>
        <GridRow title={mlMessage('pages.contract.isRetainer')} center>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {formMode === 'des' ? (
              <div>
                {contractDetail.adviceSomethingUnusualContractLumpSum.isRetainer && <span>지급 : &nbsp;</span>}
                {!contractDetail.adviceSomethingUnusualContractLumpSum.isRetainer && '미지급'}
              </div>
            ) : (
              <CheckBox
                checked={contractDetail.adviceSomethingUnusualContractLumpSum.isRetainer}
                onChange={(event, checked) =>
                  setReduxValues({
                    _path: 'contractDetail.adviceSomethingUnusualContractLumpSum',
                    isRetainer: checked,
                  })
                }
              />
            )}

            {contractDetail.adviceSomethingUnusualContractLumpSum.isRetainer && (
              <div style={{ textAlign: 'left' }}>
                <InputBoxNumber
                  width="200px"
                  thousandSeparator
                  value={contractDetail.adviceSomethingUnusualContractLumpSum.retainer}
                  onValueChange={obj =>
                    setReduxValues({
                      _path: 'contractDetail.adviceSomethingUnusualContractLumpSum',
                      retainer: obj.value,
                    })
                  }
                  unit="$"
                  readOnly={formMode === 'des'}
                />
              </div>
            )}
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.middlePayment')} center redStar={formMode !== 'des'}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'left' }}>
              <DatePicker
                value={contractDetail.adviceSomethingUnusualContractLumpSum.dateOfMiddlePayment}
                onChange={date =>
                  setReduxValues({
                    _path: 'contractDetail.adviceSomethingUnusualContractLumpSum',
                    dateOfMiddlePayment: yearMonthDay(date),
                  })
                }
                readOnly={formMode === 'des'}
              />
            </div>
            {formMode === 'des' ? <span>&nbsp;:&nbsp;</span> : <span>&nbsp;</span>}
            <div>
              <InputBoxNumber
                width="200px"
                thousandSeparator
                value={contractDetail.adviceSomethingUnusualContractLumpSum.middlePayment}
                onValueChange={obj =>
                  setReduxValues({
                    _path: 'contractDetail.adviceSomethingUnusualContractLumpSum',
                    middlePayment: obj.value,
                  })
                }
                unit="$"
                readOnly={formMode === 'des'}
              />
            </div>
          </div>
        </GridRow>
        <GridRow title={mlMessage('pages.contract.balancePayment')} center redStar={formMode !== 'des'}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'left' }}>
              <DatePicker
                value={contractDetail.adviceSomethingUnusualContractLumpSum.dateOfBalance}
                onChange={date =>
                  setReduxValues({
                    _path: 'contractDetail.adviceSomethingUnusualContractLumpSum',
                    dateOfBalance: yearMonthDay(date),
                  })
                }
                readOnly={formMode === 'des'}
              />
            </div>
            {formMode === 'des' ? <span>&nbsp;:&nbsp;</span> : <span>&nbsp;</span>}
            <InputBoxNumber
              width="200px"
              thousandSeparator
              value={contractDetail.adviceSomethingUnusualContractLumpSum.balance}
              onValueChange={obj =>
                setReduxValues({
                  _path: 'contractDetail.adviceSomethingUnusualContractLumpSum',
                  balance: obj.value,
                })
              }
              unit="$"
              readOnly={formMode === 'des'}
            />
          </div>
        </GridRow>
      </>
    );

    const DetailComponent = (
      <>
        <GridTable>
          {Detail_CommonUI_Part1}
          {contractDetail.common.case === 'L' && Detail_LitigationUI_Part1}
          {contractDetail.common.case === 'A' && Detail_AdviceUI_Part1}

          {contractDetail.common.case === 'A' &&
            contractDetail.advice.contractMethod === 'somethingUnusualContract' &&
            Detail_Advice_SomethingUnusualContractUI_Part1}

          {Detail_CommonUI_Part2}

          {contractDetail.common.case === 'L' &&
            contractDetail.litigation.billingMethod === 'timeCharge' &&
            Detail_Litigation_TimeChargeUI_Part1}

          {contractDetail.common.case === 'L' &&
            contractDetail.litigation.billingMethod === 'lumpSum' &&
            Detail_Litigation_LumpSumUI_Part1}

          {contractDetail.common.case === 'L' && Detail_LitigationUI_Part2}

          {contractDetail.common.case === 'A' &&
            contractDetail.advice.contractMethod === 'advisorContract' &&
            Detail_Advice_AdvisorContractUI_Part1}

          {contractDetail.common.case === 'A' &&
            contractDetail.advice.contractMethod === 'somethingUnusualContract' &&
            contractDetail.adviceSomethingUnusualContract.billingMethod === 'timeCharge' &&
            Detail_Advice_SomethingUnusualContract_TimeChargeUI_Part1}

          {contractDetail.common.case === 'A' &&
            contractDetail.advice.contractMethod === 'somethingUnusualContract' &&
            contractDetail.adviceSomethingUnusualContract.billingMethod === 'lumpSum' &&
            Detail_Advice_SomethingUnusualContract_LumpSumUI_Part1}

          {Detail_CommonUI_Part3}
        </GridTable>

        <DialogInfoForm
          title="상담 선택"
          open={isConsultationOpen}
          actions={
            <ButtonN
              color="inverted"
              type="large"
              onClick={() => this.setState({ isConsultationOpen: false })}
              label="닫기"
            />
          }
          fullWidth
          maxWidth="md"
        >
          <Table
            initOrder="desc"
            initOrderBy="consultingdate"
            rows={[
              { id: 'client', label: mlMessage('pages.contract.client'), width: '15%' },
              { id: 'managerNameStr', label: mlMessage('pages.contract.manager'), width: '30%' },
              { id: 'title', label: mlMessage('pages.common.title'), align: 'left', width: '30%' },
              {
                id: 'consultingdate',
                type: 'date',
                label: mlMessage('pages.consultation.consultationDate'),
                width: '15%',
              },
            ]}
            data={fetchConsultations || []}
            customColumn={[
              {
                field: 'owner',
                component: ({ row }) =>
                  row.owner.map((owner, idx) => <span key={idx}>{`${!owner.label ? '미정' : owner.label} `}</span>),
              },
            ]}
            mngIcons={id => (
              <>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    saveConsultationUUID(id);
                    this.setState({ isConsultationOpen: false });
                  }}
                >
                  <Box>선택</Box>
                </Button>
              </>
            )}
            mngIconsWidth="10%"
            condComponents={
              <>
                <div style={{ marginLeft: '5px' }}>
                  <InputBox
                    placeholder={mlMessage('pages.consultation.searchPlaceholder')}
                    iconName="Search"
                    value={consultationSearchText}
                    onChange={e => this.setState({ consultationSearchText: e.target.value })}
                    handleSubmit={() => handleConsultationFetch({ LFID: MyLFID, searchText: consultationSearchText })}
                  />
                </div>
              </>
            }
            multiKey={['LawFirmID', 'id', 'title']}
          />
        </DialogInfoForm>
      </>
    );

    return <>{DetailComponent}</>;
  }
}
const mapStateToProps = ({ common }) => {
  const {
    FILECAT_SELECT,
    SUCL_SELECT,
    SUCLA_SELECT,
    SUCLB_SELECT,
    SUCLAA_SELECT,
    SUCLAB_SELECT,
    AMDTP_SELECT,
    AMTERM_SELECT,
    CURR_SELECT,
    SUCFTP_SELECT,
  } = common.allCodes;
  const { autoComplete } = common;
  return {
    FILECAT_SELECT,
    SUCL_SELECT,
    SUCLA_SELECT,
    SUCLB_SELECT,
    SUCLAA_SELECT,
    SUCLAB_SELECT,
    AMDTP_SELECT,
    AMTERM_SELECT,
    CURR_SELECT,
    SUCFTP_SELECT,
    autoComplete,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailComponent);
