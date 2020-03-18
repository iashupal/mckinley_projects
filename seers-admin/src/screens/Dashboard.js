import React from 'react';
import { Card, Divider, Statistic, Row, Col } from 'antd';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Scatter,
  ScatterChart,
} from 'recharts';

const data = [
  {
    name: 'Week A',
    doctors: 4000,
    patients: 2400,
    amt: 2400,
  },
  {
    name: 'Week B',
    doctors: 3000,
    patients: 1398,
    amt: 2210,
  },
  {
    name: 'Week C',
    doctors: 2000,
    patients: 9800,
    amt: 2290,
  },
  {
    name: 'Week D',
    doctors: 2780,
    patients: 3908,
    amt: 2000,
  },
  {
    name: 'Week E',
    doctors: 1890,
    patients: 4800,
    amt: 2181,
  },
  {
    name: 'Week F',
    doctors: 2390,
    patients: 3800,
    amt: 2500,
  },
  {
    name: 'Week G',
    doctors: 3490,
    patients: 4300,
    amt: 2100,
  },
];

const scatterData = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
];

function Dashboard() {
  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Active Patients" value={41} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="New Patients" value={23} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Active Doctors" value={18} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Average Monthly Usage" value={3322} />
          </Card>
        </Col>
      </Row>
      <Divider />
      <Row gutter={16}>
        <Col span={12}>
          <Card title="User Number Change Rate">
            <AreaChart
              width={500}
              height={400}
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
                dataKey="patients"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="doctors"
                stroke="#fec355"
                fill="#fec355"
              />
            </AreaChart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="New User Sign-up Rate">
            <AreaChart
              width={500}
              height={400}
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
                dataKey="doctors"
                stroke="#fec355"
                fill="#fec355"
              />
            </AreaChart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Active User Rate [Doctor]">
            <AreaChart
              width={500}
              height={400}
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
                dataKey="doctors"
                stroke="#fec355"
                fill="#fec355"
              />
            </AreaChart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Active User Rate [Patient]">
            <AreaChart
              width={500}
              height={400}
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
                dataKey="doctors"
                stroke="#fec355"
                fill="#fec355"
              />
            </AreaChart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Appointment Time Distribution">
            <ScatterChart
              width={500}
              height={400}
              margin={{
                top: 10,
                right: 10,
                bottom: 10,
                left: 10,
              }}
            >
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="day" />
              <YAxis
                type="number"
                dataKey="y"
                name="measurement"
                // unit="count"
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="A school" data={scatterData} fill="#8884d8" />
            </ScatterChart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Measurement Time Distribution">
            <ScatterChart
              width={500}
              height={400}
              margin={{
                top: 10,
                right: 10,
                bottom: 10,
                left: 10,
              }}
            >
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="stature" />
              <YAxis type="number" dataKey="y" name="weight" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="A school" data={scatterData} fill="#8884d8" />
            </ScatterChart>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
