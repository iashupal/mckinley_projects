import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import styles from "./styles";

// @text : string
// @onPress1: function
// @hasTwo: bool
// @text2: string
// @onPress2: function
// @ hasThree: bool
// @text3: string
// @onPress3: function
// customStyle (optional): object [touchableStyle, buttonTextStyle]
export default function ActionButton(props) {
  let touchableStyle = styles.button;
  let buttonTextStyle = styles.buttonText;

  if (props.customStyle) {
    touchableStyle = props.customStyle.touchableStyle ? props.customStyle.touchableStyle : styles.button;
    buttonTextStyle = props.customStyle.buttonTextStyle ? props.customStyle.buttonTextStyle : styles.buttonText;
  }

  const onPress1 = () => {
    if (props.onPress1) props.onPress1();
  };
  const onPress2 = () => {
    if (props.onPress2) props.onPress2();
  };
  const onPress3 = () => {
    if (props.onPress3) props.onPress3();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={props.disabled}
        onPress={() => onPress1()}
        style={touchableStyle}
      >
        {props.icon && <Image style={props.iconStyle} source={props.icon} />}
        <Text style={buttonTextStyle}>{props.text}</Text>
        {props.sideIcon && (
          <Image style={styles.hasTwoIcon} source={props.sideIcon} />
        )}
        {props.sideIconText && (
          <Text style={styles.sideIconText}>{props.sideIconText}</Text>
        )}
      </TouchableOpacity>
      {props.hasTwo && (
        <TouchableOpacity
          onPress={() => onPress2()}
          style={
            (touchableStyle,
            {
              borderLeftWidth: 1,
              borderLeftColor: '#30363b',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row'
            })
          }
        >
          <Text style={buttonTextStyle}>{props.text2}</Text>
          {props.hasTwoIcon && (
            <Image style={styles.hasTwoIcon} source={props.hasTwoIcon} />
          )}
          {props.hasTwoIconText && (
            <Text style={styles.hasTwoIconText}>{props.hasTwoIconText}</Text>
          )}
        </TouchableOpacity>
      )}
      {props.hasThree && (
        <TouchableOpacity onPress={() => onPress3()} style={touchableStyle}>
          <Text style={buttonTextStyle}>{props.text3}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
