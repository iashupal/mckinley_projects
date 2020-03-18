import React, { Fragment, useState, useEffect } from "react";
import { View, StyleSheet, WebView, ActivityIndicator, BackHandler } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import config from "@src/config";
// Import components
import TopBarHeader from "@components/TopBarHeader";

export default function PersonalInformationDoc(props) {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  })
  return (
    <Fragment>
      {/* Include isProfile to match center alignment */}
      <TopBarHeader sectionTitle="개인정보국외이전에" action={"back"} isProfile />
      {loader ? (
        <View
          pointerEvents={"auto"}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : null}
      <ScrollView style={styles.scrollView}>
        <WebView
          useWebKit={true}
          // conatiner
          javaScriptEnabled={true}
          domStorageEnabled={true}
          originWhitelist={["*"]}
          startInLoadingState={true}
          style={{ flex: 1, width: "100%", height: 2540 }}
          source={{
            html: `<html><head>
	<meta http-equiv="CONTENT-TYPE" content="text/html; charset=utf-8">
	<title></title>
	<style type="text/css">
	<!--
		@page { margin-left: 1in; margin-right: 1in; margin-top: 1.18in; margin-bottom: 1in }
		P { margin-bottom: 0.08in; direction: ltr; widows: 0; orphans: 0 }
		A:link { color: #0563c1; so-language: zxx }
	-->
	</style>
</head>
<body lang="en-US" link="#0563c1" dir="LTR" style="padding: 50">
<div>
<h1 style="text-align: center;"><strong>개인정보 국외이전에 관한 동의</strong></h1>
<p>주식회사 아웃라이어스(이하 &ldquo;회사&rdquo;라 합니다)는 아래와 같이 국외 제3자에게 개인정보를 제공하고 있으며 사용자가 거주하는 국가 이외의 지역에 있는 서버에서 이용자의 개인정보를 처리할 수 있습니다.<br /><br /></p>
<p><strong>개인정보를 이전 받는 자 </strong></p>
<ul>
<li>Global Outliers LLC<br /><br /></li>
</ul>
<p><strong>개인정보를 이전받는 자의 개인정보 이용 목적 </strong></p>
<p>회사는 하기의 목적을 위하여 개인정보를 국외 이전하고 있으며, 이전 업체가 개인정보보호 관계 법령을 위반하지 않도록 관리ㆍ감독하고 있습니다.</p>
<ul>
<li>국외 회원들과 회사의 회원들 간 공동 서비스 이용 및 네트워킹<br /><br /></li>
<li>이벤트 및 기타 서비스 제공, 이메일 마케팅 활동<br /><br /></li>
<li>고객 문의 대응 등<br /><br /></li>
</ul>
<p><strong>이전되는 개인정보 항목 </strong></p>
<ol>
<li>일반회원</li>
</ol>
<ul>
<li>(필수)성명,휴대폰 번호,생년월일,이메일 주소,사용 통신사명,닉네임,접속기기정보(ADID 및 IDFA 포함), 접속기기의 IP Address<br /><br /></li>
<li>(선택)정보 주체가 결정하여 입력하는 기타 프로필 작성과 서비스 이용을 위한 정보: 소속 학교 또는 직장,졸업 학교,거주지역,나이, 체형,키,종교,관심사,흡연유무,운동빈도,이상형 정보,인종,결혼에 대한 가치관,학력 및 직업관련 사항,재산 관련 사항,사진,지인 매칭 회피를 위한 주소록 정보,아웃라이어스 서비스를 이용하기위해 이용자가 직접 입력하는 기타 정보 등</li>
</ul>
<p style="padding-left: 30px;">&nbsp;</p>
<ol>
<li style="list-style-type: none;"></li>
<li>블랙회원</li>
</ol>
<ul>
<li>(필수)성명,휴대폰 번호,생년월일,이메일 주소,사용 통신사명,닉네임,접속기기정보(ADID 및 IDFA 포함), 접속기기의 IP Address, 재산 수준 증명 관련 정보<br /><br /></li>
<li>(선택)정보 주체가 결정하여 입력하는 기타 프로필 작성과 서비스 이용을 위한 정보: 소속 학교 또는 직장,졸업 학교,거주지역,나이, 체형,키,종교,관심사,흡연유무,운동빈도,이상형 정보,인종,결혼에 대한 가치관,학력 및 직업관련 사항,재산 관련 사항,사진,지인 매칭 회피를 위한 주소록 정보,아웃라이어스 서비스를 이용하기위해 이용자가 직접 입력하는 기타 정보 등</li>
</ul>
<p>&nbsp;</p>
<p><strong>개인정보가 이전되는 국가, 이전 일시 및 이전 방법 </strong></p>
<ul>
<li>이전되는 국가: 미국<br /><br /></li>
<li>이전 일시 및 이전 방법: 회사의 애플리케이션을 통한 서비스 이용 시점에 네트워크를 통한 전송</li>
</ul>
<p>&nbsp;</p>
</div>
<div>
<div>
<p><strong>개인정보를 이전 받는 자의 개인정보 보유ㆍ이용기간</strong></p>
<p>개인정보 수집 및 이용에 관한 동의 후 회원 탈퇴 시까지 개인정보를 보유하고 이후 해당 정보를 지체 없이 파기합니다. 단, 법률에 의해 보존의무가 있는 경우에는 법령이 지정한 일정기간 동안 보존하며, &lt;개인정보처리방침&gt;상 회사 내부 정책에 의하여 보유 정보가 연장되는 경우 그에 따릅니다.</p>
<p>※ 자세한 내용은 회사의 &lt;개인정보처리방침&gt;을 참조하시기 바랍니다.</p>
<p>&nbsp;</p>
<p><strong>동의를 거부할 권리 및 동의 거부에 따른 불이익 </strong></p>
<p>이용자는 정보 수집을 거부할 권리가 있습니다. 단, 동의를 거부할 경우 서비스가 제한될 수 있습니다.</p>
</div>
</div>
<p>&nbsp;</p>
</body></html>`
          }}
        // style={{ marginTop: 20 }}
        />
      </ScrollView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.white
  },
  centerHeaderTitle: {
    textAlign: "center",
    fontWeight: "bold"
  },
  scrollView: {
    flex: 1
  },
  textContainer: {
    flex: 1,
    backgroundColor: config.white_grey
  }
});
