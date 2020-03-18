import React, { Component } from "react";
import { Typography, Table, Row, Col, Input } from "antd";
import "../assets/styles/messages.css";
import email from "../assets/images/email.png";
import moment from "moment";

import Pagination from "../components/Pagination";
import ChatModal from "../components/ChatModal";
import messageService from "../services/messages";

const { Column } = Table;
const { Title } = Typography;

function* nextUniqueKey() {
  var number = 1;
  while (true) {
    yield number++;
  }
}
let numberGenerator = nextUniqueKey();

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalConfig: {
        visible: false
      },
      pagination: {
        totalRecords: 0,
        currentPage: 1
      },
      loading: false,
      loginStatus: false
    };

    this.handlePagination = this.handlePagination.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    this.getMessages(1);
  }

  async getMessages(page) {
    const offset = (page - 1) * 10;
    this.setState({ loading: true });
    let messages = await messageService.messagesList(offset);
    this.setState({
      data: messages.response,
      pagination: {
        totalRecords: messages.totalRecords,
        currentPage: page
      },
      loading: false
    });
  }

  closeModal() {
    const modalConfig = { ...this.state.modalConfig };
    modalConfig.visible = false;
    this.setState({ modalConfig });
  }

  openModal(record) {
    const modalConfig = { ...this.state.modalConfig };
    modalConfig.visible = true;
    modalConfig.record = record;
    this.setState({ modalConfig });
  }

  handlePagination(page) {
    this.getMessages(page);
  }

  render() {
    return (
      <div className="message">
        <Row className="content-wrapper">
          <Col span={12}>
            <img style={{ marginRight: "20px", width: "30px" }} src={email} alt="Appointment" />
            <div style={{ display: "inline-block" }}>
              <Title type="secondary" bordered={false} level={4} style={{ color: "black", fontWeight: "500" }}>
                Message
              </Title>
            </div>
          </Col>
          <Col span={12}>
            <div className="message__search-input-wrapper">
              <Input
                style={{ width: "200px", float: "left", borderRadius: 0, border: "transparent" }}
                placeholder="Patient name"
                type="text"
                name="patientSearch"
              />
              <button className="message_searchBtn" onClick={this.searchPatient}>
                Search
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              className="message-table"
              pagination={false}
              dataSource={this.state.data}
              onRowClick={this.openModal}
              rowKey={() => numberGenerator.next().value}
              loading={this.state.loading}
            >
              <Column
                title=""
                className="column-header"
                dataIndex="seen"
                key="seen"
                render={seen => (seen ? "" : <span className="active-point" />)}
              />
              <Column
                title="Name"
                className="column-header"
                dataIndex="patient"
                key="patient"
                render={(patient, record) =>
                  record.seen ? (
                    <span className="normal-text">
                      {patient[0].firstName} {patient[0].lastName}
                    </span>
                  ) : (
                    <span>
                      {patient[0].firstName} {patient[0].lastName}
                    </span>
                  )
                }
              />
              <Column
                title="Message"
                className="column-header"
                dataIndex="message"
                key="message"
                render={(message, record) =>
                  record.status ? <span className="normal-text">{message}</span> : <span>{message}</span>
                }
              />
              <Column
                title="Received At"
                className="column-header"
                dataIndex="createdAt"
                key="createdAt"
                render={(createdAt, record) =>
                  record.status ? (
                    <span className="normal-text">{moment(createdAt).format("DD MMM YYYY")}</span>
                  ) : (
                    <span>{moment(createdAt).format("DD MMM YYYY")}</span>
                  )
                }
              />
            </Table>
          </Col>
        </Row>
        <Pagination
          changeHandler={this.handlePagination}
          current={this.state.pagination.currentPage}
          totalRecords={this.state.pagination.totalRecords}
        />

        {this.state.modalConfig.visible && (
          <ChatModal
            visible={this.state.modalConfig.visible}
            clickCancel={this.closeModal}
            data={this.state.modalConfig.record}
            online={this.state.loginStatus}
          />
        )}
      </div>
    );
  }
}

export default Messages;
