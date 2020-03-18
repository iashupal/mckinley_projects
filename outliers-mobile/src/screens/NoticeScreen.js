import React, { Component, Fragment } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  AsyncStorage
} from "react-native";
import DeviceInfo from "react-native-device-info";
import { TabView, SceneMap } from "react-native-tab-view";
const { width } = Dimensions.get("window");

import NavigationService from "@services/NavigationService";

// Import components
import TopBarHeader from "@components/TopBarHeader";
import NotificationAccountApproved from "@components/NotificationAccountApproved";
import NotificationLikeCoffeeGold from "@components/NotificationLikeCoffeeGold";
import NotificationMomentVibeCommentReply from "@components/NotificationMomentVibeCommentReply";
import NotificationMomentVibeLike from "@components/NotificationMomentVibeLike";
import NotificationRequest from "@components/NotificationRequest";
import NotificationVerify from "@components/NotificationVerify";
import NotificationRequestLikeAccepted from "@components/NotificationRequestLikeAccepted";
import config from "@src/config";

// Import assets
import cloverIcon from "@assets/images/icCloverTitle.png";
import coffee from "@assets/images/ic_noti_coffee.png";
import goldCoffee from "@assets/images/btnCoffee3.png";

import { connect } from "react-redux";
import {
  getProfileNotification,
  getProfileMatchHistory,
  addRequestStatus,
  updateSeenStatus,
  getPaymentInfo
} from "../store/actions";
import WithLoaderStatus from "../components/HOC/withLoaderStatus";
import { withNamespaces } from "react-i18next";

// const testNotificationData = [
//   {
//     "_id": "5d945e1ce298621c3e65d4e3",
//     "seen": false,
//     "receiverId": "5d8b001e0b48120a453b5d74",
//     "senderId": "5d8e5afe63e0cc2f7862fae0",
//     "sentType": "like",
//     "senderInfo": [
//       {
//         "photos": [
//           {
//             "_id": "5d8ee81c63e0cc2f7862fae2",
//             "url": "https://outliers-moments.s3.amazonaws.com/user/5d8e5afe63e0cc2f7862fae0K5hYTyQ2Zhignp0wSs6fbyIx2aJBfMCz.jpg"
//           },
//           {
//             "_id": "5d8ee82f63e0cc2f7862fae3",
//             "url": "https://outliers-moments.s3.amazonaws.com/user/5d8e5afe63e0cc2f7862fae0K5hYTyQ2Zhignp0wSs6fbyIx2aJBfMCz.jpg"
//           },
//           {
//             "_id": "5d8ee84b63e0cc2f7862fae4",
//             "url": "https://outliers-moments.s3.amazonaws.com/user/5d8e5afe63e0cc2f7862fae0JKxTB0X3uxyIZvfZ2d0bK8og3lFw1nMG.jpg"
//           }
//         ],
//         "username": "Anand"
//       }
//     ]
//   },
//   {
//     "_id": "5d945e1ce298621c3e65d4e3",
//     "seen": false,
//     "receiverId": "5d8b001e0b48120a453b5d74",
//     "senderId": "",
//     "sentType": "account-approved",
//     "senderInfo": []
//   },
//   {
//     "_id": "5d945e1ce298621c3e65d4e3",
//     "seen": false,
//     "receiverId": "5d8b001e0b48120a453b5d74",
//     "senderId": "5d8e5afe63e0cc2f7862fae0",
//     "sentType": "request",
//     "senderInfo": [
//       {
//         "photos": [
//           {
//             "_id": "5d8ee81c63e0cc2f7862fae2",
//             "url": "https://outliers-moments.s3.amazonaws.com/user/5d8e5afe63e0cc2f7862fae0K5hYTyQ2Zhignp0wSs6fbyIx2aJBfMCz.jpg"
//           },
//           {
//             "_id": "5d8ee82f63e0cc2f7862fae3",
//             "url": "https://outliers-moments.s3.amazonaws.com/user/5d8e5afe63e0cc2f7862fae0K5hYTyQ2Zhignp0wSs6fbyIx2aJBfMCz.jpg"
//           },
//           {
//             "_id": "5d8ee84b63e0cc2f7862fae4",
//             "url": "https://outliers-moments.s3.amazonaws.com/user/5d8e5afe63e0cc2f7862fae0JKxTB0X3uxyIZvfZ2d0bK8og3lFw1nMG.jpg"
//           }
//         ],
//         "username": "Anand"
//       }
//     ]
//   },
//   {
//     "_id": "5d945e1ce298621c3e65d4e3",
//     "seen": false,
//     "receiverId": "5d8b001e0b48120a453b5d74",
//     "senderId": "5d8e5afe63e0cc2f7862fae0",
//     "sentType": "moment-comment",
//     "senderInfo": [
//       {
//         "photos": [
//           {
//             "_id": "5d8ee81c63e0cc2f7862fae2",
//             "url": "https://outliers-moments.s3.amazonaws.com/user/5d8e5afe63e0cc2f7862fae0K5hYTyQ2Zhignp0wSs6fbyIx2aJBfMCz.jpg"
//           },
//           {
//             "_id": "5d8ee82f63e0cc2f7862fae3",
//             "url": "https://outliers-moments.s3.amazonaws.com/user/5d8e5afe63e0cc2f7862fae0K5hYTyQ2Zhignp0wSs6fbyIx2aJBfMCz.jpg"
//           },
//           {
//             "_id": "5d8ee84b63e0cc2f7862fae4",
//             "url": "https://outliers-moments.s3.amazonaws.com/user/5d8e5afe63e0cc2f7862fae0JKxTB0X3uxyIZvfZ2d0bK8og3lFw1nMG.jpg"
//           }
//         ],
//         "username": "Anand"
//       }
//     ]
//   },
//   {
//     "_id": "5d945e1ce298621c3e65d4e3",
//     "seen": false,
//     "receiverId": "5d8b001e0b48120a453b5d74",
//     "senderId": "5d8e5afe63e0cc2f7862fae0",
//     "sentType": "vibe-like",
//     "senderInfo": [
//       {
//         "photos": [
//           {
//             "_id": "5d8ee81c63e0cc2f7862fae2",
//             "url": "https://outliers-moments.s3.amazonaws.com/user/5d8e5afe63e0cc2f7862fae0K5hYTyQ2Zhignp0wSs6fbyIx2aJBfMCz.jpg"
//           },
//           {
//             "_id": "5d8ee82f63e0cc2f7862fae3",
//             "url": "https://outliers-moments.s3.amazonaws.com/user/5d8e5afe63e0cc2f7862fae0K5hYTyQ2Zhignp0wSs6fbyIx2aJBfMCz.jpg"
//           },
//           {
//             "_id": "5d8ee84b63e0cc2f7862fae4",
//             "url": "https://outliers-moments.s3.amazonaws.com/user/5d8e5afe63e0cc2f7862fae0JKxTB0X3uxyIZvfZ2d0bK8og3lFw1nMG.jpg"
//           }
//         ],
//         "username": "Anand"
//       }
//     ]
//   }
// ];
const UserNotification = ({ notification, props }) => (
  <View style={styles.allFlatlistRow}>
    <NotificationSwitch notification={notification} props={props} />
  </View>
);

const NotificationSwitch = ({ notification, props }) => {
  switch (notification.sentType) {
    case "account-approved":
      return (
        <NotificationAccountApproved
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
          // user={props.userDetails}
        />
      );
    case "coffee":
      return (
        <NotificationLikeCoffeeGold
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
          // user={props.userDetails}
        />
      );
    case "like":
      return (
        <NotificationLikeCoffeeGold
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
          // user={props.userDetails}
        />
      );
    case "gold_coffee":
      return (
        <NotificationLikeCoffeeGold
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
          // user={props.userDetails}
        />
      );
    case "request":
      return (
        <NotificationRequest
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
          addRequestStatus={props.addRequestStatus}
          user={props.userDetails}
        />
      );
    case "moment-comment":
      return (
        <NotificationMomentVibeCommentReply
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
          user={props.userDetails}
        />
      );
    case "moment-reply":
      return (
        <NotificationMomentVibeCommentReply
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
          user={props.userDetails}
        />
      );
    case "vibe-comment":
      return (
        <NotificationMomentVibeCommentReply
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
          user={props.userDetails}
        />
      );
    case "vibe-reply":
      return (
        <NotificationMomentVibeCommentReply
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
          user={props.userDetails}
        />
      );
    case "moment-like":
      return (
        <NotificationMomentVibeLike
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
          user={props.userDetails}
        />
      );
    case "vibe-like":
      return (
        <NotificationMomentVibeLike
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
          user={props.userDetails}
        />
      );
    case "university-verify-accepted":
      return (
        <NotificationVerify
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
        />
      );
    case "university-verify-rejected":
      return (
        <NotificationVerify
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
        />
      );
    case "occupation-verify-accepted":
      return (
        <NotificationVerify
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
        />
      );
    case "occupation-verify-rejected":
      return (
        <NotificationVerify
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
        />
      );
    case "wealth-verify-accepted":
      return (
        <NotificationVerify
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
        />
      );
    case "wealth-verify-rejected":
      return (
        <NotificationVerify
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
        />
      );
    case "face-verify":
      return (
        <NotificationVerify
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
        />
      );
    case "user-img-update":
      return (
        <NotificationVerify
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
        />
      );
    case "profile-img-update":
      return (
        <NotificationVerify
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
        />
      );
    case "like-accepted":
      return (
        <NotificationRequestLikeAccepted
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
          user={props.userDetails}
        />
      );
    case "like-rejected":
      return (
        <NotificationRequestLikeAccepted
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
          user={props.userDetails}
        />
      );
    case "request-accepted":
      return (
        <NotificationRequestLikeAccepted
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
          user={props.userDetails}
        />
      );
    case "request-rejected":
      return (
        <NotificationRequestLikeAccepted
          updateSeenStatus={props.updateSeenStatus}
          notification={notification}
          user={props.userDetails}
        />
      );
    default:
      return null;
  }
};

const FirstRoute = props => (
  <View style={{ flex: 1 }}>
    <FlatList
      style={styles.FlatListStyle}
      keyExtractor={(item, index) => index.toString()}
      data={props.notifications}
      extraData={props.notifications}
      renderItem={({ item, index }) => {
        return <UserNotification notification={item} props={props} />;
      }}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      ListEmptyComponent={
        <View style={{ alignItems: "center" }}>
          <Text style={{ paddingLeft: 4 }}>
            {props.t("noticeScreenLang:noData")}
          </Text>
        </View>
      }
    />
    <View style={styles.bottomButton}>
      <TouchableOpacity
        onPress={() => {
          NavigationService.navigate("ProfileViewRequest");
        }}
        style={styles.btnYellow}
      >
        <Text style={styles.btnText}>
          {props.t("noticeScreenLang:profileViewReq")}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const PhotoTextOverlay = ({ text }) => {
  // The number of milliseconds in one day
  var ONEDAY = 1000 * 60 * 60 * 24;
  // Convert both dates to milliseconds
  var date1 = new Date();
  var date2 = new Date(text);
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();
  // Calculate the difference in milliseconds
  var difference_ms = Math.abs(date1_ms - date2_ms);

  // Convert back to days and return
  var days = Math.round(difference_ms / ONEDAY);
  days = 7 - days;
  if (days >= 5) {
    return (
      <View
        style={{
          ...styles.overlayTextContainer,
          backgroundColor: config.paleGold
        }}
      >
        <Text style={styles.overlayText}>D-{days}</Text>
      </View>
    );
  } else if (days >= 3 && days < 5) {
    return (
      <View
        style={{
          ...styles.overlayTextContainer,
          backgroundColor: config.pointRed
        }}
      >
        <Text style={styles.overlayText}>D-{days}</Text>
      </View>
    );
  } else if (days < 3 && days > 0) {
    return (
      <View
        style={{
          ...styles.overlayTextContainer,
          backgroundColor: config.pointRed
        }}
      >
        <Text style={styles.overlayText}>D-{days}</Text>
      </View>
    );
  }
};

const SecondRoute = props => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.outerRowPhotoContainer}>
        <Text style={styles.matchText}>
          {" "}
          {props.t("noticeScreenLang:matchedMembers")}{" "}
        </Text>
        <View style={styles.innerPhotoRowContainer}>
          <FlatList
            horizontal={true}
            data={props.matchHistory.accepted}
            extraData={props.matchHistory}
            keyExtractor={(item, index) => item._id}
            renderItem={({ item }) =>
              props.matchHistory.userId === item.receiverId._id ? (
                <TouchableOpacity
                  style={[styles.itemPhotoContainer]}
                  onPress={() =>
                    NavigationService.navigate("ProfileMatched", {
                      id: item.senderId._id
                    })
                  }
                >
                  <Image
                    style={styles.itemPhoto}
                    source={{
                      uri:
                        !!item.senderId && item.senderId.photos.length > 0
                          ? item.senderId.photos[0].url
                          : ""
                    }}
                  />
                  <PhotoTextOverlay text={!!item.senderId && item.createdAt} />
                  <View style={styles.photoBadgeContainer}>
                    {item.sentType !== "like" && (
                      <Image
                        style={styles.badgePhoto}
                        resizeMode="contain"
                        source={item.sentType == "coffee" ? coffee : goldCoffee}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.itemPhotoContainer]}
                  onPress={() =>
                    NavigationService.navigate("ProfileMatched", {
                      id: item.receiverId._id
                    })
                  }
                >
                  <Image
                    style={styles.itemPhoto}
                    source={{
                      uri:
                        !!item.receiverId && item.receiverId.photos.length > 0
                          ? item.receiverId.photos[0].url
                          : ""
                    }}
                  />
                  <PhotoTextOverlay
                    text={!!item.receiverId && item.createdAt}
                  />
                  <View style={styles.photoBadgeContainer}>
                    {item.sentType !== "like" && (
                      <Image
                        style={styles.badgePhoto}
                        resizeMode="contain"
                        source={item.sentType == "coffee" ? coffee : goldCoffee}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              )
            }
            ListEmptyComponent={
              <View style={{ alignItems: "center" }}>
                <Text> {props.t("noticeScreenLang:noHistoryData")} </Text>
              </View>
            }
          />
        </View>
      </View>

      <View style={styles.outerRowPhotoContainer}>
        <Text style={styles.matchText}>
          {" "}
          {props.t("noticeScreenLang:matMemWhoLikMe")}{" "}
        </Text>
        <View style={styles.innerPhotoRowContainer}>
          <FlatList
            horizontal={true}
            data={props.matchHistory.receivedItems}
            extraData={props.matchHistory}
            keyExtractor={(item, index) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemPhotoContainer}
                onPress={() =>
                  NavigationService.navigate("ProfileSendLikeCoffee", {
                    id: !!item.senderId && item.senderId._id
                  })
                }
              >
                <Image
                  style={styles.itemPhoto}
                  source={{
                    uri:
                      !!item.senderId && item.senderId.photos.length > 0
                        ? item.senderId.photos[0].url
                        : ""
                  }}
                />
                <PhotoTextOverlay text={!!item.senderId && item.createdAt} />
                <View style={styles.photoBadgeContainer}>
                  {item.sentType !== "like" && (
                    <Image
                      style={styles.badgePhoto}
                      resizeMode="contain"
                      source={item.sentType == "coffee" ? coffee : goldCoffee}
                    />
                  )}
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View
                style={{
                  alignItems: "center"
                }}
              >
                <Text style={{ paddingLeft: 4 }}>
                  {props.t("noticeScreenLang:noDataRec")}
                </Text>
              </View>
            }
          />
        </View>
      </View>

      <View style={styles.outerRowPhotoContainer}>
        <Text style={styles.matchText}>
          {" "}
          {props.t("noticeScreenLang:memWhoILik")}{" "}
        </Text>
        <View style={styles.innerPhotoRowContainer}>
          <FlatList
            horizontal={true}
            data={props.matchHistory.sentItems}
            extraData={props.matchHistory}
            keyExtractor={(item, index) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.itemPhotoContainer}
                onPress={() =>
                  NavigationService.navigate("ProfileSendLikeCoffee", {
                    id: item.receiverId._id
                  })
                }
              >
                <Image
                  style={styles.itemPhoto}
                  source={{
                    uri:
                      !!item.receiverId && item.receiverId.photos.length > 0
                        ? item.receiverId.photos[0].url
                        : ""
                  }}
                />
                <PhotoTextOverlay
                  text={!!item.receiverId ? item.createdAt : ""}
                />
                <View style={styles.photoBadgeContainer}>
                  {item.sentType !== "like" && (
                    <Image
                      style={styles.badgePhoto}
                      resizeMode="contain"
                      source={item.sentType == "coffee" ? coffee : goldCoffee}
                    />
                  )}
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={{ alignItems: "center" }}>
                <Text style={{ paddingLeft: 4 }}>
                  {props.t("noticeScreenLang:noDataSen")}
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

class NoticeScreen extends Component {
  willFocusSubscription;
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      newUpdates1: 0,
      newUpdates2: 1,
      routes: [
        {
          key: "first",
          title: this.props.t("noticeScreenLang:all"),
          isSeen: 1
        },
        {
          key: "second",
          title: this.props.t("noticeScreenLang:history"),
          isSeen: 0
        }
      ],
      notifications: [],
      matchHistory: {
        accepted: [],
        receivedItems: [],
        sentItems: []
      },
      historyDot: true
    };
  }

  async componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      async () => {
        this.props.getProfileNotification();
        this.props.getProfileMatchHistory();
        this.props.getPaymentInfo();
      }
    );
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.notifications != nextProps.notifications) {
      this.setState({ notifications: nextProps.notifications });
    }
    if (this.props.matchHistory != nextProps.matchHistory) {
      this.setState({ matchHistory: nextProps.matchHistory });
    }

    if (
      this.props.profileRequestStatus.status !=
        nextProps.profileRequestStatus.status &&
      nextProps.profileRequestStatus.status == 2
    ) {
      this.props.getProfileNotification();
      this.props.getProfileMatchHistory();
    }
  }

  _renderTabBar = props => {
    const { newUpdates } = this.state;
    return (
      <Fragment>
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
                    index: i,
                    historyDot: false
                  })
                }
              >
                <View style={styles.tabTextContainer}>
                  <Text style={styles.tabTitleText}>{route.title}</Text>
                  {!route.isSeen &&
                  (this.state.matchHistory.accepted.length > 0 ||
                    this.state.matchHistory.receivedItems.length > 0 ||
                    this.state.matchHistory.sentItems.length > 0) ? (
                    <Text style={styles.seenStatusContainer}>
                      {this.state.matchHistory.newCount &&
                        this.state.matchHistory.newCount.accepted +
                          this.state.matchHistory.newCount.sentItems +
                          this.state.matchHistory.newCount.receivedItems >
                          0 &&
                        this.state.historyDot &&
                        " . "}
                    </Text>
                  ) : (
                    <Text />
                  )}
                </View>
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
        return <FirstRoute {...this.props} />;
      case "second":
        return <SecondRoute {...this.props} />;
      default:
        return (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" />
          </View>
        );
    }
    updateSeenStatus;
  };

  renderHeader = () => {
    return (
      <TopBarHeader
        tintColor={config.navyBlack}
        sectionTitle={this.props.t("noticeScreenLang:notice")}
        isClover={true}
        cloverIcon={cloverIcon}
        noOfClover={parseInt(
          !!this.props.paymentData[0] && !!this.props.paymentData[0].cloversleft
            ? this.props.paymentData[0].cloversleft
            : 0
        )}
        onPressRightAction={() => {
          this.props.navigation.navigate("Store");
        }}
        action="back"
      />
    );
  };

  render() {
    return (
      <Fragment>
        <View style={styles.container}>
          <TabView
            {...this.props}
            navigationState={this.state}
            renderScene={this._renderScene}
            renderTabBar={this._renderTabBar}
            onIndexChange={index => this.setState({ index })}
          />
        </View>
      </Fragment>
    );
  }
}

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
  outerRowPhotoContainer: {
    width,
    height: 200,
    padding: 10
  },
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
    opacity: 0.8,
    backgroundColor: config.paleGold
  },
  itemPhoto: {
    flex: 1,
    borderRadius: 7
  },
  itemPhotoContainer: {
    minWidth: width / 3 - 18,
    flex: 1,
    marginTop: 10,
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
    color: config.brownishGrey,
    paddingLeft: 10
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
    lineHeight: 12,
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
    marginVertical: 5,
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
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
    width: "20%",
    borderColor: "yellow",
    borderWidth: 2
  },
  profilePicStyle: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  tabTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    notifications: state.profile.notifications,
    matchHistory: state.profile.matchHistory,
    profileRequestStatus: state.profile.profileRequestStatus,
    paymentData: state.store.paymentData,
    userDetails: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfileNotification: () => dispatch(getProfileNotification()),
    getProfileMatchHistory: () => dispatch(getProfileMatchHistory()),
    addRequestStatus: request => dispatch(addRequestStatus(request)),
    updateSeenStatus: data => dispatch(updateSeenStatus(data)),
    getPaymentInfo: () => dispatch(getPaymentInfo()),
    getUserInfo: () => dispatch(AuthActions.getUserInfo())
  };
};

const NoticeScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(NoticeScreen));

export default withNamespaces(["common", "noticeScreenLang"], {
  wait: true
})(NoticeScreenHOC);
