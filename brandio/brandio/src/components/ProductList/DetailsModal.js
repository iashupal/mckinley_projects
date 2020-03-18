import React from "react";
import { Modal } from "antd";

import HeaderContext from "../../context/HeaderContext";

class DetailsModal extends React.Component {
    state = { visible: false, loading: false };
    async componentDidMount() {}
    static contextType = HeaderContext;

    showModal = async () => {
        this.setState({
            visible: true
        });
    };

    handleOk = e => {
        this.setState({
            visible: false
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false
        });
    };

    render() {
        const { lng, i18n } = this.context;

        return (
            <div id="reviewmodalbtn">
                <span onClick={this.showModal}>
                    + {i18n.t("productDetail.productDetail", { lng })}
                </span>
                <Modal
                    title={`${i18n.t("productDetail.productDetail", { lng })}`}
                    footer={null}
                    visible={this.state.visible}
                    onOk={false}
                    onCancel={this.handleCancel}
                    className="productdetail__reviewmodal"
                    width={675}
                >
                    <div>
                        {this.props.exportedImages.map(img => {
                            return <img src={img} style={{ width: 150 }} />;
                        })}
                    </div>
                </Modal>
            </div>
        );
    }
}

export default DetailsModal;
