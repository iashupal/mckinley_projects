import React, { Component } from 'react';
import { RU } from 'helpers/ramda';
import Button from 'components/Button';
import Box from 'components/BoxOld';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import PropTypes from 'prop-types';

const { mlMessage } = RU;

class ContractListDialogInfo extends Component {
  state = {
    searchText: '',
  };

  render() {
    const {
      LFID,
      contractList,
      saveSelectedItemInfo,
      handleContractFileFetch,
      handleContractListFetch,
      isLoading,
      closeDialog,
    } = this.props;

    const { searchText } = this.state;

    return (
      <>
        <Table
          initOrder="desc"
          initOrderBy="consultingdate"
          rows={[
            { id: 'clientName', type: 'text', label: mlMessage('pages.contract.client'), width: '20%' },
            { id: 'managerNameStr', type: 'text', label: mlMessage('pages.contract.manager'), width: '25%' },
            { id: 'title', type: 'text', label: mlMessage('pages.common.title'), align: 'left', width: '30%' },
            { id: 'contractDate', type: 'date', label: mlMessage('pages.contract.contractDate'), width: '15%' },
          ]}
          data={contractList || []}
          customColumn={[
            {
              field: 'managerNameStr',
              component: ({ row }) =>
                row.managerNameStr === 'null ' ? mlMessage('pages.contract.undefined') : row.managerNameStr,
            },
          ]}
          mngIcons={(id, row) => (
            <>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  saveSelectedItemInfo(row.contractKeyID, row.title, row.fileRefID);
                  if (handleContractFileFetch) handleContractFileFetch({ LFID, contractID: row.contractKeyID });
                  closeDialog();
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
                  placeholder={mlMessage('pages.contract.searchPlaceholder')}
                  iconName="Search"
                  value={searchText}
                  onChange={e => this.setState({ searchText: e.target.value })}
                  handleSubmit={e => handleContractListFetch({ LFID, searchText })}
                />
              </div>
            </>
          }
          multiKey={['LFID', 'contractID']}
          isLoading={isLoading}
        />
      </>
    );
  }
}

export default ContractListDialogInfo;

ContractListDialogInfo.propTypes = {
  LFID: PropTypes.number, // LFID
  contractList: PropTypes.arrayOf(PropTypes.object), // 테이블에 뿌릴 ContractList 데이터
  saveSelectedItemInfo: PropTypes.func, // 테이블 해당 계약 선택 시 데이터 저장 함수 (id:'계약아이디', title:'제목', fileRefID:'파일 참조 아이디')
  handleContractFileFetch: PropTypes.func, // 해당 계약의 파일 조회 함수
  handleContractListFetch: PropTypes.func, // 상담 리스트 조회 함수
  isLoading: PropTypes.bool, // 테이블 로딩
  closeDialog: PropTypes.func, // 다이얼로그 닫기
};

ContractListDialogInfo.defaultProps = {
  LFID: 0, // LFID
  contractList: [],
  saveSelectedItemInfo: null,
  handleContractFileFetch: null,
  handleContractListFetch: null,
  isLoading: false,
  closeDialog: null,
};
