import React, { Fragment, Component } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  Switch,
  Dimensions,
  Clipboard,
  Platform,
  ImageBackground,
  Alert,
  AsyncStorage,
  Linking,
  BackHandler
} from "react-native";

import config from "@src/config";

// Import components
import TopBarHeader from "@components/TopBarHeader";
import ActionButton from "@components/ActionButton";
import IconInput from "@components/IconInput";
import Modal from "@components/CustomModal";
import Level from "@components/Level";
import InputWithTitle from "@components/InputWithTitle";
import X_MyLevelPopScreen from "@screens/X_MyLevelPopScreen";
import api from "@services/AuthApiService";
// Import Assets
import LockProfileImage from "@assets/images/ic_lock_profile.png";
import HideProfileImage from "@assets/images/ic_hide.png";
import IdealTypeImage from "@assets/images/ic_idealtype.png";
import icCheckConfirm from "@assets/images/icCheckConfirm.png";

import icCopyCode from "@assets/images/icCopyCode.png";
import EditNumberImage from "@assets/images/ic_edit_number.png";
import RealPhotoImage from "@assets/images/ic_real_photo.png";
import BlackMembershipImage from "@assets/images/ic_black.png";

import icEditNumber from "@assets/images/icEditNumber.png";
import icBlack1 from "@assets/images/icBlack1.png";
import btnQuest2 from "@assets/images/btnQuest2.png";
import icInvite from "@assets/images/icInvite.png";
import icCertification from "@assets/images/icCertification.png";
import icRealPhoto from "@assets/images/icRealPhoto.png";
import icBlack from "@assets/images/icBlack.png";
import icMyMore from "@assets/images/icMyMore.png";

import LevelOneImage from "@assets/images/ic_level_1.png";
import LevelTwoImage from "@assets/images/ic_level_2.png";
import LevelOneBlackImage from "@assets/images/ic_black_1.png";
import LevelTwoBlackImage from "@assets/images/ic_black_2.png";
import LevelThreeBlackImage from "@assets/images/ic_black_3.png";
import FloralRibbonImage from "@assets/images/img_laurel.png";

import { connect } from "react-redux";
// import {  } from '../store/actions';
import WithLoaderStatus from "../components/HOC/withLoaderStatus";

const { width } = Dimensions.get("window");
import AuthActions from "../store/redux/auth";
import { getAge } from "@utils/utility";
import { withNamespaces } from "react-i18next";
import axios from "axios";

class MyScreen extends Component {
  willFocusSubscription;

  constructor(props) {
    super(props);
    this.state = {
      isProfilePublic: false,
      userDetails: props.userDetails,
      showCopyCodeModal: false,
      showSchoolJobModel: false,
      showLevelModal: false,
      code: "",
      userLevel: props.userDetails.level,
      userLevelType: props.userDetails.levelType,
      email: "",
      phoneNumber: "",
      universityVerified: "accepted",
      occupationVerified: "accepted",
      wealthVerified: "accepted",
      appearanceVerified: true
    };
  }

  async componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.goBack(null);
      return true;
    });
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.props.getUserInfo();
      }
    );
    setInterval(() => {
      let { userLevel, userLevelType } = this.state;
      // console.log("inside set interval");
      // Alert.alert("setInterval");
      const id = this.state.userDetails._id;
      // console.log("userId", id);
      axios
        .get(`https://api.globaloutliers.com/user-level?id=${id}`)
        .then(response => {
          const {
            level,
            levelType,
            email,
            phoneNumber,
            universityVerified,
            occupationVerified,
            wealthVerified,
            appearanceVerified
          } = response.data.user;
          if (userLevel !== level || userLevelType !== levelType) {
            this.setState({ userLevel: level, userLevelType: levelType });
          }
          this.setState({
            email,
            phoneNumber,
            universityVerified,
            occupationVerified,
            wealthVerified,
            appearanceVerified
          });
        })
        .catch(err => {
          console.log(err);
        });
    }, 5000);
  }

  componentWillUnmount() {
    this.willFocusSubscription && this.willFocusSubscription.remove();
  }

  componentWillReceiveProps(nextProps) {
    this.props.getUserInfo();
    if (this.props.userDetails != nextProps.userDetails) {
      this.setState({ userDetails: nextProps.userDetails });
    }
  }

  _updateUserProfile = async data => {
    this.props.updateUserProfile(data);
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
          <Text style={sendLikeCoffe.infoText1}>
            {t("common:myScreen.whenNewMember")}
          </Text>

          <Text style={sendLikeCoffe.noteText}>
            {t("common:myScreen.promoAppReview")}
          </Text>
        </View>
      </Modal>
    );
  };

  renderSchoolJobModel = () => {
    const { t } = this.props;
    return (
      <Modal
        buttonText1={this.props.t("common:editProfileScreen.cancel")}
        transparent={true}
        visible={this.state.showSchoolJobModel}
        shouldHideActionButton={false}
        onClose={() => {
          this.setState({
            showSchoolJobModel: false
          });
          // this.props.navigation.navigate ('ReferralScreen');
        }}
      >
        <Text style={[styles.modalText, { color: config.black }]}>
          {this.props.t("common:myScreen.jobSchoolModal.header")}
        </Text>
        <View style={{ marginTop: 10, flexDirection: "row" }}>
          {this.state.userDetails.universityVerified !== "accepted" && (
            <TouchableOpacity
              style={[styles.buttonStyle1, { borderRadius: 3, height: 42 }]}
              onPress={() => {
                this.setState({
                  showSchoolJobModel: false
                });
                //GOTO UNIVERSITY VERIFICATIONS
                this.props.navigation.navigate("VerifySchool", {
                  isProfile: true
                });
              }}
            >
              <Text style={styles.buttonText}>
                {this.props.t("common:myScreen.jobSchoolModal.university")}
              </Text>
            </TouchableOpacity>
          )}
          {this.state.userDetails.occupationVerified !== "accepted" && (
            <TouchableOpacity
              style={[
                styles.buttonStyle1,
                { borderRadius: 3, marginHorizontal: 8, height: 42 }
              ]}
              onPress={() => {
                this.setState({
                  showSchoolJobModel: false
                });
                this.props.navigation.navigate("VerifyJob", {
                  isProfile: true
                });
              }}
            >
              <Text style={styles.buttonText}>
                {this.props.t("common:myScreen.jobSchoolModal.occupation")}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    );
  };

  writeToClipboard = async () => {
    const { userDetails } = this.state;

    await Clipboard.setString(
      userDetails.referalCode ? userDetails.referralCode : ""
    );
    //alert("Referral code copied!");
    this.setState({ showCopyCodeModal: true });
  };

  setUserLevel = (level, levelType) => {
    const { t } = this.props;
    if (levelType === "white") {
      if (level === 1) {
        return t("levels:levelOne");
      }
      if (level === 2) {
        return t("levels:levelTwo");
      }
    } else {
      if (level === 1) {
        return t("levels:blackLevelOne");
      }
      if (level === 2) {
        return t("levels:blackLevelTwo");
      }
      if (level === 3) {
        return t("levels:blackLevelThree");
      }
    }
  };
  //Submit Handling function
  submit = async () => {
    const { t } = this.props;
    //console.log('submited code', this.state.code);
    if (!this.state.code) {
      Alert.alert(
        `${this.props.t("common:app.error")}`,
        `${this.props.t("common:app.enterCode")}`
      );
    } else {
      try {
        let response;
        let token = await AsyncStorage.getItem("@token:key");
        response = await api.verifyReferral(token, this.state.code);
        if (response.status === 200) {
          Alert.alert(`${this.props.t("rfrScrLang:success")}`);
          this.setState({ code: "" });
        } else if (response.status === 400) {
          if (response.data.Body === "CAN_NOT_USE_YOUR_OWN_CODE") {
            Alert.alert(
              `${this.props.t("common:app.error")}`,
              `${this.props.t("common:app.ownCode")}`
            );
          } else if (response.data.Body === "ALREADY_REFERRED") {
            Alert.alert(
              `${this.props.t("common:app.error")}`,
              `${this.props.t("common:app.ownCode")}`
            );
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  render() {
    const { userDetails, userLevel, userLevelType } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <TopBarHeader
          action="close"
          onPressLeftAction={() =>
            this.props.navigation.navigate(
              this.props.navigation.getParam("backRoute", "MomentsMain")
            )
          }
        />
        <ScrollView style={styles.container}>
          {this.renderCopyCodeModal()}
          {this.renderSchoolJobModel()}
          <View style={styles.profileContainer}>
            <View>
              <Image
                style={styles.image}
                source={{
                  uri: !!userDetails.photos[0] && userDetails.photos[0].url
                }}
              />
            </View>
            <View style={styles.userInfoContainer}>
              <Text style={styles.username}>
                {userDetails.username},{" "}
                {t("common:editProfileScreen.ageValue", {
                  value: getAge(userDetails.dob)
                })}
              </Text>
              <Text style={styles.contacts}>
                {this.state.email ? this.state.email : userDetails.email}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={styles.contacts}
                  onPress={() => {
                    Linking.openURL(
                      `tel:${
                        this.state.phoneNumber
                          ? this.state.phoneNumber
                          : userDetails.phoneNumber
                      }`
                    );
                  }}
                >
                  {this.state.phoneNumber
                    ? this.state.phoneNumber
                    : userDetails.phoneNumber}
                </Text>
                <TouchableOpacity
                  style={styles.editIcon}
                  onPress={() =>
                    this.props.navigation.navigate("ChangeEmailPhoneScreen")
                  }
                >
                  <Image source={icEditNumber} style={styles.editIcon} />
                </TouchableOpacity>
              </View>
              <View style={{ marginVertical: 5, maxWidth: width * 0.7 }}>
                <View
                  style={{
                    ...styles.aboutUserContainer,
                    borderColor: config.goldYellow,
                    marginRight: 5,
                    marginBottom: 5,
                    display:
                      userDetails.wealthVerified !== "accepted" ||
                      !userDetails.wealthCriteria
                        ? "none"
                        : "flex"
                  }}
                >
                  <Text
                    style={{
                      ...styles.aboutUserText,
                      color: config.goldYellow
                    }}
                  >
                    {userDetails.wealthVerified === "accepted"
                      ? userDetails.wealthCriteria.replace("#", "")
                      : ""}
                  </Text>
                </View>
                {userDetails.appearanceVerified && (
                  <View style={styles.aboutUserContainer}>
                    <Text style={styles.aboutUserText}>
                      {userDetails.appearanceVerified
                        ? t("common:myScreen.photoVerified")
                        : ""}
                    </Text>
                  </View>
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  width: "85%"
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 8,
                    backgroundColor: "#f6f6f6",
                    borderRadius: 20,
                    paddingVertical: 0,
                    alignItems: "center",
                    paddingLeft: 0
                  }}
                >
                  <Level level={userLevel} levelType={userLevelType} />
                  <Text
                    style={[
                      styles.contacts,
                      {
                        paddingRight: 10,
                        paddingVertical: 3
                      }
                    ]}
                  >
                    {userDetails.level.toString() === "1"
                      ? t("levels:verifiedOneCategory")
                      : userDetails.level.toString() === "2"
                      ? t("levels:verifiedTwoCategory")
                      : userDetails.level.toString() === "3"
                      ? t("levels:verifiedThreeCategory")
                      : ""}

                    {/* {this.setUserLevel(
                      userDetails.level,
                      userDetails.levelType
                    )} */}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  width: "80%"
                }}
              >
                <View
                  style={{
                    backgroundColor: "#f6f6f6",
                    borderRadius: 12,
                    marginRight: 4
                  }}
                >
                  <Text
                    style={[
                      styles.contacts,
                      {
                        paddingHorizontal: 10,
                        paddingVertical: 3
                      }
                    ]}
                  >
                    {this.setUserLevel(userLevel, userLevelType)}
                  </Text>
                </View>

                <TouchableOpacity
                  style={{ flex: 2 }}
                  onPress={() => this.setState({ showLevelModal: true })}
                >
                  <Image source={btnQuest2} style={styles.Icon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Levels modal start */}
          <Modal
            transparent={true}
            hasTwo
            shouldHideActionButton={false}
            containerPadding={0}
            visible={this.state.showLevelModal}
            buttonText1={t("profileSenfCoffeeLang:sendlikeModal.cancel")}
            buttonText2={t("rfrScrLang:cnfrm")}
            onPress1={() => this.setState({ showLevelModal: false })}
            onPress2={() => this.setState({ showLevelModal: false })}
          >
            <View style={{ borderWidth: 0 }}>
              <View>
                <View style={styles.contentBox}>
                  <View style={styles.topBox}>
                    <View style={styles.topBoxTop}>
                      <View style={styles.imageTextBanner}>
                        <ImageBackground
                          source={FloralRibbonImage}
                          style={{ width: 200, height: 36 }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              fontSize: 16,
                              fontWeight: "bold",
                              color: config.goldYellow,
                              marginTop: -10
                            }}
                          >
                            {t("levels:goldenHeading")}
                          </Text>
                        </ImageBackground>
                      </View>
                    </View>
                    <View style={styles.topBoxBottom}>
                      <Text style={[styles.text12, styles.center]}>
                        {t("levels:paragraph")}
                      </Text>
                      <Text style={styles.textGrey}>{t("levels:date")}</Text>
                    </View>
                  </View>
                  <View style={styles.bottomBox}>
                    <View style={styles.groupIconText}>
                      <Image source={LevelOneImage} style={styles.Icon} />
                      <Text style={styles.text}>
                        {t("levels:modalLevelOne")}
                      </Text>
                    </View>
                    <View style={styles.groupIconText}>
                      <Image source={LevelTwoImage} style={styles.Icon} />
                      <Text style={styles.text}>
                        {t("levels:modalLevelTwo")}
                      </Text>
                    </View>
                    <View style={styles.groupIconText}>
                      <Image source={LevelOneBlackImage} style={styles.Icon} />
                      <Text style={styles.text}>
                        {t("levels:modalBlackLevelOne")}
                      </Text>
                    </View>
                    <View style={styles.groupIconText}>
                      <Image source={LevelTwoBlackImage} style={styles.Icon} />
                      <Text style={styles.text}>
                        {t("levels:modalBlackLevelTwo")}
                      </Text>
                    </View>
                    <View style={styles.groupIconText}>
                      <Image
                        source={LevelThreeBlackImage}
                        style={styles.Icon}
                      />
                      <Text style={styles.text}>
                        {this.props.t("levels:modalBlackLevelThree")}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* <TouchableOpacity
                onPress={() => this.setState({ showLevelModal: false })}
                style={{
                  height: 54,
                  backgroundColor: config.charcoal_grey,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={styles.buttonText}>{t('rfrScrLang:cnfrm')}</Text>
              </TouchableOpacity> */}
              </View>
            </View>
          </Modal>
          {/* Levels modal end */}

          {/*<View*/}
          {/*  style={{*/}
          {/*    justifyContent: 'center',*/}
          {/*    flexDirection: 'row',*/}
          {/*    alignItems: 'center',*/}
          {/*    marginHorizontal: 0,*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <IconInput*/}
          {/*    insetShadowStyle={{ height: 0 }}*/}
          {/*    inputStyle={{*/}
          {/*      borderWidth: 1,*/}
          {/*      borderColor: config.whiteTwo,*/}
          {/*      height: 48,*/}
          {/*      width: width - 108,*/}
          {/*      marginVertical: 8,*/}
          {/*    }}*/}
          {/*    placeholder={t('common:myScreen.enterCode')}*/}
          {/*    type="emailAddress"*/}
          {/*    keyboardType="email-address"*/}
          {/*  />*/}
          {/*  <ActionButton*/}
          {/*    text={t('common:app.confirm')}*/}
          {/*    onPress1={() => { }}*/}
          {/*    customStyle={{*/}
          {/*      touchableStyle: {*/}
          {/*        width: 70,*/}
          {/*        height: 48,*/}
          {/*        marginLeft: 2,*/}
          {/*        borderRadius: 3,*/}
          {/*        backgroundColor: config.navyBlack,*/}
          {/*        alignItems: 'center',*/}
          {/*        justifyContent: 'center',*/}
          {/*      },*/}
          {/*    }}*/}
          {/*    onPress2={() => onPress2()}*/}
          {/*  />*/}
          {/*</View>*/}

          <View style={{ marginTop: 20 }} />
          <ActionButton
            onPress1={() => {
              this.props.navigation.navigate("EditProfile");
            }}
            customStyle={{ touchableStyle: styles.buttonStyle }}
            text={t("common:myScreen.editProfile")}
          />
          {!userDetails.referralUsed && (
            <View
              style={{
                marginTop: 16,
                flexDirection: "row",
                paddingHorizontal: 15,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <InputWithTitle
                placeholder={this.props.t(
                  "common:editProfileScreen.enterpromocode"
                )}
                //onChangeText={text => this.handleSearch(text)}
                containerStyle={{
                  width: Dimensions.get("window").width * 0.7,
                  marginTop: 4,
                  borderWidth: 1,
                  flex: 2
                }}
                onChangeText={code => this.setState({ code: code })}
                value={this.state.code}
                icon2={icCheckConfirm}
              />
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: config.navyBlack,
                  height: 48,
                  marginTop: 4,
                  borderRadius: 4,
                  justifyContent: "center",
                  alignSelf: "center",
                  alignItems: "center",
                  marginLeft: 10
                }}
                onPress={() => this.submit()}
              >
                <Text
                  style={{
                    color: config.white,
                    fontSize: 16,
                    fontWeight: "bold"
                  }}
                >
                  {this.props.t("common:editProfileScreen.confirm")}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.contentOuter}>
            <View style={styles.listItem}>
              <View style={styles.leftBox}>
                <Image source={LockProfileImage} style={styles.Icon} />
              </View>
              <View style={styles.centerBox}>
                <Text style={[styles.label, styles.lh20]}>
                  {t("common:myScreen.disclose")}
                  {"\n"}
                  <Text style={styles.lightGrey}>
                    {t("common:myScreen.discloseMore")}
                  </Text>
                </Text>
              </View>
              <View style={styles.rightBox}>
                <Switch
                  ios_backgroundColor="#BCBFC1"
                  trackColor={{ true: "#3A424B", false: "#BCBFC1" }}
                  thumbColor={[Platform.OS == "ios" ? "#FFFFFF" : "#FFFFFF"]}
                  value={userDetails.profileStatus === "public" ? true : false}
                  onValueChange={val =>
                    this.setState(
                      {
                        userDetails: {
                          ...this.state.userDetails,
                          profileStatus: val ? "public" : "private"
                        }
                      },
                      () => {
                        this._updateUserProfile({
                          profileStatus: val ? "public" : "private"
                        });
                      }
                    )
                  }
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("HidePeople")}
              style={styles.listItem}
            >
              <View style={styles.leftBox}>
                <Image source={HideProfileImage} style={styles.Icon} />
              </View>
              <View style={styles.centerBox}>
                <Text style={styles.label}>
                  {t("common:myScreen.avoidPeople")}
                </Text>
              </View>
              <View style={styles.rightBox} />
            </TouchableOpacity>

            {/* <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("IdealSetting", {
                  backRoute: "My"
                })
              }
              style={styles.listItem}
            >
              <View style={styles.leftBox}>
                <Image source={IdealTypeImage} style={styles.Icon} />
              </View>
              <View style={styles.centerBox}>
                <Text style={styles.label}>
                  {t("common:myScreen.setPreference")}
                </Text>
              </View>
              <View style={styles.rightBox} />
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => {
                this.setState({
                  showCopyCodeModal: true
                });
              }}
              style={styles.listItem}
            >
              <View style={styles.leftBox}>
                <Image source={icInvite} style={styles.Icon} />
              </View>
              <View style={styles.centerBox}>
                <TouchableOpacity
                  onPress={() => {
                    this.writeToClipboard();
                  }}
                  style={styles.btnBlack}
                >
                  <Text style={styles.label}>
                    {t("common:myScreen.copypromoCode")}{" "}
                    <Text style={{ color: "#AAAAAA" }}>
                      (
                      {userDetails.referralCode ? userDetails.referralCode : ""}
                      )
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rightBox} />
            </TouchableOpacity>

            {/* School/Job Verification */}
            {/* {!userDetails.universityVerified &&  ( */}
            {(this.state.universityVerified !== "accepted" ||
              this.state.occupationVerified !== "accepted") && (
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    showSchoolJobModel: true
                  });
                }}
                style={styles.listItem}
              >
                <View style={styles.leftBox}>
                  <Image source={icCertification} style={styles.Icon} />
                </View>
                <View style={styles.centerBox}>
                  <Text style={styles.label}>
                    {t("common:myScreen.verifySC")}
                  </Text>
                </View>
                <View style={styles.rightBox} />
              </TouchableOpacity>
            )}
            {/* )} */}
            {!this.state.appearanceVerified && (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("AuthenticateInKind");
                }}
                style={styles.listItem}
              >
                <View style={styles.leftBox}>
                  <Image source={icRealPhoto} style={styles.Icon} />
                </View>
                <View style={styles.centerBox}>
                  <Text style={styles.label}>
                    {t("realVerification:headerTitle")}
                  </Text>
                </View>
                <View style={styles.rightBox} />
              </TouchableOpacity>
            )}

            {userDetails.wealthVerified !== "accepted" && (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("VerfiyNetworth", {
                    isProfile: true
                  });
                }}
                style={styles.listItem}
              >
                <View style={styles.leftBox}>
                  <Image source={icBlack} style={styles.Icon} />
                </View>
                <View style={styles.centerBox}>
                  <Text style={styles.label}>
                    {t("common:myScreen.verifyBlackOutliers")}
                  </Text>
                </View>
                <View style={styles.rightBox} />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("MoreMain");
              }}
              style={styles.listItem}
            >
              <View style={styles.leftBox}>
                <Image source={icMyMore} style={styles.Icon} />
              </View>
              <View style={styles.centerBox}>
                <Text style={styles.label}>{t("common:myScreen.more")}</Text>
              </View>
              <View style={styles.rightBox} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

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
  buttonText: {
    fontFamily: config.regularFont,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    color: config.white
  },
  buttonStyle1: {
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  modalText: {
    textAlign: "center",
    fontFamily: config.regularFont,
    color: config.pointRed,
    fontSize: 14,
    lineHeight: 20,
    marginHorizontal: 7
  },
  container: {
    flex: 1,
    backgroundColor: config.white_grey
  },
  image: {
    width: 68,
    height: 68,
    borderRadius: 68 / 2,
    borderWidth: 1,
    borderColor: "#e8e8e8"
  },
  profileContainer: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 20,
    backgroundColor: "white",
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: config.whiteTwo
  },
  userInfoContainer: {
    marginLeft: 14
  },
  username: {
    fontSize: 16,
    color: config.black
  },
  contacts: {
    fontSize: 14,
    color: config.btnLine
  },
  contentOuter: {
    paddingHorizontal: 20
  },
  listItem: {
    flexDirection: "row",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: config.whiteTwo,
    alignItems: "stretch"
  },
  label: {
    fontSize: 15,
    color: config.black,
    paddingLeft: 6
  },
  note: {
    fontSize: 12,
    textAlign: "center",
    paddingTop: 58
  },
  lightGrey: {
    color: config.lightGrey
  },

  Icon: {
    width: 22,
    height: 20
  },
  editIcon: {
    width: 12,
    height: 12,
    alignSelf: "center",
    marginLeft: 5
  },
  leftBox: {
    flex: 1
  },
  centerBox: {
    flex: 8
  },
  rightBox: {
    flex: 2
  },
  lh20: {
    lineHeight: 23
  },
  aboutUserContainer: {
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 13,
    borderStyle: "solid",
    borderWidth: 1,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    borderColor: config.aqua_marine
  },
  aboutUserText: {
    height: 18,
    fontFamily: config.regularFont,
    fontSize: 11,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: "center",
    color: config.aqua_marine
  },
  buttonStyle: {
    width: width - 30,
    height: 48,
    marginHorizontal: 16,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: config.navyBlack
  },
  modalBackground: {
    // backgroundColor: "rgba(0,0,0,0.8)",
    // flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  contentOuterModal: {
    backgroundColor: "white",
    width: 320,
    height: 481
  },
  contentBox: {
    width: "100%",
    height: 428,
    justifyContent: "center",
    alignItems: "stretch",
    textAlign: "center"
  },
  topBox: {
    backgroundColor: "#fffbf0",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 55,
    paddingBottom: 26
  },
  imageTextBanner: {
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  topBoxBottom: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 6
  },
  bottomBox: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 2,
    paddingTop: 16,
    paddingBottom: 31
  },
  buttonBox: {
    height: 54,
    backgroundColor: config.black
  },
  groupIconText: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%"
  },
  Icon: {
    width: 24,
    height: 24,
    marginRight: 0
  },
  text: {
    fontSize: 13,
    color: config.greyishBrown,
    lineHeight: 18,
    flex: 2,
    paddingLeft: 10
  },
  text12: {
    fontSize: 12,
    color: config.black,
    lineHeight: 16
  },
  textGrey: {
    fontSize: 12,
    color: config.btnLine,
    paddingTop: 6
  },
  center: {
    textAlign: "center"
  },
  buttonText: {
    fontFamily: config.regularFont,
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    color: config.white
  },
  buttonStyle1: {
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    userDetails: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserProfile: profile =>
      dispatch(AuthActions.updateUserProfile(profile)),
    getUserInfo: () => dispatch(AuthActions.getUserInfo())
  };
};

const MyScreenHoc = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(MyScreen));

export default withNamespaces(["common", "realVerification"], { wait: true })(
  MyScreenHoc
);
