import React, { Component } from 'react';
import { RU } from 'helpers/ramda';
import Button from 'components/Button';
import Box from 'components/BoxOld';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import PropTypes from 'prop-types';

const { mlMessage } = RU;

class CaseListDialogInfo extends Component {
  state = {
    searchText: '',
  };

  render() {
    const {
      LFID,
      caseList,
      saveSelectedItemInfo,
      handleCaseFileFetch,
      handleCaseListFetch,
      isLoading,
      closeDialog,
      caseType,
    } = this.props;

    const { searchText } = this.state;

    return (
      <>
        <Table
          isLoading={isLoading}
          initOrder="asc"
          initOrderBy="dueDate"
          tableID="oerughwiejfpw9eifj"
          condComponents={
            <div style={{ marginLeft: '5px' }}>
              <InputBox
                placeholder={`${caseType === 'L' ? '송무/송무' : '자문/자문'}번호`}
                iconName="Search"
                value={searchText}
                onChange={e => this.setState({ searchText: e.target.value })}
                handleSubmit={e => handleCaseListFetch({ LFID, caseType, searchText })}
              />
            </div>
          }
          rows={[
            {
              id: 'title',
              type: 'text',
              numeric: false,
              disablePadding: false,
              label: `${caseType === 'L' ? '송무' : '자문'}`,
              align: 'left',
              width: '25%',
            },
            {
              id: 'managementNo',
              type: 'text',
              numeric: false,
              disablePadding: false,
              label: `${caseType === 'L' ? '송무' : '자문'}번호`,
              width: '10%',
            },
            {
              id: 'dueDate',
              type: 'text',
              numeric: false,
              disablePadding: false,
              label: '기일(잔여일)',
              width: '15%',
            },
            {
              id: 'client',
              type: 'text',
              numeric: false,
              disablePadding: false,
              label: '의뢰인',
              width: '15%',
            },
            {
              id: 'lawer',
              type: 'text',
              numeric: false,
              disablePadding: false,
              label: '수임자',
              width: '15%',
            },
            { id: 'status', type: 'text', numeric: false, disablePadding: false, label: '상태', width: '10%' },
          ]}
          customColumn={[
            {
              field: 'status',
              component: ({ row }) => (
                <div
                  style={{ height: '60%', fontSize: '13px', borderRadius: '5px' }}
                  className={row.caseStatus === '진행중' ? 'badge text-black bg-light' : 'badge text-white bg-black'}
                >
                  {row.caseStatus}
                </div>
              ),
            },
          ]}
          mngIcons={(id, row) => (
            <>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  saveSelectedItemInfo(row.caseID, row.title, row.fileRefID);
                  if (handleCaseFileFetch) handleCaseFileFetch({ LFID, caseID: row.caseID });
                  closeDialog();
                }}
              >
                <Box>선택</Box>
              </Button>
            </>
          )}
          mngIconsWidth="15%"
          data={caseList || []}
          multiKey={['LFID', 'caseUUID']}
        />
      </>
    );
  }
}

export default CaseListDialogInfo;

CaseListDialogInfo.propTypes = {
  LFID: PropTypes.number, // LFID
  caseList: PropTypes.arrayOf(PropTypes.object), // 테이블에 뿌릴 CaseList 데이터
  saveSelectedItemInfo: PropTypes.func, // 테이블 해당 레코드 선택 시 데이터 저장 함수 (id:'사건아이디', title:'제목', fileRefID:'파일 참조 아이디')
  handleCaseFileFetch: PropTypes.func, // 해당 사건의 파일 조회 함수
  handleCaseListFetch: PropTypes.func, // 사건 리스트 조회 함수
  isLoading: PropTypes.bool, // 테이블 로딩
  closeDialog: PropTypes.func, // 다이얼로그 닫기
  caseType: PropTypes.string, // 사건 타입 ("L":송무, "A":자문)
};

CaseListDialogInfo.defaultProps = {
  LFID: 0, // LFID
  caseList: [],
  saveSelectedItemInfo: null,
  handleCaseFileFetch: null,
  handleCaseListFetch: null,
  isLoading: false,
  closeDialog: null,
  caseType: '',
};
