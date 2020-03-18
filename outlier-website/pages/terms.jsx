import React, { Fragment } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/terms.css';

function Terms() {
  return (
    <Fragment>
      <Header />
      <div className="termsContainer">
        {/* <h1>Terms &amp; Conditions</h1> */}
        <div className="terms__container">
          <h4 className="terms__heading">서비스 이용약관</h4>
          <h5 className="terms__subheading">
            제<strong>1</strong>장 총칙
          </h5>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">제1장 목적</p>
            <p className="terms_content">
              이 약관은 주식회사 아웃라이어스(이하 “회사”라 합니다)가 제공하는 “아웃라이어스”
              서비스의 이용에 대한 회사와 회원 간의 권리ㆍ의무 및 책임사항, 기타 필요한 사항을
              규정함을 목적으로 합니다.
            </p>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">제2조 용어의 정의</p>
            <ol>
              <li className="terms_content">이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</li>
              <ol>
                <li className="terms_content">
                  “회원”이란 이 약관에 따라 이용계약을 체결하고, 회사가 제공하는 서비스를 이용하는
                  자를 의미합니다.
                </li>
                <li className="terms_content">
                  “서비스”란 단말기(PC, TV, 모바일기기 등 각종 유무선 장치를 포함)와 제공
                  형태(웹사이트, 모바일 어플리케이션 등)와 무관하게 회사가 제공하고 회원이 이용할 수
                  있는 “아웃라이어스” 관련 제반 서비스를 의미하며, 본 항에서 정의되는 네트워킹,
                  매칭, 바이브, 모멘트, 리뷰 등을 포함합니다.
                </li>
                <li className="terms_content">
                  “오픈마켓”이란 모바일 기기에서 서비스를 설치하고 결제할 수 있도록 구축된
                  전자상거래 환경을 의미합니다.
                </li>
                <li className="terms_content">
                  “애플리케이션”이란 회사가 제공하는 서비스를 이용하기 위하여 모바일 기기를 통해
                  다운로드 받거나 설치하여 사용하는 프로그램 일체를 의미합니다.
                </li>
                <li className="terms_content">
                  “클로버”란 서비스를 이용 또는 구매하기 위해 사용되는 가상의 화폐 단위로서 회원이
                  대금을 지급하고 구입하거나, 회사가 무료로 적립ㆍ부여하는 것을 의미합니다.
                </li>
                <li className="terms_content">
                  “게시물”이란 회원이 서비스에 게시한 문자, 문서, 그림, 음성, 링크, 파일, 응답 혹은
                  이들의 조합으로 이루어진 정보 등 모든 정보나 자료를 의미합니다.
                </li>
                <li className="terms_content">
                  “인증”이란 회사가 정하고 제공하는 방식에 따라 가입신청자가 본인임을 확인하는
                  절차로, 가입신청자가 필수 기재 항목에 해당하는 정보를 입력하고 입력한 정보에 대한
                  요청서류를 제출하는 것을 말합니다. 회사는 인증을 위해 ‘회원의 소속(졸업) 대학 또는
                  소속 직장 웹메일을 통한 인증서비스’ 또는 ‘재학증명서, 졸업증명서, 성적증명서,
                  학생증 사진, 재직증명서, 근로소득 원천징수영수증, 사원증 사진 등의 증빙서류 제출을
                  통한 인증서비스’를 제공합니다.
                </li>
                <li className="terms_content">
                  “매칭”이란 프로필 확인 이후 회원 간 연결되는 것을 의미합니다. 회원 간 서로 호감과
                  수락의사를 표시하기 전까지 매칭은 완료되지 않으며, 매칭이 완료되는 경우 해당 회원
                  간에 휴대폰 번호가 공개됩니다.
                </li>
                <li className="terms_content">
                  “네트워킹”이란 회원이 다른 회원들의 정보를 보고 사진 열람, 댓글, 게시물 좋아요
                  등의 방식으로 교류 활동을 하는 것을 말합니다.
                </li>
                <li className="terms_content">
                  “바이브”란 회원이 본인 혹은 본인이 찍은 사진을 올려 다른 회원과 네트워킹을 할 수
                  있는 형태의 서비스를 말합니다.
                </li>
                <li className="terms_content">
                  “모멘트”란 회원이 데이터베이스에 저장되지 않는 본인의 위치정보를 기반으로 계산된
                  거리값으로 다른 회원과 네트워킹을 할 수 있는 형태의 서비스를 말합니다.
                </li>
                <li className="terms_content">
                  “리뷰”란 매칭이 된 회원 간 공개된 연락처로 대화를 나누었거나 혹은 실제로 만났을
                  경우해당 회원 간 상대방의 사진과 실물의 유사도 및 매너에 대한 평가를 하는 제도를
                  말합니다.
                </li>
                <li className="terms_content">
                  “종합 평가”란 회원의 네트워킹 댓글 및 좋아요 수, 프로필 더보기 신청을 받은 횟수,
                  호감을 받은 횟수, 리뷰 점수 등을 종합하여 평가하는 것을 말합니다.
                </li>
                <li className="terms_content">
                  “오프라인 이벤트”란 회사 및/또는 회사와의 제휴업체가 기획ㆍ진행하는 오프라인에서의
                  행사ㆍ모임ㆍ활동 등을 말합니다.
                </li>
              </ol>
              <li className="terms_content">
                이 약관에서 사용하는 용어의 정의는 본 조 제1항에서 정하는 것을 제외하고는
                관계법령에서 정하는 바에 따르며, 이에 정하지 아니한 것은 일반적인 상관례에 따릅니다.
              </li>
            </ol>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">제3조 약관의 효력 및 변경</p>
            <ol>
              <li className="terms_content">
                회사는 이 약관의 내용을 회원이 알 수 있도록 서비스 화면 또는 그 연결화면에
                게시합니다.
              </li>
              <li className="terms_content">
                회사가 약관을 개정할 경우에는 적용일자 및 개정내용, 개정사유 등을 명시하여 최소한 그
                적용일 7일 이전부터 서비스 화면 또는 그 연결화면에 게시하여 회원에게 공지합니다.
                다만, 변경된 내용이 회원에게 불리한 사항 또는 중요한 사항의 변경인 경우에는 공지
                외에 일정 기간 동안 전자적 형태(이메일, SMS 등)의 방법으로 회원에게 개별 고지합니다.
              </li>
              <li className="terms_content">
                회원이 개정약관에 대해 동의하지 않는 경우 회사 또는 회원은 이용계약을 해지할 수
                있습니다. 회사는 제2항의 공지를 할 경우 회원이 개정약관에 대해 시행일 7일 후까지
                거부의 의사표시를 하지 않으면 동의한 것으로 볼 수 있다는 내용도 함께 공지를 하며,
                회원이 개정약관 시행일까지 거부의 의사표시를 하지 않는다면 개정약관에 동의한 것으로
                봅니다.
              </li>
              <li className="terms_content">
                회사가 이메일, 문자 통보의 방법으로 회원에게 개별 고지하는 경우, 회원이 기제공한
                이메일 주소, 전화번호 중 가장 최근에 제공된 곳으로 통보하며, 회원이 최근의 정보로
                변경하지 않아 발생한 손해에 대해서는 어떠한 책임도 부담하지 않습니다.
              </li>
              <li className="terms_content">
                회사는 「약관의 규제에 관한 법률」, 「정보통신망이용촉진 및 정보보호 등에 관한
                법률」 등 관련 법령에 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
              </li>
            </ol>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">제4조 약관의 해석 </p>
            <ol>
              <li className="terms_content">
                이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 「약관의 규제에 관한
                법률」, 「정보통신망이용촉진 및 정보보호 등에 관한 법률」 등 관련 법령 또는 상관례에
                따릅니다.
              </li>
              <li className="terms_content">
                회사는 약관을 적용하기 위하여 필요한 사항과 약관에서 구체적 범위를 정하여 위임한
                사항을 정책(이하 “개별정책”이라 합니다)으로 정할 수 있으며, 개별정책의 내용을 회원이
                알 수 있도록 서비스 화면 또는 그 연결화면에 게시합니다.
              </li>
            </ol>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">
              제5조 회원 가입 및 이용계약의 체결{' '}
            </p>
            <ol>
              <li className="terms_content">
                이용계약은 회원이 되고자 하는 자(이하 “가입신청자”라 합니다)가 이 회사가 정한
                회원가입 절차에 의해 본 약관의 내용에 대하여 동의를 한 다음 이용을 신청하고, 회사가
                그 신청에 대해서 승낙함으로써 체결됩니다.
              </li>
              <li className="terms_content">
                가입신청자는 회사에서 제공된 이용신청서 양식에 따라 필요사항을 기재하여야 합니다.
                회원 가입시 기재 항목은 필수 기재 항목과 선택 기재 항목으로 구분되어 있으며, 필수
                기재 항목의 경우 반드시 입력을 하여야 합니다.
              </li>
              <li className="terms_content">
                가입신청자는 서비스를 이용하기 위해, 본인의 실명 등을 토대로 회사가 제시하는 방법을
                통해 인증을 해야 합니다.
              </li>
              <li className="terms_content">
                가입신청자가 입력한 정보는 사실로 간주되며, 회사는 인증을 마친 가입신청자의 신청에
                대하여 승낙함을 원칙으로 합니다. 다만, 회사는 다음 각 호의 어느 하나에 해당하는
                신청에 대하여 그 사유가 해소될 때까지 승낙을 유보하거나, 승낙을 거부할 수 있으며,
                사후에 이용계약을 해지할 수 있습니다.
              </li>
              <ol>
                <li className="terms_content">
                  이용신청서 내용을 허위로 기재하거나, 이용신청 요건을 충족하지 못하거나, 필수 기재
                  항목을 입력하지 않은 경우{' '}
                </li>
                <li className="terms_content">
                  제3자의 명의, 이메일 주소 등을 사용하여 이용을 신청하거나, 인증을 허위로 진행한
                  경우{' '}
                </li>
                <li className="terms_content">
                  본 약관에 의하여 회원 자격을 상실한 적이 있는 경우. 단, 회사의 회원 재가입 승낙을
                  얻은 경우는 예외로 함{' '}
                </li>
                <li className="terms_content">
                  회사로부터 이용정지 등의 제재를 받은 회원이 그 제재기간 중에 이용계약을 임의로
                  해지하고 재이용을 신청한 경우
                </li>
                <li className="terms_content">
                  기술상 서비스 제공이 불가능하거나, 서비스 상의 장애가 발생한 경우{' '}
                </li>
                <li className="terms_content">
                  법령을 위반하거나, 사회의 안녕과 질서 또는 미풍양속을 저해할 목적으로 신청한 경우
                </li>
                <li className="terms_content">
                  부정한 용도, 영리를 추구할 목적으로 서비스를 이용하고자 하는 경우
                </li>
                <li className="terms_content">법률상 미성년자에 해당하는 경우 </li>
                <li className="terms_content">
                  타인의 정보를 도용한 것으로 의심되어 사실 여부를 확인하기 위해 추가 입증 자료 제출
                  등의 해명을 요구하였으나, 해명이 불충분한 경우{' '}
                </li>
                <li className="terms_content">
                  그 밖에 각 호에 준하는 사유로서 승낙이 부적절하다고 판단되는 경우
                </li>
              </ol>
              <li className="terms_content">
                회원은 회원 가입 시 기재한 정보에 변경이 발생한 경우, 즉시 변경사항을 정정하여
                기재하여야 합니다. 변경의 지체로 인하여 발생한 회원의 손해에 대해 회사는 책임을 지지
                않습니다.
              </li>
              <li className="terms_content">
                이용계약의 성립 시점은 회사의 이용 신청 승낙이 가입신청자에게 도달한 시점을 기준으로
                합니다.
              </li>
            </ol>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">제6조 회원에 대한 통지 </p>
            <ol>
              <li className="terms_content">
                회사는 회원에 대한 통지를 하는 경우 본 약관에 별도의 규정이 없는 한 회원이 등록한
                전화번호, 이메일, 서신 및 기타의 방법으로 할 수 있습니다.
              </li>
              <li className="terms_content">
                회사는 불특정다수 회원에 대한 통지를 하는 경우 14일 이상 서비스 화면 또는 연결
                화면에 게시함으로써 제1항의 통지에 갈음할 수 있습니다.
              </li>
            </ol>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">제7조 서비스의 내용 </p>
            <p className="terms_content">회사가 제공하는 서비스의 내용은 다음 각 항과 같습니다.</p>
            <ol>
              <li className="terms_content">
                가입신청자와 회사 간 이용계약이 성립되어 가입신청자가 회원이 된 경우, 회원이
                인증절차를 거쳐 인증된 나이, 학교 혹은 직장의 명칭이 다른 회원들에게 공개됩니다.
              </li>
              <li className="terms_content">
                제1항의 정보 이외에 회원이 입력한 정보는 비공개를 원칙으로 하며, 회원이 공개여부를
                선택할 수 있습니다.
              </li>
              <li className="terms_content">
                회원은 바이브, 모멘트 등의 기능을 통하여 다른 회원의 정보를 확인하고 프로필 더 보기
                신청, 댓글 달기, 리뷰 등의 활동 및 네트워킹을 할 수 있으며, 다른 회원과 매칭될 수
                있습니다.
              </li>
              <li className="terms_content">
                매칭과 프로필 더보기 신청 등의 추가 기능, 네트워킹의 기타 부가 서비스를 이용하려면
                별도의 결제가 필요할 수 있습니다.
              </li>
              <li className="terms_content">
                회원이 결제하고자 하는 경우 회원의 동의 하에 In-App 결제 방식을 거치며, 별도의
                추가적인 결제 수단이 제공될 수 있습니다.
              </li>
              <li className="terms_content">
                사용기한이 별도로 명시된 유료 부가서비스의 경우에는 구매 시 명기한 사용기한을
                따릅니다.{' '}
              </li>
              <li className="terms_content">
                유효기간이 표시되지 않은 부가서비스에 대한 사용은 서비스가 정상적으로 제공되는 기간
                동안의 이용을 보장하는 것이며, 만약 회원이 서비스 이용약관 상 금지 행위를 하였거나
                휴면 계정으로 분류되어 그에 따른 제한으로 서비스 이용제한 대상이 되는 경우에는
                유효기간이 표시되지 않은 부가서비스의 사용도 중지되며 회사는 구매대금을 반환할
                책임을 부담하지 않습니다.
              </li>
              <li className="terms_content">
                회사는 양질의 서비스 제공을 위해 회원의 프로필 수정 및 보완 또는 추가 인증(회사가
                정한 신원 인증 서류의 제출 요구)을 요구할 수 있습니다.{' '}
              </li>
              <li className="terms_content">
                회사는 회원의 인증일부터 서비스 이용일 현재까지의 정보의 정확성에 대해서 알지
                못하며, 회원 본인의 정보에 대한 정확하고 최신의 정보로의 유지, 갱신의 의무는 회원
                본인에게 있습니다.
              </li>
              <li className="terms_content">
                ”아웃라이어스”에서 매칭된 회원 간의 행위(연락 및 만남)에 회사는 관여하지 않습니다.
                따라서 회원은 실제 연락 및 만남 여부와 만남의 장소ㆍ시간 등은 신중하게 결정해야
                합니다.
              </li>
              <li className="terms_content">
                회사는 리뷰, 종합평가 등의 서비스를 이용하여 회원을 관리하고 서비스의 품질을
                유지합니다.
              </li>
              <li className="terms_content">
                회사는 회원에게 오프라인 이벤트를 홍보하고, 오프라인 이벤트의 참여를 독려할 수
                있습니다.
              </li>
            </ol>
          </div>
          <h5 className="terms__subheading">
            제<strong>2</strong>장 개인정보 관리
          </h5>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">
              제8조 개인정보의 보호 및 사용{' '}
            </p>
            <ol>
              <li className="terms_content">
                회사는 관련 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력하며,
                개인정보의 보호 및 사용에 대해서는 관련 법령 및 회사의 개인정보처리방침에 따릅니다.
                다만, 회사가 제공하는 서비스 이외의 링크된 서비스에서는 회사의 개인정보처리방침이
                적용되지 않습니다.
              </li>
              <li className="terms_content">
                회사는 관련 법령에 의해 관련 국가기관 등의 요청이 있는 경우를 제외하고는 회원의
                개인정보를 본인의 동의 없이 타인에게 제공하지 않습니다.
              </li>
              <li className="terms_content">
                회사는 회원의 귀책사유로 개인정보가 유출되어 발생한 피해(회원이 타 회원의 개인정보를
                유출하여 발생한 피해를 포함함)에 대하여 책임을 지지 않습니다.
              </li>
            </ol>
          </div>
          <h5 className="terms__subheading">
            제<strong>3</strong>장 이용계약 당사자의 의무
          </h5>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">제9조 회사의 의무 </p>
            <ol>
              <li className="terms_content">
                회사는 관련 법령, 이 약관에서 정하는 권리의 행사 및 의무의 이행을 신의에 따라
                성실하게 준수합니다.
              </li>
              <li className="terms_content">
                회사는 회원이 안전하게 서비스를 이용할 수 있도록 개인정보 보호를 위해 보안시스템을
                갖추어야 하며 개인정보처리방침을 공시하고 준수합니다. 회사는 이 약관 및
                개인정보처리방침에서 정한 경우를 제외하고는 회원의 개인정보가 제3자에게 공개 또는
                제공되지 않도록 합니다.
              </li>
              <li className="terms_content">
                회사는 계속적이고 안정적인 서비스의 제공을 위하여 서비스 개선을 하던 중 설비에
                장애가 생기거나 데이터 등이 멸실ㆍ훼손된 때에는 천재지변, 비상사태, 현재의 기술로는
                해결이 불가능한 장애나 결함 등 부득이한 사유가 없는 한 지체 없이 이를 수리 또는
                복구하도록 최선의 노력을 다합니다.
              </li>
              <li className="terms_content">
                회사가 제공하는 서비스로 인하여 회원에게 손해가 발생한 경우 그러한 손해가 회사의
                귀책사유에 의하여 발생한 경우에 한하여 회사에서 책임을 부담합니다.
              </li>
            </ol>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">제10조 회원의 의무 </p>
            <ol>
              <li className="terms_content">
                회원은 회사에서 제공하는 서비스의 이용과 관련하여 다음 각 호에 해당하는 행위를
                해서는 아니 됩니다.
              </li>
              <ol>
                <li className="terms_content">
                  이용신청 또는 변경 시 허위 사실을 기재하거나, 제3자의 정보를 도용, 부정하게
                  사용ㆍ인증을 수행하는 행위
                </li>
                <li className="terms_content">
                  회사의 서비스를 이용하여 얻은 정보를 회사의 사전 승낙 없이 복제 또는 유통시키거나
                  상업적으로 이용하는 행위, 알려지거나 알려지지 않은 버그를 악용하여 서비스를
                  이용하는 행위
                </li>
                <li className="terms_content">
                  다른 회원의 정보ㆍ게시물을 무단으로 수집ㆍ저장ㆍ게시 또는 유포하는 행위
                </li>
                <li className="terms_content">
                  타인의 명예를 손상시키거나 불이익을 주는 행위, 타인에 대하여 허위의 정보를
                  유통시키는 행위{' '}
                </li>
                <li className="terms_content">
                  도박 등 사행행위를 하거나 유도하는 행위, 음란ㆍ저속한 정보를 교류ㆍ게재하거나 음란
                  사이트를 연결(링크)하는 행위, 수치심ㆍ혐오감 또는 공포심을 일으키는
                  말ㆍ소리ㆍ글ㆍ그림ㆍ사진 또는 영상을 타인에게 전송 또는 유포하는 행위 등 기타
                  공공질서 및 미풍양속에 위반되는 내용의 정보, 문장, 도형, 음성 등을 타인에게
                  유포하는 행위
                </li>
                <li className="terms_content">
                  회사의 직원이나 운영자를 가장하거나 타인의 명의를 도용하여 글을 게시하거나 메일을
                  발송하는 행위
                </li>
                <li className="terms_content">
                  타인의 신용카드⋅유/무선 전화⋅은행 계좌 등을 도용하여 클로버를 구매하는 행위, 다른
                  회원의 ID 및 비밀번호를 부정사용하는 행위
                </li>
                <li className="terms_content">
                  서비스를 무단으로 영리, 영업, 광고, 홍보, 정치활동, 선거운동 등 본래의 용도 이외의
                  용도로 이용하는 행위
                </li>
                <li className="terms_content">
                  타인을 기망하여 이득을 취하는 행위, 회사의 서비스의 이용과 관련하여 타인에게
                  피해를 입히는 행위
                </li>
                <li className="terms_content">
                  회사나 타인의 지적재산권, 초상권 기타 권리를 침해하는 행위
                </li>
                <li className="terms_content">
                  법령에 의하여 전송 또는 게시가 금지된 정보(컴퓨터 프로그램)나 컴퓨터
                  소프트웨어ㆍ하드웨어 또는 전기통신장비의 정상적인 작동을 방해ㆍ파괴할 목적으로
                  고안된 바이러스ㆍ컴퓨터 코드ㆍ파일ㆍ프로그램 등을 고의로 전송ㆍ게시ㆍ유포 또는
                  사용하는 행위
                </li>
                <li className="terms_content">
                  서비스 운영을 고의로 방해하거나 서비스의 안정적 운영을 방해할 수 있는 정보 및
                  수신자의 명시적인 수신거부의사에 반하여 광고성 정보 또는 스팸메일(Spam Mail)을
                  전송하는 행위
                </li>
                <li className="terms_content">
                  회사로부터 특별한 권리를 부여받지 않고 애플리케이션을 변경하거나, 애플리케이션에
                  다른 프로그램을 추가ㆍ삽입하거나, 서버를 해킹ㆍ역설계하거나, 소스 코드나
                  애플리케이션 데이터를 유출⋅변경하거나, 별도의 서버를 구축하거나, 웹사이트의
                  일부분을 임의로 변경ㆍ도용하여 회사를 사칭하는 행위
                </li>
                <li className="terms_content">
                  그 밖에 관련 법령에 위반되거나 선량한 풍속 기타 사회통념에 반하는 행위
                </li>
              </ol>
              <li className="terms_content">
                회원은 관계 법령, 본 약관의 규정, 이용안내 및 서비스 상에 공지한 주의사항, 회사가
                통지하는 사항 등을 준수하여야 합니다.
              </li>
              <li className="terms_content">
                회원이 제1항에 규정된 행위를 한 경우 회사는 즉시 서비스의 일부 또는 전부에 대한
                이용제한, 이용계약의 해지 등을 할 수 있으며, 형사 고발/고소 및 회사에 손해가 발생한
                경우에는 손해배상의 청구 등의 조치를 할 수 있습니다.{' '}
              </li>
              <li className="terms_content">
                회원은 1인 1계정을 원칙으로 합니다. 회원의 계정 및 모바일 기기에 관한 관리 책임은
                회원에게 있으며, 이를 타인이 이용하도록 하게 하여서는 안 됩니다. 모바일 기기의 관리
                부실이나 타인에게 이용을 승낙함으로 인해 발생하는 손해에 대해서 회사는 책임을 지지
                않습니다.{' '}
              </li>
              <li className="terms_content">
                회원은 각 오픈마켓에서 부정한 결제가 이루어지지 아니하도록 결제 비밀번호 기능을
                설정하고 관리하여야 합니다. 회원의 부주의로 인하여 발생하는 손해에 대해 회사는
                책임지지 않습니다
              </li>
            </ol>
          </div>
          <h5 className="terms__subheading">
            제<strong>4</strong>장 서비스의 이용 및 이용제한
          </h5>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">
              제11조 서비스의 제공 및 이용{' '}
            </p>
            <ol>
              <li className="terms_content">
                회사는 제5조의 규정에 따라 회원의 이용 신청을 승낙한 때로부터 서비스를 개시합니다.
                다만, 일부 서비스의 경우 회사의 필요에 따라 지정된 일자부터 서비스를 개시할 수
                있습니다.
              </li>
              <li className="terms_content">
                회사는 회원의 등급을 구분하고 이용시간, 이용횟수, 개별 서비스 메뉴, 제공 서비스의
                범위 등 기타 필요한 사항을 세분화하여 그 이용에 차등을 둘 수 있습니다.
              </li>
              <li className="terms_content">
                유료 서비스의 경우에는 해당 서비스에 명시된 요금을 지급하여야 이용할 수 있습니다.
                네트워크를 통해 애플리케이션을 다운로드하거나 서비스를 이용하는 경우에는 가입한
                이동통신사에서 정한 별도의 요금이 발생할 수 있습니다.
              </li>
              <li className="terms_content">
                다운로드하여 설치한 애플리케이션 또는 네트워크를 통해 이용하는 서비스의 경우에는
                모바일 기기 또는 이동통신사의 특성에 맞도록 제공됩니다. 모바일 기기의 변경ㆍ번호
                변경 또는 해외 로밍의 경우에는 콘텐츠의 전부 또는 일부의 이용이 불가능할 수 있으며,
                이 경우 회사는 책임을 지지 않습니다.
              </li>
              <li className="terms_content">
                다운로드하여 설치한 애플리케이션 또는 네트워크를 통해 이용하는 서비스의 경우에는
                백그라운드 작업이 진행될 수 있습니다. 이 경우 모바일 기기 또는 이동통신사의 특성에
                맞도록 추가 요금이 발생할 수 있으며 이와 관련하여 회사는 책임을 지지 않습니다.
              </li>
            </ol>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">제12조 서비스의 변경ㆍ중단</p>
            <ol>
              <li className="terms_content">
                회사는 원활한 서비스 제공을 위해 운영상 또는 기술상의 필요에 따라 서비스를 변경할 수
                있으며, 변경 전에 해당 내용을 서비스 내에 공지합니다. 다만, 버그ㆍ오류 등의 수정이나
                긴급 업데이트 등 부득이하게 변경할 필요가 있는 경우 또는 중대한 변경에 해당하지 않는
                경우에는 사후에 공지할 수 있습니다.
              </li>
              <li className="terms_content">
                서비스는 365일 24시간 제공을 원칙으로 하되, 회사는 다음 각 호의 경우에는 서비스의
                전부 또는 일부를 일시 정지할 수 있습니다. 이 경우 회사는 사전에 그 정지의 사유와
                기간을 서비스 내에 공지합니다. 다만, 사전에 공지할 수 없는 부득이한 사정이 있는 경우
                사후에 공지할 수 있습니다.
              </li>
              <ol>
                <li className="terms_content">
                  시스템 정기점검, 서버의 증설 및 교체, 네트워크의 불안정 등의 시스템 운영상 필요한
                  경우
                </li>
                <li className="terms_content">
                  정전, 서비스 설비의 장애, 서비스 이용 폭주, 기간통신사업자의 설비 보수 또는 점검
                  등으로 인하여 정상적인 서비스 제공이 불가능한 경우
                </li>
                <li className="terms_content">
                  전시, 사변, 천재지변 또는 이에 준하는 국가비상사태 등 회사가 통제할 수 없는 상황이
                  발생한 경우
                </li>
                <li className="terms_content">
                  영업양도ㆍ분할ㆍ합병 등에 따른 영업의 폐지, 서비스의 현저한 수익 악화 등 경영상의
                  중대한 사유가 발생하는 경우{' '}
                </li>
                <li className="terms_content">
                  기타 “아웃라이어스”의 원활한 운영을 현저히 저해하는 사유가 발생하는 경우
                </li>
              </ol>
              <li className="terms_content">
                회사는 제1항 및 제2항의 사유로 서비스 내용이 변경 또는 중단되어 회원이 입은 손해에
                대하여 고의 또는 과실이 없는 이상 책임을 부담하지 않습니다.
              </li>
            </ol>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">제13조 정보의 수집 등</p>
            <ol>
              <li className="terms_content">
                회사는 회원 간에 이루어지는 댓글 및 전달 메시지 등의 활동 내용을 저장ㆍ보관할 수
                있으며 이 정보는 회사만이 보유합니다. 회사는 회원 간의 분쟁 조정, 민원 처리 또는
                서비스 질서의 유지를 위한 경우에 한하여, 제3자는 법령에 따라 권한이 부여된 경우에
                한하여 이 정보를 열람할 수 있습니다.
              </li>
              <li className="terms_content">
                회사 또는 제3자가 제1항에 댓글 정보를 열람할 경우 회사는 사전에 열람의 사유 및
                범위를 해당 회원에게 고지합니다. 다만, 제10조 제1항에 따른 금지행위의
                조사ㆍ처리ㆍ확인 또는 그 행위로 인한 피해 구제와 관련하여 이 정보를 열람해야 할
                경우에는 사후에 고지할 수 있습니다.
              </li>
              <li className="terms_content">
                회사는 서비스의 원활하고 안정적인 운영 및 서비스 품질의 개선을 위하여 회원의
                개인정보를 제외한 회원의 모바일 기기 정보(설정, 사양, 운영체제, 버전 등)를
                수집ㆍ활용할 수 있습니다.
              </li>
              <li className="terms_content">
                회사는 서비스 개선 및 회원 대상 서비스 소개 등을 위한 목적으로 회원에게 추가정보를
                요청할 수 있습니다. 이 요청에 대해 회원은 승낙하거나 거절할 수 있으며, 회사가 이
                요청을 할 경우에는 회원이 이 요청을 거절할 수 있다는 뜻을 함께 고지합니다.
              </li>
            </ol>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">
              제14조 정보의 제공 및 광고의 게재{' '}
            </p>
            <ol>
              <li className="terms_content">
                회사는 서비스를 운영함에 있어서 서비스 관련 각종 정보를 서비스 화면에 게재하거나
                이메일, 문자, 푸시 메시지, 회사 또는 서비스의 플러스 친구 등의 방법으로 회원에게
                제공할 수 있습니다.
              </li>
              <li className="terms_content">
                회사는 수신에 동의한 회원에 한하여 제1항의 방법으로 광고성 정보를 전송할 수
                있습니다. 이 경우 회원은 언제든지 수신을 거절할 수 있으며, 회사는 회원의 수신 거절
                시 광고성 정보를 발송하지 아니합니다.{' '}
              </li>
              <li className="terms_content">
                회사가 제공하는 서비스 중의 배너 또는 링크 등을 통해 타인이 제공하는 광고나 서비스에
                연결될 수 있습니다.
              </li>
              <li className="terms_content">
                타인이 제공하는 광고나 서비스에 연결될 경우 해당 영역에서 제공하는 서비스는 회사의
                서비스 영역이 아니므로 회사가 신뢰성, 안정성 등을 보장하지 않으며, 그로 인한 회원의
                손해에 대하여도 회사는 책임을 지지 않습니다.
              </li>
            </ol>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">
              제15조 게시물 또는 내용물의 삭제
            </p>
            <ol>
              <li className="terms_content">
                회사는 회원이 게시하거나 전달하는 서비스 내의 모든 내용물(회원간 전달 포함)이 다음
                각 호의 경우 또는 본 계약 제10조 제1항의 금지행위에 해당한다고 판단되는 경우
                사전통지 없이 게시, 전달 등을 중단할 수 있으며, 이에 대해 회사는 귀책사유가 없는 한
                책임을 부담하지 않습니다.
              </li>
              <ol>
                <li className="terms_content">
                  회사, 다른 회원 또는 제3자를 비방하거나 명예를 훼손하는 내용인 경우
                </li>
                <li className="terms_content">
                  공공질서 및 미풍양속에 위반되는 내용의 정보, 문장, 도형 등의 유포에 해당하는 경우
                </li>
                <li className="terms_content">범죄행위에 결부된다고 인정되는 내용인 경우</li>
                <li className="terms_content">
                  회사 또는 제3자의 저작권 등 기타 권리를 침해하는 내용인 경우
                </li>
                <li className="terms_content">
                  불필요하거나 승인되지 않은 광고, 판촉물을 게재하는 경우
                </li>
                <li className="terms_content">
                  기타 본 약관, 개별정책, 관계 법령 및 회사의 지침 등에 위반된다고 판단되는 경우
                </li>
              </ol>
              <li className="terms_content">
                회사는 게시물에 관련된 세부 이용지침을 별도로 정하여 시행할 수 있으며, 회원은 그
                지침에 따라 각종 게시물(회원간 전달 포함)을 등록하거나 삭제하여야 합니다.
              </li>
            </ol>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">
              제16조 게시물의 저작권 등 권리 침해{' '}
            </p>
            <ol>
              <li className="terms_content">
                회사가 제작한 서비스ㆍ서비스 내의 콘텐츠에 대한 저작권과 기타 지적재산권은 회사에
                귀속합니다. 회원은 회사가 제공하는 서비스를 이용하여 얻은 정보 중에서 회사에
                지적재산권이 귀속된 정보를 회사의 사전 동의 없이 복제ㆍ전송 등의 방법(편집, 공표,
                공연, 배포, 방송, 2차적 저작물 작성 등을 포함합니다. 이하 같습니다)에 의하여
                영리목적으로 이용하거나 타인에게 이용하게 하여서는 안 됩니다.
              </li>
              <li className="terms_content">
                회원은 서비스와 관련하여 회원이 업로드하는 게시물을 회사가 다음과 같은 방법과
                조건으로 이용하는 것을 허락합니다.
              </li>
              <ol>
                <li className="terms_content">
                  해당 게시물을 검색결과ㆍ서비스 운영ㆍ홍보 등을 위해서 수정, 복제, 편집 및
                  변형하고, 이를 공표, 복제, 공연, 전송, 배포, 방송, 2차적 저작물 작성 등 어떠한
                  형태로든 이용하는 것. 이용기간과 지역에는 제한이 없음
                </li>
                <li className="terms_content">
                  다만, 게시물을 업로드한 회원의 사전 동의 없이 거래를 목적으로 이용자 콘텐츠를
                  판매, 대여, 양도하지 않음
                </li>
              </ol>
              <li className="terms_content">
                3 회사는 회원이 서비스 내에서 게시한 게시물이 타인의 저작권, 초상권, 기타 제반
                권리를 침해하더라도 회사의 귀책 사유가 없는 한 이에 대한 민・형사상의 책임을
                부담하지 않습니다. 만일 회원이 타인의 권리를 침해하였음을 이유로 회사가 귀책사유
                없이 타인으로부터 손해배상청구 등 이의제기를 받은 경우 회원은 회사를 면책시켜야
                하며, 회원은 그로 인해 회사에 발생한 모든 손해를 부담하여야 합니다.
              </li>
              <li className="terms_content">
                회사는 회원이 이용계약을 해지하거나 본 약관에 의한 적법한 사유로 이용계약이 해지된
                경우 및 회원이 게시하거나 등록한 게시물을 삭제할 수 있습니다.
              </li>
              <li className="terms_content">
                회원은 서비스를 이용하여 얻은 정보를 가공, 판매하는 등 서비스에 게재된 타인의 자료를
                영리목적으로 이용하거나 제3자에게 이용하게 할 수 없으며, 게시물에 대한 저작권 침해는
                관계 법령의 적용을 받습니다.
              </li>
            </ol>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">제17조 클로버</p>
            <ol>
              <li className="terms_content">
                클로버는 회원의 이벤트 참여 등에 따라 회사가 적립, 부여하는 무료 클로버와 회원이
                유료로 구매하는 유료 클로버로 구분됩니다.{' '}
              </li>
              <li className="terms_content">
                무료 클로버의 유효기간은 적립일로부터 30일이며, 유료 클로버는 충전일로부터 1년이
                경과하는 날까지 이용하지 않을 경우 소멸됩니다. 단, 회사는 무료 클로버의 유효기간을
                변경할 수 있으며 이 경우 발급 시점에 회원에게 고지합니다.{' '}
              </li>
              <li className="terms_content">
                회원이 서비스 이용약관상 금지 행위를 하였거나 휴면 계정으로 분류되어 그에 따른
                제한으로 서비스 이용제한 대상이 되는 경우에는 클로버의 유효기간이 중지되지 않으며,
                회사는 구매대금을 반환할 책임을 부담하지 않습니다.
              </li>
              <li className="terms_content">
                회사가 무상으로 적립 또는 부여하는 무료 클로버는 현금 환급 신청이 불가합니다.{' '}
              </li>
              <li className="terms_content">
                회원 탈퇴 시 미사용한 클로버는 소멸되며, 회사는 소멸되는 클로버에 대해서 별도의
                보상을 하지 않습니다.
              </li>
              <li className="terms_content">
                회사는 클로버 적립기준, 사용조건 및 제한 등에 관한 사항을 서비스 화면에 별도로
                게시하거나 통지합니다.
              </li>
            </ol>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">
              제18조 회원의 서비스 이용 제한{' '}
            </p>
            <ol>
              <li className="terms_content">
                회사는 회원이 본 약관의 규정을 위반하거나 서비스의 정상적인 운영을 방해한 경우,
                경고, 일시정지, 영구정지 등으로 서비스 이용을 단계적으로 제한할 수 있으며, 구체적인
                판단 기준은 회사에서 정합니다.{' '}
              </li>
              <table>
                <thead>
                  <tr>
                    <th className="terms_content">사유</th>
                    <th className="terms_content">조치사항</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="terms_content">
                      개인정보를 허위 또는 타인의 것으로 등록하는 행위, 회사가 제공하는 프로필 및
                      개인 정보(사진, 닉네임, 나이, 학교 및 직장 정보 등)을 무단 캡처 또는 무단
                      저장하는 행위 및 이를 유출하여 외부에 게시하는 행위, 회사의 서비스 운영 업무를
                      방해하는 행위 또는 회사에 대한 허위 사실을 유포하는 등의 행위, 셀 및 에그드롭
                      댓글에서 타인을 비방하거나 불쾌한 게시물을 작성, 논란을 일으키거나 회사의
                      서비스 제공에 유해한 게시물을 작성하는 등 회사가 정한 이용정책을 위반하는 행위
                    </td>
                    <td className="terms_content">
                      경고 조치 후 경고 횟수 누적에 따라 최대 서비스 이용 영구정지
                    </td>
                  </tr>
                  <tr>
                    <td className="terms_content">
                      다른 회원을 특정해 비방 또는 인격모독을 하거나 이를 작성 및 유포하는 행위,
                      공공질서 및 미풍양속을 저해하는 저작물을 등록 또는 유통시키는 행위, 회사에서
                      허용한 정당한 결제방식을 통해 매칭이 되어 다른 회원의 연락처를 얻는 정상적인
                      절차가 아닌 '회사’ 서비스 신청서 영역에 개인의 연락처( E-mail, 블로그, 휴대폰
                      번호, SNS 등)를 기재 하거나 이를 유도하여 부당하게 본인과의 연락을 할 수 있는
                      수단을 공개하는 등의 방법으로 회사의 서비스를 부정하게 이용하는 경우{' '}
                    </td>
                    <td className="terms_content">
                      서비스 이용 일시정지 후 일시정지 횟수 누적에 따라 최대 영구정지
                    </td>
                  </tr>
                  <tr>
                    <td className="terms_content">
                      회원의 정보를 부정하게 취득하는 행위, 회사의 프로그램 등을 해킹 또는 유사
                      프로그램을 이용해 정상적인 운영을 어렵게 하는 행위(해킹 또는 바이러스 유포,
                      디도스 공격 등), 타인의 휴대전화번호 및 개인정보를 도용하는 행위, 사이트
                      내에서 불법적으로 물건을 판매하거나 상행위를 하는 행위, 음란물 및 동영상을
                      게시하는 행위, 기타 회사의 서비스 및 제반 설비를 이용해 범죄 또는 불법행위를
                      하거나 이외 회사의 판단 하에 이용에 부적절하다고 여겨지는 행위{' '}
                    </td>
                    <td className="terms_content">서비스 이용 영구 정지 </td>
                  </tr>
                </tbody>
              </table>
              <li className="terms_content">
                스크린샷의 방식으로 타 회원의 정보를 수집하는 경우, 그 이유를 불문하고 (i) 1회
                스크린샷 시도 시 24시간 동안 계정을 정지하고, (ii) 2회 스크린샷 시도 시 7일 간
                계정을 정지하며, (iii) 3회 스크린샷 시도 시 영구적으로 서비스 이용을 제한합니다.
                (iii)에 따라 영구정지 조치를 받은 회원은 본 약관 제20조 제6항에 따라 환불을 요청할
                수 없습니다.
              </li>
              <li className="terms_content">
                회원 자격 재심사의 과정은 해당 회원의 서비스 이용행태 및 이용내역을 토대로 진행되며,
                심사 결과에 따라 서비스 이용 자격 제한이 이뤄질 수 있습니다.
              </li>
              <li className="terms_content">
                회사는 서비스의 품질 유지를 위하여 평가 점수가 극히 낮은 회원에 대하여 심사 7일 전
                사전 고지하고 심사를 진행할 수 있다. 심사 시점에도 평가 점수가 개선되지 않았을 경우,
                회사는 1개월의 기간 동안 서비스 사용 일시정지를 명할 수 있으며, 1개월의 기간 후에
                재심사를 진행하여 일시정지 기간의 연장 여부ㆍ서비스 이용의 제한 등을 결정할 수
                있습니다.회
              </li>
              <li className="terms_content">
                회사가 본 조에 따라 서비스 이용을 제한하거나 계약을 해지하는 경우에는 본 약관
                제6조에 따라 통지합니다.
              </li>
              <li className="terms_content">
                회사는 회원의 귀책사유로 인한 이용제한에 따라 회원이 입은 손해를 배상하지 않습니다.
              </li>
              <li className="terms_content">
                회원은 본 조에 따른 이용제한 조치 등에 대해 회사가 정한 절차에 따라 이의신청을 할 수
                있습니다. 이 때 이의가 정당하다고 회사가 인정하는 경우 회사는 즉시 회원의 서비스
                이용을 재개합니다.
              </li>
            </ol>
          </div>
          <h5 className="terms__subheading">
            제<strong>5</strong>장 결제ㆍ결제 취소 및 이용계약의 해지
          </h5>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">제19조 대금결제 </p>
            <ol>
              <li className="terms_content">
                유료 콘텐츠 구매 대금의 부과와 납부는 원칙적으로 이동통신사나 오픈마켓 사업자 등에서
                정하는 정책이나 방법에 따릅니다. 또한 각 결제수단별 한도가 회사나 오픈마켓 사업자가
                정하는 정책 또는 정부의 방침에 따라 부여되거나 조정될 수 있습니다.
              </li>
              <li className="terms_content">
                유료 콘텐츠 구매대금을 외화로 결제하는 경우에는 환율‧수수료 등으로 인하여 실제
                청구금액이 서비스의 상점 등에서 표시된 가격과 달라질 수 있습니다.
              </li>
            </ol>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">제20조 결제 취소, 환불 </p>
            <ol>
              <li className="terms_content">
                회사와 유료콘텐츠의 구매에 관한 계약을 체결한 회원은 다음 각 호의 경우 결제 취소,
                환불을 요청할 수 있습니다.{' '}
              </li>
              <ol>
                <li className="terms_content">
                  회원이 구매한 클로버를 일체 사용하지 않은 경우, 구매계약일로부터 7일 이내 전액
                  환불이 가능하며, 7일 초과시부터는 회사가 정한 수수료를 차감 후 부분 환불이
                  가능합니다.
                </li>
                <li className="terms_content">
                  회원이 구매한 클로버를 사용한 경우, 구매계약일로부터 3일 이내에는 잔여 부분에 대해
                  회사가 정하는 수수료를 차감 후 부분 환불이 가능합니다. 단, 3일 초과시부터는 환불이
                  불가능합니다.{' '}
                </li>
                <li className="terms_content">회사의 귀책사유로 결제 오류가 발생한 경우 </li>
                <li className="terms_content">회사의 귀책사유로 서비스가 중단되는 경우 </li>
              </ol>
              <li className="terms_content">
                회원은 다음 각 호에 해당하는 경우에는 회사의 의사에 반하여 제1항에 따른 결제 취소,
                환불을 요청할 수 없습니다. 다만, 가분적 콘텐츠로 구성된 구매계약의 경우에는 가분적
                콘텐츠 중 다음 각 호에 해당하지 아니하는 나머지 부분에 대하여는 그러하지 아니합니다.{' '}
              </li>
              <ol>
                <li className="terms_content">구매 즉시 사용되거나 적용되는 유료 콘텐츠</li>
                <li className="terms_content">
                  추가 혜택이 제공되는 경우에 그 추가 혜택이 사용된 콘텐츠
                </li>
              </ol>
              <li className="terms_content">
                회사는 제2항 각 호의 규정에 따라 청약철회가 불가능한 콘텐츠의 경우에는 그 사실을
                회원이 쉽게 알 수 있는 곳에 명확하게 표시합니다.{' '}
              </li>
              <li className="terms_content">
                회원이 결제취소, 환불 신청을 할 경우 회사는 플랫폼사업자 또는 오픈마켓 사업자를 통해
                구매내역을 확인합니다. 또한 회사는 회원의 정당한 철회 사유를 확인하기 위해
                회원에게서 제공받은 정보를 통해 회원에게 연락할 수 있으며, 추가적인 증빙을 요구할 수
                있습니다.
              </li>
              <li className="terms_content">
                본 조의 규정에 따라 결제 취소, 환불이 이루어질 경우 회사는 지체 없이 회원의 유료
                콘텐츠를 회수하고 3영업일 이내에 대금을 환급합니다.{' '}
              </li>
              <li className="terms_content">
                회원이 본 약관 또는 기타 법령을 위반하여 이용이 정지되거나 이용계약이 해지되는 등
                회원의 귀책사유가 인정되는 경우, 회원은 결제 취소 또는 환불 요청을 할 수 없습니다.{' '}
              </li>
            </ol>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">
              제21조 회원의 탈퇴 및 자격상실
            </p>
            <ol>
              <li className="terms_content">
                회원은 다음 각 호에서 정한 바에 따라 이용계약을 해지할 수 있습니다.
              </li>
              <ol>
                <li className="terms_content">
                  회원은 언제든지 서비스의 탈퇴하기, 이메일 등으로 회사에 이용계약 해지의 의사를
                  통지함으로써 이용계약을 해지할 수 있습니다. 단, 해지의사를 통지하기 전에 현재 진행
                  중인 모든 유료 서비스의 거래를 완료하거나 철회 또는 취소하여야 하며, 회사는
                  귀책사유가 없는 한 해당 유료 서비스 거래에 관하여 책임을 부담하지 않습니다.
                </li>
                <li className="terms_content">
                  회원 탈퇴로 인해 발생할 수 있는 사항에 대하여 회사는 귀책사유가 없는 한 책임을
                  부담하지 아니하며, 이용계약이 종료되면 회사가 이용계약에 기초하여 회원에게
                  부가적으로 제공한 혜택이 함께 종료됩니다.
                </li>
              </ol>
              <li className="terms_content">
                회사는 본 약관 제10조에서 정한 바에 따라 즉시 이용계약을 해지할 수 있습니다.{' '}
              </li>
              <li className="terms_content">
                본 조에 따라 이용계약이 종료되는 경우, 회원의 재이용신청에 대하여 회사는 그 승낙을
                거절할 수 있습니다.{' '}
              </li>
            </ol>
          </div>
          <h5 className="terms__subheading">
            제<strong>6</strong>장 손해배상 및 면책조항 등
          </h5>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">제22조 손해배상</p>
            <ol>
              <li className="terms_content">
                회원이 본 약관의 규정을 위반함으로 인하여 회사에 손해가 발생하게 되는 경우, 본
                약관을 위반한 회원은 회사에 발생하는 손해를 배상하여야 합니다.
              </li>
              <li className="terms_content">
                회원이 서비스를 이용함에 있어 행한 불법행위나 본 약관 위반행위로 인하여 회사가 당해
                회원 이외의 제3자로부터 손해배상 청구 또는 소송을 비롯한 각종 이의제기를 받는 경우,
                당해 회원은 자신의 책임과 비용으로 회사를 면책 시켜야 하며, 당해 회원은 그로 인하여
                회사에 발생한 손해를 배상하여야 합니다.
              </li>
              <li className="terms_content">
                회사의 고의나 과실에 의하여 회원에게 손해가 발생한 경우 그러한 손해에 대하여는
                회사에서 책임을 부담하여야 합니다.
              </li>
            </ol>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">제23조 회사의 면책</p>
            <ol>
              <li className="terms_content">
                회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는
                경우에는 서비스 제공에 관하여 책임을 지지 않습니다.
              </li>
              <li className="terms_content">
                회사는 서비스용 설비의 보수, 교체, 정기점검, 공사 등 기타 이에 준하는 사유로 발생한
                손해에 대하여 책임을 지지 않습니다. 다만, 회사의 고의 또는 과실에 의한 경우에는
                그러하지 아니합니다.
              </li>
              <li className="terms_content">
                회사는 회원의 고의 또는 과실로 인한 서비스 이용의 장애에 대하여는 책임을 지지
                않습니다. 다만, 회원에게 부득이하거나 정당한 사유가 있는 경우에는 그러하지
                아니합니다.
              </li>
              <li className="terms_content">
                회원이 서비스와 관련하여 게재한 정보나 자료 등의 신뢰성, 정확성 등에 대하여 회사는
                고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다. 특히 회원이 허위나 부정한
                정보를 입력해 서비스를 이용하는 경우 회사는 이에 대해 고의 또는 중대한 과실이 없는
                한 손해배상 또는 기타 법적 책임을 부담하지 않습니다. 또한 회사는 인증 여부에 대한
                확인만을 제공할 뿐, 회원이 실제 해당 학교 혹은 직장에 소속(졸업)을 하였는지 여부에
                대하여 여하한 보증을 제공하지 아니하며, 회사의 고의 또는 중대한 과실이 없는 한
                책임을 부담하지 않습니다.
              </li>
              <li className="terms_content">
                회사는 회원이 다른 회원 또는 타인과 서비스를 매개로 발생한 거래나 분쟁, 회원 간의
                만남 및 연락 과정에서 발생한 사고 등에 대해 개입할 의무가 없으며, 이로 인한 손해에
                대해 책임을 지지 않습니다.
              </li>
              <li className="terms_content">
                회사는 무료로 제공되는 서비스 이용과 관련하여 회원에게 발생한 손해에 대해서는 책임을
                지지 않습니다. 그러나 회사의 고의 또는 중과실에 의한 경우에는 그러하지 아니합니다.
              </li>
              <li className="terms_content">
                회사는 회원이 서비스를 이용하여 기대하는 이익ㆍ효용을 얻지 못하거나 상실한 것에
                대하여 책임을 지지 않습니다.
              </li>
              <li className="terms_content">
                회사는 회원이 모바일 기기 비밀번호, 오픈마켓 사업자가 제공하는 비밀번호 등을
                관리하지 않아 발생하는 제3자 결제, 기타 회원의 정보 관리 관련 귀책사유로 발생한
                손해에 대해 책임을 지지 않습니다. 다만, 회사의 고의 또는 과실에 의한 경우에는
                그러하지 아니합니다.
              </li>
              <li className="terms_content">
                회사는 회원의 컴퓨터 환경이나 회사의 관리 범위에 있지 아니한 보안 문제로 인하여
                발생하는 제반 문제 또는 현재의 보안기술 수준으로 방어가 곤란한 네트워크 해킹 등
                회사의 귀책사유 없이 발생하는 문제에 대해서 책임을 지지 않습니다.
              </li>
              <li className="terms_content">
                회원이 모바일 기기의 변경, 모바일 기기의 번호 변경, 운영체제(OS) 버전의 변경, 해외
                로밍, 통신사 변경 등으로 인해 콘텐츠 전부나 일부의 기능을 이용할 수 없는 경우 회사는
                이에 대해 책임을 지지 않습니다. 다만, 회사의 고의 또는 과실에 의한 경우에는 그러하지
                아니합니다.
              </li>
              <li className="terms_content">
                회원이 회사가 제공하는 콘텐츠나 계정정보를 삭제한 경우 회사는 이에 대해 책임을 지지
                않습니다. 다만, 회사의 고의 또는 과실에 의한 경우에는 그러하지 아니합니다.{' '}
              </li>
            </ol>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">제24조 준거법 및 재판관할 </p>
            <ol>
              <li className="terms_content">
                이 약관은 대한민국 법률에 따라 규율되고 해석됩니다.{' '}
              </li>
              <li className="terms_content">
                회사와 회원 간에 발생한 분쟁으로 소송이 제기되는 경우에는 법령에 정한 절차에 따른
                법원을 관할 법원으로 합니다.
              </li>
            </ol>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
export default Terms;
