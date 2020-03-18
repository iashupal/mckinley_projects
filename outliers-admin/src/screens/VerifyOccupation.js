import React, { Component, Fragment } from "react";
import { Table, Divider, Button, message, Card, Popconfirm, Modal, Popover, Input, Icon } from "antd";
import axios from "axios";
import { GET_USER_URL, PATCH_VERIFY_DOCUMENT_URL } from "../utils/endpoints";
import "../css/style.css";
import Pagination from "react-js-pagination";
import dummy from "../images/dummy.png";
import "../css/modal.css";
import moment from "moment";
const token = localStorage.getItem("token");

class VerifyOccupation extends Component {
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
    this.getUserVerify = this.getUserVerify.bind(this);
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
        width: "15%"
      },
      {
        title: "Occupation",
        dataIndex: "occupation",
        key: "occupation",
        width: "15%"
      },
      {
        title: "Status",
        dataIndex: "occupationVerified",
        key: "occupationVerified",
        width: "15%"
      },
      {
        title: "Document",
        dataIndex: "occupationDocumentOrEmail",
        width: "15%",
        render: (text, record) => (
          <div>
            {record.occupationVerifyMode.toLowerCase() === "document" ? (
              <img
                style={{ width: "120px", height: "120px", cursor: "pointer", objectFit: "cover" }}
                src={record.occupationDocumentOrEmail.length ? record.occupationDocumentOrEmail : dummy}
                alt="Document_Image"
                onClick={() => this.showOccupationModal(record)}
              />
            ) : (
              `verified ${record.occupationVerifyMode}`
            )}
          </div>
        )
      },
      {
        title: "Actions",
        key: "actions",
        width: "30%",
        render: (text, record) => (
          <span>
            {record.occupationVerified !== "accepted" && record.occupationVerifyMode !== "email" && (
              <Fragment>
                <Popconfirm
                  title="Are you sure, you want to approve this occupation document?"
                  onConfirm={() => this.VerifyOccupationDocument(record._id, "accepted")}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button size="small">Approve</Button>
                </Popconfirm>
                <Divider type="vertical" />
              </Fragment>
            )}
            {record.occupationVerified !== "rejected" && record.occupationVerifyMode !== "email" && (
              <Fragment>
                <Popconfirm
                  title="Are you sure, you want to reject this occupation document?"
                  onConfirm={() => this.VerifyOccupationDocument(record._id, "rejected")}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button size="small">Reject</Button>
                </Popconfirm>
              </Fragment>
            )}
          </span>
        )
      }
    ];
  }

  componentDidMount() {
    this.getUserVerify();
  }

  getUserVerify(searchText = null) {
    const { docsCount, activePage, searched } = this.state;
    const token = localStorage.getItem("token");
    this.setState({ loading: true });

    axios
      .get(`${GET_USER_URL}?limit=${docsCount}&page=${activePage}&search=${searchText || ""}&type=normal`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("users list", res.data.allUsers);
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
    this.getUserVerify(this.state.searchText);
  }
  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getUserVerify();
  }
  showOccupationModal = record => {
    Modal.success({
      title: "Occupation Document",
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
            src={record.occupationDocumentOrEmail.length ? record.occupationDocumentOrEmail : dummy}
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

  VerifyOccupationDocument(_id, status) {
    axios
      .patch(
        `${PATCH_VERIFY_DOCUMENT_URL}`,
        { userId: _id, type: "occupation", status },
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
    this.setState({ activePage }, () => this.getUserVerify());
  };

  render() {
    const { users, searchText, searched, loading, docsCount, totalDocsCount, activePage } = this.state;
    return (
      <div>
        <Card
          headStyle={{ fontSize: "1.5rem" }}
          size="small"
          title={searched ? `Results for "${searchText}"` : "Verify Occupation Document"}
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
            scroll={{ x: 1540 }}
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

export default VerifyOccupation;
