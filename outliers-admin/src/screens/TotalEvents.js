import React, { Component, Fragment } from "react";
import { Table, Button, message, Card, Popover, Input, Popconfirm, Divider } from "antd";
import axios from "axios";
import { GET_EVENTS_URL, PATCH_APPROVE_USERIMAGE_URL } from "../utils/endpoints";
import EventDiscount from "../components/EventDiscount";
import dummy from "../images/dummy.png";
import moment from "moment";
import "../css/style.css";
const token = localStorage.getItem("token");

class TotalEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
      loading: false,
      formVisible: false,
      searched: false,
      searchText: null
    };
    this.hideForm = this.hideForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.getevents = this.getevents.bind(this);
    this.showEditForm = this.showEditForm.bind(this);

    this.columns = [
      {
        title: "Title",
        dataIndex: "title",
        key: "events[0].Title",
        width: "5%",
        render: (text, record) => <span>{record.Title ? record.Title : ""}</span>
      },
      {
        title: "Previous Price",
        dataIndex: "Previous_Price",
        key: "events[0].Previous_Price",
        width: "7%",
        render: (text, record) => <span>{record.Previous_Price}</span>
      },
      {
        title: "Price Now",
        dataIndex: "PriceNow",
        key: "events[0].PriceNow",
        width: "8%",
        render: (text, record) => <span>{record.PriceNow}</span>
      },
      {
        title: "Location",
        dataIndex: "Location",
        key: "events[0].Location",
        width: "5%",
        render: (text, record) => <span>{record.Location ? record.Location : ""}</span>
      },
      {
        title: "Date & Time",
        dataIndex: "dateTime",
        key: "events[0].dateTime",
        width: "9%",
        render: (text, record) => <span>{moment(record.dateTime).format("YYYY-MM-DD")}</span>
      },
      {
        title: "Capacity",
        dataIndex: "Capacity",
        key: "events[0].Capacity",
        width: "5%",
        render: (text, record) => <span>{record.Capacity ? record.Capacity : ""}</span>
      },
      {
        title: "Details",
        dataIndex: "details",
        key: "events[0].Details",
        width: "9%",
        render: (text, record) => <span>{record.Details ? record.Details : ""}</span>
      },
      {
        title: "Event Type",
        dataIndex: "eventType",
        key: "events[0].eventType",
        width: "9%",
        render: (text, record) => <span>{record.eventType ? record.eventType : ""}</span>
      },
      {
        title: "HashTags",
        dataIndex: "hashTags",
        key: "events[0].hashTags",
        width: "9%",
        render: (text, record) => <span>{record.hashTags ? record.hashTags : ""}</span>
      },
      {
        title: "Event Image",
        dataIndex: "eventImage",
        key: "events[0].photos[0]",
        width: "10%",
        render: (text, record) => (
          <img
            style={{ width: "200px", height: "100px", objectFit: "cover" }}
            src={record.photos.length ? record.photos[0].url : dummy}
            alt="Event_Image"
          />
        )
      },
      {
        title: "Event Section",
        dataIndex: "eventSection",
        key: "events[0].eventSection",
        width: "9%",
        render: (text, record) => <span>{record.eventSection ? record.eventSection : ""}</span>
      },
      {
        title: "Actions",
        key: "actions",
        width: "15%",
        render: (text, record) => (
          <span>
            <Button type="primary" icon="edit" size="small" onClick={() => this.showEditForm(record)}>
              Discount
            </Button>
            <Fragment>
              <Divider type="vertical" />
              {/* {record.status === "pending" && ( */}
              <Popconfirm
                title="Are you sure approve to delete image?"
                onConfirm={() => this.approveEvent(record._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" icon="check" size="small">
                  Approve
                </Button>
              </Popconfirm>
              {/* )} */}
            </Fragment>
          </span>
        )
      }
    ];
  }

  componentDidMount() {
    this.getevents();
  }

  getevents(searchText = null) {
    this.setState({ loading: true });

    let searchString = "";
    if (searchText) {
      searchString = `?keyword=${searchText}`;
    }

    axios
      .get(GET_EVENTS_URL + searchString, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        this.setState({ events: res.data.Body, loading: false });
      })
      .catch(err => {
        message.error(err.message);
      });
  }

  approveEvent(_id) {
    axios
      .patch(
        `${PATCH_APPROVE_USERIMAGE_URL}`,
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

  showEditForm = entry => {
    this.setState({
      formVisible: true,
      mode: "edit",
      entry
    });
  };

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
    this.getevents(this.state.searchText);
  }

  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getevents();
  }

  render() {
    const { events, loading, formVisible, searchText, searched, mode, entry } = this.state;
    return (
      <div>
        <Card
          headStyle={{ fontSize: "1.5rem" }}
          size="small"
          title={searched ? `Results for "${searchText}"` : "Total Events"}
          extra={[
            <Popover
              content={
                <div>
                  <Input
                    placeholder="Enter title/location"
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
            dataSource={events}
            columns={this.columns}
            rowKey={record => record._id}
            size="small"
            pagination={{
              showLessItems: true,
              pageSize: 10
            }}
            loading={loading}
            scroll={{ x: 1540 }}
          />
        </Card>
        <EventDiscount visible={formVisible} showForm={this.showForm} hideForm={this.hideForm} mode={mode} entry={entry} />
      </div>
    );
  }
}

export default TotalEvents;
