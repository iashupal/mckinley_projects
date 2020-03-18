import React, { Component } from "react";
import { Table, Button, message, Card, Popover, Input } from "antd";
import axios from "axios";
import moment from "moment";
import { GET_TOP_USER_URL } from "../utils/endpoints";
import "../css/style.css";

class UserRating extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Username",
        dataIndex: "ratusernameing",
        key: "username",
        width: "20%",
        render: (text, record) => <span>{record.username ? record.username : ""}</span>
      },
      {
        title: "Rating",
        dataIndex: "rating",
        key: "rating",
        width: "20%",
        render: (text, record) => <span>{record.userRating ? record.userRating : ""}</span>
      },
      {
        title: "Date",
        dataIndex: "createdAt",
        key: "createdAt",
        width: "20%",
        render: (text, record) => <span>{moment(record.createdAt).format("YYYY-MM-D HH:mm")}</span>
      }
    ];
    this.state = {
      userRating: [],
      loading: false,
      searched: false,
      searchText: null
    };
    this.getUserRating = this.getUserRating.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentDidMount() {
    this.getUserRating();
  }

  getUserRating(searchText = null) {
    const token = localStorage.getItem("token");
    this.setState({ loading: true });

    let searchString = "";
    if (searchText) {
      searchString = `?search=${searchText}`;
    }

    console.log(searchString);

    axios
      .get(GET_TOP_USER_URL + searchString, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("user rating", res.data);
        this.setState({ userRating: res.data.Body, loading: false });
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
    this.getUserRating(this.state.searchText);
  }
  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getUserRating();
  }

  render() {
    const { userRating, loading, searchText, searched } = this.state;
    return (
      <div>
        <Card
          headStyle={{ fontSize: "1.5rem" }}
          size="small"
          title={searched ? `Results for "${searchText}"` : "List of Top User Rating"}
          extra={[
            <Popover
              content={
                <div>
                  <Input
                    placeholder="Enter Username"
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
                {searched ? searchText : "Search Username"}
              </Button>
            </Popover>
          ]}
        >
          <Table
            dataSource={userRating}
            columns={this.columns}
            rowKey={record => record._id}
            size="small"
            pagination={{
              pageSize: 10
            }}
            loading={loading}
          />
        </Card>
      </div>
    );
  }
}

export default UserRating;
