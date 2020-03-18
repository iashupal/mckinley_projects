import React, { Component } from 'react';
import { RU } from 'helpers/ramda';
import Button from 'components/Button';
import Box from 'components/BoxOld';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import PropTypes from 'prop-types';

const { mlMessage } = RU;

class DueDateDialogInfo extends Component {
  state = {
    searchText: '',
  };

  render() {
    const {
      LFID,
      dueDateList,
      saveSelectedItemInfo,
      handleDuedateListFetch,
      handleDuedateFileFetch,
      isLoading,
      closeDialog,
      caseType,
    } = this.props;

    const { searchText } = this.state;

    return (
      <>
        <Table
          isLoading={isLoading}
          initOrder="desc"
          initOrderBy="dueDate"
          condComponents={
            <div style={{ marginLeft: '5px' }}>
              <InputBox
                placeholder={`${caseType === 'L' ? '송무/' : '자문/'}제목`}
                iconName="Search"
                value={searchText}
                onChange={e => this.setState({ searchText: e.target.value })}
                handleSubmit={e => handleDuedateListFetch({ LFID, caseType, searchText })}
              />
            </div>
          }
          rows={[
            {
              id: 'caseTitle',
              type: 'text',
              numeric: false,
              disablePadding: false,
              label: `${caseType === 'L' ? '송무' : '자문'}`,
              align: 'left',
              width: '30%',
            },
            {
              id: 'caseMngNo',
              type: 'text',
              numeric: false,
              disablePadding: false,
              label: `${caseType === 'L' ? '송무' : '자문'}번호`,
              width: '15%',
            },
            {
              id: 'dueDateName',
              type: 'text',
              numeric: false,
              disablePadding: false,
              label: '제목',
              align: 'left',
              width: '30%',
            },
            {
              id: 'dueDate',
              type: 'date',
              numeric: false,
              disablePadding: false,
              label: '기일',
              width: '15%',
            },
          ]}
          mngIcons={(id, row) => (
            <>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  saveSelectedItemInfo(
                    { LFID, caseID: row.caseID, dueDateSeq: row.dueDateSeq },
                    row.dueDateName,
                    row.fileRefID,
                  );
                  if (handleDuedateFileFetch)
                    handleDuedateFileFetch({ LawFirmID: LFID, caseID: row.caseID, dueDateSeq: row.dueDateSeq });
                  closeDialog();
                }}
              >
                <Box>선택</Box>
              </Button>
            </>
          )}
          mngIconsWidth="10%"
          data={dueDateList || []}
          multiKey={['LFID', 'caseMngNo', 'dueDateSeq']}
        />
      </>
    );
  }
}

export default DueDateDialogInfo;

DueDateDialogInfo.propTypes = {
  LFID: PropTypes.number, // LFID
  dueDateList: PropTypes.arrayOf(PropTypes.object), // 테이블에 뿌릴 ContractList 데이터
  saveSelectedItemInfo: PropTypes.func, // 테이블 해당 계약 선택 시 데이터 저장 함수 (id:'사건, 기일 Seq 아이디', title:'제목', fileRefID:'파일 참조 아이디')
  handleDuedateFileFetch: PropTypes.func, // 해당 기일의 파일 조회 함수
  handleDuedateListFetch: PropTypes.func, // 기일 리스트 조회 함수
  isLoading: PropTypes.bool, // 테이블 로딩
  closeDialog: PropTypes.func, // 다이얼로그 닫기
  caseType: PropTypes.string, // 사건 타입 ("L":송무, "A":자문)
};

DueDateDialogInfo.defaultProps = {
  LFID: 0, // LFID
  dueDateList: [],
  saveSelectedItemInfo: null,
  handleDuedateFileFetch: null,
  handleDuedateListFetch: null,
  isLoading: false,
  closeDialog: null,
  caseType: '',
};
