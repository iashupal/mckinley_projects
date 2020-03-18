import React, { Component, Fragment } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  AsyncStorage,
  BackHandler
} from "react-native";
import DeviceInfo from "react-native-device-info";
import { TabView, SceneMap } from "react-native-tab-view";
const { width } = Dimensions.get("window");
// Import components
import TopBarHeader from "@components/TopBarHeader";
import config from "@src/config";
import NavigationService from "@services/NavigationService";

// Import assets
import cloverIcon from "@assets/images/icCloverTitle.png";
import dummyImg from "@assets/images/tagImage1.png";
import notificatioCoffee from "@assets/images/ic_noti_coffee.png";
import lockVibe from "@assets/images/icLockPhoto.png";

import api from "./../services/ProfileApiService";
const allListData = [2, 1, 1];
import moment from "moment";

import { connect } from "react-redux";
import {
  getProfileNotification,
  getProfileMatchHistory,
  addRequestStatus,
  updateSeenStatus
} from "../store/actions";
import WithLoaderStatus from "../components/HOC/withLoaderStatus";
import { withNamespaces } from "react-i18next";

const UserNotification = ({ item, addRequestStatus, t }) => (
  <View style={[styles.allFlatlistRow, { padding: 10 }]}>
    {/* {type === undefined ||
      (type === 1 &&
        <View style={styles.itemRowContainer}>
          <View style={styles.imageContainer}>
            <Image source={dummyImg} style={styles.profilePicStyle} />
          </View>
          <View style={styles.rightContentContainer}>
            <View style={styles.firstRowContainer}>
              <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationText}>
                  JAY님이 회원님의 바이브를 좋아합니다.
                </Text>
              </View>
              <View style={styles.notificationTimeContainer}>
                <Text style={styles.notificationTime}>
                  5분 전
                </Text>
              </View>
            </View>
          </View>
        </View>)} */}
    {1 && (
      /* <Usernotifcationtest /> */
      <View style={styles.itemRowContainer}>
        <TouchableOpacity
          onPress={() =>
            NavigationService.navigate("ProfileSendLikeCoffee", {
              id: item.senderId._id,
              backRoute: "ProfileViewRequest"
            })
          }
        >
          <View style={styles.imageContainer}>
            <Image
              source={
                !!item.senderId &&
                item.senderId.photos[0] &&
                item.senderId.photos[0].url
                  ? { uri: item.senderId.photos[0].url }
                  : ""
              }
              style={styles.profilePicStyle}
            />
            {!!item.senderId && item.senderId.profileStatus !== "public" && (
              <View
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: "rgba(0, 0, 0, 0.5)"
                }}
              >
                <Image
                  style={{ width: 12, resizeMode: "contain" }}
                  source={lockVibe}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
        <View style={[styles.rightContentContainer, { paddingHorizontal: 10 }]}>
          <View style={styles.firstRowContainer}>
            <View style={styles.notificationTextContainer}>
              <Text style={styles.notificationText}>
                {!!item.senderId ? item.senderId.username : "-"}{" "}
                {t("noticeScreenLang:requestedNotif")}
              </Text>
            </View>
            <View style={styles.notificationTimeContainer}>
              <Text style={styles.notificationTime}>
                {moment(item.createdAt).fromNow()}
              </Text>
            </View>
          </View>
          {item.status === "pending" ? (
            <View style={styles.buttonsContainer}>
              {/* <TouchableOpacity
                onPress={() => { addRequestStatus({ itemSentId: item._id, status: 'rejected' }) }}
                style={styles.rejectContainer}>
                <Text style={styles.rejectText}>
                  {t('noticeScreenLang:reject')}
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => {
                  addRequestStatus({
                    itemSentId: item._id,
                    status: "accepted"
                  });
                }}
                style={styles.acceptButton}
              >
                <Text style={styles.acceptText}>
                  {t("noticeScreenLang:accept")}
                </Text>
              </TouchableOpacity>
            </View>
          ) : item.status === "status" ? (
            <Text> {t("reentryScreen:apply")}</Text>
          ) : (
            <Text>{t("noticeScreenLang:accept")}</Text>
          )}
        </View>
      </View>
    )}
  </View>
);

class ProfileViewRequest extends React.Component {
  constructor() {
    super();

    this.state = {
      profileRequest: []
    };
  }

  async fetch() {
    const token = await AsyncStorage.getItem("@token:key");
    const response = await api.getProfileViewRequest(token);
    this.setState({
      profileRequest: response.data.Body
    });
  }

  componentDidMount() {
    this.fetch();
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.profileRequestStatus.status !=
        nextProps.profileRequestStatus.status &&
      nextProps.profileRequestStatus.status == 2
    ) {
      this.fetch();
    }
  }

  render() {
    const { profileRequest } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <TopBarHeader
          action="close"
          sectionTitle={this.props.t("noticeScreenLang:moreReq")}
        />
        {profileRequest.length > 0 ? (
          <FlatList
            style={styles.FlatListStyle}
            keyExtractor={(item, index) => index.toString()}
            data={profileRequest}
            renderItem={({ item, index }) => {
              return (
                <UserNotification
                  t={this.props.t}
                  addRequestStatus={this.props.addRequestStatus}
                  item={item}
                />
              );
            }}
            ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
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
              {this.props.t("noticeScreenLang:noReq")}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    notifications: state.profile.notifications,
    matchHistory: state.profile.matchHistory,
    profileRequestStatus: state.profile.profileRequestStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfileNotification: () => dispatch(getProfileNotification()),
    getProfileMatchHistory: () => dispatch(getProfileMatchHistory()),
    addRequestStatus: request => dispatch(addRequestStatus(request)),
    updateSeenStatus: data => dispatch(updateSeenStatus(data))
  };
};

const ProfileViewRequestHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(ProfileViewRequest));
export default withNamespaces(["common", "noticeScreenLang"], {
  wait: true
})(ProfileViewRequestHOC);
const styles = StyleSheet.create({
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
    width: "95%",
    alignSelf: "center",
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
    margin: 5,
    // width: 143,
    marginRight: "2%",
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
    marginVertical: 5,
    borderWidth: 1,
    // width: 143,
    height: 36,
    borderRadius: 4,
    borderStyle: "solid",

    borderColor: config.navyBlack
  },
  buttonsContainer: {
    flex: 1,
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
    flex: 1.5,
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
    flex: 2.5,
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 5
  },
  firstRowContainer: { flex: 1, flexDirection: "row" },
  rightContentContainer: {
    flex: 5,
    flexDirection: "column"
  },
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
    marginHorizontal: 0,
    marginBottom: "25%"
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
  tabTextContainer: { flexDirection: "row" }
});
