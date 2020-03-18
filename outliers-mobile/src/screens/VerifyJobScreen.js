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
import { TabView, SceneMap } from 'react-native-tab-view';
import ImagePicker from 'react-native-image-picker';
import api from './../services/AuthApiService';

import { connect } from 'react-redux';

// Import components
import TopBarHeader from '@components/TopBarHeader';
import ActionButton from '@components/ActionButton';
import CheckBox from '@components/CheckBox';
import InputBox from '@components/InputBox';
import Modal from '@components/CustomModal';
import DotSlider from '@components/DotSlider';

// Import assets and config
import config from '@src/config';
import Job from '@assets/images/ic_job.png';
import Notification from '@assets/images/ic_noti_empty.png';
import DeleteIcon from '@assets/images/ic_delete.png';
import icCheckConfirm from '@assets/images/icCheckConfirm.png';
import CheckboxIcon from '@assets/images/ic_outline_checkbox.png';
import WatingImg from '@assets/images/icWaiting_3x.png';

import AuthApiService from '@services/AuthApiService';
import { generateOtp } from '../utils/utility';
import AuthActions from '../store/redux/auth';
import { withNamespaces } from 'react-i18next';

const serverOtp = generateOtp(6);

function VerifyByEmail(props) {
  const [otp, setOtpText] = useState('');
  const [email, setEmail] = useState('');
  const { t } = props;

  return (
    <Fragment>
      <View style={styles.container}>
        <View style={styles.uniInfoContainer}>
          {/* first input row */}
          <View style={styles.inputRow}>
            <View
              style={{
                flex: 4,
                borderWidth: 1,
                padding: 5,
                height: 44,
                borderColor: config.whiteTwo
              }}
            >
              <InputBox
                placeholder='employee@company.com'
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
                    console.log(response);
                  }
                }}
              >
                <Text style={styles.btnText}>
                  {t('verifyJob:requestVerification')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Second input row */}
          <View style={styles.inputRow}>
            <View
              style={{
                flex: 4,
                padding: 5,
                flexDirection: 'row',
                borderWidth: 1,
                height: 44,
                borderColor: config.whiteTwo
              }}
            >
              <InputBox
                placeholder={t('verifyJob:enterOtp')}
                onChangeText={text => {
                  setOtpText(text);
                  props.setPassword(text);
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
                    {t('verifyJob:verification')}
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
      title: t('verifyJob:selectImage'),
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
        Alert.alert(t('common:app.error'), t('verifyJob:errorGallery'));
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
              {t('common:verifySchoolScreen.checkInfo')}
              {'\n'}
            </Text>
            <Text style={styles.criteriaList}>
              {t('verifyJob:document.criteriaList')}
            </Text>
          </View>
          {!imageSource && (
            <ActionButton
              customStyle={{
                touchableStyle: styles.addImageButton,
                buttonTextStyle: styles.addImageText
              }}
              onPress1={() => openGallery()}
              text={'+ ' + t('verifyJob:document.addImage')}
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
          <Text style={styles.infoText}>{t('verifyJob:document.note')}</Text>
        </View>
      </View>
    </Fragment>
  );
}

class VerifyJobScreen extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: `${this.props.t('verifyJob:docVer')}` },
      { key: 'second', title: `${this.props.t('verifyJob:emailVer')}` }
    ],
    occupationName: !!this.props.user.companyName
      ? this.props.user.companyName
      : this.props.user.occupation
      ? this.props.user.occupation
      : '',
    email: '',
    otp: '',
    docUploaded: false,
    stateImage: null,
    selected: false,
    waitingModalVisible: false
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  putUserDetails = async data => {
    // {registrationStatus: 'ModalPhotoUpload'}
    const token = await AsyncStorage.getItem('@token:key');
    const response = await api.putUserDetails(token, data);
    this.setState({
      loading: false
    });
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
          // token ? this.props.navigation.navigate("My") : "";
          const isProfile = this.props.navigation.getParam('isProfile', false);
          if (isProfile) {
            this.props.navigation.navigate('My');
          } else {
            this.props.navigation.navigate('ReferralScreen');
          }
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
      type: 'occupation',
      mode: type,
      emailId: this.state.email,
      wealthCriteria: ''
      // universityVerified: false,
      // wealthVerified: false,
      // occupationVerified: true
    };
    const response = await api.veifyDocument(uri, token, data);
    console.log(this.props);

    const isProfile = this.props.navigation.getParam('isProfile', false);

    if (response.data.Body === 'SUCCESSFULLY_VERIFIED') {
      if (isProfile) {
        this.props.saveUserInfo({ occupationVerified: true });
        Alert.alert(
          `${this.props.t('common:app.success')}`,
          // `${this.props.t('verifyJob:verificationCom')}`,
          [{ text: 'OK', onPress: () => this.props.navigation.pop() }],
          { cancelable: false }
          // this.setState({ waitingModalVisible: true });
        );
      } else {
        this.putUserDetails({ registrationStatus: 'ReferralScreen' });
        this.props.navigation.navigate('ReferralScreen');
      }
    } else {
      this.setState({
        loading: false
      });
      Alert.alert(
        `${this.props.t('common:app.error')}`,
        `${this.props.t('verifyJob:failedToSubmit')}`
      );
    }
  };

  componentWillReceiveProps(prevProps, nextProps) {
    if (prevProps !== nextProps) {
      this.setState({
        occupationName: !!this.props.user.companyName
          ? this.props.user.companyName
          : ''
      });
    }
  }

  _handleIndexChange = index => {
    this.setState({ index });
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
        // Alert.alert(`${this.props.t('verifyJob:weConfrmdoc')}`),
        this.veifyDocument(stateImage, 'document');
        this.setState({ waitingModalVisible: true });
      }
    }
  };

  _renderTabBar = props => {
    const { t } = this.props;
    const isProfile = this.props.navigation.getParam('isProfile', false);
    return (
      <Fragment>
        <TopBarHeader
          sectionTitle={t('verifyJob:sectionTitle')}
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
            <Image source={Job} style={styles.icon} />
          </View>
          <View style={styles.uniNameContainer}>
            <Text style={styles.uniName}>
              {this.state.occupationName}
              {/* {'\n'}
              {t('verifyJob:companyRank')} */}
            </Text>
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

  setPassword = text => {
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
            {...this.props}
            veifyDocument={uri => {
              this.veifyDocument(uri, 'document');
            }}
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
            {...this.props}
            veifyDocument={uri => {
              this.veifyDocument(uri, 'email');
            }}
            setEmail={text => this.setEmail(text)}
            setPassword={otp => this.setPassword(otp)}
            setDoc={otp => this.setDoc(otp)}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { user, t } = this.props;
    return user.occupationVerified === 'pending' &&
      user.occupationDocumentOrEmail !== '' ? (
      <View
        style={{
          flex: 1,
          alignItems: 'center'
        }}
      >
        <TopBarHeader
          sectionTitle={t('verifyJob:sectionTitle')}
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
                  {t('verifyJob:hideColleagues')}
                </Text>
              </View>
            </View>
            <ActionButton
              text={t('common:verifySchoolScreen.agree')}
              customStyle={{
                touchableStyle: styles.buttonStyle
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

const VerifyJobHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyJobScreen);

export default withNamespaces(['common', 'verifyJob'], { wait: true })(
  VerifyJobHOC
);

const styles = StyleSheet.create({
  // Entire screen container
  container: {
    height: '100%',
    backgroundColor: config.white
  },
  // TopTabBar
  tabBar: {
    flexDirection: 'row',
    height: 36,
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: config.navyBlack
  },
  tabItem: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  borderBottomWidth: {
    borderBottomWidth: 2,
    borderColor: config.navyBlack
  },
  tabTitleText: {
    fontFamily: config.boldFont,
    fontWeight: 'bold',
    color: config.charcoal_grey
  },
  // Filter People Check Button
  filterButtonContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 2
  },
  confirm: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 20
  },
  checkBoxText: {
    color: config.brownishGrey,
    fontSize: 15,
    paddingLeft: 8
  },
  /* University Info */
  uniInfoContainer: {
    paddingHorizontal: 15
  },
  uniInfo: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white'
  },
  uniNameContainer: {
    paddingLeft: 10
  },
  uniName: {
    fontSize: 15,
    color: config.greyishBrown
  },

  /* Judging Criteria Details */
  judgeCriteria: {
    flexDirection: 'row'
  },
  criteriaList: {
    fontSize: 13,
    color: config.black
  },

  // Email Input Rows
  inputRow: {
    flexDirection: 'row',
    marginVertical: 5
  },
  addImageButton: {
    width: config.component_width,
    height: 52,
    borderRadius: 4,
    backgroundColor: config.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 1
  },
  addImageText: {
    fontWeight: 'bold',
    fontSize: 15
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
    fontSize: 13,
    color: config.lightGrey,
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
  buttonStyle: {
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 0
  }
});
