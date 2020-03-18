import React, { Component } from "react";
import { Table, Button, message, Card, Modal, Icon } from "antd";
import axios from "axios";
import { GET_DONATION_HASHTAG_URL, GET_USER_URL } from "../utils/endpoints";
import { CSVLink } from "react-csv";
import moment from "moment";
import Pagination from "react-js-pagination";
import "../css/style.css";
import "../css/modal.css";
import dummy from "../images/dummy.png";

class DonationHashTag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hashtags: [],
      users: [],
      loading: false,
      activePage: 1,
      totalDocsCount: 0,
      docsCount: 10,
      csvData: [["id", "email", "hashtags"]]
    };
    this.handleChange = this.handleChange.bind(this);
    this.getHashtags = this.getHashtags.bind(this);
    this.setCSV = this.setCSV.bind(this);
    this.getUsers = this.getUsers.bind(this);

    this.columns = [
      {
        title: "UserId",
        dataIndex: "userId",
        key: "userId",
        width: "15%",
        render: (text, record) => (
          <span style={{ cursor: "pointer" }} onClick={() => this.showDetailModal(record.userId)}>
            {record.userId}
          </span>
        )
      },
      {
        title: "Username",
        dataIndex: "username",
        width: "20%",
        key: "username",
        render: (text, record) => <span>{record.username}</span>
      },
      {
        title: "Email",
        dataIndex: "userEmail",
        key: "userEmail",
        width: "15%"
      },
      {
        title: "Hashtags",
        dataIndex: "hashtags",
        key: "hashtags[0].hashtags",
        width: "33%",
        render: (text, record) => <span>{record.hashtags.join(" ")}</span>
      },
      {
        title: "Date",
        dataIndex: "createdAt",
        key: "hashtags[0].createdAt",
        width: "15%",
        render: (text, record) => <span>{moment(record.createdAt).format("YYYY-MM-DD HH:mm")}</span>
      }
    ];
  }

  componentDidMount() {
    this.getHashtags();
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

  getHashtags() {
    const { docsCount, activePage, searched } = this.state;
    const token = localStorage.getItem("token");
    this.setState({ loading: true });

    axios
      .get(`${GET_DONATION_HASHTAG_URL}?limit=${docsCount}&page=${activePage}`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("hashtag", res.data.Body);
        this.setState({ loading: false, totalDocsCount: !searched ? res.data.totalDocsCount : res.data.totalDocsCount }, () => {
          if (this.state.totalDocsCount === 0) {
            this.setState({ totalDocsCount: 1 });
          }
          this.setState({ hashtags: res.data.Body });
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

  setCSV() {
    // csvData: [["id", "email", "hashtags"]];
    let csvData = this.state.csvData;
    this.state.hashtags.map(hashtag => {
      let entry = [];
      entry.push(String(hashtag.userId));
      entry.push(String(hashtag.userEmail));
      entry.push(String(hashtag.hashtags));
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
    this.setState({ activePage }, () => this.getHashtags());
  };

  render() {
    const { hashtags, loading, searchText, searched, docsCount, totalDocsCount, activePage } = this.state;
    return (
      <div>
        <Card
          headStyle={{ fontSize: "1.5rem" }}
          size="small"
          title={searched ? `Results for "${searchText}"` : "Donation Hashtag"}
          extra={[
            <CSVLink data={this.state.csvData} filename={`hashtag-${moment(new Date()).toISOString()}.csv`}>
              <Button icon="download" style={{ margin: 5 }}>
                Download CSV
              </Button>
            </CSVLink>
          ]}
        >
          <Table
            dataSource={hashtags}
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

export default DonationHashTag;
