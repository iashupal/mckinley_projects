import React, { useContext } from "react";
import "./../Topbar/Topbar.css";
import Notification from "../Notification/Notification";
import { Popover, Badge } from "antd";
import { Link } from "react-router-dom";
import notifications from "../../utils/dummy/notification";
import HeaderContext from "../../context/HeaderContext";

function Topbar(props) {
  console.log("recived props in header", props);
  let notiCount = notifications.length;
  const { lng, i18n } = useContext(HeaderContext);
  return (
    <div className="topbar">
      <div className="top__logo-title">
        <Link to="/">{props.headerName.toUpperCase()}</Link>
      </div>
      <div></div>
      <div className="topbar__cart-box">
        <Link to="/">
          {props.headerName === "Fandio" ? (
            <img
              src={require("../../assets/images/icon-cart.svg")}
              title="Cart"
              alt="Cart Icon"
              width="32"
              height="28"
              className="topbar__cart"
            />
          ) : null}
        </Link>
      </div>
      <div className="topbar__notification-box">
        {props.headerName === "Brandio" || props.headerName === "Mydio" ? (
          <Popover
            overlayClassName="notification-popover"
            content={
              <Notification
                isLogin={props.isLogin}
                notifications={props.notifications}
              />
            }
            trigger="click"
          >
            <Badge count={props.notifications.length} className="noti__badge">
              <img
                src={`/assets/images/NotificationIcon@2x.png`}
                title="Notification"
                alt="Notification Icon"
                width="27"
                height="28"
                className="topbar__notification"
              />
            </Badge>
          </Popover>
        ) : null}
      </div>

      <div className="topbar__user-box">
        {props.headerName === "Fandio" ? (
          <Link to="/mydio">
            <img
              src={require("../../assets/images/icon-user.svg")}
              title="Profile"
              alt="Profile Icon"
              width="27"
              height="28"
              className="topbar__user"
            />
          </Link>
        ) : null}
        {props.headerName === "Brandio" ? (
          <Link to="/myinfo/inbox">
            <img
              src={require("../../assets/images/icon-email.svg")}
              title="Message"
              alt="Profile Icon"
              width="27"
              height="28"
              className="topbar__user"
            />
          </Link>
        ) : null}
      </div>
      <div className="customise">
        {/* mobile menu start */}
        <nav role="navigation" className="topbar__mobile-menu">
          <div id="menuToggle">
            <input type="checkbox" />

            <span className="close__hamburgermenu"></span>
            <span className="close__hamburgermenu"></span>
            <span className="close__hamburgermenu"></span>

            <ul id="menu">
              <div className="mobilemenu-box">
                <h6 className="mobilemenu__brandheading">Brandio</h6>
                <Link to="/collaboration">
                  <li>
                    {i18n.t("navigation.collaboration", {
                      lng
                    })}
                  </li>
                </Link>
                <Link to="/artists">
                  <li>{i18n.t("navigation.artist", { lng })}</li>
                </Link>
                <Link to="/brands">
                  <li>{i18n.t("navigation.brand", { lng })}</li>
                </Link>
              </div>
            </ul>
          </div>
        </nav>
        {/* mobile menu end */}
        <Link to="/brands/new" className="customise__button">
          <img
            src={require("../../assets/images/icon-create.svg")}
            alt="create brand"
            className="btnicon"
          />
          <span>{i18n.t("navigation.launchBrand", { lng })}</span>
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
