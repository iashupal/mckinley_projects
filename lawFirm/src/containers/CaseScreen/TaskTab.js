import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import DatePicker from '../../components/DatePicker';
import AlignBox from '../../components/AlignBox';
import Button from '../../components/Button';
import ContentCard from '../../components/ContentCard';
import Select from '../../components/Select';
import GridTable from '../../components/GridTable';
import InputBox from '../../components/InputBox';
import CheckBox from '../../components/CheckBox';
import Table from '../../components/Table/EnhancedTable';
import options from './dummyData';
import tableData from './tableData';

class TaskTab extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.taskTabContainer}>
          <ContentCard
            noMargin
            // 컴포넌트 기본 형식 {title, actionButton} 을 벗어난 커스텀 헤더 정의
            customHeader={
              <AlignBox>
                <AlignBox>
                  <h2>Task 목록</h2>
                  <AlignBox pt={0.5} pb={0.5} ml={5}>
                    <Button size="small" variant="outlined">
                      전체
                    </Button>
                    <Button size="small" variant="outlined">
                      이번 주
                    </Button>
                    <Button size="small" variant="outlined">
                      오늘
                    </Button>
                    <Button size="small" variant="outlined">
                      내일
                    </Button>
                    <Button size="small" variant="outlined">
                      일정 지남
                    </Button>
                  </AlignBox>
                </AlignBox>
                <AlignBox>
                  <CheckBox label="나의 Task" onChange={value => console.log(value)} />
                  <Button color="inverted">Task 생성</Button>
                </AlignBox>
              </AlignBox>
            }
            contents={[
              <div>
                <Box mb={1}>
                  <AlignBox>
                    <AlignBox>
                      <CheckBox
                        label="전체 선택"
                        onChange={(event, checked) => console.log(event, checked, 'Check Box Toggled')}
                      />
                      <AlignBox>
                        <Button color="inverted">수정</Button>
                        <Button color="dark">삭제</Button>
                      </AlignBox>
                    </AlignBox>
                    <AlignBox>
                      <InputBox type="text" placeholder="검색..." onChange={text => console.log('검색:', text)} />
                      <Select
                        placeholder="담당자 선택"
                        options={options}
                        onChange={option => console.log('담당자:', option)}
                      />
                      <Select
                        placeholder="컬럼 선택"
                        options={options}
                        onChange={option => console.log('컬럼:', option)}
                      />
                      <Select
                        placeholder="상태 선택"
                        options={options}
                        onChange={option => console.log('상태:', option)}
                      />
                    </AlignBox>
                  </AlignBox>
                </Box>

                <div className="paginatn-table left">
                  <Table
                    rows={[
                      { id: 'date', numeric: false, disablePadding: true, label: '날짜' },
                      { id: 'task', numeric: false, disablePadding: true, label: 'Task' },
                      { id: 'status', numeric: true, disablePadding: true, label: '상태' },
                      { id: 'admin', numeric: true, disablePadding: false, label: '담당자' },
                      { id: 'manage', numeric: true, disablePadding: false, label: '관리' },
                    ]}
                    data={tableData}
                  />
                </div>
              </div>,
            ]}
          />

          <ContentCard
            noMargin
            title="Task 상세"
            actionButton={
              <Button icon="queue" color="dark">
                <Box pr={2}>팝업으로 보기</Box>
              </Button>
            }
            contents={[
              <div>
                <GridTable
                  contents={[
                    {
                      title: 'Task',
                      child: <InputBox placeholder="우편발송" name="text2" />,
                    },
                    {
                      title: '내용',
                      child: <InputBox placeholder="우편 발송을 처리 하세요" rows="5" multiline />,
                    },
                    {
                      title: 'Task 상태',
                      child: (
                        <Button size="small" color="inverted">
                          오픈
                        </Button>
                      ),
                    },
                    {
                      title: '담당자',
                      child: (
                        <Box>
                          <div className="form-group left">
                            <InputBox placeholder="김변호사" />
                          </div>
                          <i className="material-icons icon-left-menu-color left">supervisor_account</i>
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
                          <Button className="left" size="square" color="inverted">
                            파일 선택
                          </Button>
                          <p className="left">
                            <span>Task 관련 파일.pdf</span> &nbsp; | &nbsp; <span>Task 관련 파일.pdf</span>
                          </p>
                        </AlignBox>
                      ),
                    },
                  ]}
                />
                <div className="task-form-para-btn">
                  <p>
                    <span className="para-clr">수정일</span> | <span>2010-03-02 23:00</span>
                  </p>
                  <p>
                    <span className="para-clr">생성일</span> | <span>2010-03-02 23:00</span>
                  </p>
                  <div className={classes.submitButtonContainer}>
                    <Button size="large" mode="regular" color="primary">
                      <Box pl={5} pr={5}>
                        저장
                      </Box>
                    </Button>
                  </div>
                </div>
              </div>,
            ]}
          />
        </div>
      </div>
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

export default withStyles(styles)(TaskTab);
