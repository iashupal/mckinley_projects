import React, { Fragment, Component } from "react";
import { Menu, Dropdown, Button, Icon, Checkbox, message } from "antd";
import "antd/lib/button/style/index.css";
import "antd/lib/upload/style/index.css";
import "./../assets/css/BrandioProductCreateTwo.css";

//Import component
import HeaderContext from "../context/HeaderContext";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import TermsCondtion from "../components/Common/TermsCondition";
import SelectProduct from "../components/Common/SelectProduct";
import EstimatedRevenue from "../components/Common/EstimatedRevenue";

// Product size dropdown menu
function handleMenuClick(e) {
  const { lng, i18n } = this.context;
  message.info(`${i18n.t("misc.menuItem", { lng })}`);
  console.log("click", e);
}
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">FANDIO</Menu.Item>
    <Menu.Item key="2">M</Menu.Item>
    <Menu.Item key="3">L</Menu.Item>
    <Menu.Item key="4">XL</Menu.Item>
  </Menu>
);

const menuTwo = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">two</Menu.Item>
    <Menu.Item key="2">2A</Menu.Item>
    <Menu.Item key="3">2B</Menu.Item>
    <Menu.Item key="4">2C</Menu.Item>
  </Menu>
);

const menuThree = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">
      {/* <Icon type="user" /> */}
      three
    </Menu.Item>
    <Menu.Item key="2">3A</Menu.Item>
    <Menu.Item key="3">3B</Menu.Item>
    <Menu.Item key="4">3C</Menu.Item>
  </Menu>
);

const menuFour = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">Four</Menu.Item>
    <Menu.Item key="2">4A</Menu.Item>
    <Menu.Item key="3">4B</Menu.Item>
    <Menu.Item key="4">4C</Menu.Item>
  </Menu>
);

class BrandioProductCreateTwo extends Component {
  constructor() {
    super();
    this.state = {
      loading: false
    };
  }
  static contextType = HeaderContext;

  componentDidMount() {
    this.context.headerNameHandler("Brandio");
  }
  onChangeCheckbox(e) {
    console.log(`checked = ${e.target.checked}`);
  }
  render() {
    const { lng, i18n } = this.context;
    return (
      <Fragment>
        <div className="container item--1 wrapper">
          <Header />
        </div>
        <div className="container item--2">
          <div className="wrapper">
            <Navbar />
          </div>
        </div>
        <div className="container item--4">
          <div className="wrapper">
            <div className="brandioproductcreate">
              <div className="headingbox">
                <h4 className="headingbox__main">Product create</h4>
                <h6 className="headingbox__sub">상품을 등록하면 팬디오 사이트에서 상품을 판매 할 수 있습니다.</h6>
              </div>
              <h5 className="brandioproductcreate__headingone">{i18n.t("brandioCreateProduct.tagline", { lng })}</h5>
              <div className="brandioproductcreate__contentbox">
                <label className="brandioproductcreate__contentbox--label">브랜드 선택 *</label>
                <div className="brandioproductcreate__contentbox--value">
                  <Dropdown overlay={menu} className="dropdown-lg">
                    <Button>
                      FANDIO <Icon type="down" />
                    </Button>
                  </Dropdown>
                </div>
              </div>
              <div className="brandioproductcreate__contentbox">
                <label className="brandioproductcreate__contentbox--label">
                  {i18n.t("brandioCreateProduct.productName", { lng })} *
                </label>
                <div className="brandioproductcreate__contentbox--value">
                  <div className="fullinputbox">
                    <input type="text" className="fullinputbox__field" />
                    <span className="fullinputbox__badge">(0/60)</span>
                  </div>
                </div>
              </div>
              <div className="brandioproductcreate__contentbox">
                <label className="brandioproductcreate__contentbox--label">
                  {i18n.t("brandioCreateProduct.productForm", { lng })}
                </label>
                <div className="brandioproductcreate__contentbox--value">
                  <button className="btn btn-tertitary-two">
                    {i18n.t("brandioCreateProduct.collabrationProduct", {
                      lng
                    })}
                  </button>
                  <button className="btn btn-tertitary ml-20">{i18n.t("brandioCreateProduct.signleItem", { lng })}</button>
                </div>
              </div>
            </div>
            <div className="brandioproductcreate__middle">
              <h5 className="brandioproductcreate__heading">{i18n.t("brandioCreateProduct.tagline", { lng })}</h5>
              <div className="brandioproductcreate__contentbox">
                <label className="brandioproductcreate__contentbox--label">제품 선택 *</label>
                <div className="brandioproductcreate__contentbox--value">
                  <div className="doubledropdowns">
                    <div>
                      <Dropdown overlay={menuTwo} className="dropdown-lg">
                        <Button>
                          {i18n.t("productCategory.clothing", { lng })} <Icon type="down" />
                        </Button>
                      </Dropdown>
                    </div>
                    <div className="ml-20">
                      <Dropdown overlay={menuThree} className="dropdown-lg">
                        <Button>
                          8부 오버핏 티셔츠 <Icon type="down" />
                        </Button>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>
              <div className="selectproduct-box">
                <div className="brandioproductcreate__contentbox">
                  <label className="brandioproductcreate__contentbox--label">&nbsp;</label>
                  <div className="brandioproductcreate__contentbox--value">
                    <SelectProduct />
                  </div>
                </div>
              </div>
              <div className="brandioproductcreate__contentbox">
                <label className="brandioproductcreate__contentbox--label">
                  {i18n.t("brandioCreateProduct.productPriceSetting", { lng })} *
                </label>
                <div className="brandioproductcreate__contentbox--value">
                  <div className="doubledropdowns">
                    <input type="text" placeholder="" className="primary-input" />
                    <div className="ml-20">
                      <Dropdown overlay={menuFour} className="noborderdropdown">
                        <Button>
                          원 <Icon type="down" />
                        </Button>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>

              <div className="brandioproductcreate__contentbox">
                <label className="brandioproductcreate__contentbox--label">&nbsp;</label>
                <div className="brandioproductcreate__contentbox--value">
                  <EstimatedRevenue />
                </div>
              </div>
            </div>

            <div className="brandioproductcreate__bottom">
              <h5 className="brandioproductcreate__heading">법적 고지</h5>
              <div className="brandioproductcreate__checkbox">
                <Checkbox onChange={this.onChangeCheckbox} />
                <span className="checkbox-info">
                  {i18n.t("createBrand.termOfUse", { lng })} 및 브랜디오 운영 정책에 동의합니다.
                </span>
              </div>
              <TermsCondtion />
              <div className="brandioproductcreate__submitbox">
                <button className="btn btn-tertitary">AI 파일 업로드</button>
                <button className="btn btn-tertitary ml-20">편집기로 상품 제작하기</button>
              </div>
            </div>
          </div>
        </div>

        <div className="container item--10">
          <div className="wrapper">
            <Footer />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default BrandioProductCreateTwo;
