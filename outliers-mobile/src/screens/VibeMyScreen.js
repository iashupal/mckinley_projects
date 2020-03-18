import React, { Fragment, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Dimensions,
  Alert,
  BackHandler,
  AsyncStorage
} from "react-native";

const { width } = Dimensions.get("window");

import TopBarHeader from "@components/TopBarHeader";
import UserBasicInfo from "@components/UserBasicInfo";
import ActionButton from "@components/ActionButton";
import DonationTagsList from "@components/DonationTagsList";

import Modal from "@components/CustomModal";
import ModalClover from "@components/HashtagModal";
import storeAPI from "@services/storeApiService";
import profileAPI from "@services/ProfileApiService";
import config from "@src/config";
import userFunc from "../services/AuthApiService";
// import iconhashtag from "@assets/images/icon-hashtag.png";
import icClover from "@assets/images/ic_clover.png";
import iconhashtag from "@assets/images/icTag.png";
import InviteIcon from "@assets/images/ic_invite.png";
import BlockIcon from "@assets/images/ic_btnBlock.png";
import FollowingIcon from "@assets/images/ic_following_list.png";
import TopModalAlert from "@components/top-modal-alert";
import ImageProgress from "@components/ImageProgress";
import BottomInterestModal from "@components/bottom-interest-modal";
import lockImage from "@assets/images/icLockWhite.png";
import { connect } from "react-redux";
import {
  hideUser,
  blockUser,
  followVibe,
  followVibeUser
} from "../store/actions";
import AuthActions from "../store/redux/auth";
import WithLoaderStatus from "../components/HOC/withLoaderStatus";
import { withNamespaces } from "react-i18next";

function VibesScreen(props) {
  const [modalVisible, setModal] = useState(false);
  const [bottomModalVisible, setBottomModalVisible] = useState(false);
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [isFollowing, setFollowedTo] = useState(false);
  const [userVibeLists, setUserVibeList] = useState([]);
  const [vibeDetails, setVibeDetails] = useState(
    props.navigation.getParam("vibeDetails", null)
  );
  const [userDetails, setUserDetails] = useState({
    photos: [],
    interestedHashtags: []
  });
  const [profileRequest, setprofileRequest] = useState({});
  const [likeRequest, setlikeRequest] = useState({});
  const [cloverModalVisible, setCloverModalVisibility] = useState(false);
  const [userClovers, setClovers] = useState(0);

  useEffect(() => {
    const vibeDetailList = props.navigation.getParam("vibeDetails", null);
    setUserVibeList(!!props.userVibeList ? props.userVibeList.vibes : []);
    setVibeDetails(vibeDetailList);
    setUserDetails(
      !!props.userVibeList
        ? props.userVibeList.user
        : { photos: [], interestedHashtags: [] }
    );
    setprofileRequest(
      !!props.userVibeList ? props.userVibeList.profileRequest : {}
    );
    setlikeRequest(!!props.userVibeList ? props.userVibeList.likeRequest : {});

    setFollowedTo(!!props.userVibeList ? props.userVibeList.isFollow : false);
    console.log("isfollow", props.userVibeList);
    BackHandler.addEventListener("hardwareBackPress", onBackButtonPressed);
    getDetail();
  });

  function onBackButtonPressed() {
    if (bottomModalVisible) {
      setBottomModalVisible(false);
    } else {
      props.navigation.goBack(null);
    }
    return true;
  }

  async function _blockuser() {
    const userId = props.navigation.getParam("userId", "");
    props.blockuser(userId);

    console.log("TRACK USER", userId);
    // userId,
    // user.blockedUsers,
    props.saveUserInfo({
      blockedUsers: [
        ...props.user.blockedUsers,
        {
          _id: userId
        }
      ]
    });
  }

  const updateInterestTags = async tags => {
    if (tags.length !== props.user.interestedHashtags.length) {
      let token = await AsyncStorage.getItem("@token:key");
      let res = await userFunc.updateInterestTags(token, {
        interestedHashtags: [...tags]
      });
      // props.updateUserProfile({ username: props.user.username, interestedHashtags: tags.length > 0 ? tags.join(",") : "" });
    }
  };

  async function _hideUser() {
    const userId = props.navigation.getParam("userId", "");

    console.log("TRACK USER", userId);
    // userId,
    // user.hiddenUsers
    props.hideUser(userId);
    props.saveUserInfo({
      hiddenUsers: [
        ...props.user.hiddenUsers,
        {
          _id: userId
        }
      ]
    });
  }

  const followText = (
    <Fragment>
      <Image style={styles.icon} source={InviteIcon} />
      <Text>{props.t("otherUserVibes:blockModal.follow")}</Text>
    </Fragment>
  );

  const userId = props.navigation.getParam("userId", "");

  const openCloverModal = () => {
    setCloverModalVisibility(true);
  };

  const getDetail = async () => {
    const token = await AsyncStorage.getItem("@token:key");
    const paymentResponse = await storeAPI.getPaymentInfo(token);
    if (paymentResponse.status === 200) {
      setClovers(paymentResponse.data.Body[0].cloversleft);
    }
  };

  const sendClovers = async () => {
    const token = await AsyncStorage.getItem("@token:key");
    let res = await profileAPI.sendProfileLikeCoffee(token, {
      receiverId: userDetails._id,
      sentType: "request",
      message: ""
    });
    if (res.data.Body !== "REQUEST_ALREADY_SENT") {
      // let userid = await AsyncStorage.getItem("@userid:key");
      await storeAPI.updatePaymentInfo(token, {
        id: userId,
        cloversleft: userClovers - 2
      });
    }
    props.navigation.goBack(null);
  };

  const sendCloverModal = () => (
    <ModalClover
      buttonText1={props.t("vibeDetailScreen:requestUserModal.btnOneText")}
      buttonText2={
        <Fragment style={StylesClove.cloveContainer}>
          <Text>{props.t("vibeDetailScreen:requestUserModal.btnTwoText")}</Text>
          <Image style={StylesClove.cloveImageWhite} source={icClover} />
          <Text style={StylesClove.cloveTextWhite}>x 2</Text>
        </Fragment>
      }
      transparent={true}
      visible={cloverModalVisible}
      hasTwo
      onCancel={() => {
        setCloverModalVisibility(false);
      }}
      onClose={() => {
        setCloverModalVisibility(false);
        if (userClovers > 0) {
          sendClovers();
        } else {
          Alert.alert(
            props.t("common:app.error"),
            props.t("vibeDetailScreen:notEngClv")
          );
          props.navigation.navigate("Store");
        }
      }}
    >
      <View style={StylesClove.innerModalContainer}>
        <Text style={StylesClove.textHeader}>
          {props.t("profileCommentScreen:requestProfile")}
        </Text>
        <View style={StylesClove.cloveContainer}>
          <Image style={StylesClove.cloveImage} source={icClover} />
          <Text style={StylesClove.cloveText}>x 2</Text>
        </View>
      </View>
    </ModalClover>
  );

  return (
    <Fragment>
      {/* {alert(JSON.stringify(props.user.interestedHashtags))} */}
      <TopBarHeader
        sectionTitle={
          likeRequest.hasOwnProperty("status") &&
          likeRequest.status === "accepted"
            ? userDetails.firstName + userDetails.lastName
            : userDetails.username
        }
        action="close"
        rightNavIcon={BlockIcon}
        onPressRightAction={() => {
          setModal(!modalVisible);
        }}
      />
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Modal
              transparent={true}
              visible={blockModalVisible}
              hasTwo
              // onPress1={() => {
              //   setShowProfile (false);
              // }}
              buttonText1={props.t("otherUserVibes:blockModal.btnOneText")}
              buttonText2={props.t("otherUserVibes:blockModal.btnTwoText")}
              onPress2={() => {
                setBlockModalVisible(false);
                _blockuser();
                // props.navigation.pop ();
              }}
              onClose={() => {
                setBlockModalVisible(false);
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
                  {props.t("otherUserVibes:blockModal.headerText", {
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
                  {props.t("otherUserVibes:blockModal.messageh4")}
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
                  {props.t("otherUserVibes:blockModal.messageh6")}
                </Text>
              </View>
            </Modal>
          </View>

          <TopModalAlert
            t={props.t}
            loading={props.loading}
            user={props.user}
            userId={userId}
            onBlockPress={() => {
              setBlockModalVisible(true);
            }}
            onHidePress={() => {
              _hideUser();
            }}
            modalVisible={modalVisible}
          />

          {sendCloverModal()}

          <BottomInterestModal
            t={props.t}
            updateTags={res => updateInterestTags(res)}
            userHashtags={props.user.interestedHashtags}
            username={userDetails.username}
            interestedHashtags={userDetails.interestedHashtags}
            modalVisible={bottomModalVisible}
            onPress={() => {
              setBottomModalVisible(!bottomModalVisible);
            }}
          />

          <View style={styles.userInfo}>
            <TouchableOpacity
              onPress={() => {
                const listVibeDetails = props.navigation.getParam(
                  "listVibeDetails",
                  null
                );
                // props
                if (userDetails.profileStatus === "public") {
                  if (profileRequest.hasOwnProperty("status")) {
                    if (profileRequest.status === "pending") {
                      Alert.alert(
                        props.t("common:app.error"),
                        props.t("vibeDetailScreen:notAccepted")
                      );
                    } else if (profileRequest.status === "rejected") {
                      Alert.alert(
                        props.t("common:app.error"),
                        props.t("vibeDetailScreen:rejected")
                      );
                    } else if (profileRequest.status === "accepted") {
                      if (likeRequest.hasOwnProperty("status")) {
                        if (likeRequest.status === "accepted") {
                          props.navigation.navigate("ProfileMatched", {
                            id: userDetails._id,
                            backRoute: "VibeDetails"
                          });
                        } else {
                          props.navigation.navigate("ProfileSendLikeCoffee", {
                            id: userDetails._id,
                            backRoute: "VibeDetails"
                          });
                        }
                      }
                    }
                  } else {
                    props.navigation.navigate("ProfileSendLikeCoffee", {
                      id: userDetails._id,
                      backRoute: "VibeDetails"
                    });
                  }
                }
              }}
            >
              <View>
                <Image
                  style={styles.profileImage}
                  source={{
                    uri:
                      userDetails.photos.length > 0
                        ? userDetails.photos[0].url
                        : config.dafaultUser
                  }}
                />
                {userDetails.profileStatus === "private" &&
                (!profileRequest.hasOwnProperty("status") ||
                  profileRequest.status !== "accepted") ? (
                  <View style={styles.userImageOverlay}>
                    <TouchableOpacity
                      onPress={() => {
                        if (userDetails.profileStatus === "private") {
                          if (profileRequest.hasOwnProperty("status")) {
                            if (profileRequest.status === "pending") {
                              Alert.alert(
                                props.t("common:app.error"),
                                props.t("vibeDetailScreen:notAccepted")
                              );
                            } else if (profileRequest.status === "rejected") {
                              Alert.alert(
                                props.t("common:app.error"),
                                props.t("vibeDetailScreen:rejected")
                              );
                            } else if (profileRequest.status === "accepted") {
                              if (likeRequest.hasOwnProperty("status")) {
                                if (likeRequest.status === "accepted") {
                                  props.navigation.navigate("ProfileMatched", {
                                    id: userDetails._id,
                                    backRoute: "VibeDetails"
                                  });
                                } else {
                                  props.navigation.navigate(
                                    "ProfileSendLikeCoffee",
                                    {
                                      id: userDetails._id,
                                      backRoute: "VibeDetails"
                                    }
                                  );
                                }
                              }
                            }
                          } else {
                            openCloverModal();
                          }
                        }
                      }}
                    >
                      <Image style={styles.lockIcon} source={lockImage} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View />
                )}
              </View>
            </TouchableOpacity>
            <View style={styles.profileText}>
              <UserBasicInfo user={userDetails} college={true} />
              <View
                style={{
                  marginVertical: 5,
                  marginTop: 10,
                  flexDirection: "row"
                }}
              >
                {/* <View
                  style={{
                    ...styles.aboutUserContainer,
                    borderColor: config.goldYellow,
                    marginHorizontal: 5
                  }}
                >
                  <Text
                    style={{
                      ...styles.aboutUserText,
                      color: config.goldYellow
                    }}
                  >
                    {' '}
                    {props.t('vibes:salary')}
                  </Text>
                </View> */}
                <View
                  style={{
                    ...styles.aboutUserContainer,
                    borderColor: config.goldYellow,
                    marginRight: 5,
                    display:
                      userDetails.wealthVerified !== "accepted"
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
                      ? userDetails.wealthCriteria
                      : ""}
                  </Text>
                </View>
                {/* <View style={styles.aboutUserContainer}>
                  <Text style={styles.aboutUserText}>{props.t("vibeDetailScreen:photoVerified")}</Text>
                </View> */}
                {userDetails.appearanceVerified && (
                  <View style={styles.aboutUserContainer}>
                    <Text style={styles.aboutUserText}>
                      {userDetails.appearanceVerified
                        ? t("common:myScreen.verified")
                        : ""}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.userInterestsContainer}>
                {userDetails.interestedHashtags.map((item, index) => (
                  <View key={index} style={styles.interestContainer}>
                    <Text style={styles.interestText}>
                      {"#"}
                      {item}{" "}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.followContainer}>
            <TouchableOpacity
              onPress={() => {
                setBottomModalVisible(true);
              }}
              style={styles.followButtonContainer}
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    // marginTop: 5,
                    marginRight: 5,
                    width: 20,
                    height: 20
                  }}
                  source={iconhashtag}
                />
                <Text style={styles.followButtonText}>
                  {props.t("vibeDetailScreen:interest")}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                // props.followVibe(vibeDetails._id, response)
                if (isFollowing) {
                  await props.followVibeUser({
                    actionType: "unfollow",
                    toUser: userId
                  });
                  setFollowedTo(!isFollowing);
                } else {
                  await props.followVibeUser({
                    actionType: "follow",
                    toUser: userId
                  });
                  setFollowedTo(!isFollowing);
                }
              }}
              style={[styles.followButtonContainer, { marginLeft: 10 }]}
            >
              <View style={styles.followContainer}>
                {isFollowing && (
                  <Image
                    source={FollowingIcon}
                    style={{ height: 20, width: 20, marginRight: 5 }}
                    resizeMode="contain"
                  />
                )}

                <Text style={styles.followButtonText}>
                  {isFollowing
                    ? props.t("otherUserVibes:following")
                    : props.t("otherUserVibes:follow")}
                </Text>
              </View>
            </TouchableOpacity>

            {/* <View style={[styles.followButtonContainer, { marginLeft: 10 }]}>
            <View style={styles.followContainer}>
              <Image
                source={FollowingIcon}
                style={{ height: 22, width: 22, marginRight: 4 }}
                resizeMode="contain"
              />
              <Text style={styles.followButtonText}>
                팔로잉 리스트
            </Text>
            </View>
          </View> */}
          </View>
        </View>

        <FlatList
          style={styles.listViewContent}
          data={userVibeLists}
          numColumns={2}
          keyExtractor={({ index }) => `${index}`}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={{
                  ...styles.vibeContainer,
                  width: width / 2.3,
                  height: width / 2.4,
                  flex: 0
                }}
                onPress={() =>
                  props.navigation.navigate("VibeDetails", {
                    id: item._id
                  })
                }
              >
                <ImageProgress
                  style={styles.vibeImage}
                  source={{
                    uri: !!item.photos[0] ? item.photos[0].url : ""
                  }}
                />
              </TouchableOpacity>
            );
          }}
          numColumns={2}
        />
      </ScrollView>
    </Fragment>
  );
}

const StylesClove = StyleSheet.create({
  cloveContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 12,
    width: 131,
    height: 36,
    borderRadius: 25,
    backgroundColor: config.paleGrey
  },
  cloveImageWhite: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    resizeMode: "contain",
    tintColor: config.navyWhite
  },
  cloveTextWhite: {
    fontFamily: config.refularFont,
    fontSize: 18,
    fontWeight: "300",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0,
    color: config.white
  },
  cloveImage: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    resizeMode: "contain",
    tintColor: config.navyBlack
  },
  cloveText: {
    fontFamily: config.refularFont,
    fontSize: 18,
    fontWeight: "300",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0,
    color: config.navyBlack
  }
});

const styles = StyleSheet.create({
  interestText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    padding: 0,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: config.charcoalGrey,
    textAlign: "center"
  },
  interestContainer: {
    height: 30,
    backgroundColor: config.paleGrey,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 3,
    textTransform: "lowercase",
    paddingHorizontal: 10,
    margin: 2.3
  },
  userInterestsContainer: {
    flexWrap: "wrap",
    width: width * 0.7,

    flexDirection: "row"
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
  aboutUserContainer: {
    padding: 2,
    paddingHorizontal: 5,
    // aspectRatio: 2.2,
    borderRadius: 13,
    backgroundColor: "rgba(0, 0, 0, 0.0)",
    borderStyle: "solid",
    borderWidth: 1,
    alignSelf: "flex-start",
    justifyContent: "center",
    alignItems: "center",
    borderColor: config.aqua_marine
  },
  container: {
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: "white"
  },
  scrollView: {
    backgroundColor: "white"
  },
  listViewContent: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 12,
    marginTop: 18
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2
  },
  profileText: {
    paddingLeft: 15
  },
  userInfo: {
    flexDirection: "row",
    paddingBottom: 20
  },
  hashTagList: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingRight: 40
  },
  hashTagContainer: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: config.paleGrey,
    borderRadius: 2,
    marginTop: 6,
    marginRight: 7
  },
  hashTag: {
    color: config.charcoalGrey
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: "white"
  },
  vibeContainer: {
    marginLeft: 10,
    flex: 1,
    // aspectRatio: 1,
    // borderLeftWidth: 4,
    // borderColor: "#d8d8d8",
    borderRadius: 3,
    marginBottom: 10,
    marginHorizontal: 5
  },
  vibeImage: {
    flex: 1,
    resizeMode: "cover",
    // aspectRatio: 1,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3
  },
  followContainer: {
    flexDirection: "row"
  },
  followButtonContainer: {
    flex: 1,
    height: 42,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: config.hintText,
    alignItems: "center",
    justifyContent: "center"
  },
  followButtonText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    paddingTop: 0,
    fontWeight: "500",
    color: config.navyBlack,
    alignItems: "center",
    justifyContent: "center"
  },
  userImageOverlay: {
    width: 60,
    height: 60,
    borderRadius: 70 / 2,
    backgroundColor: "rgba(0,0,0,0.6)",
    position: "absolute",
    // marginTop: 3,
    marginLeft: 0,
    alignItems: "center",
    justifyContent: "center"
  },
  lockIcon: {
    width: 20,
    height: 25
  }
});

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    userVibeList: state.vibes.userVibeList,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideUser: params => dispatch(hideUser(params)),
    blockuser: params => dispatch(blockUser(params)),
    followVibe: params => dispatch(followVibe(params)),
    saveUserInfo: data => dispatch(AuthActions.setUserInfo(data)),
    followVibeUser: data => dispatch(followVibeUser(data)),
    updateUserProfile: (profile, uri) =>
      dispatch(AuthActions.updateUserProfile(profile, uri))
  };
};

const VibesScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(VibesScreen));

export default withNamespaces(["common", "otherUserVibes"], { wait: true })(
  VibesScreenHOC
);
