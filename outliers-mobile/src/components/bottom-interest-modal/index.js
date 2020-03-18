import React, { Component } from "react";
import { Modal, Text, TouchableOpacity, View, Image, Alert, Dimensions, StyleSheet, ScrollView } from "react-native";
const { width } = Dimensions.get("window");

import config from "@src/config";
import CheckBox from "../AppCheckbox";

import CheckboxIcon from "@assets/images/ic_outline_checkbox.png";
import icDropModal from "@assets/images/ic_open_list.png";
import { Config } from "@jest/types";

export default class BottomInterestModal extends Component {
  state = {
    modalVisible: false,
    userInterests: []
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentWillReceiveProps(props) {
    this.setState({ modalVisible: props.modalVisible });
    this.setState({ userInterests: [...props.userHashtags] });
  }

  addOrRemoveInterestTags = tag => {
    const { userInterests } = this.state;
    if (userInterests.includes(tag)) {
      userInterests.splice(userInterests.indexOf(tag), 1);
    } else {
      userInterests.push(tag);
    }
    this.setState({ userInterests });
  };

  closeModal = () => {
    const { onPress, updateTags } = this.props;
    const { userInterests } = this.state;
    updateTags([...userInterests]);
    onPress();
  };

  render() {
    const { t, username } = this.props;
    const { modalVisible, userInterests } = this.state;
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // // Alert.alert('Modal has been closed.');
            // this.setState({ modalVisible: false }, () => {
            //   onPress();
            // })
            this.closeModal();
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-end",
              backgroundColor: "rgba(0,0,0,0.6)",
              flex: 1
            }}
          >
            <View
              style={{
                borderWidth: 0,
                width,
                backgroundColor: "#fff",
                justifyContent: "flex-end",
                height: Dimensions.get("window").height * 0.5
              }}
            >
              <ScrollView>
                <View style={{ ...styles.interestHeaderContainer, marginTop: 18 }}>
                  <Text style={styles.headerText}>{t("vibes:tagOfInterest")}</Text>
                  <TouchableOpacity
                    onPress={() => this.closeModal()}
                    hitSlop={{ top: 20, bottom: 20, right: 20, left: 20 }}
                    style={styles.closeButtonContainer}
                  >
                    <Image
                      resizeMode="contain"
                      style={{
                        flex: 1,
                        tintColor: config.navyBlack,
                        width: 15,
                        height: 8
                      }}
                      source={icDropModal}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.userInterestsContainer}>
                  {userInterests.map((item, index) => (
                    <View key={index} style={styles.interestContainer}>
                      <Text style={styles.interestText}>
                        {"#"} {item}{" "}
                      </Text>
                    </View>
                  ))}
                </View>

                <View style={{ ...styles.interestHeaderContainer, marginTop: 18 }}>
                  <Text style={styles.headerText}>{username}</Text>
                </View>

                {this.props.interestedHashtags.map((item, index) => (
                  <View
                    style={{
                      width,
                      // marginHorizontal: 15,
                      marginVertical: 10,
                      backgroundColor: config.whiteGray,
                      borderBottomWidth: 1,
                      borderBottomColor: config.veryLightPink
                    }}
                  >
                    <View
                      style={{
                        marginVertical: 9,
                        height: 25,
                        borderBottomColor: config.veryLightPink,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width,
                        flexDirection: "row",
                        paddingHorizontal: 15
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: config.regularFont,
                          fontSize: 18,
                          fontWeight: "normal",
                          fontStyle: "normal",
                          lineHeight: 20,
                          letterSpacing: 0,
                          // marginHorizontal: 10,
                          color: config.greyishBrown
                        }}
                      >
                        {/* {'#'} */}
                        {item}
                      </Text>
                      <CheckBox
                        title="Click Here"
                        selected={userInterests.includes(item)}
                        onPress={() => this.addOrRemoveInterestTags(item)}
                      />
                      {/* {item === 1
                      ? <Text
                          style={{
                            fontFamily: config.regularFont,
                            fontSize: 18,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            lineHeight: 20,
                            letterSpacing: 0,
                            marginHorizontal: 10,
                            color: config.greyishBrown,
                          }}
                        >
                          {item}
                        </Text>
                      : <Text
                          style={{
                            marginHorizontal: 10,
                            fontFamily: config.regularFont,
                            fontSize: 18,
                            fontWeight: 'normal',
                            fontStyle: 'normal',
                            lineHeight: 20,
                            letterSpacing: 0,
                            color: config.clearBlue,
                          }}
                        >
                          # 인테리어
                        </Text>} */}
                      {/* {item === 1
                      ? <View style={{marginHorizontal: 10, paddingBottom: 10}}>
                          <CheckBox normalImage={CheckboxIcon} />
                        </View>
                      : <View
                          style={{
                            marginHorizontal: 10,
                          }}
                        />} */}
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  interestText: {
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    lineHeight: 18,
    letterSpacing: 0,
    color: config.black
  },
  interestContainer: {
    height: 30,
    backgroundColor: config.paleGrey,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 3,
    textTransform: "lowercase",
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 15,
    marginVertical: 6
  },
  userInterestsContainer: {
    flexWrap: "wrap",
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
    // marginHorizontal: 15
  },
  closeButtonContainer: {
    paddingRight: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 15,
    height: 15
  },
  headerText: {
    fontFamily: config.regularFont,
    fontSize: 18,
    marginHorizontal: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: config.black
  },
  interestHeaderContainer: {
    width: "100%",
    marginVertical: 9,
    height: 25,
    borderBottomColor: config.veryLightPink,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
