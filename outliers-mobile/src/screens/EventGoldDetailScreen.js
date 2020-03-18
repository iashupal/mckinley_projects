import React, { Component, Fragment, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions,BackHandler } from "react-native";
import TopBarHeader from "@components/TopBarHeader";
import ReportIcon from "@assets/images/ic_report3.png";
import config from "@src/config";
import tagImage3 from "@assets/images/tagImage3.png";
import ActionButton from "@components/ActionButton";
import UserBasicInfo from "@components/UserBasicInfo";
import icClover from "@assets/images/ic_clover.png";
const { width } = Dimensions.get("window");

function EventGoldDetailScreen(props) {
  const [userDetails, setUserDetails] = useState({
    photos: [],
    interestedHashtags: []
  });
  useEffect(() => {
    setUserDetails(!!props.userVibeList ? props.userVibeList.user : { photos: [], interestedHashtags: [] });
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
  });
  eventDetail = () => {};
  return (
    <Fragment>
      <TopBarHeader rightSecondIcon={ReportIcon} isProfile={true} />
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.eventDetailHeading}>오마카세 저녁 드실분?</Text>
          <View style={styles.userInfo}>
            <TouchableOpacity>
              <Image
                style={styles.profileImage}
                source={{
                  uri:
                    userDetails.photos.length > 0
                      ? userDetails.photos[0].url
                      : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg=="
                }}
              />
            </TouchableOpacity>
            <View style={styles.profileText}>
              {/* <UserBasicInfo /> */}
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.aboutUserText}>10.06 (토), 서울시 마포구, 1명</Text>
              </View>
              <View style={styles.userInterestsContainer}>
                <View style={styles.interestContainer}>
                  <Text style={styles.interestText}>#Male</Text>
                </View>
                <View style={styles.interestContainer}>
                  <Text style={styles.interestText}>#요가</Text>
                </View>
                <View style={styles.interestContainer}>
                  <Text style={styles.interestText}>#20s</Text>
                </View>
                <View style={styles.interestContainer}>
                  <Text style={styles.interestText}>#변호사</Text>
                </View>
              </View>
              {/* <View style={styles.userInterestsContainer}>
                {userDetails.interestedHashtags.map((item, index) => (
                  <View key={index} style={styles.interestContainer}>
                    <Text style={styles.interestText}>
                      {"#"}
                      {item}{" "}
                    </Text>
                  </View>
                ))}
              </View> */}
            </View>
          </View>
          <View style={styles.eventDetailContent}>
            <Text style={styles.aboutUserText}>이벤트소개 글 블라블라</Text>
            <Text style={styles.aboutUserText}>오늘 저녁에 한남동에서 오마카세 드실 분</Text>
            <Text style={styles.aboutUserText}>저는 광화문에서 금융회사를 다니니는 30대 직장인입니다.</Text>
          </View>
          <View style={styles.eventDetailContent}>
            <Image source={tagImage3} alt="EventDetail" style={styles.eventImg} />
          </View>
        </View>
      </ScrollView>
      <ActionButton
        customStyle={{
          touchableStyle: styles.buttonStyle
        }}
        onPress2={() => this.eventDetail()}
        text="이벤트 참여"
      />
    </Fragment>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
  buttonStyle: {
    height: 54,
    backgroundColor: config.goldYellow,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 0
  },
  eventDetailHeading: {
    fontSize: 15,
    fontFamily: config.boldFont,
    color: "#000000",
    lineHeight: 18,
    marginTop: 5,
    marginBottom: 15,
    fontWeight: "bold"
  },
  eventDetailContent: {
    marginVertical: 10
  },
  interestText: {
    fontFamily: config.mediumFont,
    fontSize: 14,
    // fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "rgb(69,73,78)",
    paddingHorizontal: 5,
    lineHeight: 18
  },
  interestContainer: {
    height: 20,
    margin: 6,
    backgroundColor: config.paleGrey,
    justifyContent: "center",
    marginLeft: 0,
    marginVertical: 3
  },
  userInterestsContainer: {
    flexWrap: "wrap",
    width: width * 0.7,

    flexDirection: "row"
  },
  userInfo: {
    flexDirection: "row",
    paddingBottom: 15
  },
  profileImage: {
    width: 58,
    height: 58,
    borderRadius: 58 / 2
  },
  profileText: {
    paddingLeft: 15
  },
  aboutUserText: {
    height: 20,
    fontFamily: config.regularFont,
    fontSize: 14,
    // fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 20,
    letterSpacing: 0,
    // textAlign: "center",
    color: "rgb(34,34,34)"
  },
  eventImg: {
    height: 300
  },
  leaveReview: {
    marginTop: 20
  }
  //   aboutUserContainer: {
  //     padding: 2,
  //     paddingHorizontal: 5,
  //     // aspectRatio: 2.2,
  //     borderRadius: 13,
  //     backgroundColor: "rgba(0, 0, 0, 0.0)",
  //     borderStyle: "solid",
  //     borderWidth: 1,
  //     alignSelf: "flex-start",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     borderColor: config.aqua_marine
  //   }
});

export default EventGoldDetailScreen;
