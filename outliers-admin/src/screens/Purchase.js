import React, { Component, Fragment } from "react";
import { Table, Button, message, Card, Popover, Input, Modal, Icon } from "antd";
import PurchaseForm from "../components/PurchaseForm";
import axios from "axios";
import { GET_CLOVER_URL, GET_USER_URL } from "../utils/endpoints";
import { CSVLink } from "react-csv";
import Pagination from "react-js-pagination";
import moment from "moment";
import "../css/style.css";
import "../css/modal.css";
import dummy from "../images/dummy.png";
const role = localStorage.getItem("role");

class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchases: [],
      users: [],
      loading: false,
      formVisible: false,
      searched: false,
      searchText: null,
      activePage: 1,
      totalDocsCount: 0,
      docsCount: 10,
      csvData: [["id", "No. of Clover"]]
    };
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.getPurchaseClover = this.getPurchaseClover.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.setCSV = this.setCSV.bind(this);

    this.columns = [
      {
        title: "UserId",
        dataIndex: "id",
        key: "_id",
        width: "15%",
        render: (text, record) => (
          <span style={{ cursor: "pointer" }} onClick={() => this.showDetailModal(record.userId._id)}>
            {record.userId ? record.userId._id : ""}
          </span>
        )
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "vibes[0].username",
        width: "20%",
        render: (text, record) => <span>{record.userId ? record.userId.username : ""}</span>
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "purchases[0].userId",
        width: "20%",
        render: (text, record) => <span>{record.userId ? record.userId.email : ""}</span>
      },
      {
        title: "Payment Amount",
        dataIndex: "amount",
        key: "purchases[0].amount",
        width: "15%",
        render: (text, record) => <span>{record.amount ? record.amount : ""}</span>
      },
      {
        title: "No. of Clovers",
        dataIndex: "cloversPurchased",
        key: "purchases[0].cloversPurchased",
        width: "15%",
        render: (text, record) => <span>{record.cloversPurchased ? record.cloversPurchased : ""}</span>
      },
      {
        title: "Date",
        dataIndex: "createdAt",
        key: "purchases[0].createdAt",
        width: "20%",
        render: (text, record) => <span>{moment(record.createdAt).format("YYYY-MM-DD HH:mm")}</span>
      }
    ];
  }

  componentDidMount() {
    this.getPurchaseClover();
    this.getUsers();
  }

  getUsers(_id) {
    const token = localStorage.getItem("token");
    this.setState({ loading: true });

    axios
      .get(GET_USER_URL, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("users", res.data.allUsers);
        this.setState({ users: res.data.allUsers, loading: false });
      })
      .catch(err => {
        message.error(err.message);
      });
  }

  getPurchaseClover(searchText = null) {
    const { docsCount, activePage, searched } = this.state;
    const token = localStorage.getItem("token");
    this.setState({ loading: true });

    let searchString = "";
    if (searchText) {
      searchString = `?search=${searchText}`;
    }

    axios
      .get(`${GET_CLOVER_URL}?limit=${docsCount}&page=${activePage}` + searchString, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("purchases", res.data.Body);
        this.setState({ loading: false, totalDocsCount: !searched ? res.data.totalDocsCount : res.data.totalDocsCount }, () => {
          if (this.state.totalDocsCount === 0) {
            this.setState({ totalDocsCount: 1 });
          }
          this.setState({ purchases: res.data.Body });
          this.setCSV();
        });
      })
      .catch(err => {
        message.error(err.message);
      });
  }

  showForm() {
    this.setState({
      formVisible: true,
      mode: "new"
    });
  }

  hideForm() {
    this.setState({
      formVisible: false
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitSearch() {
    this.setState({ searched: true });
    this.getPurchaseClover(this.state.searchText);
  }

  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getPurchaseClover();
  }

  setCSV() {
    // csvData: [["id", "No. of Clover"]];
    let csvData = this.state.csvData;
    this.state.purchases.map(purchase => {
      let entry = [];
      entry.push(String(purchase._id));
      entry.push(String(purchase.cloversPurchased));
      csvData.push(entry);
      return 0;
    });
    this.setState({ csvData: csvData });
  }

  showDetailModal = _id => {
    const record = this.state.users.filter(user => user["_id"] === _id)[0];

    Modal.info({
      title: "Profile Details",
      content: (
        <div>
          <div style={{ width: "100%", margin: "0 auto", height: "100%" }}>
            <img
              src={record.photos.length ? record.photos[0].url : dummy}
              style={{ width: "100%", objectFit: "cover", height: "100%" }}
              alt="User_Image"
            />
          </div>
          <ul
            style={{
              listStyle: "none",
              marginTop: 15,
              padding: 0
            }}
          >
            <li>
              <strong>Email:</strong> {record.email ? record.email : "N/A"}
            </li>
            <li>
              <strong>Username:</strong> {record.username ? record.username : "N/A"}
            </li>
            <li>
              <strong>College name:</strong> {record.college ? record.college : "N/A"}
            </li>
            <li>
              <strong>Company name:</strong> {record.company ? record.company : "N/A"}
            </li>
            <li>
              <strong>School:</strong> {record.school ? record.school : "N/A"}
            </li>

            <li>
              <strong>Smoke:</strong> {record.doSmoke ? record.doSmoke : "N/A"}
            </li>
            <li>
              <strong>DOB:</strong>
              {moment(record.dob).format("YYYY-MM-D HH:mm")}
            </li>
            <li>
              <strong>Height:</strong> {record.height ? record.height : "N/A"}
            </li>
            <li>
              <strong>Interested Hashtags:</strong> {record.interestedHashtags ? record.interestedHashtags.join(", ") : "N/A"}
            </li>
            <li>
              <strong>Location:</strong> {record.location ? record.location : "N/A"}
            </li>
            <li>
              <strong>Occupation:</strong> {record.occupation ? record.occupation : "N/A"}
            </li>
            <li>
              <strong>Physique:</strong> {record.physique ? record.physique : "N/A"}
            </li>
            <li>
              <strong>Race:</strong> {record.race ? record.race : "N/A"}
            </li>
            <li>
              <strong>Payments:</strong> {record.coffeeCoupons ? record.coffeeCoupons : "N/A"}
            </li>
            <li>
              <strong>Reported On:</strong> {moment(record.createdAt).format("YYYY-MM-D HH:mm")}
            </li>
            <li>
              <strong>Self Introduction:</strong>
              {record.introduction ? record.introduction : "N/A"}
            </li>
          </ul>
        </div>
      ),
      okText: "OK"
    });
  };
  handlePageChange = activePage => {
    this.setState({ activePage }, () => this.getPurchaseClover());
  };

  render() {
    const {
      purchases,
      loading,
      formVisible,
      mode,
      entry,
      searchText,
      searched,
      docsCount,
      totalDocsCount,
      activePage
    } = this.state;
    return (
      <div>
        <Card
          headStyle={{ fontSize: "1.5rem" }}
          size="small"
          title={searched ? `Results for "${searchText}"` : "Payments"}
          extra={[
            <Popover
              content={
                <div>
                  <Input
                    placeholder="Enter user email"
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
            </Popover>,
            <CSVLink data={this.state.csvData} filename={`purchase-${moment(new Date()).toISOString()}.csv`}>
              <Button icon="download" style={{ margin: 5 }}>
                Download CSV
              </Button>
            </CSVLink>,
            <Fragment>
              {role === "owner" ? (
                <Button type="primary" icon="plus" style={{ margin: 5 }} onClick={this.showForm}>
                  Add Reward
                </Button>
              ) : (
                ""
              )}
            </Fragment>
          ]}
        >
          <Table
            dataSource={purchases}
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
        <PurchaseForm visible={formVisible} showForm={this.showForm} hideForm={this.hideForm} mode={mode} entry={entry} />
      </div>
    );
  }
}

export default Purchase;
