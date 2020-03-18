import React, { Component, Fragment } from "react";
import ProductList from "./ProductList";
import { Button, message } from "antd";
import HeaderContext from "./../../context/HeaderContext";
import { collaborationAPI } from "../../services/ApiService";
import HistoryModal from "../HistoryModal/HistoryModal";
import DetailsModal from "./DetailsModal";
import { USD } from "../../exchange";
import CurrencyFormat from "react-currency-format";

class SingleProduct extends Component {
    static contextType = HeaderContext;
    productAction = async (id, type) => {
        let payload = {};
        if (type === "ACCEPT" || type === "REJECT") {
            payload.id = id;
            payload.status = type === "ACCEPT" ? "Accepted" : "Rejected";
            let status = await collaborationAPI.requestAcceptReject(payload);
            if (status.status === 200) {
                message.info("Action processed successfully");
                setTimeout(() => {
                    window.location.href = "/myinfo/mybrands";
                });
            }
        }
        if (type === "DELETE") {
            payload.id = id;

            let status = await collaborationAPI.deleteProduct(payload);
            if (status.status === 200) {
                message.info("Product has been deleted");
                setTimeout(() => {
                    window.location.href = "/myinfo/mybrands";
                });
            }
        }
    };

    render() {
        const { productName, productPrice, component, sales } = this.props;
        const { lng, i18n } = this.context;
        return (
            <div className="white-bg productcardlink">
                <ProductList {...this.props} />
                <div
                    className={`product__info ${
                        component === "mybrand"
                            ? "product__mybrand--padding"
                            : ""
                    }`}
                >
                    <div
                        className={
                            component === "mybrand"
                                ? "sub__div__mybrands__info"
                                : "sub__div__product__info"
                        }
                    >
                        {component !== "mybrand" && (
                            <Fragment>
                                <div className="mybrands__title">
                                    {productName}
                                </div>
                                <div className="mybrands__row mybrands__desp">
                                    <CurrencyFormat
                                        value={
                                            lng === "kr"
                                                ? `₩ ${productPrice}`
                                                : `$ ${(
                                                      productPrice * USD
                                                  ).toFixed(2)}`
                                        }
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={lng === "kr" ? `₩ ` : `$`}
                                    />
                                </div>
                                <div className="mybrands__row mybrands__desp">
                                    {this.props.status === "Accepted" ? (
                                        <a
                                            href={`http://fandio.collartt.com/product/${this.props.id}/collaboration`}
                                        >
                                            +{" "}
                                            {i18n.t(
                                                "productDetail.productDetail",
                                                { lng }
                                            )}
                                        </a>
                                    ) : (
                                        <DetailsModal
                                            exportedImages={
                                                this.props.exportedImages
                                            }
                                        />
                                    )}
                                </div>
                                <div className="mybrands__row mybrands__desp">
                                    <HistoryModal
                                        id={this.props.id}
                                        productId={this.props.productId}
                                        sales={this.props.sales}
                                    />
                                    <span className="mybrands__sales"></span>
                                </div>
                                <div className="mybrands__row">
                                    {this.props.status === "Accepted" ? (
                                        <div
                                            style={{
                                                color: "#6319ff",
                                                fontSize: "12px"
                                            }}
                                        >
                                            {i18n.t("misc.currentlySelling", {
                                                lng
                                            })}
                                        </div>
                                    ) : (
                                        <div className="mybrands__desp">
                                            {i18n.t("misc.awaiting", { lng })}
                                        </div>
                                    )}
                                </div>

                                <div className="mybrands__row">
                                    <Button
                                        type="secondary"
                                        className="mybrands__btn1"
                                        onClick={() =>
                                            this.productAction(
                                                this.props.id,
                                                "DELETE"
                                            )
                                        }
                                    >
                                        {i18n.t("brandioIllustration.delete", {
                                            lng
                                        })}
                                        <img
                                            src={require("../../assets/images/icon-delete.svg")}
                                            alt="delete"
                                            className="mybrand__delete__icon"
                                        />
                                    </Button>
                                </div>
                            </Fragment>
                        )}
                        {component === "mybrand" && (
                            <Fragment>
                                <div className="mybrands__row mybrands__desp">
                                    <span className="mybrands__sales"></span>
                                </div>

                                <div className="mybrands__row">
                                    {component !== "mybrand" && (
                                        <Fragment>
                                            <div className="product__title product__title--bold">
                                                {productName}
                                            </div>
                                            <div className="product__title">
                                                <CurrencyFormat
                                                    value={
                                                        lng === "kr"
                                                            ? `₩ ${productPrice}`
                                                            : `$ ${(
                                                                  productPrice *
                                                                  USD
                                                              ).toFixed(2)}`
                                                    }
                                                    displayType={"text"}
                                                    thousandSeparator={true}
                                                    prefix={
                                                        lng === "kr"
                                                            ? `₩ `
                                                            : `$`
                                                    }
                                                />
                                            </div>
                                        </Fragment>
                                    )}
                                    {component === "mybrand" && (
                                        <Fragment>
                                            <div className="mybrands__title">
                                                {productName}
                                            </div>
                                            <div className="mybrands__row mybrands__desp">
                                                <CurrencyFormat
                                                    value={
                                                        lng === "kr"
                                                            ? `₩ ${productPrice}`
                                                            : `$ ${(
                                                                  productPrice *
                                                                  USD
                                                              ).toFixed(2)}`
                                                    }
                                                    displayType={"text"}
                                                    thousandSeparator={true}
                                                    prefix={
                                                        lng === "kr"
                                                            ? `₩ `
                                                            : `$`
                                                    }
                                                />
                                            </div>
                                            <div className="mybrands__row mybrands__desp">
                                                {this.props.status ===
                                                "Accepted" ? (
                                                    <a
                                                        href={`http://fandio.collartt.com/product/${this.props.id}/collaboration`}
                                                    >
                                                        +{" "}
                                                        {i18n.t(
                                                            "productDetail.productDetail",
                                                            { lng }
                                                        )}
                                                    </a>
                                                ) : (
                                                    <DetailsModal
                                                        exportedImages={
                                                            this.props
                                                                .exportedImages
                                                        }
                                                    />
                                                )}
                                            </div>
                                            <div className="mybrands__row mybrands__desp">
                                                <HistoryModal
                                                    id={this.props.id}
                                                    productId={
                                                        this.props.productId
                                                    }
                                                    sales={
                                                        this.props.sales *
                                                        this.props.productPrice
                                                    }
                                                />
                                                <span className="mybrands__sales"></span>
                                            </div>

                                            {this.props.status ===
                                            "Accepted" ? (
                                                <div className="mybrands__row">
                                                    <Button
                                                        type="secondary"
                                                        className="mybrands__btn1"
                                                        onClick={() =>
                                                            this.productAction(
                                                                this.props.id,
                                                                "DELETE"
                                                            )
                                                        }
                                                    >
                                                        {i18n.t(
                                                            "brandioIllustration.delete",
                                                            {
                                                                lng
                                                            }
                                                        )}
                                                        <img
                                                            src={require("../../assets/images/icon-delete.svg")}
                                                            alt="delete"
                                                            className="mybrand__delete__icon"
                                                        />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="mybrands__row">
                                                    <Button
                                                        type="secondary"
                                                        className="mybrands__btn1"
                                                        onClick={() =>
                                                            this.productAction(
                                                                this.props.id,
                                                                "REJECT"
                                                            )
                                                        }
                                                    >
                                                        {i18n.t(
                                                            "brandioIllustration.delete",
                                                            {
                                                                lng
                                                            }
                                                        )}
                                                        <img
                                                            src={require("../../assets/images/icon-delete.svg")}
                                                            alt="delete"
                                                            className="mybrand__delete__icon"
                                                        />
                                                    </Button>
                                                    <br />
                                                    <div
                                                        type="secondary"
                                                        className="mybrands__btn-check"
                                                        onClick={() =>
                                                            this.productAction(
                                                                this.props.id,
                                                                "ACCEPT"
                                                            )
                                                        }
                                                    >
                                                        <span
                                                            style={{
                                                                color: "#9A6EF7"
                                                            }}
                                                        >
                                                            {i18n.t(
                                                                "misc.approve",
                                                                {
                                                                    lng
                                                                }
                                                            )}
                                                        </span>
                                                        <img
                                                            src={require("../../assets/images/icon-checkmark.svg")}
                                                            alt="delete"
                                                            className="mybrand__checkmark__icon"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </Fragment>
                                    )}

                                    {component === "mycollaboration" && (
                                        <Fragment>
                                            <div className="mybrands__row mybrands__desp">
                                                <CurrencyFormat
                                                    value={
                                                        lng === "kr"
                                                            ? `₩ ${productPrice}`
                                                            : `$ ${(
                                                                  productPrice *
                                                                  USD
                                                              ).toFixed(2)}`
                                                    }
                                                    displayType={"text"}
                                                    thousandSeparator={true}
                                                    prefix={
                                                        lng === "kr"
                                                            ? `₩ `
                                                            : `$`
                                                    }
                                                />
                                            </div>
                                            <div className="mybrands__row mybrands__desp">
                                                <DetailsModal
                                                    exportedImages={
                                                        this.props
                                                            .exportedImages
                                                    }
                                                />
                                            </div>
                                            <div className="mybrands__row mybrands__desp">
                                                <HistoryModal
                                                    id={this.props.id}
                                                    productId={
                                                        this.props.productId
                                                    }
                                                    sales={this.props.sales}
                                                />
                                                <span className="mybrands__sales"></span>
                                            </div>
                                            {this.props.status ===
                                            "Accepted" ? (
                                                <div className="mybrands__row">
                                                    <Button
                                                        type="secondary"
                                                        className="mybrands__btn1"
                                                        onClick={() =>
                                                            this.productAction(
                                                                this.props.id,
                                                                "DELETE"
                                                            )
                                                        }
                                                    >
                                                        삭제하기
                                                        <img
                                                            src={require("../../assets/images/icon-delete.svg")}
                                                            alt="delete"
                                                            className="mybrand__delete__icon"
                                                        />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="mybrands__row">
                                                    <Button
                                                        type="secondary"
                                                        className="mybrands__btn1"
                                                        onClick={() =>
                                                            this.productAction(
                                                                this.props.id,
                                                                "REJECT"
                                                            )
                                                        }
                                                    >
                                                        삭제하기
                                                        <img
                                                            src={require("../../assets/images/icon-delete.svg")}
                                                            alt="delete"
                                                            className="mybrand__delete__icon"
                                                        />
                                                    </Button>

                                                    <div
                                                        type="secondary"
                                                        className="mybrands__btn-check"
                                                        onClick={() =>
                                                            this.productAction(
                                                                this.props.id,
                                                                "ACCEPT"
                                                            )
                                                        }
                                                    >
                                                        <span
                                                            style={{
                                                                color: "#9A6EF7"
                                                            }}
                                                        >
                                                            삭제하기
                                                        </span>
                                                        <img
                                                            src={require("../../assets/images/icon-checkmark.svg")}
                                                            alt="delete"
                                                            className="mybrand__checkmark__icon"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </Fragment>
                                    )}
                                </div>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default SingleProduct;
