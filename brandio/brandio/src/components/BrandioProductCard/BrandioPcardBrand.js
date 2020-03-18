import React from "react";
import "./BrandioProductCard.css";

function BrandioPcardBrand(props) {
    console.log("deep componet", props);
    return (
        <div className="brandiobrand-logo-box">
            <div className="brandiobrand-logo-inner">
                <img
                    src={
                        props.path === ""
                            ? require("../../assets/images/brand-logo-4.svg")
                            : props.path
                    }
                    alt="slider"
                    className="brandiobrand-logo"
                />
            </div>
            <div className="brandiobrand-name-inner">
                <label className="brandiobrand-name">{props.name}</label>
            </div>
        </div>
    );
}

export default BrandioPcardBrand;
