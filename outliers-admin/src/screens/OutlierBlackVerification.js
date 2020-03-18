import React, { Component, Fragment } from "react";
import { Table, Button, message, Card, Popconfirm, Modal, Divider, Popover, Input, Icon } from "antd";
import axios from "axios";
import { GET_USER_URL, PATCH_VERIFY_DOCUMENT_URL } from "../utils/endpoints";
import Pagination from "react-js-pagination";
import "../css/style.css";
import "../css/modal.css";
import moment from "moment";
import dummy from "../images/dummy.png";
const token = localStorage.getItem("token");

class OutlierBlackVerification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: false,
      searched: false,
      searchText: null,
      activePage: 1,
      totalDocsCount: 0,
      docsCount: 10
    };

    this.handleChange = this.handleChange.bind(this);
    this.getUsersVerify = this.getUsersVerify.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);

    this.columns = [
      {
        title: "UserId",
        dataIndex: "id",
        key: "_id",
        width: "15%",
        render: (text, record) => (
          <span style={{ cursor: "pointer" }} onClick={() => this.showDetailModal(record)}>
            {record._id}
          </span>
        )
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        width: "12%"
      },
      {
        title: "Criteria",
        dataIndex: "wealthCriteria",
        key: "wealthCriteria",
        width: "20%"
      },
      {
        title: "Document",
        dataIndex: "wealthDocument",
        key: "wealthDocument",
        width: "12%",
        render: (text, record) => (
          <img
            style={{ width: "120px", height: "120px", cursor: "pointer", objectFit: "cover" }}
            src={record.wealthDocument.length ? record.wealthDocument : dummy}
            alt="Document_Image"
            onClick={() => this.showModal(record)}
          />
        )
      },
      {
        title: "Status",
        dataIndex: "wealthVerified",
        key: "wealthVerified",
        width: "12%"
      },
      {
        title: "Date",
        dataIndex: "createdAt",
        key: "createdAt",
        width: "12%",
        render: (text, record) => <span>{moment(record.createdAt).format("YYYY-MM-D HH:mm")}</span>
      },
      {
        title: "Actions",
        key: "actions",
        width: "30%",
        render: (text, record) => (
          <span>
            {record.wealthVerified !== "accepted" && (
              <Fragment>
                <Popconfirm
                  title="Are you sure, you want to approve this wealth document?"
                  onConfirm={() => this.VerifywealthDocument(record._id, "accepted")}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button icon="check" size="small">
                    Approve
                  </Button>
                </Popconfirm>
                <Divider type="vertical" />
              </Fragment>
            )}
            {record.wealthVerified !== "rejected" && (
              <Fragment>
                <Popconfirm
                  title="Are you sure, you want to reject this wealth document?"
                  onConfirm={() => this.VerifywealthDocument(record._id, "rejected")}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button icon="close" size="small">
                    Reject
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
    this.getUsersVerify();
  }

  getUsersVerify(searchText = null) {
    const { docsCount, activePage, searched } = this.state;
    const token = localStorage.getItem("token");
    this.setState({ loading: true });
    axios
      .get(`${GET_USER_URL}?limit=${docsCount}&page=${activePage}&search=${searchText || ""}&type=black`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("users", res.data);
        res.data.allUsers.forEach(data => {
          data.wealthVerified = data.wealthVerified.toString();
        });
        this.setState({ loading: false, totalDocsCount: !searched ? res.data.totalDocsCount : res.data.totalDocsCount }, () => {
          if (this.state.totalDocsCount === 0) {
            this.setState({ totalDocsCount: 1 });
          }
          this.setState({ users: res.data.allUsers });
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
    this.getUsersVerify(this.state.searchText);
  }
  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getUsersVerify();
  }
  showModal = record => {
    Modal.success({
      title: "Wealth Document",
      content: (
        <div
          style={{
            width: "100%",
            margin: "20px auto 0",
            textAlign: "center",
            height: "100%"
          }}
        >
          <img
            style={{ width: "100%", objectFit: "cover", height: "100%" }}
            src={record.wealthDocument.length ? record.wealthDocument : dummy}
            alt="Document_Image"
          />
        </div>
      ),
      okText: "OK"
    });
  };

  showDetailModal = record => {
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
              <strong>Email:</strong> {record.email}
            </li>
            <li>
              <strong>Username:</strong> {record.username}
            </li>
            <li>
              <strong>College name:</strong> {record.college}
            </li>
            <li>
              <strong>Company name:</strong> {record.company}
            </li>
            <li>
              <strong>School:</strong> {record.school}
            </li>

            <li>
              <strong>Smoke:</strong> {record.doSmoke ? record.doSmoke : ""}
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
      okText: "OK",
      cancelText: "Cancel"
    });
  };

  VerifywealthDocument(_id, status) {
    axios
      .patch(
        `${PATCH_VERIFY_DOCUMENT_URL}`,
        { userId: _id, type: "wealth", status },
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
    this.setState({ activePage }, () => this.getUsersVerify());
  };
  render() {
    const { users, searchText, searched, loading, docsCount, totalDocsCount, activePage } = this.state;
    return (
      <div>
        <Card
          headStyle={{ fontSize: "1.5rem" }}
          size="small"
          title={searched ? `Results for "${searchText}"` : "Verify Outlier Black Document"}
          extra={[
            <Popover
              content={
                <div>
                  <Input
                    placeholder="Enter user name/email"
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
                {searched ? searchText : "Search User"}
              </Button>
            </Popover>
          ]}
        >
          <Table
            dataSource={users}
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

export default OutlierBlackVerification;
