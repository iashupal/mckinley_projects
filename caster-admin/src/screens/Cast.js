import React, { Component } from "react";
import { Card, Table, Input, Button, Popover, Divider, message } from "antd";
import { CSVLink } from "react-csv";
import moment from "moment";
import { GET_CAST_URL, GET_ONGOING_URL, GET_PENDING_URL, GET_CLOSED_URL, DELETE_CAST_URL, GET_EARLY_CLOSED_URL } from "../utils/endpoints";
import Tab from "../components/Tab";
import axios from "axios";
import '../css/common.css';

class Cast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      casts: [],
      ongoing: [],
      pending: [],
      closed: [],
      closedEarly: [],
      loading: false,
      searched: false,
      searchText: null,
      filtered: false,
      formVisible: false,
      filters: {},
      csvData: [],
      entry: {}
    };
    this.changeTab = this.changeTab.bind(this);
    this.setCSV = this.setCSV.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.getCastAll = this.getCastAll.bind(this);
    this.submitFilters = this.submitFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);

    this.columns = [
      {
        title: "",
        dataIndex: "marketingCardImage",
        key: "casts[0].marketingCardImage",
        render: (text, record) => (
          (record.castImage)
            ? <img style={{ width: "45px", height: "45px" }} src={record.castImage} alt="cast_image" />
            : <div style={{ width: '45px', height: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.7rem', border: '1px solid lightgrey', borderRadius: '4px' }}>No Image</div>
        ),
        className: 'text-align-center'
      },
      {
        title: "타이틀",
        dataIndex: "title",
        key: "casts[0].title",
        render: (text, record) => <span>{record.title}</span>,
        className: 'text-align-center'
      },
      {
        title: "Tag",
        dataIndex: "category",
        key: "casts[0].category",
        render: (text, record) => <span>{record.category}</span>,
        defaultSortOrder: "descend",
        sorter: (a, b) => {
          if (a.category > b.category) {
            return -1;
          }
          else {
            return 1;
          }
        },
        sortDirections: ["descend", "ascend"],
        className: 'text-align-center'
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "casts[0].castType",
        render: (text, record) => <span>{record.castType}</span>,
        className: 'text-align-center'
      },

      {
        title: "답변 Type",
        dataIndex: "answer type",
        key: "casts[0].answerType",
        render: (text, record) => <span>{record.answerType}</span>,
        width: 120,
        className: 'text-align-center'
      },
      {
        title: "START TIME",
        dataIndex: "starttime",
        key: "casts[0].startTime",
        render: (text, record) => <span>{moment(record.startTime).format("YYYY-MM-D ")}</span>,
        defaultSortOrder: "descend",
        sorter: (a, b) => Date.parse(moment(a.startTime).format("YYYY-MM-D ")) - Date.parse(moment(b.startTime).format("YYYY-MM-D ")),
        sortDirections: ["descend", "ascend"],
        width: 120,
        className: 'text-align-center'
      },
      {
        title: "CLOSE TIME",
        dataIndex: "close time",
        key: "casts[0].closeTime",
        render: (text, record) => <span>{moment(record.closeTime).format("YYYY-MM-D ")}</span>,
        defaultSortOrder: "descend",
        sorter: (a, b) => Date.parse(moment(a.closeTime).format("YYYY-MM-D ")) - Date.parse(moment(b.closeTime).format("YYYY-MM-D ")),
        sortDirections: ["descend", "ascend"],
        width: 130,
        className: 'text-align-center'
      },

      {
        title: "총상금",
        dataIndex: "totalReward",
        key: "casts[0].totalReward",
        defaultSortOrder: "descend",
        sorter: (a, b) => a.totalReward - b.totalReward,
        sortDirections: ["descend", "ascend"],
        className: 'text-align-center'
      },
      {
        title: "클릭수",
        dataIndex: "click",
        key: "casts[0].noOfclicks",
        render: (text, record) => <span>{record.noOfclicks}</span>,
        defaultSortOrder: "descend",
        sorter: (a, b) => a.noOfclicks - b.noOfclicks,
        sortDirections: ["descend", "ascend"],
        className: 'text-align-center'
      },
      {
        title: "참여완료수",
        dataIndex: "amount",
        key: "amount",
        render: (text, record) => <span>{(record.participatingUsers !== undefined) ? record.participatingUsers.length : ''}</span>,
        defaultSortOrder: "descend",
        sorter: (a, b) => a.participatingUsers.length - b.participatingUsers.length,
        sortDirections: ["descend", "ascend"],
        className: 'text-align-center'
      },
      {
        title: "링크클릭수",
        dataIndex: "externalLinkUrl",
        key: "cast[0].externalLinkUrl",
        render: (text, record) => <span>{record.externalLinkUrl || record.externalLinkText}</span>,
        defaultSortOrder: "descend",
        sorter: (a, b) => {
          return a.externalLinkUrl - b.externalLinkUrl || a.externalLinkText - b.externalLinkText || a.externalLinkUrl - b.externalLinkText || a.externalLinkText - b.externalLinkUrl;
        },
        sortDirections: ["descend", "ascend"],
        width: 150,
        className: 'text-align-center'
      },
      {
        title: "공유수",
        dataIndex: "shares",
        key: "casts[0].noOfShares",
        render: (text, record) => <span>{record.noOfShares}</span>,
        defaultSortOrder: "descend",
        sorter: (a, b) => a.id - b.id,
        sortDirections: ["descend", "ascend"],
        className: 'text-align-center'
      },
      {
        title: "찜수",
        dataIndex: "likes",
        key: "casts[0].noOfLikes",
        render: (text, record) => <span>{record.noOfLikes}</span>,
        defaultSortOrder: "descend",
        sorter: (a, b) => a.id - b.id,
        sortDirections: ["descend", "ascend"],
        className: 'text-align-center'
      }
    ];
  }

  changeTab(tab) {
    this.setState({ tab });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitSearch() {
    this.setState({ searched: true });
    this.getCastAll(this.state.searchText);
  }

  submitFilters() {
    this.setState({ filtered: true });
    this.getCastAll(null, this.state.filters);
  }

  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getCastAll();
  }

  clearFilters() {
    this.setState({ filtered: false, filters: {} });
    this.getCastAll();
  }

  updateFilter(type, value) {
    let filters = this.state.filters;
    switch (type) {
      case "coffeeCoupons":
        filters.coffeeCoupons = value;
        break;
      case "status":
        filters.isVerified = value;
        break;
      default:
        console.log("Error");
    }
    this.setState({ filters: filters });
  }

  componentDidMount() {
    this.getCastAll();
  }

  getCastAll(searchText = null, filters = {}) {
    const token = localStorage.getItem("token");
    this.setState({ loading: true });

    let filterString = "";
    Object.keys(filters).map(key => {
      if (filters[key]) {
        filterString += `?${key}=${filters[key]}`;
      }
    });

    let searchString = "";
    if (searchText) {
      searchString = `?search=${searchText}`;
    }

    axios
      .get(GET_CAST_URL + searchString + filterString, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("Cast list", res.data.Body);
        this.setState({ casts: res.data.Body, loading: false });
        this.setCSV();
      })
      .catch(err => {
        message.error(err.message);
      });

    axios
      .get(GET_ONGOING_URL + searchString + filterString, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("ongoing", res.data.Body);
        this.setState({ ongoing: res.data.Body, loading: false });
        this.setCSV();
      })
      .catch(err => {
        message.error(err.message);
      });

    axios
      .get(GET_PENDING_URL + searchString + filterString, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("pending", res.data.Body);
        this.setState({ pending: res.data.Body, loading: false });
        this.setCSV();
      })
      .catch(err => {
        message.error(err.message);
      });

    axios
      .get(GET_CLOSED_URL + searchString + filterString, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("closed", res.data.Body);
        this.setState({ closed: res.data.Body, loading: false });
        this.setCSV();
      })
      .catch(err => {
        message.error(err.message);
      });
    axios
      .get(GET_EARLY_CLOSED_URL + searchString + filterString, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("closed early--->", res.data.Body);
        this.setState({ closedEarly: res.data.Body, loading: false });
        this.setCSV();
      })
      .catch(err => {
        message.error(err.message);
      });
  }

  setCSV = () => {
    // csvData: [["id", "email", "user name", "verifyType", "profileStatus", "userStatus"]];
    let csvData = this.state.csvData;
    this.state.casts.map(cast => {
      // let entry = [];
      // entry.push(String(user._id));
      // entry.push(String(user.email));
      // entry.push(String(user.username));
      // entry.push(String(user.verifyType));
      // entry.push(String(user.profileStatus));
      // entry.push(String(user.userStatus));
      // csvData.push(entry);
    });
    this.setState({ csvData: csvData });
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

  showEditForm = async entry => {
    await this.setState({
      formVisible: true,
      mode: "edit",
      entry
    });
  };

  filterOnSearch = entry => {
    if (!this.state.searched) {
      this.createCSV(entry);
      return entry;
    } else {
      let filteredEntry = [];
      entry.map(item => {
        if (item.title.toString().toLowerCase().match(this.state.searchText.toLowerCase()) !== null) {
          filteredEntry.push(item);
        }
      })
      this.createCSV(filteredEntry);
      return filteredEntry;
    }
  }

  deleteCast = id => {
    const token = localStorage.getItem("token");
    axios.delete(DELETE_CAST_URL + '?id=' + id, {
      headers: {
        Authorization: token
      }
    })
      .then(res => {
        window.location.reload();
        message.success("Cast deleted successfully!");
      })
      .catch(err => {
        message.error(err.response);
      })
  }

  createCSV = entry => {
    let csv = [['Image', 'Title', 'Category', 'Type', 'Answer Type', 'Start Time', 'Close Time', 'Reward', 'No. of Clicks', 'No. of Participants', 'External Link/Text', 'No. of Shares', 'No.of Likes']];

    entry.map((item, index) => {
      csv.push([]);
      csv[index + 1].push(item.castImage);
      csv[index + 1].push(item.title);
      csv[index + 1].push(item.category);
      csv[index + 1].push(item.castType);
      csv[index + 1].push(item.answerType);
      csv[index + 1].push(moment(item.startTime).format("YYYY-MM-D "));
      csv[index + 1].push(moment(item.closeTime).format("YYYY-MM-D "));
      csv[index + 1].push(item.totalReward);
      csv[index + 1].push(item.noOfclicks);
      csv[index + 1].push((item.participatingUsers !== undefined) ? item.participatingUsers.length : '');
      csv[index + 1].push(item.externalLinkUrl || item.externalLinkText);
      csv[index + 1].push(item.noOfShares);
      csv[index + 1].push(item.noOfLikes);
    })

    this.state.csvData = csv;

    // this.setState({ csvData: csv });
  }

  render() {
    const {
      casts,
      ongoing,
      pending,
      closed,
      closedEarly,
      loading,
      searchText,
      searched,
      filtered,
      tab
    } = this.state;
    return (
      <div>
        <Card
          headStyle={{ color: '#3cbbf6', fontSize: '1.5rem' }} style={{ background: 'transparent', borderColor: 'transparent', boxSizing: 'border-box' }}
          title={searched ? `Results for "${searchText}"` : "캐스트 관리"}
          extra={[
            <Popover
              content={
                <div>
                  <Input
                    placeholder="캐스트 타이틀"
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
                    {searched ? "명확한 검색" : "검색"}
                  </Button>
                </div>
              }
              placement="bottom"
            >
              <Button type="dashed" icon="search" style={{ margin: 5 }} disabled={filtered}>
                {searched ? searchText : "캐스트 타이틀"}
              </Button>
            </Popover>,
            <CSVLink data={this.state.csvData} filename={`cast-${moment(new Date()).toISOString()}.csv`}>
              <Button type='primary' style={{ margin: 5 }} className='btn-clickable'>
                Export Data
              </Button>
            </CSVLink>
          ]}
        >
          <div display="flex" flexDirection="row">
            <Button selected={tab === 0} text="" onClick={() => this.changeTab(0)} className='btn-transparent'>전체</Button>
            <Divider type="vertical" className='divider-vertical' />
            <Button selected={tab === 1} text="" onClick={() => this.changeTab(1)} className='btn-transparent'>진행중</Button>
            <Divider type="vertical" className='divider-vertical' />
            <Button selected={tab === 2} text="" onClick={() => this.changeTab(2)} className='btn-transparent'>마감</Button>
            <Divider type="vertical" className='divider-vertical' />
            <Button selected={tab === 3} text=" 전" onClick={() => this.changeTab(3)} className='btn-transparent'>오픈</Button>
            <Divider type="vertical" className='divider-vertical' />
            <Button selected={tab === 4} text="" onClick={() => this.changeTab(4)} className='btn-transparent'>조기마감</Button>
          </div>
          <div style={{ marginTop: "20px" }}>
            {tab === 0 && (
              <Table
                dataSource={this.filterOnSearch(casts)}
                columns={this.columns}
                size="small"
                pagination={{
                  showLessItems: true,
                  pageSize: 5
                }}
                loading={loading}
                scroll={{ x: 2000 }}
              />
            )}
            {tab === 1 && (
              <Table
                dataSource={this.filterOnSearch(ongoing)}
                columns={this.columns}
                size="small"
                pagination={{
                  showLessItems: true,
                  pageSize: 5
                }}
                loading={loading}
                scroll={{ x: 2000 }}
              />
            )}
            {tab === 2 && (
              <Table
                dataSource={this.filterOnSearch(closed)}
                columns={this.columns}
                size="small"
                pagination={{
                  showLessItems: true,
                  pageSize: 5
                }}
                loading={loading}
                scroll={{ x: 2000 }}
              />
            )}
            {tab === 3 && (
              <Table
                dataSource={this.filterOnSearch(pending)}
                columns={this.columns}
                size="small"
                pagination={{
                  showLessItems: true,
                  pageSize: 5
                }}
                loading={loading}
                scroll={{ x: 2000 }}
              />
            )}
            {tab === 4 && (
              <Table
                dataSource={this.filterOnSearch(closedEarly)}
                columns={this.columns}
                size="small"
                pagination={{
                  showLessItems: true,
                  pageSize: 5
                }}
                loading={loading}
                scroll={{ x: 2000 }}
              />
            )}
          </div>
        </Card>
      </div>
    );
  }
}
export default Cast;
