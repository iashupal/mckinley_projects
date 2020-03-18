// 01.play_01.outliers_level_pop
import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

import config from '@src/config';
import Modal from '@components/CustomModal';
import IconInput from '@components/IconInput';

import imgBlack1Pop from '@assets/images/imgBlack1Pop.png';
import icClover from '@assets/images/ic_clover.png';

const {width} = Dimensions.get ('window');
class CongratsRankModal extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Modal sideIcon={icClover}  sideIconText=" x 1" buttonText1="리워드 클로버 받기">
          <View style={styles.innerModalContainer}>
            <Image style={styles.headerImage} source={imgBlack1Pop} />
            <Text style={styles.boldTextHeader}>
              축하합니다!
            </Text>
            <Text
              style={{
                fontFamily: config.regularFont,
                fontSize: 13,
                fontWeight: 'normal',
                fontStyle: 'normal',
                lineHeight: 18,
                letterSpacing: 0,
                textAlign: 'center',
                color: config.black,
              }}
            >

              이번 주 평가 결과 회원님은 <Text style={styles.boldText}>
                상위 10%
              </Text> 입니다.
            </Text>

            <Text style={styles.infoText1}>
              *지난 한 주간 함께하지 못하게 된 멤버는 00명입니다.
            </Text>
          </View>
        </Modal>
      </View>
    );
  }
}

export default CongratsRankModal;

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
    fontSize: 13,
    fontWeight: 'normal',
    lineHeight: 20,
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: config.lightGrey,
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
    lineHeight: 22,
  },
  boldText: {
    fontFamily: config.regularFont,
    fontStyle: 'normal',
    marginBottom: 4,
    letterSpacing: 0,
    textAlign: 'center',
    color: config.black,
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  headerImage: {
    width: 175,
    aspectRatio: 2 / 1,
    marginBottom: 10,
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
