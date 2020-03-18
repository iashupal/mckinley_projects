import React, { Component } from "react";
import Cookies from "js-cookie";
import { artistAPI } from "../../services/ApiService";
import HeaderContext from "./../../context/HeaderContext";
import { List, Avatar, Icon, Collapse, Button, message, Empty } from "antd";
import "./Message.css";
import BrandioArtistListPcardEmail from "../BrandioArtistListProductCard/BrandioArtistListPcardEmail";
import Loader from "../../screens/Loader";

const { Panel } = Collapse;
const memberId = Cookies.get("member_id");

class Message extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeOpenKey: undefined,
            messages: [],
            reply: [],
            viewReply: false,
            loading: false
        };
    }

    static contextType = HeaderContext;

    async componentDidMount() {
        this.context.headerNameHandler("Brandio");
        this.setState({ loading: true });
        const response = await artistAPI.recivedMessage();
        if (response.status === 200) {
            this.setState({ messages: response.data.Data, loading: false });
        }
    }

    callback = async (key, mid) => {
        // console.log("callback called", mid);
        this.setState({
            activeOpenKey: key,
            reply: [],
            viewReply: false
        });
        const response = await artistAPI.replyList(mid);
        if (response.status === 200) {
            this.setState({ reply: response.data.Data, viewReply: true });
        } else {
            console.log("Something went wrong");
        }
    };
    parseDate = date => {
        let formattedDate = new Date(date);
        let fullDate = `${formattedDate.toLocaleDateString()} ${formattedDate.toLocaleTimeString()}`;
        return fullDate;
    };
    deleteMsg = async (id, senderId) => {
        const { i18n, lng } = this.context;
        let payload = {};
        if (parseInt(memberId) === senderId) {
            payload = {
                id: id,
                deletedBySender: "Yes",
                deletedByReceiver: ""
            };
        } else {
            payload = {
                id: id,
                deletedBySender: "",
                deletedByReceiver: "Yes"
            };
        }
        const response = await artistAPI.delMessage(payload);
        if (response.status === 200) {
            message.info(`${(i18n.t("misc.dltMsg"), { lng })}`);
            const data = await artistAPI.recivedMessage();
            if (data.status === 200) {
                this.setState({ messages: data.data.Data });
            }
        } else {
            message.info(`${(i18n.t("misc.wrong"), { lng })}`);
        }
    };
    //Get list of all reply on a particular message
    viewReply = async id => {
        const response = await artistAPI.replyList(id);
        if (response.status === 200) {
            this.setState({ reply: response.data.Data, viewReply: true });
        } else {
            console.log("Something went wrong");
        }
        //console.log("reply list", response);
    };
    replyList = () => {
        if (this.state.reply.length > 0) {
            return this.state.reply.map((reply, index) => {
                console.log("response", reply);
                return (
                    <div className="reply-block" style={{ marginTop: "20px" }}>
                        <Avatar
                            src={reply.senderProfileImg}
                            className="collapse__image"
                        />
                        <span className="reply-containt">
                            <div className="reply-sender-name">
                                {reply.senderNickName}
                                <span
                                    className="list__lname"
                                    style={{ paddingLeft: 20 }}
                                >
                                    {this.parseDate(reply.created_at)}
                                </span>
                            </div>
                            <div className="reply-message">{reply.message}</div>
                        </span>
                    </div>
                );
            });
        } else {
            return <div>No reply</div>;
        }
    };
    render() {
        const { activeOpenKey } = this.state;

        const webKit2Lines = {
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
        };

        const displayBlock = {
            display: "block"
        };

        const { lng, i18n } = this.context;

        // if (this.state.loading) {
        //   return <Loader />;
        // } else {
        return (
            <div
                className="div__menu__product illustaration__main__list"
                style={{ width: "100%" }}
            >
                <div className="collapse__list">
                    <div className="div__illustration__title">
                        {i18n.t("brandioMessage.myMsg", {
                            lng
                        })}
                    </div>
                    {this.state.loading ? (
                        <Loader />
                    ) : this.state.messages.length > 0 ? (
                        <List
                            className="messages__list__main animated fadeIn"
                            itemLayout="horizontal"
                            dataSource={this.state.messages}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                // src={item.receiverProfileImg}
                                                src={
                                                    memberId == item.sender_id
                                                        ? item.receiverProfileImg
                                                        : memberId ==
                                                          item.receiver_id
                                                        ? item.senderProfileImg
                                                        : ""
                                                }
                                                className="collapse__image"
                                                onClick={() =>
                                                    (window.location.href = `https://mydio.collartt.com/artist/${item.receiver_id}`)
                                                }
                                                style={{
                                                    cursor: "pointer"
                                                }}
                                            />
                                        }
                                        title={
                                            <div className="collapse__name__div">
                                                <span className="list__fname">
                                                    {memberId == item.sender_id
                                                        ? item.receiverNickame
                                                        : memberId ==
                                                          item.receiver_id
                                                        ? item.senderNickName
                                                        : ""}
                                                </span>
                                                <span className="list__lname">
                                                    {this.parseDate(
                                                        item.created_at
                                                    )}
                                                </span>
                                            </div>
                                        }
                                        description={
                                            <Collapse
                                                activeKey={activeOpenKey}
                                                onChange={e =>
                                                    this.callback(e, item.id)
                                                }
                                                bordered={false}
                                                expandIconPosition="right"
                                                className="brandio-message"
                                                expandIcon={({ isActive }) => (
                                                    <Icon
                                                        type="down"
                                                        rotate={
                                                            isActive ? 180 : 0
                                                        }
                                                        className="illustration__dropdown__expand__icon"
                                                    />
                                                )}
                                                accordion={true}
                                            >
                                                <Panel
                                                    key={item.created_at}
                                                    className="illustration__panel"
                                                    header={
                                                        <span
                                                            className="list__item-description"
                                                            style={
                                                                activeOpenKey !==
                                                                    undefined &&
                                                                activeOpenKey ===
                                                                    item.key
                                                                    ? displayBlock
                                                                    : webKit2Lines
                                                            }
                                                        >
                                                            {item.message}
                                                        </span>
                                                    }
                                                    isActive={true}
                                                >
                                                    {this.state.viewReply
                                                        ? this.replyList()
                                                        : null}
                                                    <div className="btn__collapse">
                                                        <BrandioArtistListPcardEmail
                                                            type={"reply"}
                                                            // name={
                                                            //     item.senderNickName
                                                            // }
                                                            name={
                                                                parseInt(
                                                                    memberId
                                                                ) ===
                                                                item.sender_id
                                                                    ? item.receiverNickame
                                                                    : item.senderNickName
                                                            }
                                                            artistId={
                                                                parseInt(
                                                                    memberId
                                                                ) ===
                                                                item.sender_id
                                                                    ? item.receiver_id
                                                                    : item.sender_id
                                                            }
                                                            // thumb={
                                                            //     item.senderProfileImg
                                                            // }
                                                            thumb={
                                                                parseInt(
                                                                    memberId
                                                                ) ===
                                                                item.sender_id
                                                                    ? item.receiverProfileImg
                                                                    : item.senderProfileImg
                                                            }
                                                            parentId={item.id}
                                                        />

                                                        <Button
                                                            type="default"
                                                            icon="delete"
                                                            className="btn-grey-icon"
                                                            onClick={e =>
                                                                this.deleteMsg(
                                                                    item.id,
                                                                    item.sender_id
                                                                )
                                                            }
                                                        >
                                                            {i18n.t(
                                                                "brandioMessage.delete",
                                                                { lng }
                                                            )}
                                                        </Button>
                                                    </div>
                                                </Panel>
                                            </Collapse>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    ) : (
                        <Empty
                            style={{
                                width: "100%",
                                marginTop: "100px"
                            }}
                            description="There are no message"
                        />
                    )}
                </div>
            </div>
        );
        // }
    }
}

export default Message;
