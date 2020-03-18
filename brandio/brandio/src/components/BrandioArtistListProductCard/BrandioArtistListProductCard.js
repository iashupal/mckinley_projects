import React from "react";
import "./BrandioArtistListProductCard.css";

// Import Components
import BrandioArtistListPcardBrand from "./BrandioArtistListPcardBrand";
import BrandioArtistListPcardArtist from "./BrandioArtistListPcardArtist";
import HeaderContext from "../../context/HeaderContext";

class BrandioArtistListProductCard extends React.Component {
  static contextType = HeaderContext;
  render() {
    const { lng, i18n } = this.context;
    return (
      <div className="brandioartistlistpcard">
        <div className="brandioartistlistpcard__header">
          <BrandioArtistListPcardArtist
            name={this.props.artist.nickname}
            path={
              this.props.artist.profile_img === null ||
              this.props.artist.profile_img === "null"
                ? require("../../assets/images/icon-user-default.svg")
                : this.props.artist.profile_img
            }
            artistId={this.props.artist.id}
            alt="Artist Avatar"
            className="brandio-avatar"
          />
        </div>

        <div className="brandioartistlistpcard__contentbox">
          <p className="brandioartistlistpcard__contentbox--wrap">
            <label className="color-primary">
              {i18n.t("brandioArtist.nationality", { lng })}
            </label>
            <span className="color-tertiary no-pointer">
              {this.props.artist.country}
            </span>
          </p>
          <p className="brandioartistlistpcard__contentbox--wrap">
            <label className="color-primary">
              {i18n.t("brandioArtist.numberofProducts", { lng })}
            </label>
            <span className="color-tertiary no-pointer">
              {this.props.artist.totalProductCount}
            </span>
          </p>
          <p className="brandioartistlistpcard__contentbox--wrap">
            <label className="color-primary ">
              {i18n.t("brandioArtist.CollaborationProgress", {
                lng
              })}
            </label>
            <span className="color-tertiary no-pointer">
              {this.props.artist.collaborationCount}
            </span>
          </p>
          <p className="brandioartistlistpcard__contentbox--wrap">
            <label className="color-primary">
              {i18n.t("brandioArtist.representativeBrand", {
                lng
              })}
            </label>
            <span className="color-primary no-pointer">
              ({this.props.artist.brands.length}{" "}
              {i18n.t("misc.total", {
                lng
              })}
              )
            </span>
          </p>
        </div>

        <div className="brandioartistlistpcard__footer">
          {this.props.artist.brands.map(brands => (
            <BrandioArtistListPcardBrand
              path={
                brands.img_logo === ""
                  ? require("../../assets/images/brand-logo-4.svg")
                  : brands.img_logo
              }
              alt="Brand Logo"
              url={brands.url}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BrandioArtistListProductCard;
