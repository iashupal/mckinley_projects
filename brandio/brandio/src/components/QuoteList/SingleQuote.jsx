import React, { Component } from "react";

import QuoteDetail from "./QuoteDetail";
import "./SingleQuote.css";

class SingleQuote extends Component {
  render() {
    const { brand, logoImageSrc } = this.props;
    return (
      <div className="product__list ant-col productcardlink">
        <div className="div__product__list">
          <div className="sub__div__product__list">
            <img
              src={logoImageSrc}
              className="sub__product__list__image"
              alt=""
            />
          </div>
          <div className="sub__div__product__brand">{brand}</div>
        </div>
        <QuoteDetail {...this.props} />
      </div>
    );
  }
}

export default SingleQuote;
