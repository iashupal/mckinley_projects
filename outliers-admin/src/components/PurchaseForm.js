import React, { Component } from "react";
import { Drawer, Form, Button, Col, Row, Input, message, Select, Divider } from "antd";
import { POST_PURCHASE_REWARD_URL } from "../utils/endpoints";
import axios from "axios";

const { Option } = Select;

class PurchaseFormRaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      rewards: {}
    };
  }

  handleTextChange = e => {
    let rewards = this.state.rewards;
    rewards[e.target.name] = e.target.value;
    this.setState({ rewards });
  };

  handleSubmit = () => {
    const token = localStorage.getItem("token");
    let rewards = this.state.rewards;
    if (this.props.mode === "new") {
      axios
        .post(
          POST_PURCHASE_REWARD_URL,
          { ...rewards },
          {
            headers: {
              Authorization: token
            }
          }
        )
        .then(res => {
          message.success("Clover created successfully!");
          window.location.reload();
        })
        .catch(err => {
          message.error(err.response.data.response);
        });
    } else {
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, hideForm, mode } = this.props;
    return (
      <div>
        {mode === "new" ? (
          <Drawer title="Add Reward" width={720} onClose={hideForm} visible={visible}>
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="No. of clovers">
                    {getFieldDecorator("clovers", {
                      rules: [{ required: true, message: "Please enter no. of clover" }]
                    })(
                      <Input
                        placeholder="Please enter no. of clover"
                        onChange={this.handleTextChange}
                        name="clovers"
                        type="number"
                        value={this.state.rewards.clovers}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Age">
                    {getFieldDecorator("age", {
                      rules: [{ required: true, message: "Please enter your age" }]
                    })(
                      <Input
                        placeholder="Please enter your age"
                        onChange={this.handleTextChange}
                        name="age"
                        type="number"
                        value={this.state.rewards.age}
                      />
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Gender">
                    {getFieldDecorator("sex", {
                      rules: [{ required: true, message: "Please enter your gender" }]
                    })(
                      <Select
                        placeholder="Please select your gender"
                        value={this.state.rewards.sex}
                        onChange={value =>
                          this.handleTextChange({
                            target: {
                              name: "sex",
                              value: value
                            }
                          })
                        }
                      >
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
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
            title={`Edit details ${this.state.rewards && this.state.rewards.Title}`}
            width={720}
            onClose={hideForm}
            visible={visible}
            entry={this.state.entry}
          />
        )}
      </div>
    );
  }
}

const PurchaseForm = Form.create()(PurchaseFormRaw);
export default PurchaseForm;
