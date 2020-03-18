import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RU } from 'helpers/ramda';
import ContentCard from 'components/ContentCard';
import ListDetailContainer from 'components/ListDetailContainer';
import InputBoxNumber from 'components/InputBoxNumber';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import DateRange from 'components/DateRange';
import Table from 'components/Table/EnhancedTable';
import { NotificationManager } from 'react-notifications';
import Tab from 'components/Tab';

const { mlMessage } = RU;

class TCStatus extends Component {
  state = {
    tab: 0,
  };

  componentDidMount = () => {};

  changeTab = tab => {
    this.setState({ tab });
  };

  render() {
    const { tab } = this.state;

    const TotalTC = (
      <>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ width: '100%' }}>
            <DateRange
              label="기간"
              startDate={new Date()}
              endDate={new Date()}
              handleChange={obj => {}}
              handleSubmit={(startDate, endDate) => {
                NotificationManager.info(`submit: ${startDate} ~ ${endDate}`);
              }}
            />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', marginTop: '10px' }}>
            <ResponsiveContainer width="99%" height={300}>
              <LineChart
                data={[
                  {
                    name: '2019-02-10',
                    BillingAmount: 4000,
                    UnclaimedAmount: 2400,
                    amt: 2400,
                  },
                  {
                    name: '2019-02-20',
                    BillingAmount: 3000,
                    UnclaimedAmount: 1398,
                    amt: 2210,
                  },
                  {
                    name: '2019-03-01',
                    BillingAmount: 2000,
                    UnclaimedAmount: 9800,
                    amt: 2290,
                  },
                  {
                    name: '2019-03-10',
                    BillingAmount: 2780,
                    UnclaimedAmount: 3908,
                    amt: 2000,
                  },
                  {
                    name: '2019-03-20',
                    BillingAmount: 1890,
                    UnclaimedAmount: 4800,
                    amt: 2181,
                  },
                  {
                    name: '2019-03-30',
                    BillingAmount: 2390,
                    UnclaimedAmount: 3800,
                    amt: 2500,
                  },
                  {
                    name: '2019-04-01',
                    BillingAmount: 3490,
                    UnclaimedAmount: 4300,
                    amt: 2100,
                  },
                ]}
                margin={{
                  top: 20,
                  right: 20,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="BillingAmount" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="UnclaimedAmount" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ marginTop: '85px' }}>
            총 시간 : 10:50 <br />
            청구 금액 : 3,500,000원
            <br />
            미청구 금액 : 3,500,000원
            <br />총 금액 : 3,500,000원
          </div>
          <div style={{ width: '100%' }}>
            <Table
              initOrder="desc"
              initOrderBy="contractDate"
              rows={[
                { id: '1', label: '항목', width: '5%' },
                { id: '2', label: '시간', width: '5%' },
                { id: '3', label: '사건', align: 'left', width: '20%' },
                { id: '4', label: '내용', align: 'left', width: '20%' },
                { id: '5', label: '실행인', width: '10%' },
                { id: '6', label: '청구요율', width: '5%' },
                { id: '7', label: '청구비용', width: '5%' },
                { id: '8', label: '실행일', width: '10%' },
              ]}
              data={[]}
              // multiKey={['LFID', 'contractID']}
              // isLoading={isLoading}
            />
          </div>
        </div>
        ,
      </>
    );

    const ExcutorTC = (
      <>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ width: '100%' }}>
            <DateRange
              label="기간"
              startDate={new Date()}
              endDate={new Date()}
              handleChange={obj => {}}
              handleSubmit={(startDate, endDate) => {
                NotificationManager.info(`submit: ${startDate} ~ ${endDate}`);
              }}
            />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', marginTop: '10px' }}>
            <ResponsiveContainer width="99%" height={300}>
              <BarChart
                width={500}
                height={300}
                data={[
                  {
                    name: '김변호사',
                    BillingAmount: 4000,
                    UnclaimedAmount: 2400,
                    amt: 2400,
                  },
                  {
                    name: '박변호사',
                    BillingAmount: 3000,
                    UnclaimedAmount: 1398,
                    amt: 2210,
                  },
                  {
                    name: '홍변호사',
                    BillingAmount: 2000,
                    UnclaimedAmount: 9800,
                    amt: 2290,
                  },
                  {
                    name: '이변호사',
                    BillingAmount: 2780,
                    UnclaimedAmount: 3908,
                    amt: 2000,
                  },
                  {
                    name: '김변호사',
                    BillingAmount: 1890,
                    UnclaimedAmount: 4800,
                    amt: 2181,
                  },
                  {
                    name: '왕변호사',
                    BillingAmount: 2390,
                    UnclaimedAmount: 3800,
                    amt: 2500,
                  },
                  {
                    name: '서변호사',
                    BillingAmount: 3490,
                    UnclaimedAmount: 4300,
                    amt: 2100,
                  },
                ]}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="BillingAmount" fill="#8884d8" />
                <Bar dataKey="UnclaimedAmount" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ marginTop: '85px' }}>
            총 시간 : 10:50 <br />
            청구 금액 : 3,500,000원
            <br />
            미청구 금액 : 3,500,000원
            <br />총 금액 : 3,500,000원
          </div>
          <div style={{ width: '100%' }}>
            <Table
              initOrder="desc"
              initOrderBy="contractDate"
              rows={[
                { id: '1', label: '항목', width: '5%' },
                { id: '2', label: '시간', width: '5%' },
                { id: '3', label: '사건', align: 'left', width: '20%' },
                { id: '4', label: '내용', align: 'left', width: '20%' },
                { id: '5', label: '실행인', width: '10%' },
                { id: '6', label: '청구요율', width: '5%' },
                { id: '7', label: '청구비용', width: '5%' },
                { id: '8', label: '실행일', width: '10%' },
              ]}
              data={[]}
              // multiKey={['LFID', 'contractID']}
              // isLoading={isLoading}
            />
          </div>
        </div>
        ,
      </>
    );

    const TableComponent = (
      <>
        <div display="flex" flexDirection="row" flexWrap="wrap">
          <Tab selected={tab === 0} text="전체현황" onClick={() => this.changeTab(0)} />
          <Tab selected={tab === 1} text="실행자별" onClick={() => this.changeTab(1)} />
        </div>

        <ContentCard
          title=""
          customHeader={
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <h2>TC 현황</h2>
            </div>
          }
          contents={[tab === 0 ? TotalTC : ExcutorTC]}
        />
      </>
    );

    return <ListDetailContainer TableComponent={TableComponent} handleDialogClose={() => {}} />;
  }
}

const mapStateToProps = ({ auth }) => {
  const { MyLFID } = auth.authUser;
  return {
    MyLFID,
  };
};

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TCStatus);
