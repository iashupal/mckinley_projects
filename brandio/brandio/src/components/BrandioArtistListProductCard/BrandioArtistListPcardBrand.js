import React, { Fragment } from "react";
import "./BrandioArtistListProductCard.css";

function BrandioArtistListPcardBrand(props) {
    return (
        <Fragment>
            <a href={`https://fandio.collartt.com/${props.url}`}>
                <img
                    src={props.path}
                    alt="slider"
                    className="brandioartistlistpcard__brandlogo"
                />
            </a>
        </Fragment>
    );
}

export default BrandioArtistListPcardBrand;
