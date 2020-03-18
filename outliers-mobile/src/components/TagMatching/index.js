import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
const { width } = Dimensions.get("window");
import tagImage1 from "@assets/images/tagImage1.png";
import tagImage2 from "@assets/images/tagImage2.png";
import tagImage3 from "@assets/images/tagImage3.png";
import MyClock from "../24HrsClock";
//import { TouchableOpacity } from "react-native-gesture-handler";

export default class TagMatching extends Component {
  state = {
    hashtags: ''
  }
  componentWillReceiveProps(props) {
    let hashtags = [];
    if (props.matchedVibesList && props.matchedVibesList.length > 0) {
      props.matchedVibesList.map(item => {
        if (item.hashtags) {
          hashtags.push(...item.hashtags.split(','));
        }
      })
      let filteredHashtags = new Set(hashtags);
      hashtags = Array.from(filteredHashtags);
      const hashtagsWithHash = [];
      hashtags.map((item, index) => {
        if (item !== '' && index < 3) {
          hashtagsWithHash.push(`#${item}`);
        }
      });
      this.setState({ hashtags: hashtagsWithHash.join(', ') });
    }
  }

  render() {
    const { t, navigatevibe, switchVibes } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.tagContainer}>
          <View style={styles.tagsView}>
            <Text style={styles.tagTitle}>{t("vibes:todaysMatch")}</Text>
            <Text style={styles.tagsText}>
              {this.state.hashtags.length > 0
                ? this.state.hashtags
                : "#nomatch"}
            </Text>
          </View>
          <MyClock switchVibes={switchVibes} />
          {/* <Text style={styles.time}>
            { this.props.matchedVibesList.length > 0 ? moment(this.props.matchedVibesList[0].createdAt).format("HH:mm") : "12:00" }
          </Text> */}
        </View>
        <ScrollView horizontal pagingEnabled={true} style={{ padding: 2 }}>
          {this.props.matchedVibesList.length > 0 ? (
            this.props.matchedVibesList.map((item, index) => (
              <TouchableOpacity
                onPress={() =>
                  navigatevibe("VibeDetails", {
                    id: item._id
                  })
                }
              >
                <Image
                  key={index}
                  source={{ uri: item && item.photos && item.photos.length > 0 ? item.photos[0].url : '' }}
                  style={styles.image}
                />
              </TouchableOpacity>
            ))
          ) : (
              <Text> {t("vibes:noMatch")} </Text>
            )}
        </ScrollView>
      </View>
    );
  }
}
