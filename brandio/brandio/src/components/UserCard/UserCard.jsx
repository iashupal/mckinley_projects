import React, { Component } from "react";
import { Card, Avatar, Button, Icon } from "antd";
import HeaderContext from "./../../context/HeaderContext";

class UserCard extends Component {
    static contextType = HeaderContext;

    render() {
        const { lng, i18n } = this.context;
        const {
            personAvatar,
            title,
            name,
            description,
            followers,
            following
        } = this.props;

        return (
            <Card className="card__border">
                <div className="card__div__image">
                    <Avatar
                        src={personAvatar}
                        className="card__avatar__image"
                    />
                    <div className="card__image__description">
                        <div className="card__title--small">{title}</div>
                        <div className="card__title--name">{name}</div>
                        <div className="card__title--description">
                            {description}
                        </div>
                    </div>
                </div>
                <div className="card__details">
                    <div className="card__details__follow--padding">
                        <div className="card__details__followers">
                            <span className="card__details__follow__text">
                                {i18n.t("mydio.followers", { lng })}
                            </span>
                            &nbsp;&nbsp;&nbsp;
                            <span className="card__details__follow__count">
                                {followers}
                            </span>
                        </div>
                        <div className="card__details__followers card__details__following">
                            <span className="card__details__follow__text">
                                {i18n.t("mydio.follow", { lng })}
                            </span>
                            &nbsp;&nbsp;&nbsp;
                            <span className="card__details__follow__count">
                                {following}
                            </span>
                        </div>
                    </div>
                    <div className="card__details__btn--padding">
                        <Button
                            className="card__details--btn card__details--mailbtn usercard__btn"
                            size={`large`}
                            onClick={() => alert("mail button click")}
                        >
                            {i18n.t("notification.message", { lng })}
                            <Icon type="mail" />
                        </Button>
                        <Button
                            className="card__details--btn card__details--btn--followme usercard__btn"
                            size={`large`}
                            onClick={() => alert("user button click")}
                        >
                            Following
                            <Icon type="user" />
                        </Button>
                    </div>
                </div>
            </Card>
        );
    }
}

export default UserCard;
