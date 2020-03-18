import React from "react";
import { Modal, Empty, Icon } from "antd";
import { collaborationAPI, illustrationAPI } from "../../services/ApiService";
import moment from "moment";
import { USD } from "../../exchange";
import CurrencyFormat from "react-currency-format";
import "./../HistoryModal/HistoryModal.css";
import HeaderContext from "../../context/HeaderContext";

class HistoryModal extends React.Component {
    state = { visible: false, loading: false, data: [] };
    async componentDidMount() {}
    static contextType = HeaderContext;
    showModal = async () => {
        this.setState({
            visible: true
        });
        if (this.props.type === "illustration") {
            let status = await illustrationAPI.salesHistory(this.props.id);
            if (status.status === 200) {
                this.setState({ data: status.data.Data, loading: true });
            }
        } else {
            let status = await collaborationAPI.salesHistory(
                this.props.productId,
                this.props.id
            );
            if (status.status === 200) {
                this.setState({ data: status.data.Data, loading: true });
            }
        }
    };

    handleOk = e => {
        this.setState({
            visible: false
        });
    };
    renderRow = () => {
        const { lng, i18n } = this.context;
        if (this.state.data.length > 0) {
            return this.state.data.map((data, index) => {
                return (
                    <tr>
                        <td
                            style={{
                                width: "50%",
                                color: "#787878",
                                fontWeight: "normal"
                            }}
                        >
                            {this.props.type === "illustration"
                                ? data.user_nickname
                                : data.order_id}
                        </td>
                        <td
                            style={{
                                width: "50%",
                                color: "#787878",
                                fontWeight: "normal"
                            }}
                        >
                            <span>
                                {this.props.type === "illustration"
                                    ? `${moment(data.used_at).format(
                                          "YYYY-DD-MM HH:mm"
                                      )}`
                                    : `${moment(data.order_date).format(
                                          "YYYY-DD-MM HH:mm"
                                      )}`}
                            </span>
                        </td>
                    </tr>
                );
            });
        } else {
            return <span>{i18n.t("misc.noHistory", { lng })}</span>;
        }
    };
    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    render() {
        const { lng, i18n } = this.context;
        console.log("sales recived", this.props.sales);
        return (
            <div id="reviewmodalbtn">
                <span onClick={this.showModal}>
                    + {i18n.t("brandioIllustration.cumulativeSales", { lng })}{" "}
                    <strong>
                        {/* {lng === "kr"
                            ? `원 ${this.props.sales} `
                            : `$ ${(this.props.sales * USD).toFixed(2)} `} */}

                        {/* {this.props.sales} */}
                        <CurrencyFormat
                            value={
                                lng === "kr"
                                    ? `₩ ${this.props.sales}`
                                    : `$ ${(this.props.sales * USD).toFixed(2)}`
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={lng === "kr" ? `₩ ` : `$ `}
                        />
                    </strong>
                </span>
                <Modal
                    title={`${i18n.t("misc.salesHisory", {
                        lng
                    })}`}
                    footer={null}
                    visible={this.state.visible}
                    onOk={false}
                    onCancel={this.handleCancel}
                    className="productdetail__reviewmodal"
                >
                    {this.state.loading ? (
                        <React.Fragment>
                            {this.state.loading &&
                            this.state.data.length > 0 ? (
                                <table className="historytable">
                                    <tr>
                                        <th
                                            style={{
                                                width: "50%",
                                                color: "#2D2D2D",
                                                fontWeight: "bold",
                                                marginTop: "10px",
                                                marginBottom: "10px"
                                            }}
                                        >
                                            {i18n.t("misc.id", {
                                                lng
                                            })}
                                        </th>
                                        <th
                                            style={{
                                                width: "50%",
                                                color: "#2D2D2D",
                                                fontWeight: "bold",
                                                marginTop: "10px",
                                                marginBottom: "10px"
                                            }}
                                        >
                                            {i18n.t("misc.dateTime", {
                                                lng
                                            })}
                                        </th>
                                    </tr>
                                    {this.renderRow()}
                                </table>
                            ) : (
                                <Empty>
                                    {i18n.t("misc.noData", {
                                        lng
                                    })}
                                </Empty>
                            )}
                        </React.Fragment>
                    ) : (
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr",
                                gridTemplateRows: "1fr",
                                height: "100px"
                            }}
                        >
                            <div
                                style={{
                                    justifySelf: "center",
                                    alignSelf: "center"
                                }}
                            >
                                <Icon
                                    type="loading"
                                    spin
                                    style={{
                                        color: "var(--han-purple)",
                                        fontSize: "20px"
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        );
    }
}

export default HistoryModal;
