import React, { Component } from "react";
import { Button, Icon, message } from "antd";
import HeaderContext from "./../../context/HeaderContext";
import { illustrationAPI } from "../../services/ApiService";
import { USD } from "../../exchange";
import CurrencyFormat from "react-currency-format";
import HistoryModal from "../HistoryModal/HistoryModal";

class IllustrationColumn extends Component {
    static contextType = HeaderContext;
    //Deleting Illustration
    deleteIllustration = async id => {
        const { i18n, lng } = this.context;
        console.log("delete called");
        let payload = {
            id: id
        };
        const resposnse = await illustrationAPI.deleteIllustration(payload);
        if (resposnse.status === 200) {
            message.info(
                `${i18n.t("misc.deletedSuccess", {
                    lng
                })}`
            );

            window.location.reload();
        }
    };
    render() {
        const { lng, i18n } = this.context;
        const { image, name, won, cumulativeSales, id } = this.props;
        return (
            <div
                className="illustration__product illustrationcardlink"
                id="brandioillustration"
            >
                <div className="illustration__image--outer">
                    <img
                        src={image}
                        className="illustation__row illustation__image"
                        alt="Product"
                    />
                </div>
                <span className="illustation__row illustation__title">
                    {name}
                </span>
                <span className="illustation__row illustation__price">
                    <CurrencyFormat
                        value={
                            lng === "kr"
                                ? `₩ ${won}`
                                : `$ ${(won * USD).toFixed(2)}`
                        }
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={lng === "kr" ? `₩ ` : `$ `}
                    />
                </span>
                <span className="illustation__row illustation__desp">
                    <HistoryModal
                        type="illustration"
                        id={id}
                        sales={cumulativeSales}
                    />
                </span>
                <Button
                    type="secondary"
                    className="mybrands__btn1"
                    onClick={e => this.deleteIllustration(id)}
                >
                    {i18n.t("brandioIllustration.delete", {
                        lng
                    })}
                    <img
                        src={require("../../assets/images/icon-delete.svg")}
                        alt="upload"
                        className="mybrand__delete__icon"
                    />
                </Button>
            </div>
        );
    }
}

export default IllustrationColumn;
