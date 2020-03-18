import "../assets/css/secondary-navbar.css";

import React from "react";

function SecondaryNavbar() {
  return (
    <header className="secondary-navbar">
      <div className="secondary-navbar__left-nav">
        <div className="link">콜라보레이션</div>
        <div className="link">커스텀</div>
        <div className="link">브랜드</div>
      </div>
      <div className="secondary-navbar__space"></div>
      <div className="secondary-navbar__right-nav">
        <div className="link">로그아웃</div>
        <div className="link">한국어•</div>
      </div>
    </header>
  );
}

export default SecondaryNavbar;
