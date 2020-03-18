import React from "react";
import "./../Footer/Footer.css";
import HeaderContext from "./../../context/HeaderContext";
import { PRIVACY, TERMS } from "../../utils/constants/privacyterms";

class Footer extends React.Component {
  static contextType = HeaderContext;
  render() {
    const { lng, i18n, headerName } = this.context;

    return (
      <div className="footer">
        <div className="address">
          <div className="address__logo-title">
            <a href="/">{headerName.toUpperCase()}</a>

            <div style={{ marginTop: "20px" }}>
              <p className="address__paragraph">
                {i18n.t("footer.addressLine1", { lng })}
              </p>
              <p className="address__paragraph">
                {i18n.t("footer.addressLine2", { lng })}
              </p>
              <p className="address__paragraph">
                {i18n.t("footer.addressLine3", { lng })}
              </p>
              <p className="address__paragraph">
                {i18n.t("footer.addressLine4", { lng })}
              </p>
            </div>
          </div>

          <div className="footer__navitem--box1">
            <h6 className="footer-nav-heading">
              {i18n.t("footer.legalNotice", { lng })}
            </h6>
            <p>
              <a href={PRIVACY} className="footer__navitem--link">
                {i18n.t("footer.terms", { lng })}
              </a>
            </p>
            <p>
              <a href={TERMS} className="footer__navitem--link">
                {i18n.t("footer.privacy", { lng })}
              </a>
            </p>
            <p>
              <a
                href="https://fandio.collartt.com/faq"
                className="footer__navitem--link"
              >
                {i18n.t("footer.service", { lng })}
              </a>
            </p>
          </div>

          <div className="footer__navitem--box2">
            <h6 className="footer-nav-heading">
              {i18n.t("footer.relatedSite", { lng })}
            </h6>
            <p>
              <a href="#" className="footer__navitem--link">
                Site 1 Link
              </a>
            </p>
            <p>
              <a href="#" className="footer__navitem--link">
                Site 2 Link
              </a>
            </p>
            <p>
              <a href="#" className="footer__navitem--link">
                Site 3 Link
              </a>
            </p>
            <p>
              <a href="#" className="footer__navitem--link">
                Site 4 Link
              </a>
            </p>
          </div>
        </div>

        <div className="copyrights-box">
          <p className="copyrights__paragraph">
            {i18n.t("footer.copywriteLine1", { lng })}
          </p>
          <p className="copyrights__paragraph">
            {i18n.t("footer.copywriteLine2", { lng })}
          </p>
          <p className="copyrights">
            {i18n.t("misc.copyright", { lng })}
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
