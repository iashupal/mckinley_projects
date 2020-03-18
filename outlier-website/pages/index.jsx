import React, { useState, useEffect } from "react";
import FeaturedMedia from "../components/FeaturedMedia";
import PartnerLogos from "../components/PartnerLogos";
import Layout from "../components/Layout";
import "../styles/main-page.css";
import "../styles/global.css";
import "../styles/join.css";
import AnnouncementModal from "../components/AnnouncementModal";

const Index = () => {
  const [scrollOne, setScrollOne] = useState([
    {
      title: "AS DRIVEN & FIT",
      detail:
        "사업가, 법조인, 의료인, 금융인, 컨설턴트, 방송인, 운동선수, 아티스트, 디자이너 등 다양한 배경의 20~30대 남녀, 검증된 전문직, 고위직의 열정적인 사람들"
    },
    {
      title: "AS SELECTIVE",
      detail:
        "기존 멤버의 추천으로만 가입할 수 있는 서울 20~30대의 0.135%, 2,640명. 매주 비활동 멤버들은 신규 멤버로 대체해 항상 활발한 교류 형성"
    },
    {
      title: "AS EVENTFUL",
      detail: "와인테이스팅, 파티, 스포츠 액티비티 등 VIP 이벤트 초대권 혹은 베네핏 제공. 비즈니스 네트워킹은 물론 취미도 함께"
    },
    {
      title: "AS GIVING",
      detail:
        "무료 가입 후 네트워킹은 물론, 다양한 혜택을 주고받을 수 있는 Outliers. 그 일부를 필요단체에 기부해 사회적 가치에 대한 유대감까지"
    }
  ]);

  const [animateTitle, setAnimateTitle] = useState(false);
  const [animateSubTitle, setAnimateSubTitle] = useState(false);
  const [animateIos, setAnimateIos] = useState(false);
  const [animateAndroid, setAnimateAndroid] = useState(false);
  const [showModal, hideModal] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimateTitle(true);
    }, 1200);

    setTimeout(() => {
      setAnimateSubTitle(true);
    }, 1700);

    setTimeout(() => {
      setAnimateIos(true);
      setAnimateAndroid(true);
    }, 3000);
  }, []);

  const handleClose = () => {
    console.log("hide");
    hideModal(false);
  };
  const scrollOneContent = scrollOne.map((content, i) => (
    <div className="contentImage" key={i}>
      <h4>{content.title}</h4>
      <p>{content.detail}</p>
    </div>
  ));
  return (
    <Layout>
      <div className="dashboardFirstSection " style={{ background: 'url("../static/images/homepage-banner.jpg")' }}>
        <p className={`dashboardHeader ${animateTitle ? "animateTitle" : ""}`}>OUTLIERS - 0.135% CLUB</p>
        <p className={`dashboardSubInviteHeader ${animateSubTitle ? "animateSubTitle" : ""}`}>Are you invited?</p>
        <p className={`dashboardSubHeader ${animateSubTitle ? "animateSubTitle" : ""}`}>
          학력, 직업, 자산을 동등하게 검증 받은 초대된 남녀들이 모인 프리미엄 SNS <br /> 아웃라이어스에 환영합니다.
        </p>
        <p className={`dashboardHeader ${animateSubTitle ? "animateSubTitle" : ""}`}>JOIN OUTLIERS</p>
        <div className="dashboardDownloadApps">
          <a
            className={`dashboardDownloadAppsIos ${animateIos ? "animateIos" : ""}`}
            style={{
              background: 'url("https://coffeemeetsbagel.com/wp-content/uploads/2018/06/button-app-store.png")'
            }}
            href="https://apps.apple.com/kr/app/outliers/id1481019315"
          />
          <a
            className={`dashboardDownloadAndroid ${animateAndroid ? "animateAndroid" : ""}`}
            style={{
              background: 'url("https://coffeemeetsbagel.com/wp-content/uploads/2018/06/button-google-play.png")'
            }}
            href="https://play.google.com/store/apps/details?id=com.globaloutliers&hl=ko"
          />
        </div>
      </div>

      <div className="dashboardSecondSection">
        <div className="dashboardSecondSectionContent">
          <div className="dashboardSecondSectionContentInnerContainer">
            <div className="innerContainer">{scrollOneContent}</div>
          </div>
          <div className="dashboardSecondSectionImage">
            <img src="../static/images/mainsectionimg2.jpg" alt="dummy" />
          </div>
        </div>
      </div>
      {showModal && <AnnouncementModal target="제3자배정 유상증자 공고" onExit={handleClose} />}
      {/* <FeaturedMedia src="https://www.youtube.com/embed/lpnnBeYGK3A" video /> */}

      {/* <PartnerLogos /> */}
    </Layout>
  );
};

export default Index;
