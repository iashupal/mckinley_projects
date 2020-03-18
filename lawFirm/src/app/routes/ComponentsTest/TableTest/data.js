import React from 'react';
import { StatusButton } from '../../../../components/Table/EnhancedTable';

export const tableData = [
  {
    id: '1',
    date: '2019-07-09',
    task: '우편test발송-1',
    numTest: 1000,
    status: <StatusButton open />,
    admin: '김아무개1',
  },
  {
    id: '2',
    date: '2019-07-10',
    task: '우편test발송-2',
    numTest: 1100,
    status: <StatusButton open />,
    admin: '김아무개2',
  },
  {
    id: '3',
    date: '2019-07-11',
    task: '우편발송-3',
    numTest: 1200,
    status: <StatusButton />,
    admin: '김아무개1',
  },
  {
    id: '4',
    date: '2019-07-12',
    task: '우편test발송-4',
    numTest: 1300,
    status: <StatusButton />,
    admin: '김아무개3',
  },
  {
    id: '5',
    date: '2019-07-13',
    task: '우편발송-5',
    numTest: 3400,
    status: <StatusButton />,
    admin: '김아무개1',
  },
  {
    id: '6',
    date: '2019-07-14',
    task: '우편발송-6',
    numTest: 2500,
    status: <StatusButton />,
    admin: '김아무개2',
  },
];
