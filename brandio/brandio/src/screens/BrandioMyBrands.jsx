import React, { Component, Fragment } from "react";
import {
    Row,
    Col,
    Collapse,
    Icon,
    Button,
    Menu,
    Empty,
    Modal,
    Input,
    message
} from "antd";
import HeaderContext from "../context/HeaderContext";
import { Link, Redirect } from "react-router-dom";
import ProductHeader from "./../components/ProductList/ProductHeader";
import SingleProduct from "./../components/ProductList/SingleProduct";
import "../components/Brandio/MyBrands.css";
import brandioMyBrands from "../utils/dummy/brandioMyBrands";
import {
    artistAPI,
    collaborationAPI,
    paymentsAPI
} from "../services/ApiService";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Loader from "./Loader";
import Message from "../components/Brandio/Message";
import Illustartion from "../components/Brandio/Illustration";
import Mycollaboration from "../components/Brandio/Mycollabortaion";
import Togglebutton from "../components/Common/Togglebutton";
import Cookies from "js-cookie";
const id = Cookies.get("member_id");
const { Panel } = Collapse;
const { SubMenu } = Menu;

class BrandioMyBrands extends Component {
    state = {
        data: [],
        brands: [],
        isLoading: true,
        categories: [],
        activeBrands: [],
        checkingPaypal: false,
        paypalName: null,
        paypalModalVisible: false,
        hasPaypal: false,
        buttonDisabled: false,
        loadingOnBrandChange: false
    };
    static contextType = HeaderContext;

    handleChange = e => this.setState({ paypalName: e.target.value });
    togglePaypalModal = e =>
        this.setState({ paypalModalVisible: !this.state.paypalModalVisible });

    paypalSubmit = async () => {
        const { i18n, lng } = this.context;
        const response = await paymentsAPI.setPaypal({
            username: this.state.paypalName
        });
        if (response.status === 200) {
            message.success(`${i18n.t("misc.paypalAdded", { lng })}`);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    };

    async componentDidMount() {
        this.context.headerNameHandler("Brandio");
        this.userBrand();

        this.setState({ checkingPaypal: true });
        const hasPaypal = await paymentsAPI.hasPaypal();
        const hasPending = await paymentsAPI.hasPendingRequest();
        this.setState({
            hasPaypal: !!hasPaypal.data.Data.paypalme_name,
            checkingPaypal: false,
            buttonDisabled: hasPending.data.Data === "Withdraw found"
        });
    }
    //Get user brand list
    userBrand = async () => {
        this.setState({ loadingOnBrandChange: true });
        const brands = await artistAPI.artistBrands(id);
        if (brands.status === 200) {
            let activeBrands = this.state.activeBrands;
            this.setState({
                brands: brands.data.Data.artistBrands,
                activeBrands,
                loadingOnBrandChange: false
            });
        }
        const brandProduct = await collaborationAPI.recivedRequest();
        if (brandProduct.status === 200) {
            this.setState({ data: brandProduct.data.Data, isLoading: false });
        }
    };
    search(nameKey, myArray) {
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].name === nameKey) {
                return myArray[i];
            }
        }
    }
    toggleFilter = async key => {
        if (this.props.location.pathname !== "/myinfo/mybrands") {
            window.location.href = "/myinfo/mybrands";
        } else {
            if (key === this.state.activeBrands) {
                this.setState({ activeBrands: [] });
                this.userBrand();
            } else {
                var array = [...this.state.activeBrands]; // make a separate copy of the array
                var index = array.indexOf(key);
                if (index !== -1) {
                    array.splice(index, 1);
                    this.setState({ activeBrands: array });
                } else {
                    this.setState({ activeBrands: key });
                }
                this.setState({ loadingOnBrandChange: true });
                const brandProduct = await collaborationAPI.recivedRequest(key);
                if (brandProduct.status === 200) {
                    this.setState({
                        data: brandProduct.data.Data,
                        isLoading: false,
                        loadingOnBrandChange: false
                    });
                }
            }
        }
    };
    handleClick = e => {
        console.log("clicked", e);
    };
    renderMenu(option) {
        const { lng, i18n } = this.context;
        const { selectedBrands } = this.state;
        return (
            <div className="illustration__main__sidebar">
                <div className="div__illustration__menu">
                    <div
                        className="div__illustration__title"
                        style={{ width: "258px" }}
                    >
                        {" "}
                        {i18n.t("brandioIllustration.myInfo", {
                            lng
                        })}
                    </div>
                    <div className="div__illustration__product__section">
                        <ul className="ant-menu  ant-menu-sub ant-menu-inline sidenavlist">
                            <li>
                                {this.state.brands.length > 0 ? (
                                    <Fragment>
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
                                                            {i18n.t(
                                                                "brandioIllustration.myBrand",
                                                                {
                                                                    lng
                                                                }
                                                            )}
                                                        </span>
                                                    </span>
                                                }
                                            >
                                                {this.state.brands.map(
                                                    brand => {
                                                        return (
                                                            <Togglebutton
                                                                title={
                                                                    brand.name_eng
                                                                }
                                                                handleClick={() =>
                                                                    this.toggleFilter(
                                                                        brand.name_eng
                                                                    )
                                                                }
                                                                isActive={
                                                                    this.state.activeBrands.indexOf(
                                                                        brand.name_eng
                                                                    ) !== -1
                                                                }
                                                            />
                                                        );
                                                    }
                                                )}
                                            </SubMenu>
                                        </Menu>
                                    </Fragment>
                                ) : (
                                    <Link to={"/myinfo/mybrands"}>
                                        No Brands
                                    </Link>
                                )}
                            </li>
                            <li>
                                <Link
                                    className={
                                        option === "illustrations"
                                            ? "active-bold"
                                            : ""
                                    }
                                    to={"/myinfo/illustrations"}
                                >
                                    {i18n.t(
                                        "brandioIllustration.illustrationList",
                                        {
                                            lng
                                        }
                                    )}
                                    <Icon
                                        type="close-circle"
                                        theme="filled"
                                        className="div__illustration__submenu__closeButton"
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={
                                        option === "collaboration"
                                            ? "active-bold"
                                            : ""
                                    }
                                    to={"/myinfo/collaboration"}
                                >
                                    {i18n.t("navigation.collaboration", {
                                        lng
                                    })}
                                    <Icon
                                        type="close-circle"
                                        theme="filled"
                                        className="div__illustration__submenu__closeButton"
                                    />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={
                                        option === "inbox" ? "active-bold" : ""
                                    }
                                    to={"/myinfo/inbox"}
                                >
                                    {i18n.t("brandioIllustration.msg", {
                                        lng
                                    })}
                                    <Icon
                                        type="close-circle"
                                        theme="filled"
                                        className="div__illustration__submenu__closeButton"
                                    />
                                </Link>
                            </li>
                            <li>
                                <Button
                                    type="secondary"
                                    className="d-flex align-items-center justify-content-between"
                                    onClick={() =>
                                        (window.location.href = "/products/new")
                                    }
                                >
                                    {i18n.t("misc.uploadProduct", {
                                        lng
                                    })}
                                    <img
                                        src={require("../assets/images/icon-upload.svg")}
                                        alt="upload"
                                    />
                                </Button>
                            </li>
                            <li>
                                <Button
                                    type="secondary"
                                    className="d-flex align-items-center justify-content-between"
                                    onClick={() =>
                                        (window.location.href =
                                            "/illustrations/new")
                                    }
                                >
                                    {i18n.t("uploadIllustration.upload", {
                                        lng
                                    })}
                                    <img
                                        src={require("../assets/images/icon-upload.svg")}
                                        alt="upload"
                                    />
                                </Button>
                            </li>
                            <li>
                                <Button
                                    type="secondary"
                                    className="d-flex align-items-center justify-content-between"
                                    onClick={() => {
                                        if (this.state.hasPaypal) {
                                            window.location.href =
                                                "/withdrawal";
                                        } else {
                                            this.togglePaypalModal();
                                        }
                                    }}
                                    loading={this.state.checkingPaypal}
                                    disabled={this.state.buttonDisabled}
                                >
                                    {i18n.t(
                                        "brandioIllustration.applyWithdrawal",
                                        { lng }
                                    )}
                                    <img
                                        src={require("../assets/images/icon-piggybank.svg")}
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

    productRender() {
        return this.state.data.map((product, index) => {
            if (product.member_id === parseInt(id) && index === 0) {
                return (
                    <ProductHeader
                        activeBrands={this.state.activeBrands}
                        brands={this.state.brands}
                        title={product.brand_name_eng}
                        description={product.brand_description}
                        imageSrc={product.brand_logo}
                        component="mybrand"
                        toggleFilter={this.toggleFilter}
                    />
                );
            }
        });
    }

    chunk(a, l) {
        return new Array(Math.ceil(a.length / l))
            .fill(0)
            .map((_, n) => a.slice(n * l, n * l + l));
    }
    renderContents(option) {
        switch (option) {
            case "mybrands":
                return this.renderBrandData();
            case "illustrations":
                return <Illustartion />;
            case "inbox":
                return <Message />;
            case "collaboration":
                return <Mycollaboration />;
            default:
                return <Loader />;
        }
    }
    renderBrandData() {
        const { lng, i18n } = this.context;
        const productsChunk = this.chunk(brandioMyBrands.products, 3);

        return (
            <div className="illustaration__list">
                <div className="div__illustration__title">
                    {i18n.t("brandioIllustration.brandList", { lng })}
                </div>
                {this.productRender()}
                {this.state.data.length > 0 ? (
                    <div className="div__menu__product">
                        <div className="div__menu__product__header">
                            <div className="main__product__div">
                                <React.Fragment>
                                    {this.state.data.map(
                                        (product, productIndex) => {
                                            if (
                                                product.member_id ===
                                                parseInt(id)
                                            ) {
                                                return (
                                                    <SingleProduct
                                                        logoImageSrc={
                                                            product.img_logo
                                                        }
                                                        productImageSrc={
                                                            JSON.parse(
                                                                product.exported_images
                                                            )[0]
                                                        }
                                                        brand={product.name_eng}
                                                        productName={
                                                            product.product_name
                                                        }
                                                        productPrice={
                                                            product.price
                                                        }
                                                        personOneImage={
                                                            product.profile_img
                                                        }
                                                        personOneName={
                                                            product.nickname
                                                        }
                                                        personTwoImage={
                                                            product.collaber_img
                                                        }
                                                        personTwoName={
                                                            product.collaber_nickname
                                                        }
                                                        component="mybrand"
                                                        sales={product.sales}
                                                        status={
                                                            product.collaboration_status
                                                        }
                                                        productId={
                                                            product.product_id
                                                        }
                                                        id={product.id}
                                                        exportedImages={JSON.parse(
                                                            product.exported_images
                                                        )}
                                                        memberId={
                                                            product.member_id
                                                        }
                                                        collaberId={
                                                            product.collaber_id
                                                        }
                                                    />
                                                );
                                            }
                                        }
                                    )}
                                </React.Fragment>
                            </div>
                        </div>
                    </div>
                ) : this.state.brands.length > 0 ? (
                    <div>
                        <Empty
                            style={{
                                width: "100%",
                                marginTop: "100px"
                            }}
                            description={`${i18n.t("misc.noProductcrated", {
                                lng
                            })}`}
                        >
                            <Link to="/products/new">
                                <Button
                                    style={{
                                        height: "auto",
                                        padding: "5px 10px",
                                        borderRadius: "8px"
                                    }}
                                >
                                    {i18n.t("misc.uploadProduct", {
                                        lng
                                    })}
                                </Button>
                            </Link>
                        </Empty>
                    </div>
                ) : (
                    <div>
                        <Empty
                            style={{
                                width: "100%",
                                marginTop: "100px"
                            }}
                            description={`${i18n.t("misc.noBrandCreated", {
                                lng
                            })}`}
                        >
                            <Link to="/brands/new">
                                <Button
                                    style={{
                                        height: "auto",
                                        padding: "5px 10px",
                                        borderRadius: "8px"
                                    }}
                                >
                                    {i18n.t("navigation.launchBrand", {
                                        lng
                                    })}
                                </Button>
                            </Link>
                        </Empty>
                    </div>
                )}
            </div>
        );
    }
    render() {
        const { lng, i18n } = this.context;

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
                {this.state.isLoading ? (
                    <Loader />
                ) : (
                    <div
                        className="div__sub div__sub__illustration"
                        id="brandiomybrands"
                    >
                        <div className="div__menu__product illustaration__main__list">
                            {this.renderMenu(
                                this.props.computedMatch.params.option
                            )}
                            {this.renderContents(
                                this.props.computedMatch.params.option
                            )}
                        </div>
                    </div>
                )}
                <Modal
                    visible={this.state.paypalModalVisible}
                    title={`${i18n.t("misc.addPaypal", { lng })}`}
                    onCancel={this.togglePaypalModal}
                    onOk={this.paypalSubmit}
                >
                    <Input
                        placeholder={`${i18n.t("misc.enterPaypal", { lng })}`}
                        onChange={this.handleChange}
                        value={this.state.paypalName}
                    />
                </Modal>
                <div className="container item--10">
                    <div className="wrapper">
                        <Footer />
                    </div>
                </div>
                <Modal
                    header={null}
                    footer={null}
                    visible={this.state.loadingOnBrandChange}
                    centered
                >
                    {this.state.activeBrands.length === 0
                        ? `${i18n.t("misc.loadProducts", { lng })}`
                        : `Loading products for ${this.state.activeBrands}`}
                </Modal>
            </React.Fragment>
        );
    }
}

export default BrandioMyBrands;
