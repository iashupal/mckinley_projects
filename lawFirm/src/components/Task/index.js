import React, { Component, Fragment } from 'react';
import ContentCard from 'components/ContentCard';
import Box from 'components/BoxOld';
import ButtonN from 'components/ButtonN';
import Button from 'components/Button';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import Select from 'components/Select';
import { R, RU } from 'helpers/ramda';
import ListDetailContainer from 'components/ListDetailContainer';
import GridTable, { GridRow } from 'components/GridTable';
import AutoComplete from 'components/AutoComplete';
import Toggle from 'components/Toggle';
import DatePicker from 'components/DatePicker';
import DragDropPopUp from 'components/FileUpload';
import DateRange from 'components/DateRange';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';

const { mlMessage, yearMonthDay } = RU;

class Task extends Component {
  state = {
    isOpenDetail: false,
    formMode: '',
  };

  render() {
    const { isOpenDetail, formMode } = this.state;
    const TableComponent = (
      <ContentCard
        title=""
        customHeader={
          <div className="customHeader-cotainer">
            <div className="customHeader-left">
              <h2 />
            </div>
            <div className="customHeader-right">
              <ButtonN
                type="icon"
                icon="archive"
                color="primary"
                label={mlMessage('pages.litigation.excelExport')}
                onClick={() => {}}
              />
              <ButtonN
                type="icon"
                icon="add_to_queue"
                color="primary"
                onClick={() => {
                  this.setState({ ...this.state, isOpenDetail: true, formMode: 'create' });
                }}
                label="신규 Task"
              />
            </div>
          </div>
        }
        contents={[
          <Table
            initOrder="desc"
            initOrderBy="reqDate"
            rows={[
              { id: 'reqDate', label: '요청일' },
              { id: 'client', label: '의뢰인' },
              { id: 'relatedCase', label: '관련 사건' },
              { id: 'title', label: 'Task 명', align: 'left' },
              { id: 'contents', label: '내용' },
              { id: 'timeCharge', label: 'TC' },
              { id: 'owner', label: '실행자' },
              { id: 'category', label: '분류' },
              { id: 'status', label: '상태' },
              { id: 'updateDate', label: '수정일' },
            ]}
            data={[
              {
                id: 1,
                reqDate: '2019-04-01',
                client: '김나라',
                relatedCase: '사건명-1',
                title: '기일 공문 발송',
                contents: '기일 업데이트 일정 확인',
                timeCharge: '1 건(+)',
                owner: '김사무관',
                category: '기본',
                status: '진행중',
                updateDate: '2019-04-01',
              },
              {
                id: 2,
                reqDate: '2019-04-02',
                client: '박철민',
                relatedCase: '자문명-1',
                title: '자문 위한 서류 검토',
                contents: '자문 서류 검토',
                timeCharge: '0 건(+)',
                owner: '박변호사',
                category: '기본',
                status: '진행중',
                updateDate: '2019-04-02',
              },
              {
                id: 3,
                reqDate: '2019-04-03',
                client: '주식회사 휴맥스',
                relatedCase: '자문명-1',
                title: '자문 메일 발송',
                contents: '메일 발송 대상 확인',
                timeCharge: '0 건(+)',
                owner: '박변호사',
                category: '기본',
                status: '완료',
                updateDate: '2019-04-03',
              },
            ]}
            customColumn={[
              {
                field: 'client',
                component: ({ row }) => (
                  <a href={`/#/app/Task?LFID=${row.LFID}&taskUUID=${row.taskUUID}`}>{row.client}</a>
                ),
              },
              {
                field: 'relatedCase',
                component: ({ row }) => (
                  <a href={`/#/app/Task?LFID=${row.LFID}&taskUUID=${row.taskUUID}`}>{row.relatedCase}</a>
                ),
              },
              {
                field: 'title',
                component: ({ row }) => (
                  <a href={`/#/app/Task?LFID=${row.LFID}&taskUUID=${row.taskUUID}`}>{row.title}</a>
                ),
              },
              {
                field: 'status',
                component: ({ row }) => (
                  <div
                    style={{ height: '60%', fontSize: '13px', borderRadius: '5px' }}
                    className="badge text-black bg-light"
                  >
                    {row.status}
                  </div>
                ),
              },
            ]}
            mngIcons={id => (
              <>
                <Button
                  size="square"
                  icon="border_color"
                  color="success"
                  onClick={() => {
                    this.setState({ ...this.state, isOpenDetail: true, formMode: 'mod' });
                  }}
                />
                <Button size="square" icon="delete" color="danger" onClick={() => console.log(id)} />
              </>
            )}
            mngIconsWidth="100px"
            condComponents={
              <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                <DateRange
                  handleChange={obj => {
                    console.log(obj);
                  }}
                  handleSubmit={(startDate, endDate) => console.log(startDate, endDate)}
                />
                <div style={{ marginLeft: '-5px', flexGorw: 1 }}>
                  <Select
                    placeholder="실행자"
                    multiSelect
                    options={[
                      { key: 'status', text: '실행자', itemType: DropdownMenuItemType.Header },
                      { key: '1', text: '김아무개' },
                      { key: '2', text: '홍길동' },
                      { key: '3', text: '홍길수' },
                      { key: '4', text: '김철수' },
                    ]}
                    onChange={option => console.log('실행자:', option)}
                  />
                </div>
                <div style={{ marginLeft: '-5px', flexGorw: 1 }}>
                  <Select
                    placeholder="분류"
                    multiSelect
                    options={[
                      { key: 'status', text: '분류', itemType: DropdownMenuItemType.Header },
                      { key: '1', text: '분류1' },
                      { key: '2', text: '분류2' },
                      { key: '3', text: '분류3' },
                    ]}
                    onChange={option => console.log('분류:', option)}
                  />
                </div>
                <div style={{ marginLeft: '-5px', flexGorw: 1 }}>
                  <Select
                    placeholder="상태"
                    multiSelect
                    options={[
                      { key: 'status', text: '상태 선택', itemType: DropdownMenuItemType.Header },
                      { key: '1', text: '오픈' },
                      { key: '2', text: '진행' },
                      { key: '3', text: '완료' },
                    ]}
                    onChange={option => console.log('상태:', option)}
                  />
                </div>
                <div style={{ flexGorw: 1 }}>
                  <InputBox
                    type="text"
                    width={230}
                    placeholder="의뢰인/관련 사건/Task 명/내용"
                    iconName="Search"
                    onChange={text => console.log('검색:', text)}
                  />
                </div>
              </div>
            }
          />,
        ]}
      />
    );
    const DetailComponent = (
      <GridTable>
        <GridRow title="의뢰인" redStar>
          <>
            <AutoComplete isMulti />
          </>
        </GridRow>
        <GridRow title="관련 사건" redStar>
          <>Dialog팝업</>
        </GridRow>
        <GridRow title="분류">
          <div style={{ marginLeft: '-5px' }}>
            <Select
              selectedKey="1"
              options={[{ key: '1', text: '분류1' }, { key: '2', text: '분류2' }, { key: '3', text: '분류3' }]}
              onChange={option => console.log('분류:', option)}
            />
          </div>
        </GridRow>
        <GridRow title="실행자" redStar>
          <>
            <AutoComplete isMulti />
          </>
        </GridRow>
        <GridRow title="Task 명" redStar>
          <>
            <InputBox placeholder="Task" />
          </>
        </GridRow>
        <GridRow title="내용" redStar>
          <>
            <InputBox placeholder="내용" rows="5" multiline />
          </>
        </GridRow>
        {formMode !== 'create' && (
          <GridRow title="Task 상태" redStar>
            <Select
              multiSelect
              style={{ marginLeft: '-5px' }}
              selectedKey="1"
              options={[{ key: '1', text: '오픈' }, { key: '2', text: '진행' }, { key: '3', text: '완료' }]}
            />
          </GridRow>
        )}
        <GridRow title="완료 예정일">
          <DatePicker value={new Date()} onChange={date => console.log(date)} />
        </GridRow>
        <GridRow title="일정에 추가">
          <Toggle />
        </GridRow>
        <GridRow title="관련 파일">
          <DragDropPopUp
            // files={files}
            // handleFileAdd={target => handleFileAdd(target)}
            // handleFileRemove={target => handleFileRemove(target)}
            LFID={1}
            showDownloadList
            // fileChart={fileChart || []}
            // handleFileDivisionAdd={handleFileDivisionAdd}
            // saveKeyOfDivision={saveKeyOfDivision}
          />
        </GridRow>
      </GridTable>
    );
    const DetailComponentBtn = (
      <>
        <Button size="large" mode="regular" color="primary" onClick={() => handleSave(formMode)}>
          <Box pl={5} pr={5}>
            {mlMessage('pages.common.button.save')}
          </Box>
        </Button>
        <Button color="inverted" size="large" mode="regular" onClick={() => this.setState({ isOpenDetail: false })}>
          <Box pl={5} pr={5}>
            {mlMessage('pages.common.button.close')}
          </Box>
        </Button>
      </>
    );
    return (
      <>
        <ListDetailContainer
          TableComponent={TableComponent}
          DetailComponent={DetailComponent}
          DetailComponentTitle={formMode === 'create' ? 'Task 등록' : 'Task 수정'}
          DetailComponentBtn={DetailComponentBtn}
          isOpenDetail={isOpenDetail}
          handleDialogClose={() => console.log('close')}
        />
      </>
    );
  }
}

export default Task;
