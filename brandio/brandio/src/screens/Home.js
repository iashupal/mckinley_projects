import React, { Fragment, useContext } from "react";

// importing component
import Header from "../components/Header/Header";
import Navbar from "./../components/Navbar/Navbar";
import HeroSlider from "../components/HeroSlider/HeroSlider";
import QuoteSlider from "../components/QuoteSlider/QuoteSlider";
import BestSellers from "../components/BestSellers/BestSellers";
import Artist from "../components/Artist/Artist";
import BrandioBrandList from "./BrandioBrandList";
import Footer from "../components/Footer/Footer";
import CollaborationStudio from "../components/BestSellers/CollaborationStudio";
import HeaderContext from "./../context/HeaderContext";

function Home() {
  const { lng, i18n } = useContext(HeaderContext);
  return (
    <Fragment>
      <div className="App container">
        <div className="container item--1 wrapper">
          <Header />
        </div>
        <div className="container item--2">
          <div className="menu">
            <Navbar />
          </div>
        </div>
        <div className="container item--3">
          <HeroSlider />
        </div>
        <div className="container item--4 wrapper">
          <QuoteSlider />
        </div>
        <div className="container item--5 white-bg">
          <div className="wrapper bradio-bestseller">
            <BestSellers />
            <div
              className="text-center"
              style={{
                paddingBottom: 70
              }}
            >
              <button
                className="btn btn-primary"
                onClick={() => (window.location.href = "https://fandio.collartt.com/collaboration")}
              >
                {i18n.t("misc.viewMore", { lng })}
              </button>
            </div>
          </div>
        </div>
        <div className="container item--5 white-bg pt12">
          <div className="wrapper brandio-collaboration">
            <CollaborationStudio />
            <div className="text-center" style={{ paddingBottom: 70 }}>
              <button className="btn btn-primary" onClick={() => (window.location.href = "/collaboration")}>
                {i18n.t("misc.viewMore", { lng })}
              </button>
            </div>
          </div>
        </div>
        <div className="container item--5 white-bg pt12">
          <div className="wrapper">
            <h3
              className="artist__heading"
              style={{
                paddingTop: 70,
                borderTop: "1px solid #e8e8e8"
              }}
            >
              BRAND LIST
            </h3>
          </div>
          <div className="wrapper brandio-brandhome">
            <BrandioBrandList type="homepage" />
            <div
              className="text-center"
              style={{
                width: "100%",
                paddingBottom: 70,
                paddingTop: 50
              }}
            >
              <button className="btn btn-primary" onClick={() => (window.location.href = "/brands")}>
                {i18n.t("misc.viewMore", { lng })}
              </button>
            </div>
          </div>
        </div>
        <div className="container item--8 wrapper brandio-artist">
          <Artist />
        </div>
        <div className="container item--10">
          <div className="wrapper">
            <Footer />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
