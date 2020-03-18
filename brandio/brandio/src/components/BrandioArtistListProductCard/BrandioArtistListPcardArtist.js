import React, { Fragment } from "react";
import "./BrandioArtistListProductCard.css";

// Import Components
import BrandioArtistListPcardEmail from "./BrandioArtistListPcardEmail";

function BrandioArtistListPcardArtist(props) {
  return (
    <Fragment>
      <div className="brandioartistlistpcard__avatarbox">
        <a href={`https://mydio.collartt.com/artist/${props.artistId}`}>
          <img
            src={props.path}
            alt="slider"
            className="brandioartistlistpcard__avatar"
            style={{ border: "1px solid #e4e4e4" }}
          />
        </a>

        <label className="brandioartistlistpcard__name">{props.name}</label>
      </div>

      <div className="brandioartistlistpcard__emailbox">
        <BrandioArtistListPcardEmail
          name={props.name}
          artistId={props.artistId}
          thumb={props.path}
          type={"artistPage"}
        />
      </div>
    </Fragment>
  );
}

export default BrandioArtistListPcardArtist;
