import React, { useContext } from "react";
import "./Terms.css";
import HeaderContext from "./../../context/HeaderContext";

function TermsCondition(props) {
  const { lng, i18n } = useContext(HeaderContext);
  return (
    <div className="terms">
      <div className="terms__heading">
        {i18n.t("termCondition.heading", { lng })}
      </div>
      <p className="terms__heading--main">
        {i18n.t("termCondition.articalOne", { lng })}
      </p>

      <p className="terms__description">
        {i18n.t("termCondition.articalOneDesc", { lng })}
      </p>

      <p className="terms__heading--main">
        {i18n.t("termCondition.articalTwo", { lng })}
        <br />
        {i18n.t("termCondition.articalTwotag", { lng })}
      </p>
      <p className="terms__description">
        {i18n.t("termCondition.articalTwoDesc", { lng })}
      </p>
      <p className="terms__description">
        {i18n.t("termCondition.linethree", { lng })}
      </p>
      <p className="terms__description">
        {i18n.t("termCondition.linefour", { lng })}
      </p>
      <p className="terms__description">
        {i18n.t("termCondition.linefive", { lng })}
      </p>
    </div>
  );
}

export default TermsCondition;
