import React, { Fragment, Component } from "react";
import {
    Upload,
    Icon,
    Checkbox,
    message,
    Divider,
    Input,
    Skeleton,
    Modal
} from "antd";
import "antd/lib/button/style/index.css";
import "antd/lib/upload/style/index.css";
import "./../assets/css/BrandioPcIllustrationUpload.css";
import "./../assets/css/BrandioProductCreateTwo.css";

//Import component
import Header from "../components/Header/Header";
import HeaderContext from "../context/HeaderContext";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { paymentsAPI } from "../services/ApiService";
import CurrencyFormat from "react-currency-format";
import moment from "moment";

class Withdrawal extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            amount: 0,
            disableButton: false,
            withdrawalAmount: null,
            historyModalVisible: false,
            history: []
        };
    }
    static contextType = HeaderContext;

    toggleHistoryModal = () =>
        this.setState({ historyModalVisible: !this.state.historyModalVisible });

    async componentDidMount() {
        this.setState({ loading: true });
        let amount = await paymentsAPI.getIncome();
        amount = Number(amount.data.Data.income_KR);
        let history = await paymentsAPI.getLedger();
        this.setState({ amount, loading: false, history: history.data.Data });
    }

    handleAmountChange = e => {
        this.setState({ withdrawalAmount: Number(e.target.value) });
        if (Number(e.target.value) > Number(this.state.amount)) {
            this.setState({ disableButton: true });
        }
    };

    submitRequest = async () => {
        const { i18n, lng } = this.context;
        if (this.state.withdrawalAmount === null) {
            return message.error(`${i18n.t("misc.enterWithdrawAmt", { lng })}`);
        }
        if (this.state.withdrawalAmount > this.state.amount) {
            message.error(`${i18n.t("misc.higherWithdrawAmt", { lng })}`);
        } else {
            let response = await paymentsAPI.applyForWithdawal({
                amount: Number(this.state.withdrawalAmount)
            });
            if (response.status === 200) {
                message.success(`${i18n.t("misc.withdrawReqSbmt", { lng })}`);
                setTimeout(() => {
                    window.location.href = "/myinfo/mybrands";
                }, 2000);
            }
        }
    };

    render() {
        const { lng, i18n } = this.context;
        return (
            <Fragment>
                <div className="container item--1 wrapper">
                    <Header />
                </div>
                <div className="container item--2">
                    <div className="wrapper">
                        <Navbar />
                    </div>
                </div>
                <div className="container item--4">
                    <div className="wrapper">
                        <div className="bpcillustrationupload">
                            <div className="brandioproductcreate__top">
                                <div className="brandioproductcreate__headingbox">
                                    <h4 className="brandioproductcreate__headingbox--main">
                                        {i18n.t("misc.applyWithdrawl", { lng })}
                                    </h4>
                                    <p className="brandioproductcreate__headingbox--sub">
                                        {i18n.t("misc.checkRevenue", { lng })}
                                    </p>
                                </div>
                                <h5 className="bpcillustrationupload__heading">
                                    {i18n.t("misc.yourRevenue", { lng })}
                                </h5>
                                <h1
                                    style={{
                                        color: "rgb(98, 108, 226)",
                                        cursor: "pointer"
                                    }}
                                    onClick={this.toggleHistoryModal}
                                >
                                    {this.state.loading ? (
                                        <Skeleton
                                            avatar={false}
                                            paragraph={false}
                                            active
                                        />
                                    ) : (
                                        <CurrencyFormat
                                            value={this.state.amount}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            prefix={"₩ "}
                                        />
                                    )}
                                </h1>
                                <Divider />
                                <p>{i18n.t("misc.withdrawAmt", { lng })}</p>
                                <br />
                                <br />
                                <div className="bpcillustrationupload__contentboxx">
                                    <div className="bpcillustrationupload__contentbox--value">
                                        <input
                                            type="number"
                                            name="price"
                                            className="primary-input"
                                            onChange={this.handleAmountChange}
                                            value={this.state.withdrawalAmount}
                                        />
                                        <span className="ml-20">원</span>
                                    </div>

                                    <br />
                                    <br />
                                </div>
                                <div
                                    className="bpcillustrationupload__submitboxx"
                                    style={{ marginBottom: "50px" }}
                                >
                                    <button
                                        className="btn btn-tertitary"
                                        onClick={this.submitRequest}
                                    >
                                        {i18n.t("misc.withdrawReq", { lng })}
                                    </button>
                                    <Modal
                                        visible={this.state.historyModalVisible}
                                        footer={null}
                                        onCancel={this.toggleHistoryModal}
                                    >
                                        <p>
                                            {i18n.t("misc.transHistory", {
                                                lng
                                            })}
                                        </p>
                                        <Divider />
                                        {this.state.history.map(his => (
                                            <Fragment>
                                                {his.reason ===
                                                    "illustration_used" && (
                                                    <p>
                                                        {i18n.t(
                                                            "misc.illustratnWorth1",
                                                            { lng }
                                                        )}{" "}
                                                        <strong>
                                                            ₩ {his.amount}
                                                        </strong>{" "}
                                                        {i18n.t(
                                                            "misc.illustratnWorth2",
                                                            { lng }
                                                        )}{" "}
                                                        {moment(
                                                            his.created_at
                                                        ).format("DD-MM-YYYY")}
                                                    </p>
                                                )}
                                                {his.reason ===
                                                    "individual_product_revenue" && (
                                                    <p>
                                                        {i18n.t(
                                                            "misc.individualHeading1",
                                                            { lng }
                                                        )}{" "}
                                                        <strong>
                                                            {his.product_name}
                                                        </strong>{" "}
                                                        {i18n.t(
                                                            "misc.individualHeading2",
                                                            { lng }
                                                        )}{" "}
                                                        <strong>
                                                            ₩ {his.amount}
                                                        </strong>{" "}
                                                        {i18n.t(
                                                            "misc.individualHeading3",
                                                            { lng }
                                                        )}{" "}
                                                        {moment(
                                                            his.created_at
                                                        ).format("DD-MM-YYYY")}
                                                    </p>
                                                )}
                                                {his.reason ===
                                                    "collaboration_share" && (
                                                    <p>
                                                        {i18n.t(
                                                            "misc.collaborationHeading1",
                                                            { lng }
                                                        )}{" "}
                                                        <strong>
                                                            ₩ {his.amount}
                                                        </strong>{" "}
                                                        {i18n.t(
                                                            "misc.collaborationHeading2",
                                                            { lng }
                                                        )}{" "}
                                                        <strong>
                                                            {his.product_name}
                                                        </strong>{" "}
                                                        {i18n.t(
                                                            "misc.collaborationHeading3",
                                                            { lng }
                                                        )}{" "}
                                                        {moment(
                                                            his.created_at
                                                        ).format("DD-MM-YYYY")}
                                                    </p>
                                                )}

                                                <Divider />
                                            </Fragment>
                                        ))}
                                    </Modal>
                                </div>
                                <div className="container item--10">
                                    <div className="wrapper">
                                        <Footer />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Withdrawal;
