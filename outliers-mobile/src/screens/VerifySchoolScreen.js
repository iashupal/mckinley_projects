// Import npm modules
import React, { Component, Fragment, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Alert,
  AsyncStorage,
  ActivityIndicator,
  Linking,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  BackHandler
} from 'react-native';
import api from './../services/AuthApiService';
import { connect } from 'react-redux';

import { TabView, SceneMap } from 'react-native-tab-view';
import ImagePicker from 'react-native-image-picker';

// Import components
import TopBarHeader from '@components/TopBarHeader';
import ActionButton from '@components/ActionButton';
import CheckBox from '@components/CheckBox';
import InputBox from '@components/InputBox';
import IconInput from '@components/IconInput';
import Modal from '@components/CustomModal';
import DotSlider from '@components/DotSlider';
// Import assets and config
import config from '@src/config';
import University from '@assets/images/ic_like_univ.png';
import Notification from '@assets/images/ic_noti_empty.png';
import DeleteIcon from '@assets/images/ic_delete.png';
import CheckboxIcon from '@assets/images/ic_outline_checkbox.png';
import AddImage from '@assets/images/icAddPaper.png';
import icCheckConfirm from '@assets/images/icCheckConfirm.png';
import WatingImg from '@assets/images/icWaiting_3x.png';

import AuthApiService from '@services/AuthApiService';
import { generateOtp } from '../utils/utility';
import AuthActions from '../store/redux/auth';
import { withNamespaces } from 'react-i18next';

const serverOtp = generateOtp(6);

function VerifyByEmail(props) {
  const [otp, setOtpText] = useState('');
  const [email, setEmail] = useState('');
  const [verified, setVerified] = useState(false);
  const { t } = props;
  console.log('recived props', props);
  // disabled = e =>{
  //   const{email}=this.state;
  //   if(email.length>0)
  //   {
  //     return false;
  //   }
  //   return true;
  // }

  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.uniInfoContainer}>
          {/* first input row */}
          <View style={styles.inputRow}>
            <View style={{ flex: 4 }}>
              <IconInput
                isRightImage={false}
                iconStyle={{ width: 0, margin: -10 }}
                insetShadowStyle={{ height: 0 }}
                inputStyle={styles.textInputStyle}
                placeholder='acb@unversity.edu'
                type='emailAddress'
                keyboardType='email-address'
                value={email}
                //disabled={this.disabled()}
                onChangeText={text => {
                  setEmail(text);
                  props.setEmail(text);
                }}
              />
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
              <TouchableOpacity
                style={styles.btnBlack}
                onPress={async () => {
                  console.log('clicked', email);
                  if (email === '') {
                    Alert.alert(
                      `${t('common:verifySchoolScreen.alerts.plsemail')}`
                    );
                  } else {
                    Alert.alert(
                      `${t('common:verifySchoolScreen.alerts.sentOtp')}`,
                      `${t('common:verifySchoolScreen.alerts.sentOtpMessage')}`
                    );
                    const token = await AsyncStorage.getItem('@token:key');
                    const response = await AuthApiService.requestEmailOTP(
                      email,
                      serverOtp,
                      token
                    );
                    //console.log(response);
                  }
                }}
              >
                <Text style={styles.btnText}>
                  {t('common:verifySchoolScreen.requestVerification')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Second input row */}
          <View style={styles.inputRow}>
            <View style={{ flex: 4, flexDirection: 'row' }}>
              <IconInput
                isRightImage={false}
                iconStyle={{ width: 0, margin: -10 }}
                insetShadowStyle={{ height: 0 }}
                inputStyle={styles.textInputStyle}
                placeholder={t('common:verifySchoolScreen.enterOtp')}
                value={otp}
                onChangeText={text => {
                  setOtpText(text);
                  props.setOtp(text);
                }}
              />
              {otp === serverOtp && (
                <Image
                  style={{
                    position: 'absolute',
                    right: 5,
                    width: 16,
                    height: 16,
                    alignSelf: 'center',
                    marginHorizontal: 5,
                    resizeMode: 'contain'
                  }}
                  source={icCheckConfirm}
                />
              )}
            </View>
            <View style={{ flex: 2, justifyContent: 'center' }}>
              {otp === serverOtp ? (
                <TouchableOpacity style={styles.btnBlack}>
                  <Text style={styles.btnText}>
                    {t('common:verifySchoolScreen.isIverified')}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.btnGray}>
                  <Text style={styles.btnText}>
                    {t('common:verifySchoolScreen.verification')}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('mailto:support@GlobalOutliers.com');
              }}
            >
              <Text style={styles.serviceTextStyle}>
                {t('common:app.customerService')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Fragment>
  );
}

function VerifyByDocument(props) {
  const [imageSource, setImageSource] = useState(null);
  const { t } = props;
  function openGallery() {
    const options = {
      title: `${t('common:verifySchoolScreen.selectImage')}`,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
        Alert.alert(
          `${t('common:app.error')}`,
          `${t('common:verifySchoolScreen.errorGallery')}`
        );
      } else {
        setImageSource(response);
        props.setImage(response.uri);
        props.docUploaded(true);
      }
    });
  }
  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.uniInfoContainer}>
          <View>
            <View style={styles.judgeCriteria}>
              <Image source={Notification} style={styles.iconInfo} />
              <Text style={(styles.infoText, { color: '#26b1f5' })}>
                {t('common:verifySchoolScreen.document.text1')}
              </Text>
            </View>

            <Text style={styles.infoText}>
              {t('common:verifySchoolScreen.document.text2')}
            </Text>

            <Text style={styles.criteriaList}>
              {t('common:verifySchoolScreen.document.criteriaList')}
            </Text>
          </View>
          {!imageSource && (
            <ActionButton
              iconStyle={{ width: 14, height: 14, resizeMode: 'contain' }}
              icon={AddImage}
              customStyle={{
                touchableStyle: styles.addImageButton,
                buttonTextStyle: styles.addImageText
              }}
              onPress1={() => openGallery()}
              text={' ' + `${t('common:verifySchoolScreen.document.addImage')}`}
            />
          )}
          {imageSource && (
            <View style={styles.uploadedImage}>
              <Text>{imageSource.fileName}</Text>
              <TouchableOpacity
                onPress={() => {
                  setImageSource(null);
                  props.docUploaded(false);
                  props.setImage(null);
                }}
              >
                <Image style={{ width: 20, height: 30 }} source={DeleteIcon} />
              </TouchableOpacity>
            </View>
          )}
          <Text />
          <Text style={styles.noteText}>
            {t('common:verifySchoolScreen.document.note')}
          </Text>
        </View>
      </View>
    </Fragment>
  );
}

class VerifySchoolScreen extends Component {
  state = {
    index: 0,
    routes: [
      {
        key: 'first',
        title: this.props.t('common:verifySchoolScreen.docVer')
      },
      {
        key: 'second',
        title: this.props.t('common:verifySchoolScreen.emailVer')
      }
    ],
    universityName: !!this.props.user.universityName
      ? this.props.user.universityName
      : this.props.user.college
      ? this.props.user.college
      : '',
    email: '',
    otp: '',
    docUploaded: false,
    stateImage: null,
    selected: false,
    loading: false,
    waitingModalVisible: false
  };

  putUserDetails = async data => {
    // {registrationStatus: 'ModalPhotoUpload'}
    const token = await AsyncStorage.getItem('@token:key');
    const response = await api.putUserDetails(token, data);
    this.setState({
      loading: false
    });
  };

  renderLoader = () => {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            justifyContent: 'center'
          }
        ]}
      >
        <ActivityIndicator size='large' />
      </View>
    );
  };

  renderWaitingModal = props => {
    const { t } = props;
    return (
      <Modal
        transparent={true}
        visible={this.state.waitingModalVisible}
        onClose={async () => {
          this.setState({ waitingModalVisible: false });
          let token = await AsyncStorage.getItem('@token:key');
          const isProfile = this.props.navigation.getParam('isProfile', false);
          if (isProfile) {
            this.props.navigation.navigate('My');
          } else {
            this.props.navigation.navigate('ReferralScreen');
          }
          //token ? this.props.navigation.navigate("My") : "";
        }}
        buttonText1={t('common:myScreen.waitingModal.confirm')}
      >
        <View style={styles.innerModalContainer}>
          <Image style={styles.headerImage} source={WatingImg} />
          <Text style={styles.boldTextHeader}>
            {t('common:myScreen.waitingModal.header')}
          </Text>
          <Text style={styles.infoText1}>
            {t('common:myScreen.waitingModal.info')}
          </Text>
        </View>
      </Modal>
    );
  };

  veifyDocument = async (uri, type) => {
    this.setState({
      loading: true
    });

    const token = await AsyncStorage.getItem('@token:key');

    let data = {
      type: 'university',
      mode: type,
      emailId: this.state.email,
      wealthCriteria: ''
      // universityVerified: true,
      // wealthVerified: false,
      // occupationVerified: false
    };

    const response = await api.veifyDocument(uri, token, data);

    const isProfile = this.props.navigation.getParam('isProfile', false);

    if (response.data.Body === 'SUCCESSFULLY_VERIFIED') {
      if (isProfile) {
        this.props.saveUserInfo({
          universityVerified: true
        });
        Alert.alert(
          `${t('common:app.success')}`,
          // `${t('common:verifySchoolScreen.verificationCom')}`,
          [{ text: 'OK', onPress: () => this.props.navigation.pop() }],
          { cancelable: false }
        );
        // this.setState({ waitingModalVisible: true });
      } else {
        this.putUserDetails({
          registrationStatus: 'ReferralScreen',
          hideCollege: this.state.selected ? '1' : '0'
        });
        this.props.navigation.navigate('ReferralScreen');
      }
    } else {
      this.setState({
        loading: false
      });
      Alert.alert(
        `${t('common:app.error')}`,
        `${t('common:verifySchoolScreen.failedToSubmit')}`
      );
    }
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  componentWillReceiveProps(prevProps, nextProps) {
    if (prevProps !== nextProps) {
      console.log('uniname: ' + this.props.user.universityName);
      this.setState({
        universityName: !!this.props.user.universityName
          ? this.props.user.universityName
          : ''
      });
    }
  }

  _handleIndexChange = index => {
    this.setState({ index });
  };

  _renderTabBar = props => {
    const { t } = this.props;
    const isProfile = this.props.navigation.getParam('isProfile', false);
    return (
      <Fragment>
        <TopBarHeader
          sectionTitle={t('common:verifySchoolScreen.sectionTitle')}
          action={'back'}
          isProfile
        />
        {!isProfile && <DotSlider numberOfSteps={5} active={5} />}
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
        <View style={styles.uniInfo}>
          <View>
            <Image source={University} style={styles.icon} />
          </View>
          <View style={styles.uniNameContainer}>
            <Text style={styles.uniName}>{this.state.universityName}</Text>
          </View>
        </View>
      </Fragment>
    );
  };

  setEmail = text => {
    this.setState({
      email: text
    });
  };

  setOtp = text => {
    this.setState({
      otp: text
    });
  };

  setDoc = bool => {
    this.setState({
      docUploaded: bool
    });
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <VerifyByDocument
            t={this.props.t}
            setImage={uri => {
              this.setState({
                stateImage: uri
              });
            }}
            docUploaded={bool => {
              this.setDoc(bool);
            }}
          />
        );
      case 'second':
        return (
          <VerifyByEmail
            t={this.props.t}
            setEmail={text => this.setEmail(text)}
            setOtp={otp => this.setOtp(otp)}
            setDoc={otp => this.setDoc(otp)}
          />
        );
      default:
        return null;
    }
  };

  submitForm = () => {
    const { email, otp, docUploaded, index, stateImage } = this.state;
    /**
     *@description  Verify by email
     */
    if (index === 1) {
      if (email && otp === '101010') {
        this.veifyDocument(stateImage, 'email');
      } else if (!email || !otp || otp !== serverOtp) {
        Alert.alert(
          `${this.props.t('common:app.error')}`,
          `${this.props.t('verifyJob:validInfo')}`
        );
        return;
      } else {
        this.veifyDocument(stateImage, 'email');
      }
    }

    /**
     *@description  Verify by doc
     */
    if (index === 0) {
      if (!docUploaded) {
        Alert.alert(
          `${this.props.t('common:app.error')}`,
          `${this.props.t('verifyJob:emptyDoc')}`
        );
        return;
      } else {
        // Alert.alert(`${this.props.t('verifyJob:weConfrmdoc')}`);
        this.veifyDocument(stateImage, 'document');
        this.setState({ waitingModalVisible: true });
      }
    }
  };

  render() {
    const { user, t } = this.props;
    return user.universityVerified === 'pending' &&
      user.universityDocumentOrEmail !== '' ? (
      <View
        style={{
          flex: 1,
          alignItems: 'center'
        }}
      >
        <TopBarHeader
          sectionTitle={t('common:verifySchoolScreen.sectionTitle')}
          isProfile
          action='back'
        />
        <View
          style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }}
        >
          <Text style={{ fontWeight: '500', alignSelf: 'center' }}>
            {t('common:verifySchoolScreen.weConfrmdoc')}
          </Text>
        </View>
      </View>
    ) : (
      <Fragment>
        {this.state.loading && (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                justifyContent: 'center'
              }
            ]}
          >
            <ActivityIndicator size='large' />
          </View>
        )}

        <TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.filterButtonContainer}>
              <View style={styles.confirm}>
                <CheckBox
                  normalImage={CheckboxIcon}
                  onPress={() => {
                    this.setState({
                      selected: !this.state.selected
                    });
                  }}
                  selected={this.state.selected}
                />
                <Text style={styles.checkBoxText}>
                  {t('common:verifySchoolScreen.hideUniversity')}
                </Text>
              </View>
            </View>
            <ActionButton
              text={t('common:verifySchoolScreen.agree')}
              customStyle={{
                touchableStyle: styles.bottomButtonStyle
              }}
              onPress1={() => {
                this.submitForm();
              }}
            />
            {this.renderWaitingModal(this.props)}
            {this.state.loading && this.renderLoader()}
          </ScrollView>
        </KeyboardAvoidingView>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: false,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveUserInfo: data => dispatch(AuthActions.setUserInfo(data))
  };
};

const VerifySchoolHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifySchoolScreen);

export default withNamespaces(['common'], { wait: true })(VerifySchoolHOC);

const styles = StyleSheet.create({
  noteText: {
    // height: 38,
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 19,
    letterSpacing: 0,
    color: config.lightGrey
  },
  bottomButtonStyle: {
    flex: 1,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.navyBlack,
    borderRadius: 0
  },
  serviceTextStyle: {
    marginTop: 10,
    height: 19,
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: config.btnLine,
    textDecorationLine: 'underline'
  },
  textInputStyle: {
    borderWidth: 1,
    marginLeft: -2,
    borderColor: config.whiteTwo,
    height: 44,
    width: '100%',
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: config.hintText
  },
  // Entire screen container
  container: {
    height: '100%',
    backgroundColor: config.white
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
  // Filter People Check Button
  filterButtonContainer: {
    backgroundColor: 'white'
  },
  confirm: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  checkBoxText: {
    color: config.brownishGrey,
    fontSize: 15,
    paddingLeft: 8,
    fontFamily: config.regularFont,
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0
  },
  /* University Info */
  uniInfoContainer: {
    paddingHorizontal: 20
  },
  uniInfo: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    width: '100%'
  },
  uniNameContainer: {
    paddingLeft: 10,
    width: '93%'
  },
  uniName: {
    fontSize: 15,
    fontFamily: config.regularFont,
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: config.greyishBrown
  },
  /* Judging Criteria Details */
  judgeCriteria: {
    flexDirection: 'row'
  },
  criteriaList: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: '500',
    color: config.navyBlack
  },

  // Email Input Rows
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5
  },
  addImageButton: {
    width: config.component_width,
    height: 48,
    backgroundColor: config.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: config.btnLine
  },
  addImageText: {
    fontFamily: config.regularFont,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: config.greyishBrown,
    fontWeight: 'bold',
    fontSize: 16
  },
  uploadedImage: {
    borderRadius: 4,
    marginTop: 10,
    backgroundColor: config.lightGreyBg,
    width: config.component_width,
    height: 52,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row'
  },
  infoText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    color: config.brownishGrey,
    marginTop: 10
  },
  icon: {
    width: 22,
    height: 22
  },
  iconInfo: {
    width: 18,
    height: 18,
    tintColor: '#26b1f5',
    marginRight: 5
  },
  // email verify button
  btnBlack: {
    backgroundColor: config.charcoal_grey,
    borderRadius: 4,
    height: 44,
    marginLeft: 8,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  btnGray: {
    backgroundColor: config.hintText,
    borderRadius: 4,
    height: 44,
    marginLeft: 8,
    justifyContent: 'center'
  },
  btnText: {
    color: config.white,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  innerModalContainer: {
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  boldTextHeader: {
    fontFamily: config.regularFont,
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
    color: config.black,
    marginBottom: 5
  },
  infoText1: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'center',
    color: config.black,
    marginBottom: 10
  },
  headerImage: {
    height: 120,
    aspectRatio: 1,
    marginBottom: 10,
    resizeMode: 'contain'
  }
});
