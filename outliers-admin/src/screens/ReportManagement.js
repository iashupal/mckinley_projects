import React, { Component, Fragment } from "react";
import { Table, Divider, Button, message, Modal, Card, Popconfirm, Popover, Input, Icon } from "antd";
import axios from "axios";
import { GET_REPORT_URL, PATCH_DEACTIVATE_URL } from "../utils/endpoints";
import { CSVLink } from "react-csv";
import Pagination from "react-js-pagination";
import moment from "moment";
import "../css/style.css";
import dummy from "../images/dummy.png";
import "../css/modal.css";
const token = localStorage.getItem("token");

class ReportManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reports: [],
      loading: false,
      searched: false,
      searchText: null,
      visible: false,
      activePage: 1,
      totalDocsCount: 0,
      docsCount: 10,
      csvData: [["PostId", "Post Type, Report Type, Report Info"]]
    };
    this.handleChange = this.handleChange.bind(this);
    this.getReports = this.getReports.bind(this);
    this.setCSV = this.setCSV.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);

    this.columns = [
      {
        title: "Post Id",
        dataIndex: "momentVibeOrCommentId",
        width: "10%",
        key: "momentVibeOrCommentId",
        render: (text, record) => <span>{record.momentVibeOrCommentId ? record.momentVibeOrCommentId : ""}</span>
      },
      {
        title: "Post Type",
        dataIndex: "type",
        width: "7%",
        key: "type",
        render: (text, record) => <span>{record.type ? record.type : ""}</span>
      },
      {
        title: "Reporter",
        dataIndex: "username",
        width: "7%",
        key: "reporter_id.username",
        render: (text, record) => <span>{record.reporter_id ? record.reporter_id.username : ""}</span>
      },

      {
        title: "Reportee",
        dataIndex: "username",
        width: "7%",
        key: "reportee_id.username",
        render: (text, record) => <span>{record.reportee_id ? record.reportee_id.username : ""}</span>
      },
      {
        title: "Report Type",
        dataIndex: "report_type",
        width: "10%",
        key: "report_type",
        render: (text, record) => <span>{record.report_type ? record.report_type : ""}</span>
      },
      {
        title: "Report Info",
        dataIndex: "report_info",
        width: "15%",
        key: "report_info",
        render: (text, record) => <span>{record.report_info ? record.report_info : ""}</span>
      },
      {
        title: "Report Image",
        dataIndex: "report_url",
        width: "10%",
        key: "report_url",
        render: (text, record) => (
          <img
            style={{ width: "120px", height: "120px", cursor: "pointer", objectFit: "cover" }}
            src={record.report_url ? record.report_url : ""}
            alt="Report"
            onClick={() => this.showReportModal(record)}
          />
        )
      },
      {
        title: "Date",
        dataIndex: "createdAt",
        width: "10%",
        key: "createdAt",
        render: (text, record) => <span>{moment(record.createdAt).format("YYYY-MM-DD HH:mm")}</span>
      },
      {
        title: "Actions",
        key: "actions",
        width: "20%",
        render: (text, record) => (
          <span>
            <Button type="primary" size="small" onClick={() => this.showModal(record)}>
              Detail
            </Button>
            {record.reportee_id ? (
              record.reportee_id.accountStatus !== 0 || record.reportee_id.deactivateOrSuspend !== "deactivated" ? (
                <Fragment>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="Are you sure, you want to deactivate this reportee?"
                    onConfirm={() => this.deactivateUser(record.reportee_id._id, "deactivated")}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="danger" size="small">
                      Deactivate
                    </Button>
                  </Popconfirm>
                </Fragment>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            {record.reportee_id ? (
              record.reportee_id.accountStatus !== 0 || record.reportee_id.deactivateOrSuspend !== "suspended" ? (
                <Fragment>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="Are you sure, you want to suspend this reportee?"
                    onConfirm={() => this.deactivateUser(record.reportee_id._id, "suspended")}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="primary" size="small">
                      Suspend
                    </Button>
                  </Popconfirm>
                </Fragment>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </span>
        )
      }
    ];
  }

  componentDidMount() {
    this.getReports();
  }

  showReportModal = record => {
    Modal.success({
      title: "Vibe Image",
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
            src={record.report_url ? record.report_url : dummy}
            alt="Document_Image"
          />
        </div>
      ),
      okText: "OK"
    });
  };

  showModal = record => {
    Modal.info({
      title: "Report Details",
      content: (
        <div>
          <div style={{ width: "100%", margin: "0 auto", height: "100%" }}>
            <img
              src={record.report_url ? record.report_url : dummy}
              style={{ width: "100%", objectFit: "cover", height: "100%" }}
              alt="Report_Image"
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
              <strong>Post type:</strong> {record.type}
            </li>
            <li>
              <strong>Report type:</strong> {record.report_type}
            </li>
            <li>
              <strong>Report info:</strong> {record.report_info}
            </li>
            <li>
              <strong>Reporter:</strong> {record.reporter_id ? record.reporter_id.username : ""}
            </li>
            <li>
              <strong>Reportee:</strong> {record.reportee_id ? record.reportee_id.username : ""}
            </li>
            <li>
              <strong>Reported On:</strong> {moment(record.createdAt).format("YYYY-MM-DD HH:mm")}
            </li>
          </ul>
        </div>
      ),
      okText: "OK"
    });
  };

  getReports(searchText = null) {
    const { docsCount, activePage, searched } = this.state;
    const token = localStorage.getItem("token");
    this.setState({ loading: true });
    let searchString = "";
    if (searchText) {
      searchString = `?search=${searchText}`;
    }
    axios
      .get(`${GET_REPORT_URL}?limit=${docsCount}&page=${activePage}` + searchString, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("report", res.data.Body);
        this.setState({ loading: false, totalDocsCount: !searched ? res.data.totalDocsCount : res.data.totalDocsCount }, () => {
          if (this.state.totalDocsCount === 0) {
            this.setState({ totalDocsCount: 1 });
          }
          this.setState({ reports: res.data.Body });
          this.setCSV(res.data.Body, "report");
        });
      })
      .catch(err => {
        message.error(err.message);
      });
  }

  deactivateUser(_id, deactivateOrSuspend) {
    axios
      .patch(
        `${PATCH_DEACTIVATE_URL}`,
        {
          userId: _id,
          deactivateOrSuspend
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

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  submitSearch() {
    this.setState({ searched: true });
    this.getReports(this.state.searchText);
  }

  clearSearch() {
    this.setState({ searched: false, searchText: null });
    this.getReports();
  }

  setCSV() {
    // csvData: [["id", "username", "username", "report_type"]];
    let csvData = this.state.csvData;
    this.state.reports.map(report => {
      let entry = [];
      entry.push(String(report.momentVibeOrCommentId));
      entry.push(String(report.type));
      entry.push(String(report.report_type));
      entry.push(String(report.report_info));
      csvData.push(entry);
      return 0;
    });
    this.setState({ csvData: csvData });
  }
  handlePageChange = activePage => {
    this.setState({ activePage }, () => this.getReports());
  };
  render() {
    const { reports, loading, searchText, searched, docsCount, totalDocsCount, activePage } = this.state;
    return (
      <div>
        <Card
          headStyle={{ fontSize: "1.5rem" }}
          size="small"
          title="Report Management"
          extra={[
            <Popover
              content={
                <div>
                  <Input
                    placeholder="Enter PostId/Post Type"
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
                {searched ? searchText : "Search PostId"}
              </Button>
            </Popover>,
            <CSVLink data={this.state.csvData} filename={`report-${moment(new Date()).toISOString()}.csv`}>
              <Button icon="download" style={{ margin: 5 }}>
                Download CSV
              </Button>
            </CSVLink>
          ]}
        >
          <Table
            dataSource={reports}
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
            pagination={false}
            loading={loading}
            scroll={{ x: 1560 }}
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

export default ReportManagement;
