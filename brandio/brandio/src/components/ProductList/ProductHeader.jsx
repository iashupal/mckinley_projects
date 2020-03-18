import React, { Component } from "react";
import "./ProductList.css";

class ProductHeader extends Component {
  render() {
    const {
      title,
      description,
      imageSrc,
      component,
      activeBrands,
      brands,
      toggleFilter
    } = this.props;
    if (activeBrands.length !== 0) {
      return (
        <div
          className={
            component === "mybrand"
              ? "bradio__div__kidsmart bradio__kidmart"
              : "div__kidsmart"
          }
        >
          <div className="kidsmart__image">
            <img src={imageSrc} alt="" className="img__kidsmart" />
          </div>
          <div
            className={
              component === "mybrand"
                ? "verical__line__noborder"
                : "verical__line"
            }
          ></div>
          <div className="sub__div__kidsmart">
            <div
              className={
                component === "mybrand"
                  ? "kidmart__title__bold"
                  : "kidmart__title"
              }
            >
              {title}
            </div>
            <div className="kidsmart__description">{description}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={
            component === "mybrand"
              ? "bradio__div__kidsmart bradio__kidmart"
              : "div__kidsmart"
          }
          style={{ height: "80px" }}
        >
          <div style={{ marginTop: "15px" }}>
            {brands.map(brand => (
              <img
                src={brand.img_logo}
                width="50"
                style={{
                  marginRight: "16px",
                  borderRadius: "4px",
                  border: "1px solid #e4e4e4",
                  cursor: "pointer"
                }}
                onClick={() => toggleFilter(brand.name_eng)}
              />
            ))}
          </div>
        </div>
      );
    }
  }
}
export default ProductHeader;
