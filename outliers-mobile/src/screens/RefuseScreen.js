import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, BackHandler } from "react-native";
import config from "@src/config.js";
import RNExitApp from "react-native-exit-app";

import { connect } from "react-redux";
import AuthActions from "../store/redux/auth";

// Import assets
import LogoImage from "@assets/images/logoRefuse.png";

// Import components
import ActionButton from "@components/ActionButton";

function RefuseScreen(props) {
  const { t } = props;
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
  })
  return (
    <View style={styles.flexContainer}>
      <Image source={LogoImage} style={styles.logoImage} />
      <View style={styles.bottomContainer}>
        <Text style={styles.instructions}>
          <Text style={{ fontWeight: "bold" }}>{t("common:refuseScreen.text1")}</Text>
          {t("common:refuseScreen.text2")}
          {"\n"}
          {t("common:refuseScreen.text3")}
        </Text>

        <ActionButton
          // text='앱 종료하기'
          text={t("common:refuseScreen.quit")}
          customStyle={{
            touchableStyle: styles.buttonStyle
          }}
          onPress1={() =>
            // props.navigation.navigate('MobileNumberVerification')
            RNExitApp.exitApp()
          }
        />
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authUser: (email, password, passwordConfirm) => dispatch(AuthActions.authUser(email, password, passwordConfirm, true))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RefuseScreen);

const styles = StyleSheet.create({
  // Entire screen container
  flexContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fefdfb"
  },
  // Logo Image
  logoImage: {
    resizeMode: "contain",
    width: 237,
    height: 139,
    marginTop: 175
  },
  // Bottom Container
  bottomContainer: {
    flex: 1,
    alignItems: "center",
    width: config.component_width,
    marginBottom: 30,
    justifyContent: "space-between"
  },
  // Instruction Text
  instructions: {
    textAlign: "center",
    width: config.component_width,
    color: config.black,
    marginBottom: 10,
    fontFamily: config.regularFont,
    lineHeight: 22,
    fontSize: 16,
    marginTop: 28
  },
  buttonStyle: {
    borderRadius: 3,
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
});
