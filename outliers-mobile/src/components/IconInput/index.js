import React from 'react';
import { View, TextInput, Image } from 'react-native';

import styles from './styles';

export default function IconInput(props) {
  return (
    <View style={{ ...styles.inputWithIcon, ...props.inputStyle }}>
      <View style={{ ...styles.insetShadow, ...props.insetShadowStyle }} />
      <View style={{ ...styles.insetShadow, ...props.insetShadowStyle }} />
      <Image source={props.icon} style={[styles.icon, props.iconStyle]} />
      <TextInput
        multiline={props.multiline}
        style={{ ...styles.textInput, ...props.textInputStyle }}
        {...props}
      />
    </View>
  );
}
