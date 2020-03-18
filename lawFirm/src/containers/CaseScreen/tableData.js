import React from 'react';
import { IconButton, StatusButton } from '../../components/Table/EnhancedTable';

const tableData = [
  {
    id: '1',
    date: '2019-01-01',
    task: '우편발송',
    status: <StatusButton open />,
    admin: '김아무개',
    manage: <IconButton />,
  },
  {
    id: '2',
    date: '2019-02-01',
    task: '우편발송',
    status: <StatusButton open />,
    admin: '김아무개',
    manage: <IconButton />,
  },
  {
    id: '3',
    date: '2019-03-01',
    task: '우편발송',
    status: <StatusButton />,
    admin: '김아무개',
    manage: <IconButton />,
  },
  {
    id: '4',
    date: '2019-03-01',
    task: '우편발송',
    status: <StatusButton />,
    admin: '김아무개',
    manage: <IconButton />,
  },
  {
    id: '5',
    date: '2019-03-01',
    task: '우편발송',
    status: <StatusButton />,
    admin: '김아무개',
    manage: <IconButton />,
  },
  {
    id: '6',
    date: '2019-03-01',
    task: '우편발송',
    status: <StatusButton />,
    admin: '김아무개',
    manage: <IconButton />,
  },
  {
    id: '7',
    date: '2019-03-01',
    task: '우편발송',
    status: <StatusButton />,
    admin: '김아무개',
    manage: <IconButton />,
  },
  {
    id: '8',
    date: '2019-03-21',
    task: '계약서 작성',
    status: <StatusButton open />,
    admin: '김아무개',
    manage: <IconButton />,
  },
  {
    id: '9',
    date: '2019-04-01',
    task: '우편발송',
    status: <StatusButton />,
    admin: '김아무개',
    manage: <IconButton />,
  },
  {
    id: '10',
    date: '2019-05-01',
    task: '우편발송',
    status: <StatusButton />,
    admin: '김아무개',
    manage: <IconButton />,
  },
];

export default tableData;
