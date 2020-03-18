import "../assets/css/right-bar.css";
import React, { Fragment, useContext } from "react";
import {
  Tag,
  Dropdown,
  ContentSwitcher,
  Switch
} from "carbon-components-react";
import {
  Radio,
  Select,
  Typography,
  Button,
  Modal,
  Divider,
  Skeleton
} from "antd";
import {
  ShoppingBag16,
  Save16,
  Collaborate16,
  Information16
} from "@carbon/icons-react";
import { CompactPicker } from "react-color";
import { Link } from "react-scroll";
import { itemWithoutCors } from "./dummy/responses";
import CurrencyFormat from "react-currency-format";
import HeaderContext from "../context/HeaderContext";

const { Option } = Select;

const fonts = [
  { id: "Times New Roman", text: "Times New Roman" },
  { id: "Courier New", text: "Courier New" },
  { id: "Lobster", text: "Lobster" },
  { id: "Open Sans", text: "Open Sans" },
  { id: "Open Sans Condensed", text: "Open Sans Condensed" },
  { id: "Dosis", text: "Dosis" },
  { id: "Mansalva", text: "Mansalva" },
  { id: "Big Shoulders Text", text: "Big Shoulders Text" },
  { id: "Montserrat", text: "Montserrat" },
  { id: "Pacifico", text: "Pacifico" },
  { id: "Roboto", text: "Roboto" },
  { id: "Roboto Slab", text: "Roboto Slab" }
];

function RightBar({
  save,
  selectedObjectType,
  changeFont,
  changeColor,
  selectedColor,
  selectedFont,
  selectedSide,
  changeSelectedSide,
  mode,
  item,
  params,
  toggleSelectedSideModal,
  sidesModalVisible,
  collaborationObject,
  productPrice
}) {
  const { lng, i18n } = useContext(HeaderContext);
  const buttonText = {
    "BRANDIO Collaboration": [
      i18n.t("mainEditor.completeCollaboration", {
        lng
      }),
      Collaborate16
    ],
    "BRANDIO Individual": [
      i18n.t("mainEditor.createProduct", {
        lng
      }),
      Save16
    ],
    "FANDIO Custom": [
      i18n.t("mainEditor.completePurchase", {
        lng
      }),
      ShoppingBag16
    ]
  };

  const buttonIcon = {
    "BRANDIO Collaboration": "usergroup-add",
    "BRANDIO Individual": "file-add",
    "FANDIO Custom": "shopping"
  };
  console.log(collaborationObject);
  return (
    <div className="right-bar">
      <div className="title">
        {mode === "BRANDIO Individual" && (
          <div className="title">
            <h4>{params.name}</h4>
            <br />
            <CurrencyFormat
              value={
                lng === "kr"
                  ? Number(params.price)
                  : parseFloat(Number(params.price) * 0.00085).toFixed(2)
              }
              displayType={"text"}
              thousandSeparator={true}
              prefix={lng === "kr" ? `₩ ` : `$ `}
            />
            <Divider />
          </div>
        )}

        {mode === "BRANDIO Collaboration" && (
          <div className="title">
            <h4>
              {collaborationObject.collaboration_title || (
                <Skeleton paragraph={false} active />
              )}
            </h4>
            <br />
            <span>{`${i18n.t(
              "brandioCollaborationCard.return",
              { lng }
            )}: `}</span>
            <span>
              {collaborationObject.collaboration_share ? (
                `${collaborationObject.collaboration_share}%`
              ) : (
                  <Skeleton paragraph={false} active />
                )}
            </span>
            <br /><br />
            <span>{`${i18n.t(
              "brandioCollaborationCard.price",
              { lng }
            )}: `}</span>
            <strong>
              <span>
                {collaborationObject.price ? (lng === "kr" ?
                  `₩${collaborationObject.price}` : `$${parseFloat(Number(collaborationObject.price) * 0.00085).toFixed(2)}`
                ) : (
                    <Skeleton paragraph={false} active />
                  )}
              </span>
            </strong>
            <Divider />
          </div>
        )}
      </div>
      <div>
        <h5>
          {i18n.t("mainEditor.sizes", {
            lng
          })}
        </h5>
        <br />
        <Radio.Group style={{ width: "100%" }}>
          {item.sizes.map(item => (
            <Radio.Button value={item}>{item.toUpperCase()}</Radio.Button>
          ))}
        </Radio.Group>
        <Divider />
        <h5>
          {i18n.t("mainEditor.colors", {
            lng
          })}
        </h5>
        <br />
        <Radio.Group style={{ width: "100%" }}>
          {item.colors.map(item => (
            <Radio.Button style={{ backgroundColor: item }}></Radio.Button>
          ))}
        </Radio.Group>
        <Divider />
      </div>
      <div>
        {selectedObjectType === "Text" && (
          <div className="">
            <Select
              placeholder={i18n.t("mainEditor.selectFont", {
                lng
              })}
              style={{ width: "100%" }}
              defaultValue={"Roboto"}
              onChange={e => changeFont(e)}
              size="large"
              value={selectedFont}
            >
              {fonts.map(font => (
                <Option value={font.text}>
                  <span style={{ fontFamily: font.text }}>{font.text}</span>
                </Option>
              ))}
            </Select>
            <br />
            <br />
            <CompactPicker
              disableAlpha
              onChange={changeColor}
              onChangeComplete={changeColor}
              color={selectedColor}
              triangle="hide"
            />
          </div>
        )}
      </div>

      <div className="right-bar--shopping-bag">
        <Button
          style={{
            width: "100%",
            height: 50,
            border: "none",
            backgroundColor: "rgb(98, 108, 226)"
          }}
          onClick={save}
          icon={buttonIcon[mode]}
          type="primary"
        >
          {buttonText[mode][0]}
        </Button>
      </div>

      <Modal
        visible={sidesModalVisible}
        footer={null}
        title="Printable Sides"
        centered
        onOk={toggleSelectedSideModal}
        onCancel={toggleSelectedSideModal}
      >
        <div className="sides-grid">
          {mode === "BRANDIO Collaboration" && (
            <Fragment>
              {collaborationObject.selected_printable_sides &&
                JSON.parse(collaborationObject.selected_printable_sides).map(
                  (side, index) => (
                    <Link to={`canvas-${index}`}>
                      <div
                        className={`color ${
                          index === selectedSide
                            ? `editor-active`
                            : `ineditor-active`
                          }`}
                        style={{
                          backgroundImage: `url(${item[`${side}Img`]})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat"
                        }}
                        onClick={() => {
                          toggleSelectedSideModal();
                          changeSelectedSide(index);
                        }}
                      ></div>
                      <span>{side.toUpperCase()}</span>
                    </Link>
                  )
                )}
            </Fragment>
          )}
          {mode === "BRANDIO Individual" && (
            <Fragment>
              {params.sel.split(",").map((side, index) => (
                <Link to={`canvas-${index}`}>
                  <div
                    className={`color ${
                      index === selectedSide
                        ? `editor-active`
                        : `ineditor-active`
                      }`}
                    style={{
                      backgroundImage: `url(${item[`${side}Img`]})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat"
                    }}
                    onClick={() => {
                      toggleSelectedSideModal();
                      changeSelectedSide(index);
                    }}
                  ></div>
                </Link>
              ))}
            </Fragment>
          )}
          {mode === "FANDIO Custom" && (
            <Fragment>
              {item.printableSides.map((side, index) => (
                <Link to={`canvas-${index}`}>
                  <div
                    className={`color ${
                      index === selectedSide
                        ? `editor-active`
                        : `ineditor-active`
                      }`}
                    style={{
                      backgroundImage: `url(${item[`${side}Img`]})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat"
                    }}
                    onClick={() => {
                      toggleSelectedSideModal();
                      changeSelectedSide(index);
                    }}
                  ></div>
                </Link>
              ))}
            </Fragment>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default RightBar;
