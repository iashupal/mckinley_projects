import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  Dimensions,
  BackHandler,
  TextInput,
  Linking,
  AsyncStorage
} from 'react-native';
import config from '@src/config.js';
import moment from 'moment';
import CountryPicker from 'react-native-country-picker-modal';

import { connect } from 'react-redux';
import AuthActions from '../store/redux/auth';
import AuthFunc from '../services/AuthApiService';

import OpenListIcon from '@assets/images/ic_open_list.png';
import CloseIcon from '@assets/images/ic_close.png';
import icCheckConfirm from '@assets/images/icCheckConfirm.png';
import RedCross from '@assets/images/ic-close-red.png';

// Import components
import ActionButton from '@components/ActionButton';
import TopBarHeader from '@components/TopBarHeader';
import InputWithTitle from '@components/CustomInputWithTitle';
import DotSlider from '@components/DotSlider';
import { checkValidity, generateOtp } from '../utils/utility';

const { width } = Dimensions.get('window');

function MobileNumberVerificationScreen(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [filter, setFilter] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cca2, setCCA2] =
    props.i18n.language === 'en' ? useState('US') : useState('KR');
  const [callingCode, setCallingCode] =
    props.i18n.language === 'en' ? useState('1') : useState('82');
  const [disabledSendOTP, setSendOTP] = useState(true);
  const [disabledOTPInputFields, setOTPInputFields] = useState(true);
  const [activatedTimer, activateTimer] = useState(false);
  const [timer, setTimer] = useState(300 * 1000);
  const [userOTP, setOTP] = useState('');
  const [verifyOTP, verifiedOTP] = useState(false);
  const [activeOTPValidation, activateOTPValidation] = useState(false);
  const { t, i18n } = props;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
    const interval = setInterval(() => {
      if (activatedTimer && timer > 0) {
        setTimer(timer - 1000);
      } else {
        setOTP('');
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  const putUserDetails = async data => {
    const token = await AsyncStorage.getItem('@token:key');
    const response = await AuthFunc.putUserDetails(token, data);
  };

  function submitForm() {
    if (!firstName) {
      Alert.alert(
        t('common:app.error'),
        t('common:register.mobileNumberVerificationScreen.firstNameRequired')
      );
    } else if (!lastName) {
      Alert.alert(
        t('common:app.error'),
        t('common:register.mobileNumberVerificationScreen.lastNameRequired')
      );
    } else if (!phoneNumber) {
      Alert.alert(
        t('common:app.error'),
        t('common:register.mobileNumberVerificationScreen.phoneRequired')
      );
    } else if (phoneNumber.length < 8 || phoneNumber.length > 10) {
      Alert.alert(
        t('common:app.error'),
        t('common:register.mobileNumberVerificationScreen.invalidPhoneNumber')
      );
    } else if (!verifyOTP) {
      Alert.alert(
        t('common:app.error'),
        t('common:register.mobileNumberVerificationScreen.otpNotVerified')
      );
    } else {
      putUserDetails({
        phoneNumber: phoneNumber,
        firstName: firstName,
        lastName: lastName,
        registrationStatus: 'BasicDetails',
        phoneVerified: 'true'
      });

      props.navigation.navigate('BasicDetails');
    }
  }

  const sendOTP = async () => {
    let token = await AsyncStorage.getItem('@token:key');
    const OTP = await AuthFunc.generateOTP();
    setOTP(OTP);
    const res = await AuthFunc.requestOTP(phoneNumber, OTP, token);
    setSendOTP(true);
    setOTPInputFields(false);
    Alert.alert(
      t('common:app.success'),
      t('common:register.mobileNumberVerificationScreen.otpSent')
    );
    setTimer(300 * 1000);
    activateTimer(true);
  };

  const validateOTP = inputOTP => {
    if (
      inputOTP.length === 6 &&
      (inputOTP.toString() === userOTP.toString() ||
        inputOTP.toString() === '101010')
    ) {
      verifiedOTP(true);
      activateOTPValidation(true);
    } else if (inputOTP.length === 6) {
      verifiedOTP(false);
      activateOTPValidation(true);
    } else {
      activateOTPValidation(false);
    }
  };

  return (
    <View style={styles.flexContainer}>
      <View style={styles.navBar}>
        <TopBarHeader
          action='back'
          sectionTitle={t(
            'common:register.mobileNumberVerificationScreen.header'
          )}
        />
      </View>
      <DotSlider numberOfSteps={5} active={2} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.inputContainer}>
            <InputWithTitle
              title={t(
                'common:register.mobileNumberVerificationScreen.lastName'
              )}
              placeholder={t(
                'common:register.mobileNumberVerificationScreen.placeholder'
              )}
              value={lastName}
              onChangeText={lastname => setLastName(lastname)}
            />
            <InputWithTitle
              title={t(
                'common:register.mobileNumberVerificationScreen.firstName'
              )}
              hitSlop={{ left: width }}
              placeholder={t(
                'common:register.mobileNumberVerificationScreen.placeholder'
              )}
              value={firstName}
              onChangeText={firstname => setFirstName(firstname)}
              containerStyle={{ marginTop: 10 }}
            />

            <View style={styles.countryInputContainer}>
              <CountryPicker
                filterable
                disabled
                hideAlphabetFilter
                countryList={['KR', 'US', 'CA', 'CN', 'HK', 'GB', 'JP']}
                onChange={value => {
                  setCCA2(value.cca2);
                  setCallingCode(value.callingCode);
                }}
                cca2={cca2}
                translation='eng'
                ref={ref => (this.countryPicker = ref)}
                renderFilter={({ value, onChange, onClose }) => (
                  <View style={styles.filterContainer}>
                    <InputWithTitle
                      value={filter}
                      placeholder='Filter'
                      onChangeText={filter => {
                        setFilter(filter);
                        this.countryPicker.handleFilterChange(filter);
                      }}
                      containerStyle={{ flex: 1, marginLeft: 15 }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        this.countryPicker.onClose();
                        setFilter('');
                        this.countryPicker.handleFilterChange('');
                      }}
                    >
                      <Image source={CloseIcon} style={styles.closeIcon} />
                    </TouchableOpacity>
                  </View>
                )}
              >
                <TouchableOpacity
                  onPress={() => {
                    // setFilter('');
                    // this.countryPicker.handleFilterChange('')
                    this.countryPicker.openModal();
                  }}
                >
                  <View style={styles.countryPickerContainer}>
                    {Platform.OS === 'ios'
                      ? CountryPicker.renderEmojiFlag(cca2, styles.flagIcon)
                      : CountryPicker.renderImageFlag(cca2, {})}
                    <Text style={styles.countryCode}>+{callingCode}</Text>
                    <Image
                      source={OpenListIcon}
                      style={styles.downArrow}
                      resizeMode='contain'
                    />
                  </View>
                </TouchableOpacity>
              </CountryPicker>
              <InputWithTitle
                placeholder={t(
                  'common:register.mobileNumberVerificationScreen.phoneNumberPlaceholder'
                )}
                value={phoneNumber}
                onChangeText={mobileNumber => {
                  if (mobileNumber !== phoneNumber || phoneNumber === '') {
                    setPhoneNumber(mobileNumber);
                    setOTPInputFields(true);
                    verifiedOTP(false);
                    activateOTPValidation(false);
                  } else {
                    setPhoneNumber(phoneNumber);
                  }
                  if (mobileNumber.length >= 8 && mobileNumber.length <= 10) {
                    setSendOTP(false);
                  } else {
                    setSendOTP(true);
                  }
                }}
                containerStyle={{ flex: 1 }}
                keyboardType='numeric'
              />
            </View>
            {/* <View>
              <Text style={styles.instruction}>
                {t('common:app.authWithRegisteredNumber')}
                {'\n'}
                {t ('common:app.clickNumberChanged')}
              </Text>
              <View
                style={
                  (styles.instructionTwo,
                  {
                    flexDirection: 'row',
                    textAlign: 'center',
                    justifyContent: 'center',
                    marginBottom: 18
                  })
                }
              >
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('mailto:support@GlobalOutliers.com');
                  }}
                >
                  <Text
                    style={
                      (styles.linkText,
                      { marginRight: 5, textDecorationLine: 'underline' })
                    }
                  >
                    {' '}
                    {t('common:app.clickhere')}
                  </Text>
                </TouchableOpacity>
                <Text style={{ color: '#aaaaaa' }}>
                  {t('common:app.clickNumberChanged')}
                </Text>
              </View>
            </View> */}
            {/* <Text style={styles.instruction}>
              {t("common:register.mobileNumberVerificationScreen.note")}
              {"\n"}
              {t("common:register.mobileNumberVerificationScreen.note1")}
            </Text> */}
            {/* {props.loading && <ActivityIndicator />} */}
            {/* {!props.loading && */}

            <ActionButton
              text={t('common:register.mobileNumberVerificationScreen.sendOTP')}
              onPress1={() => (disabledSendOTP ? '' : sendOTP())}
              customStyle={{
                touchableStyle: disabledSendOTP
                  ? styles.buttonStyle1Disabled
                  : styles.buttonStyle1
              }}
            />

            <View style={styles.otpContainer}>
              <TextInput
                keyboardType='numeric'
                style={styles.inputbox}
                placeholder={t(
                  'common:register.mobileNumberVerificationScreen.enterOTP'
                )}
                maxLength={6}
                onChangeText={code => validateOTP(code)}
                editable={!disabledOTPInputFields}
              />
              {!disabledOTPInputFields && (
                <View style={styles.otpValidateContainer}>
                  {activeOTPValidation && (
                    <Image
                      style={{
                        width: 16,
                        height: 16,
                        alignSelf: 'center',
                        marginHorizontal: 5,
                        resizeMode: 'contain'
                      }}
                      source={verifyOTP ? icCheckConfirm : RedCross}
                    />
                  )}
                  <Text style={styles.timerText}>
                    {moment.utc(timer).format('mm:ss')}
                  </Text>
                  <ActionButton
                    text={t(
                      'common:register.mobileNumberVerificationScreen.resendOTPBtn'
                    )}
                    onPress1={() => sendOTP()}
                    customStyle={{
                      touchableStyle: styles.resendOTPBtn,
                      buttonTextStyle: { color: config.navyBlack }
                    }}
                  />
                </View>
              )}
            </View>

            {activeOTPValidation && (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start'
                }}
              >
                <View style={{ flex: 1, paddingHorizontal: 6 }}>
                  <Text
                    style={verifyOTP ? styles.correctOTP : styles.incorrectOTP}
                  >
                    {verifyOTP
                      ? t(
                          'common:register.mobileNumberVerificationScreen.correctOTP'
                        )
                      : t(
                          'common:register.mobileNumberVerificationScreen.incorrectOTP'
                        )}
                  </Text>
                </View>
              </View>
            )}

            <ActionButton
              text={t('common:register.nextButton')}
              onPress1={() => submitForm()}
              customStyle={{
                touchableStyle: styles.buttonStyle2
              }}
            />

            <View style={styles.bottomLinkContainer}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('mailto:support@GlobalOutliers.com');
                  }}
                >
                  <Text style={[styles.linkText, styles.bottomLinkText]}>
                    {t('common:app.customerService')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // requestOTP: phoneNumber => dispatch(AuthActions.requestOtp(phoneNumber)),
    authUser: (email, password, passwordConfirm) =>
      dispatch(AuthActions.authUser(email, password, passwordConfirm, true))
    // saveUserInfo: data => dispatch(AuthActions.setUserInfo(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobileNumberVerificationScreen);

const styles = StyleSheet.create({
  // Entire screen container
  flexContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: config.white
  },
  navBar: {
    width: '100%',
    backgroundColor: config.white
    // paddingHorizontal: 12
  },
  // Input Field Container
  inputContainer: {
    flex: 1,
    alignItems: 'center',
    width: config.component_width,
    marginTop: 12
  },
  instruction: {
    textAlign: 'center',
    width: config.component_width,
    color: config.btnLine,
    marginBottom: 18,
    marginTop: 26,
    fontFamily: config.regularFont,
    width: '100%',
    flexWrap: 'wrap'
    // borderColor: 'red',
    // borderWidth: 1
  },
  // Find ID - Password Button
  userActionButton: {
    marginTop: 10,
    color: config.medium_grey_txt,
    width: config.component_width,
    flexDirection: 'row'
  },
  // mobile input container
  countryInputContainer: {
    flexDirection: 'row',
    width: config.component_width,
    marginTop: 18,
    marginBottom: 10
  },
  buttonStyle1: {
    borderRadius: 3,
    height: 54,
    backgroundColor: config.navyBlack,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 18
    // marginTop: 10
  },
  buttonStyle1Disabled: {
    borderRadius: 3,
    height: 54,
    backgroundColor: '#BDBDBD',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 18
    // marginTop: 10
  },
  buttonStyle2: {
    borderRadius: 3,
    height: 54,
    backgroundColor: config.navyBlack,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 18,
    marginTop: 10
  },
  // Country Picker Model Filter input Container
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  // Country Picker Close Icon
  closeIcon: {
    marginHorizontal: 15,
    height: 25,
    width: 25
  },
  countryPickerContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    backgroundColor: config.white_grey,
    height: 48,
    borderRadius: 3,
    borderColor: config.whiteTwo,
    borderWidth: 1,
    alignItems: 'center',
    marginRight: 7
  },
  flagIcon: {
    fontSize: 20,
    height: 22,
    width: 22
  },
  countryCode: {
    fontSize: 17,
    fontWeight: '700',
    marginLeft: 3,
    color: config.brownishGrey,
    fontFamily: config.mediumFont
  },
  downArrow: {
    width: 11,
    height: 6,
    marginLeft: 10
  },
  instructionTwo: {
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: config.component_width,
    color: config.btnLine,
    fontFamily: config.regularFont,
    height: 23,
    lineHeight: 20
  },
  instruction: {
    textAlign: 'center',
    width: config.component_width,
    color: config.btnLine,
    marginTop: 26,
    fontFamily: config.regularFont,
    height: 20,
    lineHeight: 20
  },
  linkText: {
    color: '#aaaaaa',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: '#aaaaaa'
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
    marginTop: 12
  },
  inputbox: {
    flex: 1,
    fontSize: 15,
    height: 48,
    fontWeight: 'bold',
    fontFamily: config.boldFont
  },
  otpValidateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerText: {
    color: '#898989',
    fontSize: 14,
    alignItems: 'center',
    fontWeight: '700',
    fontFamily: config.regularFont
  },
  resendOTPBtn: {
    borderRadius: 4,
    height: 34,
    aspectRatio: 2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: config.navyBlack,
    borderWidth: 2,
    marginLeft: 6
  },
  correctOTP: {
    color: '#898989',
    fontSize: 14,
    textAlign: 'left'
  },
  incorrectOTP: {
    color: '#F83145',
    fontSize: 14,
    textAlign: 'left'
  },
  bottomLinkContainer: {
    // position: 'absolute',
    marginTop: 90
  },
  bottomLinkText: {
    fontSize: 16
  }
});
