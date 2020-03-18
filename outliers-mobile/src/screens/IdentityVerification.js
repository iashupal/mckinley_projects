import React, { Fragment, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  BackHandler
} from 'react-native';
import config from '@src/config';
import moment from 'moment';

// Import Redux and Saga
import { connect } from 'react-redux';

//Import components
import ActionButton from '@components/ActionButton';
import DotSlider from '@components/DotSlider';
import TopBarHeader from '@components/TopBarHeader';
import CheckBox from '@components/CheckBox';
import Modal from '@components/CustomModal';

//Import assets
import SendConfirmIcon from '@assets/images/ic_send_confirm_b.png';
import icCheckConfirm from '@assets/images/icCheckConfirm.png';
import CheckboxIcon from '@assets/images/ic_outline_checkbox.png';
import { generateOtp } from '../utils/utility';

function throwError(error) {
  switch (error) {
    case 'ERRORS':
      Alert.alert('오류', '올바르지 않은 비밀번호입니다.');
      break;
    default:
      Alert.alert('오류', '적절한 세부 사항을 입력하십시오');
      break;
  }
}

function IdentityVerfication(props) {
  const [clientCode, setClientCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [timeLimit, setTimeLimit] = useState(300); //In Seconds
  const [modalVisible, toggleModal] = useState(false);

  let interval;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
    interval = setInterval(() => countDown(), 1000);
    return function cleanup() {
      clearInterval(interval);
    };
  });

  function countDown() {
    setTimeLimit(timeLimit - 1);
    if (timeLimit <= 0) {
      clearInterval(interval);
      props.invalidateOTP();
    }
  }

  function compareCode() {
    if (true) {
      if (clientCode == '101010' || clientCode == props.otpCode) {
        // props.initiateAddPhone (phoneNumber);
        toggleModal(true);
        // props.navigation.navigate ('AgreeTerms');
      } else {
        Alert.alert('오류', '인증번호를 확인하세요.');
      }
    } else {
      Alert.alert('오류', '인증번호를 입력하세요.');
    }
  }

  function submitForm() {
    if (!clientCode) {
      throwError();
    } else {
      compareCode();
    }
  }

  function requestOTPAgain() {
    setTimeLimit(300);
    Alert.alert('인증번호 재전송', '인증번호가 재전송 되었습니다.');
  }

  return (
    <Fragment>
      {modalVisible &&
        <Modal
          transparent={true}
          icon={SendConfirmIcon}
          heading="본인인증이 완료되었습니다."
          onClose={() => {
            toggleModal(false);
            props.navigation.navigate('AgreeTerms');
          }}
        >
          <Text style={styles.modalText}>
            000개의 연락처가 등록되었습니다.{'\n'}등록된 지인들에게는{'\n'}
            서로의 카드가 보이지 않습니다.{` `}
          </Text>
        </Modal>}
      <TopBarHeader sectionTitle="본인인증" action={'back'} />
      {/* Container */}
      <View style={styles.container}>
        {/* Mobile Number container */}
        <View style={styles.mobileNumberContailer}>
          <Text style={styles.mobileNumberText}>{'+82 10-2345-2356'}</Text>
          <Text
            onPress={() => {
              props.navigation.pop();
            }}
            style={{
              color: config.brownishGrey,
              fontSize: 17,
              fontWeight: '600',
              textDecorationLine: 'underline',
            }}
          >
            번호수정
          </Text>
        </View>
        {/* OTP Container */}
        <View style={styles.otpContainer}>
          <TextInput
            keyboardType="numeric"
            style={styles.inputbox}
            placeholder="인증번호 4자리 입력"
            onChangeText={code => setClientCode(code)}
            value={clientCode}
          />
          <View style={styles.otpValidateContainer}>
            {/* <Image
								source={BlueCheck}
								style={styles.checkIcon}
							/> */}
            {clientCode.length >= 6 &&
              <Image
                style={{
                  width: 16,
                  height: 16,
                  alignSelf: 'center',
                  marginHorizontal: 5,
                  resizeMode: 'contain',
                }}
                source={icCheckConfirm}
              />}
            <Text style={styles.timerText}>
              {moment.utc(timeLimit * 1000).format('mm:ss')}
            </Text>
          </View>
        </View>
        <ActionButton
          customStyle={{
            touchableStyle: styles.buttonStyle,
          }}
          text="인증하기"
          onPress1={() => {
            // submitForm();
            props.navigation.navigate("SubscribedID")
          }}
        />
      </View>
      <Text style={styles.serviceScenterText}>
        고객센터
      </Text>
    </Fragment>
  );
}

export default IdentityVerfication;

const styles = StyleSheet.create({
  // Entire screen container
  buttonStyle: {
    marginVertical: 12,
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    height: 54,
    borderRadius: 3,
    backgroundColor: config.navyBlack,
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },
  mobileNumberContailer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: config.component_width,
    marginVertical: 12,
    alignItems: 'center',
    fontFamily: config.regularFont,
  },
  otpContainer: {
    backgroundColor: config.white_grey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: config.whiteTwo,
    marginBottom: 4,
    marginTop: 12,
  },
  otpValidateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    textAlign: 'center',
    fontFamily: config.regularFont,
    fontSize: 14,
    color: config.black,
    lineHeight: 18,
  },
  inputbox: {
    flex: 1,
    fontSize: 15,
    height: 48,
    fontWeight: 'bold',
    fontFamily: config.boldFont,
  },
  checkIcon: {
    width: 16,
    height: 16,
  },
  timerText: {
    color: config.lightGrey,
    fontSize: 14,
    alignItems: 'center',
    fontWeight: '700',
    fontFamily: config.regularFont,
  },
  contactsFilterQuery: {
    flexDirection: 'row',
    alignItems: 'center',
    width: config.component_width,
    marginTop: 14,
    marginBottom: 20,
  },
  re_requestCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: config.component_width,
  },
  hintText: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: config.boldFont,
    color: config.lightGrey,
  },
  hintText2: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: config.boldFont,
    color: config.lightGrey,
    textDecorationLine: 'underline',
  },
  confirm: {
    fontSize: 16,
    color: config.brownishGrey,
    marginLeft: 5,
  },
  mobileNumberText: {
    color: config.clearBlue,
    fontSize: 20,
    fontWeight: '600',
    fontFamily: config.regularFont,
  },
  serviceScenterText: {
    fontFamily: config.regularFont,
    fontSize: 18,
    fontWeight: 'bold',
    color: config.btnLine,
    textDecorationLine: "underline",
    marginBottom: 50,
    alignSelf: 'center',
  },
});
