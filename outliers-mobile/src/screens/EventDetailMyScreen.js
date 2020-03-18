import React, { Component, Fragment, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  BackHandler
} from "react-native";
import TopBarHeader from "@components/TopBarHeader";
import ReportIcon from "@assets/images/ic_report3.png";
import MoreIcon from "@assets/images/btn_more.png";
import config from "@src/config";
import tagImage3 from "@assets/images/tagImage3.png";
import ActionButton from "@components/ActionButton";
import UserBasicInfo from "@components/UserBasicInfo";
import icClover from "@assets/images/ic_clover.png";
const { width } = Dimensions.get("window");

function EventDetailMyScreen(props) {
  const [userDetails, setUserDetails] = useState({
    photos: [],
    interestedHashtags: []
  });
  useEffect(() => {
    setUserDetails(
      !!props.userVibeList
        ? props.userVibeList.user
        : { photos: [], interestedHashtags: [] }
    );
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
  });
  eventDetail = () => {};
  return (
    <Fragment>
      <TopBarHeader
        onPressRightAction={() => alert("menu")}
        rightNavIcon={MoreIcon}
      />
      <ScrollView style={styles.container}>
        <View style={styles.inner}>
          <Text style={styles.eventDetailHeading}>오마카세 저녁 드실분?</Text>
          <View style={styles.userInfo}>
            <TouchableOpacity style={styles.userPic}>
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
              <View style={{ flexDirection: "row", marginBottom: 3 }}>
                <Text style={styles.aboutUserText}>
                  서울시 강남구, 10.12(일), 1명
                </Text>
              </View>
              <View style={styles.userInterestsContainer}>
                <View style={styles.interestContainer}>
                  <Text style={styles.interestText}>#요가</Text>
                </View>
                <View style={styles.interestContainer}>
                  <Text style={styles.interestText}>#26세</Text>
                </View>
                <View style={styles.interestContainer}>
                  <Text style={styles.interestText}>#조지오웰</Text>
                </View>
                <View style={styles.interestContainer}>
                  <Text style={styles.interestText}>#패스티벌</Text>
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
            <Text style={styles.aboutUserText}>
              오늘 저녁에 한남동에서 오마카세 드실 분
            </Text>
            <Text style={styles.aboutUserText}>
              저는 광화문에서 금융회사를 다니니는 30대 직장인입니다.
            </Text>
          </View>
          <View style={styles.eventDetailContent}>
            <Image
              source={tagImage3}
              alt="EventDetail"
              style={styles.eventImg}
            />
          </View>

          <View style={styles.bottomInfoSection}>
            <View style={styles.userInfo}>
              <TouchableOpacity style={styles.userPic}>
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
                <View style={{ flexDirection: "row", marginBottom: 3 }} />
                <View style={styles.userInterestsContainer}>
                  <View style={styles.interestContainer}>
                    <Text style={styles.interestText}>#요가</Text>
                  </View>
                  <View style={styles.interestContainer}>
                    <Text style={styles.interestText}>#26세</Text>
                  </View>
                  <View style={styles.interestContainer}>
                    <Text style={styles.interestText}>#조지오웰</Text>
                  </View>
                  <View style={styles.interestContainer}>
                    <Text style={styles.interestText}>#패스티벌</Text>
                  </View>
                </View>

                <View style={styles.twoButtons}>
                  <ActionButton
                    customStyle={{
                      touchableStyle: styles.buttonStyleGreyOutline,
                      buttonTextStyle: styles.buttonCharcoalOutlineText
                    }}
                    onPress={() => this.eventDetail()}
                    text="거절하기"
                  />

                  <ActionButton
                    customStyle={{
                      touchableStyle: styles.buttonStyleGreyFill
                    }}
                    onPress2={() => this.eventDetail()}
                    text="수락하기:)"
                  />
                </View>
              </View>
            </View>

            <View style={[styles.userInfo, styles.greyBorder]}>
              <TouchableOpacity style={styles.userPic}>
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
                <View style={{ flexDirection: "row", marginBottom: 3 }} />
                <View style={styles.userInterestsContainer}>
                  <View style={styles.interestContainer}>
                    <Text style={styles.interestText}>#요가</Text>
                  </View>
                  <View style={styles.interestContainer}>
                    <Text style={styles.interestText}>#26세</Text>
                  </View>
                  <View style={styles.interestContainer}>
                    <Text style={styles.interestText}>#조지오웰</Text>
                  </View>
                  <View style={styles.interestContainer}>
                    <Text style={styles.interestText}>#패스티벌</Text>
                  </View>
                </View>

                <View style={styles.twoButtons}>
                  <ActionButton
                    customStyle={{
                      touchableStyle: styles.buttonStyleCharcoalOutline,
                      buttonTextStyle: styles.buttonCharcoalOutlineText
                    }}
                    onPress={() => this.eventDetail()}
                    text="거절하기"
                  />

                  <ActionButton
                    customStyle={{
                      touchableStyle: styles.buttonStyleCharcoalFill
                    }}
                    onPress2={() => this.eventDetail()}
                    text="수락하기:)"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Fragment>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
  inner: {
    justifyContent: "flex-start"
  },
  twoButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12,
    flex: 1,
    flexDirection: "row",
    textAlign: "right"
  },
  buttonStyleGreyOutline: {
    backgroundColor: "#ffffff",
    textAlign: "center",
    borderColor: "#b1b4b7",
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 28,
    paddingVertical: 10,
    fontSize: 14,
    alignItems: "flex-end"
  },
  buttonGreyOutlineText: { color: "#a7a7a7" },
  buttonStyleGreyFill: {
    backgroundColor: "#b1b4b7",
    textAlign: "center",
    borderColor: "#b1b4b7",
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 28,
    paddingVertical: 10,
    fontSize: 14,
    alignItems: "flex-end"
  },
  buttonStyleCharcoalOutline: {
    backgroundColor: "#ffffff",
    textAlign: "center",
    borderColor: "#3a424b",
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 28,
    paddingVertical: 10,
    fontSize: 14
  },
  buttonCharcoalOutlineText: { color: "#222222" },
  buttonStyleCharcoalFill: {
    backgroundColor: "#3a424b",
    textAlign: "center",
    borderColor: "#3a424b",
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 28,
    paddingVertical: 10,
    color: "#ffffff",
    fontSize: 14
  },
  eventDetailHeading: {
    fontSize: 18,
    fontFamily: config.boldFont,
    color: "#000000",
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
    paddingBottom: 15,
    flex: 1,
    width: "100%",
    paddingHorizontal: 0
    // justifyContent: "flex-end",
    // alignItems: "flex-end",
  },
  userPic: {
    alignSelf: "flex-start",
    flex: 1
  },
  bottomInfoSection: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 0
  },
  profileImage: {
    width: 58,
    height: 58,
    borderRadius: 58 / 2
  },
  profileText: {
    paddingLeft: 15
    // justifyContent: "flex-end",
    // alignItems: "flex-end"
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
    width: "100%",
    height: 300,
    marginBottom: 10
  },
  leaveReview: {
    marginTop: 20
  },
  greyBorder: {
    borderTopColor: "#e8e8e8",
    borderBottomColor: "#e8e8e8",
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderWidth: 1,
    paddingVertical: 15
  }
});

export default EventDetailMyScreen;
