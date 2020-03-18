import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import HeaderContext from "../../context/HeaderContext";
import "./ProductCard.css";

// Import Components
import PcardBrand from "./PcardBrand";
import PcardArtist from "./PcardArtist";

function ProductCard(props) {
  const { lng } = useContext(HeaderContext);
  let type = props.product.product_type;
  let product = props.product;
  product.collaboration_images = !!props.product.collaboration_images
    ? props.product.collaboration_images
    : [];
  product.individualExportedImages = !!props.product.individualExportedImages
    ? props.product.individualExportedImages
    : [];
  let productId = "";
  if (props.product.product_type === "collaboration") {
    productId = props.product.id;
  }
  if (props.product.product_type === "individual") {
    productId = props.product.product_id;
  }
  if (props.source === "bestseller") {
    if (props.product.product_type === "collaboration") {
      productId = props.product.collaboration_product_id;
    } else {
      productId = props.product.product_id;
    }
  }
  return (
    <div className="pcard__container animated fadeInUp faster">
      <Link
        className="productcardlink"
        onClick={e => {
          window.location = `https://fandio.collartt.com/product/${productId}/${
            props.product.product_type
          }${props.type === "events" ? `?q=${props.eventId}` : ""}`;
        }}
      >
        <div className="pcard__header-brand">
          <div
            to={`https://fandio.collartt.com/${props.product.url}`}
            onClick={e => {
              window.location = `https://fandio.collartt.com/${props.product.url}`;
            }}
          >
            <PcardBrand
              name={props.product ? props.product.name_eng : "Brandio"}
              path={
                props.product
                  ? props.product.img_logo
                  : require("../../assets/images/brand-logo-4.svg")
              }
              alt="Brand Logo"
              slogan={props.product.slogan}
            />
          </div>
        </div>
        <div className="pcard__product-image-box">
          {props.source === "bestseller" ? (
            <img
              src={
                props.product.product_type === "collaboration"
                  ? product.collaboration_exported_images
                    ? JSON.parse(product.collaboration_exported_images)[0]
                    : require("../../assets/images/product-default-1.svg")
                  : product.individual_exported_images
                  ? JSON.parse(product.individual_exported_images)[0]
                  : require("../../assets/images/product-default-1.svg")
              }
              alt="Tshirt"
              className="pcard__product-image"
            />
          ) : (
            <img
              src={
                product.exported_images[0] ||
                product.collaboration_images[0] ||
                require("../../assets/images/product-default-1.svg")
              }
              alt="Tshirt"
              className="pcard__product-image"
            />
          )}
        </div>

        <div className="pcard__footer">
          {props.showArtist ? (
            <div className="pcard__header-artists">
              <div className="pcard__header-artists--left">
                <PcardArtist
                  name={props.product.nickname || "CSX"}
                  path={
                    props.product.profile_img ||
                    require("../../assets/images/artist-1.svg")
                  }
                  alt="Artist Avatar"
                  id={props.product.member_id}
                />
              </div>
              {props.product.product_type === "collaboration" && (
                <div className="spacer">
                  <img
                    src={require("../../assets/images/icon-spacer-1.svg")}
                    alt="Spacer"
                  />
                </div>
              )}

              {props.product.product_type === "collaboration" && (
                <Fragment>
                  <div className="pcard__header-artists--right">
                    <PcardArtist
                      name={props.product.collaber_nickname || "CSX"}
                      path={
                        props.product.collaber_profile_img ||
                        require("../../assets/images/artist-1.svg")
                      }
                      alt="Artist Avatar"
                      id={props.product.collaber_id}
                    />
                  </div>
                </Fragment>
              )}
            </div>
          ) : null}
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
