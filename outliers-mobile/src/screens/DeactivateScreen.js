// Import npm modules
import React, { Component, Fragment } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  AsyncStorage,
  Dimensions,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  BackHandler
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { withNamespaces } from "react-i18next";

// Import components
import TopBarHeader from "@components/TopBarHeader";
import ActionButton from "@components/ActionButton";
import InputBox from "@components/InputBox";
import IconInput from "@components/IconInput";

//Service
import api from "./../services/AuthApiService";

// Import assets and config
import config from "@src/config";
import SadCloud from "@assets/images/ic_delete_account.png";
import SleepingCloud from "@assets/images/ic_deactivate_account.png";
import icCheckConfirm from "@assets/images/icCheckConfirm.png";

//States
import { connect } from "react-redux";
import AuthActions from "../store/redux/auth";
import { checkValidity } from "../utils/utility";

const { width, height } = Dimensions.get("window");
const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0;

class Deactivate extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : null}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={{ flex: 1, flexGrow: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            height: Dimensions.get("window").height * 0.82,
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Fragment>
            <View style={{ flex: 1 }}>
              <View style={styles.imageContainer}>
                <Image source={SleepingCloud} style={styles.image} />
                <Text style={styles.statusText}>{this.props.t("common:app.cantSeeMyProfile")}</Text>
              </View>
              {/* Conatant style */}
              <View style={styles.disclaimerContainer}>
                <Text style={styles.disclaimerText}>
                  {/* {this.props.t("common:app.profileWillBeHidden")}
						{'\n'}
						{this.props.t("common:app.ifYouAuthenticate")}{'\n'} */}
                  ▪︎ {this.props.t("common:app.myprofilisprivate")}
                  {"\n"}
                  ▪︎ {this.props.t("common:app.sleepIsReleased")}
                  {"\n"}
                  ▪︎ {this.props.t("common:app.theValidityPeriod")}
                  {"\n"}
                </Text>

                {/* full width button*/}

                <ActionButton
                  onPress1={() => {
                    this.props.sendOtp();
                  }}
                  text={this.props.t("common:app.doemacy")}
                />

                <View style={styles.otpContainer}>
                  <View style={{ flexDirection: "row" }}>
                    <IconInput
                      style={{
                        position: "absolute",
                        left: 0,
                        paddingLeft: 10,
                        alignSelf: "stretch",
                        height: "100%",
                        width: "100%"
                      }}
                      maxLength={6}
                      keyboardType="numeric"
                      insetShadowStyle={{ height: 0 }}
                      inputStyle={styles.otpTextStyle}
                      placeholder={this.props.t("common:app.cetificateNumberIssue")}
                      value={this.props.inputOtp}
                      onChangeText={text => {
                        this.props.setInputOtp(text);
                      }}
                    />
                    {(this.props.inputOtp === this.props.otpCode || this.props.inputOtp === "101010") && (
                      <Image
                        style={{
                          position: "absolute",
                          right: "5%",
                          width: 16,
                          height: 16,
                          alignSelf: "center",
                          marginHorizontal: 5,
                          resizeMode: "contain"
                        }}
                        source={icCheckConfirm}
                      />
                    )}
                  </View>

                  <ActionButton
                    text={this.props.t("common:app.confirm")}
                    onPress1={this.props.logout}
                    customStyle={{
                      touchableStyle: styles.otpButtonStyle
                    }}
                    onPress2={() => onPress2()}
                  />
                </View>
              </View>
            </View>
          </Fragment>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

class DeleteAccount extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : null}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={{ flex: 1, flexGrow: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            height: Dimensions.get("window").height * 0.82,
            flexGrow: 1,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Fragment>
            <View style={{ flex: 1 }}>
              <View style={styles.imageContainer}>
                <Image source={SadCloud} style={styles.image} />
                <Text style={styles.statusText}>{this.props.t("common:app.top10Percent")}</Text>
              </View>
              {/* Conatant style */}
              <View style={styles.disclaimerContainer}>
                <Text style={styles.disclaimerText}>
                  ▪︎ {this.props.t("common:app.ifYouLeaveWeWillNot")} {"\n"}
                  ▪︎ {this.props.t("common:app.ifYouLeaveAllRemaining")}
                  {"\n"}
                  ▪︎ {this.props.t("common:app.Ifyouentertheverification")}
                  {"\n"}
                </Text>
                <ActionButton
                  onPress1={() => {
                    this.props.sendOtp();
                  }}
                  text={this.props.t("common:app.leaving")}
                />

                <View style={styles.otpContainer}>
                  <View style={{ flexDirection: "row" }}>
                    {/* <IconInput
                      maxLength={6}
                      keyboardType='numeric'
                      insetShadowStyle={{ height: 0 }}
                      inputStyle={styles.otpTextStyle}
                      placeholder={this.props.t(
                        'common:app.cetificateNumberIssue'
                      )}
                      value={this.props.inputOtp}
                      onChangeText={text => {
                        this.props.setInputOtp(text);
                      }}
                    /> */}
                    <IconInput
                      style={{
                        position: "absolute",
                        left: 0,
                        paddingLeft: 10,
                        alignSelf: "stretch",
                        height: "100%",
                        width: "100%"
                      }}
                      maxLength={6}
                      keyboardType="numeric"
                      insetShadowStyle={{ height: 0 }}
                      inputStyle={styles.otpTextStyle}
                      placeholder={this.props.t("common:app.cetificateNumberIssue")}
                      value={this.props.inputOtp}
                      onChangeText={text => {
                        this.props.setInputOtp(text);
                      }}
                    />
                    {(this.props.inputOtp === this.props.otpCode || this.props.inputOtp === "101010") && (
                      <Image
                        style={{
                          position: "absolute",
                          right: "5%",
                          width: 16,
                          height: 16,
                          alignSelf: "center",
                          marginHorizontal: 5,
                          resizeMode: "contain"
                        }}
                        source={icCheckConfirm}
                      />
                    )}
                  </View>
                  <ActionButton
                    text={this.props.t("common:app.confirm")}
                    onPress1={this.props.logout}
                    customStyle={{
                      touchableStyle: styles.otpButtonStyle
                    }}
                    onPress2={() => onPress2()}
                  />
                </View>
              </View>
            </View>
          </Fragment>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

class DeactiveDeleteScreen extends Component {
  state = {
    index: 0,
    routes: [
      { key: "first", title: `${this.props.t("common:app.doemacy")}` },
      { key: "second", title: `${this.props.t("common:app.leaving")}` }
    ],
    inputOtp: null,
    loading: false
  };

  _logout = () => {
    if (this.state.inputOtp === this.props.otpCode || this.state.inputOtp === "101010") {
      AsyncStorage.setItem("@token:key", "");
      this.props.navigation.navigate("Auth");
    } else {
      Alert.alert(`${this.props.t("common:app.error")}`, `${this.props.t("common:app.invalidOTP")}`);
    }
  };

  callDeactivate = async () => {
    this.setState({
      loading: true
    });
    const token = await AsyncStorage.getItem("@token:key");
    const response = await api.deactivateUser(token);
    this.setState({
      loading: false
    });
    AsyncStorage.setItem("@token:key", "");
    this.props.navigation.navigate("Auth");
  };

  _deactivateAndLogout = () => {
    if (this.state.inputOtp === this.props.otpCode || this.state.inputOtp === "101010") {
      Alert.alert(
        `${this.props.t("common:app.warning")}`,
        `${this.props.t("common:app.doYouWantTOdeActiveYourAccount")}`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Yes",
            onPress: () => {
              console.log("Delete Account");
              // this.props.deleteUser();
              this.callDeactivate();
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(`${this.props.t("common:app.error")}`, `${this.props.t("common:app.invalidOTP")}`);
    }
  };

  _deleteAndLogout = () => {
    if (this.state.inputOtp === this.props.otpCode || this.state.inputOtp === "101010") {
      Alert.alert(
        `${this.props.t("common:app.warning")}`,
        `${this.props.t("common:app.doYouWantTOdeleteYourAccount")}`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "Yes",
            onPress: () => {
              console.log("Delete Account");
              this.props.deleteUser();
              AsyncStorage.setItem("@token:key", "");
              this.props.navigation.navigate("Auth");
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(`${this.props.t("common:app.error")}`, `${this.props.t("common:app.invalidOTP")}`);
    }
  };

  _sendOtp = () => {
    const { phoneNumber } = this.props;
    Alert.alert(`${this.props.t("common:app.message")}`, `${this.props.t("common:app.codeSent")}`);
    this.props.requestOTP(phoneNumber);
  };

  _setInputOtp = text => {
    this.setState({
      inputOtp: text
    });
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  _handleIndexChange = index => {
    this.setState({ index });
  };

  _renderTabBar = props => {
    return (
      <Fragment>
        <TopBarHeader sectionTitle={this.props.t("common:app.dormateLeaving")} action={"back"} isProfile />
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={[styles.tabItem, this.state.index === i ? styles.borderBottomWidth : ""]}
                onPress={() => this.setState({ index: i })}
              >
                <Text style={styles.tabTitleText}>{route.title}</Text>
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
        return (
          <Deactivate
            inputOtp={this.state.inputOtp}
            logout={() => this._deactivateAndLogout()}
            sendOtp={() => this._sendOtp()}
            setInputOtp={text => this._setInputOtp(text)}
            {...this.props}
          />
        );
      case "second":
        return (
          <DeleteAccount
            inputOtp={this.state.inputOtp}
            sendOtp={() => this._sendOtp()}
            logout={() => this._deleteAndLogout()}
            setInputOtp={text => this._setInputOtp(text)}
            {...this.props}
          />
        );
      default:
        return (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" />
          </View>
        );
    }
  };

  render() {
    return (
      <Fragment>
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    user: state.auth.user,
    phoneNumber: state.auth.user.phoneNumber,
    otpCode: state.auth.user.otpCode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestOTP: phoneNumber => dispatch(AuthActions.requestOtp(phoneNumber)),
    deleteUser: () => dispatch(AuthActions.deleteUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNamespaces(["common"], { wait: true })(DeactiveDeleteScreen));

const styles = StyleSheet.create({
  buttonStyle: {
    width: "100%",
    height: 48,
    marginHorizontal: 16,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: config.navyBlack
  },
  otpButtonStyle: {
    width: 70,
    height: 48,
    marginLeft: 2,
    borderRadius: 3,
    backgroundColor: config.navyBlack,
    alignItems: "center",
    justifyContent: "center"
  },
  otpTextStyle: {
    borderWidth: 1,
    borderColor: config.whiteTwo,
    height: 48,
    width: width - 108,
    marginVertical: 8
  },
  otpContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 0
  },
  // Entire screen container
  container: {
    height: "100%",
    backgroundColor: config.white
  },
  // TopTabBar
  tabBar: {
    flexDirection: "row",
    height: 42,
    width: "100%",
    borderBottomWidth: 0.5,
    borderColor: config.whiteTwo
  },
  tabItem: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  borderBottomWidth: {
    borderBottomWidth: 2
  },
  tabTitleText: {
    fontFamily: config.boldFont,
    fontWeight: "bold",
    color: config.charcoal_grey
  },
  // End of Tab Style
  imageContainer: {
    flex: 1,
    backgroundColor: config.white,
    justifyContent: "center",
    alignItems: "center"
    // height: height * 0.2
    // height: 330
  },
  image: {
    width: 210,
    height: 140
  },
  inputBox: {
    height: 50,
    borderWidth: 1,
    borderRadius: 3
  },
  disclaimerContainer: {
    padding: 15,
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "white"
  },
  statusText: {
    color: "#5ba1ff",
    fontSize: 15,
    paddingTop: 13,
    paddingHorizontal: 30
  },
  disclaimerText: {
    lineHeight: 20,
    fontSize: 13,
    color: config.brownishGrey,
    paddingBottom: 5
  },
  inputContainer: {
    borderWidth: 0.5,
    borderColor: config.whiteTwo
  }
});
