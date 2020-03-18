import React, { Component, Fragment } from 'react';
import { R, RU } from 'helpers/ramda';
import GridTable, { GridRow } from 'components/GridTable';
import CheckBox from 'components/CheckBox';
import Button from 'components/Button';
import Box from 'components/BoxOld';
import Chip from '@material-ui/core/Chip';
import Select from 'components/Select';
import AutoComplete from 'components/AutoComplete';
import DatePicker from 'components/DatePicker';
import InputBoxNumber from 'components/InputBoxNumber';
import InputBox from 'components/InputBox';
import TimePicker from 'components/TimePicker';
import DragDropPopUp from 'components/FileUpload';
import moment from 'moment';

const { mlMessage } = RU;

class DetailComponent extends Component {
  componentWillUnmount = () => {
    this.props.handleClearSaveData();
  };

  render() {
    const {
      formMode,
      bizCode,
      checkContract,
      relatedContract,
      checkCase,
      selectCase,
      relatedCase,
      clientList,
      client,
      managerList,
      owner,
      title,
      contents,
      chargeType,
      chargeTypeCode,
      targetPrice,
      date,
      time,
      spentMinute,
      isPublic,
      files,
      fileRefID,
      LFID,
      fileChart,
      handleFileDivisionAdd,
      saveKeyOfDivision,
      handleChange,
      setRelatedList,
      setContractDialogTrue,
      setCaseDialogTrue,
      clearContractSearchText,
      handleFileAdd,
      handleFileRemove,
    } = this.props;

    return (
      <GridTable colWidth1={100}>
        {!bizCode && (
          <>
            <GridRow title={mlMessage('pages.consultation.choiceContract')}>
              <>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {formMode !== 'detail' && (
                    <div style={{ marginRight: '-10px' }}>
                      <CheckBox
                        checked={checkContract}
                        onChange={(event, checked) => {
                          handleChange('save', 'checkContract', checked);
                          if (checked) {
                            handleChange('save', 'relatedContract', { ContractUUID: '', Title: '' });
                          }
                        }}
                        label={!checkContract ? '' : mlMessage('pages.consultation.notChoice')}
                      />
                    </div>
                  )}
                  {formMode !== 'detail' && !checkContract && (
                    <Button
                      size="square"
                      color="inverted"
                      onClick={() => {
                        // this.setState({ ...this.state, isContractOpen: true });
                        setContractDialogTrue();
                        clearContractSearchText();
                        setRelatedList('contract');
                      }}
                    >
                      <Box>{mlMessage('pages.consultation.choiceContract')}</Box>
                    </Button>
                  )}
                  {relatedContract && relatedContract.ContractUUID && (
                    <div
                      className="d-inline-block font-weight-semibold"
                      style={{ padding: formMode !== 'detail' ? '10px' : '0px' }}
                    >
                      {/* <Chip label={relatedContract.Title} /> */}
                      {relatedContract.Title}
                    </div>
                  )}
                  {!relatedContract && <div classNames="d-inline-block font-weight-semibold">선택하지 않음</div>}
                </div>
              </>
            </GridRow>
            <GridRow title={mlMessage('pages.consultation.choiceCase')}>
              <>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {formMode !== 'detail' && (
                    <div style={{ marginRight: '-10px' }}>
                      <CheckBox
                        checked={checkCase}
                        onChange={(event, checked) => {
                          handleChange('save', 'checkCase', checked);
                          if (checked) {
                            handleChange('save', 'relatedCase', { CaseUUID: '', Title: '' });
                            handleChange('save', 'selectedCase', 1);
                          }
                        }}
                        label={!checkCase ? '' : mlMessage('pages.consultation.notChoice')}
                      />
                    </div>
                  )}
                  {formMode !== 'detail' && !checkCase && (
                    <>
                      <Select
                        style={{ width: '130px', marginRight: '5px' }}
                        options={[{ key: 1, text: mlMessage('pages.legalLaw') }, { key: 2, text: '자문' }]}
                        selectedKey={selectCase}
                        onChange={(e, o) => {
                          handleChange('save', 'selectCase', o.key);
                          handleChange('save', 'relatedCase', { CaseUUID: '', Title: '' });
                        }}
                      />
                      {selectCase && (
                        <div>
                          <Button
                            size="square"
                            color="inverted"
                            onClick={() => {
                              // this.setState({ ...this.state, isCaseOpen: true });
                              setCaseDialogTrue();
                              setRelatedList('case');
                            }}
                          >
                            <Box>{selectCase === 1 ? mlMessage('pages.legalLaw') : '자문'} 선택</Box>
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
                {relatedCase && relatedCase.CaseUUID && (
                  <div
                    className="d-inline-block font-weight-semibold"
                    style={{ padding: formMode !== 'detail' ? '10px' : '0px' }}
                  >
                    {/* <Chip label={relatedCase.Title} /> */}
                    {relatedCase.Title}
                  </div>
                )}
                {!relatedCase && <div classNames="d-inline-block font-weight-semibold">선택하지 않음</div>}
              </>
            </GridRow>
          </>
        )}
        <GridRow title="의뢰인" redStar>
          <>
            <AutoComplete
              options={clientList || []}
              selectedOptions={client}
              handleChange={selectedOptions =>
                handleChange('save', 'client', selectedOptions.value, selectedOptions.useTable)
              }
              isMulti
              useTable
              zIndex={5}
              readOnly={formMode === 'detail'}
            />
          </>
        </GridRow>
        <GridRow title="담당자">
          <>
            <AutoComplete
              options={managerList || []}
              selectedOptions={owner}
              handleChange={selectedOptions => handleChange('save', 'owner', selectedOptions.value)}
              isMulti
              zIndex={4}
              readOnly={formMode === 'detail'}
            />
          </>
        </GridRow>
        <GridRow title={mlMessage('pages.common.title')} redStar>
          {formMode !== 'detail' ? (
            <InputBox
              name="title"
              value={title}
              maxLength={100}
              onChange={e => handleChange('save', e.target.name, e.target.value)}
            />
          ) : (
            <div>{title}</div>
          )}
        </GridRow>
        <GridRow title="내용" redStar>
          {formMode !== 'detail' ? (
            <InputBox
              rows="5"
              multiline
              name="contents"
              value={contents}
              maxLength={500}
              onChange={e => handleChange('save', e.target.name, e.target.value)}
              handleSubmit={e => {
                //   this.handleSubmit();
              }}
            />
          ) : (
            <div>{contents}</div>
          )}
        </GridRow>
        <GridRow title={mlMessage('pages.consultation.billingMethod')} redStar>
          {formMode !== 'detail' ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Select
                style={{ width: '130px', marginRight: '5px', marginLeft: '-5px' }}
                options={chargeType || []}
                selectedKey={chargeTypeCode}
                onChange={(e, o) => handleChange('save', 'chargeTypeCode', o.key)}
              />
              {chargeTypeCode !== 'CSCTYPE_F' && (
                <InputBoxNumber
                  width="200px"
                  thousandSeparator
                  value={targetPrice}
                  onValueChange={e => handleChange('save', 'targetPrice', e.value)}
                  unit="원"
                />
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="font-weight-semibold" style={{ paddingRight: '10px' }}>
                {R.filter(a => a.key === chargeTypeCode, chargeType)[0].text}
              </div>
              <div>{targetPrice}원</div>
            </div>
          )}
        </GridRow>
        <GridRow title={mlMessage('pages.consultation.dateTime')} redStar>
          {formMode !== 'detail' ? (
            <div style={{ display: 'flex' }}>
              <div style={{ paddingRight: '5px' }}>
                <DatePicker value={date || new Date()} onChange={date => handleChange('save', 'date', date)} />
              </div>
              <TimePicker
                use12Hours
                showSecond={false}
                value={time || null}
                format="h:mm a"
                onChange={value => handleChange('save', 'time', value)}
              />
            </div>
          ) : (
            <div style={{ display: 'flex' }}>
              <div style={{ paddingRight: '10px' }}>{date}</div>
              <div>{moment(time).format('h:mm a')}</div>
            </div>
          )}
        </GridRow>
        <GridRow title={mlMessage('pages.consultation.spentMinute')} redStar>
          {formMode !== 'detail' ? (
            <TimePicker
              use12Hours={false}
              showSecond={false}
              value={spentMinute}
              format="HH:mm"
              onChange={value => handleChange('save', 'spentMinute', value)}
            />
          ) : (
            <div>{moment(spentMinute).format('HH:mm')}</div>
          )}
        </GridRow>
        <GridRow title="공개 여부">
          {formMode !== 'detail' ? (
            <CheckBox checked={isPublic} onChange={(event, checked) => handleChange('save', 'isPublic', checked)} />
          ) : (
            <div>{isPublic ? '공개' : '비공개'}</div>
          )}
        </GridRow>
        <GridRow title={mlMessage('pages.consultation.relatedFile')}>
          {files.length === 0 && formMode === 'detail' && <div>저장된 파일이 없습니다.</div>}
          <DragDropPopUp
            files={files}
            handleFileAdd={target => handleFileAdd(target)}
            handleFileRemove={target => handleFileRemove(target)}
            LFID={LFID}
            showDownloadList
            fileChart={fileChart || []}
            handleFileDivisionAdd={handleFileDivisionAdd}
            saveKeyOfDivision={saveKeyOfDivision}
            isHideInfluxSelectBoxAndInputBox
            hideButton={formMode === 'detail'}
            existingFileID={fileRefID}
          />
        </GridRow>
      </GridTable>
    );
  }
}

export default DetailComponent;
