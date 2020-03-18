import React, { Component } from "react";
import "./../QuoteSlider/QuoteSlider.css";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

class QuoteSlider extends Component {
  render() {
    return (
      <div id="Quoteslider">
        <Carousel
          showArrows={true}
          showIndicators={false}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          swipeable={true}
        >
          <div className="quotes">
            <img
              src={require("../../assets/images/bottomBanners/2-2-1.jpg")}
              alt="bottom-banner"
            />
          </div>
          <div className="quotes">
            <img
              src={require("../../assets/images/bottomBanners/2-2-2.jpg")}
              alt="bottom-banner"
            />
          </div>
          <div className="quotes">
            <img
              src={require("../../assets/images/bottomBanners/2-2-3.jpg")}
              alt="bottom-banner"
            />
          </div>
          <div className="quotes">
            <img
              src={require("../../assets/images/bottomBanners/2-2-4.jpg")}
              alt="bottom-banner"
            />
          </div>
          <div className="quotes">
            <img
              src={require("../../assets/images/bottomBanners/2-2-5.jpg")}
              alt="bottom-banner"
            />
          </div>
        </Carousel>
      </div>
    );
  }
}

export default QuoteSlider;
