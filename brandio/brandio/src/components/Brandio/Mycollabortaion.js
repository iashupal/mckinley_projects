import React, { Component, Fragment } from "react";
import { Row, Col, Collapse, Icon, Button, Menu, Empty } from "antd";
import { collaborationAPI } from "../../services/ApiService";
import HeaderContext from "../../context/HeaderContext";
import { Link } from "react-router-dom";
import ProductHeader from "./../../components/ProductList/ProductHeader";
import SingleProduct from "./../../components/ProductList/SingleProduct";
import Loader from "../../screens/Loader";

class Mycollaboration extends Component {
  state = {
    data: [],
    isLoading: false
  };
  static contextType = HeaderContext;
  async componentDidMount() {
    this.laodData();
  }
  laodData = async () => {
    const res = await collaborationAPI.sentRequest();
    console.log(res, "my sented req");
    if (res.status === 200) {
      this.setState({ data: res.data.Data, isLoading: true });
    }
  };
  //Render brand and list
  renderBrandData() {
    const { lng, i18n } = this.context;
    return (
      <div className="div__menu__product">
        <div className="div__menu__product__header">
          <div className="main__product__div">
            {this.state.data.map((product, productIndex) => {
              return (
                <SingleProduct
                  logoImageSrc={product.img_logo}
                  productImageSrc={JSON.parse(product.exported_images)[0]}
                  brand={product.name_eng}
                  productName={product.product_name}
                  productPrice={product.price}
                  personOneImage={product.brander_img}
                  personOneName={product.brander_nickname}
                  personTwoImage={product.my_profile_img}
                  personTwoName={product.my_nickname}
                  component="mycollaboration"
                  sales={product.sales}
                  status={product.status}
                  productId={product.product_id}
                  id={product.id}
                  exportedImages={JSON.parse(product.exported_images)}
                  memberId={product.brander_id}
                  collaberId={product.my_id}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  render() {
    const { lng, i18n } = this.context;
    return (
      <div className="div__sub div__sub__illustration_1">
        <div className="div__menu__product illustaration__main__list">
          <div className="illustaration__list">
            <div className="div__illustration__title">
              {i18n.t("navigation.collaboration", {
                lng
              })}
            </div>
            {this.state.isLoading ? (
              <React.Fragment>
                {this.state.data.length > 0 ? (
                  this.renderBrandData()
                ) : (
                  <div style={{ margin: "100px auto" }}>
                    <Empty />
                  </div>
                )}
              </React.Fragment>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Mycollaboration;
