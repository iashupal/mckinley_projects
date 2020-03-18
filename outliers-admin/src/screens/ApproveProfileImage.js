import React, { Component, Fragment } from "react";
import { Table, Button, message, Card, Popover, Input, Modal, Popconfirm, Divider, Icon } from "antd";
import axios from "axios";
import moment from "moment";
import { GET_PROFILE_IMAGE_UPDATE_REQUEST_URL, GET_USER_URL, PATCH_APPROVE_USERIMAGE_URL } from "../utils/endpoints";
import Pagination from "react-js-pagination";
import "../css/style.css";
import "../css/modal.css";
import dummy from "../images/dummy.png";

class ApproveProfileImage extends Component {
  constructor(props) {
    super(props);
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
        key: "username",
        width: "15%",
        render: (text, record) => <span>{record.userId ? record.userId.username : ""}</span>
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "15%",
        render: (text, record) => <span>{record.status ? record.status : ""}</span>
      },
      {
        title: "Image",
        dataIndex: "url",
        key: "url",
        width: "15%",
        render: (text, record) => (
          <img
            style={{ width: "120px", height: "120px", cursor: "pointer", objectFit: "cover" }}
            src={record.url ? record.url : dummy}
            alt="Profile_Image"
            onClick={() => this.showModal(record)}
          />
        )
      },
      {
        title: "Date",
        dataIndex: "createdAt",
        key: "createdAt",
        width: "15%",
        render: (text, record) => <span>{moment(record.createdAt).format("YYYY-MM-D HH:mm")}</span>
      },

      {
        title: "Actions",
        key: "actions",
        width: "20%",
        render: (text, record) => (
          <span>
            {record.status === "pending" && (
              <Popconfirm
                title="Are you sure to approve image?"
                onConfirm={() => this.approveImageDelete(record._id, "accepted")}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" icon="check" size="small">
                  Approve
                </Button>
              </Popconfirm>
            )}
            {record.status === "pending" && (
              <Fragment>
                <Divider type="vertical" />
                <Popconfirm
                  title="Are you sure to reject image?"
                  onConfirm={() => this.approveImageDelete(record._id, "rejected")}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="danger" icon="close" size="small">
                    Reject
                  </Button>
                </Popconfirm>
              </Fragment>
            )}
          </span>
        )
      }
    ];
    this.state = {
      profileUpdateReq: [],
      users: [],
      loading: false,
      searched: false,
      searchText: null,
      activePage: 1,
      totalDocsCount: 0,
      docsCount: 10
    };
    this.getProfileUpdateReq = this.getProfileUpdateReq.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentDidMount() {
    this.getProfileUpdateReq();
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
  getProfileUpdateReq(searchText = null) {
    const { docsCount, activePage, searched } = this.state;
    const token = localStorage.getItem("token");
    this.setState({ loading: true });

    let searchString = "";
    if (searchText) {
      searchString = `?search=${searchText}`;
    }

    console.log(searchString);

    axios
      .get(`${GET_PROFILE_IMAGE_UPDATE_REQUEST_URL}?limit=${docsCount}&page=${activePage}` + searchString, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("profileUpdateReq", res.data.Body);
        this.setState({ loading: false, totalDocsCount: !searched ? res.data.totalDocsCount : res.data.totalDocsCount }, () => {
          if (this.state.totalDocsCount === 0) {
            this.setState({ totalDocsCount: 1 });
          }
          this.setState({ profileUpdateReq: res.data.Body });
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
    this.getProfileUpdateReq(this.state.searchText);
  }
  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getProfileUpdateReq();
  }

  showModal = record => {
    Modal.success({
      title: "Approve Image",
      content: (
        <div
          style={{
            width: "700px",
            margin: "20px auto 0",
            textAlign: "center",
            height: "500px"
          }}
        >
          <img
            style={{ width: "100%", objectFit: "cover", height: "100%" }}
            src={record.url ? record.url : dummy}
            alt="Document_Image"
          />
        </div>
      ),
      okText: "OK"
    });
  };

  approveImageDelete(_id, status) {
    const token = localStorage.getItem("token");
    axios
      .patch(
        `${PATCH_APPROVE_USERIMAGE_URL}`,
        { id: _id, status },
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

  showDetailModal = _id => {
    console.log("id", _id);
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
    this.setState({ activePage }, () => this.getProfileUpdateReq());
  };

  render() {
    const { profileUpdateReq, loading, searchText, searched, docsCount, totalDocsCount, activePage } = this.state;
    return (
      <div>
        <Card
          headStyle={{ fontSize: "1.5rem" }}
          size="small"
          title={searched ? `Results for "${searchText}"` : "Approve Profile Image Edits"}
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
            dataSource={profileUpdateReq}
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

export default ApproveProfileImage;
