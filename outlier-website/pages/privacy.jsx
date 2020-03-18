import React from 'react';
import Layout from '../components/Layout';

function Privacy() {
  return (
    <Layout hideHero>
      <div className="terms__container">
        <h4 className="terms__heading">개인정보처리방침</h4>
        <p className="terms_content">
          주식회사 아웃라이어스(이하 “회사”라 합니다)는 이용자의 동의를 기반으로
          개인정보를 수집ㆍ이용 및 제공하고 있으며, 관계 법령 및 규정,
          가이드라인을 준수하고 있습니다. 회사는 이용자의 개인정보를 보호하고,
          이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여
          다음과 같이 개인정보처리방침을 수립ㆍ공개합니다.
        </p>
        <div className="terms__content-wrapper">
          <p className="terms__subheading terms__content-heading">
            제1조 개인정보의 수집 및 이용 목적{' '}
          </p>
          <p className="terms_content">
            회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
            개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
            변경되는 경우에는 별도의 동의를 받는 등 필요한 조치를 이행할
            예정입니다.
          </p>
          <ul className="privacy_ul">
            <li className="terms_content">
              <strong>홈페이지 회원 가입 및 관리: </strong>회원 가입의사 확인,
              회원제 서비스 제공에 따른 본인 식별ㆍ인증, 회원자격 유지ㆍ관리,
              불량 회원의 부정 이용 방지, 서비스 부정이용 방지, 가입 및 가입횟수
              제한
            </li>
            <li className="terms_content">
              <strong>2. 서비스 제공: </strong>서비스 제공, 유료 서비스 구매 및
              이용 시 요금 정산, 문의사항 처리, 공지사항 전달, 이벤트/행사 참여
              확인, 프라이버시 보호 측면의 서비스 환경 구축, 맞춤형 서비스 제공,
              서비스 개선에 활용
            </li>
            <li className="terms_content">
              <strong>3. 고충처리: </strong>민원인의 신원 확인, 민원사항 확인,
              사실조사를 위한 연락ㆍ통지, 처리결과 통보, 서비스의 원활한 운영에
              지장을 주는 행위(계정 도용 및 부정 이용 행위 등 포함)에 대한 방지
              및 제재
            </li>
            <li className="terms_content">
              <strong>4. 신규 서비스 개발 및 마케팅, 광고 활용: </strong>
              신규서비스 개발 및 인증서비스ㆍ맞춤서비스 제공, 통계학적 특성에
              따른 서비스제공 및 광고 게재, 이벤트 및 광고성 정보 제공 및 참여
              기회 제공, 접속 빈도 파악, 회원 서비스 이용에 대한 통계, 서비스
              유효성 확인
            </li>
          </ul>
        </div>
        <div className="terms__content-wrapper">
          <p className="terms__subheading terms__content-heading">
            제2조 수집하는 개인정보의 항목{' '}
          </p>
          <p className="terms_content">
            회사가 운영하는 서비스 이용에 필수로 필요한 항목과 회원의 선택에
            따라 수집되는 항목이 있으며, 필요 개인정보의 항목은 아래와 같습니다.
          </p>
          <ul>
            <li className="terms_content">
              <strong>(필수) </strong> 성명, 휴대폰 번호, 생년월일, 이메일 주소,
              사용 통신사명, 닉네임, 접속기기정보(ADID 및 IDFA 포함), 접속기기의
              IP Address
            </li>
            <li className="terms_content">
              <strong>(선택) </strong> 정보 주체가 결정하여 입력하는 기타 프로필
              작성과 서비스 이용을 위한 정보: 거주지역, 나이, 관심사, 나에 대한
              가치관, 학력 및 직업관련 사항, 프로필 사진, 주소록 정보, 에그쉘
              서비스를 이용하기 위해 이용자가 직접 입력하는 기타 정보 등
            </li>
          </ul>
          <p className="terms_content">
            또한, 서비스의 안정성 확보, 안전한 서비스 제공, 법률 및 서비스
            이용약관 위반 행위 제한 등의 목적으로 서비스를 이용하는 과정에서
            정보가 자동으로 생성 또는 수집될 수 있습니다.
          </p>
          <ul>
            <li className="terms_content">
              서비스 이용기록, 접속 로그, 거래기록, IP 정보, 쿠키, 불량 및 부정
              이용기록, 모바일 기기정보 (모델명, 이동통신사 정보, OS정보,
              화면사이즈, 언어 및 국가정보, 광고 ID, 디바이스 식별정보 등)
            </li>
            <li className="terms_content">
              서비스 및 서비스 어플리케이션에 대한 불법/부정 접근 행위 및 관련
              기록, 서비스 어플리케이션에 대한 접근 시도 기록, 서비스 및 서비스
              어플리케이션의 안전한 동작 환경 확인에 필요한 정보
            </li>
            <li className="terms_content">
              유선 또는 온라인 상담 서비스시 상담 내역 (서비스 이용 내역,
              통화내용 등){' '}
            </li>
          </ul>
        </div>
        <div className="terms__content-wrapper">
          <p className="terms__subheading terms__content-heading">
            제3조 개인정보의 수집 방법{' '}
          </p>
          <p className="terms_content">
            회사는 개인정보를 수집하는 경우에는 반드시 사전에 이용자에게 해당
            사실을 알리고 동의를 구하고 있으며, 아래와 같은 방법을 통해
            개인정보를 수집합니다.
          </p>
          <ol>
            <li className="terms_content">
              회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해
              동의를 하고 직접 정보를 입력ㆍ수정하는 경우
            </li>
            <li className="terms_content">
              제휴 서비스 또는 단체 등으로부터 개인정보를 제공받는 경우
            </li>
            <li className="terms_content">
              고객센터를 통한 상담 과정에서 웹페이지, 메일, 팩스, 전화 등을 통한
              이용자의 개인정보 수집
            </li>
            <li className="terms_content">
              온ㆍ오프라인에서 진행되는 이벤트ㆍ행사 등 참여
            </li>
            <li>협력 회사로부터 공동제휴 및 협력을 통한 정보 수집</li>
            <li>생성정보 수집 툴을 통한 정보 수집</li>
          </ol>
        </div>
        <div className="terms__content-wrapper">
          <p className="terms__subheading terms__content-heading">
            제4조 개인정보의 보유기간 및 파기{' '}
          </p>
          <p className="terms_content">
            회사는 회원자격을 유지하고 있는 동안 수집된 회원의 개인정보를
            보유ㆍ이용할 수 있으며, 회원이 탈퇴하거나 자격을 상실할 경우에는
            회원의 별도 요청이 없더라도 수집된 회원정보를 삭제 및 파기합니다.
            단, 이용자에게 개인정보 보관기간에 대해 별도의 동의를 얻은 경우 또는
            법령에서 일정 기간 정보보관 의무를 부과하는 경우에는 해당 기간 동안
            개인정보를 안전하게 보관합니다.
          </p>
          <ul className="privacy_ul">
            <li className="terms_content">
              <strong>
                1. 개인정보 보관기간에 대해 회원가입 시 또는 서비스 가입 시
                동의를 얻은 경우
              </strong>
            </li>
            <ul>
              <li className="terms_content">
                (1) 회사 내부 정책에 의한 경우: 탈퇴 이후 재가입 대응, 불량
                이용자의 재가입 방지, 부정이용방지, 기타 민원 및 질의응답 대응
              </li>
              <ul>
                <li className="terms_content">보유기간: </li>
                <ul className="privacy_ul">
                  <li className="terms_content">
                    - 회원 탈퇴 이후 재가입시 중복오픈을 방지하기 위한 대응의
                    경우: 회원 탈퇴 후 1년 간
                  </li>
                  <li className="terms_content">
                    - 불량 이용자의 재가입 방지를 위한 경우: 불량 이용자 탈퇴 후
                    3년 간
                  </li>
                  <li className="terms_content">
                    - 부정이용 및 이용규정 위반 대응을 위한 경우: 해당 부정 이용
                    및 이용규정 위반 대응 사항에 관한 분쟁 해결 시까지{' '}
                  </li>
                  <li className="terms_content">
                    - 민원 또는 서비스 질의응답에 대한 경우: 해당 민원 또는
                    질의응답 해결 시까지
                  </li>
                </ul>
                <li className="terms_content">
                  보유 정보: 이메일 주소, 닉네임, 휴대전화번호, 실명, 중복가입
                  및 부정가입 방지 목적을 위한 식별정보 (프로필 사진, 계정정보,
                  기기정보 등), 중복가입 확인 정보, 가입일, 탈퇴일, 승인일, 해당
                  민원 또는 질의응답내용, 부정/위반 이용 행위 내용 기록
                </li>
              </ul>
              <li className="terms_content">
                (2) 회원이 직접 개인정보의 보존을 요청한 경우 또는 회사가
                개별적으로 회원의 동의를 얻은 경우
              </li>
              <table>
                <thead>
                  <tr>
                    <th className="terms_content">보존항목</th>
                    <th className="terms_content">근거</th>
                    <th className="terms_content">보존기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="terms_content privacy_td">
                      계약 또는 청약철회 등에 관한 기록
                    </td>
                    <td className="terms_content privacy_td" rowSpan="3">
                      전자상거래등에서의
                      <br />
                      소비자 보호에 관한 법률
                    </td>
                    <td className="terms_content privacy_td">5년</td>
                  </tr>
                  <tr>
                    <td className="terms_content privacy_td">
                      대금결제 및 재화 등의 공급에 관한 기록
                    </td>
                    <td className="terms_content privacy_td">5년</td>
                  </tr>
                  <tr>
                    <td className="terms_content privacy_td">
                      소비자의 불만 또는 분쟁처리에 관한 기록
                    </td>
                    <td className="terms_content privacy_td">3년 </td>
                  </tr>
                  <tr>
                    <td className="terms_content privacy_td">
                      표시/광고에 관한 기록
                    </td>
                    <td className="terms_content privacy_td" />
                    <td className="terms_content privacy_td">6개월</td>
                  </tr>
                  <tr>
                    <td className="terms_content privacy_td">
                      세법이 규정하는 모든 거래에 관한 장부 및 증빙서류
                    </td>
                    <td className="terms_content privacy_td">국세기본법</td>
                    <td className="terms_content privacy_td">5년 </td>
                  </tr>
                  <tr>
                    <td className="terms_content privacy_td">
                      전자금융 거래에 관한 기록
                    </td>
                    <td className="terms_content privacy_td">전자금융거래법</td>
                    <td className="terms_content privacy_td">5년</td>
                  </tr>
                  <tr>
                    <td className="terms_content privacy_td">
                      서비스 방문 기록
                    </td>
                    <td className="terms_content privacy_td">통신비밀보호법</td>
                    <td className="terms_content privacy_td">3개월 </td>
                  </tr>
                </tbody>
              </table>
              <p className="terms_content">
                회사는 회원탈퇴, 서비스 종료, 이용자에게 동의 받은 개인정보
                보유기간의 도래와 같이 개인정보의 수집 및 이용목적이 달성된
                개인정보는 재생이 불가능한 방법으로 파기하고 있습니다. 법령에서
                보존의무를 부과한 정보에 대해서도 해당 기간 경과 후 지체없이
                재생이 불가능한 방법으로 파기합니다. 또한, ‘개인정보
                유효기간제’에 따라 1년간 서비스를 이용하지 않은 회원의
                개인정보를 별도로 분리 보관하여 관리하고 있습니다.
              </p>
            </ul>
          </ul>
        </div>
        <div className="terms__content-wrapper">
          <p className="terms__subheading terms__content-heading">
            제5조 개인정보의 제공 및 위탁{' '}
          </p>
          <p className="terms_content">
            회사는 이용자의 별도 동의가 있는 경우나 법령에 규정된 경우를
            제외하고는 이용자의 개인정보를 제3자에게 제공하지 않습니다. <br />
            또한, 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
            처리업무를 위탁하고 있습니다.
          </p>
          <table>
            <thead>
              <tr>
                <th className="terms_content privacy__table-width">수탁업체</th>
                <th className="terms_content privacy__table-width">
                  위탁업무 내용
                </th>
                <th className="terms_content privacy__table-width">
                  개인정보의 보유 및 이용기간
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="terms_content privacy_td privacy__table-width">
                  Amazon.com, Inc (Amazon Web Service)
                </td>
                <td className="terms_content privacy_td privacy__table-width">
                  안정적인 서버 및 서비스 운영, 데이터베이스 및 각종 정보 등의
                  스토리지 저장 등
                </td>
                <td className="terms_content privacy_td privacy__table-width">
                  [회원 탈퇴시 혹은 위탁 계약 종료시까지]
                </td>
              </tr>
              <tr>
                <td className="terms_content privacy_td privacy__table-width">
                  SMS 서버호스팅 (예정)
                </td>
                <td className="terms_content privacy_td privacy__table-width">
                  안정적인 회원 관리 목적 등의 SMS 발송을 위한 SMS호스팅 서비스
                  운영
                </td>
                <td className="terms_content privacy_td privacy__table-width" />
              </tr>
              <tr>
                <td className="terms_content privacy_td privacy__table-width">
                  본인인증 서비스 (예정)
                </td>
                <td className="terms_content privacy_td privacy__table-width">
                  휴대전화를 통한 가입 시 및 ID찾기 시 본인인증{' '}
                </td>
                <td className="terms_content privacy_td privacy__table-width" />
              </tr>
            </tbody>
          </table>
        </div>
        <div className="terms__content-wrapper">
          <p className="terms__subheading terms__content-heading">
            제6조 정보주체와 법정대리인의 권리ㆍ의무 및 행사방법
          </p>
          <p className="terms_content">
            정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련
            권리를 행사할 수 있습니다.
          </p>
          <ul className="privacy_ul">
            <li className="terms_content">1. 개인정보 열람요구</li>
            <li className="terms_content">2. 오류 등이 있을 경우 정정 요구</li>
            <li className="terms_content">3. 삭제요구 </li>
            <li className="terms_content">4. 처리정지 요구 </li>
          </ul>
          <p className="terms_content">
            위 권리 행사는 회사에 대해 서면, 전화, 전자우편 등을 통하여 할 수
            있으며 회사는 이에 대해 지체없이 조치하겠습니다. 이용자가 개인정보의
            오류에 대한 정정을 요청한 경우, 정정을 완료하기 전까지 해당
            개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된 개인정보를
            제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게 지체 없이
            통지하여 정정이 이루어지도록 하겠습니다.
          </p>
          <p className="terms_content">
            위 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을
            통하여 하실 수 있습니다.
          </p>
          <p className="terms_content">
            이용자는 PC방 등 외부 장소 및 공용 와이파이 등을 통해 회사의
            서비스를 이용할 경우 해킹 프로그램 기타 유해 프로그램이 없는지
            유의해야 합니다. 회사는 개인정보보호에 최선을 다하지만 이용자의
            귀책이나 기타 제3자의 귀책으로 발생한 문제에 대해서는 책임을 지지
            않습니다.
          </p>
        </div>
        <div className="terms__content-wrapper">
          <p className="terms__subheading terms__content-heading">
            제7조 개인정보의 안전성 확보조치
          </p>
          <p className="terms_content">
            회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
            있습니다.
          </p>
          <ul className="privacy_ul">
            <li className="terms_content">
              1. 관리적 조치 : 정기적 직원 교육 등{' '}
            </li>
            <li className="terms_content">
              2. 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리,
              백신소프트웨어 등 보안프로그램 설치, 개인정보가 저장된 파일의
              암호화 등
            </li>
            <li className="terms_content">
              3. 물리적 조치 : 개인정보가 저장ㆍ보관된 장소의 시건, 출입통제 등
            </li>
          </ul>
          <p className="terms_content">
            회사는 회사가 인지하지 못하고 있는 이용자의 개인정보 이용 및 기타의
            불만사항에 관하여 불만처리를 전담하는 관리자를 배정하여 지속적이고,
            신속하게 이용자의 불만사항을 처리하고, 처리한 결과에 대하여 즉시
            응대합니다.
          </p>
        </div>
        <div className="terms__content-wrapper">
          <p className="terms__subheading terms__content-heading">
            제8조 개인정보 자동 수집 장치의 설치∙운영 및 거부에 관한 사항{' '}
          </p>
          <p className="terms_content">
            회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를
            저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.
          </p>
          <p className="terms_content">
            쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터
            브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의
            하드디스크에 저장되기도 합니다.
          </p>
          <ul className="privacy_ul">
            <li className="terms_content">
              1. 쿠키의 사용목적: 이용자가 방문한 각 서비스와 웹 사이트들에 대한
              방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여
              이용자에게 최적화된 정보 제공을 위해 사용됩니다.
            </li>
            <li className="terms_content">
              2. 쿠키의 설치∙운영 및 거부 : 웹브라우저 상단의 도구 인터넷 옵션
              개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.
            </li>
            <li className="terms_content">
              3. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수
              있습니다.
            </li>
          </ul>
          <p className="terms_content">
            회사는 회사가 인지하지 못하고 있는 이용자의 개인정보 이용 및 기타의
            불만사항에 관하여 불만처리를 전담하는 관리자를 배정하여 지속적이고,
            신속하게 이용자의 불만사항을 처리하고, 처리한 결과에 대하여 즉시
            응대합니다.
          </p>
        </div>
        <div className="terms__content-wrapper">
          <p className="terms__subheading terms__content-heading">
            제9조 개인정보 보호책임자
          </p>
          <p className="terms_content">
            회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
            처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
            같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <ul>
            <li className="terms_content">성명 : 이재일</li>
            <li className="terms_content">직책 : 대표자</li>
            <li className="terms_content">연락처 : support@globaloutliers.com</li>
          </ul>
          <p className="terms_content">
            기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에
            문의하시기 바랍니다.
          </p>
          <div className="privacy_web">
            <p className="terms_content">
              - 개인정보침해신고센터 <strong>(www.118.or.kr / 118)</strong>
            </p>
            <p className="terms_content">
              - 정보보호마크인증위원회{' '}
              <strong>(www.eprivacy.or.kr / 02-580-0533~4)</strong>
            </p>
            <p className="terms_content">
              - 대검찰청 첨단범죄수사과{' '}
              <strong>(www.spo.go.kr / 02-3480-2000)</strong>
            </p>
            <p className="terms_content">
              - 경찰청 사이버테러대응센터{' '}
              <strong>(www.ctrc.go.kr / 02-392-0330)</strong>
            </p>
          </div>
          <div className="terms__content-wrapper">
            <p className="terms__subheading terms__content-heading">
              제10조 개인정보처리방침 변경{' '}
            </p>
            <p className="terms_content">
              이 개인정보 처리방침은 2019년 [*]월 [*]일부터 적용됩니다.
            </p>
            <p className="terms_content">
              이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Privacy;
