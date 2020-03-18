import React from "react";
import { Modal, Button, Upload, Icon, message, Rate } from "antd";
import HeaderContext from "./../context/HeaderContext";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

class ReviewModal extends React.Component {
    state = { visible: false, loading: false };

    static contextType = HeaderContext;

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false
        });
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
    beforeUpload = file => {
        const { i18n, lng } = this.context;
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error(`${i18n.t("misc.uploadJPG", { lng })}`);
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error(`${i18n.t("misc.imgSize", { lng })}`);
        }
        return isJpgOrPng && isLt2M;
    };
    render() {
        const { i18n, lng } = this.context;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? "loading" : "plus"} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    {(i18n.t("misc.submtRvw"), { lng })}
                </Button>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={this.beforeUpload}s
                        onChange={this.handleChange}
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
                    <Rate />
                </Modal>
            </div>
        );
    }
}

export default ReviewModal;
