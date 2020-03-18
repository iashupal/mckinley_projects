import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import Box from 'components/BoxOld';
import ContentCard from '../../components/ContentCard';
import AlignBox from '../../components/AlignBox';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import InputBox from '../../components/InputBox';
import Select from '../../components/Select';
import Table from '../../components/Table/EnhancedTable';
import options from './dummyData';
import GridTable from '../../components/GridTable';
import File from '../../components/File';


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

class CaseMemo extends Component {
  render(){
    const { classes } = this.props;
    const data = [
      {
        id: 1,
        date: '2019-07-11',
        content: '메모 내용',
        status: '상태',
        admin: '김아무개',
      },
      {
        id: 2,
        date: '2019-07-11',
        content: '메모 내용',
        status: '상태',
        admin: '김아무개',
      },
      {
        id: 3,
        date: '2019-07-11',
        content: '메모 내용',
        status: '상태',
        admin: '김아무개',
      },
      {
        id: 4,
        date: '2019-07-11',
        content: '메모 내용',
        status: '상태',
        admin: '김아무개',
      },
      {
        id: 5,
        date: '2019-07-11',
        content: '메모 내용',
        status: '상태',
        admin: '김아무개',
      },
      {
        id: 6,
        date: '2019-07-11',
        content: '메모 내용',
        status: '상태',
        admin: '김아무개',
      },
    ];


    return (
      <div>
        <div className={classes.taskTabContainer}>
          <ContentCard
            noMargin
            title="타이틀"
            customHeader={
              <AlignBox>
                <AlignBox>
                  <h2>송무 메모 목록</h2>
                </AlignBox>
                <AlignBox>
                  <CheckBox label="나의 메모" onChange={value => console.log(value)} />
                  <Button color="inverted">메모 생성</Button>
                </AlignBox>
              </AlignBox>
          }
            contents={[
              <div>
                <div className="paginatn-table left">
                  <Table
                    useCheckBox
                    mngIconTime
                    mngIconDetail
                    mngIconEdit
                    mngIconDelete
                    condComponents={
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
                          </AlignBox>
                        </AlignBox>
                      </Box>
                  }
                    batchComponents={
                      <Select
                        placeholder="담당자 선택"
                        options={options}
                        onChange={option => console.log('담당자:', option)}
              />}
                    rows={[
                  { id: 'date', label: '날짜', width: '10%' },
                  { id: 'content', label: '내용', align: 'left' },
                  { id: 'status', label: '상태', width: '10%' },
                  { id: 'admin', label: '담당자', width: '10%' },
                ]}
                    data={data}
              />
                </div>
              </div>,
        ]}
      />
          <ContentCard
            noMargin
            title="송무 메모 상세"
            contents={[
              <div>
                <GridTable
                  contents={[
                    {
                      title: '송무 메모',
                      child: <InputBox rows="5" multiline />,
                    },
                    {
                      title: '송무 메모 상태',
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
                      title: '관련파일',
                      child: (
                        <AlignBox>
                          {/* <Button className="left" size="square" color="inverted">
                            파일 선택
                          </Button>
                          <p className="left">
                            <span>사건 메모 관련 파일.pdf</span> &nbsp; | &nbsp; <span>사건 메모 관련 파일.pdf</span>
                          </p> */}
                          <File />
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
    )
  }
}

export default withStyles(styles)(CaseMemo);