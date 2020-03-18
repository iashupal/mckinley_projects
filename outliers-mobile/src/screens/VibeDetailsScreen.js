import React, { Fragment, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  BackHandler
} from "react-native";

import TopBarHeader from "@components/TopBarHeader";
import Modal from "@components/CustomModal";
import config from "@src/config";

import ReportIcon from "@assets/images/btnReport1.png";
import ReplyIcon from "@assets/images/ic_reply_outline.png";
import LikeIcon from "@assets/images/ic_like_outline.png";
import alreadyLikedIcon from "@assets/images/btnLikeVibeOn.png";
import lockVibe from "@assets/images/icLockPhoto.png";
import icClover from "@assets/images/ic_clover.png";

import UserBasicInfo from "@components/UserBasicInfo";

import { connect } from "react-redux";
import {
  initiateListVibeDetails,
  getUserVibeList,
  addMomentVibeFollow,
  addMomentVibeUnFollow,
  sendProfileLikeCoffee,
  updatePaymentInfo,
  getPaymentInfo
} from "../store/actions";
import WithLoaderStatus from "../components/HOC/withLoaderStatus";
import { withNamespaces } from "react-i18next";

class VibesDetailScreen extends Component {
  willFocusSubscription;
  getParams = {};
  constructor(props) {
    super(props);
    this.state = {
      showProfile: false,
      listVibeDetails: {},
      listVibeDetailsLoaded: false,
      userId: "",
      hasgtags: ""
    };
  }

  async componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.fetchData();
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
    if (this.props.listVibeDetails != nextProps.listVibeDetails) {
      this.setState(
        {
          listVibeDetails: nextProps.listVibeDetails,
          listVibeDetailsLoaded: true
        },
        () => {
          let hashtags = [];
          let hash = nextProps.listVibeDetails.Body[0].hashtags.split(",");
          hash.map(element => {
            if (element !== "") {
              hashtags.push("#" + element);
            }
          });
          let x = hashtags.join(", ");
          this.setState({ hasgtags: x });
        }
      );
    }
    if (
      (this.props.momentVibeFollowStatus.status !=
        nextProps.momentVibeFollowStatus.status &&
        nextProps.momentVibeFollowStatus.status == 2) ||
      (this.props.momentVibeUnFollowStatus.status !=
        nextProps.momentVibeUnFollowStatus.status &&
        nextProps.momentVibeFollowStatus.status == 2)
    ) {
      this.props.initiateListVibeDetails(this.getParams);
    }

    if (
      this.props.profileLikeCoffeeStatus.status !=
        nextProps.profileLikeCoffeeStatus.status &&
      nextProps.profileLikeCoffeeStatus.status == 2
    ) {
      if (nextProps.listVibeDetails.profileRequest.status === "pending") {
        Alert.alert(
          this.props.t("common:app.error"),
          this.props.t("vibeDetailScreen:notAccepted")
        );
      } else if (
        nextProps.listVibeDetails.profileRequest.status === "rejected"
      ) {
        Alert.alert(
          this.props.t("common:app.error"),
          this.props.t("vibeDetailScreen:rejected")
        );
      } else {
        // TODO: FIX THIS ALERT
        Alert.alert(
          "",
          this.props.t("vibeDetailScreen:reqSent"),
          [
            {
              text: "OK",
              onPress: () => {
                this.props.navigation.pop();
              }
            }
          ],
          { cancelable: false }
        );
        // this.props.navigation.navigate('ProfileSendLikeCoffee', { id: nextProps.listVibeDetails.Body[0].userId, backRoute: 'VibeDetails' });
      }
    }
    this.setState({ userId: nextProps.userId });
  }

  fetchData = () => {
    this.getParams = {
      id: this.props.navigation.getParam("id", "")
    };
    this.props.initiateListVibeDetails(this.getParams);
    this.props.getPaymentInfo();
  };

  comments = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("ProfileComments", {
            id: this.props.navigation.getParam("id", ""),
            ownerId: this.state.listVibeDetails.Body[0].userId
          });
        }}
        style={styles.likesContainer}
      >
        <Image style={styles.buttonIcon} source={ReplyIcon} />
        <Text> {this.state.listVibeDetails.Body[0].numberOfComments || 0}</Text>
      </TouchableOpacity>
    );
  };

  likes = follow => {
    return (
      <TouchableOpacity
        style={styles.likesContainer}
        onPress={() => {
          if (follow) {
            this.props.addMomentVibeUnFollow({
              id: this.state.listVibeDetails.Body[0]._id,
              unfollowTo: "vibe"
            });
          } else {
            this.props.addMomentVibeFollow({
              id: this.state.listVibeDetails.Body[0]._id,
              followTo: "vibe"
            });
          }
        }}
      >
        <Image
          style={[
            styles.buttonIcon,
            { tintColor: follow ? "#f83447" : config.greyishBrown }
          ]}
          source={follow ? alreadyLikedIcon : LikeIcon}
        />
        <Text>
          {" "}
          {this.state.listVibeDetails.Body[0].numberOfFollowers || 0}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    const { showProfile, listVibeDetails, listVibeDetailsLoaded } = this.state;
    const { t, paymentData } = this.props;

    return (
      <Fragment>
        <Modal
          transparent={true}
          visible={this.state.showProfile}
          hasTwo
          onPress1={() => {
            this.setState({ showProfile: false });
          }}
          buttonText1={t("vibeDetailScreen:requestUserModal.btnOneText")}
          // buttonText2={t('vibeDetailScreen:requestUserModal.btnTwoText')}
          buttonText2={
            <Fragment style={styles.cloveContainer}>
              <Text>{t("vibeDetailScreen:requestUserModal.btnTwoText")}</Text>
              <Image style={styles.cloveImage} source={icClover} />
              <Text style={styles.cloveText}>x 2</Text>
            </Fragment>
          }
          onPress2={() => {
            if (
              !!paymentData[0] &&
              !!paymentData[0].cloversleft &&
              paymentData[0].cloversleft > 0
            ) {
              this.setState({ showProfile: false });
              this.props.sendProfileLikeCoffee({
                receiverId: listVibeDetails.Body[0].userId,
                sentType: "request",
                message: ""
              });
              this.props.updatePaymentInfo({
                id:
                  !!paymentData[0] &&
                  !!paymentData[0]._id &&
                  paymentData[0]._id,
                cloversleft: JSON.stringify(
                  parseInt(
                    !!paymentData[0] &&
                      !!paymentData[0].cloversleft &&
                      paymentData[0].cloversleft
                  ) - 2
                )
              });
            } else {
              this.setState({ showProfile: false }, () => {
                Alert.alert(
                  t("common:app.error"),
                  t("vibeDetailScreen:notEngClv")
                );
                this.props.navigation.navigate("Store");
              });
            }
          }}
          onClose={() => {
            this.setState({ showProfile: false });
          }}
        >
          <View style={styles.innerModalContainer}>
            {/* <Image style={styles.headerImage} source={imgStopVibe} /> */}
            <Text style={styles.textHeader}>
              {t("vibeDetailScreen:requestUserModal.message")}
              {/* 프로필 열람을 요청하시겠습니까? */}
            </Text>
          </View>
        </Modal>
        {listVibeDetailsLoaded && (
          <TopBarHeader
            sectionHeader={
              <UserBasicInfo user={listVibeDetails.Body[0].user[0]} />
            }
            action="close"
            isVibe={true}
            onPressRightAction={() => {
              if (
                this.state.listVibeDetails.Body[0].userId === this.state.userId
              ) {
                this.props.navigation.navigate("My", {
                  backRoute: "VibeDetails"
                });
                // if seeing own vibe detail screen
              } else if (
                listVibeDetails.Body[0].user[0].profileStatus === "public"
              ) {
                /*this.props.navigation.navigate("ProfileSendLikeCoffee", {
                  id: listVibeDetails.Body[0].userId,
                  backRoute: "VibeDetails"
                });*/
                if (listVibeDetails.likeRequest.hasOwnProperty("status")) {
                  if (listVibeDetails.likeRequest.status === "accepted") {
                    this.props.navigation.navigate("ProfileMatched", {
                      id: listVibeDetails.Body[0].userId,
                      backRoute: "VibeDetails"
                    });
                  } else {
                    this.props.navigation.navigate("ProfileSendLikeCoffee", {
                      id: listVibeDetails.Body[0].userId,
                      backRoute: "VibeDetails"
                    });
                  }
                } else {
                  this.props.navigation.navigate("ProfileSendLikeCoffee", {
                    id: listVibeDetails.Body[0].userId,
                    backRoute: "VibeDetails"
                  });
                }
                ////
              } else {
                if (listVibeDetails.profileRequest.hasOwnProperty("status")) {
                  // pending , accepted or rejected
                  if (listVibeDetails.profileRequest.status === "pending") {
                    Alert.alert(
                      this.props.t("common:app.error"),
                      this.props.t("vibeDetailScreen:notAccepted")
                    );
                  } else if (
                    listVibeDetails.profileRequest.status === "rejected"
                  ) {
                    Alert.alert(
                      this.props.t("common:app.error"),
                      this.props.t("vibeDetailScreen:rejected")
                    );
                  } else if (
                    listVibeDetails.profileRequest.status === "accepted"
                  ) {
                    if (listVibeDetails.likeRequest.hasOwnProperty("status")) {
                      if (listVibeDetails.likeRequest.status === "accepted") {
                        this.props.navigation.navigate("ProfileMatched", {
                          id: listVibeDetails.Body[0].userId,
                          backRoute: "VibeDetails"
                        });
                      } else {
                        this.props.navigation.navigate(
                          "ProfileSendLikeCoffee",
                          {
                            id: listVibeDetails.Body[0].userId,
                            backRoute: "VibeDetails"
                          }
                        );
                      }
                    } else {
                      this.props.navigation.navigate("ProfileSendLikeCoffee", {
                        id: listVibeDetails.Body[0].userId,
                        backRoute: "VibeDetails"
                      });
                    }
                  }
                } else {
                  this.setState({ showProfile: true });
                }
              }
            }}
            lockVibe={
              listVibeDetails.Body[0].user[0].profileStatus !== "public" &&
              this.state.listVibeDetails.Body[0].userId !== this.state.userId
                ? !!listVibeDetails &&
                  !!listVibeDetails.profileRequest &&
                  listVibeDetails.profileRequest.status !== "accepted"
                  ? lockVibe
                  : undefined
                : undefined
            }
            // TODO no need below condition
            vibeProfile={
              listVibeDetails.Body[0].user[0].photos.length > 0
                ? listVibeDetails.Body[0].user[0].photos[0].url
                : ""
            }
          />
        )}
        {listVibeDetailsLoaded && (
          <Image
            style={styles.vibeImage}
            source={{
              uri:
                !!listVibeDetails.Body[0] &&
                listVibeDetails.Body[0].photos[0].url
            }}
          />
        )}
        <View style={styles.vibeInfo}>
          {listVibeDetailsLoaded && (
            <Text style={styles.vibeInfoText}>
              {this.state.hasgtags ? this.state.hasgtags : ""}
            </Text>
          )}
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("VibeReport", {
                userId: this.state.listVibeDetails.Body[0].userId,
                type: 'Vibe',
                vibeOrMomentId: this.state.listVibeDetails.Body[0]._id
              })
            }
          >
            <Image
              style={[styles.buttonIcon, { tintColor: config.white }]}
              source={ReportIcon}
            />
          </TouchableOpacity>
        </View>
        {listVibeDetailsLoaded && (
          <View style={styles.buttonContainer}>
            {/* <ActionButton
					text="바이브 더보기"
					onPress1={() => props.navigation.navigate('VibeDetails')}
					customStyle={{
						touchableStyle: styles.buttonStyle
					}}
				/> */}
            {this.state.listVibeDetails.Body[0].userId !==
              this.state.userId && (
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  this.props.getUserVibeList({
                    id: this.state.listVibeDetails.Body[0].userId,
                    offset: 0
                  });
                  this.props.navigation.navigate("VibeMy", {
                    userId: this.state.listVibeDetails.Body[0].userId,
                    vibeDetails: this.state.listVibeDetails.Body[0],
                    listVibeDetails: this.state.listVibeDetails,
                    navigation: this.props.navigation
                  });
                }}
              >
                <Text style={styles.buttonText}>
                  {t("vibeDetailScreen:moreVibes")}
                </Text>
              </TouchableOpacity>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                flex: 1
              }}
            >
              {this.comments()}
              {this.likes(listVibeDetails.isFollow)}
            </View>
          </View>
        )}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  cloveText: {
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
    tintColor: config.white
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
  },
  textHeader: {
    fontFamily: config.regularFont,
    fontStyle: "normal",
    marginBottom: 4,
    letterSpacing: 0,
    textAlign: "center",
    color: config.black,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22
  },
  innerModalContainer: {
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap"
  },
  sectionTitle: {
    width: 80,
    height: 40,
    backgroundColor: config.lightGreyBg,
    borderRadius: 100
  },
  vibeImage: {
    flex: 1
  },
  vibeInfo: {
    bottom: 64,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    flexDirection: "row",
    paddingHorizontal: 20
  },
  vibeInfoText: {
    color: "white",
    fontSize: 15,
    flex: 3
  },
  buttonIcon: {
    width: 24,
    height: 24,
    tintColor: config.greyishBrown,
    resizeMode: "contain"
  },
  buttonStyle: {
    height: 36,
    backgroundColor: config.charcoal_grey,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 3,
    alignItems: "center",
    paddingHorizontal: 48
  },
  buttonContainer: {
    flexDirection: "row",
    marginHorizontal: 0,
    paddingVertical: 9,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "space-between"
  },
  likesContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  buttonText: {
    color: "white",
    fontFamily: config.regularFont,
    fontWeight: "500",
    fontSize: 14
  }
});

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    listVibeDetails: state.vibes.listVibeDetails,
    userId: state.auth.user._id,
    momentVibeFollowStatus: state.momentVibeComments.momentVibeFollowStatus,
    momentVibeUnFollowStatus: state.momentVibeComments.momentVibeUnFollowStatus,
    profileLikeCoffeeStatus: state.profile.profileLikeCoffeeStatus,
    paymentData: state.store.paymentData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initiateListVibeDetails: id => dispatch(initiateListVibeDetails(id)),
    getUserVibeList: params => dispatch(getUserVibeList(params)),
    addMomentVibeFollow: vibe => dispatch(addMomentVibeFollow(vibe)),
    addMomentVibeUnFollow: vibe => dispatch(addMomentVibeUnFollow(vibe)),
    sendProfileLikeCoffee: profile => dispatch(sendProfileLikeCoffee(profile)),
    updatePaymentInfo: profile => dispatch(updatePaymentInfo(profile)),
    getPaymentInfo: () => dispatch(getPaymentInfo())
  };
};

const VibesDeatilScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(VibesDetailScreen));

export default withNamespaces(["common", "vibeDetailScreen"], { wait: true })(
  VibesDeatilScreenHOC
);
