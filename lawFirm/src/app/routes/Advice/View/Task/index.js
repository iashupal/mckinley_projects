import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import DatePicker from 'components/DatePicker';
import AlignBox from 'components/AlignBox';
import Button from 'components/Button';
import ContentCard from 'components/ContentCard';
import Select from 'components/Select';
import DragDrop from 'components/FileUpload';
import GridTable from 'components/GridTable';
import InputBox from 'components/InputBox';
import CheckBox from 'components/CheckBox';
import ListDetailContainer from 'components/ListDetailContainer';
import classnames from 'classnames';
import Table from 'components/Table/EnhancedTable';
import { R, RU } from 'helpers/ramda';
import { DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { EditorW } from 'helpers/ui';
import { statusList } from 'helpers/data';

const { mlMessage, yearMonthDay } = RU;

class Task extends Component {
  state = {
    isOpenDetail: false,
    files: [],
    nowMode: '',
  };

  handleFileAdd = target => {
    const { files } = this.state;
    const result = files.concat(target);
    this.setState({ files: result });
  };

  handleFileRemove = target => {
    const { files } = this.state;
    const result = files.filter(file => file.key !== target);
    this.setState({ files: result });
  };

  setListData = list => {
    return list.map(item => {
      const status = (
        <div
          className={`badge text-${R.filter(a => a.value === item.status, statusList)[0].fontColor} bg-${
            R.filter(a => a.value === item.status, statusList)[0].color
          }`}
          style={{ height: '60%', fontSize: '13px', borderRadius: '5px' }}
        >
          {R.filter(a => a.value === item.status, statusList)[0].name}
        </div>
      );

      return {
        id: item.id,
        date: item.date,
        task: item.task,
        status,
        admin: item.admin,
      };
    });
  };

  render() {
    const { classes } = this.props;
    const { files, nowMode, isOpenDetail } = this.state;

    const tableData = [
      {
        id: '1',
        date: '2019-03-21',
        task: '계약서 작성',
        status: 'open',
        admin: '김아무개',
      },
      {
        id: '2',
        date: '2019-07-30',
        task: '우편발송',
        status: 'finish',
        admin: '홍길동',
      },
      {
        id: '3',
        date: '2019-01-23',
        task: '계약서 작성',
        status: 'progress',
        admin: '김철수',
      },
      {
        id: '4',
        date: '2019-02-05',
        task: '우편발송',
        status: 'open',
        admin: '홍길수',
      },
      {
        id: '5',
        date: '2019-06-21',
        task: '계약서 작성',
        status: 'finish',
        admin: '김아무개',
      },
      {
        id: '6',
        date: '2019-05-19',
        task: '우편발송',
        status: 'open',
        admin: '홍길수',
      },
      {
        id: '7',
        date: '2019-04-20',
        task: '계약서 작성',
        status: 'progress',
        admin: '김철수',
      },
      {
        id: '8',
        date: '2019-02-30',
        task: '우편발송',
        status: 'finish',
        admin: '김아무개',
      },
      {
        id: '9',
        date: '2019-04-30',
        task: '계약서 작성',
        status: 'progress',
        admin: '홍길수',
      },
    ];

    const TableComponent = (
      <ContentCard
        withButton
        title="Task 목록"
        noMargin
        customHeader={
          <div className="customHeader-cotainer">
            <div className="customHeader-left">
              <div>
                <h2>Task 목록</h2>
              </div>

              <div>
                <Box className={classnames('pt-1')} display="flex" flexDirection="row" flexWrap="nowrap">
                  <div>
                    <Button size="small" variant="outlined">
                      전체
                    </Button>
                  </div>
                  <div>
                    <Button size="small" variant="outlined">
                      이번 주
                    </Button>
                  </div>
                  <div>
                    <Button size="small" variant="outlined">
                      오늘
                    </Button>
                  </div>
                  <div>
                    <Button size="small" variant="outlined">
                      내일
                    </Button>
                  </div>
                  <div>
                    <Button size="small" variant="outlined">
                      일정 지남
                    </Button>
                  </div>
                </Box>
              </div>
            </div>
            <div className="customHeader-right">
              <CheckBox label="나의 Task" onChange={value => console.log(value)} />
              <Button
                color="inverted"
                onClick={() => {
                  this.setState({ ...this.state, isOpenDetail: true, nowMode: 'create' });
                }}
              >
                Task 생성
              </Button>
            </div>
          </div>
        }
        contents={[
          <div>
            <div className={classnames('paginatn-table', 'left')}>
              <Table
                initOrder="desc"
                initOrderBy="date"
                condComponents={
                  <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-end' }}>
                    <div style={{ marginLeft: '-5px', flexGorw: 1 }}>
                      <Select
                        placeholder="상태 선택"
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
                    <div style={{ marginLeft: '-5px', flexGorw: 1 }}>
                      <Select
                        placeholder="담당자 선택"
                        multiSelect
                        options={[
                          { key: 'status', text: '담당자 선택', itemType: DropdownMenuItemType.Header },
                          { key: '1', text: '김아무개' },
                          { key: '2', text: '홍길동' },
                          { key: '3', text: '홍길수' },
                          { key: '4', text: '김철수' },
                        ]}
                        onChange={option => console.log('담당자:', option)}
                      />
                    </div>
                    <div style={{ flexGorw: 1 }}>
                      <InputBox
                        type="text"
                        placeholder="상태 / 담당자..."
                        iconName="Search"
                        onChange={text => console.log('검색:', text)}
                      />
                    </div>
                  </div>
                }
                mngIconsWidth="100px"
                mngIcons={id => (
                  <React.Fragment>
                    <Button
                      size="square"
                      icon="description"
                      color="success"
                      onClick={() => {
                        this.setState({ ...this.state, isOpenDetail: true, nowMode: 'detail' });
                      }}
                    />
                    <Button size="square" icon="delete" color="danger" />
                  </React.Fragment>
                )}
                rows={[
                  { id: 'date', numeric: false, disablePadding: true, label: '등록 날짜' },
                  { id: 'task', numeric: false, disablePadding: true, label: 'Task' },
                  { id: 'status', numeric: true, disablePadding: true, label: '상태' },
                  { id: 'admin', numeric: true, disablePadding: false, label: '담당자' },
                ]}
                data={this.setListData(tableData)}
              />
            </div>
          </div>,
        ]}
      />
    );

    const DetailComponent =
      nowMode === 'create' ? (
        <GridTable
          contents={[
            {
              title: 'Task',
              child: <InputBox placeholder="Task" />,
            },
            {
              title: '내용',
              child: <InputBox placeholder="내용" rows="5" multiline />,
            },
            {
              title: 'Task 상태',
              child: (
                <Select
                  placeholder="상태 선택"
                  style={{ marginLeft: '-5px' }}
                  options={[
                    { key: 'status', text: '상태 선택', itemType: DropdownMenuItemType.Header },
                    { key: '1', text: '오픈' },
                    { key: '2', text: '진행' },
                    { key: '3', text: '완료' },
                  ]}
                  onChange={option => console.log('상태:', option)}
                />
              ),
            },
            {
              title: '담당자',
              child: (
                <Box>
                  <div className="form-group left">
                    <InputBox placeholder="김변호사" />
                  </div>
                </Box>
              ),
            },
            {
              title: '완료 예정일',
              child: (
                <DatePicker
                  selected={new Date()}
                  onChange={date => console.log('Date:', date)}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              ),
            },
            {
              title: '관련파일',
              child: (
                <AlignBox>
                  <DragDrop
                    files={files || null}
                    handleFileAdd={target => this.handleFileAdd(target)}
                    handleFileRemove={target => this.handleFileRemove(target)}
                    LFID={1}
                    showDownloadList
                  />
                </AlignBox>
              ),
            },
          ]}
        />
      ) : (
        <GridTable
          contents={[
            {
              title: '등록일',
              child: (
                <DatePicker
                  selected={new Date()}
                  value={yearMonthDay(new Date())}
                  onChange={date => console.log('Date:', date)}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  readOnly
                />
              ),
            },
            {
              title: 'Task',
              child: <div>계약서 작성</div>,
            },
            {
              title: '내용',
              child: <div>계약서 작성 신청 드립니다.</div>,
            },
            {
              title: 'Task 상태',
              child: (
                <div
                  className="badge text-white bg-light-gray"
                  style={{ height: '60%', fontSize: '13px', borderRadius: '5px' }}
                >
                  오픈
                </div>
              ),
            },
            {
              title: '담당자',
              child: (
                <Box>
                  <div className="form-group left">김변호사</div>
                </Box>
              ),
            },
            {
              title: '완료 예정일',
              child: (
                <DatePicker
                  selected={new Date()}
                  value={yearMonthDay(new Date())}
                  onChange={date => console.log('Date:', date)}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  readOnly
                />
              ),
            },
            {
              title: '관련파일',
              child: (
                <AlignBox>
                  <DragDrop
                    files={files || null}
                    handleFileAdd={target => this.handleFileAdd(target)}
                    handleFileRemove={target => this.handleFileRemove(target)}
                    LFID={1}
                    showDownloadList
                  />
                </AlignBox>
              ),
            },
          ]}
        />
      );

    const DetailComponentBtn =
      nowMode === 'create' ? (
        <React.Fragment>
          <Button size="large" mode="regular" color="primary">
            <Box pl={5} pr={5}>
              저장
            </Box>
          </Button>
          <Button
            color="inverted"
            size="large"
            mode="regular"
            onClick={() => this.setState({ ...this.state, isOpenDetail: false })}
          >
            <Box pl={5} pr={5}>
              닫기
            </Box>
          </Button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Button
            size="large"
            mode="regular"
            color="primary"
            onClick={() => this.setState({ ...this.state, nowMode: 'create' })}
          >
            <Box pl={5} pr={5}>
              수정
            </Box>
          </Button>
          <Button
            color="inverted"
            size="large"
            mode="regular"
            onClick={() => this.setState({ ...this.state, isOpenDetail: false })}
          >
            <Box pl={5} pr={5}>
              닫기
            </Box>
          </Button>
        </React.Fragment>
      );

    return (
      <ListDetailContainer
        TableComponent={TableComponent}
        DetailComponent={DetailComponent}
        DetailComponentTitle={nowMode === 'detail' ? 'Task 상세' : 'Task 등록'}
        DetailComponentBtn={DetailComponentBtn}
        isOpenDetail={isOpenDetail}
        handleDialogClose={() => this.setState({ ...this.state, isOpenDetail: false })}
      />
    );
  }
}

const styles = theme => ({
  taskTabContainer: {
    display: 'grid',
    gridTemplateColumns: '8fr 4fr',
    gridTemplateRows: '1fr',
    gridGap: '10px',
    paddingTop: '10px',
    paddingBottom: '10px',
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  submitButtonContainer: {
    width: '100%',
    textAlign: 'center',
  },
});

export default withStyles(styles)(Task);
