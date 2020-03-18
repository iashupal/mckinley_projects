import React, { Component } from "react";
import { Menu, Icon, Badge, message } from "antd";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { GET_ACTIVITY_COUNT_URL } from "../utils/endpoints";
const { SubMenu } = Menu;
const role = localStorage.getItem("role");

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityCount: [],
      loading: false
    };
    this.getCount = this.getCount.bind(this);
  }
  componentDidMount() {
    this.getCount();
  }

  getCount() {
    const token = localStorage.getItem("token");
    this.setState({ loading: true });
    axios
      .get(GET_ACTIVITY_COUNT_URL, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log("activity count", res.data.Body);
        this.setState({ activityCount: res.data.Body, loading: false });
      })
      .catch(err => {
        message.error(err.message);
      });
  }
  render() {
    const { location } = this.props;
    const { activityCount } = this.state;
    return (
      <Menu selectedKeys={[location.pathname]} defaultOpenKeys={["users"]} mode="inline">
        <Menu.Item key="/">
          <Link to="/">
            <Icon type="pie-chart" />
            <span>Dashboard</span>
          </Link>
        </Menu.Item>
        <SubMenu
          title={
            <span>
              <Icon type="team" />
              <span>Users</span>
            </span>
          }
          key="users"
        >
          <Menu.Item key="/userlist">
            <Link to="/userlist">
              <span>User List</span>
              <span style={{ float: "right" }}>
                <Badge count={activityCount ? activityCount.users : ""} />
              </span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/registered-user">
            <Link to="/registered-user">
              <span>New Registered User</span>
              <span style={{ float: "right" }}>
                <Badge count={5} />
              </span>
            </Link>
          </Menu.Item>
        </SubMenu>
        {role === "owner" || role === "regular_emp" ? (
          <Menu.Item key="/moments">
            <Link to="/moments">
              <Icon type="environment" />
              <span>Moments</span>
              <span style={{ float: "right" }}>
                <Badge count={activityCount ? activityCount.moments : ""} />
              </span>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}
        {role === "owner" || role === "regular_emp" ? (
          <Menu.Item key="/vibes">
            <Link to="/vibes">
              <Icon type="fund" />
              <span>Vibes</span>
              <span style={{ float: "right" }}>
                <Badge count={activityCount ? activityCount.vibes : ""} />
              </span>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}
        {role === "owner" || role === "regular_emp" ? (
          <Menu.Item key="/report">
            <Link to="/report">
              <Icon type="red-envelope" />
              <span>Report Management</span>
              <span style={{ float: "right" }}>
                <Badge count={activityCount ? activityCount.reports : ""} />
              </span>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}
        {role === "owner" || role === "regular_emp" ? (
          <Menu.Item key="/donation-hashtag">
            <Link to="/donation-hashtag">
              <Icon type="number" />
              <span>Donation Hashtags</span>
              <span style={{ float: "right" }}>
                <Badge count={activityCount ? activityCount.donationHashtags : ""} />
              </span>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}
        {role === "owner" || role === "regular_emp" ? (
          <Menu.Item key="/clover-purchase">
            <Link to="/clover-purchase">
              <Icon type="pay-circle" />
              <span>Clover Purchase</span>
              <span style={{ float: "right" }}>
                <Badge count={activityCount ? activityCount.cloverPurchases : ""} />
              </span>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}
        {role === "owner" || role === "regular_emp" ? (
          <SubMenu
            title={
              <span>
                <Icon type="coffee" />
                <span>Coffee</span>
              </span>
            }
            key="coffee"
          >
            <Menu.Item key="/coffee-coupon">
              <Link to="/coffee-coupon">
                <span>Coffee Coupon</span>
                <span style={{ float: "right" }}>
                  <Badge count={activityCount ? activityCount.coffeeCoupons : ""} />
                </span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/coupon-request">
              <Link to="/coupon-request">
                <span>Request Coupon</span>
                <span style={{ float: "right" }}>
                  <Badge count={activityCount ? activityCount.requestCoupons : ""} />
                </span>
              </Link>
            </Menu.Item>
          </SubMenu>
        ) : (
          ""
        )}
        {role === "owner" || role === "regular_emp" ? (
          <SubMenu
            title={
              <span>
                <Icon type="appstore" />
                <span>Events</span>
              </span>
            }
            key="events"
          >
            <Menu.Item key="/events">
              <Link to="/events">
                <span>All Events</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/participated-events">
              <Link to="/participated-events">
                <span>Participated Events</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/sponsored-events">
              <Link to="/sponsored-events">
                <span>Sponsored Events</span>
                <span style={{ float: "right" }}>
                  <Badge count={activityCount ? activityCount.sponsoredEvents : ""} />
                </span>
              </Link>
            </Menu.Item>

            <Menu.Item key="/non-sponsored-events">
              <Link to="/non-sponsored-events">
                <span>Non Sponsored Events</span>
                <span style={{ float: "right" }}>
                  <Badge count={activityCount ? activityCount.nonSponsoredEvents : ""} />
                </span>
              </Link>
            </Menu.Item>
          </SubMenu>
        ) : (
          ""
        )}
        <SubMenu
          title={
            <span>
              <Icon type="safety-certificate" />
              <span>Verify Document</span>
            </span>
          }
          key="Verification"
        >
          <Menu.Item key="/verifyOccupation">
            <Link to="/verifyOccupation">
              <span>Occupation</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/verifyUniversity">
            <Link to="/verifyUniversity">
              <span>University</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/verifyFace">
            <Link to="/verifyFace">
              <span>Face</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/nationalVerification">
            <Link to="/nationalVerification">
              <span>Wealth (Black)</span>
            </Link>
          </Menu.Item>
        </SubMenu>
        {role === "owner" || role === "regular_emp" ? (
          <Menu.Item key="/approve-image">
            <Link to="/approve-image">
              <Icon type="security-scan" />
              <span>Approve Image</span>
              <span style={{ float: "right" }}>
                <Badge count={activityCount ? activityCount.imageUpdateRequests : ""} />
              </span>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}
        {role === "owner" || role === "regular_emp" ? (
          <Menu.Item key="/approve-profile">
            <Link to="/approve-profile">
              <Icon type="security-scan" />
              <span>Approve Profile Image</span>
              {/* <span style={{ float: "right" }}>
                <Badge count={activityCount ? activityCount.imageUpdateRequests : ""} />
              </span> */}
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}
        {role === "owner" || role === "regular_emp" ? (
          <Menu.Item key="/resolve-request">
            <Link to="/resolve-request">
              <Icon type="security-scan" />
              <span>Resolve Request</span>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}
        {role === "owner" || role === "regular_emp" ? (
          <Menu.Item key="/delete-post">
            <Link to="/delete-post">
              <Icon type="security-scan" />
              <span>Deleted Post</span>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}
        {role === "owner" || role === "regular_emp" ? (
          <Menu.Item key="/user-rating">
            <Link to="/user-rating">
              <Icon type="star" />
              <span>User Rating</span>
            </Link>
          </Menu.Item>
        ) : (
          ""
        )}
      </Menu>
    );
  }
}

export default withRouter(SideNav);
