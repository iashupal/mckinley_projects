import React, { Component, Fragment } from "react";
import { Menu, message } from "antd";
import "./../assets/css/BrandioCollaborationList.css";
import "./../assets/css/CardAcceptReject.css";

// Import Components
import HeaderContext from "../context/HeaderContext";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import PcardBrand from "../components/ProductCard/PcardBrand";
import { collaborationAPI } from "../services/ApiService";
import Loader from "../screens/Loader";

class CardAcceptReject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    };
  }
  static contextType = HeaderContext;
  async componentDidMount() {
    this.context.headerNameHandler("Brandio");
    let productId = this.props.computedMatch.params.reqId;
    let productDetail = await collaborationAPI.collborationRequest(productId);
    console.log("list of request", productDetail);
    if (productDetail.status === 200) {
      this.setState({ data: productDetail.data.Data, isLoading: false });
    }
  }

  renderCollaboration(requests) {
    if (requests.length > 0) {
      return requests.map(data => {
        return (
          <div className="brandio-ar-card productcardlink">
            <PcardBrand
              name={data.name_eng}
              path={data.img_logo ? data.img_logo : require("../assets/images/brand-logo-4.svg")}
              alt="Brand Logo"
            />
            <div class="brandio-ar-card__content text-center">
              <img src={data.exported_images[0]} alt="exported images" className="exported-images" />
            </div>
            <div class="brandio-ar-card__footer">
              <button className="btn btn-primary" onClick={e => this.action("Accepted", data.id)}>
                accept
              </button>
              <button className="btn btn-primary" onClick={e => this.action("Rejected", data.id)}>
                reject
              </button>
            </div>
          </div>
        );
      });
    } else {
      return <span>No any pending request</span>;
    }
  }
  //
  action = async (type, id) => {
    let payload = {
      id: id,
      status: type
    };
    let status = await collaborationAPI.requestAcceptReject(payload);
    if (status.status === 200) {
      const { lng, i18n } = this.context;
      message.info(`${i18n.t("misc.actionSuccsess", {lng})}`);
      window.location.href = `/collaboration`;
    }
  };
  render() {
    console.log("status", this.state.data);
    return (
      <div>
        <div className="container item--1 wrapper">
          <Header />
        </div>
        <div className="container item--2">
          <div className="wrapper">
            <Navbar />
          </div>
        </div>

        <div className="container item--3 wrapper cardacceptreject-outer">
          <div className="brandio__collaboration-list">
            <div className="side-bar">
              <h2>Collaboration request</h2>
            </div>
            {this.state.isLoading ? (
              <Loader />
            ) : (
              <div className="brandio__collaboration-contentbox">{this.renderCollaboration(this.state.data)}</div>
            )}
          </div>
        </div>

        <div className="container item--10">
          <div className="wrapper">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default CardAcceptReject;
