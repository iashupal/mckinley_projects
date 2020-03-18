import React, { Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage,
  BackHandler
} from "react-native";
import DeviceInfo from "react-native-device-info";
const { width } = Dimensions.get("window");
import * as HOC from "../components/HOC";

const BottomOverlayMessageHOC = HOC.BottomOverlayMessageHOC(View);

const FullScreenHOC = HOC.FullScreenHoc(View);

//Importing assets
import icRate1 from "@assets/images/icRate1.png";
import icRate2 from "@assets/images/icRate2.png";
import icRate3 from "@assets/images/icRate3.png";
import icRate4 from "@assets/images/icRate4.png";
import icRate5 from "@assets/images/icRate5.png";

import btnCoffee from "@assets/images/btnCoffee3.png";
import btnLikeN from "@assets/images/btnLikeN.png";
import icLockPhoto from "@assets/images/icLockPhoto.png";
import bgBubbleDay from "@assets/images/bgBubbleDay.png";

import icSureQualify from "@assets/images/icSureQualify.png";
import icShare from "@assets/images/ic_share.png";
import btnCoffee1 from "@assets/images/btnCoffee1.png";
import imgSendlike from "@assets/images/imgSendlike.png";

import icRate5Filled from "@assets/images/icRate5_filled.png";
import icRate4Filled from "@assets/images/icRate4_filled.png";
import icRate3Filled from "@assets/images/icRate3_filled.png";
import icRate2Filled from "@assets/images/icRate2_filled.png";
import icRate1Filled from "@assets/images/icRate1_filled.png";

import Pass1Month from "./../assets/images/ic_1_month_pass.png";
import Pass2Week from "./../assets/images/ic_2_weeks_pass.png";
import Image1 from "./../assets/images/tagImage2.png";
import Pass14days from "./../assets/images/ic_pass_14.png";
import alarm from "./../assets/images/btn_alarm.png";

import Modal from "@components/CustomModal";
import IconInput from "@components/IconInput";

import imgSendgoldcoffee from "@assets/images/imgSendgoldcoffee.png";
import imgSendcoffee from "@assets/images/imgSendcoffee.png";
import icClover from "@assets/images/ic_clover.png";

import icCloverBlackBg from "@assets/images/ic_cloverblack.png";

import ReportIcon from "@assets/images/btnReport1.png";
import BlockIcon from "@assets/images/btnBlock.png";

//Images for custom modals vishal//
import icLevel1 from "@assets/images/ic_level_1.png";
import lockImage from "@assets/images/icLockWhite.png";
import imgJoy from "@assets/images/imgPlane.png";
//Images for custom modals vishal//

//Import components
import StoreItem from "@components/StoreItem";
import InputBox from "@components/InputBox";
import TopBarHeader from "@components/TopBarHeader";
import config from "@src/config";
import ActionButton from "@components/ActionButton";

import UserPhotoCarousel from "@components/UserPhotoCarousel";

import { connect } from "react-redux";
import {
  sendProfileLikeCoffee,
  getProfileById,
  addRequestStatus
} from "../store/actions";
import WithLoaderStatus from "../components/HOC/withLoaderStatus";

import { getAge } from "@utils/utility";
import { withNamespaces } from "react-i18next";
import func from "../services/VibesApiService";

class ProfileSendLikeCoffee extends React.Component {
  willFocusSubscription;
  showSentLike = true;
  showSentCoffee = true;
  showSendGoldCoffee = true;

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      userDetails: {
        goldCoffeRequest: {},
        coffeRequest: {},
        likeRequest: {}
      },
      userDetailsLoaded: false,
      activeFooter: 0,
      currentRate: 1,
      sendCoffeeModal: false,
      sendGoldCoffee: false,
      sendLikeModal: false,
      blockModalVisible: false,
      message: "",
      isBlocked: true
    };
  }

  async componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        const id = this.props.navigation.getParam("id", "");
        this.props.getProfileById({ id });
      }
    );
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  blockUser = async (id, msg) => {
    this.setState({ blockModalVisible: true });
  };

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userDetails != nextProps.userDetails) {
      this.setState({
        userDetails: nextProps.userDetails,
        userDetailsLoaded: true,
        isBlocked: nextProps.userDetails.isBlocked
      });
    }
    if (
      this.props.profileRequestStatus.status !=
        nextProps.profileRequestStatus.status &&
      nextProps.profileRequestStatus.status == 2
    ) {
      this.props.getProfileById({
        id: this.props.navigation.getParam("id", "")
      });
    }
    if (
      this.props.profileLikeCoffeeStatus.status !=
        nextProps.profileLikeCoffeeStatus.status &&
      nextProps.profileLikeCoffeeStatus.status == 2
    ) {
      this.props.getProfileById({
        id: this.props.navigation.getParam("id", "")
      });
    }
  }

  getLikeCoffeeCaption = () => {
    const { userDetails } = this.state;
    let caption = undefined;
    if (userDetails.likeRequest.hasOwnProperty("status")) {
      caption = userDetails.likeRequest;
      caption.type = "like";
      if (caption.request === "sent") {
        if (caption.status === "accepted") {
          caption.label = this.props.t("profileSenfCoffeeLang:likeAccepted");
        } else if (caption.status === "rejected") {
          caption.label = this.props.t("profileSenfCoffeeLang:likeRejected");
        } else {
          caption.label = this.props.t("profileSenfCoffeeLang:youSentLike");
        }
        caption.color = "#000000";
        this.showSentLike = false;
      } else {
        caption.label = userDetails.userInfo.username + " has send you like";
        caption.color = "#f83447";
      }
    }
    if (userDetails.coffeRequest.hasOwnProperty("status")) {
      caption = userDetails.coffeRequest;
      caption.type = "coffee";
      if (caption.request === "sent") {
        if (caption.status === "accepted") {
          caption.label = this.props.t("profileSenfCoffeeLang:coffeeAcc");
        } else if (caption.status === "rejected") {
          caption.label = this.props.t("profileSenfCoffeeLang:coffeeRej");
        } else {
          caption.label = this.props.t("profileSenfCoffeeLang:youSentCoffee");
        }
        caption.color = "#000000";
        this.showSentCoffee = false;
      } else {
        caption.label =
          userDetails.userInfo.username +
          " " +
          this.props.t("profileSenfCoffeeLang:hasSend");
        caption.color = "#f83447";
      }
    }
    if (userDetails.goldCoffeRequest.hasOwnProperty("status")) {
      caption = userDetails.goldCoffeRequest;
      caption.type = "gold_coffee";
      if (caption.request === "sent") {
        if (caption.status === "accepted") {
          caption.label = this.props.t("profileSenfCoffeeLang:hasBeenAccepted");
        } else if (caption.status === "rejected") {
          caption.label = this.props.t("profileSenfCoffeeLang:hasBeenRejected");
        } else {
          caption.label = this.props.t(
            "profileSenfCoffeeLang:youSentGoldCoffee"
          );
        }
        caption.color = "#000000";
        this.showSendGoldCoffee = false;
      } else {
        caption.label =
          userDetails.userInfo.username +
          " " +
          this.props.t("profileSenfCoffeeLang:sendYouGoldCoffee");
        caption.color = "#f83447";
      }
    }
    return caption;
  };

  submitForm = (id, status) => {
    this.props.addRequestStatus({ itemSentId: id, status });
  };

  render() {
    const userDetails = this.state.userDetails.userInfo;
    const statusDetail = this.state.userDetails.likeRequest;
    const { userDetailsLoaded, activeFooter, currentRate } = this.state;
    const likeCoffeeCaption = this.getLikeCoffeeCaption();
    const { t } = this.props;
    //console.log(likeCoffeeCaption);
    return (
      <FullScreenHOC
        active={activeFooter}
        textContainerStyle={{ opacity: 0.96, backgroundColor: config.eggShell }}
        textStyle={{
          fontFamily: config.regularFont,
          fontSize: 13,
          fontWeight: "600",
          fontStyle: "normal",
          letterSpacing: 0,
          textAlign: "center",
          color: config.dullOrange
        }}
        text={t("profileSenfCoffeeLang:expressInt")}
      >
        <Fragment>
          <TopBarHeader
            sectionTitle={t("profileSenfCoffeeLang:header")}
            action="back"
            rightNavBlockIcon={
              this.state.isBlocked === false ? BlockIcon : false
            }
            rightNavIcon={ReportIcon}
            onPressRightAction2={() => {
              this.blockUser(
                userDetails._id,
                t("profileMatchLang:userBlocked")
              );
            }}
            // rightNavSecondIcon={icShare}
            onPressRightAction={() => {
              this.props.navigation.navigate("Report", {
                type: 'User',
                vibeOrMomentId: userDetails._id
              });
            }}
            rightNavBlockIconStyle={{
              width: 24,
              height: 24,
              resizeMode: "cover"
            }}
            rightNavIconStyle={{
              width: 24,
              height: 24,
              marginLeft: 8,
              resizeMode: "contain"
            }}
            onPressLeftAction={() =>
              this.props.navigation.navigate(
                this.props.navigation.getParam("backRoute", "MomentsMain")
              )
            }
          />

          {/* VIBE TODAY PUBLIC */}
          {/* <Modal
            transparent={true}
            visible={this.state.sendCoffeeModal}
            style={{ flex: 0 }}
          >
            <View style={styles.innerModalContainerTwo}>
              <View style={styles.innerModalInsideTwo}>
                <Text style={styles.pvtmemberHeading}>
                  {t('vibeModals:mainHeadingPublic')}
                </Text>

                <View>
                  <Image style={styles.userImage} source={Image1} />
                </View>

                <View style={styles.icLevelOuter}>
                  <Image style={styles.icLevelImg} source={icLevel1} />
                  <Text style={styles.levelText}>
                    {t('vibeModals:username')}
                  </Text>
                </View>

                <Text style={styles.regularText}>
                  {t('vibeModals:tagHeading')}
                </Text>

                <View style={styles.interestTagContainer}>
                  <Text style={styles.hashtagBlue}>
                    {t('vibeModals:tagName')}
                  </Text>
                  <Text style={styles.hashtagBlue}>
                    {t('vibeModals:tagName')}
                  </Text>
                  <Text style={styles.hashtagBlue}>
                    {t('vibeModals:tagName')}
                  </Text>
                  <Text style={styles.hashtagBlue}>
                    {t('vibeModals:tagName')}
                  </Text>
                  <Text style={styles.hashtagBlue}>
                    {t('vibeModals:tagName')}
                  </Text>
                  <Text style={styles.hashtagBlue}>
                    {t('vibeModals:tagName')}
                  </Text>
                </View>

                <ActionButton
                  onPress1={() => this.submitForm()}
                  text={t('vibeModals:moreProfilebtn')}
                  style={{ marginTop: 55, marginBottom: 54 }}
                />

                <Text style={styles.skipText}>{t('vibeModals:skip')}</Text>
              </View>
            </View>
          </Modal> */}
          {/* VIBE TODAY PUBLIC */}

          {/* VIBE TODAY PRIVATE */}
          {/* <Modal
            transparent={true}
            visible={this.state.sendCoffeeModal}
            style={{ flex: 0 }}
            shouldHideActionButton={true}
          >
            <View style={styles.innerModalContainerTwo}>
              <View style={styles.innerModalInsideTwo}>
                <Text style={styles.pvtmemberHeading}>
                  {t('vibeModals:mainHeadingPrivate')}
                </Text>

                <View>
                  <Image style={styles.userImage} source={Image1} />
                  <View style={styles.userImageOverlay}>
                    <Image style={styles.lockIcon} source={lockImage} />
                  </View>
                </View>

                <View style={styles.icLevelOuter}>
                  <Image style={styles.icLevelImg} source={icLevel1} />
                  <Text style={styles.levelText}>
                    {t('vibeModals:username')}
                  </Text>
                </View>

                <Text style={styles.regularText}>
                  {t('vibeModals:tagHeading')}
                </Text>

                <View style={styles.interestTagContainer}>
                  <Text style={styles.hashtagBlue}>
                    {t('vibeModals:tagName')}
                  </Text>
                  <Text style={styles.hashtagBlue}>
                    {t('vibeModals:tagName')}
                  </Text>
                  <Text style={styles.hashtagBlue}>
                    {t('vibeModals:tagName')}
                  </Text>
                  <Text style={styles.hashtagBlue}>
                    {t('vibeModals:tagName')}
                  </Text>
                  <Text style={styles.hashtagBlue}>
                    {t('vibeModals:tagName')}
                  </Text>
                  <Text style={styles.hashtagBlue}>
                    {t('vibeModals:tagName')}
                  </Text>
                </View>

                <ActionButton
                  onPress1={() => this.submitForm()}
                  text={t('vibeModals:moreProfilebtn')}
                  style={{ marginTop: 55, marginBottom: 54 }}
                />

                <Text style={styles.skipText}>{t('vibeModals:skip')}</Text>
              </View>
            </View>
          </Modal> */}
          {/* VIBE TODAY PRIVATE */}

          {/* CONGRATULATIONS */}
          {/* <Modal
            transparent={true}
            visible={this.state.sendCoffeeModal}
            style={{ flex: 0 }}
          >
            <View style={styles.innerModalContainerTwo}>
              <View style={styles.innerModalInsideTwo}>
                <View>
                  <Image style={styles.graphicImage} source={imgJoy} />
                </View>
                <Text style={styles.blueHeading}>
                  {t('congratulations:welcomeHeading')}
                </Text>

                <Text style={styles.regularText}>
                  {t('congratulations:welcomeText')}
                </Text>
                <Text style={styles.regularTextBold}>
                  {' '}
                  {t('congratulations:complimentaryClover')}
                </Text>
                <Text style={styles.regularText}>
                  {t('congratulations:connectText')}
                </Text>
              </View>
            </View>
          </Modal> */}
          {/* CONGRATULATIONS */}

          {/* SENF LIKE */}
          <Modal
            transparent={true}
            hasTwo
            hasTwoIcon={icClover}
            visible={this.state.sendLikeModal}
            hasTwoIconText={" x 7"}
            buttonText1={t("profileSenfCoffeeLang:sendlikeModal.cancel")}
            buttonText2={t("profileSenfCoffeeLang:sendlikeModal.giftCof")}
            onPress2={() => {
              this.props.sendProfileLikeCoffee({
                receiverId: this.props.navigation.getParam("id", ""),
                sentType: "like",
                message: this.state.message
              });
              this.setState({ sendLikeModal: false });
            }}
            onClose={() => {
              this.setState({ sendLikeModal: false });
            }}
          >
            <View style={sendLikeCoffe.innerModalContainer}>
              <Image style={sendLikeCoffe.headerImage} source={imgSendlike} />
              <Text style={sendLikeCoffe.boldTextHeader}>
                {t("profileSenfCoffeeLang:sendlikeModal.text1")}
              </Text>

              <IconInput
                multiline
                numberOfLines={4}
                isRightImage={false}
                iconStyle={{ width: 0, margin: -10 }}
                insetShadowStyle={{ height: 0 }}
                inputStyle={sendLikeCoffe.textInputContainer}
                textInputStyle={sendLikeCoffe.textInputStyle}
                placeholder={t(
                  "profileSenfCoffeeLang:sendlikeModal.placeHolder"
                )}
                onChangeText={message => {
                  this.setState({ message });
                }}
                textAlignVertical={"top"}
              />
              <Text style={sendLikeCoffe.infoText1}>
                {t("profileSenfCoffeeLang:sendlikeModal.text2")}
              </Text>
              <Text style={sendLikeCoffe.noteText}>
                {t("profileSenfCoffeeLang:sendlikeModal.text3")}
              </Text>
            </View>
          </Modal>
          {/* SENF LIKE */}

          {/* SEND COFEE MODAL */}
          <Modal
            transparent={true}
            hasTwo
            hasTwoIcon={icClover}
            hasTwoIconText={" x 12"}
            buttonText1={t("profileSenfCoffeeLang:sendlikeModal.cancel")}
            buttonText2={t("profileSenfCoffeeLang:sendlikeModal.giftCof")}
            visible={this.state.sendCoffeeModal}
            onPress2={() => {
              this.props.sendProfileLikeCoffee({
                receiverId: this.props.navigation.getParam("id", ""),
                sentType: "coffee",
                message: this.state.message
              });
              this.setState({ sendCoffeeModal: false });
            }}
            onClose={() => {
              this.setState({ sendCoffeeModal: false });
            }}
          >
            <View style={stylesSendCofee.innerModalContainer}>
              <Image
                style={stylesSendCofee.headerImage}
                source={imgSendcoffee}
              />
              <Text style={stylesSendCofee.boldTextHeader}>
                {t("profileSenfCoffeeLang:sendCoffeeModal.text1")}
              </Text>
              <Text style={stylesSendCofee.infoText1}>
                {t("profileSenfCoffeeLang:sendCoffeeModal.text2")}
              </Text>
              <IconInput
                multiline
                numberOfLines={4}
                isRightImage={false}
                iconStyle={{ width: 0, margin: -10 }}
                insetShadowStyle={{ height: 0 }}
                inputStyle={stylesSendCofee.textInputContainer}
                textInputStyle={stylesSendCofee.textInputStyle}
                placeholder={t(
                  "profileSenfCoffeeLang:sendlikeModal.placeHolder"
                )}
                onChangeText={message => {
                  this.setState({ message });
                }}
                textAlignVertical={"top"}
              />
              <Text style={stylesSendCofee.noteText}>
                {t("profileSenfCoffeeLang:sendlikeModal.text3")}
              </Text>
            </View>
          </Modal>
          {/* SEND COFEE MODAL */}

          {/* GOLD COFFEE MODAL */}
          <Modal
            transparent={true}
            hasTwo
            hasTwoIcon={icClover}
            hasTwoIconText={" x 12"}
            buttonText1={t("profileSenfCoffeeLang:sendlikeModal.cancel")}
            buttonText2={t("profileSenfCoffeeLang:sendlikeModal.giftCof")}
            visible={this.state.sendGoldCoffee}
            modalFooterText={t("profileSenfCoffeeLang:goldCoffeeLang.title")}
            modalTextColor={config.white}
            modalFooterStyle={{
              height: 26,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: config.beige
            }}
            onPress2={() => {
              this.props.sendProfileLikeCoffee({
                receiverId: this.props.navigation.getParam("id", ""),
                sentType: "gold_coffee",
                message: this.state.message
              });
              this.setState({ sendGoldCoffee: false });
            }}
            onClose={() => {
              this.setState({ sendGoldCoffee: false });
            }}
          >
            <View style={sendLikeCoffe.innerModalContainer}>
              <Image
                style={sendLikeCoffe.headerImage}
                source={imgSendgoldcoffee}
              />
              <Text style={sendLikeCoffe.boldTextHeader}>
                {t("profileSenfCoffeeLang:sendlikeModal.text1")}
              </Text>
              <Text style={sendLikeCoffe.infoText1}>
                {t("profileSenfCoffeeLang:sendlikeModal.text2")}
              </Text>
              <IconInput
                multiline
                numberOfLines={4}
                isRightImage={false}
                iconStyle={{ width: 0, margin: -10 }}
                insetShadowStyle={{ height: 0 }}
                inputStyle={sendLikeCoffe.textInputContainer}
                textInputStyle={sendLikeCoffe.textInputStyle}
                placeholder={t(
                  "profileSenfCoffeeLang:sendlikeModal.placeHolder"
                )}
                onChangeText={message => {
                  this.setState({ message });
                }}
                textAlignVertical={"top"}
              />
              <Text style={sendLikeCoffe.noteText}>
                {t("profileSenfCoffeeLang:sendlikeModal.text3")}
              </Text>
            </View>
          </Modal>
          {/* GOLD COFFEE MODAL */}
          {/* BLOCK MODAL*/}
          <Modal
            transparent={true}
            visible={this.state.blockModalVisible}
            hasTwo
            // onPress1={() => {
            //   setShowProfile (false);
            // }}
            buttonText1={t("otherUserVibes:blockModal.btnOneText")}
            buttonText2={t("otherUserVibes:blockModal.btnTwoText")}
            onPress2={async () => {
              let token = await AsyncStorage.getItem("@token:key");
              let res = await func.blockUser(token, {
                blockedUserId: userDetails._id
              });
              this.setState({ blockModalVisible: false, isBlocked: true });
            }}
            onClose={() => {
              this.setState({ blockModalVisible: false });
            }}
          >
            <View
              style={{
                paddingHorizontal: 0,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {/* <Image style={styles.headerImage} source={imgStopMoment} /> */}
              <Text
                style={{
                  fontFamily: config.regularFont,
                  fontSize: 18,
                  fontWeight: "bold",
                  fontStyle: "normal",
                  letterSpacing: 0,
                  textAlign: "center",
                  marginBottom: 16,
                  color: config.black
                }}
              >
                {t("otherUserVibes:blockModal.headerText", {
                  value: userDetails && userDetails.username
                })}
              </Text>
              <View
                style={{
                  width: width * 0.8,
                  height: 1,
                  backgroundColor: config.whiteTwo
                }}
              />
              <Text
                style={{
                  fontFamily: config.regularFont,
                  fontSize: 14,
                  marginTop: 16,
                  marginBottom: 8,
                  fontWeight: "bold",
                  fontStyle: "normal",
                  lineHeight: 18,
                  letterSpacing: 0,
                  textAlign: "center",
                  color: config.black
                }}
              >
                {t("otherUserVibes:blockModal.messageh4")}
              </Text>
              <Text
                style={{
                  fontFamily: config.regularFont,
                  fontSize: 14,
                  fontWeight: "normal",
                  fontStyle: "normal",
                  lineHeight: 18,
                  letterSpacing: 0,
                  textAlign: "center",
                  color: config.brownishGrey
                }}
              >
                {t("otherUserVibes:blockModal.messageh6")}
              </Text>
            </View>
          </Modal>
          {/* END */}
          {userDetailsLoaded && (
            <ScrollView
              contentContainerStyle={{
                backgroundColor: config.white,
                paddingBottom: "45%"
              }}
            >
              <View style={styles.carouselHolderContainer}>
                <View style={[styles.absoluteCarouselContainer]}>
                  {userDetails.appearanceVerified && (
                    <View style={styles.aboutUserContainer}>
                      <Text style={styles.aboutUserText}>
                        {userDetails.appearanceVerified
                          ? t("common:myScreen.photoVerified")
                          : ""}
                      </Text>
                    </View>
                  )}
                  {/* <View style={styles.aboutUserContainer}>
                    <Text style={styles.aboutUserText}>
                      {t('profileSenfCoffeeLang:verified')}
                    </Text>
                  </View> */}
                  {/* {userDetails &&
                  userDetails.wealthVerified === 'accepted'
                   ? (
                    <View
                      style={{
                        ...styles.aboutUserContainerSalary,
                        borderColor: config.goldYellow,
                        marginTop: 8
                      }}
                    >
                      <Text
                        style={{
                          ...styles.aboutUserText,
                          color: config.goldYellow
                        }}
                      >
                        {' '}
                        {userDetails && userDetails.wealthCriteria}
                       
                      </Text>
                    </View>
                  ) : (
                    <View />
                  )} */}
                  <View
                    style={{
                      ...styles.aboutUserContainerSalary,
                      borderColor: config.goldYellow,
                      marginRight: 5,
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
                  <Text style={styles.aboutUserTextH2}>
                    {statusDetail.hasOwnProperty("status") &&
                    statusDetail.status === "accepted"
                      ? userDetails.firstName + " " + userDetails.lastName
                      : userDetails.username}
                    {","}{" "}
                    {t("profileSenfCoffeeLang:ageValue", {
                      value: getAge(userDetails && userDetails.dob)
                    })}
                  </Text>
                </View>

                <UserPhotoCarousel
                  containerStyle={styles.carouselContainer}
                  pagination
                  activeSlide={this.state.activeSlide}
                  onSnapToItem={index => {
                    this.setState({
                      activeSlide: index
                    });
                  }}
                  data={
                    userDetails
                      ? userDetails.photos
                      : [{ image: Image1 }, { image: Image1 }]
                  }
                />

                {likeCoffeeCaption ? (
                  <View
                    style={[
                      styles.messageOverlayContainer,
                      {
                        backgroundColor: likeCoffeeCaption.color
                      }
                    ]}
                  >
                    <Text style={styles.messageOverlayText}>
                      {likeCoffeeCaption.label}
                    </Text>
                  </View>
                ) : (
                  <View style={{ backgroundColor: "transparent", height: 24 }}>
                    <Text>{""}</Text>
                  </View>
                )}
              </View>
              {/* Store container */}

              {/* Contact Number Container */}
              <View style={styles.mainConatiner}>
                {/* Text Heading */}

                {/*<Text style={styles.rateHeader}>*/}
                {/*  {t('profileSenfCoffeeLang:rateHeader')}*/}
                {/*</Text>*/}

                {/* User Rating */}
                {/*<View style={styles.userRatingView}>*/}

                {/*  <TouchableOpacity*/}
                {/*    onPress={() => this.setState({ currentRate: 1 })}*/}
                {/*  >*/}
                {/*    {currentRate == 1*/}
                {/*      ? <Image*/}
                {/*        source={icRate1Filled}*/}
                {/*        style={styles.imageRateSize}*/}
                {/*      />*/}
                {/*      : <Image*/}
                {/*        source={icRate1}*/}
                {/*        style={styles.imageRateSize}*/}
                {/*      />}*/}

                {/*  </TouchableOpacity>*/}

                {/*  <TouchableOpacity*/}
                {/*    onPress={() => this.setState({ currentRate: 2 })}*/}
                {/*  >*/}
                {/*    {currentRate == 2*/}
                {/*      ? <Image*/}
                {/*        source={icRate2Filled}*/}
                {/*        style={styles.imageRateSize}*/}
                {/*      />*/}
                {/*      : <Image source={icRate2} style={styles.imageRateSize} />}*/}

                {/*  </TouchableOpacity>*/}

                {/*  <TouchableOpacity*/}
                {/*    onPress={() => this.setState({ currentRate: 3 })}*/}
                {/*  >*/}
                {/*    {currentRate == 3*/}
                {/*      ? <Image*/}
                {/*        source={icRate3Filled}*/}
                {/*        style={styles.imageRateSize}*/}
                {/*      />*/}
                {/*      : <Image source={icRate3} style={styles.imageRateSize} />}*/}

                {/*  </TouchableOpacity>*/}

                {/*  <TouchableOpacity*/}
                {/*    onPress={() => this.setState({ currentRate: 4 })}*/}
                {/*  >*/}
                {/*    {currentRate == 4*/}
                {/*      ? <Image*/}
                {/*        source={icRate4Filled}*/}
                {/*        style={styles.imageRateSize}*/}
                {/*      />*/}
                {/*      : <Image source={icRate4} style={styles.imageRateSize} />}*/}

                {/*  </TouchableOpacity>*/}

                {/*  <TouchableOpacity*/}
                {/*    onPress={() => this.setState({ currentRate: 5 })}*/}
                {/*  >*/}
                {/*    {currentRate == 5*/}
                {/*      ? <Image*/}
                {/*        source={icRate5Filled}*/}
                {/*        style={styles.imageRateSize}*/}
                {/*      />*/}
                {/*      : <Image source={icRate5} style={styles.imageRateSize} />}*/}

                {/*  </TouchableOpacity>*/}

                {/*</View>*/}

                {likeCoffeeCaption && (
                  <View style={styles.numberContainer}>
                    <View
                      style={{
                        justifyContent: "space-around",
                        marginVertical: 14,
                        marginLeft: 14,
                        marginRight: 30
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          lineHeight: 20,
                          fontFamily: config.regularFont,
                          fontWeight: "600",
                          color: config.black
                        }}
                      >
                        {/* {t('profileSenfCoffeeLang:message1')}{' '} */}
                        {likeCoffeeCaption.request === "received"
                          ? t("profileSenfCoffeeLang:message1") +
                            " " +
                            userDetails.username
                          : ""}
                      </Text>
                      {likeCoffeeCaption.request === "received" ? (
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: config.regularFont,
                            lineHeight: 20,
                            color: config.lightGrey
                          }}
                        >
                          {likeCoffeeCaption.message}
                        </Text>
                      ) : (
                        <Text />
                      )}
                    </View>
                  </View>
                )}

                {/* Bio */}
                <View style={{ width, marginTop: 10, paddingHorizontal: 18 }}>
                  {/* Top Row */}
                  <View style={[styles.topRow]}>
                    <View style={styles.topRowLeftContainer}>
                      <Text style={styles.bioText}>
                        {userDetails && userDetails.location}{" "}
                      </Text>
                    </View>
                    <View style={styles.topRowRightContainer}>
                      <View
                        style={{
                          marginLeft: 0,
                          flexDirection: "row"
                        }}
                      >
                        <Image
                          style={styles.assuredTick}
                          source={icSureQualify}
                        />
                        <Text style={styles.bioText}>
                          {userDetails && userDetails.college}{" "}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={[styles.topRow]}>
                    <View style={styles.topRowLeftContainer}>
                      <Text style={styles.bioText}>
                        {userDetails && userDetails.height}
                        {t("idealSettingScreen:cm")}
                      </Text>
                    </View>
                    <View style={styles.topRowRightContainer}>
                      <View
                        style={{
                          marginLeft: 0,
                          flexDirection: "row"
                        }}
                      >
                        <Image
                          style={styles.assuredTick}
                          source={icSureQualify}
                        />
                        <Text style={styles.bioText}>
                          {userDetails && userDetails.showOccupation === "title"
                            ? userDetails && userDetails.occupation
                            : userDetails &&
                              userDetails.showOccupation === "company"
                            ? userDetails.company
                            : userDetails &&
                              userDetails.showOccupation === "both"
                            ? userDetails.occupation +
                              ", " +
                              userDetails.company
                            : "N/A"}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={[styles.topRow]}>
                    <View style={styles.topRowLeftContainer}>
                      <Text style={styles.bioText}>
                        {userDetails && userDetails.religion
                          ? userDetails.religion
                          : "N/A"}
                      </Text>
                    </View>
                    <View style={styles.topRowRightContainer}>
                      <View
                        style={{
                          marginLeft: 0,
                          flexDirection: "row"
                        }}
                      >
                        <Text style={styles.bioText}>
                          {userDetails && userDetails.doSmoke
                            ? userDetails.doSmoke
                            : "N/A"}{" "}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* Top Row End */}

                  {/* One Row */}
                  {/* <View style={[styles.singleBioRow]}>
                    <View style={styles.bioLeftContainer}>
                      <Text style={styles.bioTextGrey}>
                        {t('profileSenfCoffeeLang:workout')}
                      </Text>
                    </View>
                    <View style={styles.bioRightContainer}>
                      <View
                        style={{
                          marginLeft: 0,
                          flexDirection: 'row'
                        }}
                      >
                        <Text style={styles.bioText}>
                          {userDetails && userDetails.doWorkOut}{' '}
                        </Text>
                      </View>
                    </View>
                  </View> */}
                  {/* One Row End */}

                  {/* One Row */}
                  <View style={[styles.singleBioRow]}>
                    <View style={styles.bioLeftContainer}>
                      <Text style={styles.bioTextGrey}>
                        {t("profileSenfCoffeeLang:race")}
                      </Text>
                    </View>
                    <View style={styles.bioRightContainer}>
                      <View
                        style={{
                          marginLeft: 0,
                          flexDirection: "row"
                        }}
                      >
                        <Text style={styles.bioText}>
                          {userDetails && userDetails.race}{" "}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* One Row End */}
                  {/* One Row */}
                  <View style={[styles.singleBioRow]}>
                    <View style={styles.bioLeftContainer}>
                      <Text style={styles.bioTextGrey}>
                        {t("profileSenfCoffeeLang:drinking")}
                      </Text>
                    </View>
                    <View style={styles.bioRightContainer}>
                      <View
                        style={{
                          marginLeft: 0,
                          flexDirection: "row"
                        }}
                      >
                        <Text style={styles.bioText}>
                          {userDetails && userDetails.doDrink}{" "}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* One Row End */}
                  {/* One Row */}
                  <View style={[styles.singleBioRow]}>
                    <View style={styles.bioLeftContainer}>
                      <Text style={styles.bioTextGrey}>
                        {t("profileSenfCoffeeLang:available")}
                      </Text>
                    </View>
                    <View style={styles.bioRightContainer}>
                      <View
                        style={{
                          marginLeft: 0,
                          flexDirection: "row"
                        }}
                      >
                        <Text style={styles.bioText}>
                          {userDetails && userDetails.doAvailable}{" "}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* One Row End */}

                  {/* One Row */}
                  <View style={[styles.singleBioRow]}>
                    <View style={styles.bioLeftContainer}>
                      <Text style={styles.bioTextGrey}>
                        {t("profileSenfCoffeeLang:workout")}
                      </Text>
                    </View>
                    <View style={styles.bioRightContainer}>
                      <View
                        style={{
                          marginLeft: 0,
                          flexDirection: "row"
                        }}
                      >
                        <Text style={styles.bioText}>
                          {userDetails && userDetails.doWorkOut}{" "}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* One Row End */}

                  {/* Fifth Row */}
                  <View style={styles.singleBioRow}>
                    <View style={styles.bioLeftContainer}>
                      <Text style={styles.bioTextGrey}>
                        {t("profileSenfCoffeeLang:interest")}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        flexWrap: "wrap",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        textAlign: "left"
                      }}
                    >
                      {userDetails &&
                        userDetails.interestedHashtags.length == 0 && (
                          <View style={styles.interestContainer}>
                            <Text style={styles.interestText}>
                              {t("profileSenfCoffeeLang:noInterest")}
                            </Text>
                          </View>
                        )}
                      {!!userDetails.interestedHashtags[0] &&
                        userDetails.interestedHashtags.map((item, index) => (
                          <View
                            key={index}
                            style={{
                              height: 30,
                              marginRight: 6,
                              marginBottom: 6,
                              marginLeft: 6,
                              marginLeft: 0,
                              borderRadius: 4,
                              backgroundColor: config.lightGreyBg,
                              justifyContent: "center",
                              textAlign: "center",
                              paddingHorizontal: 5
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: "500",
                                fontStyle: "normal",
                                lineHeight: 18,
                                letterSpacing: 0,
                                color: config.black,
                                justifyContent: "center",
                                textAlign: "center"
                              }}
                            >
                              #{item}{" "}
                            </Text>
                          </View>
                        ))}
                    </View>
                  </View>
                  {/* Fifth Row End */}
                  {/* 6th Row */}
                  <View style={[styles.singleBioRow]}>
                    <View style={[styles.bioLeftContainer]}>
                      <Text style={styles.bioTextGrey}>
                        {t("profileSenfCoffeeLang:intro")}
                      </Text>
                    </View>
                    <View
                      style={{
                        ...styles.bioRightContainer
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          width: "98%"
                        }}
                      >
                        <Text style={styles.bioText}>
                          {userDetails && userDetails.introduction
                            ? userDetails.introduction
                            : "N/A"}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* 6th Row End */}
                </View>
                {/*  */}
              </View>
              {likeCoffeeCaption &&
                likeCoffeeCaption.request === "received" &&
                likeCoffeeCaption.status === "pending" && (
                  <View style={[styles.buttomButton, { flexDirection: "row" }]}>
                    <TouchableOpacity
                      style={styles.btnBlack}
                      onPress={() =>
                        this.submitForm(likeCoffeeCaption.id, "accepted")
                      }
                    >
                      <Text style={styles.btnText}> Accept </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.btnBlack}
                      onPress={() =>
                        this.submitForm(likeCoffeeCaption.id, "rejected")
                      }
                    >
                      <Text style={styles.btnText}> Reject </Text>
                    </TouchableOpacity>
                  </View>
                )}
              {likeCoffeeCaption &&
                likeCoffeeCaption.status !== "pending" &&
                likeCoffeeCaption.request === "received" && (
                  <View style={styles.buttomButton}>
                    <View style={styles.btnBlack}>
                      <Text style={styles.btnText}>
                        {" "}
                        {likeCoffeeCaption.status === "accepted"
                          ? "Accepted"
                          : "Rejected"}{" "}
                      </Text>
                    </View>
                  </View>
                )}
            </ScrollView>
          )}
          {/* Bottom Button */}
          {userDetailsLoaded &&
            (!likeCoffeeCaption || likeCoffeeCaption.request === "sent") && (
              <View
                style={{
                  width,
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  bottom: activeFooter ? "14%" : "10%",
                  flexDirection: "row"
                }}
              >
                {this.showSentLike && (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        sendLikeModal: true
                      });
                    }}
                  >
                    <Image
                      style={{ width: 52, height: 52, marginHorizontal: 8 }}
                      source={icCloverBlackBg}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                )}

                {/* Sent Coffe Coupon */}
                {/* {this.showSentCoffee && (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ sendCoffeeModal: true });
                    }}
                  >
                    <Image
                      style={{ width: 66, height: 66, marginHorizontal: 8 }}
                      source={btnCoffee1}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                )} */}
                {/* Sent Coffe Coupon */}

                {/* {this.showSendGoldCoffee && (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        sendGoldCoffee: true
                      });
                    }}
                  >
                    <Image
                      style={{ width: 52, height: 52, marginHorizontal: 8 }}
                      source={btnCoffee}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                )} */}
              </View>
            )}
        </Fragment>
      </FullScreenHOC>
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
    backgroundColor: "#fafafa",
    borderColor: "#e8e8e8",
    paddingTop: 10
  },

  boldTextHeader: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 20,
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

const stylesSendCofee = StyleSheet.create({
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
  // infoText1: {
  //   fontFamily: config.regularFont,
  //   fontSize: 14,
  //   fontWeight: 'normal',
  //   fontStyle: 'normal',
  //   lineHeight: 20,
  //   letterSpacing: 0,
  //   textAlign: 'center',
  //   color: config.lightGrey
  // },
  infoText1: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: "left",
    color: config.lightGrey
  },
  boldTextHeader: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 20,
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
  interestText: {
    fontSize: 16,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,
    color: config.black
  },
  interestContainer: {
    height: 30,
    margin: 6,
    // backgroundColor: config.lightGreyBg,
    justifyContent: "center"
  },
  imageRateSize: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    marginHorizontal: 7
  },
  rateSize2: {
    alignItems: "center",
    justifyContent: "center",
    width: 19,
    height: 19,
    borderRadius: 9,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: config.hintText
  },
  rateSize1: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: config.hintText
  },
  absoluteCarouselContainer: {
    zIndex: 101,
    position: "absolute",
    width,
    paddingHorizontal: 20,
    bottom: "12%",
    alignSelf: "center"
  },
  carouselHolderContainer: {
    // backgroundColor: 'black',
    zIndex: 222,
    width,
    height: 300,
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.8,
    shadowRadius: 2.22,
    elevation: 3
  },
  carouselContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  aboutUserTextH2: {
    paddingTop: 5,
    fontFamily: config.regularFont,
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: config.white,
    textTransform: "capitalize"
  },
  aboutUserText: {
    // height: 18,
    fontFamily: config.regularFont,
    fontSize: 11,
    fontWeight: "500",
    fontStyle: "normal",
    // lineHeight: 18,
    letterSpacing: 0,
    textAlign: "center",
    color: config.aqua_marine
  },
  aboutUserContainer: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    // aspectRatio: 2.2,
    borderRadius: 13,
    backgroundColor: "rgba(0, 0, 0, 0.48)",
    borderStyle: "solid",
    borderWidth: 1,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    borderColor: config.aqua_marine,
    marginBottom: 8
  },
  aboutUserContainerSalary: {
    width: 105,
    aspectRatio: 2.2,
    borderRadius: 13,
    backgroundColor: "rgba(0, 0, 0, 0.48)",
    borderStyle: "solid",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderColor: config.aqua_marine
  },

  messageOverlayText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "center",
    color: config.white
  },
  messageOverlayContainer: {
    width: "100%",
    justifyContent: "center",
    opacity: 0.9
    // backgroundColor: '#000',
  },

  topRow: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 0
  },

  topRowLeftContainer: {
    flex: 1.6,
    justifyContent: "flex-start"
  },
  topRowRightContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left",
    paddingRight: 10
  },

  singleBioRow: {
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 0
  },
  bioLeftContainer: {
    flex: 1,
    justifyContent: "flex-start"
  },
  bioRightContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left"
    // height: 40
  },
  assuredTick: {
    marginHorizontal: 4,
    marginTop: 2,
    width: 18,
    height: 18,
    lineHeight: 22,
    resizeMode: "contain"
  },
  bioText: {
    fontSize: 15,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: config.black,
    textAlign: "left",
    paddingRight: 20
  },
  bioTextGrey: {
    fontSize: 15,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: config.hintText,
    textTransform: "capitalize"
  },
  rateHeader: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    marginTop: 18,
    marginBottom: 8,
    color: config.brownishGrey
  },
  userRatingView: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center"
  },
  buttomButton: {
    // position: 'absolute',
    backgroundColor: config.white,
    height: DeviceInfo.hasNotch() ? 90 : 70,
    width,
    paddingVertical: 11,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    bottom: 0,
    flex: 1
  },
  imgRating: {
    width: 36,
    height: 36,
    resizeMode: "contain",
    marginRight: "5%"
  },
  numberText: {
    fontFamily: config.boldFont,
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0,
    borderColor: config.black
  },
  numberContainer: {
    marginTop: 18,
    marginHorizontal: 20,
    alignItems: "flex-start",
    backgroundColor: config.lightGreyBg
  },
  subHead: {
    backgroundColor: config.paleGrey,
    paddingHorizontal: 15,

    flexDirection: "row",
    justifyContent: "space-between"
  },
  subHeadImage: {
    height: 20,
    width: 20,
    marginRight: 5
  },
  mainConatiner: {
    backgroundColor: config.white
  },
  //flex direction row sub head
  oneRow: {
    flexDirection: "row",
    paddingVertical: 10,
    flex: 1,
    justifyContent: "center"
  },
  subHeadText: {
    color: config.charcoal_grey,
    fontSize: 15
  },
  subHeadTextInactive: {
    fontSize: 15,
    color: config.hintText
  },
  pass: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fffbdf",
    borderRadius: 8,
    marginBottom: 10
  },
  passAmount: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderColor: config.goldYellow,
    borderLeftWidth: 0.5,
    padding: 0,
    margin: 0
  },
  passDetail: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 25
  },
  passTitle: {
    fontSize: 17,
    color: config.black
  },
  calIcon: {
    height: 25,
    width: 25,
    marginRight: 13,
    marginTop: 10
  },
  passDesc: {
    fontSize: 13
  },
  amount: {
    color: config.goldYellow,
    fontSize: 17,
    fontWeight: "bold"
  },
  passText: {
    paddingVertical: 10
  },
  oneRow: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20
  },
  btnText: {
    color: config.white,
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center"
  },
  btnBlack: {
    backgroundColor: config.charcoal_grey,
    flex: 1,
    width: "90%",
    margin: 5,
    borderRadius: 3,
    height: 44,
    justifyContent: "center"
  },

  // vibes modals css start
  innerModalContainerTwo: {
    justifyContent: "center",
    alignItems: "center"
  },
  innerModalInsideTwo: {
    alignItems: "center"
  },
  pvtmemberHeading: {
    fontSize: 18,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,
    color: config.black
  },
  userImage: {
    width: 76,
    height: 76,
    resizeMode: "contain",
    marginTop: 18,
    borderRadius: 76 / 2,
    borderWidth: 3,
    borderColor: "#fcd86f"
  },
  userImageOverlay: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "absolute",
    marginTop: 21,
    marginLeft: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  lockIcon: {
    width: 20,
    height: 25
  },
  icLevelOuter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 24,
    marginTop: 21,
    marginBottom: 19
  },
  icLevelImg: {
    height: 24,
    width: 24,
    marginHorizontal: 4
  },
  levelText: {
    fontSize: 14,
    fontWeight: "bold"
  },
  interestTagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 25
  },
  hashtagBlue: {
    fontSize: 14,
    backgroundColor: "#f1f8ff",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 2,
    height: 28,
    color: "#45494e",
    marginHorizontal: 6,
    marginVertical: 5
  },
  // regularText: {
  //   fontSize: 14
  // },
  skipText: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 14
  },

  // vibes modals css end

  // congratulations modals css start
  graphicImage: {
    height: 117,
    // aspectRatio: 1,
    marginBottom: 16,
    resizeMode: "contain"
  },
  blueHeading: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 8,
    color: "#3084f9",
    textAlign: "center"
  },
  regularText: {
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  regularTextBold: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "bold",
    textAlign: "center"
  }
  // congratulations modals css end
});

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    userDetails: state.profile.profileDetailsById,
    profileRequestStatus: state.profile.profileRequestStatus,
    profileLikeCoffeeStatus: state.profile.profileLikeCoffeeStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendProfileLikeCoffee: profile => dispatch(sendProfileLikeCoffee(profile)),
    getProfileById: id => dispatch(getProfileById(id)),
    addRequestStatus: request => dispatch(addRequestStatus(request))
  };
};

const ProfileSendLikeCoffeeHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(ProfileSendLikeCoffee));

export default withNamespaces(["common", "profileSenfCoffeeLang"], {
  wait: true
})(ProfileSendLikeCoffeeHOC);
