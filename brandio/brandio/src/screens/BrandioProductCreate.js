import React, { Fragment, Component } from "react";
import { Menu, Dropdown, Button, Icon, Checkbox, message } from "antd";
import { DatePicker } from "antd";
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
import MultipleUpload from "../components/Common/MultipleUpload";
import AiFileUpload from "../components/Common/AiFileUpload";
import Cookies from "js-cookie";
import { collaborationAPI, artistAPI, itemAPI } from "../services/ApiService";
import { Editor } from "react-draft-wysiwyg";

const session_value = Cookies.get("session_value") || null;
const user = Cookies.get("member_id") || null;

class BrandioProductCreate extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      productType: "collaboration",
      brandId: "",
      productName: "",
      itemCategory: "",
      itemSubCategory: "",
      itemPrice: null,
      itemDesign: "",
      currency: "원",
      collaborationShare: null,
      collaborationTitle: "",
      collaborationRequest: "",
      collaborationImages: [],
      collaborationDueDate: null,
      brands: [],
      selectedBrand: "Select",
      category: [],
      uniqueCat: [],
      subCategory: [],
      productData: [],
      terms: false,
      selectedSides: 4,
      selectedSidesName: [],
      profit: 0
    };
  }
  static contextType = HeaderContext;

  async componentDidMount() {
    this.context.headerNameHandler("Brandio");
    const response = await artistAPI.artistBrands(user);
    this.setState({ brands: response.data.Data.artistBrands });
    const category = await itemAPI.getCategories();
    this.setState({ category: category.data.Data.categories });
    const categories = this.state.category.map(m => m.category);
    const unique = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    const uniquecategory = categories.filter(unique);
    this.setState({
      uniqueCat: uniquecategory,
      itemCategory: uniquecategory[0]
    });
    this.filterSubCategory(uniquecategory[0]);
  }
  onChangeCheckbox = e => {
    this.setState({ terms: e.target.checked });
  };
  //Change Form type
  formType = type => {
    this.setState({ productType: type });
  };
  //Input change
  handleChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  // Product size dropdown menu
  handleMenuClick = async (e, type) => {
    switch (type) {
      case "brand":
        this.setState({ brandId: e.key, selectedBrand: e.item.props.children });
        break;
      case "category":
        this.setState({ itemCategory: e.key, subCategory: [] });
        this.filterSubCategory(e.key);
        break;
      case "subCategory":
        await this.setState({ itemSubCategory: e.key });
        const productData = await itemAPI.itemSpecification(this.state.itemCategory, this.state.itemSubCategory);
        this.setState({
          productData: productData.data.Data.result,
          loading: false,
          selectedSidesName: productData.data.Data.result[0].printableSides
        });
        break;
      case "currency":
        this.setState({ currency: e.key });
        break;
    }
  };
  //Date selector
  onChange = (value, dateString) => {
    let date = value._d;
    let isoDate = date.toISOString();
    this.setState({
      collaborationDueDate: isoDate
    });
  };
  onOk = value => {
    let date = value._d;
    let isoDate = date.toISOString();
    this.setState({
      collaborationDueDate: isoDate
    });
  };
  //filter sub category for selected category
  filterSubCategory = async category => {
    let subCat = true;
    await this.state.category.map((cat, index) => {
      if (category === cat.category) {
        if (subCat) {
          this.setState({ itemSubCategory: cat.subcategory });
          subCat = false;
        }
        this.setState(prevState => ({
          subCategory: [...prevState.subCategory, cat.subcategory]
        }));
      }
    });
    const productData = await itemAPI.itemSpecification(this.state.itemCategory, this.state.itemSubCategory);
    this.setState({
      productData: productData.data.Data.result,
      loading: false,
      selectedSidesName: productData.data.Data.result[0].printableSides
    });
  };
  //Brand List
  brandList = brands => brands.map((brand, index) => <Menu.Item key={brand.id}>{brand.name_eng}</Menu.Item>);
  brands = () => {
    return <Menu onClick={e => this.handleMenuClick(e, "brand")}>{this.brandList(this.state.brands)}</Menu>;
  };
  //get items
  getcat = () => (
    <Menu onClick={e => this.handleMenuClick(e, "category")}>
      {this.state.uniqueCat.map(m => (
        <Menu.Item key={m}>{m}</Menu.Item>
      ))}
    </Menu>
  );
  subCat = () => (
    <Menu onClick={e => this.handleMenuClick(e, "subCategory")} value={this.state.itemSubCategory}>
      {this.state.subCategory.map(m => (
        <Menu.Item key={m}>{m}</Menu.Item>
      ))}
    </Menu>
  );
  currency = () => (
    <Menu onClick={e => this.handleMenuClick(e, "currency")}>
      <Menu.Item key="원">원</Menu.Item>
      <Menu.Item key="USD">USD</Menu.Item>
      <Menu.Item key="CYN">CNY</Menu.Item>
      <Menu.Item key="YEN">YEN</Menu.Item>
    </Menu>
  );
  async submit() {
    const { lng, i18n } = this.context;
    if (this.state.profit <= 0) {
      message.info(`${i18n.t("misc.incPrice", {lng})}`);
      return;
    }
    if (this.state.selectedBrand === "Select") {
      message.info(`${i18n.t("misc.slctBrand",{lng})}`);
      return;
    }
    if (this.state.productName === "") {
      message.info(`${i18n.t("misc.enterPrice",{lng})}`);
      return;
    }
    if (this.state.itemPrice === null) {
      message.info(`${i18n.t("misc.enterPrice",{lng})}`);
      return;
    }
    if (this.state.terms) {
      switch (this.state.productType) {
        case "collaboration":
          let collaborationData = this.state;
          delete collaborationData.loading;
          delete collaborationData.brands;
          delete collaborationData.category;
          delete collaborationData.uniqueCat;
          delete collaborationData.subCategory;
          collaborationData.itemId = this.state.productData["0"].id;
          collaborationData.printableSides = this.state.selectedSidesName;
          const response = await collaborationAPI.createRequest(collaborationData);
          if (response.status === 200) {
            window.location.href = `/collaboration`;
          }

          break;
        case "individual":
          let data = {};
          const price = this.state.itemPrice;
          const name = this.state.productName;
          const brand = this.state.brandId;
          const itemId = this.state.productData[0].id;
          const categoryId = this.state.category[0].id;
          const selectedSidesName = this.state.selectedSidesName;
          window.location.href = `/main-editor/${itemId}/i?brand=${brand}&name=${name}&price=${price}&category_id=${categoryId}&item=${itemId}&sel=${selectedSidesName}`;
          break;
        default:
          console.log("error");
          break;
      }
    } else {
      message.info(`${i18n.t("misc.termsCondn", { lng })}`);
    }
  }
  //Set profit
  setProfit = profit => {
    this.setState(function(prevState) {
      if (prevState.profit != profit)
        return {
          profit: profit
        };
    });
  };
  //// recived Image URL form child component
  setImageUrl = (url, type) => {
    if (type === "collaborationImage") {
      this.setState({
        collaborationImages: [...this.state.collaborationImages, url]
      });
    }
  };
  //Recived selected sides from child component\
  selectedSides = sides => {
    this.setState({ selectedSides: sides.length, selectedSidesName: sides });
  };

  render() {
    const { lng, i18n } = this.context;

    const {
      productType,
      itemCategory,
      itemSubCategory,
      currency,
      productName,
      collaborationTitle,
      collaborationRequest,
      selectedBrand,
      productData,
      loading
    } = this.state;
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
                <h4 className="headingbox__main">{i18n.t("misc.createProduct", { lng })}</h4>
                <h6 className="headingbox__sub">{i18n.t("uploadIllustration.tagLine", { lng })}</h6>
              </div>
              <h5 className="brandioproductcreate__headingone">{i18n.t("brandioCreateProduct.tagline", { lng })}</h5>
              <div className="brandioproductcreate__contentbox">
                <label className="brandioproductcreate__contentbox--label">{i18n.t("misc.selectBrand", { lng })}</label>
                <div className="brandioproductcreate__contentbox--value">
                  <Dropdown overlay={this.brands} className="dropdown-lg">
                    <Button>
                      {selectedBrand} <Icon type="down" />
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
                    <input
                      name="productName"
                      type="text"
                      className="fullinputbox__field"
                      onChange={e => this.handleChangeInput(e)}
                    />
                    <span className="fullinputbox__badge">({productName.length}/60)</span>
                  </div>
                </div>
              </div>
              <div className="brandioproductcreate__contentbox">
                <label className="brandioproductcreate__contentbox--label">
                  {i18n.t("brandioCreateProduct.productForm", { lng })}
                </label>
                <div className="brandioproductcreate__contentbox--value">
                  <button
                    className={productType === "collaboration" ? "btn btn-tertitary" : "btn btn-tertitary-two"}
                    onClick={e => this.formType("collaboration")}
                  >
                    {i18n.t("brandioCreateProduct.collabrationProduct", {
                      lng
                    })}
                  </button>
                  <button
                    className={productType === "individual" ? "btn btn-tertitary ml-20" : "btn btn-tertitary-two ml-20"}
                    onClick={e => this.formType("individual")}
                  >
                    {i18n.t("brandioCreateProduct.signleItem", { lng })}
                  </button>
                </div>
              </div>
            </div>
            <div className="brandioproductcreate__middle">
              {productType === "collaboration" ? (
                <h5 className="brandioproductcreate__heading">{i18n.t("brandioCreateProduct.collInformation", { lng })}</h5>
              ) : (
                <h5 className="brandioproductcreate__heading">{i18n.t("brandioCreateProduct.editorBtn", { lng })}</h5>
              )}

              {productType === "collaboration" ? (
                <div className="multipleimage-box">
                  <div className="brandioproductcreate__contentbox">
                    <label className="brandioproductcreate__contentbox--label">
                      {i18n.t("brandioCreateProduct.collTitle", { lng })} *
                    </label>
                    <div className="brandioproductcreate__contentbox--value">
                      <div className="fullinputbox">
                        <input
                          type="text"
                          className="fullinputbox__field"
                          name="collaborationTitle"
                          onChange={e => this.handleChangeInput(e)}
                        />
                        <span className="fullinputbox__badge">({collaborationTitle.length}/60)</span>
                      </div>
                    </div>
                  </div>

                  <div className="brandioproductcreate__contentbox">
                    <label className="brandioproductcreate__contentbox--label">{i18n.t("misc.dueDate", { lng })} *</label>
                    <div className="brandioproductcreate__contentbox--value">
                      <DatePicker
                        showTime
                        placeholder={`${i18n.t("misc.dueDate", { lng })}`}
                        onChange={this.onChange}
                        onOk={this.onOk}
                      />
                    </div>
                  </div>

                  <div className="brandioproductcreate__contentbox">
                    <label className="brandioproductcreate__contentbox--label">
                      {i18n.t("brandioCreateProduct.collPhoto", { lng })}
                    </label>
                    <div className="brandioproductcreate__contentbox--value">
                      <div className="multipleupload">
                        <MultipleUpload setImageUrl={this.setImageUrl} type={"collaborationImage"} />
                        <MultipleUpload
                          disabled={this.state.collaborationImages.length < 1}
                          setImageUrl={this.setImageUrl}
                          type={"collaborationImage"}
                        />
                        <MultipleUpload
                          disabled={this.state.collaborationImages.length < 2}
                          setImageUrl={this.setImageUrl}
                          type={"collaborationImage"}
                        />
                        <MultipleUpload
                          disabled={this.state.collaborationImages.length < 3}
                          setImageUrl={this.setImageUrl}
                          type={"collaborationImage"}
                        />
                        <MultipleUpload
                          disabled={this.state.collaborationImages.length < 4}
                          setImageUrl={this.setImageUrl}
                          type={"collaborationImage"}
                        />
                        <MultipleUpload
                          disabled={this.state.collaborationImages.length < 5}
                          setImageUrl={this.setImageUrl}
                          type={"collaborationImage"}
                        />
                        <MultipleUpload
                          disabled={this.state.collaborationImages.length < 6}
                          setImageUrl={this.setImageUrl}
                          type={"collaborationImage"}
                        />
                        <MultipleUpload
                          disabled={this.state.collaborationImages.length < 7}
                          setImageUrl={this.setImageUrl}
                          type={"collaborationImage"}
                        />
                        <MultipleUpload
                          disabled={this.state.collaborationImages.length < 8}
                          setImageUrl={this.setImageUrl}
                          type={"collaborationImage"}
                        />
                        <MultipleUpload
                          disabled={this.state.collaborationImages.length < 9}
                          setImageUrl={this.setImageUrl}
                          type={"collaborationImage"}
                        />
                      </div>
                      <p className="color-slate-blue m0">{i18n.t("uploadIllustration.helpText", { lng })}</p>
                      <p className="color-slate-blue">{i18n.t("uploadIllustration.helpText2", { lng })}.</p>
                    </div>
                  </div>

                  <div className="brandioproductcreate__contentbox">
                    <label className="brandioproductcreate__contentbox--label">
                      {i18n.t("brandioCreateProduct.collReq", { lng })}
                    </label>
                    <div className="brandioproductcreate__contentbox--value">
                      <div className="fulltextarea">
                        <textarea
                          type="text"
                          className="fulltextarea__field"
                          name="collaborationRequest"
                          onChange={e => this.handleChangeInput(e)}
                        />
                        <span className="fulltextarea__badge">({collaborationRequest.length}/200)</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              <div className="brandioproductcreate__contentbox">
                <label className="brandioproductcreate__contentbox--label">
                  {i18n.t("brandioCreateProduct.selectProduct", { lng })} *
                </label>
                <div className="brandioproductcreate__contentbox--value">
                  <div className="doubledropdowns">
                    <div>
                      <Dropdown overlay={this.getcat} className="dropdown-lg">
                        <Button>
                          {itemCategory} <Icon type="down" />
                        </Button>
                      </Dropdown>
                    </div>
                    <div className="ml-20">
                      <Dropdown overlay={this.subCat} className="dropdown-lg">
                        <Button>
                          {itemSubCategory} <Icon type="down" />
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
                    {productData.length > 0 ? (
                      <SelectProduct product={productData[0]} selectedSides={this.selectedSides} />
                    ) : (
                      "No product available"
                    )}
                  </div>
                </div>
              </div>
              <div className="brandioproductcreate__contentbox">
                <label className="brandioproductcreate__contentbox--label">
                  {i18n.t("brandioCreateProduct.productPriceSetting", { lng })} *
                </label>
                <div className="brandioproductcreate__contentbox--value">
                  <div className="doubledropdowns">
                    <input
                      type="number"
                      placeholder=""
                      className="primary-input"
                      name="itemPrice"
                      onChange={e => this.handleChangeInput(e)}
                    />
                    <div className="ml-20">
                      <Dropdown overlay={this.currency} className="noborderdropdown">
                        <Button style={{ height: "100%" }}>
                          {currency} <Icon type="down" />
                        </Button>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>

              {this.state.productType === "collaboration" && (
                <div className="brandioproductcreate__contentbox">
                  <label className="brandioproductcreate__contentbox--label">
                    {i18n.t("brandioCreateProduct.collFeeSetting", { lng })} *
                  </label>
                  <div className="brandioproductcreate__contentbox--value bcollaboration-feesetting">
                    <input
                      type="number"
                      className="primary-input"
                      name="collaborationShare"
                      onChange={e => this.handleChangeInput(e)}
                    />
                    <span className="brandioproductcreate-percentage">%</span>
                  </div>
                </div>
              )}

              <div className="brandioproductcreate__contentbox">
                <label className="brandioproductcreate__contentbox--label">
                  {i18n.t("brandioCreateProduct.estimatRevnue", { lng })}
                </label>
                <div className="brandioproductcreate__contentbox--value">
                  {productData.length > 0 && (
                    <EstimatedRevenue
                      commodityPrice={this.state.itemPrice}
                      collaboraterFee={this.state.collaborationShare}
                      whiteItem={productData[0]}
                      selectedSides={this.state.selectedSides}
                      setProfitData={this.setProfit}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="brandioproductcreate__bottom">
              <h5 className="brandioproductcreate__heading">{i18n.t("createBrand.termOfUse", { lng })}</h5>
              <div className="brandioproductcreate__checkbox">
                <Checkbox onChange={this.onChangeCheckbox} />
                <span className="checkbox-info">{i18n.t("createBrand.brandTermIntoText", { lng })}</span>
              </div>
              <TermsCondtion />
              <div className="brandioproductcreate__submitbox">
                {this.state.productType === "individual" && (
                  <button className="aifileuploadouterbtn">
                    <AiFileUpload data={this.state} />
                  </button>
                )}

                <Button className="btn btn-tertitary ml-20" onClick={e => this.submit()}>
                  {this.state.productType === "collaboration"
                    ? i18n.t("brandioCreateProduct.apply", { lng })
                    : i18n.t("brandioCreateProduct.editorBtn", { lng })}
                </Button>
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

export default BrandioProductCreate;
