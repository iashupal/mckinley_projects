import React, { Fragment, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Button,
  BackHandler
} from "react-native";

import TopBarHeader from "@components/TopBarHeader";
import config from "@src/config";

//Import Components
import ActionButton from "@components/ActionButton";
import CheckBox from "@components/CheckBox";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");

function EventPayScreen(props) {
  eventDetail = () => { };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
  })
  return (
    <Fragment>
      <TopBarHeader sectionTitle="결제" action="close" />
      <ScrollView style={styles.container}>
        <View style={styles.eventPayProductInfo}>
          <View style={styles.eventPayProductInfoLhs}>
            <Text style={styles.eventPayProductInfoLhsHeading}>
              선택한 이벤트
            </Text>
            <Text style={styles.eventPayProductInfoLhsPname}>
              Fine dining by a private chef; Ibérico
            </Text>
            <Text style={styles.eventPayProductInfoLhsTime}>
              10월 06일 (일) 오후 06:30
            </Text>
          </View>
          <View style={styles.eventPayProductInfoRhs}>
            <Image
              source={require("../assets/images/pro-food.jpg")}
              alt="Product Image"
              style={styles.productImage}
            />
          </View>
        </View>

        <View style={styles.eventPayProductAmount}>
          <Text style={styles.label}>상품 금액</Text>
          <Text style={styles.value}>195,000원</Text>
        </View>
        <View style={styles.eventPayProductNoOfPeople}>
          <View style={styles.eventPayProductNoOfPeopleLhs}>
            <Text style={styles.label}>인원수 선택</Text>
            <Text style={styles.value}>2명 결제시 10% 할인</Text>
          </View>
          <View style={styles.eventPayProductNoOfPeopleRhs}>
            <Text style={styles.addRemoveValue}>1명</Text>
            <TouchableOpacity style={styles.addRemoveButton}>
              <Image
                source={require("../assets/images/ic_down.png")}
                alt="Arrow Down"
                style={styles.xsIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addRemoveButton}>
              <Image
                source={require("../assets/images/ic_up.png")}
                alt="Arrow Down"
                style={styles.xsIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.eventPayProductDiscount}>
          <Text style={styles.label}>
            할인 <Text style={styles.labelRed}>(오프닝할인)</Text>
          </Text>

          <Text style={styles.discountValue}>-90,000원</Text>
        </View>
        <View style={styles.eventPayProductTotal}>
          <Text style={styles.value}>결제금액</Text>
          <Text style={styles.totalValue}>105,000원</Text>
        </View>

        <View style={styles.eventPayTerms}>
          <CheckBox />
          <Text style={styles.termsLink}>
            개인정보 제3자 제공 동의, 결제대행 서비스 이용약관
          </Text>
          <Text style={styles.termsLabel}>등 모든 약관에 동의 합니다.</Text>
        </View>
      </ScrollView>
      <ActionButton
        customStyle={{
          touchableStyle: styles.buttonStyle
        }}
        // onPress1={() => toggleRegisterModal (true)}
        text="결제하기"
      />
    </Fragment>
  );
}
const styles = StyleSheet.create({
  buttonStyle: {
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 0
  },
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
  eventPayProductInfo: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 24,
    paddingBottom: 24
  },
  eventPayProductInfoLhs: {
    flex: 1
  },
  eventPayProductInfoLhsHeading: {
    fontSize: 13,
    color: "#888888",
    lineHeight: 18
  },
  eventPayProductInfoLhsPname: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#222222",
    lineHeight: 20,
    paddingTop: 6,
    paddingBottom: 18
  },
  eventPayProductInfoLhsTime: {
    color: "#222222",
    fontSize: 13,
    lineHeight: 18
  },
  eventPayProductInfoRhs: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    textAlign: "right"
  },
  productImage: {
    width: 140,
    height: 110
  },
  eventPayProductAmount: {
    borderColor: "#dddddd",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  eventPayProductNoOfPeople: {
    borderColor: "#dddddd",
    borderBottomWidth: 1,
    paddingVertical: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  eventPayProductNoOfPeopleLhs: {
    flex: 1
  },
  eventPayProductNoOfPeopleRhs: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  eventPayProductDiscount: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 21
  },
  eventPayProductTotal: {
    backgroundColor: "#fffbdf",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 21,
    paddingHorizontal: 10
  },
  eventPayTerms: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 15
  },
  termsLink: {
    color: "#444444",
    textDecorationLine: "underline",
    paddingLeft: 10,
    paddingTop: 4
  },
  label: {
    color: "#888888",
    fontSize: 13,
    lineHeight: 18
  },
  labelRed: {
    color: "#fd4a5a",
    fontSize: 13,
    lineHeight: 18
  },
  termsLabel: {
    color: "#888888",
    fontSize: 13,
    lineHeight: 18,
    paddingVertical: 8
  },
  value: {
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 18
  },
  addRemoveValue: {
    backgroundColor: "#fafafa",
    color: "#222222",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: 50,
    height: 36,
    textAlign: "center"
  },
  addRemoveButton: {
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 2,
    paddingHorizontal: 18,
    paddingVertical: 14,
    width: 46,
    height: 36,
    textAlign: "center",
    marginLeft: 6
  },
  discountValue: {
    color: "#fd4a5a",
    fontSize: 13,
    fontWeight: "bold",
    lineHeight: 18
  },
  totalValue: {
    color: "#5ba1ff",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 18
  },
  xsIcon: {
    width: 8,
    height: 4
  }

  //   aboutUserContainer: {
  //     padding: 2,
  //     paddingHorizontal: 5,
  //     // aspectRatio: 2.2,
  //     borderRadius: 13,
  //     backgroundColor: "rgba(0, 0, 0, 0.0)",
  //     borderStyle: "solid",
  //     borderWidth: 1,
  //     alignSelf: "flex-start",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     borderColor: config.aqua_marine
  //   }
});

export default EventPayScreen;
