import React, { Component, Fragment } from 'react';
import ExcelImportTable from 'components/ExcelImportTable';
import ListDetailContainer from 'components/ListDetailContainer';
import { NotificationManager } from 'react-notifications';
import Box from 'components/BoxOld';
import Button from 'components/Button';
import GridTable from 'components/GridTable';
import InputBox from 'components/InputBox';
import produce from 'immer';

class Test extends Component {
  state = {
    tableData: [],
    isOpenDetail: false,
    editIndex: -1,
    editData: {
      joinDate: '',
      representativeEmail: '',
      joinStatus: '',
      lawFirmID: '',
      lawFirmName: '',
      representativeUser: '',
    },
  };

  render() {
    const { tableData, isOpenDetail, editIndex, editData } = this.state;

    const TableComponent = (
      <ExcelImportTable
        multiKey={['joinDate', 'representativeEmail', 'joinStatus', 'lawFirmID', 'lawFirmName', 'representativeUser']}
        tableRows={[
          { id: 'joinDate', label: '가입일', width: '120px' },
          { id: 'representativeEmail', label: '대표이메일', width: '120px' },
          { id: 'joinStatus', label: '가입상태', width: '120px' },
          { id: 'lawFirmID', label: '법무법인 아이디(URL)', width: '120px' },
          { id: 'lawFirmName', label: '법무법인 명' },
          { id: 'representativeUser', label: '대표사용자', width: '120px' },
        ]}
        fieldColumn={['A', 'B', 'C', 'D', 'E', 'F']}
        sheetName="SheetJS"
        fileName="sample.xlsx"
        sampleData={[
          ['2019-01-01', 'exam@google.com', '사용요청중', 'kimpro', '김프로 법무법인', 'Kim Pro-1'],
          ['2019-03-01', 'exam@google.com', '가입완료', 'kimpro', '김프로 법무법인', 'Kim Pro-2'],
        ]}
        tableData={tableData}
        handleClickEdit={(rows, index) => {
          this.setState({ ...this.state, isOpenDetail: true, editIndex: index, editData: rows });
        }}
        handleSave={() => {
          NotificationManager.info(JSON.stringify(tableData));
        }}
        handleImport={e => {
          this.setState({ ...this.state, tableData: [...tableData, ...e] });
        }}
        handleRemove={index => {
          this.setState(
            produce(this.state, draft => {
              draft.tableData.splice(index, 1);
            }),
          );
        }}
        handleClear={e => {
          this.setState({ ...this.state, tableData: [] });
        }}
      />
    );

    const DetailComponent = (
      <GridTable
        contents={[
          {
            title: '가입일',
            child: (
              <InputBox
                value={editData.joinDate}
                onChange={e =>
                  this.setState(
                    produce(this.state, draft => {
                      draft.editData.joinDate = e.target.value;
                    }),
                  )
                }
              />
            ),
          },
          {
            title: '대표이메일',
            child: (
              <InputBox
                value={editData.representativeEmail}
                onChange={e =>
                  this.setState(
                    produce(this.state, draft => {
                      draft.editData.representativeEmail = e.target.value;
                    }),
                  )
                }
              />
            ),
          },
          {
            title: '가입상태',
            child: (
              <InputBox
                value={editData.joinStatus}
                onChange={e =>
                  this.setState(
                    produce(this.state, draft => {
                      draft.editData.joinStatus = e.target.value;
                    }),
                  )
                }
              />
            ),
          },
          {
            title: '법무법인 아이디(URL)',
            child: (
              <InputBox
                value={editData.lawFirmID}
                onChange={e =>
                  this.setState(
                    produce(this.state, draft => {
                      draft.editData.lawFirmID = e.target.value;
                    }),
                  )
                }
              />
            ),
          },
          {
            title: '법무법인 명',
            child: (
              <InputBox
                value={editData.lawFirmName}
                onChange={e =>
                  this.setState(
                    produce(this.state, draft => {
                      draft.editData.lawFirmName = e.target.value;
                    }),
                  )
                }
              />
            ),
          },
          {
            title: '대표사용자',
            child: (
              <InputBox
                value={editData.representativeUser}
                onChange={e =>
                  this.setState(
                    produce(this.state, draft => {
                      draft.editData.representativeUser = e.target.value;
                    }),
                  )
                }
              />
            ),
          },
        ]}
      />
    );

    const DetailComponentBtn = (
      <>
        <Button
          
          size="large"
          mode="regular"
          color="primary"
          onClick={() => {
            this.setState(
              produce(this.state, draft => {
                draft.isOpenDetail = false;
                draft.tableData[this.state.editIndex] = this.state.editData;
              }),
            );
          }}
        >
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
      </>
    );

    return (
      <ListDetailContainer
        TableComponent={TableComponent}
        DetailComponent={DetailComponent}
        DetailComponentTitle="Task 상세"
        DetailComponentBtn={DetailComponentBtn}
        isOpenDetail={isOpenDetail}
        handleDialogClose={() => this.setState({ ...this.state, isOpenDetail: false })}
      />
    );
  }
}

export default Test;
