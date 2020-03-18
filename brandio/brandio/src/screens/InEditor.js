import React, { Fragment } from "react";
import MainEditor from "../components/Editor";
import Navbar from "../components/Navbar/Navbar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function InEditor() {
  return (
    <Fragment>
      <div class="container item--1 wrapper">
        <Header />
      </div>
      <div class="container item--2">
        <Navbar />
      </div>

      <div class="container item--3">
        <MainEditor />
      </div>

      <div class="container item--10">
        <div class="wrapper">
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}

export default InEditor;
