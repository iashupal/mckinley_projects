import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import ActionButton from '@components/ActionButton';

import dormancy from '@assets/images/dormancy.png';

import styles from './styles';

const NoInternetScreen = props => (
  <View style={styles.container}>
    <Image
      style={{width: 162, aspectRatio: 2 / 1, resizeMode: 'contain'}}
      source={dormancy}
    />
    <Text style={styles.headerText}>
      휴면중입니다.
    </Text>
    <Text style={styles.subtitleText}>
      휴면 상태에서는 매칭에 참여되지 않으며{"\n"}
      화면에서 비공개됩니다.
    </Text>
    <ActionButton
      customStyle={{
        touchableStyle: styles.buttonStyle,
      }}
      // onPress1={() => toggleRegisterModal (true)}
      text="휴면 해제하기"
    />
  </View>
);
export default NoInternetScreen;
