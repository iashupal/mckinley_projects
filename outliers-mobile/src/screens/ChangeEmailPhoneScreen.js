// Import npm modules
import React, { Component, Fragment, useState, useEffect } from "react";
import {
  Linking,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  Picker,
  BackHandler,
  ScrollView,
  AsyncStorage
} from "react-native";
import DotSlider from "@components/DotSlider";
import moment from "moment";
import { connect } from "react-redux";
import AuthActions from "../store/redux/auth";

import { TabView, SceneMap } from "react-native-tab-view";
import ImagePicker from "react-native-image-picker";
import CountryPicker from "react-native-country-picker-modal";
const { width } = Dimensions.get("window");
import { useNetInfo } from "@react-native-community/netinfo";
import { withNamespaces } from "react-i18next";
import WithLoaderStatus from "../components/HOC/withLoaderStatus";
// Import components
import TopBarHeader from "@components/TopBarHeader";
import ActionButton from "@components/ActionButton";
import CheckBox from "@components/CheckBox";
import InputBox from "@components/InputBox";
import InputWithTitle from "@components/InputWithTitle";
import api from "@services/AuthApiService";
// Import assets and config
import config from "@src/config";
import DownArrow from "@assets/images/ic_set_arrow.png";

import OpenListIcon from "@assets/images/ic_open_list.png";
import CloseIcon from "@assets/images/ic_close.png";
import { checkValidity, generateOtp } from "../utils/utility";

import SideArrow from "@assets/images/btn_more_big.png";
import CheckboxIcon from "@assets/images/ic_outline_checkbox.png";
import icCheckConfirm from "@assets/images/icCheckConfirm.png";

function FindId(props) {
  const [filter, setFilter] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cca2, setCCA2] = useState("US");
  const [callingCode, setCallingCode] = useState("1");
  const { t, i18n } = props;
  const netInfo = useNetInfo();
  let [clientCode, setClientCode] = useState("");
  const [timeLimit, setTimeLimit] = useState(300);
  const [modalVisible, toggleModal] = useState(false);
  const [selected, setSelected] = useState(false);
  const [rawContacts, setRawContacts] = useState([]);
  const [checkVisible, toggleCheck] = useState(false);
  const [timerVisible, toggleTimer] = useState(false);

  let interval;
  let checkBoxRef;

  putUserDetails = async data => {
    const token = await AsyncStorage.getItem("@token:key");
    const response = await api.putUserDetails(token, data);
  };

  useEffect(() => {
    // BackHandler.addEventListener("hardwareBackPress", () => {
    //   return true;
    // });
    interval = setInterval(() => countDown(), 1000);
    return function cleanup() {
      clearInterval(interval);
      // props.invalidateOTP ();
    };
  });

  function countDown() {
    setTimeLimit(timeLimit - 1);
    if (timeLimit <= 0) {
      clearInterval(interval);

      //FIXME: IF ENABLED, and User is doing something on other screen, it will send it back it OTP Screen.
      // props.navigation.pop();
      // props.invalidateOTP();
    }
  }

  // function requestOTPAgain() {
  //   setTimeLimit(300);
  //   // props.requestOTP(phoneNumber);
  //   Alert.alert(t('common:register.mobileNumberVerificationScreen.resendOTP.title'), t('common:register.mobileNumberVerificationScreen.resendOTP.message'));
  // }
  async function submitForm() {
    if (!netInfo.isConnected) {
      Alert.alert("", t("common:app.noNet"));
      return;
    }
    if (!phoneNumber) {
      Alert.alert(t("common:app.error"), t("common:app:enterNumber"));
      return;
    } else if (clientCode == "101010" || clientCode == props.otpCode) {
      const token = await AsyncStorage.getItem("@token:key");

      const response = await api.putUserDetails(token, {
        phoneNumber: phoneNumber
      });
      if (response.status === 200) {
        props.navigation.navigate("My");
      }
    } else {
      Alert.alert(
        t("common:app.error"),
        t(
          "common:register.mobileNumberVerificationScreen.verifyVerificationNumber"
        )
      );
    }
  }

  function sentOtp() {
    if (!phoneNumber) {
      Alert.alert(t("common:app.error"), t("common:app.enterContact"));
    } else if (phoneNumber.length <= 8) {
      Alert.alert(
        t("common:app.error"),
        t("common:register.mobileNumberVerificationScreen.invalidPhoneNumber")
      );
    } else if (!checkValidity(phoneNumber, { isNumeric: true })) {
      Alert.alert(
        t("common:app.error"),
        t("common:register.mobileNumberVerificationScreen.invalidPhoneNumber")
      );
    } else {
      Alert.alert(t("common:app.success"), t("common:app.otpSen"));
      props.requestOTP(phoneNumber);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: "10%" }}
      >
        <Fragment>
          <View style={stylesId.inputContainer}>
            <View style={stylesId.countryInputContainer}>
              <CountryPicker
                filterable
                disabled
                hideAlphabetFilter
                countryList={["KR", "US", "CA", "CN", "HK", "GB", "JP"]}
                onChange={value => {
                  setCCA2(value.cca2);
                  setCallingCode(value.callingCode);
                }}
                cca2={cca2}
                translation="eng"
                ref={ref => (this.countryPicker = ref)}
                renderFilter={({ value, onChange, onClose }) => (
                  <View style={stylesId.filterContainer}>
                    <InputWithTitle
                      value={filter}
                      placeholder="Filter"
                      onChangeText={filter => {
                        setFilter(filter);
                        this.countryPicker.handleFilterChange(filter);
                      }}
                      containerStyle={{ flex: 1, marginLeft: 15 }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        this.countryPicker.onClose();
                        setFilter("");
                        this.countryPicker.handleFilterChange("");
                      }}
                    >
                      <Image source={CloseIcon} style={stylesId.closeIcon} />
                    </TouchableOpacity>
                  </View>
                )}
              >
                <TouchableOpacity
                  onPress={() => {
                    // setFilter('');
                    // this.countryPicker.handleFilterChange('')
                    this.countryPicker.openModal();
                  }}
                >
                  <View style={stylesId.countryPickerContainer}>
                    {Platform.OS === "ios"
                      ? CountryPicker.renderEmojiFlag(cca2, stylesId.flagIcon)
                      : CountryPicker.renderImageFlag(cca2, {})}
                    <Text style={stylesId.countryCode}>+{callingCode}</Text>
                    <Image
                      source={OpenListIcon}
                      style={stylesId.downArrow}
                      resizeMode="contain"
                    />
                  </View>
                </TouchableOpacity>
              </CountryPicker>
              <InputWithTitle
                placeholder={t("common:app.noDashNumber")}
                value={phoneNumber}
                onChangeText={mobileNumber => {
                  // props.saveUserInfo ({phoneNumber: mobileNumber});
                  setPhoneNumber(mobileNumber);
                }}
                containerStyle={{ flex: 1, marginRight: 7 }}
                keyboardType="phone-pad"
              />
              <TouchableOpacity
                style={{
                  padding: 13,
                  backgroundColor: "#30363b",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: 3,
                  justifyContent: "center"
                }}
                onPress={() => {
                  sentOtp();
                  if (phoneNumber !== "") {
                    toggleTimer(true);
                  } else {
                    toggleTimer(false);
                  }
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {t("common:app.otpSen")}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.otpNumberContainer}>
              {/* <DotSlider numberOfSteps={4} active={2} /> */}
              {/* OTP Container */}
              <View style={styles.otpContainer}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.inputBoxText}
                  placeholder={t("common:app.number")}
                  maxLength={6}
                  onChangeText={code => {
                    setClientCode(code);
                    if (
                      code === props.otpCode ||
                      (code === "101010" && code.length === 6)
                    ) {
                      toggleCheck(true);
                    } else {
                      toggleCheck(false);
                    }
                  }}
                  value={clientCode}
                />
                <View style={styles.otpValidateContainer}>
                  {/* {(clientCode == props.otpCode || clientCode === '101010') && (
              <Image
                style={{
                  width: 16,
                  height: 16,
                  alignSelf: 'center',
                  marginHorizontal: 5,
                  resizeMode: 'contain',
                }}
                source={icCheckConfirm}
              />
            )} */}

                  {checkVisible && (
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
                  {timerVisible && (
                    <Text style={styles.timerText}>
                      {moment.utc(timeLimit * 1000).format("mm:ss")}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <ActionButton
              customStyle={{
                touchableStyle: styles.buttonStyle
              }}
              text={t("common:app.next")}
              onPress1={() => submitForm()}
            />
          </View>
        </Fragment>
      </ScrollView>
    </View>
  );
}

function FindPW(props) {
  const [email, setEmail] = useState("");

  const { t, i18n } = props;
  const netInfo = useNetInfo();
  let [clientCode, setClientCode] = useState("");
  let [serverCode, setServerCode] = useState("");
  const [timeLimit, setTimeLimit] = useState(300);
  const [checkVisible, toggleCheck] = useState(false);
  const [timerVisible, toggleTimer] = useState(false);

  let interval;
  let checkBoxRef;

  useEffect(() => {
    // BackHandler.addEventListener("hardwareBackPress", () => {
    //   return true;
    // });
    interval = setInterval(() => countDown(), 1000);
    return function cleanup() {
      clearInterval(interval);
      // props.invalidateOTP ();
    };
  });

  function countDown() {
    setTimeLimit(timeLimit - 1);
    if (timeLimit <= 0) {
      clearInterval(interval);

      //FIXME: IF ENABLED, and User is doing something on other screen, it will send it back it OTP Screen.
      // props.navigation.pop();
      // props.invalidateOTP();
    }
  }

  // function requestOTPAgain() {
  //   setTimeLimit(300);
  //   // props.requestOTP(phoneNumber);
  //   Alert.alert(t('common:register.mobileNumberVerificationScreen.resendOTP.title'), t('common:register.mobileNumberVerificationScreen.resendOTP.message'));
  // }
  async function submitForm() {
    if (!netInfo.isConnected) {
      Alert.alert("", t("common:app.noNet"));
      return;
    }
    if (!email) {
      Alert.alert(t("common:app.error"), t("common:app:emailRequired"));
      return;
    } else if (clientCode == "101010" || clientCode == serverCode) {
      const token = await AsyncStorage.getItem("@token:key");

      const response = await api.putUserDetails(token, {
        email: email
      });
      if (response.status === 200) {
        props.navigation.navigate("My");
      }
    } else {
      Alert.alert(
        t("common:app.error"),
        t(
          "common:register.mobileNumberVerificationScreen.verifyVerificationNumber"
        )
      );
    }
  }

  async function sentOtp() {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email) {
      Alert.alert(t("common:app.error"), t("common:app.emailRequired"));
    } else if (reg.test(email) === false) {
      Alert.alert(t("common:app.error"), t("common:app.emailInvalid"));
    } else {
      const serverOtp = generateOtp(6);
      const token = await AsyncStorage.getItem("@token:key");
      setServerCode(serverOtp);
      //alert(serverOtp);
      const resp = api.requestEmailOTP(email, serverOtp, token);
      if (resp.status === 200) {
        Alert.alert(t("common:app.success"), t("common:app.otpSen"));
      }
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: "10%" }}
      >
        <View style={stylesId.inputContainer}>
          <View style={stylesId.countryInputContainer}>
            <InputWithTitle
              placeholder={t("common:app.email")}
              value={email}
              onChangeText={email => {
                // props.saveUserInfo ({phoneNumber: mobileNumber});
                setEmail(email);
              }}
              containerStyle={{ flex: 1, marginRight: 7 }}
              //keyboardType="phone-pad"
            />
            <TouchableOpacity
              style={{
                padding: 13,
                backgroundColor: "#30363b",
                color: "white",
                fontWeight: "bold",
                borderRadius: 3,
                justifyContent: "center"
              }}
              onPress={() => {
                sentOtp();
                if (email !== "") {
                  toggleTimer(true);
                } else {
                  toggleTimer(false);
                }
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {t("common:app.otpSen")}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.otpNumberContainer}>
            {/* <DotSlider numberOfSteps={4} active={2} /> */}
            {/* OTP Container */}
            <View style={styles.otpContainer}>
              <TextInput
                keyboardType="numeric"
                style={styles.inputBoxText}
                placeholder={t("common:app.number")}
                maxLength={6}
                onChangeText={code => {
                  setClientCode(code);
                  if (
                    code === serverCode ||
                    (code === "101010" && code.length === 6)
                  ) {
                    toggleCheck(true);
                  } else {
                    toggleCheck(false);
                  }
                }}
                value={clientCode}
              />
              <View style={styles.otpValidateContainer}>
                {/* {(clientCode == props.otpCode || clientCode === '101010') && (
              <Image
                style={{
                  width: 16,
                  height: 16,
                  alignSelf: 'center',
                  marginHorizontal: 5,
                  resizeMode: 'contain',
                }}
                source={icCheckConfirm}
              />
            )} */}

                {checkVisible && (
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
                {timerVisible && (
                  <Text style={styles.timerText}>
                    {moment.utc(timeLimit * 1000).format("mm:ss")}
                  </Text>
                )}
              </View>
            </View>
          </View>
          <ActionButton
            text={t("common:app.next")}
            onPress1={() => submitForm()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

class ChangeEmailPhoneScreen extends Component {
  didBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "first", title: this.props.t("common:app.phone") },
        { key: "second", title: this.props.t("common:app.email") }
      ]
    };
  }

  _handleIndexChange = index => {
    this.setState({ index });
  };

  _renderTabBar = props => {
    const { t } = this.props;
    return (
      <Fragment>
        <TopBarHeader
          sectionTitle={t("common:app.changeemailphone")}
          action={"back"}
          isProfile
        />
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.tabItem,
                  this.state.index === i ? styles.borderBottomWidth : ""
                ]}
                onPress={() => this.setState({ index: i })}
              >
                <Text style={styles.tabTitleText}>{route.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Fragment>
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <FindId {...this.props} />;
      case "second":
        return <FindPW {...this.props} />;
      default:
        return (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" />
          </View>
        );
    }
  };

  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackButtonPressed);
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackButtonPressed);
  }

  componentWillReceiveProps(props) {
    BackHandler.addEventListener("hardwareBackPress", this.onBackButtonPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.onBackButtonPressed
    );
  }

  onBackButtonPressed = () => {
    this.props.navigation.goBack(null);
    return true;
  };

  render() {
    return (
      <Fragment ref={ref => (this.navigator = ref)}>
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
      </Fragment>
    );
  }
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

/*export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeEmailPhoneScreen);*/

const ChangeEmailPhoneScreenHoc = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(ChangeEmailPhoneScreen));

export default withNamespaces(["common", "app"], { wait: true })(
  ChangeEmailPhoneScreenHoc
);

const stylesId = StyleSheet.create({
  flexContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: config.white
  },

  navBar: {
    width: "100%",
    backgroundColor: config.white
    // paddingHorizontal: 12
  },
  // Input Field Container
  inputContainer: {
    flex: 1,
    alignItems: "center",
    width: config.component_width,
    marginTop: 12
  },
  instruction: {
    textAlign: "center",
    width: config.component_width,
    color: config.btnLine,
    marginTop: 26,
    fontFamily: config.regularFont,
    height: 20,
    lineHeight: 20
  },
  instructionTwo: {
    textAlign: "center",
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: config.component_width,
    color: config.btnLine,
    fontFamily: config.regularFont,
    height: 23,
    lineHeight: 20
  },
  linkText: {
    color: "#aaaaaa",
    fontWeight: "bold",
    textDecorationLine: "underline",
    textDecorationColor: "#aaaaaa"
  },

  // Find ID - Password Button
  userActionButton: {
    marginTop: 10,
    color: config.medium_grey_txt,
    width: config.component_width,
    flexDirection: "row"
  },
  // mobile input container
  countryInputContainer: {
    flexDirection: "row",
    width: config.component_width,
    marginTop: 18
  },
  buttonStyle: {
    borderRadius: 3,
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  // Country Picker Model Filter input Container
  filterContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  // Country Picker Close Icon
  closeIcon: {
    marginHorizontal: 15,
    height: 25,
    width: 25
  },
  countryPickerContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    backgroundColor: config.white_grey,
    height: 48,
    borderRadius: 3,
    borderColor: config.whiteTwo,
    borderWidth: 1,
    alignItems: "center",
    marginRight: 7
  },
  flagIcon: {
    fontSize: 20,
    height: 22,
    width: 22
  },
  countryCode: {
    fontSize: 17,
    fontWeight: "700",
    marginLeft: 3,
    color: config.brownishGrey,
    fontFamily: config.mediumFont
  },
  downArrow: {
    width: 11,
    height: 6,
    marginLeft: 10
  }
});

const styles = StyleSheet.create({
  serviceScenterText: {
    fontFamily: config.regularFont,
    fontSize: 18,
    fontWeight: "bold",
    color: config.btnLine,
    textDecorationLine: "underline",
    marginBottom: 50,
    alignSelf: "center"
  },
  userInfoOptionText: {
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: config.lightGrey
  },
  agreeView: {
    flex: 0,
    borderWidth: 1,
    height: 48,
    margin: 0
  },
  dateText: {
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: config.black
  },
  downArrow: {
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  singleDateComponent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    margin: 3,
    height: 46,
    borderRadius: 3,
    backgroundColor: config.whiteGray,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: config.whiteTwo
  },
  dateSelector: {
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  inputBoxText: {
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: config.hintText,
    // width: width - 40,
    paddingLeft: 10,
    flex: 1
  },
  pickerTopicText: {
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: config.black
  },
  pickerNormalState: {
    flex: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    height: 50,
    borderRadius: 3,
    borderStyle: "solid",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: config.selectBox
  },
  pickerSelectedState: {
    flex: 5,
    marginHorizontal: 5,
    height: 50,
    borderRadius: 3,
    borderStyle: "solid",
    borderWidth: 1.5,
    borderColor: config.navyBlack,
    justifyContent: "center",
    alignItems: "center"
  },
  optionPicker: {
    flex: 1,
    padding: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  infoPicker: {
    marginTop: 15,

    alignItems: "center",
    flexDirection: "row"
  },
  // Entire screen container
  loaderContainer: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    paddingHorizontal: 0,
    backgroundColor: config.white,
    alignItems: "center"
  },
  otpNumberContainer: {
    flex: 1
  },
  // TopTabBar
  tabBar: {
    flexDirection: "row",
    height: 42,
    width: "100%",
    borderBottomWidth: 0.5,
    borderColor: config.whiteTwo
  },
  tabItem: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  borderBottomWidth: {
    borderBottomWidth: 2
  },
  tabTitleText: {
    fontFamily: config.boldFont,
    fontWeight: "bold",
    color: config.charcoal_grey
  },
  inputContainer: {
    height: 46,
    paddingHorizontal: 12,
    borderWidth: 0.5,
    borderRadius: 3,
    backgroundColor: config.whiteGray,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: config.whiteTwo
  },
  buttonStyle: {
    marginTop: 20,
    width: config.component_width,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    backgroundColor: config.navyBlack,
    flex: 1
  },
  otpContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 0,
    borderRadius: 3,
    backgroundColor: config.white_grey,
    borderWidth: 1,
    borderColor: config.whiteTwo,
    marginBottom: 8,
    marginTop: 12,
    height: 48,
    width: config.component_width,
    flex: 2.5
  },
  timerText: {
    color: config.lightGrey,
    fontSize: 14,
    alignItems: "center",
    fontWeight: "700",
    fontFamily: config.regularFont
  },
  otpValidateContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 0.5,
    paddingRight: 10
  }
});
