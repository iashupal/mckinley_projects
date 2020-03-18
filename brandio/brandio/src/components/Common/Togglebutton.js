import React, { Fragment } from "react";
import "./ToggleButton.css";

function Togglebutton({ title, isActive, handleClick }) {
  return (
    <Fragment>
      <div
        onClick={handleClick}
        className={isActive ? "active-close" : "inactive"}
      >
        {title}
      </div>
    </Fragment>
  );
}

export default Togglebutton;
