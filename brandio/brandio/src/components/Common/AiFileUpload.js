import React from "react";
import { Modal, Button, Upload, Icon, message } from "antd";
import MultipleUpload from "../Common/MultipleUpload";
import { commmonAPI, individualAPI } from "../../services/ApiService";
import HeaderContext from "./../../context/HeaderContext";
import "./../ReviewModal/ReviewModal.css";
import "antd/lib/upload/style/index.css";

class AiFileUpload extends React.Component {
    state = {
        visible: false,
        loading: false,
        fileList: [],
        data: this.props.data,
        exported_images: [],
        design_file: null,
        descImg: null
    };
    static contextType = HeaderContext;
    handleChange = info => {
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-2);

        // 2. Read from response and show file link
        fileList = fileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });
        console.log("file info called", info);
        this.setState({ fileList: info });
    };

    showModal = () => {
        this.setState({
            visible: true
        });
    };
    setImageUrl = (url, type) => {
        if (type === "collaborationImage") {
            this.setState({
                exported_images: [...this.state.exported_images, url]
            });
        }
        if (type === "discription") {
            this.setState({
                descImg: url
            });
        }
    };
    beforeUpload = file => {
        const { i18n, lng } = this.context;
        const isAI =
            file.type === "application/postscript" || file.type === "ai";
        if (!isAI) {
            message.error(`${i18n.t("misc.uploadAIFile", { lng })}`);
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
            message.error(`${i18n.t("misc.imgSize5MB", { lng })}`);
        }
        return isAI && isLt2M;
    };
    handleOk = async e => {
        const { i18n, lng } = this.context;
        console.log("recived data in AI", this.state);
        if (this.state.design_file === null) {
            message.info(`${(i18n.t("misc.uploadAIFile"), { lng })}`);
            return;
        }
        if (this.state.exported_images.length === 0) {
            message.info(`${(i18n.t("misc.uploadFile"), { lng })}`);
            return;
        }
        if (this.state.data.brandId === "") {
            message.info(`${(i18n.t("misc.slctBrand"), { lng })}`);
            return;
        }

        if (this.state.data.itemPrice === "") {
            message.info(`${(i18n.t("misc.setProdPrice"), { lng })}`);
            return;
        }
        if (this.state.data.productName === "") {
            message.info(`${(i18n.t("misc.setProd"), { lng })}`);
            return;
        } else {
            let payload = {
                brandId: this.props.data.brandId,
                productName: this.props.data.productName,
                itemId: this.props.data.productData[0].id,
                price: this.props.data.itemPrice,
                categoryId: this.props.data.productData[0].categoryId,
                exportedImages: this.state.exported_images,
                designFile: this.state.design_file,
                descImg: this.state.descImg
            };
            // console.log("payload", payload);
            const response = await individualAPI.createProduct(payload);
            if (response.status === 200) {
                message.info(`${(i18n.t("misc.createProd"), { lng })}`);
                window.location.href = `/products/new`;
            }
        }
    };

    handleCancel = e => {
        this.setState({
            visible: false
        });
    };
    customUpload = async data => {
        this.setState({ loading: true });
        let response = await commmonAPI.imageUpload(data);
        if (response.status === 200) {
            this.setState({
                loading: false,
                design_file: response.data.fileurl
            });
        }
    };
    render() {
        const props = {
            action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
            onChange: this.handleChange,
            multiple: true
        };
        const { lng, i18n } = this.context;
        return (
            <div className="aifilbtn-inner">
                <span onClick={this.showModal} className="aifilebtn">
                    {i18n.t("misc.aifile", {
                        lng
                    })}
                </span>
                <Modal
                    title={` ${i18n.t("misc.aifile", {
                        lng
                    })}`}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    className="productdetail__reviewmodal aifileuploadpage"
                    okText={` ${i18n.t("misc.createProduct", {
                        lng
                    })}`}
                >
                    <div className="aifileupload-modal__inner--top">
                        <div className="aifileupload-modal__inner--bottom">
                            <h6 className="multipleupload-heading">
                                {i18n.t("misc.aifile", {
                                    lng
                                })}
                            </h6>
                            <Upload
                                beforeUpload={this.beforeUpload}
                                customRequest={e => this.customUpload(e)}
                                onChange={this.handleChange}
                            >
                                <Icon
                                    type={
                                        this.state.loading ? "loading" : "plus"
                                    }
                                />
                                <div className="ant-upload-text">
                                    {i18n.t("misc.upload", {
                                        lng
                                    })}
                                </div>
                            </Upload>
                        </div>
                    </div>
                    <div className="aifileupload-modal__inner--bottom">
                        <h6 className="multipleupload-heading">
                            {i18n.t("misc.productDisplayImg", {
                                lng
                            })}
                        </h6>
                        <div class="multipleupload-outer aimultiupload">
                            <div className="multipleupload">
                                <MultipleUpload
                                    setImageUrl={this.setImageUrl}
                                    type={"collaborationImage"}
                                />
                                <MultipleUpload
                                    disabled={
                                        this.state.exported_images.length < 1
                                    }
                                    setImageUrl={this.setImageUrl}
                                    type={"collaborationImage"}
                                />
                                <MultipleUpload
                                    disabled={
                                        this.state.exported_images.length < 2
                                    }
                                    setImageUrl={this.setImageUrl}
                                    type={"collaborationImage"}
                                />
                                <MultipleUpload
                                    disabled={
                                        this.state.exported_images.length < 3
                                    }
                                    setImageUrl={this.setImageUrl}
                                    type={"collaborationImage"}
                                />
                            </div>
                            <div className="aifileupload-modal__inner--bottom">
                                <h6 className="multipleupload-heading">
                                    {i18n.t("misc.productDescImg", {
                                        lng
                                    })}
                                </h6>
                                <div>
                                    <div className="multipleupload">
                                        <MultipleUpload
                                            setImageUrl={this.setImageUrl}
                                            type={"discription"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default AiFileUpload;
