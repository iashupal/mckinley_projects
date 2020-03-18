import React, { Component } from "react";
import { Drawer, Form, Button, Col, Row, Input, message, DatePicker, Divider } from "antd";
import { PUT_EVENT_SPONSORED_URL, POST_EVENT_SPONSORED_URL } from "../utils/endpoints";
import axios from "axios";
import moment from "moment";

class EventFormRaw extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            events: {},
            file: null
        };
        this.handlefileChange = this.handlefileChange.bind(this);
    }


    handleTextChange = e => {
        let events = this.state.events;
        events[e.target.name] = e.target.value;
        this.setState({ events });
    };

    handleDateChange = (date, dateString) => {
        const events = this.state.events;
        events["dateTime"] = moment(date).toISOString();
        this.setState({ events });
    };

    handlefileChange(e) {
        this.setState({ file: e.target.files[0] });
    }

    handleSubmit = () => {
        const token = localStorage.getItem("token");
        let events = this.state.events;
        var formData = new FormData();
        if (this.state.file) {
            formData.append("eventImage", this.state.file);
        }
        formData.append("eventImage", this.state.file);
        formData.append("imgIndexes", 0);
        formData.append("Title", events.Title);
        formData.append("Previous_Price", events.Previous_Price);
        formData.append("PriceNow", events.PriceNow);
        formData.append("Location", events.Location);
        formData.append("dateTime", events.dateTime);
        formData.append("Capacity", events.Capacity);
        formData.append("Details", events.Details);
        formData.append("hashTags", events.hashTags);
        formData.append("eventSection", events.eventSection);
        formData.append("id", events._id);
        if (this.props.mode === "new") {
            axios
              .post(
                  POST_EVENT_SPONSORED_URL, formData,
                {
                  headers: {
                    Authorization: token,
                    "Content-Type": "multipart/form-data"
                  }
                }
              )
              .then(res => {
                message.success("Sponsored event created successfully!");
                window.location.reload();
              })
              .catch(err => {
                message.error(err.response.data.response);
              });
        } else {
            axios
                .put(
                    PUT_EVENT_SPONSORED_URL,
                    formData,
                    {
                        headers: {
                            Authorization: token,
                            "Content-Type": "multipart/form-data"
                        }
                    }
                )
                .then(res => {
                    message.success("Sponsored event updated successfully!");
                    window.location.reload();
                })
                .catch(err => {
                    message.error(err.response);
                });
        }
    };

    UNSAFE_componentWillReceiveProps(props) {
        if (props.mode === "edit") {
            this.setState({ events: props.entry });
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { visible, hideForm, mode } = this.props;
        return (
            <div>
                {mode === "new" ? (
                    <Drawer title="Add a new sponsored event" width={720} onClose={hideForm} visible={visible}>
                        <Form layout="vertical" hideRequiredMark>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Title">
                                        {getFieldDecorator("Title", {
                                            rules: [{ required: true, message: "Please enter title" }]
                                        })(
                                            <Input
                                                placeholder="Please enter title"
                                                onChange={this.handleTextChange}
                                                name="Title"
                                                value={this.state.events.Title}
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Previous Price">
                                        {getFieldDecorator("Previous_Price", {
                                            rules: [{ required: true, message: "Please enter previous price" }]
                                        })(
                                            <Input
                                                placeholder="Please enter previous price"
                                                onChange={this.handleTextChange}
                                                name="Previous_Price"
                                                type="number"
                                                value={this.state.events.Previous_Price}
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Price Now">
                                        {getFieldDecorator("PriceNow", {
                                            rules: [{ required: true, message: "Please enter current price" }]
                                        })(
                                            <Input
                                                placeholder="Please enter current price"
                                                onChange={this.handleTextChange}
                                                name="PriceNow"
                                                type="number"
                                                value={this.state.events.PriceNow}
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Location">
                                        {getFieldDecorator("Location", {
                                            rules: [{ required: true, message: "Please enter location" }]
                                        })(
                                            <Input
                                                placeholder="Please enter location"
                                                onChange={this.handleTextChange}
                                                name="Location"
                                                value={this.state.events.Location}
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="DateTime">
                                        {getFieldDecorator("dateTime", {
                                            rules: [{ required: true, message: "Please enter dateTime" }]
                                        })(
                                            <DatePicker
                                                style={{ width: "100%" }}
                                                getPopupContainer={trigger => trigger.parentNode}
                                                onChange={this.handleDateChange}
                                                value={moment(this.state.events.dateTime)}
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Select image">
                                        {getFieldDecorator("eventImage", {
                                            rules: [{ required: true, message: "Please select image" }]
                                        })(
                                            <Input
                                                onChange={this.handlefileChange}
                                                name="eventImage"
                                                type="file"
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Capacity">
                                        {getFieldDecorator("Capacity", {
                                            rules: [{ required: true, message: "Please enter capacity" }]
                                        })(
                                            <Input
                                                placeholder="Please enter capacity"
                                                onChange={this.handleTextChange}
                                                name="Capacity"
                                                value={this.state.events.Capacity}
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Details">
                                        {getFieldDecorator("Details", {
                                            rules: [{ required: true, message: "Please enter details" }]
                                        })(
                                            <Input
                                                placeholder="Please enter details"
                                                onChange={this.handleTextChange}
                                                name="Details"
                                               
                                                value={this.state.events.Details}
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="HashTags">
                                        {getFieldDecorator("hashTags", {
                                            rules: [{ required: true, message: "Please enter hash tags" }]
                                        })(
                                            <Input
                                                placeholder="Please enter hash tags"
                                                onChange={this.handleTextChange}
                                                name="hashTags"
                                                value={this.state.events.hashTags}
                                            />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Event Section">
                                        {getFieldDecorator("eventSection", {
                                            rules: [{
                                                required: true, message: "Please enter event section" }]
                                        })(
                                            <Input
                                                placeholder="Please enter event section"
                                                onChange={this.handleTextChange}
                                                name="eventSection"
                                                
                                                value={this.state.events.eventSection}
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
                            title={`Edit details ${this.state.events && this.state.events.Title}`}
                            width={720}
                            onClose={hideForm}
                            visible={visible}
                            entry={this.state.entry}
                        >
                            <Form layout="vertical" hideRequiredMark>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="Select image">
                                                <Input
                                                    onChange={this.handlefileChange}
                                                    name="eventImage"
                                                    type="file"
                                                    
                                                />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Title">
                                            <Input
                                                placeholder="Please enter title"
                                                value={this.state.events && this.state.events.Title}
                                                name="Title"
                                                onChange={this.handleTextChange}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="Previous Price">
                                                <Input
                                                    placeholder="Please enter previous price"
                                                    onChange={this.handleTextChange}
                                                    name="Previous_Price"
                                                    type="number"
                                                    value={this.state.events.Previous_Price}
                                                />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Current Price">
                                            <Input
                                                placeholder="Please enter current price"
                                                onChange={this.handleTextChange}
                                                name="PriceNow"
                                                type="number"
                                                value={this.state.events.PriceNow}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="Location">
                                            <Input
                                                placeholder="Please enter location"
                                                onChange={this.handleTextChange}
                                                name="Location"
                                                value={this.state.events.Location}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="DateTime">
                                            <DatePicker
                                                style={{ width: "100%" }}
                                                getPopupContainer={trigger => trigger.parentNode}
                                                onChange={this.handleDateChange}
                                                value={moment(this.state.events.dateTime)}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="Capacity">
                                            <Input
                                                placeholder="Please enter capacity"
                                                onChange={this.handleTextChange}
                                                name="Capacity"
                                                value={this.state.events.Capacity}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Details">
                                            <Input
                                                placeholder="Please enter details"
                                                onChange={this.handleTextChange}
                                                name="Details"
                                                value={this.state.events.Details}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="Hashtags">
                                            <Input
                                                placeholder="Please enter hash tags"
                                                onChange={this.handleTextChange}
                                                name="hashTags"
                                                value={this.state.events.hashTags}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Event Section">
                                            <Input
                                                placeholder="Please enter event section"
                                                onChange={this.handleTextChange}
                                                name="eventSection"
                                                value={this.state.events.eventSection}
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

const EventForm = Form.create()(EventFormRaw);
export default EventForm;