// Import npm modules
import React, { Component, Fragment } from "react";
import { View, ScrollView, TouchableOpacity, StyleSheet, Text, BackHandler } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

// Import components
import TopBarHeader from "@components/TopBarHeader";
import NotificationItem from "@components/NotificationItem";
import HistoryImage from "@components/HistoryImage";

// Import assets and config
import config from "@src/config";
import CoffeeIcon from "@assets/images/ic_noti_coffee.png";
import LikeIcon from "@assets/images/ic_noti_like.png";
import Pass14Icon from "@assets/images/ic_pass_14.png";

function allNotification() {
  return (
    <Fragment>
      <ScrollView style={styles.scrollViewContainer}>
        <NotificationItem
          image={LikeIcon}
          notification="Outliers' View profile on your Vibe #tag I applied."
          time="3 minutes ago"
        />
        <NotificationItem
          image={CoffeeIcon}
          notification="Outliers' View profile on your Vibe #tag I applied."
          time="3 minutes ago"
        />
        <NotificationItem
          image={CoffeeIcon}
          notification="Outliers' View profile on your Vibe #tag I applied."
          time="3 minutes ago"
        />
      </ScrollView>
      <TouchableOpacity style={styles.viewMoreRequestButton}>
        <Text style={styles.viewMoreRequestText}>프로필 더보기 신청 리스트</Text>
      </TouchableOpacity>
    </Fragment>
  );
}

function historyNotification() {
  return (
    <Fragment>
      <ScrollView style={styles.scrollViewContainer}>
        <View style={styles.sectionDivider}>
          <Text style={styles.sectionDividerText}>매칭된 인연</Text>
          <View style={styles.imageContainer}>
            <HistoryImage />
            <HistoryImage />
            <HistoryImage />
          </View>
        </View>

        <View style={styles.sectionDivider}>
          <Text style={styles.sectionDividerText}>나를 좋아하는 멤버</Text>
          <View style={styles.imageContainer}>
            <HistoryImage />
            <HistoryImage />
            <HistoryImage />
            <HistoryImage />
            <HistoryImage />
            <HistoryImage />
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
}

export default class VerifySchoolScreen extends Component {
  state = {
    index: 0,
    routes: [{ key: "first", title: "전체" }, { key: "second", title: "히스토리" }]
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
        <TopBarHeader sectionTitle="알림" action={"back"} rightNavIcon={Pass14Icon} rightNavText={"D-7"} />
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

  _renderScene = SceneMap({
    first: allNotification,
    second: historyNotification
  });

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

const styles = StyleSheet.create({
  // Entire screen container
  container: {
    flex: 1,
    backgroundColor: config.white
  },
  // ScrollView Container
  scrollViewContainer: { flex: 1, backgroundColor: "white" },
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
  inputContainer: {
    margin: 20,
    paddingLeft: 20,
    borderColor: config.whiteTwo,
    borderRadius: 3,
    borderWidth: 0.5
  },
  // View More ProfileView Requests Button
  viewMoreRequestButton: {
    width: "100%",
    height: 54,
    backgroundColor: config.wheat,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  viewMoreRequestText: {
    color: config.navyBlack,
    fontFamily: "NotoSansKR-Bold",
    fontSize: 15
  },
  // History Notification Tab
  sectionDivider: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 20
  },
  sectionDividerText: {
    fontFamily: "NotoSansKR-Bold",
    fontSize: 16,
    color: config.navyBlack
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap"
  }
});
