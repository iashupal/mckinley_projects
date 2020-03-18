import React from "react";
import "./../ProductCard/ProductCard.css";

function PcardBrand(props) {
  return (
    <div className="brand-logo-box">
      <div className="brand-logo-inner">
        <img
          src={
            props.path === ""
              ? require("../../assets/images/brand-logo-4.svg")
              : props.path
          }
          alt="slider"
          className="brand-logo"
        />
      </div>
      <div className="brand-name-inner">
        <div className="brand-name">{props.name}</div>
      </div>
    </div>
  );
}

export default PcardBrand;
