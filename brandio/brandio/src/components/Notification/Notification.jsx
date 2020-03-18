import React, { Component, Fragment } from "react";
import "./Notification.css";
import HeaderContext from "./../../context/HeaderContext";
import { notificationsAPI } from "../../services/ApiService";
import { Empty, Button, message } from "antd";

class Notification extends Component {
  static contextType = HeaderContext;
  getParsedDate(strDate) {
    var strSplitDate = String(strDate).split(" ");
    var date = new Date(strSplitDate[0]);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;

    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    date = dd + "-" + mm + "-" + yyyy;
    return date.toString();
  }
  updateNotice = async (type, senderId, noticeId) => {
    let payload = {
      notiId: noticeId
    };
    if (type === "message") {
      const res = await notificationsAPI.seenNotification(payload);
      window.location.href = "/myinfo/inbox";
    } else {
      window.location.href = `http://mydio.collartt.com:/artist/${senderId}`;
      const res = await notificationsAPI.seenNotification(payload);
    }
  };
  render() {
    const { lng, i18n } = this.context;
    return (
      <div className="noti__main__div">
        {this.props.isLogin ? (
          this.props.notifications.length > 0 ? (
            <Fragment>
              {this.props.notifications.map((value, index) => {
                return (
                  <div className="noti__main__single" key={`notification-${index}`}>
                    <div className="noti__main__subdiv">
                      <div className="noti__main__profile-div">
                        {value.sender_img === null ? (
                          <img src={require("../../assets/images/artist-avatar-1.svg")} className="profile__pic" alt="" />
                        ) : (
                          <img src={value.sender_img} className="profile__pic" alt="" />
                        )}
                      </div>
                      <div className="noti__main__details-div">
                        <div className="noti__main__personname-div">
                          <span className="noti__description__text noti__title__user--padding-right">
                            {value.sender_nickname}
                          </span>
                        </div>
                        <div className="noti__main__description-div">
                          <span className="noti__description__text">
                            {value.type === "message"
                              ? i18n.t("brandioArtist.sendBtn", {
                                  lng
                                })
                              : i18n.t("misc.startedFollowing", {
                                  lng
                                })}
                          </span>
                        </div>
                        <div className="noti__main__datetime-div">
                          <span className="last__text">
                            {}
                            {this.getParsedDate(value.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="noti__btn__group">
                      <button
                        type="button"
                        className="noti__btn fill__btn"
                        onClick={e => this.updateNotice(value.type, value.sender_id, value.id)}
                      >
                        {value.type}
                      </button>
                    </div>
                  </div>
                );
              })}
            </Fragment>
          ) : (
            <Fragment>
              <p>{i18n.t("misc.noNotificatn", { lng })}</p>
            </Fragment>
          )
        ) : (
          <div>
            <Empty description="You are not logged in.">
              <Button href={`http://devmy.collartt.com/auth/loginform?ref=${window.location.href}`}>
                {i18n.t("misc.login", { lng })}
              </Button>
            </Empty>
          </div>
        )}
      </div>
    );
  }
}
export default Notification;
