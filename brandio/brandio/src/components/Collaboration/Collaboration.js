import React, { Component } from "react";
import "./../Collaboration/Collaboration.css";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

class Collaboration extends Component {
  render() {
    return (
      <div id="CollaborationSlider">
        <h3 className="collaborations__heading">COLLABORATION</h3>
        <Carousel
          infiniteLoop
          autoPlay
          interval={3000}
          centerMode={true}
          centerSlidePercentage={33.33}
          showStatus={false}
          showThumbs={false}
          showArrows={false}
          showIndicators={false}
          emulateTouch={false}
          swipeable={false}
        >
          <img
            src={require("../../assets/images/collaboration-slider-1.svg")}
            alt="slider"
            className="collaborations__image"
          />

          <img
            src={require("../../assets/images/collaboration-slider-2.svg")}
            alt="slider"
            className="collaborations__image"
          />

          <img
            src={require("../../assets/images/collaboration-slider-3.svg")}
            alt="slider"
            className="collaborations__image"
          />
          <img
            src={require("../../assets/images/collaboration-slider-4.svg")}
            alt="slider"
            className="collaborations__image"
          />
          <img
            src={require("../../assets/images/collaboration-slider-5.svg")}
            alt="slider"
            className="collaborations__image"
          />
        </Carousel>
      </div>
    );
  }
}

export default Collaboration;
