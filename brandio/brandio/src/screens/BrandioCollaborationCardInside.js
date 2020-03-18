import React, { Component } from "react";
import { Checkbox } from "antd";

import "./../assets/css/FandioBrandMallList.css";
import "./../assets/css/BrandioCollaborationCardInside.css";

import HeaderContext from "../context/HeaderContext";
import Header from "../components/Header/Header";
import Navbar from "./../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ArtistPhoto from "../components/Artist/ArtistPhoto";
import TermsCondition from "../components/Common/TermsCondition";
import Cookies from "js-cookie";
import Loader from "../screens/Loader";
import Timer from "../components/Common/Timer";
import { collaborationAPI, brandsAPI, itemAPI } from "../services/ApiService";

class BarndioCollaborationCardInside extends Component {
    static contextType = HeaderContext;

    state = { data: {}, brandData: {}, item: {}, loading: false, terms: false };

    async componentDidMount() {
        this.context.headerNameHandler("Brandio");
        const collaborationId = this.props.computedMatch.params.id;
        const collaboration = await collaborationAPI.getBaseProduct(
            collaborationId
        );
        this.setState({ data: collaboration.data.Data[0] });
        const brandDetail = await brandsAPI.brandDetails(
            collaboration.data.Data[0].url
        );

        await this.setState({
            brandData: brandDetail.data.Data,
            loading: true
        });
    }
    imageList() {
        let imgArray = JSON.parse(this.state.data.collaboration_images);
        return imgArray.map((data, index) => {
            return (
                <img src={data} alt="product" className="bcci-rhs-products" />
            );
        });
    }
    collaborator() {
        return this.state.brandData.collaborator.map((data, index) => {
            return (
                <ArtistPhoto
                    name={data.nickname}
                    path={
                        data.profile_img === null || data.profile_img === "null"
                            ? require("./../assets/images/artist-2.svg")
                            : data.profile_img
                    }
                    alt="Collaborater Avatar"
                    id={data.id}
                />
            );
        });
    }
    submit = () => {
        if (this.state.terms) {
            window.location.href = `/main-editor/${this.state.data.item_id}/c?cid=${this.state.data.id}`;
        } else {
            alert("Please accept terms and condtion");
        }
    };
    onChangeCheckbox = e => {
        this.setState({ terms: e.target.checked });
    };
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    render() {
        const { lng, i18n } = this.context;
        console.log("brand data", this.state.brandData);
        return (
            <div className="App container" id="bcci">
                <div className="container item--1 wrapper">
                    <Header />
                </div>
                <div className="container item--2">
                    <div className="menu">
                        <Navbar />
                    </div>
                </div>

                {this.state.loading ? (
                    <React.Fragment>
                        <div className="container item--3">
                            <div className="wrapper brand-intro">
                                <div className="brand-intro__logo-box">
                                    <img
                                        src={
                                            this.state.brandData.brandDetails[0]
                                                .img_logo === ""
                                                ? require("../assets/images/brand-logo-4.svg")
                                                : this.state.brandData
                                                      .brandDetails[0].img_logo
                                        }
                                        alt="IAB Studio"
                                        className="brand-intro__logo"
                                    />
                                </div>
                                <div className="brand-intro__content-box">
                                    <h3 className="brand-intro__heading">
                                        {lng === "kr"
                                            ? this.state.brandData
                                                  .brandDetails[0].name_kor
                                            : this.state.brandData
                                                  .brandDetails[0].name_eng}
                                    </h3>
                                    <p className="brand-intro__paragraph">
                                        {
                                            this.state.brandData.brandDetails[0]
                                                .description
                                        }
                                    </p>
                                    <div
                                        className="brand-intro__photos"
                                        id="fandiobrandmallintrophotos"
                                    >
                                        <ArtistPhoto
                                            name={
                                                this.state.brandData
                                                    .brandDetails[0].artist
                                                    .nickname
                                            }
                                            path={
                                                this.state.brandData
                                                    .brandDetails[0].artist
                                                    .profile_img === null ||
                                                this.state.brandData
                                                    .brandDetails[0].artist ===
                                                    "null"
                                                    ? require("./../assets/images/artist-1.svg")
                                                    : this.state.brandData
                                                          .brandDetails[0]
                                                          .artist.profile_img
                                            }
                                            alt="Artist Avatar"
                                            id={
                                                this.state.brandData
                                                    .brandDetails[0].member_id
                                            }
                                        />
                                        <div className="spacer">
                                            <img
                                                src={require("./../assets/images/icon-spacer-1.svg")}
                                                alt="Spacer"
                                            />
                                        </div>
                                        {this.collaborator()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container item--4">
                            <div className="wrapper">
                                <div className="bcci">
                                    <div className="bcci__heading">
                                        {this.state.data.collaboration_title}
                                    </div>
                                    <div className="bcci__counter">
                                        <Timer
                                            dueDate={
                                                this.state.data
                                                    .collaboration_due_date
                                            }
                                        />
                                    </div>
                                    <div className="bcci__productcontentbox">
                                        <div className="bcci__productbox">
                                            <div>
                                                <img
                                                    src={
                                                        this.state.data
                                                            .item_front_img
                                                    }
                                                    alt="blank"
                                                    className="bcci__productbox--product"
                                                />
                                            </div>
                                        </div>
                                        <div className="bcci__productinfobox">
                                            <div className="bcci__productinfo">
                                                <label className="bcci__productinfo--label">
                                                    {i18n.t(
                                                        "brandioCollaborationCard.name",
                                                        { lng }
                                                    )}
                                                </label>
                                                <span className="bcci__productinfo--value">
                                                    {
                                                        this.state.data
                                                            .product_name
                                                    }
                                                </span>
                                            </div>
                                            <div className="bcci__productinfo">
                                                <label className="bcci__productinfo--label">
                                                    {i18n.t(
                                                        "brandioCollaborationCard.type",
                                                        { lng }
                                                    )}
                                                </label>
                                                <span className="bcci__productinfo--value">
                                                    {
                                                        this.state.data
                                                            .product_type
                                                    }
                                                </span>
                                            </div>
                                            <div className="bcci__productinfo">
                                                <label className="bcci__productinfo--label">
                                                    {i18n.t(
                                                        "brandioCollaborationCard.size",
                                                        { lng }
                                                    )}
                                                </label>
                                                <span className="bcci__productinfo--value">
                                                    {JSON.parse(
                                                        this.state.data.sizes
                                                    ).map((data, index) => {
                                                        return (
                                                            <span
                                                                style={{
                                                                    textTransform:
                                                                        "uppercase",
                                                                    paddingRight: 10
                                                                }}
                                                            >
                                                                {data}
                                                                {"    "}{" "}
                                                            </span>
                                                        );
                                                    })}
                                                </span>
                                            </div>
                                            <div className="bcci__productinfo">
                                                <label className="bcci__productinfo--label">
                                                    {i18n.t(
                                                        "brandioCollaborationCard.return",
                                                        { lng }
                                                    )}
                                                </label>
                                                <span className="bcci__productinfo--value">
                                                    <label className="color-tertiary bold">
                                                        {
                                                            this.state.data
                                                                .collaboration_share
                                                        }
                                                        %
                                                    </label>
                                                    <label className="bcci__productinfo--condition">
                                                        (
                                                        {i18n.t(
                                                            "brandioCollaborationCard.returnHelpText",
                                                            {
                                                                lng
                                                            }
                                                        )}
                                                        )
                                                    </label>
                                                </span>
                                            </div>
                                            <div className="bcci__productinfo">
                                                <label className="bcci__productinfo--label">
                                                    {i18n.t(
                                                        "brandioCollaborationCard.price",
                                                        { lng }
                                                    )}
                                                </label>
                                                <span className="bcci__productinfo--value">
                                                    <label className="color-tertiary bold">
                                                        {this.numberWithCommas(
                                                            this.state.data
                                                                .price
                                                        )}{" "}
                                                        원
                                                    </label>
                                                </span>
                                            </div>
                                            <div className="bcci__productinfo">
                                                <label className="bcci__productinfo--label">
                                                    {i18n.t(
                                                        "brandioCollaborationCard.image",
                                                        { lng }
                                                    )}
                                                </label>
                                                <span className="bcci__productinfo--productphotos">
                                                    {this.state.loading
                                                        ? this.imageList()
                                                        : null}
                                                </span>
                                            </div>
                                            <div className="bcci__productinfo">
                                                <label className="bcci__productinfo--label pt7">
                                                    {i18n.t(
                                                        "brandioCollaborationCard.collaborationReq",
                                                        {
                                                            lng
                                                        }
                                                    )}
                                                </label>
                                                <span className="bcci__productinfo--value">
                                                    <p className="bcci__description">
                                                        {
                                                            this.state.data
                                                                .collaboration_description
                                                        }
                                                    </p>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bcci__checkbox">
                                        <Checkbox
                                            onChange={this.onChangeCheckbox}
                                        ></Checkbox>
                                        <span className="checkbox-info">
                                            {i18n.t("termCondition.checkbox", {
                                                lng
                                            })}
                                        </span>
                                    </div>
                                    <TermsCondition />
                                    <div className="bcci__submitbox">
                                        <button
                                            className="btn btn-tertitary"
                                            onClick={this.submit}
                                        >
                                            {i18n.t(
                                                "brandioCollaborationCard.apply",
                                                {
                                                    lng
                                                }
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                ) : (
                    <Loader />
                )}
                <div className="container item--10">
                    <div className="wrapper">
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}

export default BarndioCollaborationCardInside;
