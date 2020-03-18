import React, { Component } from "react";
import { Card, Divider, message, Statistic, Row, Col } from "antd";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import {
  GET_GENDER_USER_URL,
  GET_NEW_USER_URL,
  GET_STATISTICS_URL,
  GET_COUNT_COFFEE_COUPON_URL,
  GET_CLOVER_COUNT_URL,
  GET_WEEKLY_USER_COUNT_URL,
  GET_WEEKLY_UNRESOLVED_REPORT_URL,
  GET_WEEKLY_COFFEE_COUPON_URL,
  GET_WEEKLY_PURCHASE_URL
} from "../utils/endpoints";
import axios from "axios";
const token = localStorage.getItem("token");

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weekly: [],
      newOldUsers: [],
      userCount: [],
      cloverCount: [],
      loading: false,
      WeeklyUserCount: [],
      weeklyUnresolvedReport: [],
      coffeeCouponCount: [],
      weeklyCoffeeCoupon: [],
      weeklyCloverAmt: []
    };
    this.getCount = this.getCount.bind(this);
    this.getWeekly = this.getWeekly.bind(this);
  }
  componentDidMount() {
    this.getCount();
    this.getWeekly();
  }
  getCount() {
    this.setState({ loading: true });
    // coffee coupon count
    axios
      .get(GET_COUNT_COFFEE_COUPON_URL, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        this.setState({
          coffeeCouponCount: JSON.parse(JSON.stringify(res.data)),
          loading: false
        });
      })
      .catch(err => {
        message.error(err.message);
      });
    // accepted user and unresolved report api
    axios
      .get(GET_STATISTICS_URL, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        // console.log("User count------", res.data);
        this.setState({ userCount: res.data, loading: false });
      })
      .catch(err => {
        message.error(err.message);
      });
    //  clover count api
    axios
      .get(GET_CLOVER_COUNT_URL, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        this.setState({
          cloverCount: JSON.parse(JSON.stringify(res.data.Body)),
          loading: false
        });
      })
      .catch(err => {
        message.error(err.message);
      });
  }

  getWeekly() {
    this.setState({ loading: true });
    axios
      .get(GET_WEEKLY_COFFEE_COUPON_URL, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        this.setState({
          weeklyCoffeeCoupon: JSON.parse(JSON.stringify(res.data.Body)),
          loading: false
        });
      })
      .catch(err => {
        message.error(err.message);
      });
    // get gender api
    axios
      .get(GET_GENDER_USER_URL, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        this.setState({
          weekly: JSON.parse(JSON.stringify(res.data)),
          loading: false
        });
      })
      .catch(err => {
        message.error(err.message);
      });
    // accepted user api
    axios
      .get(GET_WEEKLY_USER_COUNT_URL, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        this.setState({
          WeeklyUserCount: JSON.parse(JSON.stringify(res.data.Body)),
          loading: false
        });
      })
      .catch(err => {
        message.error(err.message);
      });
    // unresolved report
    axios
      .get(GET_WEEKLY_UNRESOLVED_REPORT_URL, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        this.setState({
          weeklyUnresolvedReport: JSON.parse(JSON.stringify(res.data.Body)),
          loading: false
        });
      })
      .catch(err => {
        message.error(err.message);
      });
    // new user api
    axios
      .get(GET_NEW_USER_URL, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        this.setState({
          newOldUsers: JSON.parse(JSON.stringify(res.data)),
          loading: false
        });
      })
      .catch(err => {
        message.error(err.message);
      });
    // clover amt api
    axios
      .get(GET_WEEKLY_PURCHASE_URL, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        this.setState({
          weeklyCloverAmt: JSON.parse(JSON.stringify(res.data.Body)),
          loading: false
        });
      })
      .catch(err => {
        message.error(err.message);
      });
  }

  render() {
    const {
      weekly,
      weeklyCoffeeCoupon,
      coffeeCouponCount,
      WeeklyUserCount,
      weeklyUnresolvedReport,
      weeklyCloverAmt,
      userCount,
      newOldUsers,
      cloverCount,
      loading
    } = this.state;

    if (newOldUsers.length > 0) {
      console.log("newUsers", newOldUsers[0].newUsers);
    }
    if (weekly.length > 0) {
      console.log("weekly object", weekly);
    }
    if (userCount.length > 0) {
      console.log("approvedUsers----------", userCount.acceptedUsers);
    }
    return (
      <div>
        <Row gutter={16} loading={loading}>
          <Col span={6}>
            <Card>
              <Statistic title="Accepted User" value={userCount.acceptedUsers} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Unresolved Reports" value={userCount.unresolvedReports} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Pending Coffee Coupon" value={coffeeCouponCount.Body} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Statistic title="Clovers" value={cloverCount.length ? cloverCount[0].clovers : ""} />
                <Statistic title="Amount" value={cloverCount.length ? cloverCount[0].amount : ""} />
              </div>
            </Card>
          </Col>
        </Row>
        <Divider />
        {/* <Row gutter={16}>
          <Col span={12}>
            <Card title="According to Gender Change Rate">
              <AreaChart
                width={500}
                height={400}
                data={weekly}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="male" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="female" stroke="#fec355" fill="#fec355" />
                <Area type="monotone" dataKey="other" stroke="#fec355" fill="#fec355" />
              </AreaChart>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="New & Old User Sign-up Rate">
              <AreaChart
                width={500}
                height={400}
                data={newOldUsers}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="newUsers" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="oldUsers" stroke="#fec355" fill="#fec355" />
              </AreaChart>
            </Card>
          </Col>
        </Row>
        <Divider /> */}
        <Row gutter={16}>
          <Col span={12}>
            <Card title="User Number Change Rate">
              <AreaChart
                width={500}
                height={400}
                data={WeeklyUserCount}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Unresolved Report">
              <AreaChart
                width={500}
                height={400}
                data={weeklyUnresolvedReport}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="unresolved" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </Card>
          </Col>
        </Row>
        <Divider />
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Change Rate of Coffee Coupon">
              <AreaChart
                width={500}
                height={400}
                data={weeklyCoffeeCoupon}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="coffee_pending" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Change Rate of Clovers Amount">
              <AreaChart
                width={500}
                height={400}
                data={weeklyCloverAmt}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="clovers" stroke="#fec355" fill="#fec355" />
              </AreaChart>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
