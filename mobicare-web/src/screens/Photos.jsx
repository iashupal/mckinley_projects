import React, { Component, Fragment } from "react";
import { Row, Col, Typography, Button } from "antd";

import "../assets/styles/photos.css";
import human from "../assets/images/human.png";
import PhotoContainer from "../components/photos/PhotoContainer";
import Pagination from "../components/Pagination";
import PhotoViewer from "../components/photos/PhotoViewer";
import imageService from "../services/images";

const { Title } = Typography;

class Photos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalConfig: {
        showModal: false,
        photo: null
      },
      photos: [],
      pagination: {
        totalRecords: 0,
        currentPage: 1
      }
    };

    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleImageClose = this.handleImageClose.bind(this);
    this.handleImageNext = this.handleImageNext.bind(this);
    this.handleImagePrev = this.handleImagePrev.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  componentDidMount() {
    this.getImages(1);
  }

  async getImages(page) {
    //const offset = (page - 1) * 20;
    let patientId = this.props.match.params.patientId;
    if (this.props.match.params) {
      patientId = this.props.match.params.patientId;
    }
    let images = await imageService.imageList(patientId);

    this.setState({
      photos: images.response,
      pagination: {
        totalRecords: images.totalRecord,
        currentPage: page
      }
    });
  }

  handleImageClick(index) {
    let modalConfig = { ...this.state.modalConfig };
    modalConfig.showModal = true;
    modalConfig.photo = this.state.photos[index];
    modalConfig.index = index;
    this.setState({
      modalConfig
    });
  }

  handleImageClose() {
    let modalConfig = { ...this.state.modalConfig };
    modalConfig.showModal = false;
    modalConfig.photo = null;
    modalConfig.index = null;
    this.setState({
      modalConfig
    });
  }

  handleImageNext(currentIndex) {
    if (currentIndex < this.state.photos.length - 1) {
      let modalConfig = { ...this.state.modalConfig };
      modalConfig.showModal = true;
      modalConfig.photo = this.state.photos[currentIndex + 1];
      modalConfig.index = currentIndex + 1;
      this.setState({
        modalConfig
      });
    } else {
      this.handleImageClose();
    }
  }

  handleImagePrev(currentIndex) {
    if (currentIndex > 0) {
      let modalConfig = { ...this.state.modalConfig };
      modalConfig.showModal = true;
      modalConfig.photo = this.state.photos[currentIndex - 1];
      modalConfig.index = currentIndex - 1;
      this.setState({
        modalConfig
      });
    } else {
      this.handleImageClose();
    }
  }

  handlePagination(page) {
    this.getAppointment(page);
  }

  render() {
    console.log(this.state.pagination, this.state.modalConfig.photo);
    return (
      <Fragment>
        <Row className="content-wrapper">
          <Col span={12}>
            {/* <Title className="left-text" type="secondary" level={4}>
              Photos
            </Title> */}
            <Col span={2}>
              <img style={{ width: "25px", marginRight: "10px" }} src={human} alt="Human" />
            </Col>
            <Col span={12}>
              <strong style={{ fontSize: "18px", color: "black", lineHeight: 1 }}>Photos</strong>
              <div style={{ fontSize: "12px" }}>images</div>
            </Col>
          </Col>
          <Col span={12}>
            <div className="content-title-right">
              {/* <Button type="primary" shape="round" className="right-text"> */}
              <strong>{this.state.pagination.totalRecords}</strong> Image
              {this.state.pagination.totalRecords > 1 && "s"}
              {/* </Button> */}
            </div>
          </Col>
        </Row>
        <div className="custom-row" gutter={30}>
          {this.state.photos.map((photo, index) => (
            <PhotoContainer
              key={"photo-container" + index}
              photoUrl={photo.imageURL}
              date={photo.updatedAt}
              index={index}
              clickHandler={this.handleImageClick}
            />
          ))}
        </div>
        <Pagination
          changeHandler={this.handlePagination}
          current={this.state.pagination.currentPage}
          totalRecords={this.state.pagination.totalRecords}
          pageSize={15}
        />
        {this.state.modalConfig.showModal && (
          <PhotoViewer
            photo={this.state.modalConfig.photo}
            index={this.state.modalConfig.index}
            showModal={this.state.modalConfig.showModal}
            clickClose={this.handleImageClose}
            clickNext={this.handleImageNext}
            clickPrev={this.handleImagePrev}
          />
        )}
      </Fragment>
    );
  }
}

export default Photos;
