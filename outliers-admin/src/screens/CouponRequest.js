import React, { Component, Fragment } from "react";
import { Table, Button, message, Card, Popover, Input, Popconfirm } from "antd";
import axios from "axios";
import { GET_COFFEE_REQUEST_URL, PATCH_COFFEE_RESOLVE_URL } from "../utils/endpoints";
import moment from "moment";
import "../css/style.css";
const token = localStorage.getItem("token");

class CouponRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coffeeRequests: [],
      loading: false,
      searched: false,
      searchText: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.getCoffeeRequest = this.getCoffeeRequest.bind(this);

    this.columns = [
      {
        title: "Receiver Email",
        dataIndex: "receiver email",
        width: "20%",
        render: (text, record) => <span>{record.receiverId ? record.receiverId.email : ""}</span>
      },
      {
        title: "Sender Email",
        dataIndex: "sender email",
        width: "20%",
        render: (text, record) => <span>{record.senderId ? record.senderId.email : ""}</span>
      },
      {
        title: "Date",
        dataIndex: "updatedAt",
        key: "updatedAt",
        width: "20%",
        render: (text, record) => <span>{moment(record.updatedAt).format("YYYY-MM-DD")}</span>
      },
      {
        title: "Status",
        dataIndex: "isResolved",
        key: "isResolved",
        width: "20%"
      },
      {
        title: "Actions",
        key: "actions",
        width: "20%",
        render: (text, record) => (
          <span>
            {record.isResolved !== "true" && (
              <Fragment>
                <Popconfirm
                  title="Are you sure, you want to resolve this coupon?"
                  onConfirm={() => this.VerifyCoupon(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" icon="check" size="small">
                    Resolve
                  </Button>
                </Popconfirm>
              </Fragment>
            )}
          </span>
        )
      }
    ];
  }

  componentDidMount() {
    this.getCoffeeRequest();
  }

  getCoffeeRequest(searchText = null) {
    const token = localStorage.getItem("token");
    this.setState({ loading: true });

    let searchString = "";
    if (searchText) {
      searchString = `?search=${searchText}`;
    }

    axios
      .get(GET_COFFEE_REQUEST_URL + searchString, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        res.data.Body.forEach(data => {
          data.isResolved = data.isResolved.toString();
        });
        this.setState({ coffeeRequests: res.data.Body, loading: false });
      })
      .catch(err => {
        message.error(err.message);
      });
  }
  VerifyCoupon(_id) {
    axios
      .patch(
        `${PATCH_COFFEE_RESOLVE_URL}`,
        { couponId: _id },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => window.location.reload())
      .catch(err => console.log(err));
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitSearch() {
    this.setState({ searched: true });
    this.getCoffeeRequest(this.state.searchText);
  }

  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getCoffeeRequest();
  }

  render() {
    const { coffeeRequests, loading, searchText, searched } = this.state;
    return (
      <div>
        <Card
          headStyle={{ fontSize: "1.5rem" }}
          size="small"
          title={searched ? `Results for "${searchText}"` : "Request for Coffee Coupon"}
          extra={[
            <Popover
              content={
                <div>
                  <Input
                    placeholder="Enter receiver email/sender email"
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
                {searched ? searchText : "Search Email"}
              </Button>
            </Popover>
          ]}
        >
          <Table
            dataSource={coffeeRequests}
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

export default CouponRequest;
