import React, { Component } from "react";
import "./../HeroSlider/HeroSlider.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import HeaderContext from "../../context/HeaderContext";

class HeroSlider extends Component {
  static contextType = HeaderContext;
  render() {
    return (
      <Carousel
        infiniteLoop={true}
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        swipeable={true}
        showIndicators={true}
        emulateTouch={true}
        className="hero-carousel"
      >
        <div className="hero-carousel__outer">
          <div className="hero-carousel__inner">
            <img
              src={require("../../assets/images/topBanners/0.png")}
              alt="slider"
              className="hero-carousel__image"
            />
          </div>
        </div>
        <div className="hero-carousel__outer">
          <div className="hero-carousel__inner">
            <img
              src={require("../../assets/images/topBanners/1.png")}
              alt="slider"
              className="hero-carousel__image"
            />
          </div>
        </div>
        <div className="hero-carousel__outer">
          <div className="hero-carousel__inner">
            <img
              src={require("../../assets/images/topBanners/2.png")}
              alt="slider"
              className="hero-carousel__image"
            />
          </div>
        </div>
        <div className="hero-carousel__outer">
          <div className="hero-carousel__inner">
            <img
              src={require("../../assets/images/topBanners/3.png")}
              alt="slider"
              className="hero-carousel__image"
            />
          </div>
        </div>
      </Carousel>
    );
  }
}

export default HeroSlider;
