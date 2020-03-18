import React, { Component, Fragment } from "react";
import { Row, Col, Collapse, Icon, Button } from "antd";
import HeaderContext from "../../context/HeaderContext";
import { Link } from "react-router-dom";
import ProductHeader from "./../ProductList/ProductHeader";
import SingleProduct from "./../ProductList/SingleProduct";
import "./MyBrands.css";
import brandioMyBrands from "../../utils/dummy/brandioMyBrands";
import { illustrationAPI } from "../../services/ApiService";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import HeroSlider from "../HeroSlider/HeroSlider";
import Footer from "../Footer/Footer";

const { Panel } = Collapse;

class MyBrands extends Component {
  state = {
    data: [],
    selectedBrands: ["Fandio"]
  };
  static contextType = HeaderContext;

  async componentDidMount() {
    this.context.headerNameHandler("Brandio");
    const response = await illustrationAPI.getProduct();
    console.log("illustration product", response);
  }
  renderMenu(option) {
    const { lng, i18n } = this.context;
    const { selectedBrands } = this.state;
    return (
      <div className="illustration__main__sidebar">
        <div className="div__illustration__menu">
          <div className="div__illustration__title">
            {i18n.t("brandioIllustration.myBrand", { lng })}
          </div>
          <div className="div__illustration__product__section">
            <ul className="ant-menu  ant-menu-sub ant-menu-inline sidenavlist">
              <li>
                <Collapse
                  defaultActiveKey={["1"]}
                  bordered={false}
                  expandIconPosition="right"
                  expandIcon={({ isActive }) => (
                    <Icon
                      type="up"
                      rotate={isActive ? 180 : 0}
                      className="illustration__dropdown__expand__icon"
                    />
                  )}
                  className="illustration__dropdown"
                >
                  <Panel
                    header={i18n.t("brandioIllustration.brandList", { lng })}
                    key="1"
                    className="illustration__panel"
                  >
                    <ul className="div__illustration__submenu">
                      <li>Justin Bieber Jeans</li>
                      <li>Kidsmart</li>
                      <li>Fandio</li>
                    </ul>
                  </Panel>
                </Collapse>
              </li>
              <li>
                <Link
                  className={`div__illustration__menu__title cursor-pointer user-select-none ${
                    selectedBrands.includes("navigation.collaboration")
                      ? "div__illustration__submenu__selected"
                      : ""
                  }`}
                  to="/products/new"
                >
                  {i18n.t("navigation.collaboration", {
                    lng
                  })}
                </Link>
              </li>
              <li>
                <span
                  className={`div__illustration__menu__title cursor-pointer user-select-none ${
                    selectedBrands.includes(
                      "brandioIllustration.illustrationList"
                    )
                      ? "div__illustration__submenu__selected"
                      : ""
                  }`}
                  onClick={() => (window.location.href = `/illustrations`)}
                >
                  {i18n.t("brandioIllustration.illustrationList", {
                    lng
                  })}
                  <Icon
                    type="close-circle"
                    theme="filled"
                    className="div__illustration__submenu__closeButton"
                  />
                </span>
              </li>

              <li>
                <span
                  className={`div__illustration__menu__title cursor-pointer user-select-none ${
                    selectedBrands.includes("brandioIllustration.msg")
                      ? "div__illustration__submenu__selected"
                      : ""
                  }`}
                  onClick={() => (window.location.href = `/inbox`)}
                >
                  {i18n.t("brandioIllustration.msg", {
                    lng
                  })}
                  <Icon
                    type="close-circle"
                    theme="filled"
                    className="div__illustration__submenu__closeButton"
                  />
                </span>
              </li>

              <li>
                <Button
                  type="secondary"
                  className="d-flex align-items-center justify-content-between"
                  onClick={() => (window.location.href = "/illustrations/new")}
                >
                  {i18n.t("uploadIllustration.upload", {
                    lng
                  })}
                  <img
                    src={require("../../assets/images/icon-upload.svg")}
                    alt="upload"
                  />
                </Button>
              </li>
              <li>
                <Button
                  type="secondary"
                  className="d-flex align-items-center justify-content-between"
                  onClick={e => e.preventDefault()}
                >
                  {i18n.t("brandioIllustration.applyWithdrawal", { lng })}
                  <img
                    src={require("../../assets/images/icon-handshake.svg")}
                    alt="upload"
                    className="toggle-menu-icon"
                  />
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  chunk(a, l) {
    return new Array(Math.ceil(a.length / l))
      .fill(0)
      .map((_, n) => a.slice(n * l, n * l + l));
  }

  render() {
    const { lng, i18n } = this.context;
    const productsChunk = this.chunk(brandioMyBrands.products, 3);
    console.log("recived props", this.props);
    return (
      <React.Fragment>
        <div className="container item--1 wrapper">
          <Header />
        </div>
        <div className="container item--2">
          <div className="wrapper">
            <Navbar />
          </div>
        </div>
        <div className="div__sub div__sub__illustration" id="brandiomybrands">
          <div className="div__menu__product illustaration__main__list">
            {this.renderMenu()}
            <div className="illustaration__list">
              <div className="div__illustration__title">
                {i18n.t("navigation.brand", { lng })} ({brandioMyBrands.name})
              </div>
              <div className="div__menu__product">
                <div className="div__menu__product__header">
                  <ProductHeader
                    title={brandioMyBrands.name}
                    description={brandioMyBrands.description}
                    imageSrc={brandioMyBrands.image}
                    component="mybrand"
                  />
                  <div className="main__product__div">
                    {productsChunk.map((chunk, chunkIndex) => {
                      return (
                        <Row
                          key={`chunk-${chunkIndex}`}
                          gutter={48}
                          className="illustation__div"
                        >
                          {chunk.map((product, productIndex) => {
                            return (
                              <Col
                                key={`chunk-${chunkIndex}-${productIndex}`}
                                lg={8}
                                md={8}
                                sm={12}
                                xs={24}
                              >
                                <SingleProduct
                                  logoImageSrc={product.brandIcon}
                                  productImageSrc={product.productImage}
                                  brand={product.brandName}
                                  productName={product.productName}
                                  productPrice={product.productPrice}
                                  personOneImage={product.personOneImage}
                                  personOneName={product.personOneName}
                                  personTwoImage={product.personTwoImage}
                                  personTwoName={product.personTwoName}
                                  component="mybrand"
                                  addButton={product.addButton}
                                />
                              </Col>
                            );
                          })}
                        </Row>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container item--10">
          <div className="wrapper">
            <Footer />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MyBrands;
