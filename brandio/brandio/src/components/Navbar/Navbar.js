import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Cookies from "js-cookie";

import "./HamburgerMenu.css";
import HeaderContext from "./../../context/HeaderContext";
import { notificationsAPI, userAPI } from "../../services/ApiService";

const sessionValue = Cookies.get("session_value");
const isLogin = Cookies.get("is_login");

class Navbar extends React.Component {
  static contextType = HeaderContext;
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      loadingUsername: false
    };
  }

  async componentDidMount() {
    notificationsAPI.getNotifications();
    if (isLogin === "1") {
      this.setState({ loadingUsername: true });
      const username = await userAPI.getUserName(Cookies.get("member_id"));

      this.setState({
        loadingUsername: false,
        username: username.data.Data[0].nickname
      });
    }
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  logout(e) {
    e.preventDefault();
    Cookies.remove("session_value", { path: "/", domain: ".collartt.com" });
    Cookies.remove("member_id", { path: "/", domain: ".collartt.com" });
    Cookies.remove("is_login", { path: "/", domain: ".collartt.com" });
    Cookies.remove("status", { path: "/", domain: ".collartt.com" });
    window.location.replace("/");
  }

  render() {
    const { lng, i18n, handleLanguageChange } = this.context;
    return (
      <div className="navbar wrapper">
        <div className="navbar__left">
          <ul className="navitem" style={{ marginTop: "2px" }}>
            <li className="navitem--left">
              <NavLink to="/collaboration" className="mainmenu-selected">
                {i18n.t("navigation.collaboration", { lng })}
              </NavLink>
            </li>
            <li className="navitem--left">
              <NavLink to="/artists" className="mainmenu-selected">
                {i18n.t("navigation.artist", { lng })}
              </NavLink>
            </li>
            <li className="navitem--left">
              <NavLink to="/brands" className="mainmenu-selected">
                {i18n.t("navigation.brand", { lng })}
              </NavLink>
            </li>
          </ul>
        </div>

        <div></div>
        <div className="navbar__right">
          <ul className="navitem">
            <li className="navitem--right" style={{ marginTop: "2px" }}>
              {sessionValue !== undefined && (
                <NavLink className="mainmenu-selected" to="/">
                  <strong
                    onClick={() => {
                      window.location.href =
                        "http://my.collartt.com/member/myinfoform";
                    }}
                  >
                    {this.state.loadingUsername ? <div /> : this.state.username}
                  </strong>
                </NavLink>
              )}
            </li>
            <li className="navitem--right" style={{ marginTop: "2px" }}>
              {sessionValue !== undefined && (
                <NavLink className="mainmenu-selected" to="/myinfo/mybrands">
                  {i18n.t("navigation.infoManage", { lng })}
                </NavLink>
              )}
            </li>
            <li className="navitem--right" style={{ marginTop: "2px" }}>
              {sessionValue === undefined ? (
                <a
                  href="http://devmy.collartt.com/auth/loginform?ref=http://brandio.collartt.com"
                  className=""
                >
                  {i18n.t("navigation.login", { lng })}
                </a>
              ) : (
                <NavLink to="/" className="" onClick={e => this.logout(e)}>
                  {i18n.t("navigation.logout", { lng })}
                </NavLink>
              )}
            </li>
            <li className="navitem--right">
              <div class="tabs" style={{ marginTop: "-2px" }}>
                <div class="tab">
                  <input type="checkbox" id="chck1" />
                  <label class="tab-label" for="chck1">
                    {lng === "kr" && (
                      <img
                        className="current-flag"
                        src={require("../../assets/images/flag/frag_kr.svg")}
                        alt=""
                      />
                    )}
                    {lng === "en" && (
                      <img
                        className="current-flag"
                        src={require("../../assets/images/flag/frag_us.svg")}
                        alt=""
                      />
                    )}
                    {lng === "jp" && (
                      <img
                        className="current-flag"
                        src={require("../../assets/images/flag/frag_jp.svg")}
                        alt=""
                      />
                    )}
                    {lng === "vn" && (
                      <img
                        className="current-flag"
                        src={require("../../assets/images/flag/frag_vn.svg")}
                        alt=""
                      />
                    )}
                    {/* {i18n.t('navigation.language', { lng })} */}
                    {lng === "en" ? "English" : "한국어"}
                  </label>
                  <div class="tab-content">
                    <ul>
                      <li
                        className={`languagesubNavLink mainmenu-selected ${
                          lng === "kr" ? "activeflag" : ""
                        }`}
                      >
                        <NavLink
                          to="#"
                          onClick={e => {
                            document.getElementById("chck1").checked = false;
                            handleLanguageChange("kr");
                          }}
                        >
                          <img
                            src={require("../../assets/images/flag/frag_kr.svg")}
                            alt=""
                            className="current-flag"
                          />
                          {i18n.t("misc.korean", { lng })}
                        </NavLink>
                      </li>
                      <li
                        className={`languagesubNavLink mainmenu-selected ${
                          lng === "en" ? "activeflag" : ""
                        }`}
                      >
                        <NavLink
                          to="#"
                          onClick={e => {
                            document.getElementById("chck1").checked = false;
                            handleLanguageChange("en");
                          }}
                        >
                          <img
                            src={require("../../assets/images/flag/frag_us.svg")}
                            alt=""
                            className="current-flag"
                          />
                          {i18n.t("misc.english", { lng })}
                        </NavLink>
                      </li>
                      <li
                        className={`languagesubNavLink mainmenu-selected ${
                          lng === "jp" ? "activeflag" : ""
                        }`}
                        onClick={() => alert("서비스 준비중 입니다.")}
                      >
                        <NavLink to="#">
                          <img
                            src={require("../../assets/images/flag/frag_jp.svg")}
                            alt=""
                            className="current-flag"
                          />
                          {i18n.t("misc.japanese", { lng })}
                        </NavLink>
                      </li>
                      <li
                        className={`languagesubNavLink mainmenu-selected ${
                          lng === "vn" ? "activeflag" : ""
                        }`}
                        onClick={() => alert("서비스 준비중 입니다.")}
                      >
                        <NavLink to="#">
                          <img
                            src={require("../../assets/images/flag/frag_vn.svg")}
                            alt=""
                            className="current-flag"
                          />
                          {i18n.t("misc.vietnamese", { lng })}
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navbar;
