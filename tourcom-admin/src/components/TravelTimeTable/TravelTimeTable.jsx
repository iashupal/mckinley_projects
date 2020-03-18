import React from "react";
import { Row, Form, Col, TimePicker, Select, Input, Icon } from "antd";
// import moment from "moment";
const { Option } = Select;

class TravelTimeTable extends React.Component {
  constructor(props) {
    console.log("props---", props);
    super(props);
    this.state = {
      country: null,
      city: null,
      date: null,
      days: null,
      night: null,
      accomodation: null,
      transport: null,
      theme: null,
      author: null,
      time: null,
      place: null,
      label: null,
      purchase: null,
      cost: null,
      loading: false,
      previewVisible: false,
      previewImage: "",
      article: {}
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onSelectSearch = this.onSelectSearch.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
  }
  handleSelectChange(value) {
    console.log(`selected ${value}`);
  }

  onSelectSearch(val) {
    console.log("search:", val);
  }
  onTimeChange(time, timeString) {
    console.log(time, timeString);
  }

  remove = id => {
    // call parent function from here
    this.props.cbRemove(id);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {/* <Form> */}
        <Row gutter={24}>
          <Col span={3}>
            <Form.Item label="Date">
              {getFieldDecorator("date", {
                rules: [{ required: true, message: "Enter date" }]
              })(<Input placeholder="Enter date" name="date" type="date" size="default" />)}
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label="Start Time">
              {getFieldDecorator("time", {
                rules: [{ required: true, message: "Please pick Time" }]
              })(<TimePicker use12Hours format="h:mm a" onChange={this.onTimeChange} />)}
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label="Place">
              {getFieldDecorator("place", {
                rules: [{ required: true, message: "Enter Place" }]
              })(<Input placeholder="Enter Place" name="place" size="default" />)}
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label="Transportation">
              {getFieldDecorator("transport", {
                rules: [{ required: true, message: "Select transport" }]
              })(
                <Select
                  placeholder="Please select Transportation"
                  onSearch={this.onSelectSearch}
                  onChange={this.handleSelectChange}
                  style={{ width: "100%" }}
                >
                  <Select.Option value="Car">Car</Select.Option>
                  <Select.Option value="Airplane">Airplane</Select.Option>
                  <Select.Option value="Boat">Boat</Select.Option>
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label="Label">
              {getFieldDecorator("label", {
                rules: [{ required: true, message: "Enter label" }]
              })(<Input placeholder="Enter label" min={0} name="label" size="default" />)}
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label="Purchased Item">
              {getFieldDecorator("purchase", {
                rules: [{ required: true, message: "Enter purchased item" }]
              })(<Input placeholder="Enter purchased item" min={0} name="purchased_item" size="default" />)}
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item label="Cost">
              {getFieldDecorator("cost", {
                rules: [{ required: true, message: "Enter cost" }]
              })(<Input placeholder="Enter purchased item" min={0} name="cost" size="default" />)}
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item>
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.remove(this.props.childData)}
                style={{ cursor: "pointer" }}
              />
            </Form.Item>
          </Col>
        </Row>
        {/* </Form> */}
      </div>
    );
  }
}
export default Form.create({ name: "travelTimeTable" })(TravelTimeTable);
