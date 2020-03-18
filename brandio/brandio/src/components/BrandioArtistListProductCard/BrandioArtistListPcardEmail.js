import React from "react";
import { Modal, Input, message, Button } from "antd";
import HeaderContext from "../../context/HeaderContext";
import { artistAPI } from "../../services/ApiService";
import Cookies from "js-cookie";

import "antd/lib/modal/style/index.css";
import "antd/lib/button/style/index.css";
import "antd/lib/input/style/index.css";

const memberId = Cookies.get("member_id");
// Message field
const { TextArea } = Input;

class BrandioArtistListPcardEmail extends React.Component {
    state = { visible: false, loading: false, value: "" };
    static contextType = HeaderContext;
    //Message field
    onChange = ({ target: { value } }) => {
        this.setState({ value: value });
    };

    // Modal
    showModal = () => {
        const { i18n, lng } = this.context;
        let receiverId = this.props.artistId;

        if (this.props.type === "artistPage") {
            if (receiverId === parseInt(memberId)) {
                // message.info(`${(i18n.t("misc.selfMsg"), { lng })}`);
                message.info(
                    `${i18n.t("misc.selfMsg", {
                        lng
                    })}`
                );
            } else {
                this.setState({
                    visible: true
                });
            }
        } else {
            this.setState({
                visible: true
            });
        }
    };

    handleOk = async e => {
        const { i18n, lng } = this.context;
        console.log("submit handler", this.state);
        let payload = {
            receiverId: this.props.artistId,
            message: this.state.value,
            parentId: this.props.type === "reply" ? this.props.parentId : 0
        };
        console.log("paylaod", payload);
        let response = await artistAPI.sendMessage(payload);
        if (response.status === 200) {
            //alert("sent msg");
            message.info(
                `${i18n.t("misc.sentMsg", {
                    lng
                })}`
            );
            // message.info(`${(i18n.t("misc.sentMsg"), { lng })}`);
            this.setState({
                visible: false
            });
        } else {
            // alert("else");
            message.info(
                `${i18n.t("misc.wrong", {
                    lng
                })}`
            );
            //message.info(`${(i18n.t("misc.wrong"), { lng })}`);
        }
    };

    handleCancel = e => {
        this.setState({
            visible: false
        });
    };

    render() {
        const { value } = this.state;
        const { lng, i18n } = this.context;
        return (
            <div>
                {this.props.type === "reply" ? (
                    <Button
                        type="default"
                        icon="edit"
                        className="btn-grey-icon"
                        onClick={this.showModal}
                    >
                        {i18n.t("brandioMessage.reply", { lng })}
                    </Button>
                ) : (
                    <img
                        src={require("../../assets/images/icon-email.svg")}
                        alt="Email"
                        onClick={this.showModal}
                        className="email"
                    />
                )}

                <Modal
                    className="emailmodal"
                    title=""
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText={`${i18n.t("brandioArtist.sendBtn", { lng })}`}
                >
                    <div className="brandioartistlistpcard__avatarbox">
                        <img
                            src={this.props.thumb}
                            alt="avatar"
                            className="brandio-avatar brandioartistlistpcard__avatar"
                            width={50}
                        />

                        <label className="brandioartistlistpcard__name">
                            {this.props.name}
                        </label>
                    </div>

                    <TextArea
                        value={value}
                        onChange={this.onChange}
                        placeholder={`${i18n.t("brandioArtist.msgPlcHolder", {
                            lng
                        })}`}
                        autosize={{ minRows: 10, maxRows: 5 }}
                        className="emailmessage"
                    />
                </Modal>
            </div>
        );
    }
}

export default BrandioArtistListPcardEmail;
