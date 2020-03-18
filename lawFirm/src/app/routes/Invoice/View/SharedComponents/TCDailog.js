import React, { Component } from 'react';
import Table from 'components/Table/EnhancedTable';
import Button from 'components/Button';
import InputBox from 'components/InputBox';
import Box from 'components/BoxOld';

class TCDailog extends Component {
  state = {
    searchText: '',
  };

  render() {
    const { searchText } = this.state;
    const { handleToggleDialog } = this.props;
    return (
      <Table
        initOrder="desc"
        initOrderBy="executeDate"
        rows={[
          { id: 'category', label: '항목', width: '10%' },
          { id: 'time', label: '시간', width: '5%' },
          { id: 'title', label: '제목', width: '15%' },
          { id: 'contents', label: '내용', align: 'left', width: '20%' },
          { id: 'performer', label: '실행인', width: '10%' },
          { id: 'rate', label: '청구요율', width: '10%' },
          { id: 'amount', label: '청구비용', width: '10%' },
          { id: 'executeDate', type: 'date', label: '실행일', width: '10%' },
        ]}
        data={[
          {
            id: 1,
            category: '사건메모',
            time: '02:00',
            title: '사건명',
            contents: '법률 활동 메모',
            performer: '김변호사',
            rate: '50/h',
            amount: '1,000,000',
            executeDate: '2019.04.01',
          },
          {
            id: 2,
            category: '기일',
            time: '00:30',
            title: '사건명',
            contents: '기일 관련 준비',
            performer: '박변호사',
            rate: '월과금',
            amount: '',
            executeDate: '2019.04.02',
          },
          {
            id: 3,
            category: '업무',
            time: '06:30',
            title: '사건명',
            contents: '법무 활동',
            performer: '이사무장',
            rate: '20/h+',
            amount: '1,500,000',
            executeDate: '2019.04.04',
          },
        ]}
        mngIcons={id => (
          <>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                handleToggleDialog('isOpenTCDialog');
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
                placeholder="제목/내용/실행인"
                iconName="Search"
                value={searchText}
                onChange={e => this.setState({ searchText: e.target.value })}
                handleSubmit={() => {}}
              />
            </div>
          </>
        }
        useCheckBox
        mngIconsBatch={arr => <>{console.log(arr)}</>}
      />
    );
  }
}

export default TCDailog;
