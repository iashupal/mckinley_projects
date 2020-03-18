import React from "react";
import PropTypes from "prop-types";
import "../styles/terms.css";
import "../styles/modal.css";
import FlatAction from "./FlatAction";

function AnnouncementModal({ show, target, onExit }) {
  //   const emailLink = `mailto:career@globaloutliers.com?subject=${target} - Application`;

  return (
    <div className={`modal__backdrop ${show ? "modal__backdrop--show" : ""}`}>
      <div className="modal">
        <div className="modal__title-bar">
          <span className="modal__title">제3자배정 유상증자 공고</span>
          <button type="button" className="modal__btn-close" onClick={onExit}>
            ⨯
          </button>
        </div>
        <div className="modal__content-box announcement_content-box">
          <h1>제3자배정 유상증자 공고</h1>
          <div>
            <p className="terms_content">
              당사는 2020년 2 월 13 일 이사회에서 제3자 배정 유상증자를 결의하였으므로 상법 제418조 제4항에 따라 다음과 같이
              공고합니다.
            </p>
            <div className="terms__content-wrapper annuouncement__content-wrapper">
              <p className="terms__subheading terms__content-heading">다 음</p>
              <p className="terms_content">1. 신주식의 종류와 수 : 보통주식  171  주</p>
              <p className="terms_content">1. 신주식의  발행가액 : 1주의 금액  금  176,000  원</p>
              <p className="terms_content">1. 청약  및  납입기일 : 2020년 2월 27일</p>
              <p className="terms_content">
                1. 신주식 인수 방법 : 정관 제10조 제2항에 의하여 주주의 신주인수권을 배제하고 제3자인 조민식에게 신주 전량을
                배정한다.
              </p>
              <p className="terms_content">1. 기타 신주발행에 관한 필요한 사항은 대표이사에게 일임한다.</p>
            </div>
            <div className="terms__content-wrapper annuouncement__content-wrapper">
              <p className="terms__subheading terms__content-heading">2020년  2 월27 일 </p>
              <p className="terms_content">주식회사 아웃라이어스</p>
              <p className="terms_content">서울특별시 종로구 종로 51, 18층(종로2가, 위워크) </p>
              <p className="terms_content">대표이사 이재일</p>
            </div>
          </div>
        </div>
        {/* <div className="modal__action-btn-bar">
          <FlatAction onClick={onExit}>
            <span style={{ color: "#333" }}>동의하지 않습니다</span>
          </FlatAction>
          <FlatAction primary>
            <a href={emailLink}>
              <span style={{ color: "#333" }}>동의합니다</span>
            </a>
          </FlatAction>
        </div> */}
      </div>
    </div>
  );
}

AnnouncementModal.propTypes = {
  show: PropTypes.bool,
  target: PropTypes.string.isRequired,
  onExit: PropTypes.func.isRequired
};

AnnouncementModal.defaultProps = {
  show: true
};

export default AnnouncementModal;
