import React, { Component } from "react";
import { Drawer, Form, Button, Col, Row, Select, Input, message, DatePicker } from "antd";
import { POST_PURCHASE_REWARD_URL } from "../utils/endpoints";
import axios from "axios";
import moment from "moment";
const { Option } = Select;
class EventDiscountRaw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      eventDiscount: {}
    };
  }

  handleTextChange = e => {
    let eventDiscount = this.state.eventDiscount;
    eventDiscount[e.target.name] = e.target.value;
    this.setState({ eventDiscount });
  };

  handleDateChange = (date, dateString) => {
    const eventDiscount = this.state.eventDiscount;
    eventDiscount["codeExpiryDate"] = moment(date).toISOString();
    this.setState({ eventDiscount });
  };

  handleSubmit = () => {
    const token = localStorage.getItem("token");
    let eventDiscount = this.state.eventDiscount;
    if (this.props.mode === "edit") {
      axios
        .post(
          POST_PURCHASE_REWARD_URL,
          {
            eventId: eventDiscount._id,
            age: eventDiscount.age,
            sex: eventDiscount.sex,
            discountCode: eventDiscount.discountCode,
            discountPercent: eventDiscount.discountPercent,
            codeExpiryDate: eventDiscount.codeExpiryDate
          },
          {
            headers: {
              Authorization: token
            }
          }
        )
        .then(res => {
          message.success("Event discount created successfully!");
          window.location.reload();
        })
        .catch(err => {
          message.error(err.response.data.response);
        });
    } else {
    }
  };
  UNSAFE_componentWillReceiveProps(props) {
    if (props.mode === "edit") {
      this.setState({ eventDiscount: props.entry });
    }
  }

  render() {
    const { visible, hideForm, mode } = this.props;
    return (
      <div>
        {mode === "new" ? (
          <Drawer title="Add a event discount" width={720} onClose={hideForm} visible={visible} />
        ) : (
          <Drawer
            title={`Add event discount ${this.state.eventDiscount && this.state.eventDiscount._id}`}
            width={720}
            onClose={hideForm}
            visible={visible}
            entry={this.state.entry}
          >
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Age">
                    <Input
                      placeholder="Please enter your age"
                      onChange={this.handleTextChange}
                      name="age"
                      value={this.state.eventDiscount.age}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Gender">
                    <Select
                      placeholder="Please select your gender"
                      value={this.state.eventDiscount.sex}
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
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Discount Percentage">
                    <Input
                      placeholder="Please enter discount percent 10% to 100%"
                      onChange={this.handleTextChange}
                      name="discountPercent"
                      value={this.state.eventDiscount.discountPercent}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Discount Code">
                    <Input
                      placeholder="Please enter discount code"
                      onChange={this.handleTextChange}
                      name="discountCode"
                      value={this.state.eventDiscount.discountCode}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Expiry Date">
                    <DatePicker
                      style={{ width: "100%" }}
                      getPopupContainer={trigger => trigger.parentNode}
                      onChange={this.handleDateChange}
                      value={moment(this.state.eventDiscount.codeExpiryDate)}
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

const EventDiscount = Form.create()(EventDiscountRaw);
export default EventDiscount;
