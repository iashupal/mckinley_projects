/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Card, Table } from 'antd';

const tableColumns = [
  {
    title: 'Order ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Reportee',
    dataIndex: 'reportee',
    key: 'reportee',
  },
  {
    title: 'Reporter',
    dataIndex: 'reporter',
    key: 'reporter',
  },
  {
    title: 'Reported Data',
    dataIndex: 'reportDate',
    key: 'reportDate',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => (
      <div>
        <a href="javascript:;" onClick={() => console.log('sex')}>
          View Details
        </a>
      </div>
    ),
  },
];

function ItemOrders() {
  const [tableData, setTableData] = useState([
    {
      key: '1',
      id: '1',
      reportee: 'sexmaster5882',
      reporter: 'doggiemaster6974',
      reportDate: new Date().toString(),
      status: 'Resolved',
    },
  ]);
  const [loading, setLoading] = useState(false);

  return (
    <Card title="Item Orders">
      <Table
        dataSource={tableData}
        columns={tableColumns}
        size="small"
        pagination={{
          pageSize: 30,
        }}
        loading={loading}
        // rowKey="uid"
      />
    </Card>
  );
}

export default ItemOrders;
