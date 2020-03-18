import React, { Fragment, Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  Platform,
  PermissionsAndroid,
  Alert,
  BackHandler
} from "react-native";
import { withNamespaces } from "react-i18next";

//Import Assets
import AlarmIcon from "@assets/images/btn_alarm.png";

//Import Components
import TopBarHeader from "@components/TopBarHeader";
import config from "@src/config";

import AsyncStorage1 from "@react-native-community/async-storage";

import { connect } from "react-redux";
import AuthActions from "../store/redux/auth";
import WithLoaderStatus from "../components/HOC/withLoaderStatus";
import SystemSetting from "react-native-system-setting";

const { width } = Dimensions.get("window");

class MoreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotification: true,
      otherNotification: true,
      followingNotification: true, //allNotification
      location: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
    const {
      allNotification,
      otherNotification,
      followingNotification
    } = this.props;
    this.props.getUserInfo();
    console.log(allNotification, otherNotification, followingNotification);
    this.setState({
      allNotification: !!parseInt(allNotification),
      otherNotification: !!parseInt(otherNotification),
      followingNotification: !!parseInt(followingNotification)
    });
    this.checkPermission();
  }
  checkPermission = async () => {
    SystemSetting.isLocationEnabled().then(enable => {
      const state = enable ? true : false;

      if (state) {
        this.setState({ location: true });
      } else {
        this.setState({ location: false });
      }
    });
  };
  toggleLocation = async () => {
    SystemSetting.switchLocation(response => {
      if (response) {
        this.setState({ location: true });
      } else {
        this.setState({ location: false });
      }
    });
  };

  render() {
    const {
      allNotification,
      otherNotification,
      followingNotification
    } = this.state;
    const { t, i18n, updateUserProfile } = this.props;
    return (
      <Fragment>
        <TopBarHeader
          // onPressLeftAction={() => this.props.navigation.navigate('My', { backRoute: 'MoreMain' })}
          sectionTitle={t("moreScreen:headerTitle")}
          // profileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIZ9mEKcetDDaR2W66vc7qSOKt1sMYeGtS3WmPzmZ4FH3qUQ7W"
          alarmIcon={AlarmIcon}
          action="back"
        />
        <ScrollView style={styles.container}>
          <View style={styles.listItem}>
            <Text style={styles.label}>
              {" "}
              {t("moreScreen:allNotification")}{" "}
            </Text>
            <Switch
              ios_backgroundColor="#BCBFC1"
              trackColor={{ true: "#3A424B", false: "#BCBFC1" }}
              thumbColor={[Platform.OS == "ios" ? "#FFFFFF" : "#FFFFFF"]}
              value={allNotification}
              onValueChange={val => {
                this.setState({
                  allNotification: val
                });
                updateUserProfile({
                  allNotification: val ? "1" : "0"
                });
              }}
            />
          </View>

          {/* <View style={styles.listItem}>
            <Text style={styles.label}>{t("moreScreen:otherNotif")}</Text>
            <Switch
              value={otherNotification}
              ios_backgroundColor="#bbbbbb"
              trackColor={{
                true: Platform.OS == "android" ? "#BCBFB1" : "#45494E",
                false: Platform.OS == "android" ? "#BCBFB1" : "#BBBBBB"
              }}
              thumbColor={[Platform.OS == "ios" ? "#FFFFFF" : "#FFFFFF"]}
              onValueChange={val => {
                this.setState({
                  otherNotification: val
                });
                updateUserProfile({
                  otherNotification: val ? "1" : "0"
                });
              }}
            />
          </View> */}

          <View style={styles.listItem}>
            <Text style={styles.label}>{t("moreScreen:followNotif")}</Text>
            <Switch
              value={followingNotification}
              ios_backgroundColor="#BCBFC1"
              trackColor={{ true: "#3A424B", false: "#BCBFC1" }}
              thumbColor={[Platform.OS == "ios" ? "#FFFFFF" : "#FFFFFF"]}
              onValueChange={val => {
                this.setState({
                  followingNotification: val
                });
                updateUserProfile({
                  followingNotification: val ? "1" : "0"
                });
              }}
            />
          </View>
          {/* <TouchableOpacity
							onPress={() => props.navigation.navigate('Store')}
							style={styles.listItem}
						>
							<Text style={styles.label}>Store</Text>
						</TouchableOpacity> */}
          {/* <TouchableOpacity
							onPress={() => props.navigation.navigate('EditTags')}
							style={styles.listItem}
						>
							<Text style={styles.label}>관심태그</Text>
						</TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Donation")}
            style={styles.listItem}
          >
            <Text style={styles.label}>{t("moreScreen:donate")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ServiceCenter")}
            style={styles.listItem}
          >
            <Text style={styles.label}>{t("moreScreen:customerService")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Deactivate")}
            style={styles.listItem}
          >
            <Text style={styles.label}>{t("moreScreen:delDecAccount")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ChangePassword")}
            style={styles.listItem}
          >
            <Text style={styles.label}>{t("moreScreen:ChangePassword")}</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.listItem}>
							<Text style={styles.label}>언어설정</Text>
							<Text style={styles.label}>Korean</Text>
						</TouchableOpacity>

						<TouchableOpacity style={styles.listItem}>
							<Text style={styles.label}>국가설정</Text>
							<Text style={styles.label}>US</Text>
						</TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.listItem}>
							<Text style={styles.label}>로그아웃</Text>
						</TouchableOpacity> */}

          <View style={styles.listItem}>
            <Text style={styles.label}>{t("moreScreen:langSetting")}</Text>
            <TouchableOpacity
              hitSlop={{ left: width, right: 0, top: 0, bottom: 0 }}
              onPress={() => {
                AsyncStorage.setItem(
                  "@appLang:key",
                  i18n.language === "en" ? "ko" : "en"
                ).then(() => {
                  i18n.language === "en"
                    ? i18n.changeLanguage("ko")
                    : i18n.changeLanguage("en");
                });
              }}
              style={styles.listItem}
            >
              <Text style={[styles.label, { color: config.brownishGrey }]}>
                {i18n.language === "en" ? "한국어" : "English"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.label}>{t("moreScreen:location")}</Text>
            <Switch
              ios_backgroundColor="#BCBFC1"
              trackColor={{ true: "#3A424B", false: "#BCBFC1" }}
              thumbColor={[Platform.OS == "ios" ? "#FFFFFF" : "#FFFFFF"]}
              value={this.state.location}
              onValueChange={() => this.toggleLocation()}
            />
          </View>

          <View style={styles.listItem}>
            <Text style={styles.label}>{t("moreScreen:countrySetting")}</Text>
            <TouchableOpacity style={styles.listItem}>
              <Text style={[styles.label, { color: config.brownishGrey }]}>
                US
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                t("common:app.warning"),
                t("common:app.wanttodelete"),
                [
                  {
                    text: t("common:app.no"),
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  {
                    text: t("common:app.yes"),
                    onPress: () => {
                      AsyncStorage.setItem("@token:key", "");
                      this.props.navigation.navigate("Login");
                    }
                  }
                ]
              );
            }}
            style={styles.logoutBtn}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: config.whiteTwo
              }}
            >
              <Text style={[styles.label, { color: config.brownishGrey }]}>
                {t("moreScreen:logout")}
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: config.white_grey
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: config.whiteTwo,
    height: 56,
    alignItems: "center"
  },
  logoutBtn: {
    justifyContent: "center",
    paddingTop: 30,
    height: 56,
    alignItems: "center"
  },
  label: {
    fontSize: 15,
    color: config.black,
    paddingLeft: 6
  },
  switchEnableBorder: {
    borderColor: "#6fa6d3",
    borderWidth: 1
  },
  switchDisableBorder: {
    borderColor: "#f2f2f2",
    borderWidth: 1
  }
});

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    userDetails: state.auth.user,
    otherNotification: state.auth.user.otherNotification,
    allNotification: state.auth.user.allNotification,
    followingNotification: state.auth.user.followingNotification
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserProfile: (profile, uri) =>
      dispatch(AuthActions.updateUserProfile(profile, uri)),
    saveUserInfo: data => dispatch(AuthActions.setUserInfo(data)),
    getUserInfo: () => dispatch(AuthActions.getUserInfo())
  };
};

const MoreScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(MoreScreen));

export default withNamespaces(["common", "moreScreen"], { wait: true })(
  MoreScreenHOC
);
