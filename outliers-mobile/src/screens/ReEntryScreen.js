import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, BackHandler } from "react-native";
import config from "@src/config.js";

import { connect } from "react-redux";
import AuthActions from "../store/redux/auth";

// Import assets
import LogoImage from "@assets/images/logoReEntry.png";

// Import components
import ActionButton from "@components/ActionButton";

function ReEntryScreen(props) {
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
          <Text style={{ fontWeight: "bold" }}>
            {t("common:reentryScreen.text1")}
            {"\n"}
          </Text>
          {t("common:reentryScreen.text2")}
          {"\n"}
          {t("common:reentryScreen.text3")}
        </Text>

        <ActionButton
          // text='재심사 신청하기'
          text={t("common:reentryScreen.apply")}
          customStyle={{
            touchableStyle: styles.buttonStyle
          }}
          onPress1={() => props.navigation.navigate("Home")}
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
)(ReEntryScreen);

const styles = StyleSheet.create({
  // Entire screen container
  flexContainer: {
    flex: 1,
    // justifyContent: 'center',
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
    fontFamily: config.regularFont,
    marginBottom: 10,
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
