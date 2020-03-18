import React, { Component, Fragment } from "react";
import { Table, Button, message, Card, Popover, Input, Modal, Popconfirm, Icon } from "antd";
import axios from "axios";
import Pagination from "react-js-pagination";
import { GET_MOMENTS_URL, GET_USER_URL, DELETE_MOMENT_VIBE_URL } from "../utils/endpoints";
import { CSVLink } from "react-csv";
import moment from "moment";
import Axios from "axios";
import dummy from "../images/dummy.png";
import "../css/style.css";
import "../css/modal.css";
const role = localStorage.getItem("role");

class Moments extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: "UserId",
        dataIndex: "owner",
        key: "owner",
        width: "20%",
        render: (text, record) => (
          <span style={{ cursor: "pointer" }} onClick={() => this.showDetailModal(record.owner)}>
            {record.owner}
          </span>
        )
      },
      {
        title: "Username",
        dataIndex: "username",
        width: "20%",
        key: "moments[0].ownerInfo[0].username",
        render: (text, record) => <span>{record.ownerInfo[0].username}</span>
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "moments[0].ownerInfo[0].email",
        width: "20%",
        render: (text, record) => <span>{record.ownerInfo[0].email}</span>
      },

      {
        title: "Contents",
        dataIndex: "description",
        width: "20%",
        key: "moments[0].description"
      },
      {
        title: "Date",
        dataIndex: "updatedAt",
        key: "moments[0].updatedAt",
        width: "20%",
        render: (text, record) => <span>{moment(record.updatedAt).format("YYYY-MM-DD HH:mm ")}</span>
      },
      {
        title: "Action",
        key: "actions",
        width: "20%",
        render: (text, record) => (
          <span>
            {role === "owner" || role === "regular_emp" ? (
              <Fragment>
                <Popconfirm
                  title="Are you sure, you want to delete this moment?"
                  onConfirm={() => this.deleteMoment(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="danger" icon="delete" size="small">
                    Delete
                  </Button>
                </Popconfirm>
              </Fragment>
            ) : (
              ""
            )}
          </span>
        )
      }
    ];

    this.state = {
      moments: [],
      users: [],
      loading: true,
      searched: false,
      searchText: null,
      activePage: 1,
      totalDocsCount: 0,
      docsCount: 10,
      csvData: [["Id", "Contents"]],
      entry: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.getMoments = this.getMoments.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.setCSV = this.setCSV.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
  }

  toggleLoading = () => this.setState({ loading: !this.state.loading });

  componentDidMount() {
    this.getUsers();
    this.getMoments();
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

  getMoments(searchText = null) {
    const { docsCount, activePage, searched } = this.state;
    const token = localStorage.getItem("token");
    this.setState({ loading: true });

    let searchString = "";
    if (searchText) {
      searchString = `?search=${searchText}`;
    }

    console.log(searchString);

    axios
      .get(`${GET_MOMENTS_URL}?limit=${docsCount}&page=${activePage}` + searchString, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("moments", res.data.allMoments);
        this.setState({ loading: false, totalDocsCount: !searched ? res.data.totalDocsCount : res.data.totalDocsCount }, () => {
          if (this.state.totalDocsCount === 0) {
            this.setState({ totalDocsCount: 1 });
          }
          this.setState({ moments: res.data.allMoments });
        });

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
    this.getMoments(this.state.searchText);
  }

  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getMoments();
  }

  setCSV() {
    let csvData = this.state.csvData;
    this.state.moments.map(moment => {
      let entry = [];
      entry.push(String(moment.owner));
      entry.push(String(moment.description));
      csvData.push(entry);
      return 0;
    });
    this.setState({ csvData: csvData });
  }

  showEditForm(entry) {
    this.setState({
      formVisible: !this.state.formVisible,
      mode: "edit",
      entry
    });
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

  deleteMoment(_id) {
    const token = localStorage.getItem("token");
    Axios.delete(`${DELETE_MOMENT_VIBE_URL}?momentId=${_id}`, {
      headers: {
        Authorization: token
      }
    })
      .then(res => window.location.reload())
      .catch(err => console.log(err));
  }
  handlePageChange = activePage => {
    this.setState({ activePage }, () => this.getMoments());
  };
  render() {
    const { moments, loading, searchText, searched, docsCount, totalDocsCount, activePage } = this.state;
    return (
      <div>
        <Card
          headStyle={{ fontSize: "1.5rem" }}
          size="small"
          title={searched ? `Results for "${searchText}"` : "Moments"}
          extra={[
            <Popover
              content={
                <div>
                  <Input
                    placeholder="Enter moment username"
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
                {searched ? searchText : "Search Moments"}
              </Button>
            </Popover>,
            <CSVLink data={this.state.csvData} filename={`moments-${moment(new Date()).toISOString()}.csv`}>
              <Button icon="download" style={{ margin: 5 }}>
                Download CSV
              </Button>
            </CSVLink>
          ]}
        >
          <Table
            dataSource={moments}
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

export default Moments;
