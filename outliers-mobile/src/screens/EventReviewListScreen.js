import React, { Fragment, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  BackHandler
} from "react-native";
import TopBarHeader from "@components/TopBarHeader";
import ReportIcon from "@assets/images/ic_report3.png";
import config from "@src/config";

const { width } = Dimensions.get("window");

function EventReviewListScreen(props) {
  eventDetail = () => { };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
  })
  return (
    <Fragment>
      <TopBarHeader rightSecondIcon={ReportIcon} isProfile={true} />
      <ScrollView style={styles.container}>
        <View>
          <Text style={styles.eventDetailHeading}>리뷰</Text>
          <Text style={styles.counterLabelBlue}>
            평점 4.5 <Text style={styles.counterLabelGrey}>(35)</Text>
          </Text>
          <View style={styles.eventReviewListAvatarBox}>
            <View style={styles.eventReviewListAvatarBoxLhs}>
              <Image
                source={require("../assets/images/ic_soso_select.png")}
                alt="Happy Smile"
                style={styles.avatarIcon}
              />
            </View>
            <View style={styles.eventReviewListAvatarBoxRhs}>
              <Text style={styles.eventReviewListAvatarBoxRhsName}>
                {"Abhishek".length > 2
                  ? "Abhishek".substring(0, 2) + "..."
                  : "Abhishek"}
              </Text>
              <Text style={styles.eventReviewListAvatarBoxRhsDate}>
                2019년 8월 29일
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.eventReviewListContent}>
              호스트의 원활한 진행과 아낌없는 음식 제공으로 굉장히 즐거운 시간
              이었습니다. 영화도 영화지만 여러 좋은 분들과 소통할 수 있는 좋은
              계기가 된 것 같아 더 만족스운 시간이었습니다.
            </Text>
          </View>
        </View>

        <View>
          <View style={styles.eventReviewListAvatarBox}>
            <View style={styles.eventReviewListAvatarBoxLhs}>
              <Image
                source={require("../assets/images/ic_notbad_select.png")}
                alt="Happy Smile"
                style={styles.avatarIcon}
              />
            </View>
            <View style={styles.eventReviewListAvatarBoxRhs}>
              <Text style={styles.eventReviewListAvatarBoxRhsName}>
                {"Abhishek".length > 2
                  ? "Abhishek".substring(0, 2) + "..."
                  : "Abhishek"}
              </Text>
              <Text style={styles.eventReviewListAvatarBoxRhsDate}>
                2019년 8월 29일
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.eventReviewListContent}>
              호스트의 원활한 진행과 아낌없는 음식 제공으로 굉장히 즐거운 시간
              이었습니다. 영화도 영화지만 여러 좋은 분들과 소통할 수 있는 좋은
              계기가 된 것 같아 더 만족스운 시간이었습니다.
            </Text>
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
  buttonStyle: {
    height: 54,
    backgroundColor: config.charcoal_grey,
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
  counterLabelBlue: {
    color: "#3085f9",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 18
  },
  counterLabelGrey: {
    color: "#888888",
    fontSize: 14,
    lineHeight: 18
  },
  eventReviewListContent: {
    color: "#666666",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 10,
    marginBottom: 10
  },
  eventReviewListAvatarBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 40
  },
  eventReviewListAvatarBoxRhs: {
    paddingLeft: 8
  },
  eventReviewListAvatarBoxRhsName: {
    color: "#222222",
    fontSize: 11,
    fontWeight: "bold",
    lineHeight: 14
  },
  eventReviewListAvatarBoxRhsDate: {
    color: "#888888",
    fontSize: 11,
    lineHeight: 14
  },
  avatarIcon: {
    width: 30,
    height: 30
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

export default EventReviewListScreen;
