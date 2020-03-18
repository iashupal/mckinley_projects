import "../assets/css/content-bar.css";
import React, { Fragment } from "react";
import Tile from "./Tile";
import { Input, Icon, Divider } from "antd";
import HeaderContext from "./../../context/HeaderContext";

function ContentBar({
  data,
  selector,
  collaborationImages,
  searchText,
  handleSearchTextChange
}) {
  console.log("ok", collaborationImages);
  return (
    <div className="content-bar">
      <div style={{ gridColumn: "span 2" }}>
        <Input
          prefix={<Icon type="search" />}
          placeholder="Try flowers, cars.."
          value={searchText}
          onChange={handleSearchTextChange}
        />
      </div>
      {collaborationImages.length > 0 && (
        <div style={{ gridColumn: "span 2" }}>Collaboration Images</div>
      )}
      {collaborationImages.map(entry => (
        <Tile
          background={entry}
          title={entry.name || ""}
          onClick={selector}
          type="c"
        />
      ))}
      <div style={{ gridColumn: "span 2" }}>
        <Divider />
      </div>
      {data.map(pic => (
        <Tile
          background={pic.webformatURL}
          title={pic.tags || ""}
          onClick={selector}
        />
      ))}
    </div>
  );
}

export default ContentBar;
