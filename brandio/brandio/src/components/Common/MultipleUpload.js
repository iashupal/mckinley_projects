import React from "react";
import { Upload, Icon, message } from "antd";
import "antd/lib/upload/style/index.css";
import { commmonAPI } from "../../services/ApiService";
import HeaderContext from "./../../context/HeaderContext";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

class MultipleUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            type: this.props.type
        };
    }
    static contextType = HeaderContext;
    customUpload = async data => {
        this.setState({ loading: true });
        let response = await commmonAPI.imageUpload(data);
        if (response.status === 200) {
            this.setState({ loading: false, imageUrl: response.data.fileurl });
            this.props.setImageUrl(response.data.fileurl, this.state.type);
        }
    };
    handleChange = info => {
        console.log("info", info);
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
    beforeUpload = file => {
        const { i18n, lng } = this.context;
        console.log("file", file);
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error(`${i18n.t("misc.uploadJPG", { lng })}`);
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
            message.error(`${i18n.t("misc.imgSize", { lng })}`);
        }
        return isJpgOrPng && isLt2M;
    };
    render() {
        const { imageUrl } = this.state;
        const { disabled } = this.props;
        const { lng, i18n } = this.context;
        const uploadButton = (
            <div style={{ display: disabled ? "none" : "block" }}>
                <Icon type={this.state.loading ? "loading" : "plus"} />
                <div className="ant-upload-text">
                    {i18n.t("misc.upload", {
                        lng
                    })}
                </div>
            </div>
        );
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                multiple={false}
                beforeUpload={this.beforeUpload}
                customRequest={e => this.customUpload(e)}
                disabled={disabled}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: "100%" }}
                        className="hexagonpic"
                    />
                ) : (
                    uploadButton
                )}
            </Upload>
        );
    }
}

export default MultipleUpload;
