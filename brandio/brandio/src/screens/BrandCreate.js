import React, { Fragment, Component } from "react";
import { Checkbox, message } from "antd";
import "antd/lib/button/style/index.css";
import "antd/lib/upload/style/index.css";
import "./../assets/css/BrandioBrandCreate.css";

//Import component
import HeaderContext from "../context/HeaderContext";
import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import TermsCondtion from "../components/Common/TermsCondition";
import MultipleUpload from "../components/Common/MultipleUpload";
import { brandsAPI } from "../services/ApiService";

//Covert image to base 64
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

class BrandCreate extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            brandEng: "",
            brandKor: "",
            brandUrl: "",
            brandSlogan: "",
            brandDesc: "",
            brandLogo: "",
            brandCover: "",
            terms: false
        };
    }

    static contextType = HeaderContext;
    componentDidMount() {
        this.context.headerNameHandler("Brandio");
    }
    //Input change
    handleChangeInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    //Submit handler
    submit = async () => {
        const { lng, i18n } = this.context;
        console.log("lang", lng);
        if (this.state.brandEng === "" || this.state.brandKor === "") {
            message.info(`${i18n.t("misc.enterBrand")}`);
            return;
        }
        if (this.state.brandUrl === "") {
            message.info(`${i18n.t("misc.brandURL")}`);
            return;
        }
        if (this.state.terms === false) {
            message.info(`${i18n.t("misc.acceptTerms")}`);
            return;
        }
        if (this.state.brandSlogan === "") {
            message.info(`${i18n.t("misc.brandSlogan")}`);
            return;
        } else {
            let data = this.state;
            delete data.loading;
            delete data.terms;
            const response = await brandsAPI.createBrand(data);
            if (response.status === 200) {
                message.success(`${i18n.t("misc.designSendOwnr", { lng })}`);
                setTimeout(() => {
                    window.location.href = "/brands";
                });
            }
        }
    };
    handleChange = info => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === "done") {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false
                })
            );
        }
    };
    onChangeCheckbox = e => {
        this.setState({ terms: e.target.checked });
    };
    setImageUrl = (url, type) => {
        switch (type) {
            case "logo":
                this.setState({ brandLogo: url });
                break;
            case "cover":
                this.setState({ brandCover: url });
                break;
            default:
                console.log("error");
                break;
        }
    };
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
                        <div className="brandiobrandcreate">
                            <div className="headingbox">
                                <h4 className="headingbox__main">
                                    {i18n.t("navigation.launchBrand", { lng })}
                                </h4>
                                <h6
                                    className="headingbox__sub"
                                    style={{ fontWeight: "lighter" }}
                                >
                                    {i18n.t("createBrand.tagline", { lng })}
                                </h6>
                            </div>
                            <div className="brandiobrandcreate__contentbox">
                                <label className="brandiobrandcreate__contentbox--label">
                                    {i18n.t("createBrand.brandName", { lng })} *
                                </label>
                                <div className="brandiobrandcreate__contentbox--value">
                                    <input
                                        type="text"
                                        placeholder={i18n.t(
                                            "createBrand.brandNameEnglish",
                                            {
                                                lng
                                            }
                                        )}
                                        className="primary-input input-height-40"
                                        name="brandEng"
                                        onChange={e =>
                                            this.handleChangeInput(e)
                                        }
                                    />
                                    <input
                                        type="text"
                                        placeholder={i18n.t(
                                            "createBrand.brandNameKo",
                                            { lng }
                                        )}
                                        className="primary-input m10 input-height-40"
                                        name="brandKor"
                                        onChange={e =>
                                            this.handleChangeInput(e)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="brandiobrandcreate__contentbox">
                                <label className="brandiobrandcreate__contentbox--label">
                                    {i18n.t("createBrand.brandUrl", { lng })} *
                                </label>
                                <div className="brandiobrandcreate__contentbox--value">
                                    <span>http://www.fandio.diocian.com/</span>
                                    <input
                                        type="text"
                                        placeholder=""
                                        className="url-input m10 input-height-40"
                                        name="brandUrl"
                                        onChange={e =>
                                            this.handleChangeInput(e)
                                        }
                                    />
                                    <span className="color-slate-blue sm-text">
                                        {i18n.t(
                                            "createBrand.brandUrlHelpText",
                                            { lng }
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="brandiobrandcreate__contentbox">
                                <label className="brandiobrandcreate__contentbox--label">
                                    {i18n.t("createBrand.brandLogo", { lng })}
                                </label>
                                <div className="brandiobrandcreate__uploadbox">
                                    <div className="brandiobrandcreate__uploadbox--upload">
                                        <MultipleUpload
                                            setImageUrl={this.setImageUrl}
                                            type={"logo"}
                                        />
                                        <div className="color-slate-blue sm-text">
                                            {i18n.t(
                                                "uploadIllustration.helpText",
                                                { lng }
                                            )}
                                            .
                                        </div>
                                    </div>
                                    <div className="brandiobrandcreate__uploadbox--info">
                                        <div className="brandiobrandcreate__brandlogobox">
                                            <img
                                                src={require("../assets/images/brand-logo-4.svg")}
                                                alt="brand"
                                                className="brandiobrandcreate__brandlogo"
                                            />
                                            <span className="brandiobrandcreate__brandname">
                                                brand name
                                            </span>
                                        </div>
                                        <p className="helpinfo color-slate-blue">
                                            {i18n.t(
                                                "createBrand.brandLogoHelpText",
                                                { lng }
                                            )}
                                            .
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="brandiobrandcreate__contentbox">
                                <label className="brandiobrandcreate__contentbox--label">
                                    {i18n.t("createBrand.brandCoverImage", {
                                        lng
                                    })}
                                </label>
                                <div
                                    className="brandiobrandcreate__contentbox--value"
                                    id="brandcoverphoto"
                                >
                                    <MultipleUpload
                                        setImageUrl={this.setImageUrl}
                                        type={"cover"}
                                    />
                                    <div className="color-slate-blue sm-text">
                                        {i18n.t("uploadIllustration.helpText", {
                                            lng
                                        })}
                                        <br />
                                    </div>
                                </div>
                            </div>
                            <div className="brandiobrandcreate__contentbox">
                                <label className="brandiobrandcreate__contentbox--label">
                                    {i18n.t("createBrand.brandSlogan", { lng })}{" "}
                                    *
                                </label>
                                <div className="brandiobrandcreate__contentbox--value">
                                    <div className="fullinputbox">
                                        <input
                                            type="text"
                                            name="brandSlogan"
                                            className="fullinputbox__field input-height-40"
                                            onChange={e =>
                                                this.handleChangeInput(e)
                                            }
                                        />
                                        <span className="fullinputbox__badge">
                                            ({this.state.brandSlogan.length}/60)
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="brandiobrandcreate__contentbox">
                                <label className="brandiobrandcreate__contentbox--label">
                                    {i18n.t("createBrand.brandInto", { lng })}
                                </label>
                                <div className="brandiobrandcreate__contentbox--value overflowhidden">
                                    <textarea
                                        className="primary-textarea"
                                        name="brandDesc"
                                        onChange={e =>
                                            this.handleChangeInput(e)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="brandiobrandcreate__checkbox">
                                <Checkbox onChange={this.onChangeCheckbox} />
                                <span className="checkbox-info">
                                    {i18n.t("createBrand.brandTermIntoText", {
                                        lng
                                    })}
                                </span>
                            </div>
                            <TermsCondtion />
                            <div className="brandiobrandcreate__submitbox">
                                <button
                                    className="btn btn-tertitary"
                                    onClick={this.submit}
                                >
                                    {i18n.t("createBrand.applyBtn", {
                                        lng
                                    })}
                                </button>
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

export default BrandCreate;
