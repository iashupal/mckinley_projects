import React, { Component } from 'react';
import Table from 'components/Table/EnhancedTable';

class InvoiceHistoryDialog extends Component {
  render() {
    return (
      <Table
        initOrder="asc"
        initOrderBy="updateDate"
        rows={[
          { id: 'invoiceVersion', type: 'number', label: '버전', width: '10%' },
          { id: 'updateDate', type: 'date', label: '업데이트 일자', width: '20%' },
          { id: 'updateContents', label: '업데이트 내용', align: 'left', width: '60%' },
          { id: 'performer', label: '실행자', width: '10%' },
        ]}
        data={[
          {
            id: 1,
            invoiceVersion: 1,
            updateDate: '2019.04.01 14:00:00',
            updateContents: '청구서 등록',
            performer: '이사무장',
          },
          {
            id: 2,
            invoiceVersion: 2,
            updateDate: '2019.04.02 14:00:00',
            updateContents: '청구서 필드 업데이트 [실행인 : 박변호사]',
            performer: '박변호사',
          },
          {
            id: 3,
            invoiceVersion: 3,
            updateDate: '2019.04.03 14:00:00',
            updateContents: 'TC 항목 변경 [2건 -> 3건, 시간: [3h->6h], 금액: 2000000 -> 3000000]',
            performer: '김변호사',
          },
          {
            id: 4,
            invoiceVersion: 4,
            updateDate: '2019.04.04 14:00:00',
            updateContents: '청구 항목 업데이트 [청구상태 : 검토요청]',
            performer: '김변호사',
          },
          {
            id: 5,
            invoiceVersion: 5,
            updateDate: '2019.04.05 14:00:00',
            updateContents: '청구 항목 업데이트 [청구상태 : 검토완료]',
            performer: '김변호사',
          },
          {
            id: 6,
            invoiceVersion: 6,
            updateDate: '2019.04.06 14:00:00',
            updateContents: '청구 항목 업데이트 [청구상태 : 청구서 발송]',
            performer: '김변호사',
          },
          {
            id: 7,
            invoiceVersion: 7,
            updateDate: '2019.04.07 14:00:00',
            updateContents: '청구 항목 업데이트 [청구상태 : 입금확인]',
            performer: '시스템',
          },
        ]}
      />
    );
  }
}

export default InvoiceHistoryDialog;
