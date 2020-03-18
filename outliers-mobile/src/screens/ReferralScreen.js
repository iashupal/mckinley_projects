import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  TouchableOpacity,
  Clipboard,
  TextInput,
  Button,
  BackHandler,
  autoCapitalize
} from "react-native";
import RNExitApp from "react-native-exit-app";
import api from "@services/AuthApiService";
import config from "@src/config";

const width = Dimensions.get("window").width - 60;
import imgJoinComplete from "@assets/images/imgJoinComplete.png";
import icCopyCode from "@assets/images/icCopyCode.png";
import icCopyCodeNew from "@assets/images/icCopy.png";

//Import Components
import ActionButton from "@components/ActionButton";
import IconInput from "@components/IconInput";
import Modal from "@components/CustomModal";
import WithLoaderStatus from "../components/HOC/withLoaderStatus";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import { verifyReferral } from "../store/actions";
import LandingImg from "@assets/images/imgConfrimJoy_3x.png";

const screenWidth = Dimensions.get("screen").width;
// icon: jsx component
// @buttonText1: string
// @heading: string
// @onClose: function
// @children: jsx component
// @hasTwo: boolean
// @buttonText2: string
// @onPress2: function
class ReferralScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
      code: "",
      referralCode: "Generating...",
      codeSubmitted: false,
      greetingModalVisible: false,
      showCopyCodeModal: false,
      text: "",
      clipboardContent: null,
      codeCopiedAlert: false
    };
  }

  //Clipboard start
  readFromClipboard = async () => {
    //To get the text from clipboard
    const clipboardContent = await Clipboard.getString();
    this.setState({ clipboardContent });
  };
  writeToClipboard = async () => {
    //To copy the text to clipboard
    await Clipboard.setString(this.state.referralCode);
    // Alert.alert('Copied to Clipboard!');
    this.setState({ showCopyCodeModal: true });
  };
  //Clipboard end

  componentWillReceiveProps(nextProps) {
    if (this.props.visible != nextProps.visible) {
      this.setState({ visible: nextProps.visible });
    }
  }

  handleCloseModal = () => {
    this.setState({ visible: !this.state.visible });
    if (this.props.onClose) this.props.onClose();
    AsyncStorage.setItem("@token:key", "").then(() => {
      AsyncStorage.setItem("@isRegister:key", "true").then(() => {
        this.props.navigation.navigate("Auth");
        RNExitApp.exitApp();
      });
    });
    // this.props.navigation.navigate('Home')
  };

  handleExit = () => {
    AsyncStorage.setItem("@token:key", "").then(() => {
      AsyncStorage.setItem("@isRegister:key", "true").then(() => {
        this.props.navigation.navigate("Auth");
        RNExitApp.exitApp();
      });
    });
    // this.props.navigation.navigate('Home')
  };

  openFinalLandingModal = () => {
    this.setState({ greetingModalVisible: true });
    this.setState({ exitModalVisible: true });
  };
  renderGreetingModal = props => {
    const { t } = props;
    return (
      <Modal
        transparent={true}
        visible={this.state.greetingModalVisible}
        onClose={async () => {
          this.setState({ greetingModalVisible: false });
          if (this.props.onClose) this.props.onClose();
          await AsyncStorage.setItem("@token:key", "");
          await AsyncStorage.setItem("@isRegister:key", "true");
          this.props.navigation.navigate("Login");
        }}
        buttonText1={t("rfrScrLang:greetingModal.confirm")}
      >
        <View style={styles.innerModalContainer}>
          <Image style={styles.headerImage} source={LandingImg} />
          <Text style={{ ...styles.boldTextHeader, fontSize: 17, color: "#3085F9" }}>
            {t("rfrScrLang:greetingModal.headerBlue")}
          </Text>
          <Text style={styles.infoText1}>{t("rfrScrLang:greetingModal.infoText1")}</Text>
          <Text style={styles.boldTextHeader}>{t("rfrScrLang:greetingModal.headerBlack")}</Text>
          <Text style={styles.infoText1}>{t("rfrScrLang:greetingModal.infoText2")}</Text>
        </View>
      </Modal>
    );
  };

  renderCopyCodeModal = () => {
    const { t } = this.props;
    return (
      <Modal
        transparent={true}
        hasTwo
        shouldHideActionButton={false}
        visible={this.state.showCopyCodeModal}
        buttonText1={t("profileSenfCoffeeLang:sendlikeModal.cancel")}
        buttonText2={t("common:app.confirm")}
        onPress1={() => this.setState({ showCopyCodeModal: false })}
        onPress2={() => this.setState({ showCopyCodeModal: false })}
      >
        <View style={sendLikeCoffe.innerModalContainer}>
          <Image style={sendLikeCoffe.headerImage} source={icCopyCode} />
          <Text style={sendLikeCoffe.boldTextHeader}>
            {/* {t('common:myScreen.promoCopied')} */}
            {t("common:myScreen.promoCopied")}
          </Text>
          <Text style={sendLikeCoffe.infoText1}>{t("common:myScreen.whenNewMember")}</Text>

          <Text style={sendLikeCoffe.noteText}>{t("common:myScreen.promoAppReview")}</Text>
        </View>
      </Modal>
    );
  };

  renderCodeCopiedAlert = props => {
    const { t } = props;
    return (
      <Modal
        transparent={true}
        shouldHideActionButton={false}
        visible={this.state.codeCopiedAlert}
        buttonText1={t("rfrScrLang:codeCopiedAlert.quit")}
        onPress1={() => {
          this.setState({ codeCopiedAlert: false });
          AsyncStorage.setItem("@token:key", "").then(() => {
            AsyncStorage.setItem("@isRegister:key", "true").then(() => {
              this.props.navigation.navigate("Auth");
              RNExitApp.exitApp();
            });
          });
        }}
      >
        <View style={sendLikeCoffe.innerModalContainer}>
          <Text style={styles.boldTextHeader}>{t("rfrScrLang:confirmMsg")}</Text>
          {/* <Text style={sendLikeCoffe.infoText1}>{t("rfrScrLang:codeCopiedAlert.text1")}</Text> */}
          {/* <Text style={sendLikeCoffe.infoText1}>{t("rfrScrLang:codeCopiedAlert.text2")}</Text> */}
        </View>
      </Modal>
    );
  };

  generateReferalCode = async () => {
    let token = await AsyncStorage.getItem("@token:key");
    response = await api.getReferralCode(token);
    //alert(response.data.Body);
    this.setState({ referralCode: response.data.Body });
  };

  async componentDidMount() {
    let token = await AsyncStorage.getItem("@token:key");
    // If token exists due to authentication, upload the vibe
    if (!token) {
      NavigationService.navigate("LoginScreen");
    }

    this.generateReferalCode();
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }
  //Submit Handling function
  submit = async () => {
    //console.log('submited code', this.state.code);
    if (!this.state.code) {
      Alert.alert(`${this.props.t("common:app.error")}`, `${this.props.t("common:app.enterCode")}`);
    }
    // Alert.alert("", this.state.code);
    // return;
    else {
      //this.props.verifyReferral(this.state.code);
      try {
        let response;
        let token = await AsyncStorage.getItem("@token:key");
        // If token exists due to authentication, upload the vibe
        if (token) {
          response = await api.verifyReferral(token, this.state.code);
          if (response.status === 200) {
            this.setState({ codeSubmitted: true });
            setTimeout(function() {
              AsyncStorage.setItem("@token:key", "").then(() => {
                RNExitApp.exitApp();
              });
            }, 2000);
          } else if (response.status === 400) {
            if (response.data.Body === "CAN_NOT_USE_YOUR_OWN_CODE") {
              Alert.alert(`${this.props.t("common:app.error")}`, `${this.props.t("common:app.ownCode")}`);
            } else if (response.data.Body === "ALREADY_REFERRED") {
              Alert.alert(`${this.props.t("common:app.error")}`, `${this.props.t("common:app.alreayReffered")}`);
            }
          }
          //console.log("referal screen API", response);
        } else {
          NavigationService.navigate("LoginScreen");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  render() {
    const { visible } = this.state;
    const {
      icon = imgJoinComplete,
      children,
      heading,
      buttonText1,
      hasTwo,
      buttonText2,
      shouldHideActionButton,
      outerPadding,
      containerPadding,
      t
    } = this.props;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={[styles.modalBackground, { backgroundColor: "transparent" }]}
      >
        <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {this.renderCopyCodeModal()}
          <View style={styles.modalBackground}>
            <View>
              <View style={[styles.contentOuter]}>
                <View style={[styles.contentBox, { paddingBottom: 100 }]}>
                  <Image source={icon} style={styles.icon} resizeMode="contain" />

                  <Text style={styles.heading}>{t("rfrScrLang:prfCtd")}</Text>
                  <Text
                    style={{
                      fontFamily: config.regularFont,
                      fontSize: 15,
                      fontWeight: "300",
                      lineHeight: 23,
                      fontStyle: "normal",
                      letterSpacing: 0,
                      textAlign: "center",
                      color: config.black
                    }}
                  >
                    {t("rfrScrLang:fortune")}
                  </Text>
                  <View style={styles.childComponent}>{children}</View>
                </View>
              </View>

              <View style={styles.copyCode}>
                <Text
                  style={{
                    fontFamily: config.regularFont,
                    fontSize: 15,
                    fontWeight: "300",
                    lineHeight: 23,
                    fontStyle: "normal",
                    letterSpacing: 0,
                    color: config.black
                  }}
                >
                  {t("rfrScrLang:referralCodeHeading")}{" "}
                </Text>
                <TouchableOpacity
                  style={styles.copyCodeClick}
                  // onPress={() => {
                  //   this.setState({
                  //     showCopyCodeModal: true
                  //   });
                  // }}
                  onPress={this.writeToClipboard}
                >
                  <Text style={styles.headingReferralCode}>{this.state.referralCode}</Text>

                  <View>
                    {/* <TouchableOpacity onPress={this.writeToClipboard}> */}
                    <Image source={icCopyCodeNew} style={styles.iconSmall} resizeMode="contain" />
                    {/* </TouchableOpacity> */}

                    {/* <Button
                    onPress={this.readFromClipboard}
                    title='Paste from Clipboard'
                  /> */}
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.note}>{t("rfrScrLang:note")}</Text>
              <View
                style={{
                  width,
                  justifyContent: "center",
                  flexDirection: "row",
                  alignItems: "center"
                }}
              >
                <IconInput
                  autoCapitalize="characters"
                  // iconStyle={{ width: 0 }}
                  // icon={icon}
                  insetShadowStyle={{ height: 0 }}
                  inputStyle={{
                    borderWidth: 1,
                    marginLeft: -2,
                    borderColor: config.whiteTwo,
                    height: 54,
                    fontSize: 15,
                    width: width - 80
                  }}
                  placeholder={t("rfrScrLang:enterReferalCode")}
                  type="emailAddress"
                  keyboardType="email-address"
                  onChangeText={code => this.setState({ code: code })}
                  value={this.state.clipboardContent}
                />
                {this.state.codeSubmitted ? (
                  <ActionButton
                    text={t("rfrScrLang:cnfrm")}
                    // onPress1={() => this.setState({ codeCopiedAlert: true })}
                    customStyle={{
                      touchableStyle: {
                        width: 70,
                        height: 52,
                        marginLeft: 2,
                        borderRadius: 3,
                        backgroundColor: "grey",
                        alignItems: "center",
                        justifyContent: "center"
                      }
                    }}
                    // hasTwo={hasTwo}
                    // text2={buttonText2}
                  />
                ) : (
                  <ActionButton
                    text={t("rfrScrLang:cnfrm")}
                    onPress1={() => this.setState({ codeCopiedAlert: true })}
                    // onPress1={() => this.submit()}
                    customStyle={{
                      touchableStyle: {
                        width: 70,
                        height: 52,
                        marginLeft: 2,
                        borderRadius: 3,
                        backgroundColor: config.navyBlack,
                        alignItems: "center",
                        justifyContent: "center"
                      }
                    }}
                    // hasTwo={hasTwo}
                    // text2={buttonText2}
                    // onPress2={() => onPress2()}
                  />
                )}
              </View>
              <View>
                {this.state.codeSubmitted ? (
                  <Text
                    style={{
                      justifyContent: "center",
                      color: config.navyBlack,
                      marginVertical: 10
                    }}
                  >
                    {t("rfrScrLang:success")}
                  </Text>
                ) : (
                  <Text />
                )}
              </View>
              {
                <ActionButton
                  text={t("rfrScrLang:exit")}
                  onPress1={this.handleExit}
                  customStyle={{
                    touchableStyle: styles.buttonStyle
                  }}
                  hasTwo={hasTwo}
                  text2={buttonText2}
                  onPress2={() => onPress2()}
                />
              }
            </View>
            {this.renderCodeCopiedAlert(this.props)}
            {this.renderGreetingModal(this.props)}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  // return {
  //     loading: state.auth.loading
  // };
};

const mapDispatchToProps = dispatch => {
  return {
    // authUser: (email, password, passwordConfirm) =>
    //     dispatch(authUser(email, password, passwordConfirm, true))
    verifyReferral: code => dispatch(verifyReferral(code))
  };
};

const ReferralScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(ReferralScreen));

export default withNamespaces(["common", "rfrScrLang"], {
  wait: true
})(ReferralScreenHOC);

const sendLikeCoffe = StyleSheet.create({
  noteText: {
    marginTop: 5,
    fontFamily: config.regularFont,
    fontSize: 12,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: "center",
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
    marginBottom: 5,
    //width,
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "center",
    color: config.black
  },
  boldTextHeader: {
    marginBottom: 5,
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: config.black
  },
  headerImage: {
    height: 60,
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

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
    justifyContent: "flex-end",
    alignItems: "center",
    textAlign: "center",
    paddingBottom: 30
  },
  contentOuter: {
    // marginTop: -100,
    width: width,
    backgroundColor: config.charcoal_grey
  },
  contentBox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  heading: {
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    lineHeight: 30,
    textAlign: "center",
    color: config.black
  },
  copyCode: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
    // marginBottom: 20
  },
  copyCodeClick: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  headingReferralCode: {
    fontFamily: config.regularFont,
    fontSize: 16,
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    lineHeight: 30,
    textAlign: "center",
    color: "rgb(18, 169, 243)"
  },
  note: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    lineHeight: 18,
    textAlign: "center",
    color: config.lightGrey,
    marginBottom: 20
  },
  childComponent: {
    width: "100%"
    // paddingHorizontal: 10
  },
  icon: {
    width: 146,
    height: 122,
    marginBottom: 31
  },
  buttonStyle: {
    width: width,
    height: 54,
    borderRadius: 3,
    backgroundColor: config.navyBlack,
    alignItems: "center",
    justifyContent: "center"
  },
  backgroundContainer: {
    backgroundColor: config.charcoal_grey
  },
  innerModalContainer: {
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  boldTextHeader: {
    fontFamily: config.regularFont,
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    color: config.black,
    marginBottom: 5
  },
  infoText1: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    color: config.black,
    marginBottom: 5
  },
  headerImage: {
    height: 120,
    aspectRatio: 2,
    marginBottom: 10,
    resizeMode: "contain"
  },
  iconSmall: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginHorizontal: 10,
    color: "rgb(18, 169, 243)"
  }
});
