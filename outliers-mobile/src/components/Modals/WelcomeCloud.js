// 01.play_01.outliers_stop_pop
import React, { Component } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
// import { withNamespaces } from "react-i18next";
import config from "@src/config";
import Modal from "@components/CustomModal";
import IconInput from "@components/IconInput";

import imgStopMoment from "@assets/images/imgStopMoment.png";

const { width } = Dimensions.get("window");
function WelcomeCloud(props) {
  const { t } = props;
  return (
    <View style={styles.container}>
      <Modal buttonText1={t("common:cloudPopup.confirm")}>
        <View style={styles.innerModalContainer}>
          <Image style={styles.headerImage} source={imgStopMoment} />
          <Text style={styles.boldTextHeader}>{t("common:cloudPopup.welcome")}</Text>
          <Text style={styles.infoText1}>
            {/* 일주일 이상 로그인하지 않아 임시휴면 상태가{"\n"}
            적용되었습니다. 오늘의 매칭에 참여하기 위해서는{"\n"}
            로그인 후 일정 시간이 소요될 수 있습니다.{"\n"} */}
            {t("common:cloudPopup.appliedText1")} {"\n"}
            {t("common:cloudPopup.appliedText2")}
            {"\n"}
            {t("common:cloudPopup.appliedText3")}
          </Text>
        </View>
      </Modal>
    </View>
  );
}
export default WelcomeCloud;
// export default withNamespaces(["common"], { wait: true })(WelcomeCloud);

const styles = StyleSheet.create({
  noteText: {
    marginTop: 5,
    fontFamily: config.regularFont,
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 17,
    letterSpacing: 0,
    color: config.pointRed
  },
  textInputStyle: {
    textAlignVertical: "top",
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    flexWrap: "wrap",
    lineHeight: 18,
    letterSpacing: 0,
    color: config.hintText
  },
  textInputContainer: {
    width: width * 0.7,
    height: 90,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderWidth: 1,
    backgroundColor: config.white,
    borderColor: config.whiteTwo
  },
  infoText1: {
    width,
    fontFamily: config.regularFont,
    fontSize: 13,
    fontWeight: "normal",
    lineHeight: 20,
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: config.black
  },
  boldTextHeader: {
    fontFamily: config.regularFont,
    fontStyle: "normal",
    marginBottom: 4,
    letterSpacing: 0,
    textAlign: "center",
    color: config.black,
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 22
  },
  headerImage: {
    width: 175,
    aspectRatio: 2 / 1,
    marginBottom: 10,
    resizeMode: "contain"
  },
  innerModalContainer: {
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
