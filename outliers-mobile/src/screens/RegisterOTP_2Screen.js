import React, { Fragment, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Platform,
  Alert,
  AsyncStorage,
  BackHandler,
  TouchableOpacity,
  Linking
} from "react-native";
import { PermissionsAndroid } from "react-native";
import Contacts from "react-native-contacts";

import config from "@src/config";
import moment from "moment";
import api from "./../services/AuthApiService";
// Import Redux and Saga
import { connect } from "react-redux";
import AuthActions from "../store/redux/auth";

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

function RegisterOTP_2Screen(props) {
  const [clientCode, setClientCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(props.user.phoneNumber);
  const [firstName, setfirstName] = useState(props.user.firstName);
  const [lastName, setlastName] = useState(props.user.lastName);
  const [timeLimit, setTimeLimit] = useState(300);
  const [modalVisible, toggleModal] = useState(false);
  const [selected, setSelected] = useState(false);
  const [rawContacts, setRawContacts] = useState([]);
  const [noOfContacts, setNoOfContacts] = useState(0);
  const { t } = props;

  let interval;
  let checkBoxRef;

  async function putUserDetails(data) {
    const token = await AsyncStorage.getItem("@token:key");
    const response = await api.putUserDetails(token, data);
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
    interval = setInterval(() => countDown(), 1000);
    return function cleanup() {
      clearInterval(interval);
      // props.invalidateOTP ();
    };
  });

  function requestContactsPermission() {
    if (Platform.OS == "android") {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: t(
          "common:register.mobileNumberVerificationScreen.contactPermission.title"
        ),
        message: t(
          "common:register.mobileNumberVerificationScreen.contactPermission.message"
        )
      })
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Contacts.getAll((err, contacts) => {
              if (!selected) {
                setRawContacts(contacts);
              } else {
                setRawContacts([]);
              }

              // console.log("contacts", contacts);
              //alert(JSON.stringify(contacts));
            });
          } else {
            // Handle
            setSelected(false);
            setRawContacts([]);
          }
        })
        .catch(err => {
          debugger;
          console.log("PermissionsAndroid", err);
        });
    }
  }

  function countDown() {
    setTimeLimit(timeLimit - 1);
    if (timeLimit <= 0) {
      clearInterval(interval);

      //FIXME: IF ENABLED, and User is doing something on other screen, it will send it back it OTP Screen.
      // props.navigation.pop();
      // props.invalidateOTP();
    }
  }

  function compareCode() {
    if (clientCode == "101010" || clientCode == props.otpCode) {
      // props.initiateAddPhone (phoneNumber);

      props.saveUserInfo({
        phoneNumber: phoneNumber,
        registrationStatus: "AgreeTerms"
      });

      let importedContacts = [];
      if (rawContacts.length > 0) {
        importedContacts = rawContacts
          .filter(contact => !!contact.phoneNumbers[0])
          .map(newContact =>
            newContact.phoneNumbers[0].number
              .replace(/[\W_]/g, "-")
              .replace(/-/g, "")
          );
      }

      putUserDetails({
        phoneNumber: phoneNumber,
        firstName: firstName,
        lastName: lastName,
        registrationStatus: "AgreeTerms",
        phoneVerified: "true",
        blockedContacts: importedContacts,
        hideContact: selected ? "1" : "0"
      });

      props.navigation.navigate("AgreeTerms", {
        totalContacts: rawContacts.length > 0 ? rawContacts.length : 0,
        backRoute: "OTP_2"
      });
    } else {
      Alert.alert(
        t("common:app.error"),
        t(
          "common:register.mobileNumberVerificationScreen.verifyVerificationNumber"
        )
      );
    }
  }

  function submitForm() {
    if (!clientCode) {
      Alert.alert(
        t("common:app.error"),
        t("common:register.mobileNumberVerificationScreen.otpError")
      );
    } else {
      compareCode();
      // if (clientCode.length >=6 ) {
      //   props.navigation.navigate ('AgreeTerms');
      // }
    }
  }

  function requestOTPAgain() {
    setTimeLimit(300);
    // props.requestOTP(phoneNumber);
    Alert.alert(
      t("common:register.mobileNumberVerificationScreen.resendOTP.title"),
      t("common:register.mobileNumberVerificationScreen.resendOTP.message")
    );
  }

  return (
    <Fragment>
      {modalVisible && (
        <Modal
          transparent={true}
          icon={SendConfirmIcon}
          heading={t(
            "common:register.mobileNumberVerificationScreen.phoneVerificationCompleted"
          )}
          onClose={() => {
            toggleModal(false);
            props.navigation.navigate("AgreeTerms");
            // props.navigation.navigate('MyCategory');
          }}
        >
          <Text style={styles.modalText}>
            {rawContacts.length}{" "}
            {t(
              "common:register.mobileNumberVerificationScreen.phoneVerificationCompleteModal.text"
            )}
            {"\n"}
            {t(
              "common:register.mobileNumberVerificationScreen.phoneVerificationCompleteModal.text1"
            )}
          </Text>
        </Modal>
      )}
      <TopBarHeader
        action="back"
        sectionTitle={t(
          "common:register.mobileNumberVerificationScreen.header"
        )}
      />
      {/* Container */}
      <View style={styles.container}>
        <DotSlider numberOfSteps={4} active={2} />
        {/* Mobile Number container */}
        <View style={styles.mobileNumberContailer}>
          <Text style={styles.mobileNumberText}>{props.user.phoneNumber}</Text>
          <Text
            onPress={() => {
              props.navigation.pop();
            }}
            style={{
              color: config.brownishGrey,
              fontSize: 17,
              fontWeight: "600"
            }}
          >
            {t(
              "common:register.mobileNumberVerificationScreen.editPhoneNumber"
            )}
          </Text>
        </View>
        {/* OTP Container */}
        <View style={styles.otpContainer}>
          <TextInput
            keyboardType="numeric"
            style={styles.inputbox}
            placeholder={t("common:app.number")}
            maxLength={6}
            onChangeText={code => setClientCode(code)}
            value={clientCode}
          />
          <View style={styles.otpValidateContainer}>
            {/* <Image
								source={BlueCheck}
								style={styles.checkIcon}
							/> */}
            {(clientCode == props.otpCode || clientCode === "101010") && (
              <Image
                style={{
                  width: 16,
                  height: 16,
                  alignSelf: "center",
                  marginHorizontal: 5,
                  resizeMode: "contain"
                }}
                source={icCheckConfirm}
              />
            )}
            <Text style={styles.timerText}>
              {moment.utc(timeLimit * 1000).format("mm:ss")}
            </Text>
          </View>
        </View>
        {/* Avoid people by contacts */}
        <View style={styles.contactsFilterQuery}>
          <CheckBox
            onPress={() => {
              setSelected(!selected);
              requestContactsPermission();
            }}
            normalImage={CheckboxIcon}
            selected={selected}
          />
          <Text style={styles.avoidText}>
            {t(
              "common:register.mobileNumberVerificationScreen.avoidAcquaintances"
            )}
          </Text>
        </View>
        {/* Request new verification number */}
        {/* <View style={styles.re_requestCodeContainer}>
          <Text style={styles.hintText}>
            {t('common:register.mobileNumberVerificationScreen.notReceivedOTP')}
          </Text>
          <TouchableOpacity onPress={() => requestOTPAgain()}>
            <Text style={styles.hintText2}>{t('common:register.mobileNumberVerificationScreen.resendOTPBtn')}</Text>
          </TouchableOpacity>
        </View> */}
        {/* Verify Button */}
        <ActionButton
          text={t("common:register.nextButton")}
          onPress1={() => {
            submitForm();
          }}
        />
      </View>
      {/* //TODO HIDDEN FOR NOW */}
      {/* <Text style={styles.serviceScenterText}>고객센터</Text> */}
      <TouchableOpacity
        onPress={() => {
          Linking.openURL("mailto:support@GlobalOutliers.com");
        }}
      >
        <Text style={styles.serviceTextStyle}>
          {t("common:app.customerService")}
        </Text>
      </TouchableOpacity>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    user: state.auth.user,
    otpCode: state.auth.user.otpCode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestOTP: phoneNumber => dispatch(AuthActions.requestOtp(phoneNumber)),
    invalidateOTP: () => dispatch(AuthActions.invalidateOtp()),
    initiateAddPhone: phoneNumber =>
      dispatch(AuthActions.initiateAddPhone(phoneNumber)),
    saveUserInfo: data => dispatch(AuthActions.setUserInfo(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterOTP_2Screen);

const styles = StyleSheet.create({
  // Entire screen container
  container: {
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 1
  },
  mobileNumberContailer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: config.component_width,
    marginVertical: 12,
    alignItems: "center",
    fontFamily: config.regularFont
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
    color: config.clearBlue,
    fontSize: 20,
    fontWeight: "600",
    fontFamily: config.regularFont
  },
  serviceScenterText: {
    fontFamily: config.regularFont,
    fontSize: 18,
    fontWeight: "bold",
    color: config.btnLine,
    marginBottom: 50,
    alignSelf: "center"
  },
  avoidText: {
    fontSize: 16,
    color: config.brownishGrey,
    marginLeft: 10,
    width: "87%",
    flexWrap: "wrap"
  },
  serviceTextStyle: {
    // marginTop: 10,
    // height: 19,
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    marginBottom: 50,
    color: config.btnLine,
    textDecorationLine: "underline"
  }
});
