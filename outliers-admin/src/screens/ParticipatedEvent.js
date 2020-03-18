import React, { Component, Fragment } from "react";
import { Table, Button, message, Card, Popover, Input, Popconfirm } from "antd";
import axios from "axios";
import { GET_PARTICIPATED_USER_URL } from "../utils/endpoints";
import moment from "moment";
import "../css/style.css";
const token = localStorage.getItem("token");

class ParticipatedEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      participatedEvents: [],
      loading: false,
      searched: false,
      searchText: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.getParticipatedEvents = this.getParticipatedEvents.bind(this);

    this.columns = [
      {
        title: "Username",
        dataIndex: "username",
        key: "participatedEvents[0].userId",
        width: "5%",
        render: (text, record) => <span>{record.userId ? record.userId.username : ""}</span>
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "participatedEvents[0].eventId.Title",
        width: "5%",
        render: (text, record) => <span>{record.eventId.Title ? record.eventId.Title : ""}</span>
      },
      {
        title: "Event Type",
        dataIndex: "eventType",
        key: "participatedEvents[0].eventId.eventType",
        width: "7%",
        render: (text, record) => <span>{record.eventId.eventType ? record.eventId.eventType : ""}</span>
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "participatedEvents[0].status",
        width: "8%",
        render: (text, record) => <span>{record.status ? record.status : ""}</span>
      },

      {
        title: "Date & Time",
        dataIndex: "createdAt",
        key: "participatedEvents[0].createdAt",
        width: "9%",
        render: (text, record) => <span>{moment(record.createdAt).format("YYYY-MM-DD")}</span>
      },
      {
        title: "Actions",
        key: "actions",
        width: "15%",
        render: (text, record) => (
          <span>
            <Fragment>
              {record.status === "pending" && (
                <Popconfirm
                  title="Are you sure, you want to approve this event?"
                  onConfirm={() => this.approveEvent(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" icon="check" size="small">
                    Approve
                  </Button>
                </Popconfirm>
              )}
            </Fragment>
          </span>
        )
      }
    ];
  }

  componentDidMount() {
    this.getParticipatedEvents();
  }

  getParticipatedEvents(searchText = null) {
    this.setState({ loading: true });

    let searchString = "";
    if (searchText) {
      searchString = `?keyword=${searchText}`;
    }

    axios
      .get(GET_PARTICIPATED_USER_URL + searchString, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("participatedEvents", res.data.Body);
        this.setState({ participatedEvents: res.data.Body, loading: false });
      })
      .catch(err => {
        message.error(err.message);
      });
  }

  approveEvent(_id) {
    axios
      .patch(
        `${GET_PARTICIPATED_USER_URL}`,
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
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  submitSearch() {
    this.setState({ searched: true });
    this.getParticipatedEvents(this.state.searchText);
  }

  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getParticipatedEvents();
  }

  render() {
    const { participatedEvents, loading, searchText, searched } = this.state;
    return (
      <div>
        <Card
          headStyle={{ fontSize: "1.5rem" }}
          size="small"
          title={searched ? `Results for "${searchText}"` : "User Participated Events"}
          extra={[
            <Popover
              content={
                <div>
                  <Input
                    placeholder="Enter title"
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
                {searched ? searchText : "Search Title"}
              </Button>
            </Popover>
          ]}
        >
          <Table
            dataSource={participatedEvents}
            columns={this.columns}
            rowKey={record => record._id}
            size="small"
            pagination={{
              showLessItems: true,
              pageSize: 10
            }}
            loading={loading}
            scroll={{ x: 992 }}
          />
        </Card>
      </div>
    );
  }
}

export default ParticipatedEvents;
