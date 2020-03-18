import React, { Component } from "react";
import "./../BestSellers/BestSellers.css";
import { collaborationAPI } from "../../services/ApiService";
import HeaderContext from "../../context/HeaderContext";
import BrandioProductCard from "../BrandioProductCard/BrandioProductCard";

class CollaborationStudio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      product: []
    };
  }
  static contextType = HeaderContext;
  async componentDidMount() {
    const response = await collaborationAPI.collaborationRequest();
    this.setState({
      product: response.data.Data.collaborationResult,
      loading: false
    });
  }
  renderCollaboration(requests) {
    return requests.map(list => (
      <div className="animated fadeInUp faster collaboration_prod">
        <BrandioProductCard listData={list} />
      </div>
    ));
  }
  render() {
    return (
      <div className="bestsellers border-top">
        <h3 className="bestsellers__heading" style={{ borderTop: "1px solid #e8e8e8" }}>
          COLLABORATION STUDIO
        </h3>
        <div className="product-card-list-outer" id="bestsellers">
          {this.state.product.length > 0 ? this.renderCollaboration(this.state.product) : ""}
        </div>
      </div>
    );
  }
}
export default CollaborationStudio;
