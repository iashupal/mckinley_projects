import React, { Component } from "react";
import { Table, Button, message, Card, Popover, Modal, Input, Popconfirm } from "antd";
import axios from "axios";
import moment from "moment";
import { GET_DELETED_POST_URL } from "../utils/endpoints";
import "../css/style.css";
import "../css/modal.css";
import dummy from "../images/dummy.png";

class ShowDeletePost extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "20%",
        render: (text, record) => <span>{record.user[0] ? record.user[0].email : ""}</span>
      },
      {
        title: "Image Delete",
        dataIndex: "Image",
        key: "url",
        width: "20%",
        render: (text, record) => (
          <span style={{ width: "300px" }}>
            {record.type ? (
              record.type === "moment" ? (
                <img
                  style={{ width: "120px", height: "120px", cursor: "pointer", objectFit: "cover" }}
                  src={record.user[0].photos[record.imageIndex].url ? record.user[0].photos[record.imageIndex].url : dummy}
                  alt="Delete Moment"
                  onClick={() => this.showMomentModal(record)}
                />
              ) : record.type === "vibe" ? (
                <img
                  src={record.photos[0].url ? record.photos[0].url : dummy}
                  style={{ width: "120px", height: "120px", cursor: "pointer", objectFit: "cover" }}
                  alt="Delete Vibe"
                  onClick={() => this.showVibeModal(record)}
                />
              ) : record.type === "comment" ? (
                <span>{record.commentBody ? record.commentBody : "No comment"}</span>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </span>
        )
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        width: "20%",
        render: (text, record) => <span>{record.type ? record.type : ""}</span>
      },
      {
        title: "Date",
        dataIndex: "createdAt",
        key: "createdAt",
        width: "20%",
        render: (text, record) => <span>{moment(record.createdAt).format("YYYY-MM-D HH:mm")}</span>
      },
      {
        title: "Actions",
        key: "actions",
        width: "20%",
        render: (text, record) => (
          <span>
            <Popconfirm
              title="Are you sure, you want to delete post?"
              onConfirm={() => this.deleteData(record.type, record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" icon="delete" size="small">
                Delete Post
              </Button>
            </Popconfirm>
          </span>
        )
      }
    ];
    this.state = {
      deletedPost: [],
      loading: false,
      searched: false,
      searchText: null
    };
    this.getDeletedPost = this.getDeletedPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentDidMount() {
    this.getDeletedPost();
  }

  getDeletedPost(searchText = null) {
    const token = localStorage.getItem("token");
    this.setState({ loading: true });

    let searchString = "";
    if (searchText) {
      searchString = `?type=${searchText}`;
    }

    console.log(searchString);

    axios
      .get(GET_DELETED_POST_URL + searchString, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("deletepost", res);
        this.setState({ deletedPost: res.data.Body, loading: false });
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
    this.getDeletedPost(this.state.searchText);
  }
  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getDeletedPost();
  }

  showMomentModal = record => {
    Modal.success({
      title: "Delete Moment Post",
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
            src={record.user[0].photos[record.imageIndex].url ? record.user[0].photos[record.imageIndex].url : dummy}
            alt="Document_Image"
          />
        </div>
      ),
      okText: "OK"
    });
  };

  showVibeModal = record => {
    Modal.success({
      title: "Delete Vibe Post",
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
            src={record.photos[0].url ? record.photos[0].url : dummy}
            alt="Document_Image"
          />
        </div>
      ),
      okText: "OK"
    });
  };

  deleteData(type, _id) {
    const token = localStorage.getItem("token");
    axios
      .patch(
        `${GET_DELETED_POST_URL}`,
        { id: _id, type: type },
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

  render() {
    const { deletedPost, loading, searchText, searched } = this.state;
    return (
      <div>
        <Card
          headStyle={{ fontSize: "1.5rem" }}
          size="small"
          title={searched ? `Results for "${searchText}"` : "List of Deleted Post"}
          extra={[
            <Popover
              content={
                <div>
                  <Input
                    placeholder="Enter Type"
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
                {searched ? searchText : "Search Type"}
              </Button>
            </Popover>
          ]}
        >
          <Table
            dataSource={deletedPost}
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

export default ShowDeletePost;
