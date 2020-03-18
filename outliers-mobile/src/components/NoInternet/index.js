import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import ActionButton from '@components/ActionButton';

import icNetwork from '@assets/images/icNetwork.png';

import styles from './styles';

const NoInternetScreen = props => (
  <View style={styles.container}>
    <Image
      style={{width: 162, aspectRatio: 2 / 1, resizeMode: 'contain'}}
      source={icNetwork}
    />
    <Text style={styles.headerText}>
      네트워크가 불안정합니다.
    </Text>
    <Text style={styles.subtitleText}>
      인터넷 연결 상태를 확인해주세요.
    </Text>
    <ActionButton
      customStyle={{
        touchableStyle: styles.buttonStyle,
      }}
      // onPress1={() => toggleRegisterModal (true)}
      text="동의/진행"
    />
  </View>
);
export default NoInternetScreen;
