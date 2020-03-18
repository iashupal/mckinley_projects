import React, { Component } from "react";
import { Modal, Input, Typography, message, Row } from "antd";
import PropTypes from "prop-types";
import "../assets/styles/chat-modal.css";
import { Scrollbars } from "react-custom-scrollbars";
import moment from "moment";
import messageService from "../services/messages";
import { getDoctorId } from "../utils/auth";

const { Text } = Typography;

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    // backgroundColor: `#ff9e1a`,
     backgroundColor: `#C0C0C0`,
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

class ChatModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messageList: [],
      doctorId: null,
      patientId: null,
      patientName: null,
      patientStatus: "Offline",
      loginStatus: null
    };

    this.offset = 0;
    this.currentPosition = 0;

    this.handleInput = this.handleInput.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.getChatMessages = this.getChatMessages.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.checkScroll = this.checkScroll.bind(this);
  }

  componentDidMount() {
    let name = `${this.props.data.patient[0].firstName} ${this.props.data.patient[0].lastName}`;
    this.setState(
      {
        patientId: this.props.data.patientId,
        doctorId: getDoctorId(),
        patientName: name
      },
      () => this.getChatMessages(this.offset, true)
    );
  }

  async getChatMessages(offset, scrollBottomTo) {
    let messagesResponse = await messageService.getChatMessages(
      this.state.patientId,
      offset
    );
    let updateSeen = await messageService.updateSeen(this.state.patientId);
    console.log("update", updateSeen);
    console.log(messagesResponse.patientLoginStatus);
    this.setState({ loginStatus: messagesResponse.patientLoginStatus });
    let messages = messagesResponse.response;
    if (messages.length > 0) {
      messages = messages.reverse();
      let oldMessage = [...this.state.messageList];
      const messageList = messages.concat(oldMessage);
      this.setState({ messageList }, () => {
        if (scrollBottomTo) this.scrollBar.scrollToBottom();
      });
    }
  }

  handleInput(event) {
    this.setState({ message: event.target.value });
  }

  componentDidUpdate() {
    if (this.currentPosition > 0) {
      this.scrollBar.scrollTop(
        this.scrollBar.getValues().scrollHeight - this.currentPosition - 30
      );
    }
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      this.sendMessage();
    }
  }

  async sendMessage() {
    if (this.state.message) {
      let isSend = await messageService.sendMessage({
        doctorId: this.state.doctorId,
        patientId: this.state.patientId,
        sentBy: "doctor",
        message: this.state.message
      });

      const messages = JSON.parse(JSON.stringify(this.state.messageList));
      messages.push({
        sentBy: "doctor",
        message: this.state.message,
        seen: false
      });

      this.setState({
        messageList: messages,
        message: ""
      });
      this.scrollBar.scrollToBottom();
      if (isSend.status !== 1) {
        message.error(isSend.response);
        const messages = JSON.parse(JSON.stringify(this.state.messageList));
        messages.push({
          sentBy: "doctor",
          message: this.state.message,
          seen: false
        });
        this.setState({
          messageList: messages
        });
      }
    }
  }

  checkScroll(event) {
    const dimentions = this.scrollBar.getValues();
    console.log(111111111, dimentions);
    if (dimentions.top === 0) {
      this.currentPosition = dimentions.scrollHeight;
      console.log(dimentions);
      this.offset += 20;
      this.getChatMessages(this.offset, false);
    }
  }

  render() {
    const { visible, clickCancel } = this.props;
    return (
      <Modal
        style={{ backgroundColor: "white" }}
        className="chat-modal"
        title={
          <div className="chatName">
            <img src="/images/profile.jpg" alt="Patient" />
            <div className="details">
              <div className="profile-name">{this.state.patientName}</div>
              <Text className="action" type="warning">
                {this.state.loginStatus === null
                  ? "Loading"
                  : this.state.loginStatus
                  ? "Online"
                  : "Offline"}
              </Text>
            </div>
          </div>
        }
        visible={visible}
        onCancel={clickCancel}
        centered={true}
        footer={
          <div className="footer-chat">
            <Input
              onChange={this.handleInput}
              onKeyDown={this.keyPress}
              name="message"
              value={this.state.message}
              placeholder="Type Your message here..."
            />
            <div className="send-circle" onClick={this.sendMessage}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M4.01 6.03l7.51 3.22-7.52-1 .01-2.22m7.5 8.72L4 17.97v-2.22l7.51-1M2.01 3L2 10l15 2-15 2 .01 7L23 12 2.01 3z" />
              </svg>
            </div>
          </div>
        }
      >
        <div className="chat-container">
          <Scrollbars
            renderThumbVertical={renderThumb}
            style={{ height: 300 }}
            ref={e => (this.scrollBar = e)}
            onScrollStop={this.checkScroll}
          >
            <div className="right-box">
              {this.state.messageList.map(msg =>
                msg.sentBy === "patient" ? (
                  <Row className="left-container">
                    <div className="time">
                      {this.state.patientName},{" "}
                      {moment(msg.createdAt).isBefore(
                        moment().subtract(1, "days")
                      )
                        ? moment(msg.createdAt).format("YYYY-MMM-DD, HH:MM")
                        : moment(msg.createdAt).fromNow()}
                    </div>
                    <div className="box">
                      <span>{msg.message}</span>
                    </div>
                  </Row>
                ) : msg.sentBy === "doctor" ? (
                  <Row className="right-container">
                    <div className="time">
                      {moment(msg.createdAt).isBefore(
                        moment().subtract(1, "days")
                      )
                        ? moment(msg.createdAt).format("YYYY-MMM-DD, HH:MM")
                        : moment(msg.createdAt).fromNow()}
                    </div>
                    <div className="box">
                      <span>{msg.message}</span>
                    </div>
                  </Row>
                ) : null
              )}
            </div>
          </Scrollbars>
        </div>
      </Modal>
    );
  }
}

ChatModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  clickCancel: PropTypes.func.isRequired
};

export default ChatModal;
