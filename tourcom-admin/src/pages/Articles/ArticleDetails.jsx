import React, { Component } from "react";
import { Card, Form, Row, Input, Button, Col, Table } from "antd";
import ArticleInfo from "../../components/ArticleDetail/ArticleInfo";
import article from "../../assets/images/article.jpeg";
import axios from "axios";
import { ARTICLE_DETAIL_URL } from "../../utils/endpoints";
import "./style.css";

class ArticleDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      obj: {}
    };
  }
  componentDidMount() {
    const { articleID } = this.props.match.params;
    const token = localStorage.getItem("token");
    let urlpoint = ARTICLE_DETAIL_URL + articleID;
    this.setState({ loading: true });
    axios
      .get(urlpoint, {
        headers: {
          "x-access-token": token
        }
      })
      .then(res => {
        console.log("articleDetail :", res.data);
        this.setState({ obj: res.data });
      });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    // const articleDetail = [
    //   {
    //     id: 0,
    //     articleID: "1234",
    //     articleAuthorName: "Felix King",
    //     articleAuthorId: "1234",
    //     articleCountry: "India",
    //     articleCity: "Delhi",
    //     articleDate: "26 September, 2019",
    //     articleDays: "2",
    //     articleNights: "1",
    //     articleAccomodation: "India",
    //     articleTransportation: "Metro",
    //     articleTheme: "Theme",
    //     articleAuthor: "Felix",
    //     articleTravelTime: "4 Hours",
    //     articleTravelPlace: "Delhi",
    //     articleTravelTransportation: "Metro",
    //     articleTravelLabel: "Label",
    //     articleTravelPurchase: "5000",
    //     articleTravelCost: "2000",
    //     src: article
    //   }
    // ];

    return (
      <div>
        <div style={{ margin: "10px 0" }}>
          <Card title="여행 상품 글">
            <p>Id : {this.state.obj.id}</p>
            <p>TravelCity : {this.state.obj.city}</p>
            <p>Theme : {this.state.obj.theme}</p>
            <p>TravelDate : {this.state.obj.date}</p>
            <p>TravelTransportation : {this.state.obj.transportation}</p>
            <p>TravelId : {this.state.obj.userId}</p>
            <p>TravelAccomodation : {this.state.obj.accomodation}</p>
            <p>TravelCity : {this.state.obj.city}</p>
            <p>TravelCountry : {this.state.obj.country}</p>
            <p>CreatedAt : {this.state.obj.createAt}</p>
            <div style={{ margin: "20px 0" }}>
              <Row gutter={24}>
                <h2 style={{ fontWeight: "bold" }}>Title</h2>
                <table className="table_articleDetail">
                  <thead>
                    <tr>
                      <th>Country</th>
                      <th>City</th>
                      <th>Date</th>
                      <th>Days</th>
                      <th>Nights</th>
                      <th>Accomodation</th>
                      <th>Transportation</th>
                      <th>Theme</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>India</td>
                      <td>Delhi</td>
                      <td>2018/11/3</td>
                      <td>2</td>
                      <td>1</td>
                      <td>Hotel</td>
                      <td>Car</td>
                      <td>Couple's Trip</td>
                    </tr>
                  </tbody>
                </table>
              </Row>
            </div>
            <div style={{ margin: "20px 0" }}>
              <Row gutter={24}>
                <h2 style={{ fontWeight: "bold" }}>Travel Timetable</h2>
                <table className="table_articleDetail">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Start time</th>
                      <th>Place</th>
                      <th>Transportation</th>
                      <th>Label</th>
                      <th>Purchased item</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2018/11/3</td>
                      <td>8:30</td>
                      <td>Restaurant</td>
                      <td>Car</td>
                      <td>Departure</td>
                      <td>Family room</td>
                      <td>5,000</td>
                    </tr>
                  </tbody>
                </table>
              </Row>
            </div>
            <div style={{ margin: "20px 0" }}>
              <Row gutter={24}>
                <h2 style={{ fontWeight: "bold" }}>Review</h2>
                <p style={{ border: "1px solid #dddddd", padding: "15px" }}>Review</p>
              </Row>
            </div>
          </Card>
        </div>
        <div style={{ margin: "10px 0" }}>
          <Card title="여행 상품 글">
            <p>Like</p>
            <Form>
              <Form.Item label="Comment">
                {getFieldDecorator("Days", {
                  rules: [{ required: true, message: "Enter comment" }]
                })(<Input placeholder="Enter comment" min={0} name="comment" size="default" />)}
              </Form.Item>
            </Form>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" size="large">
                회원가입
              </Button>
            </Form.Item>
          </Card>
        </div>
      </div>
    );
  }
}
export default Form.create({ name: "articleComment" })(ArticleDetails);
