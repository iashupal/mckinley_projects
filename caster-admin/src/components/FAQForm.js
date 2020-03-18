import React, { Component } from "react";
import { Drawer, Form, Button, Col, Row, Input, message, Divider } from "antd";
import { PUT_FAQ_URL, POST_FAQ_URL } from "../utils/endpoints";
import axios from "axios";

class FAQFormRaw extends Component {
  state = {
    visible: false,
    faq: {}
  };

  refresh = () => {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  handleTextChange = e => {
    let faq = this.state.faq;
    if (e.target.name === "phone") {
      faq[e.target.name] = Number(e.target.value);
    } else {
      faq[e.target.name] = e.target.value;
    }
    this.setState({ faq });
  };

  handleSubmit = () => {
    const token = localStorage.getItem("token");
    let faq = this.state.faq;
    console.log(faq);

    if (this.props.mode === "new") {
      axios
        .post(
          POST_FAQ_URL,
          {
            ...faq
          },
          {
            headers: {
              Authorization: token
            }
          }
        )
        .then(res => {
          message.success("Faq created successfully!");
          this.refresh();
        })
        .catch(err => {
          message.error(err.response.data.response);
        });
    } else {
      axios
        .put(
          PUT_FAQ_URL + "?id=" + this.props.entry._id,
          {
            ...faq,
            // id: faq._id
          },
          {
            headers: {
              Authorization: token
            }
          }
        )
        .then(res => {
          message.success("Faq updated successfully!");
          this.refresh();
        })
        .catch(err => {
          message.error(err.response.data.response);
        });
    }
  };

  componentWillReceiveProps(props) {
    if (props.mode === "edit") {
      this.setState({ faq: props.entry });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, hideForm, mode } = this.props;
    return (
      <div>
        {mode === "new" ? (
          <Drawer title="새로운 FAQ" width={720} onClose={hideForm} visible={visible}>
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="표제">
                    {getFieldDecorator("title", {
                      rules: [{ required: true, message: "제목을 입력하십시오" }]
                    })(
                      <Input
                        placeholder="제목을 입력하십시오"
                        onChange={this.handleTextChange}
                        name="title"
                        value={this.state.faq.title}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="함유량">
                    {getFieldDecorator("content", {
                      rules: [{ required: true, message: "내용을 입력" }]
                    })(
                      <Input
                        placeholder="내용을 입력"
                        onChange={this.handleTextChange}
                        name="content"
                        value={this.state.faq.content}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "100%",
                borderTop: "1px solid #e9e9e9",
                padding: "10px 16px",
                background: "#fff",
                textAlign: "right"
              }}
            >
              <Button onClick={hideForm} style={{ marginRight: 8 }}>
                취소
              </Button>
              <Divider type="vertical" />
              <Button onClick={this.handleSubmit} type="primary">
                제출
              </Button>
            </div>
          </Drawer>
        ) : (
            <Drawer
              title={`편집하다 ${this.state.faq.title}`}
              width={720}
              onClose={hideForm}
              visible={visible}
              entry={this.state.entry}
            >
              <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="표제">
                      <Input
                        placeholder="제목을 입력하십시오"
                        value={this.state.faq.title}
                        name="title"
                        onChange={this.handleTextChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="함유량">
                      <Input
                        placeholder="내용을 입력"
                        value={this.state.faq.content}
                        name="content"
                        onChange={this.handleTextChange}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  width: "100%",
                  borderTop: "1px solid #e9e9e9",
                  padding: "10px 16px",
                  background: "#fff",
                  textAlign: "right"
                }}
              >
                <Button onClick={hideForm} style={{ marginRight: 8 }}>
                  취소
              </Button>
                <Button onClick={this.handleSubmit} type="primary">
                  제출
              </Button>
              </div>
            </Drawer>
          )}
      </div>
    );
  }
}

const FAQForm = Form.create()(FAQFormRaw);
export default FAQForm;
