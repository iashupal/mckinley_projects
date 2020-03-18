import React, { Component } from "react";
import { Table, Button, message, Card, Popover, Input } from "antd";
import axios from "axios";
import moment from "moment";
import { CSVLink } from "react-csv";
import { GET_EVENT_NON_SPONSORED_URL } from "../utils/endpoints";
import dummy from "../images/dummy.png";
import "../css/style.css";

class NonSponsoredEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nonSponsoredEvents: [],
      loading: false,
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
    this.getNonSponsoredEvents = this.getNonSponsoredEvents.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.setCSV = this.setCSV.bind(this);

    this.columns = [
      {
        title: "Title",
        dataIndex: "title",
        key: "nonSponsoredEvents[0].Title",
        width: "6%",
        render: (text, record) => <span>{record.Title ? record.Title : ""}</span>
      },
      {
        title: "Previous Price",
        dataIndex: "Previous_Price",
        key: "nonSponsoredEvents[0].Previous_Price",
        width: "8%",
        render: (text, record) => <span>{record.Previous_Price}</span>
      },
      {
        title: "Price Now",
        dataIndex: "PriceNow",
        key: "nonSponsoredEvents[0].photos[0]",
        width: "8%",
        render: (text, record) => <span>{record.PriceNow}</span>
      },
      {
        title: "Location",
        dataIndex: "Location",
        key: "nonSponsoredEvents[0].Location",
        width: "8%",
        render: (text, record) => <span>{record.Location ? record.Location : ""}</span>
      },
      {
        title: "Date & Time",
        dataIndex: "dateTime",
        key: "nonSponsoredEvents[0].dateTime",
        width: "9%",
        render: (text, record) => <span>{moment(record.dateTime).format("YYYY-MM-DD HH:mm ")}</span>
      },
      {
        title: "Capacity",
        dataIndex: "Capacity",
        key: "nonSponsoredEvents[0].Capacity",
        width: "8%",
        render: (text, record) => <span>{record.Capacity ? record.Capacity : ""}</span>
      },
      {
        title: "Details",
        dataIndex: "details",
        key: "nonSponsoredEvents[0].Details",
        width: "9%",
        render: (text, record) => <span>{record.Details ? record.Details : ""}</span>
      },
      {
        title: "Event Type",
        dataIndex: "eventType",
        key: "nonSponsoredEvents[0].eventType",
        width: "10%",
        render: (text, record) => <span>{record.eventType ? record.eventType : ""}</span>
      },
      {
        title: "HashTags",
        dataIndex: "hashTags",
        key: "nonSponsoredEvents[0].hashTags",
        width: "10%",
        render: (text, record) => <span>{record.hashTags ? record.hashTags : ""}</span>
      },
      {
        title: "Event Image",
        dataIndex: "eventImage",
        key: "nonSponsoredEvents[0].photos[0]",
        width: "15%",
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
        key: "nonSponsoredEvents[0].eventSection",
        width: "10%",
        render: (text, record) => <span>{record.eventSection ? record.eventSection : ""}</span>
      }
    ];
  }

  componentDidMount() {
    this.getNonSponsoredEvents();
  }

  getNonSponsoredEvents(searchText = null) {
    const token = localStorage.getItem("token");
    this.setState({ loading: true });

    let searchString = "";
    if (searchText) {
      searchString = `?keyword=${searchText}`;
    }

    console.log(searchString);

    axios
      .get(GET_EVENT_NON_SPONSORED_URL + searchString, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        this.setState({ nonSponsoredEvents: res.data.Body, loading: false });
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
    this.getNonSponsoredEvents(this.state.searchText);
  }

  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getNonSponsoredEvents();
  }
  setCSV() {
    //   csvData: [["id", "Title", "Previous_Price", "PriceNow", "Location", "Capacity", "Details", "eventType","hashTags", "eventSection"]];
    let csvData = this.state.csvData;
    this.state.nonSponsoredEvents.map(nonSponsoredEvent => {
      let entry = [];
      entry.push(String(nonSponsoredEvent._id));
      entry.push(String(nonSponsoredEvent.Title));
      entry.push(String(nonSponsoredEvent.Previous_Price));
      entry.push(String(nonSponsoredEvent.PriceNow));
      entry.push(String(nonSponsoredEvent.Location));
      entry.push(String(nonSponsoredEvent.Capacity));
      entry.push(String(nonSponsoredEvent.Details));
      entry.push(String(nonSponsoredEvent.eventType));
      entry.push(String(nonSponsoredEvent.hashTags));
      entry.push(String(nonSponsoredEvent.eventSection));
      csvData.push(entry);
      return 0;
    });
    this.setState({ csvData: csvData });
  }

  render() {
    const { nonSponsoredEvents, loading, searchText, searched } = this.state;
    return (
      <div>
        <Card
          headStyle={{ fontSize: "1.5rem" }}
          size="small"
          title={searched ? `Results for "${searchText}"` : "Non Sponsored Events"}
          extra={[
            <Popover
              content={
                <div>
                  <Input
                    placeholder="Enter event title/location"
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
                {searched ? searchText : "Search Event"}
              </Button>
            </Popover>,
            <CSVLink data={this.state.csvData} filename={`nonSponsoredEvents-${moment(new Date()).toISOString()}.csv`}>
              <Button icon="download" style={{ margin: 5 }}>
                Download CSV
              </Button>
            </CSVLink>
          ]}
        >
          <Table
            dataSource={nonSponsoredEvents}
            columns={this.columns}
            rowKey={record => record._id}
            size="small"
            pagination={{
              pageSize: 10
            }}
            loading={loading}
            scroll={{ x: 1540 }}
          />
        </Card>
      </div>
    );
  }
}

export default NonSponsoredEvents;
