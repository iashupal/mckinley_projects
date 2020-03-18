import React from 'react';
import { Card, Divider, Statistic, Row, Col } from 'antd';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Week 1',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Week 2',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Week 3',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Week 4',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Week 5',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Week 6',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Week 7',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function Dashboard() {
  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Active Users" value={41} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Pending Users" value={23} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Unresolved Reports" value={18} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Coffee Coupon Requests" value={3322} />
          </Card>
        </Col>
      </Row>
      <Divider />
      <div>(1) SuperAdmin, Admin, Intern</div>
      <div>(2) Donation Tags only if you have time</div>
      <div>(3) Csv export on the sales</div>
      <div>(4) Admin password chagne</div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Monthly User Count Change rate">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Monthly Sales">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#fec355"
                  fill="#fec355"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
