import React from "react";
import PropTypes from "prop-types";
import "../styles/terms.css";
import "../styles/modal.css";
import FlatAction from "./FlatAction";

function Modal({ show, target, onExit }) {
  const emailLink = `mailto:career@globaloutliers.com?subject=${target} - Application`;

  return (
    <div className={`modal__backdrop ${show ? "modal__backdrop--show" : ""}`}>
      <div className="modal">
        <div className="modal__title-bar">
          <span className="modal__title">개인정보 수집 및 이용 동의</span>
          <button type="button" className="modal__btn-close" onClick={onExit}>
            ⨯
          </button>
        </div>
        <div className="modal__content-box">
          <h1>개인정보 수집 및 이용 안내 [채용 지원]</h1>
          <div>
            <p className="terms_content">
              주식회사 아웃라이어스(이하 “회사”라 합니다)는 이용자의 동의를 기반으로 개인정보를 수집ㆍ이용 및 제공하고 있으며,
              관계 법령 및 규정, 가이드라인을 준수하고 있습니다. 회사는 이용자의 개인정보를 보호하고, 이와 관련한 고충을
              신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보처리방침을 수립ㆍ공개합니다.
            </p>
            <div className="terms__content-wrapper">
              <p className="terms__subheading terms__content-heading">제1조 개인정보의 수집 및 이용 목적</p>
              <p className="terms_content">
                - 입사전형 진행, 입사지원서 수정, 자격요건의 확인, 합격여부 확인, 지원자와의 원활한 의사소통 경로 확보
              </p>
            </div>
            <div className="terms__content-wrapper">
              <p className="terms__subheading terms__content-heading">제2조 수집하는 개인정보의 항목</p>
              <p className="terms_content">- [필수항목] : 성명, 이메일 주소, 전화번호,</p>
              <p className="terms_content">
                - [선택항목] : 성별, 국적, 학력사항(학교명, 입학/졸업년월, 전공, 세부전공, 성적, 졸업구분), 경력사항(회사명,
                직무, 직위, 부서명, 재직기간), 병역사항, 보훈사항(대상인 경우), 장애사항(대상인 경우), 자격/어학사항(자격 종류,
                등급, 점수, 취득일)
              </p>
            </div>
            <div className="terms__content-wrapper">
              <p className="terms__subheading terms__content-heading">제3조 개인정보의 보유 및 이용기간</p>
              <p className="terms_content">
                - 입사지원자의 개인정보는 회사의 인력풀에 저장되어 채용이 필요한 경우 해당 인력풀에서 상시채용을 위해 1년동안
                보관합니다. 단, 입사지원자가 개인정보의 삭제를 원하는 경우 지체 없이 해당 정보를 삭제합니다.
              </p>
            </div>
            <div className="terms__content-wrapper">
              <p className="terms__subheading terms__content-heading">제4조 동의를 거부할 권리 및 동의 거부에 따른 불이익</p>
              <p className="terms_content">
                - 지원자는 개인정보의 수집, 이용 등과 관련한 위 사항에 대하여 원하지 않는 경우 동의를 거부할 수 있습니다. 단,
                수집하는 개인정보의 항목에서 필수정보에 대한 수집 및 이용에 대하여 동의하지 않는 경우는 채용전형에 제한이 있을
                수 있습니다.
              </p>
            </div>
            <div className="terms__content-wrapper">
              <p className="terms__subheading terms__content-heading">제5조 개인정보의 제공 및 위탁</p>
              <p className="terms_content">
                회사는 이용자의 별도 동의가 있는 경우나 법령에 규정된 경우를 제외하고는 이용자의 개인정보를 제3자에게 제공하지
                않습니다.
              </p>
            </div>
            <div className="terms__content-wrapper">
              <p className="terms__subheading terms__content-heading">제6조 정보주체와 법정대리인의 권리ㆍ의무 및 행사방법</p>
              <p className="terms_content">
                정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
              </p>
              <ul className="privacy_ul">
                <li className="terms_content">1. 개인정보 열람요구</li>
                <li className="terms_content">2. 오류 등이 있을 경우 정정 요구</li>
                <li className="terms_content">3. 삭제요구</li>
                <li className="terms_content">4. 처리정지 요구</li>
              </ul>
              <p className="terms_content">
                위 권리 행사는 회사에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 할 수 있으며 회사는 이에 대해
                지체없이 조치하겠습니다. 이용자가 개인정보의 오류에 대한 정정을 요청한 경우, 정정을 완료하기 전까지 해당
                개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를
                제3자에게 지체 없이 통지하여 정정이 이루어지도록 하겠습니다.
              </p>
              <p className="terms_content">
                위 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.
              </p>
            </div>
            <div className="terms__content-wrapper">
              <p className="terms__subheading terms__content-heading">제7조 개인정보의 안전성 확보조치</p>
              <p className="terms_content">회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
              <ul className="privacy_ul">
                <li className="terms_content">
                  1. 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 백신소프트웨어 등 보안프로그램 설치, 개인정보가 저장된
                  파일의 암호화
                </li>
                <li className="terms_content">2. 물리적 조치 : 개인정보가 저장․보관된 장소의 시건, 출입통제 등</li>
              </ul>
            </div>
            <div className="terms__content-wrapper">
              <p className="terms__subheading terms__content-heading">제8조 개인정보보호 책임자</p>
              <p className="terms_content">
                회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제
                등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
              </p>
              <ul className="privacy_ul">
                <li className="terms_content">성명 : 이재일</li>
                <li className="terms_content">직책 : 대표자</li>
                <li className="terms_content">
                  연락처 : <a href="support@globaloutliers.com ">support@globaloutliers.com </a>
                </li>
              </ul>
            </div>
            <div className="terms__content-wrapper">
              <p className="terms__subheading terms__content-heading">제9조 개인정보처리방침 변경</p>
              <p className="terms_content">이 개인정보 처리방침은 2019년 7월 10일부터 적용됩니다.</p>
              <p>이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다.</p>
            </div>
          </div>
        </div>
        <div className="modal__action-btn-bar">
          <FlatAction onClick={onExit}>
            <span style={{ color: "#333" }}>동의하지 않습니다</span>
          </FlatAction>
          <FlatAction primary>
            <a href={emailLink}>
              <span style={{ color: "#333" }}>동의합니다</span>
            </a>
          </FlatAction>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  show: PropTypes.bool,
  target: PropTypes.string.isRequired,
  onExit: PropTypes.func.isRequired
};

Modal.defaultProps = {
  show: false
};

export default Modal;
