import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

import config from '@src/config';
import Modal from '@components/CustomModal';
import IconInput from '@components/IconInput';

import imgSendcoffee from '@assets/images/imgSendcoffee.png';
import icClover from '@assets/images/ic_clover.png';

const {width} = Dimensions.get ('window');
class SendCoffeeModal extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Modal
          hasTwo
          hasTwoIcon={icClover}
          hasTwoIconText={" x 12"}
          buttonText1="취소"
          buttonText2="커피선물"
        >
          <View style={styles.innerModalContainer}>
            <Image style={styles.headerImage} source={imgSendcoffee} />
            <Text style={styles.boldTextHeader}>
              상대에게 커피를 전해주세요 :)
            </Text>
            <Text style={styles.infoText1}>
              상대는 클로버1개에 수락을 하고, 커피를 선물 받아요
            </Text>
            <IconInput
              isRightImage={false}
              iconStyle={{width: 0, margin: -10}}
              insetShadowStyle={{height: 0}}
              inputStyle={styles.textInputContainer}
              textInputStyle={styles.textInputStyle}
              placeholder="[선택사항] 메시지와 함께 전달하는 경우 매칭확률이 높아집니다 ! "
              type="emailAddress"
              keyboardType="email-address"
            />
            <Text style={styles.noteText}>
              연락처/sns등을 기재하는 경우 모니터링에 의해 지워질 수 {'\n'}
              있으며 활동이 일정기간 정지됩니다.{'\n'}
              상대가 거절해도 클로버는 환급되지 않습니다.
            </Text>
          </View>
        </Modal>
      </View>
    );
  }
}
export default SendCoffeeModal;

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
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
    color: config.lightGrey,
  },
  boldTextHeader: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
    color: config.black,
  },
  headerImage: {
    height: 60,
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
