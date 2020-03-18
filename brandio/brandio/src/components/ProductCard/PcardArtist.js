import React from "react";
import "./../ProductCard/ProductCard.css";

function PcardArtist(props) {
  return (
    <div className="artist__logobox">
      <div className="artist__logoinner">
        <img
          src={props.path}
          alt="slider"
          width="35px"
          height="35px"
          className="artist__logobox--logo"
        />
      </div>
      <div className="artist__nameinner">
        <label className="artist__logobox--name">{props.name}</label>
      </div>
    </div>
  );
}

export default PcardArtist;
