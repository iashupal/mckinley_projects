import React, { Component, Fragment } from "react";
import { Table, Divider, Button, message, Card, Popover, Input, Popconfirm } from "antd";
import axios from "axios";
import { GET_EVENT_SPONSORED_URL, DELETE_EVENT_SPONSORED_URL } from "../utils/endpoints";
import EventForm from "../components/EventForm";
import { CSVLink } from "react-csv";
import moment from "moment";
import dummy from "../images/dummy.png";
import "../css/style.css";
const token = localStorage.getItem("token");
// const role = localStorage.getItem("role");
class SponsoredEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sponsoredEvents: [],
      loading: false,
      formVisible: false,
      searched: false,
      searchText: null,
      csvData: [
        [
          "id",
          "Title",
          "Previous_Price",
          "PriceNow",
          "Location",
          "Capacity",
          "Details",
          "eventType",
          "hashTags",
          "eventSection"
        ]
      ]
    };
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.getSponsoredEvents = this.getSponsoredEvents.bind(this);
    this.setCSV = this.setCSV.bind(this);
    this.showEditForm = this.showEditForm.bind(this);

    this.columns = [
      {
        title: "Title",
        dataIndex: "title",
        key: "sponsoredEvents[0].Title",
        width: "5%",
        render: (text, record) => <span>{record.Title ? record.Title : ""}</span>
      },
      {
        title: "Previous Price",
        dataIndex: "Previous_Price",
        key: "sponsoredEvents[0].Previous_Price",
        width: "7%",
        render: (text, record) => <span>{record.Previous_Price}</span>
      },
      {
        title: "Price Now",
        dataIndex: "PriceNow",
        key: "sponsoredEvents[0].PriceNow",
        width: "8%",
        render: (text, record) => <span>{record.PriceNow}</span>
      },
      {
        title: "Location",
        dataIndex: "Location",
        key: "sponsoredEvents[0].Location",
        width: "5%",
        render: (text, record) => <span>{record.Location ? record.Location : ""}</span>
      },
      {
        title: "Date & Time",
        dataIndex: "dateTime",
        key: "sponsoredEvents[0].dateTime",
        width: "9%",
        render: (text, record) => <span>{moment(record.dateTime).format("YYYY-MM-DD")}</span>
      },
      {
        title: "Capacity",
        dataIndex: "Capacity",
        key: "sponsoredEvents[0].Capacity",
        width: "5%",
        render: (text, record) => <span>{record.Capacity ? record.Capacity : ""}</span>
      },
      {
        title: "Details",
        dataIndex: "details",
        key: "sponsoredEvents[0].Details",
        width: "9%",
        render: (text, record) => <span>{record.Details ? record.Details : ""}</span>
      },
      {
        title: "Event Type",
        dataIndex: "eventType",
        key: "sponsoredEvents[0].eventType",
        width: "9%",
        render: (text, record) => <span>{record.eventType ? record.eventType : ""}</span>
      },
      {
        title: "HashTags",
        dataIndex: "hashTags",
        key: "sponsoredEvents[0].hashTags",
        width: "9%",
        render: (text, record) => <span>{record.hashTags ? record.hashTags : ""}</span>
      },
      {
        title: "Event Image",
        dataIndex: "eventImage",
        key: "sponsoredEvents[0].photos[0]",
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
        key: "sponsoredEvents[0].eventSection",
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
              Edit
            </Button>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure delete this sponsored event?"
              onConfirm={() => this.deleteEvent(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="danger" icon="delete" size="small">
                Delete
              </Button>
            </Popconfirm>
          </span>
        )
      }
    ];
  }

  componentDidMount() {
    this.getSponsoredEvents();
  }

  getSponsoredEvents(searchText = null) {
    const token = localStorage.getItem("token");
    this.setState({ loading: true });

    let searchString = "";
    if (searchText) {
      searchString = `?keyword=${searchText}`;
    }

    axios
      .get(GET_EVENT_SPONSORED_URL + searchString, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        this.setState({ sponsoredEvents: res.data.Body, loading: false });
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

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitSearch() {
    this.setState({ searched: true });
    this.getSponsoredEvents(this.state.searchText);
  }

  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getSponsoredEvents();
  }

  setCSV() {
    //   csvData: [["id", "Title", "Previous_Price", "PriceNow", "Location", "Capacity", "Details", "eventType","hashTags", "eventSection"]];
    let csvData = this.state.csvData;
    this.state.sponsoredEvents.map(sponsoredEvent => {
      let entry = [];
      entry.push(String(sponsoredEvent._id));
      entry.push(String(sponsoredEvent.Title));
      entry.push(String(sponsoredEvent.Previous_Price));
      entry.push(String(sponsoredEvent.PriceNow));
      entry.push(String(sponsoredEvent.Location));
      entry.push(String(sponsoredEvent.Capacity));
      entry.push(String(sponsoredEvent.Details));
      entry.push(String(sponsoredEvent.eventType));
      entry.push(String(sponsoredEvent.hashTags));
      entry.push(String(sponsoredEvent.eventSection));
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

  deleteEvent(_id) {
    axios
      .delete(`${DELETE_EVENT_SPONSORED_URL}?id=${_id}`, {
        headers: {
          Authorization: token
        }
      })
      .then(res => window.location.reload())
      .catch(err => console.log(err));
  }

  render() {
    const { sponsoredEvents, loading, formVisible, searchText, searched, mode, entry } = this.state;
    return (
      <div>
        <Card
          headStyle={{ fontSize: "1.5rem" }}
          size="small"
          title={searched ? `Results for "${searchText}"` : "Sponsored Events"}
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
            </Popover>,
            <CSVLink data={this.state.csvData} filename={`sponsoredEvents-${moment(new Date()).toISOString()}.csv`}>
              <Button icon="download" style={{ margin: 5 }}>
                Download CSV
              </Button>
            </CSVLink>,
            <Fragment>
              {/* {role === "owner" ? ( */}
              <Button type="primary" icon="plus" style={{ margin: 5 }} onClick={this.showForm}>
                New Event
              </Button>
              {/* ) : (
                ""
              )} */}
            </Fragment>
          ]}
        >
          <Table
            dataSource={sponsoredEvents}
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
        <EventForm visible={formVisible} showForm={this.showForm} hideForm={this.hideForm} mode={mode} entry={entry} />
      </div>
    );
  }
}

export default SponsoredEvents;
