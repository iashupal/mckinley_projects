import React, { Component, Fragment } from "react";
import { Menu } from "antd";
import "./../components/Filters/Filters.css";
import "./../assets/css/FandioBrandMallList.css";

// Import Components
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import Footer from "../components/Footer/Footer";
import ProductCard from "../components/ProductCard/ProductCard";
import ArtistPhoto from "../components/Artist/ArtistPhoto";
import Togglebutton from "../components/Common/Togglebutton";
import products from "../utils/dummy/products";
import HeaderContext from "./../context/HeaderContext";
import {
  brandsAPI,
  individualAPI,
  collaborationAPI
} from "../services/ApiService";

const { SubMenu } = Menu;

class FandioBrandMallList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brandDetail: null,
      loading: false,
      brandProduct: [],
      bradIndProduct: []
    };
  }

  static contextType = HeaderContext;
  async componentDidMount() {
    let brandId = this.props.match.params.id;
    const response = await brandsAPI.brandDetails(brandId);
    if (response.status === 200) {
      this.setState({ brandDetail: response.data.Data, loading: true });
    }
    const brandProduct = await collaborationAPI.products();
    console.log("collaboration product", brandProduct.data.Data);
    if (brandProduct.status === 200) {
      this.setState({ brandProduct: brandProduct.data.Data });
    }
    const brandProductInd = await individualAPI.getProducts();
    if (brandProductInd.status === 200) {
      this.setState({ bradIndProduct: brandProductInd.data.Data });
    }
    console.log("ind product", brandProductInd.data.Data);
    //console.log("response", response);
  }

  brandFilter() {
    const { lng, i18n } = this.context;
    return (
      <Fragment>
        <div className="filters">
          <h5 className="filters__heading">
            {i18n.t("navigation.collaboration", {
              lng
            })}
          </h5>
        </div>
        <Menu
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <span>
                  {i18n.t("navigation.collaboration", {
                    lng
                  })}
                </span>
              </span>
            }
          >
            <Togglebutton
              title={i18n.t("collaborationFilter.artistCountry.korea", { lng })}
              showToggle={true}
            />
            <Togglebutton
              title={i18n.t("collaborationFilter.artistCountry.usa", { lng })}
              showToggle={false}
            />
            <Togglebutton
              title={i18n.t("collaborationFilter.artistCountry.china", { lng })}
              showToggle={true}
            />
            <Togglebutton
              title={i18n.t("collaborationFilter.artistCountry.japan", { lng })}
              showToggle={false}
            />
            <Togglebutton
              title={i18n.t("collaborationFilter.artistCountry.taiwan", {
                lng
              })}
              showToggle={false}
            />
            <Togglebutton
              title={i18n.t("collaborationFilter.artistCountry.vietnam", {
                lng
              })}
              showToggle={false}
            />
            <Togglebutton
              title={i18n.t("collaborationFilter.artistCountry.canada", {
                lng
              })}
              showToggle={false}
            />
            <Togglebutton
              title={i18n.t("collaborationFilter.artistCountry.australia", {
                lng
              })}
              showToggle={false}
            />
          </SubMenu>

          <SubMenu
            key="sub3"
            title={
              <span>
                <span>
                  {i18n.t("collaborationFilter.productCategory", {
                    lng
                  })}
                </span>
              </span>
            }
          >
            <Togglebutton
              title={i18n.t("productCategory.jackets", {
                lng
              })}
              showToggle={true}
            />
            <Togglebutton
              title={i18n.t("productCategory.hoodies", {
                lng
              })}
              showToggle={false}
            />
            <Togglebutton
              title={i18n.t("productCategory.tshirts", {
                lng
              })}
              showToggle={false}
            />
            <Togglebutton
              title={i18n.t("productCategory.paintsShorts", {
                lng
              })}
              showToggle={true}
            />
            <Togglebutton
              title={i18n.t("productCategory.hats", {
                lng
              })}
              showToggle={false}
            />
            <Togglebutton
              title={i18n.t("productCategory.bags", {
                lng
              })}
              showToggle={false}
            />

            <Togglebutton
              title={i18n.t("productCategory.phoneCase", {
                lng
              })}
              showToggle={false}
            />
            <Togglebutton
              title={i18n.t("productCategory.blankets", {
                lng
              })}
              showToggle={false}
            />
            <Togglebutton
              title={i18n.t("productCategory.pillow", {
                lng
              })}
              showToggle={true}
            />
            <Togglebutton
              title={i18n.t("productCategory.decor", {
                lng
              })}
              showToggle={false}
            />
            <Togglebutton
              title={i18n.t("productCategory.others", {
                lng
              })}
              showToggle={false}
            />
          </SubMenu>

          <SubMenu
            key="sub4"
            title={
              <span>
                <span>
                  {i18n.t("collaborationFilter.short", {
                    lng
                  })}
                </span>
              </span>
            }
          >
            <Togglebutton
              title={i18n.t("collaborationFilter.shortBy.view", {
                lng
              })}
              showToggle={true}
            />
            <Togglebutton
              title={i18n.t("collaborationFilter.shortBy.best", {
                lng
              })}
              showToggle={false}
            />
            <Togglebutton
              title={i18n.t("collaborationFilter.shortBy.new", {
                lng
              })}
              showToggle={false}
            />
            <Togglebutton
              title={i18n.t("collaborationFilter.shortBy.lowestPrice", {
                lng
              })}
              showToggle={false}
            />
            <Togglebutton
              title={i18n.t("collaborationFilter.shortBy.highestPrice", {
                lng
              })}
              showToggle={false}
            />
          </SubMenu>
        </Menu>
      </Fragment>
    );
  }
  renderProduct() {
    return this.state.brandProduct.map(productData => {
      if (
        productData.brand.id == this.props.match.params.id &&
        productData.exportedImages.length > 0
      ) {
        return (
          <ProductCard
            product={productData}
            key={productData.id}
            showArtist={true}
            brand={this.state.brandDetail}
          />
        );
      }
    });
  }
  renderProductInd() {
    const brandId = this.props.match.params.id;
    return this.state.bradIndProduct.map(productData => {
      try {
        if (
          productData.brand_id === parseInt(brandId) &&
          productData.exportedImages !== null
        ) {
          return (
            <ProductCard
              product={productData}
              key={productData.id}
              showArtist={true}
              brand={this.state.brandDetail}
            />
          );
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
  render() {
    const { loading, brandDetail } = this.state;
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

        <div className="container item--3">
          <HeroSlider />
        </div>
        {loading ? (
          <Fragment>
            <div className="wrapper brand-intro">
              <div className="brand-intro__logo-box">
                <img
                  src={
                    brandDetail.img_logo === ""
                      ? require("../assets/images/brand-logo-4.svg")
                      : brandDetail.img_logo
                  }
                  alt={brandDetail.name_eng}
                  className="brand-intro__logo"
                />
              </div>
              <div className="brand-intro__content-box">
                <h3 className="brand-intro__heading">{brandDetail.name_eng}</h3>
                <p className="brand-intro__paragraph">
                  {brandDetail.description}
                </p>
                <div
                  className="brand-intro__photos"
                  id="fandiobrandmallintrophotos"
                >
                  <ArtistPhoto
                    name="Beyonce"
                    path="https://ksassets.timeincuk.net/wp/uploads/sites/55/2018/06/GettyImages-96869110_beyonce_1000.jpg"
                    alt="Artist Avatar"
                  />
                  <div className="spacer">
                    <img
                      src={require("./../assets/images/icon-spacer-1.svg")}
                      alt="Spacer"
                    />
                  </div>
                  <ArtistPhoto
                    name="Will"
                    path="https://www.onthisday.com/images/people/will-smith-medium.jpg"
                    alt="Artist Avatar"
                  />
                  <ArtistPhoto
                    name="Kristen"
                    path="https://cdn.cnn.com/cnnnext/dam/assets/190901233514-40b-venice-film-festival-red-carpet-kristen-stewart-large-169.jpg"
                    alt="Artist Avatar"
                  />
                  <ArtistPhoto
                    name="Victoria"
                    path="https://www.instylemag.com.au/media/13045/victoria-beckham-haircut.jpg?width=640"
                    alt="Artist Avatar"
                  />
                  <ArtistPhoto
                    name="Meryl"
                    path="https://upload.wikimedia.org/wikipedia/commons/a/a3/Meryl_Streep_by_Jack_Mitchell.jpg"
                    alt="Artist Avatar"
                  />
                </div>
              </div>
            </div>
            <div className="wrapper">
              <div className="fandio__brandmall-list">
                <div className="side-bar">{this.brandFilter()}</div>
                <div
                  className="fandio__brandmall-contentbox"
                  id="fandiobrandmalllist"
                >
                  {this.renderProduct()}
                  {this.renderProductInd()}
                </div>
              </div>
            </div>
          </Fragment>
        ) : null}
        <div className="container item--10">
          <div className="wrapper">
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export default FandioBrandMallList;
