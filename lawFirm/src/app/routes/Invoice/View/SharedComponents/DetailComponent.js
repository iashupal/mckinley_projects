import React, { Component, useState } from 'react';
import { RU } from 'helpers/ramda';
import InputBox from 'components/InputBox';
import GridTable, { GridRow } from 'components/GridTable';
import AutoComplete from 'components/AutoComplete';
import DatePicker from 'components/DatePicker';
import CheckBox from 'components/CheckBox';
import Select from 'components/Select';
import Button from 'components/Button';
import ButtonN from 'components/ButtonN';
import Box from 'components/BoxOld';
import DialogInfoForm from 'components/DialogInfoForm';
import { EditorW } from 'helpers/ui';
import InvoiceHistoryDialog from './InvoiceHistoryDialog';
import TCDailog from './TCDailog';

const { mlMessage, yearMonthDay } = RU;

class DetailComponent extends Component {
  state = {
    invoiceType: { key: '1' },
    invoiceStatus: { key: '1' },
    invoiceFormat: { key: '1' },
  };

  render() {
    const {
      isOpenHistoryDialog,
      isOpenTCDialog,
      formMode,
      handleToggleDialog,
      invoice,
      autoComplete,
      setReduxValues,
    } = this.props;
    const { invoiceType, invoiceStatus, invoiceFormat } = this.state;
    const { invoiceDetail } = invoice;
    const DetailComponent = (
      <>
        <GridTable>
          <GridRow title="송무/자문/고문 선택" center redStar={formMode !== 'des'}>
            <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'left' }}>
              <Select
                style={{ marginLeft: '-5px', marginRight: '-5px' }}
                selectedKey={invoiceType.key}
                selectedOption={invoiceDetail.invoiceType}
                options={[
                  { key: '1', text: '송무' },
                  { key: '2', text: '자문' },
                  { key: '3', text: '고문' },
                  { key: '4', text: '기타' },
                ]}
                onChange={(event, selectedOption) =>
                  setReduxValues({ _path: 'invoiceDetail', invoiceType: selectedOption })
                }
                readOnly={formMode === 'des'}
              />
              {formMode === 'des' ? (
                <div> : 송무명</div>
              ) : (
                <>
                  <Button size="square" color="inverted" onClick={() => {}}>
                    {invoiceDetail.invoiceType.key === '1' && <Box>송무 선택</Box>}
                    {invoiceDetail.invoiceType.key === '2' && <Box>자문 선택</Box>}
                    {invoiceDetail.invoiceType.key === '3' && <Box>고문 선택</Box>}
                    {invoiceDetail.invoiceType.key === '4' && <Box>? 선택</Box>}
                  </Button>
                </>
              )}
            </div>
          </GridRow>
          <GridRow title="TC" center redStar={formMode !== 'des'}>
            <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'left' }}>
              {formMode === 'des' ? (
                <div>TC명</div>
              ) : (
                <div style={{ marginLeft: '-5px' }}>
                  <Button size="square" color="inverted" onClick={() => handleToggleDialog('isOpenTCDialog')}>
                    <Box>TC 선택</Box>
                  </Button>
                </div>
              )}
            </div>
          </GridRow>
          <GridRow title="실행인" center redStar={formMode !== 'des'}>
            <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'left' }}>
              <AutoComplete
                options={autoComplete.lawFirmEmpList || []}
                selectedOption={invoiceDetail.performer}
                handleChange={selectedOption => setReduxValues({ _path: 'invoiceDetail', performer: selectedOption })}
                readOnly={formMode === 'des'}
              />
            </div>
          </GridRow>
          <GridRow title="청구예정일" center redStar={formMode !== 'des'}>
            <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'left' }}>
              <DatePicker
                //   value={timeSheet.timeSheetDetail.excutionDate}
                //   onChange={date => setReduxValues({ _path: 'timeSheetDetail', excutionDate: yearMonthDay(date) })}
                readOnly={formMode === 'des'}
              />
            </div>
          </GridRow>
          <GridRow title="청구제목" center redStar={formMode !== 'des'}>
            <div style={{ textAlign: 'left' }}>
              <InputBox
                //   value={}
                onChange={e => {}}
                readOnly={formMode === 'des'}
              />
            </div>
          </GridRow>
          <GridRow title="청구상태" center redStar={formMode !== 'des'}>
            <div style={{ textAlign: 'left' }}>
              <Select
                style={{ marginLeft: '-5px', marginRight: '-5px' }}
                selectedKey={invoiceStatus.key}
                selectedOption={invoiceStatus}
                options={[
                  { key: '1', text: '리뷰' },
                  { key: '2', text: '검토완료' },
                  { key: '3', text: '재검토' },
                  { key: '4', text: '입금요청' },
                  { key: '5', text: '입금완료' },
                ]}
                onChange={(event, selectedOption) => {
                  this.setState({ invoiceStatus: selectedOption });
                }}
                readOnly={formMode === 'des'}
              />
            </div>
          </GridRow>
          <GridRow title="청구내용" center redStar={formMode !== 'des'}>
            <div style={{ textAlign: 'left' }}>
              <EditorW
                // value={}
                editorName="invoiceEdit"
                handleChange={value => {}}
                isReadOnly={formMode === 'des'}
              />
            </div>
          </GridRow>
          <GridRow title="청구여부" center>
            <div style={{ textAlign: 'left' }}>
              {formMode === 'des' ? (
                <div>청구완료/미청구</div>
              ) : (
                <CheckBox
                  // checked={}
                  onChange={(event, checked) => {}}
                />
              )}
            </div>
          </GridRow>
          <GridRow title="청구서 양식" center redStar={formMode !== 'des'}>
            <div style={{ display: 'flex', flexWrap: 'wrap', textAlign: 'left' }}>
              {formMode === 'des' ? (
                <div>청구완료/미청구</div>
              ) : (
                <>
                  <Select
                    style={{ marginLeft: '-5px', marginRight: '-5px' }}
                    selectedKey={invoiceFormat.key}
                    selectedOption={invoiceFormat}
                    options={[
                      { key: '1', text: '청구양식-1' },
                      { key: '2', text: '청구양식-2' },
                      { key: '3', text: '청구양식-3' },
                      { key: '4', text: '신규 템플릿 생성하기' },
                    ]}
                    onChange={(event, selectedOption) => {
                      this.setState({ invoiceFormat: selectedOption });
                    }}
                  />
                  <Button size="square" color="inverted" onClick={() => {}}>
                    <Box>미리보기</Box>
                  </Button>
                </>
              )}
            </div>
          </GridRow>
          <GridRow title="청구요약" center>
            <div style={{ textAlign: 'left' }}>
              <div>총 3건</div>
              <div>총 시간 : 10: 50</div>
              <div>총 금액 : 3,500,000</div>
            </div>
          </GridRow>
          {formMode === 'des' || formMode === 'mod' ? (
            <GridRow title="입금 상태" center>
              <div style={{ textAlign: 'left' }}>
                <div>입금 확인 (2019.04.02 14:03) / 미입금</div>
              </div>
            </GridRow>
          ) : null}
          {formMode === 'des' || formMode === 'mod' ? (
            <GridRow title="청구 히스토리" center>
              <div style={{ textAlign: 'left', marginLeft: '-5px' }}>
                <Button size="square" color="inverted" onClick={() => handleToggleDialog('isOpenHistoryDialog')}>
                  <Box>청구 히스토리</Box>
                </Button>
              </div>
            </GridRow>
          ) : null}
        </GridTable>
        <DialogInfoForm
          title="청구 히스토리"
          open={isOpenHistoryDialog}
          actions={
            <ButtonN
              color="inverted"
              type="large"
              onClick={() => handleToggleDialog('isOpenHistoryDialog')}
              label="닫기"
            />
          }
          fullWidth
          maxWidth="md"
        >
          <InvoiceHistoryDialog />
        </DialogInfoForm>
        <DialogInfoForm
          title="TC 목록"
          open={isOpenTCDialog}
          actions={
            <>
              <ButtonN
                type="large"
                color="primary"
                onClick={async e => handleToggleDialog('isOpenTCDialog')}
                label="선택"
              />
              <ButtonN
                color="inverted"
                type="large"
                onClick={() => handleToggleDialog('isOpenTCDialog')}
                label="닫기"
              />
            </>
          }
          fullWidth
          maxWidth="md"
        >
          <TCDailog handleToggleDialog={handleToggleDialog} />
        </DialogInfoForm>
      </>
    );
    return <>{DetailComponent}</>;
  }
}

export default DetailComponent;
