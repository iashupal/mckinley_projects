import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, BackHandler } from "react-native";
import { withNamespaces } from "react-i18next";
import config from "@src/config";
import ActionButton from "@components/ActionButton";

import icNetwork from "@assets/images/icNetwork.png";

function NoInternetScreen(props) {
  const { t } = props;
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
  })
  return (
    <View style={styles.container}>
      <Image style={{ width: 162, aspectRatio: 2 / 1, resizeMode: "contain" }} source={icNetwork} />
      <Text style={styles.headerText}>{t("common:noInternet.networkStop")}</Text>

      <Text style={styles.subtitleText}>{t("common:noInternet.netConnection")}</Text>
      <ActionButton
        customStyle={{
          touchableStyle: styles.buttonStyle
        }}
        // onPress1={() => toggleRegisterModal (true)}
        text={t("common:noInternet.try")}
      />
    </View>
  );
}
export default withNamespaces(["common"], { wait: true })(NoInternetScreen);
const styles = StyleSheet.create({
  subtitleText: {
    fontFamily: config.regularFont,
    fontSize: 16,
    marginTop: 6,
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: config.brownishGrey
  },
  headerText: {
    fontFamily: config.regularFont,
    fontSize: 18,
    marginTop: 26,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: config.black
  },
  buttonStyle: {
    width: 295,
    height: 54,
    marginVertical: 16,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: config.navyBlack
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
