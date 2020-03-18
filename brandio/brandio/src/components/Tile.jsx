import "../assets/css/tile.css";
import React from "react";
import { Card } from "antd";

function Tile({ background, title, onClick, type }) {
  return (
    <div
      className="tile animated fadeIn faster"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
      onClick={() => onClick(background, type)}
    >
      <div className="tile--space"></div>
      <div className="tile--title">{title.split(",")[0]}</div>
    </div>
  );
}

export default Tile;
