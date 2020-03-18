import React from "react";
import { View, TextInput, Image, Text } from "react-native";

import styles from "./styles";

export default class CustomInputWithTitle extends React.Component {
  render() {
    return (
      <View style={[styles.inputContiner, this.props.containerStyle]}>
        {this.props.icon && (
          <Image
            source={this.props.icon}
            style={styles.icon}
            resizeMode="contain"
          />
        )}
        {this.props.title && (
          <Text
            onPress={() => {
              !!this.textRef && this.textRef.focus();
            }}
            style={styles.title}
          >
            {this.props.title}
          </Text>
        )}
        <TextInput
          ref={ref => (this.textRef = ref)}
          multiline={this.props.multiline}
          keyboardType={this.props.keyboardType}
          style={[
            styles.textInput,
            this.props.inputStyle,
            {
              marginLeft: this.props.icon || this.props.title ? 18 : 0,
              textAlign: this.props.icon || this.props.title ? "right" : "left"
            }
          ]}
          {...this.props}
          // editable={!this.props.disabled}
          // selectTextOnFocus={!this.props.disabled}
          value={this.props.value}
        />
      </View>
    );
  }
}
