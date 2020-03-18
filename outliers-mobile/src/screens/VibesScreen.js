import React, { Fragment, useState, Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  FlatList,
  Dimensions,
  AsyncStorage,
  Alert,
  ActivityIndicator,
  BackHandler
} from "react-native";

// Import components
import TopBarHeader from "@components/TopBarHeader";
import api from "@services/AuthApiService";
import Vibe from "@components/Vibe";
import SegmentButtons from "@components/SegmentButtons";
import HorizontalFlatList from "@components/HorizontalFlatList";
import TagMatching from "@components/TagMatching";
import ImageProgress from "@components/ImageProgress";
import BottomInterestModal from "@components/bottom-interest-modal";
// Import assets
import AlarmIcon from "@assets/images/btn_alarm.png";
import AddVibeIcon from "@assets/images/btn_add_moment.png";
import SearchIcon from "@assets/images/ic_search.png";
import icClose from "@assets/images/ic_close.png";
import icLevel1 from "@assets/images/ic_level_1.png";
import icLevel2 from "@assets/images/ic_level_2.png";
import icBlack1 from "@assets/images/ic_black_1.png";
import icBlack2 from "@assets/images/ic_black_2.png";
import icBlack3 from "@assets/images/ic_black_3.png";
import lockImage from "@assets/images/icLockWhite.png";
import ActionButton from "@components/ActionButton";
import iconhashtag from "@assets/images/icHashtag.png";
import Modal from "@components/CustomModal";
import Modal1 from "@components/HashtagModal";
import config from "@src/config";
import func from "../services/VibesApiService";
import AuthFunc from "../services/AuthApiService";

import FollowingIcon from "@assets/images/ic_following_list.png";
import imgJoy from "@assets/images/imgPlane.png";
import { connect } from "react-redux";
import {
  initiateListVibes,
  initiateListMyVibes,
  getMatchedVibes,
  setMatchedVibes
} from "../store/actions";
import AuthActions from "../store/redux/auth";
import WithLoaderStatus from "../components/HOC/withLoaderStatus";

import { getAge, getSex } from "@utils/utility";
import Level from "../components/Level";
import { withNamespaces } from "react-i18next";

const { width } = Dimensions.get("window");

class VibesScreen extends Component {
  willFocusSubscription;
  didFocusSubscription;
  didBlurSubscription;
  constructor(props) {
    super(props);
    this.state = {
      isMySelected: false,
      matchedVibes: [],
      listVibes: [],
      listMyVibes: { Body: [], user: { interestedHashtags: [] } },
      userPhotos: [],
      getParams: {
        offset: 0,
        sexFilter: "",
        isFollow: 0,
        search: "",
        // page: 0,
        limit: 6
      },
      bottomModalVisible: false,
      welcomeEmailNodal: false,
      publicProfileModal: false,
      privateProfileModal: false,
      publicProfile: {},
      privateProfile: [],
      loadMore: false,
      initialLoad: true,
      searchCleared: true,
      searchedCount: 0
    };
  }

  getVibes = async () => {
    const { getParams } = this.state;
    let token = await AsyncStorage.getItem("@token:key");

    if (
      this.state.initialLoad &&
      !this.state.loadMore &&
      getParams.offset === 0
    ) {
      let res = await func.listVibes(token, getParams);
      this.setState({
        initialLoad: false,
        listVibes: [...res.data.Body],
        searchedCount: res.data.searchDocsCount
      });
    } else if (
      this.state.loadMore &&
      !this.state.initialLoad &&
      getParams.offset >= 6
    ) {
      let res = await func.listVibes(token, getParams);
      this.setState({
        listVibes: [...this.state.listVibes, ...res.data.Body],
        loadMore: false
      });
    }
  };

  getThreeMatchedVibes = async () => {
    const { getParams } = this.state;
    let token = await AsyncStorage.getItem("@token:key");
    let res = await func.getMatchedVibesList(token, getParams);
    this.setState({
      matchedVibes: [...this.sortMatchedVibes([...res.data.Body])]
    });
  };

  getMyVibes = async () => {
    const { getParams } = this.state;
    let token = await AsyncStorage.getItem("@token:key");
    let res = await func.listMyVibes(token);
    this.setState({ listMyVibes: { ...res.data } });
  };

  sortMatchedVibes = vibes => {
    let vibesRes = [...vibes];
    sortedVibes = vibesRes.sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
    return [...sortedVibes];
  };

  deleteVibe = async id => {
    Alert.alert(
      this.props.t("common:app.warning"),
      this.props.t("common:app.wanttodelete"),
      [
        {
          text: this.props.t("common:app.no"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: this.props.t("common:app.yes"),
          onPress: async () => {
            let token = await AsyncStorage.getItem("@token:key");
            const response = await api.deleteVibe(token, id);
            console.log("status-----", response.status);
            if (response.status === 200) {
              Alert.alert(this.props.t("vibes:delete"));
              this.getMyVibes();
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  registrationStatus = async () => {
    let token = await AsyncStorage.getItem("@token:key");
    const res = await AuthFunc.registrationStatus(token);
    const { registrationStatus } = res.data.Body;
    if (registrationStatus === 'Complete') {
      return true;
    } else if (registrationStatus === 'WelcomeScreen') {
      this.setState({ welcomeEmailNodal: true });
    } else {
      this.props.navigation.navigate(registrationStatus);
    }
  }

  checkWelcomeStatus = async () => {
    let token = await AsyncStorage.getItem("@token:key");
    response = await api.checkWelcomeStatus(token);
    // if (response.data.Body == "0") {
    //   this.setState({ welcomeEmailNodal: true });
    // }
    // this.setState({ welcomeEmailNodal: true });
  };
  showPublicProfile = async () => {
    var d = new Date();
    var ampm = d.getHours() >= 12 ? "PM" : "AM";
    var hours = d.getHours() >= 12 ? d.getHours() - 12 : d.getHours();
    var time = hours + ":" + d.getMinutes() + "" + ampm;
    let token = await AsyncStorage.getItem("@token:key");
    if (time == "7:00AM") {
      response = await api.getPublicProfile(token);

      if (response.status === 200) {
        if (response.data.Body.length > 0) {
          this.setState({ publicProfile: response.data.Body[0] }, () =>
            this.setState({ publicProfileModal: true })
          );
        }
      }
    }
  };
  showPrivateProfile = async () => {
    var d = new Date();
    var ampm = d.getHours() >= 12 ? "PM" : "AM";
    var hours = d.getHours() >= 12 ? d.getHours() - 12 : d.getHours();
    var time = hours + ":" + d.getMinutes() + "" + ampm;
    let token = await AsyncStorage.getItem("@token:key");
    if (time == "7:00PM") {
      response = await api.getPrivateProfile(token);
      if (response.status === 200) {
        if (response.data.Body.length > 0) {
          this.setState({ privateProfile: response.data.Body[0] }, () =>
            this.setState({ privateProfileModal: true })
          );
        }
      }
    }
  };

  updateInterestTags = async tags => {
    if (tags.length !== this.props.interestedHashtags.length) {
      let token = await AsyncStorage.getItem("@token:key");
      let res = await AuthFunc.updateInterestTags(token, {
        interestedHashtags: [...tags]
      });
      // this.props.updateUserProfile({ username: this.props.username, interestedHashtags: tags.length > 0 ? tags.join(",") : "" });
      this.getMyVibes();
    }
  };

  applySexFilter = async sexFilter => {
    await this.setState({ listVibes: [] });
    if (sexFilter === "Following") {
      const { getParams } = this.state;
      getParams.sexFilter = "";
      getParams.isFollow = 1;
      getParams.offset = 0;
      this.setState(
        { getParams, initialLoad: true, listVibes: [], loadMore: false },
        () => this.getVibes()
      );
    } else {
      const { getParams } = this.state;
      getParams.sexFilter = sexFilter;
      getParams.isFollow = 0;
      getParams.offset = 0;
      this.setState(
        { getParams, initialLoad: true, listVibes: [], loadMore: false },
        () => this.getVibes()
      );
    }
  };

  handleLoadMore = getParams => {
    this.setState({ getParams }, () => {
      this.getVibes();
    });
  };

  putUserDetails = async data => {
    let token = await AsyncStorage.getItem("@token:key");
    const res = await AuthFunc.putUserDetails(token, data);
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.navigation.goBack(null);
      return true;
    });
    this.registrationStatus();
    this.checkWelcomeStatus();
    this.showPublicProfile();
    this.showPrivateProfile();
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.props.getUserInfo();
      }
    );

    this.getVibes();

    this.getThreeMatchedVibes();
    this.getMyVibes();
    // setInterval(() => {
    //   this.getThreeMatchedVibes();
    // }, 60000);
  }

  componentWillUnmount() {
    this.willFocusSubscription && this.willFocusSubscription.remove();
  }

  async componentWillReceiveProps(nextProps) {
    // if (this.props.listMyVibes != nextProps.listMyVibes) {
    //   this.setState({ listMyVibes: nextProps.listMyVibes });
    // }
    this.getMyVibes();
    this.setState({ userPhotos: nextProps.userPhotos });
    this.didBlurSubscription = this.props.navigation.addListener(
      "didBlur",
      () => {
        this.clearSearch();
      }
    );
    this.didFocusSubscription = this.props.navigation.addListener(
      "didFocus",
      () => {
        this.registrationStatus();
      }
    );
  }

  searched = async search => {
    await this.setState({ listVibes: [] });
    const { getParams } = this.state;
    getParams.search = search;
    getParams.offset = 0;
    this.setState(
      { getParams, initialLoad: true, listVibes: [], loadMore: false },
      () => this.getVibes()
    );
  };

  clearSearch = async () => {
    await this.setState({ listVibes: [] });
    const { getParams } = this.state;
    getParams.search = "";
    getParams.offset = 0;
    this.setState(
      { getParams, initialLoad: true, listVibes: [], loadMore: false },
      () => this.getVibes()
    );
  };

  render() {
    const userProfilePic =
      this.state.userPhotos && this.state.userPhotos.length > 0
        ? this.state.userPhotos[0].url
        : config.dafaultUser;
    const { isMySelected, listVibes, listMyVibes } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <View style={styles.navBar}>
          <TopBarHeader
            onPressLeftAction={() => {
              this.clearSearch();
              this.props.navigation.navigate("My", { backRoute: "VibesMain" });
            }}
            sectionHeader={
              <SegmentButtons
                onPressSegement={selected => {
                  this.setState({ isMySelected: selected });
                  this.props.getUserInfo();
                }}
              />
            }
            profileImage={userProfilePic}
            alarmIcon={AlarmIcon}
          // showBadge={true}
          />
          {!isMySelected ? (
            <View style={styles.secondBar}>
              <TouchableOpacity
                onPress={() => {
                  this.clearSearch();
                  this.props.navigation.navigate("SearchVibe", {
                    search: res => this.searched(res)
                  });
                }}
                style={styles.searchContainer}
              >
                <Image source={SearchIcon} style={styles.searchIconImage} />
                <TouchableOpacity
                  onPress={() => {
                    this.clearSearch();
                    this.props.navigation.navigate("SearchVibe", {
                      search: res => this.searched(res)
                    });
                  }}
                >
                  <TextInput
                    placeholder={t("vibes:searchPh")}
                    style={styles.searchInput}
                    placeholderTextColor={config.lightGrey}
                    editable={false}
                    pointerEvents="none"
                    value={this.state.getParams.search}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
              <HorizontalFlatList
                applySexFilter={sex => this.applySexFilter(sex)}
              />
            </View>
          ) : (
              <Fragment>
                <ScrollView>
                  <View style={styles.userInfo}>
                    <Image
                      style={styles.profileImage}
                      source={{
                        uri:
                          !!listMyVibes.user.photos &&
                            listMyVibes.user.photos.length > 0
                            ? listMyVibes.user.photos[0].url
                            : ""
                      }}
                    />
                    <View style={styles.profileText}>
                      <View style={styles.userInfoContainer}>
                        {/* LEVEL */}
                        {/* <View style={styles.roundNumberContainer}>
                      <Text style={styles.roundNumberText}>
                        {' '}1{' '}
                      </Text>
                    </View> */}
                        <Level
                          level={this.props.level}
                          levelType={this.props.levelType}
                        />
                        <Text
                          style={[styles.userInfoText, { maxWidth: width * 0.6 }]}
                        >
                          {getAge(listMyVibes.user.dob)},{" "}
                          {getSex(listMyVibes.user.sex)},{" "}
                          {listMyVibes.user.college}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginVertical: 5,
                          // flexDirection: "row",
                          maxWidth: width * 0.7
                        }}
                      >
                        {/* <View
                        style={{
                          marginVertical: 5,
                          flexDirection: 'row',
                          maxWidth: width * 0.7
                        }}
                      >
                        <View
                          style={{
                            ...styles.aboutUserContainer,
                            borderColor: config.goldYellow,
                            marginHorizontal: 5
                          }}
                        >
                          {' '}
                          {t('vibes:salary')}
                        </Text>
                      </View> */}
                        <View
                          style={{
                            ...styles.aboutUserContainer,
                            borderColor: config.goldYellow,
                            marginRight: 5,
                            marginBottom: 5,
                            display:
                              this.props.wealthVerified !== "accepted" ||
                                !this.props.wealthCriteria
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
                            {this.props.wealthVerified === "accepted"
                              ? this.props.wealthCriteria.replace("#", "")
                              : ""}
                          </Text>
                        </View>
                        {/* <View style={[styles.aboutUserContainer]}>
                          <Text style={styles.aboutUserText}>
                            {' '}
                            {this.props.appearanceVerified
                              ? 'Photo Verified'
                              : 'Photo unverified'}{' '}
                          </Text>
                        </View> */}
                        {this.props.appearanceVerified && (
                          <View style={styles.aboutUserContainer}>
                            <Text style={styles.aboutUserText}>
                              {this.props.appearanceVerified
                                ? t("common:myScreen.photoVerified")
                                : ""}
                            </Text>
                          </View>
                        )}
                      </View>
                      <View
                        style={[
                          styles.userInterestsContainer,
                          { maxWidth: width * 0.7 }
                        ]}
                      >
                        {listMyVibes.user.interestedHashtags.map(
                          (item, index) => (
                            <View key={index} style={styles.interestContainer}>
                              <Text style={styles.interestText}>
                                {" "}
                                {"#"}
                                {item}{" "}
                              </Text>
                            </View>
                          )
                        )}
                      </View>
                    </View>
                  </View>
                  <View style={styles.followContainer}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          bottomModalVisible: !this.state.bottomModalVisible
                        });
                      }}
                      style={styles.followButtonContainer}
                    >
                      <View style={styles.hashtag}>
                        <Image
                          style={{
                            alignItems: "center",
                            marginTop: 0,
                            marginRight: 5,
                            width: 18,
                            height: 18
                          }}
                          source={iconhashtag}
                        />
                        <Text style={styles.followButtonText}>
                          {t("vibes:Interest")}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.clearSearch();
                        this.props.navigation.navigate("FollowingList");
                      }}
                      style={[styles.followButtonContainer, { marginLeft: 10 }]}
                    >
                      <View style={styles.followContainer}>
                        <Image
                          source={FollowingIcon}
                          style={{ height: 20, width: 20, marginRight: 4 }}
                          resizeMode="contain"
                        />
                        <Text style={styles.followButtonText}>
                          {t("vibes:followingList")}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <FlatList
                    style={[styles.listViewContent]}
                    data={listMyVibes.Body}
                    extraData={listMyVibes}
                    keyExtractor={({ index }) => `${index}`}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            this.clearSearch();
                            this.props.navigation.navigate("VibeDetails", {
                              id: item._id
                            });
                          }}
                          style={styles.vibeContainer}
                        >
                          <TouchableOpacity
                            style={{
                              zIndex: 100,
                              width: 20,
                              height: 20,
                              position: "absolute",
                              top: 8,
                              right: 8,
                              backgroundColor: "rgba(0, 0, 0, 0.6)",
                              borderRadius: 2
                            }}
                            onPress={() => {
                              console.log("delete vibe id ", item._id);
                              return this.deleteVibe(item._id);
                            }}
                          >
                            <TouchableOpacity
                              style={{
                                width: "100%",
                                height: "100%",
                                resizeMode: "contain",
                                tintColor: config.white
                              }}
                              onPress={() => {
                                console.log("delete vibe id ", item._id);
                                return this.deleteVibe(item._id);
                              }}
                            >
                              <Image
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  resizeMode: "contain",
                                  tintColor: config.white
                                }}
                                source={icClose}
                              />
                            </TouchableOpacity>
                            <ImageProgress
                              style={styles.vibeImage}
                              source={{
                                uri: item && item.photos && item.photos.length > 0 ? item.photos[0].url : ""
                              }}
                            />
                          </TouchableOpacity>
                          <ImageProgress
                            style={styles.vibeImage}
                            source={{ uri: item && item.photos && item.photos.length > 0 ? item.photos[0].url : "" }}
                          />
                        </TouchableOpacity>
                      );
                    }}
                    numColumns={2}
                    ListEmptyComponent={
                      <View style={{ alignItems: "center" }}>
                        <Text>{t("vibes:noData")}</Text>
                      </View>
                    }
                  />
                  <BottomInterestModal
                    t={t}
                    updateTags={res => this.updateInterestTags(res)}
                    userHashtags={this.props.interestedHashtags}
                    username={this.props.username}
                    interestedHashtags={this.props.interestedHashtags}
                    modalVisible={this.state.bottomModalVisible}
                    onPress={() => {
                      this.setState({
                        bottomModalVisible: !this.state.bottomModalVisible
                      });
                    }}
                  />
                </ScrollView>
              </Fragment>
            )}
        </View>

        {!isMySelected && (
          <View style={styles.container}>
            {/* {!isMySelected && (
              <TagMatching
                t={t}
                matchedVibesList={this.state.matchedVibes}
                navigatevibe={this.props.navigation.navigate}
                switchVibes={() => this.getThreeMatchedVibes()}
              />
            )} */}
            <View style={styles.contentContainer}>
              <FlatList
                data={listVibes.filter((item, index) => {
                  if (this.state.getParams.search !== "") {
                    if (this.state.searchedCount === 0) {
                      if (index < 6) {
                        return item;
                      }
                    } else {
                      if (index < this.state.searchedCount) {
                        return item;
                      }
                    }
                  } else {
                    return item;
                  }
                })}
                // extraData={listVibes}
                keyExtractor={(item, index) => item._id}
                numColumns={2}
                renderItem={({ item }) => (
                  <Vibe
                    onPress={() => {
                      this.clearSearch();
                      this.props.navigation.navigate("VibeDetails", {
                        id: item._id
                      });
                    }}
                    image={item && item.photos && item.photos.length > 0 ? item.photos[0].url : ""}
                    user={item && item.user && item.user.length > 0 ? item.user[0] : ''}
                    vibeDetails={item}
                  />
                )}
                ListEmptyComponent={
                  <View style={{ alignItems: "center" }}>
                    <Text>{t("vibes:noDataVibes")}</Text>
                  </View>
                }
                initialNumToRender={0}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                  if (
                    !this.state.loadMore &&
                    !this.onEndReachedCalledDuringMomentum
                  ) {
                    const { getParams } = this.state;

                    this.setState({ loadMore: true }, () =>
                      this.handleLoadMore(getParams)
                    );
                    getParams.offset = getParams.offset + 6;
                    this.setState({ getParams });
                  }
                }}
                onMomentumScrollBegin={() => {
                  this.onEndReachedCalledDuringMomentum = false;
                }}
              />
            </View>
          </View>
          // && (
          //   this.state.loadMore && (
          //     <View style={{ flex: 1, marginTop: 2, alignItems: "center" }}>
          //       <ActivityIndicator size='large' color='#00ff00' />
          //     </View>
          //   )
          // )
        )}
        {!isMySelected && (
          <TouchableOpacity
            onPress={() => {
              this.clearSearch();
              this.props.navigation.navigate("VibeUpload");
            }}
            style={styles.addVibeButton}
          >
            <Image source={AddVibeIcon} style={{ width: 58, height: 58 }} />
          </TouchableOpacity>
        )}

        <Modal1
          transparent={true}
          visible={this.state.welcomeEmailNodal}
          style={{ flex: 0 }}
          buttonText1={t("congratulations:ok")}
          onCancel={() => {
            this.putUserDetails({ registrationStatus: 'Nickname' });
            this.props.navigation.navigate('Nickname', { backRoute: 'VibesMain', setModalVisibility: (res) => this.setState({ welcomeEmailNodal: res }) })
          }}
        >
          <View style={styles.innerModalContainerTwo}>
            <View style={styles.innerModalInsideTwo}>
              <View>
                <Image style={styles.graphicImage} source={imgJoy} />
              </View>
              <Text style={styles.blueHeading}>
                {t("congratulations:welcomeHeading")}
              </Text>

              <Text style={styles.regularText}>
                {t("congratulations:welcomeText")}
              </Text>
              <Text style={styles.regularTextBold}>
                {" "}
                {t("congratulations:complimentaryClover")}
              </Text>
              <Text style={styles.regularText}>
                {t("congratulations:connectText")}
              </Text>
            </View>
          </View>
        </Modal1>

        <Modal
          transparent={true}
          visible={this.state.publicProfileModal}
          style={{ flex: 0 }}
          shouldHideActionButton={true}
        >
          {this.state.publicProfileModal ? (
            <View style={styles.innerModalContainerTwo}>
              <View style={styles.innerModalInsideTwo}>
                <Text style={styles.pvtmemberHeading}>
                  {t("vibeModals:mainHeadingPublic")}
                </Text>

                <View>
                  <Image
                    style={styles.userImage}
                    source={{ uri: this.state.publicProfile.photos[0].url }}
                  />
                </View>

                <View style={styles.icLevelOuter}>
                  {this.state.publicProfile.levelType === "white" &&
                    this.state.publicProfile.level == 1 && (
                      <Image style={styles.icLevelImg} source={icLevel1} />
                    )}
                  {this.state.publicProfile.levelType === "white" &&
                    this.state.publicProfile.level == 2 && (
                      <Image style={styles.icLevelImg} source={icLevel2} />
                    )}
                  {this.state.publicProfile.levelType === "black" &&
                    this.state.publicProfile.level == 1 && (
                      <Image style={styles.icLevelImg} source={icBlack1} />
                    )}
                  {this.state.publicProfile.levelType === "black" &&
                    this.state.publicProfile.level == 2 && (
                      <Image style={styles.icLevelImg} source={icBlack2} />
                    )}
                  {this.state.publicProfile.levelType === "black" &&
                    this.state.publicProfile.level == 3 && (
                      <Image style={styles.icLevelImg} source={icBlack3} />
                    )}

                  <Text style={styles.levelText}>
                    {`${this.state.publicProfile.firstName} ${
                      this.state.publicProfile.lastName
                      }`}
                  </Text>
                </View>

                <Text style={styles.regularText}>
                  {t("vibeModals:tagHeading")}
                </Text>

                <View style={styles.interestTagContainer}>
                  {this.state.publicProfile.interestedHashtags.map(
                    (item, index) => (
                      <Text style={styles.hashtagBlue}>{item}</Text>
                    )
                  )}
                </View>

                <ActionButton
                  onPress1={() => this.setState({ publicProfileModal: false })}
                  text={t("vibeModals:moreProfilebtn")}
                  style={{ marginTop: 55, marginBottom: 54 }}
                />
                <TouchableOpacity
                  onPress={() => this.setState({ publicProfileModal: false })}
                >
                  <Text style={styles.skipText}>{t("vibeModals:skip")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
              <View />
            )}
        </Modal>

        <Modal
          transparent={true}
          visible={this.state.privateProfileModal}
          style={{ flex: 0 }}
          shouldHideActionButton={true}
        >
          {this.state.privateProfileModal ? (
            <View style={styles.innerModalContainerTwo}>
              <View style={styles.innerModalInsideTwo}>
                <Text style={styles.pvtmemberHeading}>
                  {t("vibeModals:mainHeadingPrivate")}
                </Text>

                <View>
                  <Image
                    style={styles.userImage}
                    source={{ uri: this.state.privateProfile.photos[0].url }}
                  />
                  <View style={styles.userImageOverlay}>
                    <Image style={styles.lockIcon} source={lockImage} />
                  </View>
                </View>

                <View style={styles.icLevelOuter}>
                  {this.state.privateProfile.levelType === "white" &&
                    this.state.privateProfile.level == 1 && (
                      <Image style={styles.icLevelImg} source={icLevel1} />
                    )}
                  {this.state.privateProfile.levelType === "white" &&
                    this.state.privateProfile.level == 2 && (
                      <Image style={styles.icLevelImg} source={icLevel2} />
                    )}
                  {this.state.privateProfile.levelType === "black" &&
                    this.state.privateProfile.level == 1 && (
                      <Image style={styles.icLevelImg} source={icBlack1} />
                    )}
                  {this.state.privateProfile.levelType === "black" &&
                    this.state.privateProfile.level == 2 && (
                      <Image style={styles.icLevelImg} source={icBlack2} />
                    )}
                  {this.state.privateProfile.levelType === "black" &&
                    this.state.privateProfile.level == 3 && (
                      <Image style={styles.icLevelImg} source={icBlack3} />
                    )}

                  <Text style={styles.levelText}>
                    {" "}
                    {`${this.state.privateProfile.username} `}
                  </Text>
                </View>

                <Text style={styles.regularText}>
                  {t("vibeModals:tagHeading")}
                </Text>

                <View style={styles.interestTagContainer}>
                  {this.state.privateProfile.interestedHashtags.map(
                    (item, index) => (
                      <Text style={styles.hashtagBlue}>{item}</Text>
                    )
                  )}
                </View>

                <ActionButton
                  onPress1={() => this.setState({ privateProfileModal: false })}
                  text={t("vibeModals:moreProfilebtn")}
                  style={{ marginTop: 55, marginBottom: 54 }}
                />
                <TouchableOpacity
                  onPress={() => this.setState({ privateProfileModal: false })}
                >
                  <Text style={styles.skipText}>{t("vibeModals:skip")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
              <View />
            )}
        </Modal>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  userInfoText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "600",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,
    color: config.black
  },
  roundNumberText: {
    alignSelf: "center",
    fontSize: 10,
    fontWeight: "600"
  },
  roundNumberContainer: {
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: config.selectBox
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 2
  },
  vibeImage: {
    flex: 1,
    resizeMode: "cover",
    // aspectRatio: 1,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3
  },
  vibeContainer: {
    marginLeft: 5,
    flex: 1,
    aspectRatio: 1.4,
    // borderLeftWidth: 4,
    overflow: "hidden",
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 10,
    marginHorizontal: 5
  },
  listViewContent: {
    // paddingLeft: 5,
    // paddingRight: 6,
    marginTop: 18,
    paddingHorizontal: 16
  },
  followContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 4
  },
  followButtonContainer: {
    flex: 1,
    height: 42,
    borderRadius: 3,
    borderWidth: 1,
    // marginLeft: -5,
    borderColor: config.hintText,
    alignItems: "center",
    justifyContent: "center"
  },
  followButtonText: {
    alignItems: "center",
    justifyContent: "center",
    fontFamily: config.regularFont,
    fontSize: 14,
    // paddingTop: 3,
    fontWeight: "500",
    color: config.navyBlack
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
  interestText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    padding: 0,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: config.charcoalGrey,
    textAlign: "left"
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
    width: "100%",
    flexDirection: "row"
  },
  profileText: {
    paddingLeft: 15
  },
  profileImage: {
    width: 58,
    height: 58,
    borderRadius: 58 / 2,
    borderWidth: 1,
    borderColor: "#e8e8e8"
  },
  userInfo: {
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: "row",
    paddingBottom: 20
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
  navBar: {
    // height: 96,
    backgroundColor: "white"
    // elevation: 3,
  },
  secondBar: {
    paddingHorizontal: 12,
    paddingBottom: 10
  },
  addVibeButton: {
    width: 58,
    height: 58,
    alignSelf: "center",
    position: "absolute",
    bottom: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  searchContainer: {
    height: 34,
    borderRadius: 3,
    backgroundColor: config.lightGreyBg,
    shadowColor: "#0000000b",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 0,
    shadowOpacity: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 0,
    marginVertical: 5,
    paddingHorizontal: 8
  },
  searchIconImage: {
    width: 15,
    height: 15
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 13,
    color: config.lightGrey,
    fontFamily: config.regularFont,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: Platform.OS === "android" ? 8 : 0
  },
  hashtag: {
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 4
  },
  graphicImage: {
    height: 117,
    // aspectRatio: 1,
    marginBottom: 16,
    resizeMode: "contain"
  },
  //private
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

  //end
  // congratulation
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
  } //end
});

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    // listVibes: state.vibes.listVibes,
    listMyVibes: state.vibes.listMyVibes,
    // matchedVibesList: state.vibes.matchedVibesList,
    userPhotos: state.auth.user.photos,
    levelType: state.auth.user.levelType,
    level: state.auth.user.level,
    appearanceVerified: state.auth.user.appearanceVerified,
    interestedHashtags: state.auth.user.interestedHashtags,
    wealthVerified: state.auth.user.wealthVerified,
    wealthCriteria: state.auth.user.wealthCriteria,
    username: state.auth.user.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // initiateListVibes: params => dispatch(initiateListVibes(params)),
    // initiateListMyVibes: params => dispatch(initiateListMyVibes(params)),
    // getMatchedVibes: params => dispatch(getMatchedVibes(params)),
    // setMatchedVibes: data => dispatch(setMatchedVibes(data)),
    getUserInfo: () => dispatch(AuthActions.getUserInfo()),
    updateUserProfile: (profile, uri) =>
      dispatch(AuthActions.updateUserProfile(profile, uri))
  };
};

const VibesScreenHoc = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(VibesScreen));

export default withNamespaces(["common", "vibes"], { wait: true })(
  VibesScreenHoc
);
