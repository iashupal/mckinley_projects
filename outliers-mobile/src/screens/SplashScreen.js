import React, { Component } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import config from "@src/config.js";

import { connect } from "react-redux";
import AuthActions from "../store/redux/auth";
import LogoImage from "@assets/images/logoSplash.png";


class SplashScreen extends Component {
  componentDidMount() {
    this.props.initiateCheckOnLaunch();
  }

  render() {
    return (
      <View style={styles.flexContainer}>
        <View style={styles.logoContainer}>
          <Image source={LogoImage} style={styles.logoImage} />
          {this.props.loading && <ActivityIndicator size="large" color={config.charcoal_grey} />}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => ({
  initiateCheckOnLaunch: () => dispatch(AuthActions.initiateCheckOnLaunch())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SplashScreen);

const styles = StyleSheet.create({
  // Entire screen container
  flexContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fefdfb"
  },
  // Logo container
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  // Logo Image
  logoImage: {
    resizeMode: "contain",
    width: 237
  }
});
