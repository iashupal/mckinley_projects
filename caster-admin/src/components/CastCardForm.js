import React, { Component } from "react";
import { Drawer, Form, Button, Col, Row, Input, Select, message, Divider } from "antd";
import { PATCH_FAQ_URL, POST_CAST_URL } from "../utils/endpoints";
import axios from "axios";
const { Option } = Select;

class CastCardFormRaw extends Component {
  state = {
    visible: false,
    banner: {}
  };

  handleTextChange = e => {
    let banner = this.state.banner;
    if (e.target.name === "phone") {
      banner[e.target.name] = Number(e.target.value);
    } else {
      banner[e.target.name] = e.target.value;
    }
    this.setState({ banner });
  };

  handleSubmit = () => {
    const token = localStorage.getItem("token");
    let banner = this.state.banner;
    console.log(banner);

    if (this.props.mode === "new") {
      axios
        .post(
          POST_CAST_URL,
          {
            ...banner
          },
          {
            headers: {
              Authorization: token
            }
          }
        )
        .then(res => {
          message.success("Banner created successfully!");
          window.location.reload();
        })
        .catch(err => {
          message.error(err.response.data.response);
        });
    } else {
      axios
        .patch(
          PATCH_FAQ_URL + "?id=" + this.props.entry,
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
          message.success("Faq updated successfully!");
          window.location.reload();
        })
        .catch(err => {
          message.error(err.response.data.response);
        });
    }
  };

  componentWillReceiveProps(props) {
    if (props.mode === "edit") {
      this.setState({ user: props.entry });
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, hideForm, mode, entry } = this.props;
    return (
      <div>
        {mode === "new" ? (
          <Drawer title="Add a new Faq" width={720} onClose={hideForm} visible={visible}>
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="SelectAnswer">
                    {getFieldDecorator("answer", {
                      rules: [{ required: true, message: "Please select correct answer" }]
                    })(
                      <Select
                        placeholder="Please select correct answer"
                        value={this.state.faq.tag}
                        onChange={value =>
                          this.handleTextChange({
                            target: {
                              name: "tag",
                              value: value
                            }
                          })
                        }
                      >
                        <Select.Option value="Web Series">Web Series</Select.Option>
                        <Select.Option value="Hot Issue">Hot Issue</Select.Option>
                      </Select>
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
                Cancel
              </Button>
              <Divider type="vertical" />
              <Button onClick={this.handleSubmit} type="primary">
                Submit
              </Button>
            </div>
          </Drawer>
        ) : (
          <Drawer
            title={`Edit details ${this.state.faq && this.state.faq.title}`}
            width={720}
            onClose={hideForm}
            visible={visible}
            entry={this.state.entry}
          >
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="SelectAnswer">
                    {getFieldDecorator("answer", {
                      rules: [{ required: true, message: "Please select correct answer" }]
                    })(
                      <Select
                        placeholder="Please select correct answer"
                        value={this.state.faq.tag}
                        onChange={value =>
                          this.handleTextChange({
                            target: {
                              name: "tag",
                              value: value
                            }
                          })
                        }
                      >
                        <Select.Option value="Web Series">Web Series</Select.Option>
                        <Select.Option value="Hot Issue">Hot Issue</Select.Option>
                      </Select>
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
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} type="primary">
                Submit
              </Button>
            </div>
          </Drawer>
        )}
      </div>
    );
  }
}

const CastCardForm = Form.create()(CastCardFormRaw);
export default CastCardForm;
