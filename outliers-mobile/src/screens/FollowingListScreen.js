import React, { Component, Fragment, useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  ScrollView,
  AsyncStorage,
  Alert,
  BackHandler
} from "react-native";
import DeviceInfo from "react-native-device-info";
import { TabView, SceneMap } from "react-native-tab-view";
const { width } = Dimensions.get("window");
// Import components
import TopBarHeader from "@components/TopBarHeader";
import config from "@src/config";
import NavigationService from "@services/NavigationService";
import storeAPI from "@services/storeApiService";
import profileAPI from "@services/ProfileApiService";
import icClover from "@assets/images/ic_clover.png";
import Modal from "@components/HashtagModal";
// Import assets
import cloverIcon from "@assets/images/icCloverTitle.png";
import dummyImg from "@assets/images/tagImage1.png";
import notificatioCoffee from "@assets/images/ic_noti_coffee.png";
import icClose from "@assets/images/ic_close.png";
import lockVibe from "@assets/images/icLockPhoto.png";

const allListData = [1, 1, 1];

import { connect } from "react-redux";
import {
  getFollowingUserList,
  setFollowingUserList,
  getBlockedListUser,
  unblockUser,
  reportUser,
  sendProfileLikeCoffee
} from "../store/actions";
import WithLoaderStatus from "../components/HOC/withLoaderStatus";
import { getAge, getSex } from "../utils/utility";
import Level from "../components/Level";
import { withNamespaces } from "react-i18next";

const userInterests = ["#Yogo", "#Manhattan", "#26yrs"];

const UserNotification = ({ item, t, setCloverModalVisible }) => (
  <View style={styles.allFlatlistRow}>
    <View style={styles.itemRowContainer}>
      <View style={[styles.imageContainer, { overflow: "hidden" }]}>
        <TouchableOpacity
          onPress={() => {
            if (item.profileStatus === "public") {
              if (
                item.hasOwnProperty("likes") &&
                item.likes.hasOwnProperty("status")
              ) {
                if (item.likes.status === "accepted") {
                  NavigationService.navigate("ProfileMatched", {
                    id: item._id,
                    backRoute: "FollowingList"
                  });
                } else {
                  NavigationService.navigate("ProfileSendLikeCoffee", {
                    id: item._id,
                    backRoute: "FollowingList"
                  });
                }
              } else {
                NavigationService.navigate("ProfileSendLikeCoffee", {
                  id: item._id,
                  backRoute: "FollowingList"
                });
              }
            } else if (
              item.hasOwnProperty("requests") &&
              item.requests.hasOwnProperty("status")
            ) {
              if (item.requests.status === "pending") {
                Alert.alert(
                  t("common:app.error"),
                  t("vibeDetailScreen:notAccepted")
                );
              } else if (item.requests.status === "rejected") {
                Alert.alert(
                  t("common:app.error"),
                  t("vibeDetailScreen:rejected")
                );
              } else if (item.requests.status === "accepted") {
                if (item.likes.hasOwnProperty("status")) {
                  if (item.likes.status === "accepted") {
                    NavigationService.navigate("ProfileMatched", {
                      id: item._id,
                      backRoute: "FollowingList"
                    });
                  } else {
                    NavigationService.navigate("ProfileSendLikeCoffee", {
                      id: item._id,
                      backRoute: "FollowingList"
                    });
                  }
                } else {
                  NavigationService.navigate("ProfileSendLikeCoffee", {
                    id: item._id,
                    backRoute: "FollowingList"
                  });
                }
              }
            } else {
              // this.setState({
              //   showProfile: true,
              //   followeduser: item
              // });
              setCloverModalVisible(item);
            }
          }}
        >
          <Image
            source={
              !!item.photos[0] && item.photos[0].url
                ? { uri: item.photos[0].url }
                : ""
            }
            style={styles.profilePicStyle}
          />
        </TouchableOpacity>
        {item.profileStatus === "private" && ((!item.hasOwnProperty("likes") || item.likes.status !== 'accepted') || (!item.hasOwnProperty("requests") || item.requests.status !== 'accepted')) ? (
          <View
            style={{
              width: "100%",
              height: "100%",
              ...styles.profilePicStyle,
              position: "absolute",
              alignSelf: "center",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)"
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (item.profileStatus === "private" && (item.hasOwnProperty("likes") || item.hasOwnProperty("requests"))) {
                  if (
                    item.hasOwnProperty("likes") &&
                    item.likes.hasOwnProperty("status")
                  ) {
                    if (item.likes.status === "accepted") {
                      NavigationService.navigate("ProfileMatched", {
                        id: item._id,
                        backRoute: "FollowingList"
                      });
                    } else {
                      NavigationService.navigate("ProfileSendLikeCoffee", {
                        id: item._id,
                        backRoute: "FollowingList"
                      });
                    }
                  }
                  else if (
                    item.hasOwnProperty("requests") &&
                    item.requests.hasOwnProperty("status")
                  ) {
                    if (item.requests.status === "pending") {
                      Alert.alert(
                        t("common:app.error"),
                        t("vibeDetailScreen:notAccepted")
                      );
                    } else if (item.requests.status === "rejected") {
                      Alert.alert(
                        t("common:app.error"),
                        t("vibeDetailScreen:rejected")
                      );
                    } else if (item.requests.status === "accepted") {
                      if (
                        item.hasOwnProperty("likes") &&
                        item.likes.hasOwnProperty("status")
                      ) {
                        if (item.likes.status === "accepted") {
                          NavigationService.navigate("ProfileMatched", {
                            id: item._id,
                            backRoute: "FollowingList"
                          });
                        } else {
                          NavigationService.navigate("ProfileSendLikeCoffee", {
                            id: item._id,
                            backRoute: "FollowingList"
                          });
                        }
                      } else {
                        NavigationService.navigate("ProfileSendLikeCoffee", {
                          id: item._id,
                          backRoute: "FollowingList"
                        });
                      }
                    }
                  }
                } else {
                  // this.setState({
                  //   showProfile: true,
                  //   followeduser: item
                  // });
                  setCloverModalVisible(item);
                }
                // if (item.hasOwnProperty('likes') || item.hasOwnProperty('requests')) {
                //   setCloverModalVisible(item, 'alert');
                // } else {
                //   setCloverModalVisible(item, 'clover');
                // }
              }}
            >
              <Image
                style={{ width: 12, resizeMode: "contain" }}
                source={lockVibe}
              />
            </TouchableOpacity>
          </View>
        ) : (
            <View />
          )}
      </View>
      <View style={styles.rightContentContainer}>
        <View style={styles.firstRowContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginVertical: 2
            }}
          >
            {/* <View
              style={{
                borderWidth: 2,
                justifyContent: 'center',
                alignItem: 'center',
                marginHorizontal: 5,
                width: 18,
                height: 18,
                borderRadius: 9,
                borderColor: config.selectBox,
              }}
            >
              <Text style={{ fontSize: 10, alignSelf: "center" }}> 1 </Text>
            </View> */}
            <Level levelType={item.levelType} level={item.level} />
            <Text
              style={{
                width: "90%",
                fontFamily: config.regularFont,
                fontSize: 14,
                fontWeight: "600",
                fontStyle: "normal",
                lineHeight: 18,
                letterSpacing: 0,
                color: config.black
              }}
            >
              {`${getAge(item.dob)}, ${getSex(item.sex)}, ${item.college}`}
            </Text>
          </View>
        </View>
        <View
          style={{
            ...styles.buttonsContainer,
            paddingLeft: 0
          }}
        >
          <View style={styles.userInterestsContainer}>
            {item.interestedHashtags.map((item, index) => (
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
    </View>
  </View >
);

const FirstRoute = ({ props }) => {
  // useEffect(() => {
  //   if (props.followingUserList.length > 0 &&
  //     props.followingUserList[0].followers.length > 0) {
  //     alert(JSON.stringify(props.followingUserList[0].followers[3].requests));
  //   }
  // })
  return (
    <View style={{ flex: 1 }}>
      {props.followingUserList.length > 0 &&
        props.followingUserList[0].followers.length > 0 ? (
          <FlatList
            style={styles.FlatListStyle}
            keyExtractor={(item, index) => index.toString()}
            data={
              !!props.followingUserList[0] && props.followingUserList[0].followers
            }
            renderItem={({ item, index }) => {
              return <UserNotification t={props.t} key={index} item={item} setCloverModalVisible={props.setCloverModalVisible} />;
            }}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            ListFooterComponent={() => <View style={styles.itemSeparator} />}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                textAlign: "center"
              }}
            >
              {props.t("followingListScreen:noFollowers")}
            </Text>
          </View>
        )}
      {/* <View style={styles.bottomButton}>
      <TouchableOpacity style={styles.btnYellow}>
        <Text style={styles.btnText}> 프로필 더보기 신청 리스트 </Text>
      </TouchableOpacity>
    </View> */}
    </View>
  );
}

const PhotoTextOverlay = ({ text, overlayColor }) => (
  <View
    style={{
      ...styles.overlayTextContainer,
      backgroundColor: overlayColor
    }}
  >
    <Text style={styles.overlayText}>{text}</Text>
  </View>
);

const RowPhotoContainer = () => (
  <View style={styles.outerRowPhotoContainer}>
    <Text style={styles.matchText}>
      {props.t("followingListScreen:matched")}
    </Text>
    <View style={styles.innerPhotoRowContainer}>
      <View style={styles.itemPhotoContainer}>
        <Image
          style={styles.itemPhoto}
          source={{
            uri:
              "https://i.pinimg.com/originals/af/5e/55/af5e550838b9727f3eac687ed7e17a09.jpg"
          }}
        />
        <PhotoTextOverlay overlayColor={config.paleGold} text="D-7" />
        <View style={styles.photoBadgeContainer}>
          <Image
            style={styles.badgePhoto}
            resizeMode="contain"
            source={notificatioCoffee}
          />
        </View>
      </View>
      <View style={styles.itemPhotoContainer}>
        <Image
          style={styles.itemPhoto}
          source={{
            uri: "https://s-i.huffpost.com/gen/3158338/images/n-3-628x314.jpg"
          }}
        />
        <PhotoTextOverlay overlayColor={config.pointRed} text="D-7" />
      </View>
      <View style={styles.itemPhotoContainer}>
        <Image
          style={styles.itemPhoto}
          source={{
            uri:
              "http://mblogthumb2.phinf.naver.net/MjAxNzA4MTRfMTcg/MDAxNTAyNjQyOTI0OTEw.mersDZq0nKkXxtzz6_2WsxOT33hK0ZTyr9qu4kIBmZgg.eM_YGPVoXu7HU66f9szXzAQ9Vv63RyHujRDLwYg59LAg.JPEG.grace4088/IMG_20170812_130733.jpg?type=w800"
          }}
        />
        <PhotoTextOverlay overlayColor={config.paleGold} text="D-7" />
      </View>
    </View>
  </View>
);

const SecondRoute = props => (
  <View style={{ flex: 1 }}>
    {props.blockedUserList.length > 0 &&
      props.blockedUserList[0].blockedUser.length > 0 ? (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={props.blockedUserList[0].blockedUser}
          renderItem={({ item, index }) => {
            return (
              <Fragment>
                <UserNotification t={props.t} item={item} />
                <View style={{ ...styles.buttonsContainer, marginBottom: 15 }}>
                  <TouchableOpacity
                    onPress={() => {
                      props.unblockUser({ blockedUserId: item._id });
                    }}
                    style={styles.rejectContainer}
                  >
                    <Text style={styles.rejectText}>
                      {props.t("followingListScreen:unblock")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate("VibeReport", {
                        userId: item._id
                      });
                    }}
                    style={styles.acceptButton}
                  >
                    <Text style={styles.acceptText}>
                      {props.t("followingListScreen:report")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </Fragment>
            );
          }}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
          ListFooterComponent={() => <View style={styles.itemSeparator} />}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              textAlign: "center"
            }}
          >
            {props.t("followingListScreen:noBlockUser")}
          </Text>
        </View>
      )}
  </View>
);

class FollowingListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      newUpdates1: 0,
      newUpdates2: 1,
      routes: [
        {
          key: "first",
          title: this.props.t("followingListScreen:header"),
          isSeen: 1
        },
        {
          key: "second",
          title: this.props.t("followingListScreen:blockList"),
          isSeen: 1
        }
      ],
      userid: "",
      followingUserList: this.props.followingUserList,
      paymentData: [],
      showProfile: false,
      followeduser: []
    };
  }

  getDetail = async () => {
    const token = await AsyncStorage.getItem("@token:key");
    let userid = await AsyncStorage.getItem("@userid:key");
    this.setState({ userid });
    const paymentResponse = await storeAPI.getPaymentInfo(token);
    if (paymentResponse.status === 200) {
      this.setState({ paymentData: paymentResponse.data.Body });
    }
  };

  sendClover = async () => {
    const token = await AsyncStorage.getItem("@token:key");
    let res = await profileAPI.sendProfileLikeCoffee(token, {
      receiverId: this.state.followeduser._id,
      sentType: "request",
      message: ""
    });
    if (res.data.Body !== 'REQUEST_ALREADY_SENT') {
      await storeAPI.updatePaymentInfo(token, {
        id:
          !!this.state.paymentData[0] &&
          !!this.state.paymentData[0]._id &&
          this.state.paymentData[0]._id,
        cloversleft: JSON.stringify(
          parseInt(
            !!this.state.paymentData[0] &&
            !!this.state.paymentData[0].cloversleft &&
            this.state.paymentData[0].cloversleft
          ) - 2
        )
      });
    }
    this.props.getFollowingUserList();
  }

  _renderTabBar = props => {
    const { newUpdates } = this.state;
    return (
      <Fragment>
        <Modal
          transparent={true}
          visible={this.state.showProfile}
          hasTwo
          onCancel={() => {
            this.setState({ showProfile: false });
          }}
          buttonText1={this.props.t(
            "vibeDetailScreen:requestUserModal.btnOneText"
          )}
          buttonText2={
            <Fragment style={styles.cloveContainer}>
              <Text>
                {this.props.t("vibeDetailScreen:requestUserModal.btnTwoText")}
              </Text>
              <Image style={styles.cloveImageWhite} source={icClover} />
              <Text style={styles.cloveTextWhite}>x 2</Text>
            </Fragment>
          }
          onClose={() => {
            this.setState({ showProfile: false });
            if (
              !!this.state.paymentData[0] &&
              !!this.state.paymentData[0].cloversleft &&
              this.state.paymentData[0].cloversleft > 0
            ) {
              this.sendClover();

              // if (this.state.followeduser) {
              //   followeduser.requests = {};
              //   followeduser.requests.status = "pending";
              //   followeduser.requests.receiverId = this.state.followeduser._id;
              //   followeduser.requests.senderId = this.state.userid;
              //   followeduser.requests.sentType = "request";
              // }
            } else {
              Alert.alert(
                this.props.t("common:app.error"),
                this.props.t("vibeDetailScreen:notEngClv")
              );
              this.props.navigation.navigate("Store");
            }
          }}
        // onClose={() => {
        //   this.setState({ showProfile: false });
        // }}
        >
          <View style={styles.innerModalContainer}>
            {/* <Image style={styles.headerImage} source={imgStopMoment} /> */}
            <Text style={styles.textHeader}>
              {this.props.t("profileCommentScreen:requestProfile")}
            </Text>
            <View style={styles.cloveContainer}>
              <Image style={styles.cloveImage} source={icClover} />
              <Text style={styles.cloveText}>x 2</Text>
            </View>
          </View>
        </Modal>
        {this.renderHeader()}
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.tabItem,
                  this.state.index === i ? styles.borderBottomWidth : ""
                ]}
                onPress={() =>
                  this.setState({
                    index: i
                  })
                }
              >
                <View style={styles.tabTextContainer}>
                  <Text style={styles.tabTitleText}>{route.title}</Text>
                  {!route.isSeen && (
                    <Text style={styles.seenStatusContainer}> . </Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Fragment>
    );
  };

  componentDidMount() {
    this.props.getFollowingUserList();
    this.props.getBlockedListUser();
    this.getDetail();
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.followingUserList !== nextProps.followingUserList) {
      console.log(nextProps.followingUserList[0]);
      console.log(nextProps.blockedUserList[0]);
      this.setState({
        followingUserList: nextProps.followingUserList
      });
    }
  }

  setCloverModalVisible = (user) => {
    this.setState({ showProfile: true, followeduser: user });
  }

  _renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <FirstRoute props={{ ...this.props, setCloverModalVisible: (user) => this.setCloverModalVisible(user) }} />;
      case "second":
        return <SecondRoute {...this.props} />;
      default:
        return null;
    }
  };

  renderHeader = () => {
    return (
      <TopBarHeader
        action="close"
        tintColor={config.navyBlack}
        sectionTitle={this.props.t("followingListScreen:header")}
      // isClover={true}
      // cloverIcon={cloverIcon}
      // noOfClover={24}
      // onPressRightAction={() => {}}
      />
    );
  };

  renderTabViewContainer = () => {
    return (
      <View style={styles.container}>
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={index => this.setState({ index })}
        />
      </View>
    );
  };

  render() {
    return <Fragment>{this.renderTabViewContainer()}</Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    listVibes: state.vibes.listVibes,
    listMyVibes: state.vibes.listMyVibes,
    followingUserList: state.vibes.followingUserList,
    blockedUserList: state.vibes.blockedUserList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFollowingUserList: () => dispatch(getFollowingUserList()),
    getBlockedListUser: () => dispatch(getBlockedListUser()),
    unblockUser: data => dispatch(unblockUser(data)),
    reportUser: data => dispatch(reportUser(data)),
    sendProfileLikeCoffee: profile => dispatch(sendProfileLikeCoffee(profile))
  };
};

const FollowingListHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(FollowingListScreen));

export default withNamespaces(["common", "followingListScreen"], {
  wait: true
})(FollowingListHOC);

const styles = StyleSheet.create({
  interestText: {
    fontFamily: config.regularFont,
    fontSize: 12,
    fontWeight: "500",
    paddingHorizontal: 10,
    fontStyle: "normal",
    letterSpacing: 0,
    color: config.charcoalGrey
  },
  interestContainer: {
    height: 30,
    marginTop: 6,
    marginRight: 6,
    backgroundColor: config.paleGrey,
    justifyContent: "center",
    borderRadius: 2
  },
  userInterestsContainer: {
    flexWrap: "wrap",
    width: "100%",
    flexDirection: "row"
  },
  badgePhoto: {
    height: 38,
    width: 38,
    overflow: "visible"
  },
  photoBadgeContainer: {
    position: "absolute",
    top: -10,
    right: -10,
    overflow: "visible",
    height: 38,
    width: 38
  },
  outerRowPhotoContainer: { width, height: 200, padding: 10 },
  innerPhotoRowContainer: {
    flex: 1,
    flexDirection: "row"
  },
  matchText: {
    marginVertical: 5,
    fontFamily: config.regularFont,
    fontSize: 16,
    fontWeight: "300",
    fontStyle: "normal",
    letterSpacing: 0,
    color: config.navyBlack
  },
  overlayText: {
    fontFamily: config.regularFont,
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: config.white
  },
  overlayTextContainer: {
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 22,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: config.paleGold
  },
  itemPhoto: {
    flex: 1,
    borderRadius: 7
  },
  itemPhotoContainer: {
    flex: 1,
    margin: 6
  },
  btnText: {
    fontFamily: config.regularFont,
    color: config.navyBlack,
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center"
  },
  btnYellow: {
    backgroundColor: config.paleGold,
    width: "90%",
    borderRadius: 3,
    height: 48,
    justifyContent: "center"
  },
  bottomButton: {
    position: "absolute",
    backgroundColor: config.white,
    height: 80,
    width,
    paddingVertical: 11,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    bottom: 0
  },
  itemSeparator: {
    width: "96.5%",
    alignSelf: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: config.veryLightPinkTwo
  },
  acceptText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: config.white
  },
  rejectText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: config.black
  },
  acceptButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: config.navyBlack,
    marginLeft: 4,
    // width: 143,
    marginRight: 10,
    height: 36,
    borderRadius: 4,
    borderStyle: "solid",

    borderColor: config.navyBlack
  },
  rejectContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: config.white,
    // marginVertical: 5,
    borderWidth: 0.5,
    marginLeft: 3,
    marginRight: 4,
    // width: 143,
    height: 36,
    borderRadius: 4,
    borderStyle: "solid",

    borderColor: config.navyBlack
  },
  buttonsContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  notificationTime: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    // textAlign: 'right',
    color: config.hintText
  },
  notificationTimeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5
  },
  notificationText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    color: config.brownishGrey
  },
  notificationTextContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5
  },
  firstRowContainer: { flex: 1, flexDirection: "row" },
  rightContentContainer: { flex: 5, flexDirection: "column" },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  itemRowContainer: { width: "100%", flexDirection: "row" },
  container: {
    flex: 1,
    backgroundColor: config.whiteGray
  },
  navBar: {
    backgroundColor: "white",
    elevation: 3,
    paddingHorizontal: 12
  },
  tabBar: {
    flexDirection: "row",
    height: 36,
    width: "100%",
    borderBottomWidth: 0.5,
    borderColor: config.whiteTwo,
    justifyContent: "space-around"
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: config.white
  },
  borderBottomWidth: {
    borderBottomWidth: 2,
    borderBottomColor: config.navyBlack
  },
  seenStatusContainer: {
    lineHeight: 10,
    color: config.pointRed,
    fontSize: 25,
    fontWeight: "900",
    alignSelf: "flex-start"
  },
  tabTitleText: {
    fontFamily: config.boldFont,
    fontWeight: "bold",
    color: config.navyBlack,
    fontSize: 15
  },
  FlatListStyle: {
    marginTop: 0,
    marginHorizontal: 0
    // marginBottom: '25%'
  },
  allFlatlistRow: {
    width,
    marginVertical: 5,
    padding: 5,
    flexDirection: "row"
  },
  leftSideProfileView: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center"
  },
  centerContentView: {
    width: "55%"
  },
  rightSideTimeView: {
    marginLeft: "5%",
    width: "20%"
  },
  profilePicStyle: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  tabTextContainer: { flexDirection: "row" },
  cloveText: {
    fontFamily: config.refularFont,
    fontSize: 18,
    fontWeight: "300",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0,
    color: config.navyBlack
  },
  cloveImage: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    resizeMode: "contain",
    tintColor: config.navyBlack
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
  cloveImageWhite: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    resizeMode: "contain",
    tintColor: config.navyWhite
  },
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
  }
});
