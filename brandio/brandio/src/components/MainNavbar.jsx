import "../assets/css/main-navbar.css";
import React from "react";
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction
} from "carbon-components-react";
import { Close20 } from "@carbon/icons-react";
import CallToAction from "./CallToAction";

function MainNavbar({ toggleInstructions, mode }) {
  return (
    <Header aria-label="IBM Platform Name" style={{ padding: "0 20px" }}>
      <HeaderName href="#" prefix={mode.split(" ")[0]}>
        {mode.split(" ")[1]} Editor
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Search">
          <Close20 />
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
}

export default MainNavbar;
