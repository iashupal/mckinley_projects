import React, { Component } from "react";
import HeaderContext from "./../../context/HeaderContext";

class QuoteDetail extends Component {
    static contextType = HeaderContext;
    render() {
        const {
            quoteDescription,
            time,
            personName,
            profileImage,
            collaborationPercentage,
            productName
        } = this.props;
        const { lng, i18n } = this.context;
        return (
            <div className="div__list">
                <div className="brandio__product__div">
                    <div className="brandio__product__sub__div">
                        <div className="brandiopcard__quotebox primary-bg">
                            <p className="brandiopcard__quote">
                                {quoteDescription}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="brandio__quote__details">
                    <div className="brandio__quote__time">{time}</div>
                    <div className="product__person__detail">
                        <img
                            src={profileImage}
                            alt=""
                            className="avatar__image"
                            height={32}
                        />
                        <div className="avatar__name">{personName}</div>
                    </div>
                    <div className="product__sub_detail">{productName}</div>
                    <div className="brandio__product__line"></div>
                    <div className="brandio__collaboration__detail">
                        <span className="brandio__collaboration__title">
                            {i18n.t("brandioCollaborationList.desc", { lng })}
                        </span>
                        <span className="brandio__collaboration__percentage">
                            {collaborationPercentage} %
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuoteDetail;
