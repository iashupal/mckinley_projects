import React from "react";
import { Spin, Icon } from "antd";
import "../assets/styles/loader.css";

const loadingIcon = <Icon type="loading" style={{ fontSize: 48 }} spin />;

export default function Loader() {
  return (
    <div className="loader">
      <Spin indicator={loadingIcon} />
    </div>
  );
}
