import React, { Fragment, Component } from "react";
import { Upload, Icon, Checkbox, message } from "antd";
import "antd/lib/button/style/index.css";
import "antd/lib/upload/style/index.css";
import "./../assets/css/BrandioPcIllustrationUpload.css";

//Import component
import Header from "../components/Header/Header";
import HeaderContext from "../context/HeaderContext";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import TermsCondtion from "../components/Common/TermsCondition";
import { illustrationAPI } from "../services/ApiService";

//Covert image to base 64
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}
//Upload check
function beforeUpload(file) {
    const { i18n, lng } = this.context;
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error(`${i18n.t("misc.uploadJPG", { lng })}`);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error(`${i18n.t("misc.imgSize", { lng })}`);
    }
    return isJpgOrPng && isLt2M;
}

class BrandioIllustrationUpload extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            price: null,
            checked: false
        };
    }
    static contextType = HeaderContext;

    handleTextChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    componentDidMount() {
        this.context.headerNameHandler("Brandio");
    }
    handleChange = info => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === "done") {
            console.log(info.event);
        }
    };
    onChangeCheckbox = e => {
        console.log(`checked = ${e.target.checked}`);
        this.setState({ checked: e.target.checked });
    };
    async submit() {
        const { lng, i18n } = this.context;
        if (this.state.checked) {
            let data = {};
            data.image = this.state.imageUrl;
            data.price = this.state.price;
            const response = await illustrationAPI.createProduct(data);
            if (response.status === 200) {
                window.location.href = "/myinfo/illustrations";
            }
        } else {
            message.info(
                `${i18n.t("misc.termConditionError", {
                    lng
                })}`
            );
        }
    }
    render() {
        const { imageUrl } = this.state;
        const { lng, i18n } = this.context;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? "loading" : "plus"} />
                <div className="ant-upload-text">
                    {i18n.t("mainEditor.upload", {
                        lng
                    })}
                </div>
            </div>
        );
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
                        <div className="bpcillustrationupload">
                            <div className="brandioproductcreate__top">
                                <div className="brandioproductcreate__headingbox">
                                    <h4 className="brandioproductcreate__headingbox--main">
                                        {i18n.t("uploadIllustration.upload", {
                                            lng
                                        })}
                                    </h4>
                                    <h6 className="brandioproductcreate__headingbox--sub">
                                        {i18n.t("uploadIllustration.tagLine", {
                                            lng
                                        })}
                                    </h6>
                                </div>
                                <h5 className="bpcillustrationupload__heading">
                                    {i18n.t("uploadIllustration.upload", {
                                        lng
                                    })}
                                </h5>
                                <div className="bpcillustrationupload__contentbox">
                                    <label className="bpcillustrationupload__contentbox--label">
                                        {i18n.t(
                                            "uploadIllustration.uploadFile",
                                            {
                                                lng
                                            }
                                        )}
                                    </label>
                                    <div
                                        className="bpcillustrationupload__contentbox--value"
                                        id="brandcoverphoto"
                                    >
                                        <Upload
                                            name="image"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="https://devfandio.collartt.com/api/images-upload"
                                            onChange={this.handleChange}
                                            onSuccess={res =>
                                                this.setState({
                                                    imageUrl: res.fileurl
                                                })
                                            }
                                        >
                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl}
                                                    alt="avatar"
                                                    style={{ width: "100%" }}
                                                />
                                            ) : (
                                                uploadButton
                                            )}
                                        </Upload>
                                        <div className="color-tertiary sm-text">
                                            {i18n.t(
                                                "uploadIllustration.helpText",
                                                { lng }
                                            )}
                                            <br />
                                            {i18n.t(
                                                "brandioCollaborationCard.image",
                                                { lng }
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="bpcillustrationupload__contentbox">
                                    <label className="bpcillustrationupload__contentbox--label">
                                        {i18n.t("productDetail.price", {
                                            lng
                                        })}
                                    </label>
                                    <div className="bpcillustrationupload__contentbox--value">
                                        <input
                                            type="number"
                                            name="price"
                                            className="primary-input"
                                            onChange={this.handleTextChange}
                                            value={this.state.price}
                                        />
                                        <span className="ml-20">원</span>
                                    </div>
                                </div>
                            </div>

                            <div className="brandioproductcreate__bottom">
                                <h5 className="bpcillustrationupload__heading">
                                    {i18n.t("footer.legalNotice", {
                                        lng
                                    })}
                                </h5>
                                <div className="bpcillustrationupload__checkbox">
                                    <Checkbox
                                        onChange={this.onChangeCheckbox}
                                    />
                                    <span className="checkbox-info">
                                        {i18n.t("createBrand.termOfUse", {
                                            lng
                                        })}
                                    </span>
                                </div>
                                <TermsCondtion />
                                <div className="bpcillustrationupload__submitbox">
                                    <button
                                        className="btn btn-tertitary"
                                        onClick={e => this.submit()}
                                    >
                                        {i18n.t(
                                            "uploadIllustration.registerSingleProduct",
                                            {
                                                lng
                                            }
                                        )}
                                    </button>
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
            </Fragment>
        );
    }
}

export default BrandioIllustrationUpload;
