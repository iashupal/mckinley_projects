import React, { Component } from "react";
import { Table, Button, message, Card, Popover, Input, Popconfirm, Icon } from "antd";
import axios from "axios";
import moment from "moment";
import Pagination from "react-js-pagination";
import { GET_RESOLVE_REQUEST_URL, PATCH_RESOLVE_REQUEST_URL } from "../utils/endpoints";
import "../css/style.css";

class ResolveRequest extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Receiver email",
        dataIndex: "email",
        key: "email",
        width: "20%",
        render: (text, record) => <span>{record.receiverId.email ? record.receiverId.email : ""}</span>
      },
      {
        title: "Receiver Username",
        dataIndex: "username",
        key: "username",
        width: "20%",
        render: (text, record) => <span>{record.receiverId.username ? record.receiverId.username : ""}</span>
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "20%",
        render: (text, record) => <span>{record.status ? record.status : ""}</span>
      },
      {
        title: "Date",
        dataIndex: "createdAt",
        key: "createdAt",
        width: "20%",
        render: (text, record) => <span>{moment(record.createdAt).format("YYYY-MM-D HH:mm")}</span>
      },
      {
        title: "Type",
        dataIndex: "url",
        key: "url",
        width: "20%",
        render: (text, record) => <span>{record.sentType ? record.sentType : ""}</span>
      },
      {
        title: "Actions",
        key: "actions",
        width: "20%",
        render: (text, record) => (
          <span>
            {record.status === "pending" && (
              <Popconfirm
                title="Are you sure, you want to resolve like request?"
                onConfirm={() => this.resolveLikeRequest(record._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" icon="check" size="small">
                  Resolve
                </Button>
              </Popconfirm>
            )}
          </span>
        )
      }
    ];
    this.state = {
      resolveRequest: [],
      loading: false,
      searched: false,
      searchText: null,
      activePage: 1,
      totalDocsCount: 0,
      docsCount: 10
    };
    this.getResolveRequest = this.getResolveRequest.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentDidMount() {
    this.getResolveRequest();
  }

  getResolveRequest(searchText = null) {
    const { docsCount, activePage, searched } = this.state;
    const token = localStorage.getItem("token");
    this.setState({ loading: true });

    let searchString = "";
    if (searchText) {
      searchString = `?search=${searchText}`;
    }

    console.log(searchString);

    axios
      .get(`${GET_RESOLVE_REQUEST_URL}?limit=${docsCount}&page=${activePage}` + searchString, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("resolve request", res.data);
        this.setState({ loading: false, totalDocsCount: !searched ? res.data.totalDocsCount : res.data.totalDocsCount }, () => {
          if (this.state.totalDocsCount === 0) {
            this.setState({ totalDocsCount: 1 });
          }
          this.setState({ resolveRequest: res.data.Body });
        });
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
    this.getResolveRequest(this.state.searchText);
  }
  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getResolveRequest();
  }

  resolveLikeRequest(_id) {
    const token = localStorage.getItem("token");
    axios
      .patch(
        `${PATCH_RESOLVE_REQUEST_URL}`,
        { id: _id },
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

  handlePageChange = activePage => {
    this.setState({ activePage }, () => this.getResolveRequest());
  };

  render() {
    const { resolveRequest, loading, searchText, searched, docsCount, totalDocsCount, activePage } = this.state;
    return (
      <div>
        <Card
          headStyle={{ fontSize: "1.5rem" }}
          size="small"
          title={searched ? `Results for "${searchText}"` : "Resolve Request"}
          extra={[
            <Popover
              content={
                <div>
                  <Input
                    placeholder="Enter username"
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
            dataSource={resolveRequest}
            columns={this.columns}
            rowKey={record => record._id}
            size="small"
            pagination={false}
            loading={loading}
          />
        </Card>
        <Pagination
          firstPageText={<Icon type="double-left-#" />}
          lastPageText={<Icon type="double-right-#" />}
          prevPageText={<Icon type="left" />}
          nextPageText={<Icon type="right" />}
          activePage={activePage}
          disabledClass="ant-pagination-disabled"
          activeClass="ant-pagination-item-active"
          itemsCountPerPage={docsCount}
          totalItemsCount={totalDocsCount}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default ResolveRequest;
