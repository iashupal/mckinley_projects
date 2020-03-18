import React from "react";
import "./Header.css";

//Import Components
import TopBar from "./../Topbar/Topbar";
import HeaderContext from "./../../context/HeaderContext";
import { notificationsAPI } from "../../services/ApiService";
import { withCookies, useCookies } from "react-cookie";

class Header extends React.Component {
  static contextType = HeaderContext;
  state = { notifications: [] };

  async componentDidMount() {
    const response = await notificationsAPI.getNotifications();
    if (!!response.data) {
      this.setState({ notifications: response.data.Data });
    } else {
      this.setState({ notifications: [] });
    }
  }

  render() {
    const header = this.context;
    const { cookies } = this.props;
    return (
      <TopBar
        headerName={header.headerName}
        notifications={this.state.notifications}
        isLogin={cookies.cookies.is_login}
      />
    );
  }
}

export default withCookies(Header);
