import React, { Component } from "react";
import { Table, Button, message, Card, Popover, Input } from "antd";
import axios from "axios";
import { GET_COFFEE_COUPON_URL } from "../utils/endpoints";
import { CSVLink } from "react-csv";
import moment from "moment";
import "../css/style.css";

class CoffeeCoupon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coffeeCoupons: [],
      loading: false,
      searched: false,
      searchText: null,
      csvData: [["id", "Type", "Status"]]
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.getCoffeeCoupon = this.getCoffeeCoupon.bind(this);
    this.setCSV = this.setCSV.bind(this);

    this.columns = [
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "25%",
        render: (text, record) => <span>{record.receiverId ? record.receiverId.email : ""}</span>
      },
      {
        title: "Date",
        dataIndex: "updatedAt",
        key: "updatedAt",
        width: "25%",
        render: (text, record) => <span>{moment(record.updatedAt).format("YYYY-MM-DD")}</span>
      },
      {
        title: "Type",
        dataIndex: "sentType",
        key: "sentType",
        width: "25%",
        render: (text, record) => <span>{record.sentType === "coffee" ? "Normal" : "Gold"}</span>
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "25%"
      }
    ];
  }

  componentDidMount() {
    this.getCoffeeCoupon();
  }

  getCoffeeCoupon(searchText = null) {
    const token = localStorage.getItem("token");
    this.setState({ loading: true });

    let searchString = "";
    if (searchText) {
      searchString = `?search=${searchText}`;
    }

    axios
      .get(GET_COFFEE_COUPON_URL + searchString, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        this.setState({ coffeeCoupons: res.data.Body, loading: false });
        this.setCSV();
      })
      .catch(err => {
        message.error(err.message);
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitSearch() {
    this.setState({ searched: true });
    this.getCoffeeCoupon(this.state.searchText);
  }

  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getCoffeeCoupon();
  }

  setCSV() {
    // csvData: [["id", "Type", "Status"]];
    let csvData = this.state.csvData;
    this.state.coffeeCoupons.map(coffeeCoupon => {
      let entry = [];
      entry.push(String(coffeeCoupon._id));
      entry.push(String(coffeeCoupon.sentType));
      entry.push(String(coffeeCoupon.status));
      csvData.push(entry);
      return 0;
    });
    this.setState({ csvData: csvData });
  }

  render() {
    const { coffeeCoupons, loading, searchText, searched } = this.state;
    return (
      <div>
        <Card
          headStyle={{ fontSize: "1.5rem" }}
          size="small"
          title={searched ? `Results for "${searchText}"` : "Coffee Coupon"}
          extra={[
            <Popover
              content={
                <div>
                  <Input
                    placeholder="Enter recipient's email/Type"
                    onChange={this.handleChange}
                    name="searchText"
                    value={searchText}
                    disabled={searched}
                  />
                  <br />
                  <br />
                  <Button
                    style={{ width: "100%" }}
                    type={searched ? "danger" : "primary"}
                    icon={searched ? "delete" : "search"}
                    onClick={searched ? this.clearSearch : this.submitSearch}
                    disabled={!!!searchText}
                  >
                    {searched ? "Clear search" : "Search"}
                  </Button>
                </div>
              }
              placement="bottom"
            >
              <Button type="dashed" icon="search" style={{ margin: 5 }}>
                {searched ? searchText : "Search Coupon"}
              </Button>
            </Popover>,
            <CSVLink data={this.state.csvData} filename={`coffeeCoupon-${moment(new Date()).toISOString()}.csv`}>
              <Button icon="download" style={{ margin: 5 }}>
                Download CSV
              </Button>
            </CSVLink>
          ]}
        >
          <Table
            dataSource={coffeeCoupons}
            columns={this.columns}
            rowKey={record => record._id}
            size="small"
            pagination={{
              showLessItems: true,
              pageSize: 10
            }}
            loading={loading}
          />
        </Card>
      </div>
    );
  }
}

export default CoffeeCoupon;
