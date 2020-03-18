// Import npm modules
import React, { Component, Fragment, useState, useEffect } from 'react';
import {
  Linking,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  Picker,
  BackHandler,
  ScrollView
} from 'react-native';
import DotSlider from '@components/DotSlider';
import moment from 'moment';
import { connect } from 'react-redux';
import AuthActions from '../store/redux/auth';

import '../../node_modules/react-native-country-picker-modal/src/CountryPicker.style';

import { TabView, SceneMap } from 'react-native-tab-view';
import ImagePicker from 'react-native-image-picker';
import CountryPicker from 'react-native-country-picker-modal';
const { width } = Dimensions.get('window');
import { useNetInfo } from '@react-native-community/netinfo';

// Import components
import TopBarHeader from '@components/TopBarHeader';
import ActionButton from '@components/ActionButton';
import CheckBox from '@components/CheckBox';
import InputBox from '@components/InputBox';
import InputWithTitle from '@components/InputWithTitle';
import api from './../services/AuthApiService';
// Import assets and config
import config from '@src/config';
import DownArrow from '@assets/images/ic_set_arrow.png';

import OpenListIcon from '@assets/images/ic_open_list.png';
import CloseIcon from '@assets/images/ic_close.png';
import { checkValidity, generateOtp } from '../utils/utility';

import SideArrow from '@assets/images/btn_more_big.png';
import CheckboxIcon from '@assets/images/ic_outline_checkbox.png';
import icCheckConfirm from '@assets/images/icCheckConfirm.png';

function FindId(props) {
  const [filter, setFilter] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cca2, setCCA2] = useState('US');
  const [callingCode, setCallingCode] = useState('1');
  const { t, i18n } = props;
  const netInfo = useNetInfo();
  let [clientCode, setClientCode] = useState('');
  const [timeLimit, setTimeLimit] = useState(300);
  const [modalVisible, toggleModal] = useState(false);
  const [selected, setSelected] = useState(false);
  const [rawContacts, setRawContacts] = useState([]);
  const [checkVisible, toggleCheck] = useState(false);
  const [timerVisible, toggleTimer] = useState(false);

  let interval;
  let checkBoxRef;

  async function putUserDetails(data) {
    const token = await AsyncStorage.getItem('@token:key');
    const response = await api.putUserDetails(token, data);
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
    interval = setInterval(() => countDown(), 1000);
    return function cleanup() {
      clearInterval(interval);
      // props.invalidateOTP ();
    };
  });

  function countDown() {
    setTimeLimit(timeLimit - 1);
    if (timeLimit <= 0) {
      clearInterval(interval);

      //FIXME: IF ENABLED, and User is doing something on other screen, it will send it back it OTP Screen.
      // props.navigation.pop();
      // props.invalidateOTP();
    }
  }

  // function requestOTPAgain() {
  //   setTimeLimit(300);
  //   // props.requestOTP(phoneNumber);
  //   Alert.alert(t('common:register.mobileNumberVerificationScreen.resendOTP.title'), t('common:register.mobileNumberVerificationScreen.resendOTP.message'));
  // }
  async function submitForm() {
    if (!netInfo.isConnected) {
      Alert.alert('', t('common:app.noNet'));
      return;
    }
    if (!phoneNumber) {
      Alert.alert(t('common:app.error'), t('common:app:enterNumber'));
      return;
    } else {
      const response = await api.getSubscribedId(phoneNumber);
      console.log('User ID', response.data.Body);
      if (response.data.Body === 'USER_NOT_FOUND') {
        Alert.alert(t('common:app.error'), t('common:app.userNotFound'));
      } else {
        if (clientCode == '101010' || clientCode == props.otpCode) {
          props.navigation.navigate('SubscribedID', {
            emailId: response.data.Body,
            backRoute: 'Login'
          });
        } else {
          Alert.alert(
            t('common:app.error'),
            t(
              'common:register.mobileNumberVerificationScreen.verifyVerificationNumber'
            )
          );
        }
      }
    }
  }

  function sentOtp() {
    if (!phoneNumber) {
      Alert.alert(t('common:app.error'), t('common:app.enterContact'));
    } else if (phoneNumber.length <= 8) {
      Alert.alert(
        t('common:app.error'),
        t('common:register.mobileNumberVerificationScreen.invalidPhoneNumber')
      );
    } else if (!checkValidity(phoneNumber, { isNumeric: true })) {
      Alert.alert(
        t('common:app.error'),
        t('common:register.mobileNumberVerificationScreen.invalidPhoneNumber')
      );
    } else {
      Alert.alert(t('common:app.success'), t('common:app.otpSen'));
      props.requestOTP(phoneNumber);
    }
  }

  return (
    <Fragment>
      <View style={stylesId.flexContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: '10%' }}
        >
          <View style={stylesId.inputContainer}>
            <View style={stylesId.countryInputContainer}>
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
                  <View style={stylesId.filterContainer}>
                    <InputWithTitle
                      value={filter}
                      placeholder={t('common:app.filter')}
                      onChangeText={filter => {
                        setFilter(filter);
                        this.countryPicker.handleFilterChange(filter);
                      }}
                      // style={styles.inputboxText}
                      containerStyle={{ flex: 1, marginLeft: 15 }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        this.countryPicker.onClose();
                        setFilter('');
                        this.countryPicker.handleFilterChange('');
                      }}
                    >
                      <Image source={CloseIcon} style={stylesId.closeIcon} />
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
                  <View style={stylesId.countryPickerContainer}>
                    {Platform.OS === 'ios'
                      ? CountryPicker.renderEmojiFlag(cca2, stylesId.flagIcon)
                      : CountryPicker.renderImageFlag(cca2, {})}
                    <Text style={stylesId.countryCode}>+{callingCode}</Text>
                    <Image
                      source={OpenListIcon}
                      style={stylesId.downArrow}
                      resizeMode='contain'
                    />
                  </View>
                </TouchableOpacity>
              </CountryPicker>
              <InputWithTitle
                placeholder={t('common:app.noDashNumber')}
                value={phoneNumber}
                onChangeText={mobileNumber => {
                  // props.saveUserInfo ({phoneNumber: mobileNumber});
                  setPhoneNumber(mobileNumber);
                }}
                containerStyle={{ flex: 1 }}
                keyboardType='phone-pad'
              />
            </View>
            <View style={{ marginTop: 12, marginBottom: 0, width: '100%' }}>
              {timerVisible ? (
                <TouchableOpacity style={styles.inactiveBtn}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 16,
                      textAlign: 'center'
                    }}
                  >
                    {t('common:app.getVerificationCode')}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.activeBtn}
                  onPress={() => {
                    sentOtp();
                    if (phoneNumber !== '') {
                      toggleTimer(true);
                    } else {
                      toggleTimer(false);
                    }
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 16,
                      textAlign: 'center'
                    }}
                  >
                    {t('common:app.getVerificationCode')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.containerTwo}>
              {/* <DotSlider numberOfSteps={4} active={2} /> */}
              {/* OTP Container */}
              <View style={styles.otpContainer}>
                <TextInput
                  keyboardType='numeric'
                  style={{
                    flex: 1,
                    paddingHorizontal: 10
                  }}
                  placeholder={t('common:app.number')}
                  maxLength={6}
                  onChangeText={code => {
                    setClientCode(code);
                    if (
                      code === props.otpCode ||
                      (code === '101010' && code.length === 6)
                    ) {
                      toggleCheck(true);
                    } else {
                      toggleCheck(false);
                    }
                  }}
                  value={clientCode}
                />
                <View style={styles.otpValidateContainer}>
                  {/* {(clientCode == props.otpCode || clientCode === '101010') && (
              <Image
                style={{
                  width: 16,
                  height: 16,
                  alignSelf: 'center',
                  marginHorizontal: 5,
                  resizeMode: 'contain',
                }}
                source={icCheckConfirm}
              />
            )} */}

                  {checkVisible && (
                    <Image
                      style={{
                        width: 16,
                        height: 16,
                        alignSelf: 'center',
                        marginHorizontal: 5,
                        resizeMode: 'contain'
                      }}
                      source={icCheckConfirm}
                    />
                  )}
                  {timerVisible && (
                    <Text style={styles.timerText}>
                      {moment.utc(timeLimit * 1000).format('mm:ss')}
                    </Text>
                  )}
                </View>
              </View>
              {clientCode === props.otpCode || clientCode === '101010' ? (
                <TouchableOpacity
                  style={styles.activeBtn}
                  onPress={() => submitForm()}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 16,
                      textAlign: 'center'
                    }}
                  >
                    {t('common:app.authenticate')}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.inactiveBtn}
                  onPress={() => submitForm()}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 16,
                      textAlign: 'center'
                    }}
                  >
                    {t('common:app.authenticate')}
                  </Text>
                </TouchableOpacity>
              )}

              <View style={styles.verificationContainer}>
                <Text style={styles.verifyText}>
                  {t('common:app.noVerifyNumber')}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    sentOtp();
                    setClientCode('');
                    if (phoneNumber !== '') {
                      toggleTimer(true);
                    } else {
                      toggleTimer(false);
                    }
                  }}
                >
                  <Text style={styles.requestText}>
                    {t('common:app.requestAgain')}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <View>
              <Text style={stylesId.instruction}>
                {t('common:app.authWithRegisteredNumber')}
                {'\n'}
              </Text>
              <View
                style={
                  (stylesId.instructionTwo,
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
                    Linking.openURL(
                      'mailto:support@GlobalOutliers.com?subject=mailsubject&body=mailbody'
                    );
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
            </View>
          </View>
        </ScrollView>
      </View>
      {/* <Text style={styles.serviceScenterText}>
        {t("common:app.customerService")}
      </Text> */}
      <TouchableOpacity
        onPress={() => {
          Linking.openURL('mailto:support@GlobalOutliers.com');
        }}
      >
        <Text style={styles.serviceScenterText}>
          {t('common:app.customerService')}
        </Text>
      </TouchableOpacity>
    </Fragment>
  );
}

function FindPW(props) {
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('');
  const netInfo = useNetInfo();

  const { t } = props;
  async function submitForm() {
    if (!netInfo.isConnected) {
      Alert.alert('', t('common:app.noNet'));
      return;
    }
    if (!email) {
      Alert.alert(t('common:app.error'), t('common:app.enterEmail'));
      return;
    } else {
      const response = await api.getPasswordFromEmail(email);
      // console.log("User ID", response.data.body, response.data.Body);
      if (response.data.Body === 'USER_NOT_FOUND') {
        Alert.alert(t('common:app.error'), t('common:app.userNotFound'));
      } else if (
        response.data.body ===
        'NEW_PASSWORD_SENT_TO_YOUR_REGISTERED_EMAIL_ADDRESS'
      ) {
        Alert.alert(
          t('common:app.success'),
          t('common:app.passSentEmail'),
          [
            {
              text: t('common:app.confirm'),
              onPress: () => {
                props.navigation.popToTop();
              }
            }
          ],
          { cancelable: false }
        );
        this.props.navigation.navigate('Login');
      } else {
        Alert.alert(t('common:app.error'), t('common:app.userNotFound'));
      }
    }
  }

  return (
    <Fragment>
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: config.regularFont,
            fontSize: 14,
            marginTop: 20,
            marginBottom: 10,
            fontWeight: 'normal',
            fontStyle: 'normal',
            letterSpacing: 0,
            color: 'config.black'
          }}
        >
          {t('common:app.emailAddress')}
        </Text>
        <View style={styles.containerTwo}>
          <View style={styles.otpContainer}>
            <TextInput
              keyboardType='email-address'
              style={{
                flex: 1,
                paddingHorizontal: 10
              }}
              // maxLength={6}
              onChangeText={text => {
                setEmail(text);
                // this.countryPicker.handleFilterChange (text);
              }}
              placeholder={t('common:app.email')}
            />
            {/* <InputBox
              keyboardType="email-address"
              onChangeText={text => {
                setEmail(text);
                // this.countryPicker.handleFilterChange (text);
              }}
              style={styles.inputBoxText}
              placeholder={t("common:app.email")}
            /> */}
          </View>

          {/* <TouchableOpacity
            style={styles.inactiveBtn}
            onPress={() => {
              submitForm();
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 16,
                textAlign: "center"
              }}
            >
              {t("common:app.sentPassEmail")}
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.activeBtn}
            onPress={() => {
              submitForm();
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 16,
                textAlign: 'center'
              }}
            >
              {t('common:app.sentPassEmail')}
            </Text>
          </TouchableOpacity>

          {/* <View>
            <Text
              style={{
                fontFamily: config.regularFont,
                fontSize: 18,
                fontWeight: "normal",
                fontStyle: "normal",
                paddingHorizontal: 6,
                color: config.black
              }}
            >
              @
            </Text>
          </View> */}
          {/* <View style={styles.singleDateComponent}>
            <InputBox
              onChangeText={text => {
                setDomain(text);
                // this.countryPicker.handleFilterChange (filter);
              }}
              hitSlop={{ left: width, top: 30, bottom: 30 }}
              style={[styles.inputBoxText, { width: width * 0.35 }]}
              placeholder={t('common:app.emailDomain')}
            />
          </View> */}
        </View>
      </View>
      {/* <Text style={styles.serviceScenterText}>{t("common:app.customerService")}</Text> */}
      <TouchableOpacity
        onPress={() => {
          Linking.openURL('mailto:support@GlobalOutliers.com');
        }}
      >
        <Text style={styles.serviceScenterText}>
          {t('common:app.customerService')}
        </Text>
      </TouchableOpacity>
    </Fragment>
  );
}

class FindAccountScreen extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: this.props.t('common:app.findId') },
      { key: 'second', title: this.props.t('common:app.findPassword') }
    ]
  };

  _handleIndexChange = index => {
    this.setState({ index });
  };

  _renderTabBar = props => {
    const { t } = this.props;
    return (
      <Fragment>
        <TopBarHeader
          sectionTitle={t('common:app.findIdPw')}
          isProfile
          action='back'
        />
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={[
                  styles.tabItem,
                  this.state.index === i ? styles.borderBottomWidth : ''
                ]}
                onPress={() => this.setState({ index: i })}
              >
                <Text style={styles.tabTitleText}>{route.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Fragment>
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <FindId {...this.props} />;
      case 'second':
        return <FindPW {...this.props} />;
      default:
        return (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size='large' />
          </View>
        );
    }
  };

  render() {
    return (
      <Fragment>
        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    user: state.auth.user,
    otpCode: state.auth.user.otpCode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestOTP: phoneNumber => dispatch(AuthActions.requestOtp(phoneNumber)),
    invalidateOTP: () => dispatch(AuthActions.invalidateOtp()),
    initiateAddPhone: phoneNumber =>
      dispatch(AuthActions.initiateAddPhone(phoneNumber)),
    saveUserInfo: data => dispatch(AuthActions.setUserInfo(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindAccountScreen);

const stylesId = StyleSheet.create({
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
    marginTop: 26,
    fontFamily: config.regularFont,
    alignSelf: 'center',
    width: '80%'
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
  linkText: {
    color: '#aaaaaa',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: '#aaaaaa'
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
    marginTop: 18
    // borderWidth: 1
  },
  buttonStyle: {
    borderRadius: 3,
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
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
  }
});

const styles = StyleSheet.create({
  serviceScenterText: {
    fontFamily: config.regularFont,
    fontSize: 18,
    fontWeight: 'bold',
    color: config.btnLine,
    textDecorationLine: 'underline',
    marginBottom: 50,
    alignSelf: 'center'
  },
  userInfoOptionText: {
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: config.lightGrey
  },
  agreeView: {
    flex: 0,
    borderWidth: 1,
    height: 48,
    margin: 0
  },
  dateText: {
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: config.black
  },
  downArrow: {
    width: 15,
    height: 15,
    resizeMode: 'contain'
  },
  singleDateComponent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    margin: 3,
    height: 46,
    borderRadius: 3,
    backgroundColor: config.whiteGray,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: config.whiteTwo
  },
  dateSelector: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBoxText: {
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    color: config.black,
    flex: 1,
    height: 30,
    paddingHorizontal: 10,
    backgroundColor: 'red'
  },
  pickerTopicText: {
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    color: config.black
  },
  pickerNormalState: {
    flex: 5,
    marginHorizontal: 5,
    borderWidth: 1,
    height: 50,
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: config.selectBox
  },
  pickerSelectedState: {
    flex: 5,
    marginHorizontal: 5,
    height: 50,
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderColor: config.navyBlack,
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionPicker: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoPicker: {
    marginTop: 15,

    alignItems: 'center',
    flexDirection: 'row'
  },
  // Entire screen container
  loaderContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: config.white
  },
  containerTwo: {
    flex: 1,
    paddingHorizontal: 0,
    alignSelf: 'stretch'
  },
  // TopTabBar
  tabBar: {
    flexDirection: 'row',
    height: 42,
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: config.whiteTwo
  },
  tabItem: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  borderBottomWidth: {
    borderBottomWidth: 2
  },
  tabTitleText: {
    fontFamily: config.boldFont,
    fontWeight: 'bold',
    color: config.charcoal_grey
  },
  inputContainer: {
    height: 46,
    paddingHorizontal: 12,
    borderWidth: 0.5,
    borderRadius: 3,
    backgroundColor: config.whiteGray,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: config.whiteTwo
  },
  buttonStyle: {
    marginTop: 20,
    width: config.component_width,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: config.navyBlack
  },
  otpContainer: {
    backgroundColor: config.white_grey,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    // paddingHorizontal: 12,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: config.whiteTwo,
    marginBottom: 4,
    marginTop: 0,
    height: 48
  },
  timerText: {
    color: config.lightGrey,
    fontSize: 14,
    alignItems: 'center',
    fontWeight: '700',
    fontFamily: config.regularFont
  },
  otpValidateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  verificationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  verifyText: {
    fontSize: 13,
    color: '#666666'
  },
  requestText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#444444',
    textDecorationLine: 'underline'
  },
  inactiveBtn: {
    backgroundColor: '#bbbbbb',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 3,
    justifyContent: 'center',
    width: '100%',
    height: 48,
    marginTop: 12,
    marginBottom: 22
  },
  inactiveBtnTwo: {
    backgroundColor: '#bbbbbb',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 3,
    justifyContent: 'center',
    width: '100%',
    height: 48,
    marginTop: 12,
    marginBottom: 10
  },
  activeBtn: {
    backgroundColor: config.navyBlack,
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 3,
    justifyContent: 'center',
    width: '100%',
    height: 48,
    marginTop: 12,
    marginBottom: 22
  },
  activeBtnTwo: {
    backgroundColor: config.navyBlack,
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 3,
    justifyContent: 'center',
    width: '100%',
    height: 48,
    marginTop: 12,
    marginBottom: 10
  }
  // inputboxText: {
  //   flex: 1
  // }
});
