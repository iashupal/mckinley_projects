import React, { Fragment, Component } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import { withNamespaces } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import config from "@src/config.js";
//Import components

import Accordion from "@components/Accordion";
import TopBarHeader from "@components/TopBarHeader";

class FaqScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }
  render() {
    return (
      <Fragment>
        <ScrollView style={styles.scrollContainer}>
          {/* Include isProfile to match center alignment */}
          <TopBarHeader sectionTitle={this.props.t("common:faqScreen.title")} action={"back"} isProfile />
          <View style={styles.container}>
            <View style={styles.mainOuter}>
              <Accordion title={this.props.t("common:faqScreen.ques1")} data={this.props.t("common:faqScreen.ans1")} />
              <Accordion title={this.props.t("common:faqScreen.ques2")} data={this.props.t("common:faqScreen.ans2")} />
              <Accordion title={this.props.t("common:faqScreen.ques3")} data={this.props.t("common:faqScreen.ans3")} />
            </View>
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

export default withNamespaces(["common"], { wait: true })(FaqScreen);

const styles = StyleSheet.create({
  // Entire screen container
  container: {
    flex: 1,
    backgroundColor: config.white
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 80
    // alignItems: "center"
  },
  mainOuter: {
    flex: 1,
    backgroundColor: config.white_grey
  }
});
