import React from 'react';
import '../styles/footer.css';
import Link from 'next/link';
import Popup from './Popup';
import FlatAction from './FlatAction';

class Footer extends React.Component {
  state = {
    supportPopup: false,
  };

  togglePopup = () => {
    this.setState({
      supportPopup: !this.state.supportPopup,
    });
  };

  render() {
    return (
      <div className="footer">
        <div className="footer_links">
          <div className="footer__column">
            <div className="social-icons">
              <a href="#">
                <img width="25px" style={{ paddingTop: '10px' }} src="../static/images/social/facebook.png" />
              </a>
              <a href="#">
                <img width="25px" style={{ paddingTop: '10px' }} src="../static/images/social/twitter.png" />
              </a>
              <a href="#">
                <img width="25px" style={{ paddingTop: '10px' }} src="../static/images/social/instagram.png" />
              </a>
              <a href="#">
                <img width="25px" style={{ paddingTop: '10px' }} src="../static/images/social/linkedin1.png" />
              </a>
            </div>
            <Link href="/">
              <FlatAction>Home</FlatAction>
            </Link>
          </div>
          <div className="footer__column">
            <Link href="/careers">
              <FlatAction>Careers</FlatAction>
            </Link>
            <Link href="/news">
              <FlatAction>News/ Media</FlatAction>
            </Link>
          </div>
          <div className="footer__column">
            <Link href="/notices">
              <FlatAction>Notices</FlatAction>
            </Link>
            <Link href="/contact">
              <FlatAction>Contact</FlatAction>
            </Link>
            <Link href="/terms">
              <FlatAction>Terms &amp; Conditions</FlatAction>
            </Link>
          </div>
          <div className="footer__column">
            <FlatAction>
              <strong>Get the App</strong>
            </FlatAction>
            <a href="https://apps.apple.com/kr/app/outliers/id1481019315">
              <img width="130px" src="https://coffeemeetsbagel.com/wp-content/uploads/2018/06/button-app-store.png" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.globaloutliers&hl=ko">
              <img
                width="130px"
                style={{ marginTop: '10px' }}
                src="https://coffeemeetsbagel.com/wp-content/uploads/2018/06/button-google-play.png"
              />
            </a>
          </div>
        </div>
        <div className="footer__company-info">
          <span className="footer__column">&copy; Outliers Inc. </span>
          <span className="footer__column">(주) 아웃라이어스 </span>
          <span className="footer__column">18F, 51, Jong-ro, Jongno-gu, Seoul, Republic of Korea, 03161</span>
          {/* <div className="footer__column" style={{ display: 'inline-block' }}>
            <Link href="/terms">
              <span>서비스이용약관</span>
            </Link>
            &nbsp; | &nbsp;
          <Link href="/privacy">
              <span>개인정보처리방침</span>
            </Link>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Footer;
