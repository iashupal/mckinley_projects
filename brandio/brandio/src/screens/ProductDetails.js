import React, { Component } from "react";
import { Pagination } from "antd";
import { Menu, Dropdown, Button, Icon, message } from "antd";
import "./../assets/css/ProductDetail.css";
// import "antd/dist/antd.css";

// Import Components
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ProductImgGallery from "../components/ImageGallery/ProductImgGallery";
import ReviewModal from "../components/ReviewModal/ReviewModal";
import HeaderContext from "./../context/HeaderContext";
import productDetail from "./../utils/dummy/productDetail";
import {
    userAPI,
    collaborationAPI,
    individualAPI
} from "../services/ApiService";
import productDetails from "../utils/dummy/createProductDetail";

// Product Image
class ProductDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { data: null, loading: false, size: "S" };
    }
    static contextType = HeaderContext;
    async componentDidMount() {
        console.log(this.props);
        let productId = this.props.match.params.productID
            ? this.props.match.params.productID
            : 1;
        let productType = this.props.location.state.productType;
        if (productType === "individual") {
            let productDetail = await individualAPI.productDetails(productId);
            console.log("indivusal detail", productDetail);
            this.setState({ data: productDetail.data.Data });
        }
        if (productType === "collaboration") {
            let productDetail = await collaborationAPI.productDetails(
                productId
            );
            this.setState({ data: productDetail.data.Data, loading: true });
            //console.log("collaboration detail", productDetail);
        }
    }
    // Product size dropdown menu
    handleMenuClick = e => {
        const { lng, i18n } = this.context;
        message.info(`${i18n.t("misc.menuItem", {lng})}`, e);
    };
    menu = () => (
        <Menu
            onClick={e => {
                this.setState({ size: e.key });
            }}
        >
            {this.renderSize()}
        </Menu>
    );
    renderSize() {
        return productDetail[0].size.map(size => (
            <Menu.Item key={size}>{size}</Menu.Item>
        ));
    }
    //Add cart
    addCart() {
        alert("Add to cart clicked");
    }
    //Add cart
    buyNow = async () => {
        console.log("buy now clicked");
        let data = {
            item_id: this.state.data.id,
            size: this.state.size,
            quantity: 1
        };
        const buynow = await userAPI.addPurchases(data);
        if (buynow.status === 200) {
            window.location.href = "/mydio";
        }
    };

    render() {
        // const { data } = this.state;
        console.log("recived data", this.state.data);
        const { lng, i18n } = this.context;
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
                {this.state.loading ? (
                    <div className="container item--3">
                        <div className="wrapper">
                            <div className="pdetail-topsection">
                                <div className="pdetail-productphoto">
                                    <ProductImgGallery
                                        images={this.state.data.exportedImages}
                                    />
                                </div>
                                <div className="pdetail__info">
                                    <h3 className="pdetail__info--pname">
                                        {productDetail[0].name}
                                    </h3>
                                    <div className="pdetail__info--delivery">
                                        <div className="won">
                                            <img
                                                src={require("./../assets/images/icon-won.svg")}
                                                alt="won"
                                                className="pdetail-infoicon"
                                            />
                                            <label className="pdetail-info-label">
                                                {i18n.t("productDetail.price", {
                                                    lng
                                                })}
                                            </label>
                                            <span className="won__value">
                                                {this.state.data.price} 원
                                            </span>
                                        </div>
                                        <div className="deliverytime">
                                            <img
                                                src={require("./../assets/images/icon-delivery.svg")}
                                                alt="won"
                                                className="pdetail-infoicon"
                                            />
                                            <label className="pdetail-info-label">
                                                {i18n.t(
                                                    "productDetail.delivery",
                                                    {
                                                        lng
                                                    }
                                                )}
                                            </label>
                                            <span className="won__value">
                                                당일배송
                                            </span>
                                        </div>
                                    </div>
                                    <div className="pdetail__info--size">
                                        <label className="pdetail-info-label">
                                            {i18n.t(
                                                "brandioCollaborationCard.size",
                                                { lng }
                                            )}
                                        </label>
                                        <Dropdown
                                            overlay={this.menu}
                                            className="dropdown-lg"
                                        >
                                            <Button>
                                                {this.state.size}
                                                <Icon type="down" />
                                            </Button>
                                        </Dropdown>
                                    </div>
                                    <div className="pdetail__info--totalprice">
                                        <label className="total-label">
                                            {i18n.t(
                                                "productDetail.totalAmount",
                                                {
                                                    lng
                                                }
                                            )}
                                        </label>
                                        <span className="total-value">
                                            {this.state.data.price} 원
                                        </span>
                                    </div>
                                    <div className="pdetail__info--button">
                                        <button
                                            className="btn btn-primary"
                                            onClick={e => this.addCart()}
                                        >
                                            {i18n.t("productDetail.shopBag", { lng })}
                                            
                                        </button>
                                        <button
                                            className="btn btn-secondary ml-23"
                                            onClick={e => this.buyNow()}
                                        >
                                        {i18n.t("productDetail.buy", { lng })}    
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
                <div className="container item--4">
                    <div className="wrapper">
                        <div className="pdetail-contentbox">
                            <img
                                src={require("./../assets/images/productDetail.jpg")}
                                alt="Product Detail Content"
                            />
                        </div>
                    </div>
                </div>
                <div className="container item--5 white-bg">
                    <div className="wrapper">
                        <div className="pdetail-reviewbox">
                            <div className="pdetail__reviewheading">
                                {i18n.t("productDetail.review", { lng })}{" "}
                                <label className="value">195</label>{" "}
                                <img
                                    src={require("./../assets/images/icon-stars.svg")}
                                    alt="stars"
                                />
                            </div>
                            <div className="pdetail__reviewimages-box">
                                <div className="pdetail__reviewimages-box--inner">
                                    <img
                                        src={require("./../assets/images/review-pic.jpg")}
                                        alt="review"
                                        className="pdetail__reviewimages"
                                    />
                                </div>
                                <div className="pdetail__reviewimages-box--inner">
                                    <img
                                        src={require("./../assets/images/review-pic.jpg")}
                                        alt="review"
                                        className="pdetail__reviewimages"
                                    />
                                </div>
                                <div className="pdetail__reviewimages-box--inner">
                                    <img
                                        src={require("./../assets/images/review-pic.jpg")}
                                        alt="review"
                                        className="pdetail__reviewimages"
                                    />
                                </div>
                                <div className="pdetail__reviewimages-box--inner">
                                    <img
                                        src={require("./../assets/images/review-pic.jpg")}
                                        alt="review"
                                        className="pdetail__reviewimages"
                                    />
                                </div>
                                <div className="pdetail__reviewimages-box--inner">
                                    <img
                                        src={require("./../assets/images/review-pic.jpg")}
                                        alt="review"
                                        className="pdetail__reviewimages"
                                    />
                                </div>
                                <div className="pdetail__reviewimages-box--inner">
                                    <img
                                        src={require("./../assets/images/review-pic.jpg")}
                                        alt="review"
                                        className="pdetail__reviewimages"
                                    />
                                </div>
                                <div className="pdetail__reviewimages-box--inner">
                                    <img
                                        src={require("./../assets/images/review-pic.jpg")}
                                        alt="review"
                                        className="pdetail__reviewimages"
                                    />
                                </div>
                                <div className="pdetail__reviewimages-box--inner">
                                    <img
                                        src={require("./../assets/images/review-pic.jpg")}
                                        alt="review"
                                        className="pdetail__reviewimages"
                                    />
                                </div>
                            </div>
                            <div className="pdetail__reviewfooter">
                                <div className="pdetail_footerpagination">
                                    <Pagination defaultCurrent={1} total={50} />
                                </div>
                                <div className="pdetail_footerbtn">
                                    <ReviewModal />
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
            </div>
        );
    }
}

export default ProductDetails;
