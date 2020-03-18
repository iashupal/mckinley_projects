import React, { Fragment, Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
  BackHandler
} from "react-native";

import TopBarHeader from "@components/TopBarHeader";
import config from "@src/config";

//Import Components
import ActionButton from "@components/ActionButton";

const { width } = Dimensions.get("window");

class EventWriteReviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flagImage: true
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  changeImage = () => {
    this.setState({
      flagImage: !this.state.flagImage
    });
  };

  eventDetail = () => { };
  render() {
    return (
      <Fragment>
        <TopBarHeader sectionTitle="리뷰 남기기" action="close" />
        <ScrollView style={styles.container}>
          <View style={styles.eventWriteReviewContentBox}>
            <Text style={styles.eventWriteReviewHeading}>
              이벤트 만족도를 평가해주세요.
            </Text>

            <View style={styles.eventWriteReviewSmileyBox}>
              <TouchableOpacity onPress={this.changeImage}>
                <Image
                  style={styles.avatarIcon}
                  alt="Worst Smiley"
                  source={
                    this.state.flagImage === true
                      ? require("../assets/images/ic_rating_1_grey.png")
                      : require("../assets/images/ic_rating_1_grey_active.png")
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.changeImage}>
                <Image
                  style={styles.avatarIcon}
                  alt="Notbad Smiley"
                  source={
                    this.state.flagImage === true
                      ? require("../assets/images/ic_rating_2_grey.png")
                      : require("../assets/images/ic_rating_2_grey_active.png")
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.changeImage}>
                <Image
                  style={styles.avatarIcon}
                  alt="Soso Smiley"
                  source={
                    this.state.flagImage === true
                      ? require("../assets/images/ic_rating_3_grey.png")
                      : require("../assets/images/ic_rating_3_yellow.png")
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.changeImage}>
                <Image
                  style={styles.avatarIcon}
                  alt="Good Smiley"
                  source={
                    this.state.flagImage === true
                      ? require("../assets/images/ic_rating_4_grey.png")
                      : require("../assets/images/ic_rating_4_yellow.png")
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.changeImage}>
                <Image
                  style={styles.avatarIcon}
                  alt="Best Smiley"
                  source={
                    this.state.flagImage === true
                      ? require("../assets/images/ic_rating_5_grey.png")
                      : require("../assets/images/ic_rating_5_yellow.png")
                  }
                />
              </TouchableOpacity>
            </View>

            <View style={styles.eventWriteReviewTextAreaBox}>
              <TextInput
                style={styles.greyTextArea}
                multiline={true}
                numberOfLines={30}
              />
            </View>
          </View>
        </ScrollView>
        <ActionButton
          customStyle={{
            touchableStyle: styles.buttonStyle
          }}
          // onPress1={() => toggleRegisterModal (true)}
          text="휴면 해제하기"
        />
      </Fragment>
    );
  }
}
const styles = StyleSheet.create({
  buttonStyle: {
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 0
  },
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
  eventWriteReviewContentBox: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 24
  },
  eventWriteReviewHeading: {
    textAlign: "center",
    color: "#666666",
    fontSize: 14
  },
  eventWriteReviewSmileyBox: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 60,
    paddingVertical: 8
  },
  avatarIcon: {
    width: 30,
    height: 30
  },
  eventWriteReviewTextAreaBox: {
    marginTop: 20,
    marginBottom: 20
  },
  greyTextArea: {
    backgroundColor: "#fafafa",
    height: 110,
    borderColor: "#e8e8e8",
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  fullButton: {
    backgroundColor: "#3a424b",
    paddingVertical: 14,
    color: "#ffffff"
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

export default EventWriteReviewScreen;
