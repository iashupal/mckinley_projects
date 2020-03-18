import React, { Fragment } from "react";
import "../assets/styles/app-layout.css";

function AppLayout(props) {
  return (
    <Fragment>
      <div className="container container-height">
        <div className="top-space">{props.children}</div>
      </div>
    </Fragment>
  );
}

export default AppLayout;
