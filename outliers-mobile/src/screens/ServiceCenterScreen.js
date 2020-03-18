import React, { Fragment, Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  BackHandler
} from "react-native";
import { withNamespaces } from "react-i18next";

import config from "@src/config";
// Import components
import TopBarHeader from "@components/TopBarHeader";

class ServiceCenterScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }
  render() {
    return (
      <Fragment>
        <TopBarHeader
          sectionTitle={this.props.t("common:app.customerService")}
          action="close"
          isProfile
        />
        <View style={styles.container}>
          {/* Conatant style */}
          <View style={styles.mainOuter}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Faq")}
              style={styles.actionBtn}
            >
              <Text style={styles.actionText}>
                {this.props.t("common:app.frequentlyAskedQuestions")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("TermsOfService")}
              style={styles.actionBtn}
            >
              <Text style={styles.actionText}>
                {this.props.t("common:app.termsOfUser")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("PrivacyPolicy")}
              style={styles.actionBtn}
            >
              <Text style={styles.actionText}>
                {this.props.t("common:app.privacy")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => {
                Linking.openURL(
                  "mailto:support@globalOutliers.com?subject=mailsubject&body=mailbody"
                );
              }}
            >
              <Text style={styles.actionText}>
                {this.props.t("common:app.contactUs")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Fragment>
    );
  }
}
export default withNamespaces(["common"], { wait: true })(ServiceCenterScreen);

const styles = StyleSheet.create({
  // Entire screen container
  container: {
    flex: 1,
    backgroundColor: config.divide
  },
  // Row for input and button

  mainOuter: {
    flex: 1,
    backgroundColor: config.divide
  },
  // card button style
  actionBtn: {
    backgroundColor: config.white_grey,
    marginBottom: 20,
    padding: 15
  },
  actionText: {
    fontWeight: "400",
    color: config.greyishBrown,
    fontSize: 15
  }
  // End
});
