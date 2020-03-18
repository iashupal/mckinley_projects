import React, { Fragment, Component } from "react";
import { View, StyleSheet, Text, Dimensions, Alert, ActivityIndicator, BackHandler } from "react-native";
import { withNamespaces } from "react-i18next";
import api from "@services/AuthApiService";
import config from "@src/config.js";
const { width, height } = Dimensions.get("window");
import AsyncStorage from "@react-native-community/async-storage";

//Import components
import TopBarHeader from "@components/TopBarHeader";
import InputWithTitle from "@components/InputWithTitle";
import ActionButton from "@components/ActionButton";

class ChangePasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      newpassword: "",
      retypepassword: "",
      loading: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  handleText = async (field, value) => {
    if (field === "password") {
      this.setState({ password: value });
    }

    if (field === "newpassword") {
      this.setState({ newpassword: value });
    }
    if (field === "retypepassword") {
      this.setState({ retypepassword: value });
    }
  };

  submitForm = async () => {
    if (this.state.password === "") {
      Alert.alert(`${this.props.t("common:app.enterPwd")}`);
    } else if (this.state.newpassword === "") {
      Alert.alert(`${this.props.t("common:app.newPwd")}`);
    } else if (this.state.retypepassword === "") {
      Alert.alert(`${this.props.t("common:app.reTypePwd")}`);
    } else if (this.state.newpassword != this.state.retypepassword) {
      Alert.alert(`${this.props.t("common:app.matchPwd")}`);
    } else {
      this.setState({ loading: true });
      let token = await AsyncStorage.getItem("@token:key");
      const payload = {
        oldpassword: this.state.password,
        newpassword: this.state.retypepassword
      };
      const response = await api.changePassword(token, payload);
      this.setState({ loading: false });

      AsyncStorage.getItem("@appLang:key").then(val => {
        let lang = val ? val : "en";

        switch (response.data.body) {
          case "PASSWORD_UPDATED_SUCCESSFULLY":
            Alert.alert(lang === "en" ? "Password updated successfully" : "암호가 성공적으로 업데이트되었습니다.");
            break;
          case "INCORRECT_OLD_PASSWORD":
            Alert.alert(lang === "en" ? "Incorrect old password" : "잘못된 이전 암호");
            break;
          case "USER_NOT_FOUND":
            Alert.alert(lang === "en" ? "User not found" : "사용자를 찾을 수 없습니다.");
            break;
          default:
            Alert.alert(lang === "en" ? "Please try again" : "다시 시도하십시오.");
            break;
        }
      });
    }
  };

  render() {
    return (
      <Fragment>
        {/* Include isProfile to match center alignment */}
        <TopBarHeader sectionTitle={this.props.t("common:app.changepassword")} action={"back"} isProfile />

        <View style={styles.container}>
          {this.state.loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
              <View style={styles.mainOuter}>
                <Text style={(styles.alertTitle, { marginTop: 29 })}>
                  {this.props.t("common:editProfileScreen.currentpassword")}
                </Text>

                <View style={{ marginTop: 0, flexDirection: "row" }}>
                  <InputWithTitle
                    placeholder={this.props.t("common:editProfileScreen.enterpassword")}
                    onChangeText={text => this.handleText("password", text)}
                    secureTextEntry={true}
                    containerStyle={{
                      width: "100%",
                      marginTop: 12,
                      borderWidth: 1
                    }}
                  // value={this.state.currentpassword}
                  />
                </View>

                <Text style={(styles.alertTitle, { marginTop: 42 })}>{this.props.t("common:editProfileScreen.newpassword")}</Text>

                <View style={{ marginTop: 0, flexDirection: "row" }}>
                  <InputWithTitle
                    placeholder={this.props.t("common:editProfileScreen.enterpassword")}
                    onChangeText={text => this.handleText("newpassword", text)}
                    secureTextEntry={true}
                    containerStyle={{
                      width: "100%",
                      marginTop: 12,
                      borderWidth: 1
                    }}
                  // value={this.state.currentpassword}
                  />
                </View>
                <View style={{ marginTop: 0, marginBottom: 45, flexDirection: "row" }}>
                  <InputWithTitle
                    placeholder={this.props.t("common:editProfileScreen.retypepassword")}
                    onChangeText={text => this.handleText("retypepassword", text)}
                    secureTextEntry={true}
                    containerStyle={{
                      width: "100%",
                      marginTop: 12,
                      borderWidth: 1
                    }}
                  // value={this.state.currentpassword}
                  />
                </View>

                <ActionButton onPress1={() => this.submitForm()} text={this.props.t("common:editProfileScreen.edit")} />
              </View>
            )}
        </View>
      </Fragment>
    );
  }
}

export default withNamespaces(["common"], { wait: true })(ChangePasswordScreen);

const styles = StyleSheet.create({
  // Entire screen container
  container: {
    flex: 1,
    backgroundColor: config.white
  },

  mainOuter: {
    flex: 1,
    backgroundColor: config.white_grey,
    paddingHorizontal: 20
  },
  alertTitle: {
    fontSize: 18,
    lineHeight: 20,
    fontFamily: config.boldFont,
    fontWeight: "bold",
    color: config.black
  },
  regularFont: {
    fontFamily: config.regularFont,
    fontWeight: "normal"
  },
  error: {
    color: "#f83447",
    fontSize: 14
  }
});
