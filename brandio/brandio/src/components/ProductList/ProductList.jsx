import React, { Component } from "react";
import { Icon } from "antd";
import "./ProductList.css";
export default class ProductList extends Component {
  render() {
    const {
      personOneName,
      personOneImage,
      personTwoName,
      personTwoImage,
      productImageSrc,
      component
    } = this.props;

    return (
      <div className="div__list">
        <div
          className={`subdiv__list ${
            component === "mybrands__product-border" ? "mybrand" : ""
          }`}
          style={{
            pading: "5px",
            border: `0.800000011920929px solid ${
              this.props.status === "Accepted" ? "#9A6EF7" : "#e4e4e4"
            }`,
            marginBottom: "15px"
          }}
        >
          <div className="div__flexed">
            <a
              href={`https://mydio.collartt.com/artist/${this.props.memberId}`}
            >
              <img src={personOneImage} alt="" className="artist-photo" />
            </a>
            <div className="subdiv__person__name text-uppercase">
              {personOneName}
            </div>
          </div>
          <Icon type="close" className="product__close__icon" />
          <div className="div__flexed">
            <a
              href={`https://mydio.collartt.com/artist/${this.props.collaberId}`}
            >
              <img src={personTwoImage} alt="" className="artist-photo" />
            </a>
            <div className="subdiv__person__name text-uppercase">
              {personTwoName}
            </div>
          </div>
        </div>
        <div className="product__btn__group">
          <img src={productImageSrc} className="product__image" alt="" />
        </div>
      </div>
    );
  }
}
