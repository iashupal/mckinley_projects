import React, { Component } from 'react';
import Table from 'components/Table/EnhancedTable';
import { tableData3 } from 'helpers/data_sample';

class TableTest2 extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <div>
          [소계/합계 Table sample]
          <br />
          - sum 이 되어야 하는 Column 은, sum 및 noSort 가 true로 지정, align 는 "right".
          <br />
          - 초기 정렬 필드는, Group 필요한 필드명으로 지정
          <br />
          - hidePagination, hideFilter 처리 필요
          <br />
          - subSumRows에는 그룹핑될 필드명을 지정
          <br />- totalSumRow은 별도로 동작하며 최하단 합계 필요시에 true
        </div>
        <Table
          rows={[
            { id: 'AccountGroup', label: '계정그룹', noSort: true },
            { id: 'Account', label: '계정', noSort: true },
            { id: 'Budget', label: '예산', noSort: true, sum: true, align: 'right' },
            { id: 'AddBudget', label: '추가예산', noSort: true, sum: true, align: 'right' },
            { id: 'Expense', label: '실적', noSort: true, sum: true, align: 'right' },
            { id: 'AvailExpense', label: '잔여 총예산', noSort: true, sum: true, align: 'right' },
            { id: 'BudgetPercent', label: '예산 소진율', noSort: true, sum: true, align: 'right' },
          ]}
          initOrder="asc"
          initOrderBy="AccountGroup"
          data={tableData3}
          hidePagination
          hideFilter
          subSumRows="AccountGroup"
          totalSumRow
        />
        <br />
      </div>
    );
  }
}

export default TableTest2;
