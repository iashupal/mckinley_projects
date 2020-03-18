import React, { Component } from 'react';
import Button from 'components/Button';
import Select from 'components/Select';
import Table, { StatusButton } from 'components/Table/EnhancedTable';
import DateRange from 'components/DateRange';
import { NotificationManager } from 'react-notifications';

export const tableData = [
  {
    id: '1',
    date: '2019-07-09',
    task: '우편test발송-1',
    numTest: 10,
    status: <StatusButton open />,
    admin: '김아무개1',
  },
  {
    id: '2',
    date: '2019-07-10',
    task: '우편test발송-2',
    numTest: 11,
    status: <StatusButton open />,
    admin: '김아무개2',
  },
  {
    id: '3',
    date: '2019-07-11',
    task: '우편발송-3',
    numTest: 12,
    status: <StatusButton />,
    admin: '김아무개1',
  },
  {
    id: '4',
    date: '2019-07-12',
    task: '우편test발송-4',
    numTest: 13,
    status: <StatusButton />,
    admin: '김아무개3',
  },
  {
    id: '5',
    date: '2019-07-13',
    task: '우편발송-5',
    numTest: 14,
    status: <StatusButton />,
    admin: '김아무개1',
  },
  {
    id: '6',
    date: '2019-07-14',
    task: '우편발송-6',
    numTest: 15,
    status: <StatusButton />,
    admin: '김아무개2',
  },
];

class DateRangeTest extends Component {
  state = {
    startDate: new Date(),
    endDate: new Date(),
  };

  render() {
    const { startDate, endDate } = this.state;

    return (
      <div className="app-wrapper">
        <Table
          rows={[
            { id: 'date', type: 'date', label: '날짜', width: '120px' },
            { id: 'task', type: 'text', label: 'Task', align: 'left' },
            { id: 'numTest', type: 'number', label: 'Num', align: 'right', width: '60px' },
            { id: 'status', label: '상태', noSort: true, width: '100px', noFilter: true, noExcel: true },
            { id: 'admin', type: 'code', label: '담당자', width: '140px' },
          ]}
          initOrder="asc" // 초기 정렬 순서
          initOrderBy="task" // 초기 정렬 필드명
          data={tableData}
          useCheckBox
          // checkedItems={(arr, type) => alert(`checkedItems:${JSON.stringify(arr)}|${JSON.stringify(type)}`)}
          mngIcons={id => (
            <React.Fragment>
              <Button size="square" icon="access_time" color="warning" onClick={() => alert(`time|${id}`)} />
              <Button size="square" icon="description" color="success" onClick={() => alert(`detail|${id}`)} />
              <Button size="square" icon="border_color" color="success" onClick={() => alert(`edit|${id}`)} />
              <Button size="square" icon="delete" color="danger" onClick={() => alert(`delete|${id}`)} />
            </React.Fragment>
          )}
          mngIconsWidth="180px"
          mngIconsBatch={arr => (
            <React.Fragment>
              <Button
                size="square"
                icon="border_color"
                color="success"
                onClick={() => {
                  alert(`batchEdit|${arr}`);
                }}
              />
              <Button
                size="square"
                icon="delete"
                color="danger"
                onClick={() => {
                  alert(`batchDelete|${arr}`);
                }}
              />
            </React.Fragment>
          )}
          condComponents={
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <DateRange
                startDate={startDate}
                endDate={endDate}
                handleChange={obj => {
                  const { startDate, endDate } = obj;
                  const newObj = { ...this.state };
                  if (startDate) newObj.startDate = startDate;
                  if (endDate) newObj.endDate = endDate;
                  this.setState(newObj);
                }}
                handleSubmit={(startDate, endDate) => NotificationManager.info(`submit: ${startDate} ~ ${endDate}`)}
              />
              <Select
                placeholder="Custom 조건1"
                options={[
                  { key: 'status', text: 'Custom 조건1' },
                  { key: '1', text: '가입일' },
                  { key: '2', text: '대표이메일' },
                ]}
                multiSelect
                onChange={() => console.log('Changed')}
              />
            </div>
          }
          excelExport
        />
        <br />
        <span>label="가입일" (Default: 등록일)</span>
        <br />
        <Table
          rows={[
            { id: 'date', type: 'date', label: '날짜', width: '120px' },
            { id: 'task', type: 'text', label: 'Task', align: 'left' },
            { id: 'numTest', type: 'number', label: 'Num', align: 'right', width: '60px' },
            { id: 'status', label: '상태', noSort: true, width: '100px', noFilter: true, noExcel: true },
            { id: 'admin', type: 'code', label: '담당자', width: '140px' },
          ]}
          initOrder="asc" // 초기 정렬 순서
          initOrderBy="task" // 초기 정렬 필드명
          data={tableData}
          useCheckBox
          // checkedItems={(arr, type) => alert(`checkedItems:${JSON.stringify(arr)}|${JSON.stringify(type)}`)}
          mngIcons={id => (
            <React.Fragment>
              <Button size="square" icon="access_time" color="warning" onClick={() => alert(`time|${id}`)} />
              <Button size="square" icon="description" color="success" onClick={() => alert(`detail|${id}`)} />
              <Button size="square" icon="border_color" color="success" onClick={() => alert(`edit|${id}`)} />
              <Button size="square" icon="delete" color="danger" onClick={() => alert(`delete|${id}`)} />
            </React.Fragment>
          )}
          mngIconsWidth="180px"
          mngIconsBatch={arr => (
            <React.Fragment>
              <Button
                size="square"
                icon="border_color"
                color="success"
                onClick={() => {
                  alert(`batchEdit|${arr}`);
                }}
              />
              <Button
                size="square"
                icon="delete"
                color="danger"
                onClick={() => {
                  alert(`batchDelete|${arr}`);
                }}
              />
            </React.Fragment>
          )}
          condComponents={
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <DateRange
                label="가입일"
                startDate={startDate}
                endDate={endDate}
                handleChange={obj => {
                  const { startDate, endDate } = obj;
                  const newObj = { ...this.state };
                  if (startDate) newObj.startDate = startDate;
                  if (endDate) newObj.endDate = endDate;
                  this.setState(newObj);
                }}
                handleSubmit={(startDate, endDate) => NotificationManager.info(`submit: ${startDate} ~ ${endDate}`)}
              />
              <Select
                placeholder="Custom 조건1"
                options={[
                  { key: 'status', text: 'Custom 조건1' },
                  { key: '1', text: '가입일' },
                  { key: '2', text: '대표이메일' },
                ]}
                multiSelect
                onChange={() => console.log('Changed')}
              />
            </div>
          }
          excelExport
        />
      </div>
    );
  }
}

export default DateRangeTest;
