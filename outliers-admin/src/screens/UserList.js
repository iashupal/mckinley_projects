import React, { Component, Fragment } from "react";
import { Table, Divider, Button, message, Card, Form, Popover, Input, Modal, Select, Popconfirm, Icon } from "antd";
import axios from "axios";
import {
  GET_USER_URL,
  PUT_SEND_EMAIL_URL,
  PATCH_DEACTIVATE_URL,
  PATCH_ACTIVATE_URL,
  PATCH_REJECT_URL,
  PATCH_CONFIRM_DELETE_URL
} from "../utils/endpoints";
import UserForm from "../components/UserForm";
import { CSVLink } from "react-csv";
import moment from "moment";
import "../css/style.css";
import dummy from "../images/dummy.png";
import "../css/modal.css";
import Pagination from "react-js-pagination";
const { Option } = Select;
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const { TextArea } = Input;
class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      loading: false,
      formVisible: false,
      modalOpen: false,
      searched: false,
      searchText: "",
      filtered: false,
      filters: {},
      emailMessage: {},
      activePage: 1,
      totalDocsCount: 0,
      docsCount: 10,
      csvData: [["id", "email", "user name", "coffeeCoupons", "verificationType", "userStatus"]]
    };
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.submitFilters = this.submitFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
    this.setCSV = this.setCSV.bind(this);

    this.columns = [
      {
        title: "UserId",
        dataIndex: "_id",
        key: "_id",
        width: "10%",
        render: (text, record) => (
          <span style={{ cursor: "pointer" }} onClick={() => this.showModal(record)}>
            {record._id}
          </span>
        )
      },
      // {
      //   title: "Email",
      //   dataIndex: "email",
      //   key: "email",
      //   width: "10%"
      // },
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        width: "8%"
      },
      {
        title: "Payments",
        dataIndex: "coffeeCoupons",
        key: "coffeeCoupons",
        width: "6%"
      },
      {
        title: "Rating",
        dataIndex: "rating",
        key: "rating",
        width: "6%"
      },
      {
        title: "Hosted Events",
        dataIndex: "hostedEvents",
        key: "hostedEvents",
        width: "10%"
      },
      {
        title: "Participated Events",
        dataIndex: "participatedEvents",
        key: "participatedEvents",
        width: "10%"
      },
      {
        title: "User Status",
        dataIndex: "userStatus",
        width: "8%",
        key: "userStatus",
        render: (text, record) => (
          <span>
            {record.deactivateOrSuspend === "normal"
              ? record.userStatus === "rejected"
                ? "rejected"
                : record.isVerified && record.isRegistered
                ? "approved"
                : "pending"
              : record.deactivateOrSuspend === "deactivated"
              ? "deactivated"
              : "suspended"}
          </span>
        )
      },
      {
        title: "Actions",
        key: "actions",
        width: "35",
        render: (text, record) => (
          <span>
            {role === "owner" || role === "regular_emp" ? (
              <Fragment>
                <Button type="primary" icon="edit" size="small" onClick={() => this.showEditForm(record)}>
                  Edit
                </Button>
              </Fragment>
            ) : (
              ""
            )}

            {record.isVerified && record.isRegistered ? (
              ""
            ) : (
              <Fragment>
                <Divider type="vertical" />
                <Popconfirm
                  title="Are you sure, you want to approve this user?"
                  onConfirm={() => this.confirmUser(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button icon="check" size="small">
                    Approve
                  </Button>
                </Popconfirm>
              </Fragment>
            )}
            {record.userStatus === "rejected" ? (
              ""
            ) : (
              <Fragment>
                {role === "owner" || role === "regular_emp" ? (
                  <span>
                    <Divider type="vertical" />
                    <Popconfirm
                      title="Are you sure, you want to reject this user?"
                      onConfirm={() => this.rejectUser(record._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button icon="close" size="small">
                        Reject
                      </Button>
                    </Popconfirm>
                  </span>
                ) : (
                  ""
                )}
              </Fragment>
            )}
            {role === "owner" || role === "regular_emp" ? (
              <Fragment>
                <Divider type="vertical" />
                <Button type="primary" size="small" onClick={() => this.showEmailModal(record)}>
                  Email
                </Button>
              </Fragment>
            ) : (
              ""
            )}
          </span>
        )
      }
    ];
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers(searchText = "", filters = {}) {
    const { docsCount, activePage, searched } = this.state;
    const token = localStorage.getItem("token");
    console.log("role", role);
    this.setState({ loading: true });

    let filterString = "";
    Object.keys(filters).map(key => {
      if (filters[key]) {
        filterString += `&${key}=${filters[key]}`;
      }
      return 0;
    });

    // let searchString = "";
    // if (searchText) {
    //   searchString = `?search=${searchText}`;
    // }

    axios
      .get(
        `${GET_USER_URL}?limit=${docsCount}&page=${activePage}&search=${searchText === null ? "" : searchText}` + filterString,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
        console.log("users", res.data);
        console.log("length", res.data.totalDocsCount);
        this.setState({ loading: false, totalDocsCount: !searched ? res.data.totalDocsCount : res.data.totalDocsCount }, () => {
          if (this.state.totalDocsCount === 0) {
            this.setState({ totalDocsCount: 1 });
          }
          this.setState({ users: res.data.allUsers });
        });
        this.setCSV();
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

  handleTextChange = e => {
    let emailMessage = this.state.emailMessage;
    emailMessage[e.target.name] = e.target.value;
    this.setState({ emailMessage });
  };
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitSearch() {
    this.setState({ searched: true });
    this.getUsers(this.state.searchText);
  }

  submitFilters() {
    this.setState({ filtered: true });
    this.getUsers(null, this.state.filters);
  }

  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getUsers();
  }

  clearFilters() {
    this.setState({ filtered: false, filters: {} });
    this.getUsers();
  }

  updateFilter(type, value) {
    let filters = this.state.filters;
    switch (type) {
      case "userStatus":
        filters.userStatus = value;
        break;
      default:
        console.log("Error");
    }
    this.setState({ filters: filters });
  }

  setCSV() {
    // csvData: [["id", "email", "user name", "verifyType", "profileStatus", "userStatus"]];
    let csvData = this.state.csvData;
    this.state.users.map(user => {
      let entry = [];
      entry.push(String(user._id));
      entry.push(String(user.email));
      entry.push(String(user.username));
      entry.push(String(user.verifyType));
      entry.push(String(user.profileStatus));
      entry.push(String(user.userStatus));
      csvData.push(entry);

      return 0;
    });
    this.setState({ csvData: csvData });
  }

  showEditForm = entry => {
    this.setState({
      formVisible: true,
      mode: "edit",
      entry
    });
  };
  showEmailModal = entry => {
    this.setState({
      modalOpen: true,
      mode: "edit",
      entry
    });
  };

  handleSubmit = _id => {
    const token = localStorage.getItem("token");
    let emailMessage = this.state.emailMessage;

    let payload = {
      userId: _id,
      subject: emailMessage.subject,
      body: emailMessage.body
    };

    axios
      .put(PUT_SEND_EMAIL_URL, payload, {
        headers: { Authorization: token }
      })
      .then(res => {
        this.setState({
          modalOpen: false
        });
        message.success("Email send successfully!");
        window.location.reload();
      })
      .catch(err => {
        message.error(err.response);
      });
  };
  UNSAFE_componentWillReceiveProps(props) {
    if (props.mode === "edit") {
      this.setState({ emailMessage: props.entry });
    }
  }
  handleCancel = e => {
    this.setState({
      modalOpen: false
    });
  };
  showModal = record => {
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
          <div>
            <Fragment>
              {record.accountStatus ? (
                <Popconfirm
                  title="Are you sure, you want to suspend this user?"
                  onConfirm={() => this.deactivateUser(record._id, "suspended")}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" size="default">
                    Suspend
                  </Button>
                  <Divider type="vertical" />
                </Popconfirm>
              ) : (
                ""
              )}
            </Fragment>
            <Fragment>
              {record.accountStatus ? (
                <Popconfirm
                  title="Are you sure, you want to deactivate this user?"
                  onConfirm={() => this.deactivateUser(record._id, "deactivated")}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" style={{ backgroundColor: "green", borderColor: "green" }} size="default">
                    Deactivate
                  </Button>
                </Popconfirm>
              ) : (
                <Popconfirm
                  title="Are you sure, you wanr to activate this user?"
                  onConfirm={() => this.activateUser(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" size="default">
                    Reinstate
                  </Button>
                </Popconfirm>
              )}
            </Fragment>

            {role === "owner" || role === "regular_emp" ? (
              <Fragment>
                <Divider type="vertical" />
                <Popconfirm
                  title="Are you sure, you want to delete this user?"
                  onConfirm={() => this.deleteUser(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="danger" icon="delete" size="default">
                    Delete
                  </Button>
                </Popconfirm>
              </Fragment>
            ) : (
              ""
            )}
          </div>
        </div>
      ),
      okText: "Close"
    });
  };

  activateUser(_id) {
    axios
      .patch(
        `${PATCH_ACTIVATE_URL}`,
        {
          userId: _id
        },
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

  deactivateUser(_id, deactivateOrSuspend) {
    axios
      .patch(
        `${PATCH_DEACTIVATE_URL}`,
        { userId: _id, deactivateOrSuspend },
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
  rejectUser(_id) {
    axios
      .patch(
        `${PATCH_REJECT_URL}?userId=${_id}`,
        { id: _id, isVerified: false, isRegistered: false },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => window.location.reload(true))
      .catch(err => console.log(err));
  }
  confirmUser(_id) {
    axios
      .patch(
        `${PATCH_CONFIRM_DELETE_URL}?userId=${_id}`,
        { id: _id, isVerified: true, isRegistered: true },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => window.location.reload("/userlist"))
      .catch(err => console.log(err));
  }

  deleteUser(_id) {
    axios
      .delete(`${PATCH_CONFIRM_DELETE_URL}?userId=${_id}`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => window.location.reload())
      .catch(err => console.log(err));
  }
  handlePageChange = activePage => {
    this.setState({ activePage }, () => this.getUsers());
  };
  render() {
    const {
      modalOpen,
      users,
      loading,
      searchText,
      formVisible,
      mode,
      entry,
      searched,
      filtered,
      filters,
      docsCount,
      totalDocsCount,
      activePage
    } = this.state;
    return (
      <div>
        <Card
          headStyle={{ fontSize: "1.5rem" }}
          size="small"
          title={searched ? `Results for "${searchText}"` : "User List"}
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
              <Button type="dashed" icon="search" style={{ margin: 5 }} disabled={filtered}>
                {searched ? searchText : "Search User"}
              </Button>
            </Popover>,
            <Popover
              content={
                <div>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Status"
                    onChange={value => this.updateFilter("userStatus", value)}
                    value={this.state.filters.userStatus}
                  >
                    <Option value={"accepted"}>Approved</Option>
                    <Option value={"pending"}>Pending</Option>
                    <Option value={"reject"}>Rejected</Option>
                    <Option value={"suspended"}>Suspended</Option>
                    <Option value={"deactivated"}>Deactivated</Option>
                  </Select>
                  <br />
                  <br />
                  <Button
                    style={{ width: "100%" }}
                    type={filtered ? "danger" : "primary"}
                    icon={filtered ? "delete" : "filter"}
                    onClick={filtered ? this.clearFilters : this.submitFilters}
                    disabled={Object.keys(filters).length === 0}
                  >
                    {filtered ? "Clear filters" : "Filter"}
                  </Button>
                </div>
              }
              placement="bottom"
            >
              <Button icon="filter" style={{ margin: 5 }} disabled={searched}>
                Filter
              </Button>
            </Popover>,
            <CSVLink data={this.state.csvData} filename={`users-${moment(new Date()).toISOString()}.csv`}>
              <Button icon="download" style={{ margin: 5 }}>
                Download CSV
              </Button>
            </CSVLink>
          ]}
        >
          <Table
            dataSource={users}
            columns={this.columns}
            rowKey={record => record._id}
            size="small"
            // onRow={(record, rowIndex) => {
            //   return {
            //     onClick: event => {
            //       this.showModal(record);
            //     }
            //   };
            // }}
            // pagination={{
            //   showLessItems: true,
            //   pageSize: 10
            // }}
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
        <Modal
          title="Send Message"
          visible={modalOpen}
          onOk={() => this.handleSubmit(entry._id)}
          onCancel={this.handleCancel}
          entry={entry}
          mode={mode}
        >
          <Form layout="vertical" hideRequiredMark>
            <Form.Item label="Subject">
              <Input
                placeholder="Enter subject"
                onChange={this.handleTextChange}
                name="subject"
                value={this.state.emailMessage && this.state.emailMessage.subject}
                required
              />
            </Form.Item>
            <Form.Item label="Message">
              <TextArea
                rows={4}
                placeholder="Enter message"
                value={this.state.emailMessage && this.state.emailMessage.body}
                onChange={this.handleTextChange}
                required
                name="body"
              />
            </Form.Item>
          </Form>
        </Modal>
        <UserForm visible={formVisible} showForm={this.showForm} hideForm={this.hideForm} mode={mode} entry={entry} />
      </div>
    );
  }
}

export default UserList;
