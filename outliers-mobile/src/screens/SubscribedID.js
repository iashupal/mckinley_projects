import React, { Fragment, useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, Alert, BackHandler } from "react-native";
import config from "@src/config";
import moment from "moment";

// Import Redux and Saga
import { connect } from "react-redux";

//Import components
import ActionButton from "@components/ActionButton";
import DotSlider from "@components/DotSlider";
import TopBarHeader from "@components/TopBarHeader";
import CheckBox from "@components/CheckBox";
import Modal from "@components/CustomModal";

//Import assets
import SendConfirmIcon from "@assets/images/ic_send_confirm_b.png";
import icCheckConfirm from "@assets/images/icCheckConfirm.png";
import CheckboxIcon from "@assets/images/ic_outline_checkbox.png";
import { generateOtp } from "../utils/utility";

function throwError(error) {
  switch (error) {
    case "ERRORS":
      Alert.alert("오류", "올바르지 않은 비밀번호입니다.");
      break;
    default:
      Alert.alert("오류", "적절한 세부 사항을 입력하십시오");
      break;
  }
}

function SubscribedID(props) {
  const { t } = props;
  const [clientCode, setClientCode] = useState("");
  const [emailId, setEmailId] = useState("");
  const [timeLimit, setTimeLimit] = useState(300); //In Seconds
  const [modalVisible, toggleModal] = useState(false);

  let interval;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
    var emailId = props.navigation.getParam("emailId", "");
    setEmailId(emailId);
    interval = setInterval(() => countDown(), 1000);
    return function cleanup() {
      clearInterval(interval);
    };
  });

  function countDown() {
    setTimeLimit(timeLimit - 1);
    if (timeLimit <= 0) {
      clearInterval(interval);
      props.invalidateOTP();
    }
  }

  function compareCode() {
    if (true) {
      if (clientCode == "101010" || clientCode == props.otpCode) {
        // props.initiateAddPhone (phoneNumber);
        toggleModal(true);
        // props.navigation.navigate ('AgreeTerms');
      } else {
        Alert.alert("오류", "인증번호를 확인하세요.");
      }
    } else {
      Alert.alert("오류", "인증번호를 입력하세요.");
    }
  }

  function submitForm() {
    if (!clientCode) {
      throwError();
    } else {
      compareCode();
    }
  }

  function requestOTPAgain() {
    setTimeLimit(300);
    Alert.alert("인증번호 재전송", "인증번호가 재전송 되었습니다.");
  }

  return (
    <Fragment>
      <TopBarHeader action={"back"} sectionTitle={t("common:app.findId")} />
      {/* Container */}
      <View style={styles.container}>
        {/* Mobile Number container */}
        <View style={styles.mobileNumberContailer}>
          <Text style={styles.mobileNumberText}>{t("common:app.subscribeId")}</Text>
          <Text
            style={{
              height: 44,
              fontFamily: config.regularFont,
              fontSize: 18,
              fontWeight: "bold",
              fontStyle: "normal",
              lineHeight: 22,
              letterSpacing: 0,
              color: config.black
            }}
          >
            {emailId}
          </Text>
        </View>
        <ActionButton
          customStyle={{
            touchableStyle: styles.buttonStyle
          }}
          text={t("common:app.loginId")}
          onPress1={() => {
            props.navigation.navigate("Login");
          }}
        />
      </View>
    </Fragment>
  );
}

export default SubscribedID;

const styles = StyleSheet.create({
  // Entire screen container
  buttonStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 54,
    borderRadius: 3,
    backgroundColor: config.navyBlack
  },
  container: {
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 1
  },
  mobileNumberContailer: {
    marginTop: 43,
    alignItems: "flex-start",
    width: config.component_width,
    marginVertical: 12
  },
  otpContainer: {
    backgroundColor: config.white_grey,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: config.whiteTwo,
    marginBottom: 4,
    marginTop: 12
  },
  otpValidateContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  modalText: {
    textAlign: "center",
    fontFamily: config.regularFont,
    fontSize: 14,
    color: config.black,
    lineHeight: 18
  },
  inputbox: {
    flex: 1,
    fontSize: 15,
    height: 48,
    fontWeight: "bold",
    fontFamily: config.boldFont
  },
  checkIcon: {
    width: 16,
    height: 16
  },
  timerText: {
    color: config.lightGrey,
    fontSize: 14,
    alignItems: "center",
    fontWeight: "700",
    fontFamily: config.regularFont
  },
  contactsFilterQuery: {
    flexDirection: "row",
    alignItems: "center",
    width: config.component_width,
    marginTop: 14,
    marginBottom: 20
  },
  re_requestCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: config.component_width
  },
  hintText: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: config.boldFont,
    color: config.lightGrey
  },
  hintText2: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: config.boldFont,
    color: config.lightGrey,
    textDecorationLine: "underline"
  },
  confirm: {
    fontSize: 16,
    color: config.brownishGrey,
    marginLeft: 5
  },
  mobileNumberText: {
    color: config.black,
    fontSize: 18,
    fontFamily: config.regularFont
  },
  serviceScenterText: {
    fontFamily: config.regularFont,
    fontSize: 18,
    fontWeight: "bold",
    color: config.btnLine,
    textDecorationLine: "underline",
    marginBottom: 50,
    alignSelf: "center"
  }
});
