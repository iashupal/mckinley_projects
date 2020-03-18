import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";

function ModalDefault({
  visible,
  title,
  clickCancel,
  clickConfirm,
  children,
  footer
}) {
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={clickConfirm}
      onCancel={clickCancel}
      centered={true}
      footer={footer}
    >
      {children}
    </Modal>
  );
}

ModalDefault.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  clickCancel: PropTypes.func.isRequired,
  clickConfirm: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
};

export default ModalDefault;
