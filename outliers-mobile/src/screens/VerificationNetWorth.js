// Import npm modules
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Alert,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,
  BackHandler
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ImagePicker from 'react-native-image-picker';
import api from './../services/AuthApiService';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
// Import components
import TopBarHeader from '@components/TopBarHeader';
import ActionButton from '@components/ActionButton';
import CheckBox from '@components/CheckBox';
import InputBox from '@components/InputBox';
import IconInput from '@components/IconInput';
import DonationTagsList from '@components/DonationTagsList';
import Modal from '@components/CustomModal';
import DotSlider from '@components/DotSlider';
// Import assets and config
import config from '@src/config';
import University from '@assets/images/ic_like_univ.png';
import Notification from '@assets/images/ic_noti_empty.png';
import DeleteIcon from '@assets/images/ic_delete.png';
import CheckboxIcon from '@assets/images/ic_outline_checkbox.png';
import AddImage from '@assets/images/icAddPaper.png';
import imgBlackQualify from '@assets/images/imgBlackQualify.png';
import icNotiEmpty from '@assets/images/ic_noti_empty.png';
import CautionIcon from '@assets/images/ic_caution.png';
import icIcSendConfirm from '@assets/images/icIcSendConfirm.png';
import AuthActions from '../store/redux/auth';
// import { withNamespaces } from "react-i18next";

const { width } = Dimensions.get('window');

class VerificationNetWorth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: '이메일로 인증' },
        { key: 'second', title: '증명서로 인증' }
      ],
      imageSource: [],
      wealth: '',
      loading: false,
      showCautionVisible: false,
      showCompleteModal: false
    };
    this.openGallery = this.openGallery.bind(this);
  }

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

  veifyDocument = async uri => {
    console.log(this.props);
    this.setState({
      loading: true
    });
    const token = await AsyncStorage.getItem('@token:key');
    let data = {
      type: 'net-wealth',
      mode: 'document',
      emailId: '',
      wealthCriteria: this.state.wealth,
      loading: false
      // universityVerified: "pending",
      // wealthVerified: "pending",
      // occupationVerified: "pending"
    };

    const response = await api.veifyDocument(uri, token, data);

    const isProfile = this.props.navigation.getParam('isProfile', false);
    if (isProfile) {
      this.props.saveUserInfo({ wealthVerified: true });
      this.props.navigation.pop();
    } else {
      if (response.data.Body === 'SUCCESSFULLY_VERIFIED') {
        this.putUserDetails({ registrationStatus: 'ReferralScreen' });
        this.props.navigation.navigate('ReferralScreen');
      }
    }
  };

  openGallery() {
    const options = {
      title: '프로필 이미지 선택',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
        Alert.alert(
          `${this.props.t('common:app.error')}`,
          `${this.props.t('common:app.openGallery')} {"\n"} ${this.props.t(
            'common:app.allowAccess'
          )}`
        );
      } else {
        // this.setState({
        //   imageSource: response
        // });
        this.setState({
          imageSource: [...this.state.imageSource, response]
        });
      }
    });
  }
  // (`${this.props.t("common:app.error")}`, `${this.props.t("verifyJob:emptyDoc")}`)
  _handleIndexChange = index => {
    this.setState({ index });
  };

  renderCautionModal = () => {
    const { t } = this.props;
    return (
      <Modal
        icon={CautionIcon}
        visible={this.state.showCautionVisible}
        buttonText1={t('common:app.confirm')}
        onClose={() => {
          this.setState({
            showCautionVisible: false,
            showCompleteModal: true
          });
        }}
      >
        <Text style={styles.modalText}>{t('netWorth:cautionText')}</Text>
      </Modal>
    );
  };

  renderSubmitCompleteModal = () => {
    const { t } = this.props;
    return (
      <Modal
        visible={this.state.showCompleteModal}
        buttonText1={this.props.t('common:app.confirm')}
        onClose={() => {
          this.setState({ showCompleteModal: false });
          this.veifyDocument(this.state.imageSource.uri);
        }}
      >
        <View style={sendLikeCoffe.innerModalContainer}>
          <Image style={sendLikeCoffe.headerImage} source={icIcSendConfirm} />
          <Text style={sendLikeCoffe.boldTextHeader}>
            {this.props.t('netWorth:submitComplete')}
          </Text>
          <Text style={sendLikeCoffe.infoText1}>
            {this.props.t('netWorth:approvalTime')}
          </Text>

          <Text style={sendLikeCoffe.noteText}>
            {this.props.t('netWorth:falseInformation')}
          </Text>
        </View>
      </Modal>
    );
  };

  removeImage(index) {
    var imageArray = [...this.state.imageSource];
    var indexImage = imageArray.indexOf(index);
    if (index <= imageArray.length - 1) {
      imageArray.splice(index, 1);
      this.setState({ imageSource: imageArray });
    }
  }

  render() {
    const { imageSource } = this.state;
    const { user, t } = this.props;
    const isProfile = this.props.navigation.getParam('isProfile', false);
    if (this.props.loading || this.state.loading) {
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
    }

    return (
      //TOOD: UNDO - REMOVE FALSE CONDITION
      user &&
        user.wealthVerified === 'pending' &&
        user.wealthDocument !== '' ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center'
          }}
        >
          <TopBarHeader
            sectionTitle={t('netWorth:headerTitle')}
            isProfile
            action='back'
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignSelf: 'center'
            }}
          >
            <Text
              style={{ fontWeight: '500', alignSelf: 'center', lineHeight: 20 }}
            >
              {t('verifyJob:weConfrmdoc')}
            </Text>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <TopBarHeader
            sectionTitle={t('netWorth:headerTitle')}
            isProfile
            action='close'
          />
          {!isProfile && <DotSlider numberOfSteps={5} active={5} />}
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.exclusiveHeader}>
              <Text style={styles.exclusiveHeaderText}>
                {' '}
                {t('netWorth:bannerMessage')}{' '}
              </Text>
            </View>

            <Image style={styles.middleImage} source={imgBlackQualify} />

            <View style={styles.bottomContainer}>
              <View style={styles.flex1}>
                <Text style={styles.selectItemText}>
                  {' '}
                  {t('netWorth:selectCategory')}{' '}
                </Text>
                <View style={styles.selectItemList}>
                  <DonationTagsList
                    tags={{
                      0: [t('netWorth:crore'), false],
                      1: [t('netWorth:million'), false],
                      2: [t('netWorth:lakh'), false]
                    }}
                    multiSelection={true}
                    containerStyle={{
                      justifyContent: 'flex-start'
                    }}
                    onchangeSelectedTags={tags =>
                      this.setState({ wealth: tags[0] })
                    }
                  />
                </View>
                {/* <Text style={(styles.infoText, { color: "blue" })}>
                  {t("netWorth.documents")}
                </Text> */}

                <View style={styles.docUploadNoteContainer}>
                  <Image
                    style={[styles.iconInfo, { alignSelf: 'flex-start' }]}
                    source={icNotiEmpty}
                  />
                  <Text style={(styles.noteText, { color: '#26b1f5' })}>
                    {t('netWorth:pleaseUpload')}
                  </Text>
                </View>
                <Text style={styles.note2}>
                  {t('netWorth:rule1')}
                  {'\n'}
                  {t('netWorth:rule2')}
                  {'\n'}
                  {t('netWorth:rule3')}
                </Text>
                <ActionButton
                  iconStyle={styles.addImageIcon}
                  icon={AddImage}
                  customStyle={{
                    touchableStyle: styles.addImageButton,
                    buttonTextStyle: styles.addImageText
                  }}
                  onPress1={() => this.openGallery()}
                  text={' ' + t('netWorth:addImage')}
                />
                {imageSource.length > 0 ? (
                  <View>
                    {imageSource.map((img, index) => {
                      console.log('indexex', index);
                      return (
                        <View style={styles.uploadedImage}>
                          <Text key={index}>{img.fileName}</Text>

                          <TouchableOpacity
                            onPress={e => {
                              // this.setState({
                              //   imageSource: []
                              // });
                              console.log('from remove - ', e);
                              this.removeImage(index);
                            }}
                          >
                            <Image
                              style={{
                                width: 20,
                                height: 30
                              }}
                              source={DeleteIcon}
                            />
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                ) : null}
                <View>
                  <Text style={styles.greyNote}>
                    {t('netWorth:insufficientNote')}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={styles.bottomButtonContainer}>
            <ActionButton
              text={t('netWorth:agree')}
              customStyle={{
                touchableStyle: styles.bottomButtonStyle
              }}
              onPress1={() => {
                if (imageSource.length > 0) {
                  const isProfile = this.props.navigation.getParam(
                    'isProfile',
                    false
                  );
                  console.log(isProfile);
                  if (isProfile) {
                    this.setState({
                      showCautionVisible: true
                    });
                  } else {
                    this.veifyDocument(imageSource[0].uri);
                  }
                } else {
                  Alert.alert(t('common:app.error'), t('netWorth:uploadDoc'));
                }
              }}
            />
          </View>
          {this.renderCautionModal()}
          {this.renderSubmitCompleteModal()}
        </View>
      )
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

const VerificationNetWorthHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(VerificationNetWorth);
//export default VerificationNetWorth;
export default withNamespaces(['common', 'netWorth'], { wait: true })(
  VerificationNetWorthHOC
);

const sendLikeCoffe = StyleSheet.create({
  noteText: {
    marginTop: 5,
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 17,
    letterSpacing: 0,
    textAlign: 'center',
    color: config.pointRed
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
    color: config.hintText
  },
  textInputContainer: {
    width: width * 0.7,
    height: 90,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderWidth: 1,
    backgroundColor: config.white,
    borderColor: config.whiteTwo
  },
  infoText1: {
    marginBottom: 5,
    width,
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
    color: config.black
  },
  boldTextHeader: {
    marginBottom: 5,
    fontFamily: config.regularFont,
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: config.black
  },
  headerImage: {
    height: 60,
    aspectRatio: 2 / 1,
    marginBottom: 10,
    resizeMode: 'contain'
  },
  innerModalContainer: {
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const styles = StyleSheet.create({
  modalText: {
    textAlign: 'center',
    fontFamily: config.regularFont,
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
    color: config.brownishGrey,
    marginHorizontal: 7
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 23,
    textAlign: 'center',
    color: config.black,
    textAlign: 'center'
  },
  bottomButtonContainer: { position: 'absolute', bottom: 0, width: '100%' },
  addImageIcon: { width: 14, height: 14, resizeMode: 'contain' },
  note2: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: '600',
    paddingRight: 40,
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    color: config.navyBlack
  },
  noteText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: config.lightGrey
  },

  iconInfo: {
    width: 18,
    height: 18,
    tintColor: '#26b1f5',
    marginRight: 5
  },
  docUploadNoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12
  },
  wonText: {
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 10,
    fontStyle: 'normal',
    letterSpacing: 0,
    color: '#222220'
  },
  wonContainer: {
    marginVertical: 5,
    alignSelf: 'flex-start',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: config.black
  },
  itemText: {
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: config.greyishBrown
  },
  itemContainer: {
    paddingVertical: 2,
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 8,
    borderColor: config.selectBox
  },
  selectItemList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8
  },
  selectItemText: {
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    color: config.black
  },
  flex1: { flex: 1 },
  bottomContainer: { flex: 1, width, paddingHorizontal: 20 },
  middleImage: {
    width,
    height: 180,
    marginVertical: 20,
    marginHorizontal: 80,
    resizeMode: 'contain'
  },
  exclusiveHeaderText: {
    fontFamily: config.regularFont,
    paddingHorizontal: 30,
    paddingVertical: 8,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: config.navyBlack
  },
  exclusiveHeader: {
    width,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba( 48, 54, 59, 0.1)'
  },
  scrollContainer: {
    paddingBottom: 80,
    alignItems: 'center'
  },
  noteText: {
    height: 38,
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
    flex: 1,
    alignItems: 'center',
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
    marginTop: 20,
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
    color: config.brownishGrey
  },
  icon: {
    width: 22,
    height: 22
  },
  // email verify button
  btnBlack: {
    backgroundColor: config.charcoal_grey,
    borderRadius: 4,
    height: 44,
    marginLeft: 8,
    justifyContent: 'center'
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
  greyNote: {
    color: '#ababab',
    fontSize: 14,
    lineHeight: 16,
    marginTop: 10,
    textAlign: 'center'
  }
});
