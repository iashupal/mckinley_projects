import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./BrandioProductCard.css";
import Cookies from "js-cookie";

// Import Components
import BrandioPcardBrand from "./BrandioPcardBrand";
import BrandioPcardArtist from "./BrandioPcardArtist";
import HeaderContext from "./../../context/HeaderContext";
import Timer from "./../Common/Timer";
const memberId = Cookies.get("member_id");

function BrandioProductCard(props) {
  let type = parseInt(memberId) === props.listData.member_id ? "self" : "other";
  const { lng, i18n } = useContext(HeaderContext);
  return (
    <div className="brandiopcard__container">
      <Link
        to={
          type === "other"
            ? `/collaboration/${props.listData.id}`
            : `/myinfo/mybrands`
        }
        className="removelinkcss"
      >
        <div className="brandiopcard__header-brand">
          <BrandioPcardBrand
            name={
              lng === "kr" ? props.listData.name_kor : props.listData.name_eng
            }
            path={props.listData.img_logo}
            alt="Brand Logo"
          />
        </div>
        <div
          className="brandiopcard__quotebox secondary-bg"
          style={{ margin: "0 auto" }}
        >
          <p className="brandiopcard__quote" style={{ width: "100%" }}>
            {props.listData.collaboration_title}
          </p>
        </div>
        <div className="brandiopcard__contentbox">
          <div className="brandiopcard-counter-box">
            <Timer dueDate={props.listData.collaboration_due_date} />
          </div>
          <div className="brandiopcard-user">
            <BrandioPcardArtist
              name={`${props.listData.nickname}`}
              path={
                props.listData.profile_img !== null
                  ? props.listData.profile_img
                  : require("../../assets/images/brandio-avatar-1.svg")
              }
              id={props.listData.member_id}
              alt="Artist Avatar"
              className="brandio-avatar"
            />
          </div>

          <p className="brandiopcard-part">{props.listData.product_name}</p>

          <div className="brandiopcard-footer">
            <div className="brandiopcard__shield">
              {i18n.t("brandioCollaborationList.desc", { lng })}
            </div>
            <div className="brandiopcard__percentage">
              {props.listData.collaboration_share} %
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BrandioProductCard;
