import React, { Component } from "react";
import { Card, Form, Row, Col, Select, Upload, Icon, message, Modal, Input, Button } from "antd";
import { CREATE_ARTICLE_URL } from "../../utils/endpoints";
import axios from "axios";
import ReviewEditor from "../../components/ReviewEditor";
import TravelTimeTable from "../../components/TravelTimeTable/TravelTimeTable";
const { Option } = Select;

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }
let id = 0;
class ArticleForm extends Component {
  constructor(props) {
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
      article: {},
      inputList: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onSelectSearch = this.onSelectSearch.bind(this);
  }

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const inputList = this.state.inputList;
    this.setState({
      inputList: inputList.concat(<TravelTimeTable key={inputList.length} />)
    });
  };

  // handleTextChange = e => {
  //   let article = this.state.article;
  //   article[e.target.name] = e.target.value;
  //   this.setState({ article });
  // };

  handleSelectChange(value) {
    console.log(`selected ${value}`);
  }

  onSelectSearch(val) {
    console.log("search:", val);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log("Received values of form: ", values);
        console.log("Merged values:", keys.map(key => names[key]));
      }
    });
    const token = localStorage.getItem("token");
    this.setState({ loading: true });
    axios
      .post(
        CREATE_ARTICLE_URL,
        { ...this.state.createArticle, userType: "article" },
        {
          headers: {
            "x-access-token": token
          }
        }
      )
      .then(res => {
        message.success("Article created successfully!");
        window.location.reload();
      })
      .catch(err => {
        message.error(err.response.data.response);
      });
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const { getFieldDecorator, getFieldValue } = this.props.form;

    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");
    const formItems = keys.map((k, index) => (
      <Form.Item
        // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? "Passengers" : ""}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ["onChange", "onBlur"],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input passenger's name or delete this field."
            }
          ]
        })(<Input placeholder="passenger name" style={{ width: "20%", marginRight: 8 }} />)}
        {keys.length > 1 ? (
          <Icon className="dynamic-delete-button" type="minus-circle-o" onClick={() => this.remove(k)} />
        ) : null}
      </Form.Item>
    ));
    return (
      // <TravelTimeTable />
      <Card title="여행 후기 등록">
        <Form>
          {/* title */}
          <Row gutter={24}>
            <h2 style={{ marginLeft: "10px", fontWeight: "bold" }}>Title</h2>
            <Col span={3}>
              <Form.Item label="Country">
                {getFieldDecorator("country", {
                  rules: [{ required: true, message: "Please select country name" }]
                })(
                  <Select
                    placeholder="Please select Country"
                    onSearch={this.onSelectSearch}
                    onChange={this.handleSelectChange}
                    style={{ width: "100%" }}
                    // Option = {options}
                  >
                    <Select.Option value="Afganistan">Afganistan</Select.Option>
                    <Select.Option value="Albania">Albania</Select.Option>
                    <Select.Option value="Algeria">Algeria</Select.Option>
                    <Select.Option value="Andorra">Andorra</Select.Option>
                    <Select.Option value="Angola">Angola</Select.Option>
                    <Select.Option value="India">India</Select.Option>
                    <Select.Option value="America">America</Select.Option>
                    <Select.Option value="Australia">Australia</Select.Option>
                    <Select.Option value="Korea">Korea</Select.Option>
                    <Select.Option value="Japan">Japan</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="City">
                {getFieldDecorator("city", {
                  rules: [{ required: true, message: "Please select city name" }]
                })(
                  <Select
                    placeholder="Please select City"
                    onSearch={this.onSelectSearch}
                    onChange={this.handleSelectChange}
                    style={{ width: "100%" }}
                  >
                    <Select.Option value="Busan">Busan</Select.Option>
                    <Select.Option value="Daegu">Daegu</Select.Option>
                    <Select.Option value="Incheon">Incheon</Select.Option>
                    <Select.Option value="Andorra">Andorra</Select.Option>
                    <Select.Option value="Gwangju">Gwangju</Select.Option>
                    <Select.Option value="Daejeon">Daejeon</Select.Option>
                    <Select.Option value="Sejong">Sejong</Select.Option>
                    <Select.Option value="Seoul">Seoul</Select.Option>
                    <Select.Option value="Ulsan">Ulsan</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="Date">
                {getFieldDecorator("date", {
                  rules: [{ required: true, message: "Enter date" }]
                })(<Input placeholder="Enter date" name="date" type="date" size="default" />)}
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="Days">
                {getFieldDecorator("Days", {
                  rules: [{ required: true, message: "Enter days" }]
                })(<Input placeholder="Enter days" min={0} name="days" type="number" size="default" />)}
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="Night">
                {getFieldDecorator("night", {
                  rules: [{ required: true, message: "Enter nights" }]
                })(<Input placeholder="Enter nights" min={0} name="night" type="number" size="default" />)}
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item label="Accomodation">
                {getFieldDecorator("accomodation", {
                  rules: [{ required: true, message: "Select accomodation" }]
                })(
                  <Select
                    placeholder="Please select Accomodation"
                    onSearch={this.onSelectSearch}
                    onChange={this.handleSelectChange}
                    style={{ width: "100%" }}
                  >
                    <Select.Option value="Hotel">Hotel</Select.Option>
                    <Select.Option value="Bnb">Bnb</Select.Option>
                    <Select.Option value="Hostel">Hostel</Select.Option>
                    <Select.Option value="Motel">Motel</Select.Option>
                  </Select>
                )}
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
              <Form.Item label="Theme">
                {getFieldDecorator("theme", {
                  rules: [{ required: true, message: "Select theme" }]
                })(
                  <Select
                    placeholder="Please select Theme"
                    onSearch={this.onSelectSearch}
                    onChange={this.handleSelectChange}
                    style={{ width: "100%" }}
                  >
                    <Select.Option value="Friendship">Friendship</Select.Option>
                    <Select.Option value="Family">Family</Select.Option>
                    <Select.Option value="Couple">Couple</Select.Option>
                    <Select.Option value="Education">Education</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          {/* Travel Time Table */}
          <Row gutter={24}>
            <h2 style={{ marginLeft: "10px", fontWeight: "bold" }}>Travel TimeTable</h2>
            {/* {formItems} */}
            <Col span={24}>
              <Form.Item>
                <Button type="dashed" onClick={this.add}>
                  <Icon type="plus" /> Add field
                </Button>
              </Form.Item>
              {this.state.inputList.map(function(input, index) {
                return input;
              })}
            </Col>
          </Row>
          {/* Review */}
          <Row gutter={24}>
            <h2 style={{ marginLeft: "10px", fontWeight: "bold" }}>Review</h2>
            <ReviewEditor />
          </Row>
          <div style={{ marginTop: "20px" }}>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" size="large">
                회원가입
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    );
  }
}
export default Form.create({ name: "articleForm" })(ArticleForm);
