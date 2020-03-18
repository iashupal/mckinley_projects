import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "./styles";
import config from "@src/config";
import { withNamespaces } from "react-i18next";
class SegmentButtons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "ALL"
    };
  }

  render() {
    const { onPressSegement, t } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              backgroundColor: this.state.selected === "ALL" ? config.white : "transparent",
              borderWidth: this.state.selected === "ALL" ? 0.5 : 0
            }
          ]}
          onPress={() => this.setState({ selected: "ALL" }, () => !!onPressSegement && onPressSegement(false))}
        >
          <View style={styles.textContainer}>
            <Text style={styles.buttonTitle}>{t("common:app.all")}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              backgroundColor: this.state.selected === "MY" ? config.white : "transparent",
              borderWidth: this.state.selected === "MY" ? 0.5 : 0,
              marginLeft: -5,
              zIndex: 999
            }
          ]}
          onPress={() =>
            this.setState({ selected: "MY" }, () => {
              !!onPressSegement && onPressSegement(true);
            })
          }
        >
          <View style={styles.textContainer}>
            <Text style={styles.buttonTitle}>{t("common:app.my")}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default withNamespaces(["common"], { wait: true })(SegmentButtons);
