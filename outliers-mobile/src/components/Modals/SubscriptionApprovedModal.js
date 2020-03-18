// 01.play_01.outliers_confirm
import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

import config from '@src/config';
import Modal from '@components/CustomModal';
import IconInput from '@components/IconInput';

import imgConfrimJoy from '@assets/images/imgConfrimJoy.png';

const {width} = Dimensions.get ('window');
class SubscriptionApprovedModal extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Modal buttonText1="확인">
          <View style={styles.innerModalContainer}>
            <Image style={styles.headerImage} source={imgConfrimJoy} />
            <Text style={styles.boldTextHeader}>
              축하합니다 :) 가입이 승인되었습니다!
            </Text>
            <Text style={styles.infoText1}>
              가입혜택
              <Text style={{color: config.black, fontWeight: "normal"}}> 바로 사용가능한 클로버 7개를 드려요! </Text>
            </Text>
          </View>
        </Modal>
      </View>
    );
  }
}

export default SubscriptionApprovedModal;

const styles = StyleSheet.create ({
  noteText: {
    marginTop: 5,
    fontFamily: config.regularFont,
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    color: config.pointRed,
  },
  textInputStyle: {
    textAlignVertical: 'top',
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'normal',
    flexWrap: 'wrap',
    lineHeight: 18,
    letterSpacing: 0,
    color: config.hintText,
  },
  textInputContainer: {
    width: width * 0.7,
    height: 90,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderWidth: 1,
    backgroundColor: config.white,
    borderColor: config.whiteTwo,
  },
  infoText1: {
    width,
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: "600",
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0,
    letterSpacing: 0,
    textAlign: 'center',
    color: config.pointRed,
  },
  boldTextHeader: {
    fontFamily: config.regularFont,
    fontStyle: 'normal',
    marginBottom: 4,
    letterSpacing: 0,
    textAlign: 'center',
    color: config.black,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 22
  },
  headerImage: {
    height: 104,
    aspectRatio: 1,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  innerModalContainer: {
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
