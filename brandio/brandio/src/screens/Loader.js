import React from "react";
import { Icon } from "antd";

const antIcon = <Icon type="loading" style={{ fontSize: 48, color: "#6319ff" }} spin />;

function Loader() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
        height: "100vh"
      }}
    >
      <div style={{ alignSelf: "center", justifySelf: "center" }}>{antIcon}</div>
    </div>
  );
}

export default Loader;
