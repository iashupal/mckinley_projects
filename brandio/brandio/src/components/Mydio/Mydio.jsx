import React, { Component } from "react";

import { Row, Col } from "antd";
import "antd/dist/antd.css";
import "./Mydio.css";
import "../CategoryMenu/CategoryMenu.css";
import HeaderContext from "./../../context/HeaderContext";
import CategoryMenu from "../CategoryMenu/CategoryMenu";
import ProductHeader from "./../ProductList/ProductHeader";
import SingleProduct from "./../ProductList/SingleProduct";
import UserCard from "../UserCard/UserCard";
import categoriesProducts from "../../utils/dummy/mydio";
import personProfile from "../../utils/dummy/personProfile";
import { userAPI } from "../../services/ApiService";

class Mydio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      purchaseList: []
    };
  }
  static contextType = HeaderContext;

  async componentDidMount() {
    this.context.headerNameHandler("Mydio");
    const getlist = await userAPI.getPurchasesList();
    this.setState({ purchaseList: getlist.data.Data });
  }

  render() {
    const { i18n, lng } = this.context;
    const { purchaseList } = this.state;
    console.log("purchase list ", purchaseList);
    return (
      <div className="div__sub">
        <UserCard
          personAvatar={personProfile.profilePic}
          title={personProfile.title}
          name={personProfile.name}
          description={personProfile.description}
          followers={personProfile.followers}
          following={personProfile.following}
        />
        <div className="div__menu__product">
          <CategoryMenu />
          <div className="div__header__products">
            <div class="kidmart__title">My purchase</div>
            {purchaseList.map((list, index) => {
              return (
                <div className="purchase-history">
                  <span>
                    {i18n.t("misc.brand", { lng })} &nbsp;&nbsp;&nbsp; <b>{list.item.brand.name_eng}</b>
                  </span>
                  <span>
                    {i18n.t("misc.prodName", { lng })} &nbsp;&nbsp;&nbsp; <b>{list.item.product_name}</b>
                  </span>

                  <span>
                    {i18n.t("misc.price", { lng })} &nbsp;&nbsp;&nbsp;
                    <b>{list.item.price}</b>
                  </span>

                  <span>
                    {i18n.t("misc.size", { lng })} &nbsp;&nbsp;&nbsp;
                    <b>{list.size}</b>
                  </span>

                  <span>
                    {i18n.t("misc.qty", { lng })} &nbsp;&nbsp;&nbsp;
                    <b>{list.quantity}</b>
                  </span>
                </div>
              );
            })}
            <div className="div__menu__product__header">
              {categoriesProducts.map((value, catIndex) => {
                return (
                  <div className={catIndex !== 0 ? "illustation__div" : ""} key={`category-${catIndex}`}>
                    <ProductHeader title={value.name} description={value.description} imageSrc={value.image} />
                    <div className="main__product__div">
                      <Row gutter={48} className="main__product__div__row">
                        {value.products.map((productvalue, productIndex) => {
                          return (
                            <Col key={`product-${catIndex}-${productIndex}`} lg={8} md={8} sm={12} xs={24}>
                              <SingleProduct
                                logoImageSrc={productvalue.brandIcon}
                                productImageSrc={productvalue.productImage}
                                brand={productvalue.brandName}
                                productName={productvalue.productName}
                                productPrice={productvalue.productPrice}
                                personOneImage={productvalue.personOneImage}
                                personOneName={productvalue.personOneName}
                                personTwoImage={productvalue.personTwoImage}
                                personTwoName={productvalue.personTwoName}
                              />
                            </Col>
                          );
                        })}
                      </Row>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Mydio;
