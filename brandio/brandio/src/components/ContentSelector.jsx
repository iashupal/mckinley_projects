import "../assets/css/content-selector.css";
import React, { useRef, useContext } from "react";
import { Tooltip, Button, Modal, Icon } from "antd";
import {
  FiActivity,
  FiImage,
  FiPenTool,
  FiUpload,
  FiInfo,
  FiCheckCircle,
  FiFolder
} from "react-icons/fi";
import { AiOutlineFontSize } from "react-icons/ai";
import HeaderContext from "../context/HeaderContext";

function ContentSelector({
  activeAction,
  changeActiveAction,
  uploadFile,
  toggleModal,
  toggleDeetsModal,
  mode,
  toggleInstructions,
  toggleFandioModal
}) {
  const { lng, i18n } = useContext(HeaderContext);
  const inputFile = useRef(null);
  return (
    <div className="action-button-grid-container">
      {mode === "BRANDIO Collaboration" && (
        <Tooltip
          title={i18n.t("mainEditor.collaborationInstructions", {
            lng
          })}
          placement="left"
        >
          <div
            className="content-button"
            type="primary"
            shape="circle"
            icon="heat-map"
            size="large"
            onClick={() => {
              toggleInstructions();
            }}
            style={{ backgroundColor: "rgb(98, 108, 226)" }}
          >
            <div style={{ textAlign: "center", color: "white" }}>
              <FiCheckCircle />
            </div>
          </div>
        </Tooltip>
      )}

      <div className="action-button-grid">
        {/* <Tooltip
          title={i18n.t("mainEditor.fandioGraphicLibrary", {
            lng
          })}
          placement="left"
        >
          <div
            className="content-button"
            type="primary"
            shape="circle"
            icon="heat-map"
            size="large"
            onClick={() => {
              toggleFandioModal();
            }}
          >
            <div style={{ textAlign: "center" }}>
              <FiFolder />
            </div>
          </div>
        </Tooltip> */}
        <Tooltip
          title={i18n.t("mainEditor.addImages", {
            lng
          })}
          placement="left"
        >
          <div
            className="content-button"
            type="primary"
            shape="circle"
            icon="file-image"
            size="large"
            onClick={() => {
              changeActiveAction(2);
              toggleModal();
            }}
          >
            <div style={{ textAlign: "center" }}>
              <FiImage />
            </div>
          </div>
        </Tooltip>
        <Tooltip
          title={i18n.t("mainEditor.addText", {
            lng
          })}
          placement="left"
        >
          <div
            className="content-button"
            type="primary"
            shape="circle"
            icon="font-size"
            size="large"
            onClick={() => changeActiveAction(3)}
          >
            <div style={{ textAlign: "center" }}>
              <AiOutlineFontSize />
            </div>
          </div>
        </Tooltip>
        <Tooltip
          title={i18n.t("mainEditor.upload", {
            lng
          })}
          placement="left"
        >
          <div
            className="content-button"
            type="primary"
            shape="circle"
            icon="upload"
            size="large"
            onClick={() => inputFile.current.click()}
          >
            <div style={{ textAlign: "center" }}>
              <FiUpload />
            </div>
          </div>
        </Tooltip>
        <Tooltip
          title={i18n.t("mainEditor.editProductDetails", {
            lng
          })}
          placement="left"
        >
          <div
            className="content-button"
            type="primary"
            shape="circle"
            icon="align-left"
            size="large"
            onClick={toggleDeetsModal}
          >
            <div style={{ textAlign: "center" }}>
              <FiInfo />
            </div>
          </div>
        </Tooltip>

        <input
          type="file"
          style={{ display: "none" }}
          ref={inputFile}
          onChange={e => {
            var file = e.target.files[0];
            uploadFile(file);
          }}
        />
      </div>
    </div>
    // </div>
  );
}

export default ContentSelector;
