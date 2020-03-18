import React, { Component, Fragment } from "react";
import { Divider, Row, Col, Button, message, Card, Popover, Input, Select, Modal, Icon, Popconfirm } from "antd";
import axios from "axios";
import {
  GET_NEW_REGISTERED_URL,
  PATCH_PENDING_USER_URL,
  PATCH_REJECT_USER_URL,
  PATCH_CONFIRM_USER_URL
} from "../utils/endpoints";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../css/carousel.css";
import "../css/style.css";
import "../css/modal.css";
import Pagination from "react-js-pagination";
import dummy from "../images/dummy.png";
const role = localStorage.getItem("role");
const token = localStorage.getItem("token");
const { Option } = Select;

class RegisteredUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRegisteredUser: [],
      loading: false,
      searched: false,
      searchText: "",
      filtered: false,
      filters: {},
      activePage: 1,
      totalDocsCount: 0,
      docsCount: 10,
      entry: {}
    };
    this.getRegisteredUser = this.getRegisteredUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.submitFilters = this.submitFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }
  componentDidMount() {
    this.getRegisteredUser();
  }
  getRegisteredUser = (searchText = "", filters = {}) => {
    const { docsCount, activePage, searched } = this.state;
    this.setState({ loading: true });
    let filterString = "";
    let sortBy = "";
    if (Object.keys(filters).length) {
      if (filters.userStatus === "newest" || filters.userStatus === "oldest") sortBy = `&sortBy=${filters.userStatus}`;
      else filterString = filters.userStatus;
    }

    axios
      .get(
        `${GET_NEW_REGISTERED_URL}?limit=${docsCount}&page=${activePage}&search=${
          searchText === null ? "" : searchText
        }&type=${filterString}${sortBy}`,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
        console.log("newRegisteredUser", res.data.Body);
        console.log("totalDocsCount", res.data.totalDocsCount);
        this.setState({ loading: false, totalDocsCount: !searched ? res.data.totalDocsCount : res.data.totalDocsCount }, () => {
          if (this.state.totalDocsCount === 0) {
            this.setState({ totalDocsCount: 1 });
          }
          this.setState({ newRegisteredUser: res.data.Body });
        });
      })
      .catch(err => {
        message.error(err.message);
      });
  };

  filterOnSearch = entry => {
    const { searched } = this.state;
    if (searched) {
      let filteredEntry = [...entry];
      filteredEntry.splice(0, 1);
      return [...filteredEntry];
    } else {
      return [...entry];
    }
  };

  pendingUser(_id) {
    axios
      .patch(
        `${PATCH_PENDING_USER_URL}?userId=${_id}`,
        { id: _id, isVerified: false, isRegistered: false },
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
        `${PATCH_REJECT_USER_URL}?userId=${_id}`,
        { id: _id, isVerified: false, isRegistered: false },
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

  confirmUser(_id) {
    axios
      .patch(
        `${PATCH_CONFIRM_USER_URL}?userId=${_id}&from=card`,
        { id: _id, isVerified: true, isRegistered: true },
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

  registeredUserCard = newRegisteredUser => {
    return newRegisteredUser.map(record => {
      return (
        <Card
          style={{
            marginBottom: "20px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.6)"
          }}
        >
          <div>
            <Row gutter={16}>
              <Col span={9}>
                <Carousel>
                  {record.photos.length
                    ? record.photos.map((photo, i) => {
                        // console.log("photo ", i, photo.url);
                        return (
                          <div className="carouselPhoto">
                            <img style={{ objectFit: "cover" }} src={photo.url ? photo.url : dummy} alt="Answer_Image" />
                          </div>
                        );
                      })
                    : ""}
                </Carousel>
              </Col>
              <Col span={15} style={{ paddingLeft: "1.5rem" }}>
                <Row gutter={16} style={{ padding: "0 0.5rem 1.2rem" }}>
                  <div>
                    <span
                      style={{ fontSize: "1.5rem", fontWeight: "bolder", fontStretch: "0.8rem", textTransform: "capitalize" }}
                    >
                      {record._id}
                      {/* {record.title} */}
                    </span>
                  </div>
                </Row>
                <Row gutter={16} style={{ padding: "0 0.5rem" }}>
                  <Col span={24}>
                    <span className="cardSpan-heading">Email : </span>
                    <span className="cardSpan-record">{record.email ? record.email : "N/A"}</span>
                  </Col>
                  <Col span={24}>
                    <span className="cardSpan-heading">Username: </span>
                    <span className="cardSpan-record">{record.username ? record.username : "N/A"}</span>
                  </Col>
                </Row>
                <Row gutter={16} style={{ padding: "0 0.5rem" }}>
                  <Col span={24}>
                    <span className="cardSpan-heading">College Name: </span>
                    <span className="cardSpan-record">{record.college ? record.college : "N/A"}</span>
                  </Col>
                  <Col span={24}>
                    <span className="cardSpan-heading">School: </span>
                    <span className="cardSpan-record">{record.school ? record.school : "N/A"}</span>
                  </Col>
                </Row>
                <Row gutter={16} style={{ padding: "0 0.5rem" }}>
                  <Col span={24}>
                    <span className="cardSpan-heading">Company Name: </span>
                    <span className="cardSpan-record">{record.company ? record.company : "N/A"}</span>
                  </Col>
                  <Col span={24}>
                    <span className="cardSpan-heading">DOB: </span>
                    <span className="cardSpan-record">{record.dob ? record.dob : "N/A"}</span>
                  </Col>
                </Row>
                <Row gutter={16} style={{ padding: "0 0.5rem" }}>
                  <Col span={24}>
                    <span className="cardSpan-heading">Height: </span>
                    <span className="cardSpan-record">{record.height ? record.height : "N/A"}</span>
                  </Col>
                  <Col span={12}>
                    <span className="cardSpan-heading">Interested Hashtags: </span>
                    <span className="cardSpan-record">
                      {record.interestedHashtags ? record.interestedHashtags.join(", ") : "N/A"}
                    </span>
                  </Col>
                </Row>
                <Row gutter={16} style={{ padding: "0 0.5rem" }}>
                  <Col span={24}>
                    <span className="cardSpan-heading">Location: </span>
                    <span className="cardSpan-record">{record.location ? record.location : "N/A"}</span>
                  </Col>
                  <Col span={24}>
                    <span className="cardSpan-heading">physique: </span>
                    <span className="cardSpan-record">{record.physique ? record.physique : "N/A"}</span>
                  </Col>
                </Row>
                <Row gutter={16} style={{ padding: "0 0.5rem" }}>
                  <Col span={24}>
                    <span className="cardSpan-heading">Payments: </span>
                    <span className="cardSpan-record">{record.coffeeCoupons ? record.coffeeCoupons : "N/A"}</span>
                  </Col>
                  <Col span={24}>
                    <span className="cardSpan-heading">Occupation: </span>
                    <span className="cardSpan-record">{record.occupation ? record.occupation : ""}</span>
                  </Col>
                </Row>
                <Row gutter={16} style={{ padding: "0 0.5rem" }}>
                  <Col span={24}>
                    <span className="cardSpan-heading">Introduction: </span>
                    <span className="cardSpan-record">{record.introduction ? record.introduction : "N/A"}</span>
                  </Col>
                  <Col span={24}>
                    <span className="cardSpan-heading">Race: </span>
                    <span className="cardSpan-record">{record.race ? record.race : "N/A"}</span>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row style={{ margin: "1rem 0 0" }} gutter={16}>
              <Col span={11} style={{ margin: "0.5rem" }}>
                <span className="document_images" style={{ margin: "1rem", marginLeft: 0 }}>
                  {record.occupationVerifyMode.toLowerCase() === "document" ? (
                    <img
                      style={{ width: "75px", cursor: "pointer", height: "75px", objectFit: "cover" }}
                      src={record.occupationDocumentOrEmail ? record.occupationDocumentOrEmail : dummy}
                      alt="Document"
                      onClick={() => this.showOccupationModal(record)}
                    />
                  ) : (
                    ""
                  )}
                </span>
                <span className="document_images" style={{ margin: "1rem", marginLeft: 0 }}>
                  {record.universityVerifyMode.toLowerCase() === "document" ? (
                    <img
                      style={{ width: "75px", height: "75px", cursor: "pointer", objectFit: "cover" }}
                      src={record.universityDocumentOrEmail ? record.universityDocumentOrEmail : dummy}
                      alt="Document"
                      onClick={() => this.showUniversityModal(record)}
                    />
                  ) : (
                    ""
                  )}
                </span>
                <span className="document_images" style={{ margin: "1rem", marginLeft: 0 }}>
                  <img
                    style={{ width: "75px", height: "75px", cursor: "pointer", objectFit: "cover" }}
                    src={record.wealthDocument.length ? record.wealthDocument : dummy}
                    alt="Document"
                    onClick={() => this.showWealthModal(record)}
                  />
                </span>
              </Col>
              <Col span={11} style={{ margin: "0.5rem", float: "right" }}>
                <Fragment>
                  <Popconfirm
                    title="Are you sure, you want to move this user at the end?"
                    onConfirm={() => this.pendingUser(record._id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="primary"
                      style={{ "background-color": "#6A0DAD", borderColor: "#6A0DAD" }}
                      icon="check"
                      size="small"
                    >
                      Pending
                    </Button>
                  </Popconfirm>
                </Fragment>
                {record.isVerified && record.isRegistered ? (
                  ""
                ) : (
                  <Fragment>
                    <Divider type="Vertical" />
                    <Popconfirm
                      title="Are you sure, you want to confirm this user?"
                      onConfirm={() => this.confirmUser(record._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="primary" icon="check" size="small">
                        Confirm
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
                          <Button type="danger" icon="close" size="small">
                            Reject
                          </Button>
                        </Popconfirm>
                      </span>
                    ) : (
                      ""
                    )}
                  </Fragment>
                )}
              </Col>
            </Row>
          </div>
        </Card>
      );
    });
  };
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  submitSearch() {
    this.setState({ searched: true });
    this.getRegisteredUser(this.state.searchText);
  }

  submitFilters() {
    this.setState({ filtered: true });
    this.getRegisteredUser(null, this.state.filters);
  }

  clearSearch() {
    this.setState({ searched: false, searchText: "" });
    this.getRegisteredUser();
  }

  clearFilters() {
    this.setState({ filtered: false, filters: {} });
    this.getRegisteredUser();
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

  showOccupationModal = record => {
    Modal.success({
      title: "Occupation Document",
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
            src={record.occupationDocumentOrEmail.length ? record.occupationDocumentOrEmail : dummy}
            alt="Document_Image"
          />
        </div>
      ),
      okText: "OK"
    });
  };

  showUniversityModal = record => {
    Modal.success({
      title: "University Document",
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
            src={record.universityDocumentOrEmail ? record.universityDocumentOrEmail : dummy}
            alt="Document_Image"
          />
        </div>
      ),
      okText: "OK"
    });
  };

  showWealthModal = record => {
    Modal.success({
      title: "Wealth Document",
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
            src={record.wealthDocument.length ? record.wealthDocument : dummy}
            alt="Document_Image"
          />
        </div>
      ),
      okText: "OK"
    });
  };
  handlePageChange = activePage => {
    this.setState({ activePage }, () => this.getRegisteredUser());
  };
  render() {
    const { newRegisteredUser, searchText, searched, filtered, docsCount, totalDocsCount, activePage, filters } = this.state;
    return (
      <div>
        <Card
          headStyle={{ fontSize: "1.5rem" }}
          size="small"
          title="New Registered User"
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
                    <Option value={"pending"}>Pending</Option>
                    <Option value={"rejected"}>Rejected</Option>
                    <Option value={"newest"}>Newest</Option>
                    <Option value={"oldest"}>Oldest</Option>
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
            </Popover>
          ]}
        >
          <div className="register-card">{this.registeredUserCard(this.filterOnSearch(newRegisteredUser))}</div>
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
export default RegisteredUsers;
