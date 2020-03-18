import React from "react";
import "./../Instagram/Instagram.css";

function Instagram(props) {
  return (
    <div className="instagram">
      <h3 className="instagram__heading">
        <img
          src={require("../../assets/images/logo-instagram.svg")}
          alt="instagram"
        />
      </h3>

      <div className="instagram__imagebox">
        <div className="instagram__imagebox--inner spinner">
          <img
            src={require("../../assets/images/insta-1.jpg")}
            alt="instagram"
            className="instagram_images"
          />
        </div>

        <div className="instagram__imagebox--inner spinner">
          <img
            src={require("../../assets/images/insta-2.jpg")}
            alt="instagram"
            className="instagram_images"
          />
        </div>

        <div className="instagram__imagebox--inner spinner">
          <img
            src={require("../../assets/images/insta-3.jpg")}
            alt="instagram"
            className="instagram_images"
          />
        </div>

        <div className="instagram__imagebox--inner spinner">
          <img
            src={require("../../assets/images/insta-4.jpg")}
            alt="instagram"
            className="instagram_images"
          />
        </div>

        <div className="instagram__imagebox--inner spinner">
          <img
            src={require("../../assets/images/insta-5.jpg")}
            alt="instagram"
            className="instagram_images"
          />
        </div>

        <div className="instagram__imagebox--inner spinner">
          <img
            src={require("../../assets/images/insta-6.jpg")}
            alt="instagram"
            className="instagram_images"
          />
        </div>

        <div className="instagram__imagebox--inner spinner">
          <img
            src={require("../../assets/images/insta-7.jpg")}
            alt="instagram"
            className="instagram_images"
          />
        </div>

        <div className="instagram__imagebox--inner spinner">
          <img
            src={require("../../assets/images/insta-8.jpg")}
            alt="instagram"
            className="instagram_images"
          />
        </div>

        <div className="instagram__imagebox--inner spinner">
          <img
            src={require("../../assets/images/insta-9.jpg")}
            alt="instagram"
            className="instagram_images"
          />
        </div>

        <div className="instagram__imagebox--inner spinner">
          <img
            src={require("../../assets/images/insta-10.jpg")}
            alt="instagram"
            className="instagram_images"
          />
        </div>
      </div>
    </div>
  );
}

export default Instagram;
