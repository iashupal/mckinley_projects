import React, { Component } from 'react';
import { RU } from 'helpers/ramda';
import Button from 'components/Button';
import Box from 'components/BoxOld';
import Table from 'components/Table/EnhancedTable';
import InputBox from 'components/InputBox';
import PropTypes from 'prop-types';

const { mlMessage } = RU;

class ConsultListDialogInfo extends Component {
  state = {
    searchText: '',
  };

  render() {
    const {
      LFID,
      consultList,
      saveSelectedItemInfo,
      handleConsultFileFetch,
      handleConsultListFetch,
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
            { id: 'client', label: mlMessage('pages.contract.client'), width: '20%' },
            { id: 'managerNameStr', label: mlMessage('pages.contract.manager'), width: '25%' },
            { id: 'title', label: mlMessage('pages.common.title'), align: 'left', width: '30%' },
            {
              id: 'consultingdate',
              type: 'date',
              label: mlMessage('pages.consultation.consultationDate'),
              width: '15%',
            },
          ]}
          data={consultList || []}
          customColumn={[
            {
              field: 'owner',
              component: ({ row }) =>
                row.owner.map((owner, idx) => <span key={idx}>{`${!owner.label ? '미정' : owner.label} `}</span>),
            },
          ]}
          mngIcons={(id, row) => (
            <>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  saveSelectedItemInfo(row.ConsultID, row.title, row.fileRefID);
                  if (handleConsultFileFetch) handleConsultFileFetch({ LFID, consultID: row.ConsultID });
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
                  handleSubmit={e => handleConsultListFetch({ LFID, searchText })}
                />
              </div>
            </>
          }
          isLoading={isLoading}
        />
      </>
    );
  }
}

export default ConsultListDialogInfo;

ConsultListDialogInfo.propTypes = {
  LFID: PropTypes.number, // LFID
  consultList: PropTypes.arrayOf(PropTypes.object), // 테이블에 뿌릴 ConsultList 데이터
  saveSelectedItemInfo: PropTypes.func, // 테이블 해당 레코드 선택 시 데이터 저장 함수 (id:'상담아이디', title:'제목', fileRefID:'파일 참조 아이디')
  handleConsultFileFetch: PropTypes.func, // 해당 상담의 파일 조회 함수
  handleConsultListFetch: PropTypes.func, // 상담 리스트 조회 함수
  isLoading: PropTypes.bool, // 테이블 로딩
  closeDialog: PropTypes.func, // 다이얼로그 닫기
};

ConsultListDialogInfo.defaultProps = {
  LFID: 0, // LFID
  consultList: [],
  saveSelectedItemInfo: null,
  handleConsultFileFetch: null,
  handleConsultListFetch: null,
  isLoading: false,
  closeDialog: null,
};
