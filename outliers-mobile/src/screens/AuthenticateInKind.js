// Import npm modules
import React, { Component, Fragment } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
  Alert,
  BackHandler
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ImagePicker from 'react-native-image-picker';

import { connect } from 'react-redux';
import { verifyAppearance } from '../store/actions';

// Import components
import TopBarHeader from '@components/TopBarHeader';
import ActionButton from '@components/ActionButton';
import InputBox from '@components/InputBox';
import Modal from '@components/CustomModal';

// Import assets and config
import config from '@src/config';
import AddImage from '@assets/images/icAddPaper.png';

import CautionIcon from '@assets/images/ic_caution.png';
import icIcSendConfirm from '@assets/images/icIcSendConfirm.png';

import imgCertifyCamera from '@assets/images/imgCertifyCamera.png';
import imgCertifyPassport from '@assets/images/imgCertifyPassport.png';
import icNotiEmpty from '@assets/images/ic_noti_empty.png';
import DonationTagsList from '@components/DonationTagsList';
import DeleteIcon from '@assets/images/ic_delete.png';
import WithLoaderStatus from '../components/HOC/withLoaderStatus';
import { withNamespaces } from 'react-i18next';

const { width } = Dimensions.get('window');

class PhotoShootCertification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageSource: null,
      showCautionVisible: false,
      showCompleteModal: false
    };
    this._verifyAppearance = this._verifyAppearance.bind(this);
  }

  renderCautionModal = () => {
    return (
      <Modal
        icon={CautionIcon}
        visible={this.state.showCautionVisible}
        buttonText1={this.props.t('common:app.confirm')}
        onClose={() => {
          this.setState({
            showCautionVisible: false,
            showCompleteModal: true
          });
        }}
      >
        <Text style={styles.modalText}>
          {this.props.t('realVerification:cautionText')}
        </Text>
      </Modal>
    );
  };

  renderSubmitCompleteModal = () => {
    return (
      <Modal
        visible={this.state.showCompleteModal}
        buttonText1={this.props.t('common:app.confirm')}
        onClose={() => {
          this.setState({ showCompleteModal: false });
          this._verifyAppearance(this.state.imageSource.uri);
        }}
      >
        <View style={sendLikeCoffe.innerModalContainer}>
          <Image style={sendLikeCoffe.headerImage} source={icIcSendConfirm} />
          <Text style={sendLikeCoffe.boldTextHeader}>
            {this.props.t('realVerification:submitComplete1')}
          </Text>
          <Text style={sendLikeCoffe.infoText1}>
            {this.props.t('realVerification:approvalTime')}
          </Text>

          <Text style={sendLikeCoffe.noteText}>
            {this.props.t('realVerification:falseInformation')}
          </Text>
        </View>
      </Modal>
    );
  };

  _verifyAppearance = async uri => {
    let data = {
      uri,
      type: 'picture',
      response: () => {}
    };
    console.log('TYPE', this.props);
    this.props.verifyAppearance(data);
  };

  render() {
    const { imageSource } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.exclusiveHeader}>
            <Text style={styles.exclusiveHeaderText}>
              {' '}
              {t('realVerification:bannerMessage')}{' '}
            </Text>
          </View>

          <Image style={styles.middleImage} source={imgCertifyCamera} />

          <View style={styles.bottomContainer}>
            <View style={styles.flex1}>
              <Text style={styles.note2}>
                {t('realVerification:photoScreen.rule1')}
                {'\n'}
                {t('realVerification:photoScreen.rule2')}
                {'\n'}
                {t('realVerification:photoScreen.rule3')}
              </Text>
              <ActionButton
                iconStyle={styles.addImageIcon}
                customStyle={{
                  touchableStyle: styles.addImageButton,
                  buttonTextStyle: styles.addImageText
                }}
                onPress1={() => {
                  const options = {
                    title: t('common:verifySchoolScreen.selectImage'),
                    storageOptions: {
                      skipBackup: true,
                      path: 'images'
                    }
                  };

                  ImagePicker.launchCamera(options, response => {
                    if (response.didCancel) {
                    } else if (response.error) {
                      Alert.alert(
                        `${t('common:app.error')}`,
                        t('common:verifySchoolScreen.errorGallery')
                      );
                    } else {
                      this.setState({
                        imageSource: response
                      });
                    }
                  });
                }}
                text={t('realVerification:photoScreen.takePic')}
              />
            </View>
          </View>

          {imageSource && (
            <View style={styles.uploadedImage}>
              <Text style={styles.uploadedImageText}>
                {imageSource.fileName}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    imageSource: null
                  });
                }}
              >
                <Image style={{ width: 20, height: 30 }} source={DeleteIcon} />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        <View style={styles.bottomButtonContainer}>
          <ActionButton
            text={t('realVerification:verify')}
            customStyle={{
              touchableStyle: styles.bottomButtonStyle
            }}
            onPress1={() => {
              if (imageSource) {
                this.setState({
                  showCautionVisible: true
                });
              }
            }}
          />
        </View>
        {this.renderCautionModal()}
        {this.renderSubmitCompleteModal()}
      </Fragment>
    );
  }
}

class VerifiedByPassportPhoto extends Component {
  constructor() {
    super();
    this.state = {
      imageSource: null,
      showCautionVisible: false,
      showCompleteModal: false
    };
    this._verifyAppearance = this._verifyAppearance.bind(this);
  }

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
        <Text style={styles.modalText}>
          {t('realVerification:cautionText')}
        </Text>
      </Modal>
    );
  };

  renderSubmitCompleteModal = () => {
    return (
      <Modal
        visible={this.state.showCompleteModal}
        buttonText1={this.props.t('common:app.confirm')}
        onClose={() => {
          this.setState({ showCompleteModal: false });
          this._verifyAppearance(this.state.imageSource.uri);
        }}
      >
        <View style={sendLikeCoffe.innerModalContainer}>
          <Image style={sendLikeCoffe.headerImage} source={icIcSendConfirm} />
          <Text style={sendLikeCoffe.boldTextHeader}>
            {this.props.t('realVerification:submitComplete1')}
          </Text>
          <Text style={sendLikeCoffe.infoText1}>
            {this.props.t('realVerification:approvalTime')}
          </Text>

          <Text style={sendLikeCoffe.noteText}>
            {this.props.t('realVerification:falseInformation')}
          </Text>
        </View>
      </Modal>
    );
  };

  _verifyAppearance = async uri => {
    let data = {
      uri,
      type: 'passport'
    };

    this.props.verifyAppearance(data);
  };

  render() {
    const { imageSource } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.exclusiveHeader}>
            <Text style={styles.exclusiveHeaderText}>
              {' '}
              {t('realVerification:bannerMessage')}{' '}
            </Text>
          </View>

          <Image style={styles.middleImage} source={imgCertifyPassport} />

          <View style={styles.bottomContainer}>
            <View style={styles.flex1}>
              <Text style={styles.note2}>
                {t('realVerification:passPortScreen.rule1')}
                {'\n'}
                {t('realVerification:passPortScreen.rule2')}
                {'\n'}
                {t('realVerification:passPortScreen.rule3')}
              </Text>
              <ActionButton
                iconStyle={styles.addImageIcon}
                icon={AddImage}
                customStyle={{
                  touchableStyle: styles.addImageButton,
                  buttonTextStyle: styles.addImageText
                }}
                onPress1={() => {
                  const options = {
                    title: t('realVerification:passPortScreen.takePic'),
                    storageOptions: {
                      skipBackup: true,
                      path: 'images'
                    }
                  };

                  ImagePicker.showImagePicker(options, response => {
                    if (response.didCancel) {
                    } else if (response.error) {
                      Alert.alert(
                        `${t('common:app.error')}`,
                        t('common:verifySchoolScreen.errorGallery')
                      );
                    } else {
                      this.setState({
                        imageSource: response
                      });
                    }
                  });
                }}
                text={' ' + t('realVerification:passPortScreen.takePic')}
              />
            </View>
          </View>
          {imageSource && (
            <View style={styles.uploadedImage}>
              <Text style={styles.uploadedImageText}>
                {imageSource.fileName}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    imageSource: null
                  });
                }}
              >
                <Image style={{ width: 20, height: 30 }} source={DeleteIcon} />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        <View style={styles.bottomButtonContainer}>
          <ActionButton
            text={t('realVerification:verify')}
            customStyle={{
              touchableStyle: styles.bottomButtonStyle
            }}
            onPress1={() => {
              if (imageSource) {
                this.setState({
                  showCautionVisible: true
                });
              }
            }}
          />
        </View>
        {this.renderCautionModal()}
        {this.renderSubmitCompleteModal()}
      </Fragment>
    );
  }
}

class AuthenticateInKind extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: this.props.t('realVerification:tab1Title') },
      { key: 'second', title: this.props.t('realVerification:tab2Title') }
    ],
    imageSource: null
  };

  _handleIndexChange = index => {
    this.setState({ index });
  };

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  componentWillReceiveProps(nextprops) {
    if (this.props.response !== nextprops.response) {
      console.log('apperance res -', nextprops.response);
      if (nextprops.response.Body === 'SUCCESSFULLY_VERIFIED') {
        console.log('VERIFIED');
        this.props.navigation.goBack();
      }
    }
  }

  _renderTabBar = props => {
    const { t } = this.props;
    return (
      <Fragment>
        <TopBarHeader
          sectionTitle={t('realVerification:headerTitle')}
          action={'back'}
          isProfile
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
        return <PhotoShootCertification {...this.props} />;
      case 'second':
        return <VerifiedByPassportPhoto {...this.props} />;
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
    listVibeDetails: state.vibes.listVibeDetails,
    userPhotos: state.auth.user.photos,
    response: state.profile.response
  };
};

const mapDispatchToProps = dispatch => {
  return {
    verifyAppearance: data => dispatch(verifyAppearance(data))
  };
};

const AuthenticateInKindHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(AuthenticateInKind));

export default withNamespaces(['common', 'realVerification'], { wait: true })(
  AuthenticateInKindHOC
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
  // End of Tab Style
  imageContainer: {
    flex: 2,
    backgroundColor: config.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 210,
    height: 140
  },
  inputBox: {
    height: 50,
    borderWidth: 1,
    borderRadius: 3
  },
  disclaimerContainer: {
    padding: 15,
    flex: 2,
    backgroundColor: 'white'
  },
  statusText: {
    color: '#5ba1ff',
    fontSize: 15,
    paddingTop: 13
  },
  disclaimerText: {
    fontSize: 13,
    color: config.brownishGrey,
    paddingBottom: 5
  },
  inputContainer: {
    borderWidth: 0.5,
    borderColor: config.whiteTwo
  },
  bottomButtonContainer: { position: 'absolute', bottom: 0, width: '100%' },
  addImageIcon: { width: 14, height: 14, resizeMode: 'contain' },
  note2: {
    fontFamily: config.regularFont,
    fontSize: 12,
    fontWeight: '600',
    paddingRight: 10,
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    color: config.clearBlue
    // flex: 1
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
  noteImage: {
    width: 18,
    height: 18,
    marginHorizontal: 4,
    resizeMode: 'contain'
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
  // flex1: { flex: 1 },
  bottomContainer: {
    flex: 1,
    width,
    padding: 20,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 50
  },
  middleImage: {
    width: '50%',
    marginBottom: 80,
    // marginVertical: 20,
    marginHorizontal: 80,
    resizeMode: 'contain',
    flex: 3
  },

  exclusiveHeaderText: {
    fontFamily: config.regularFont,
    paddingHorizontal: 50,
    paddingVertical: 8,
    fontSize: 12,
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
    backgroundColor: config.lightGreyBg
  },
  scrollContainer: {
    flex: 1,
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
    marginTop: 30,
    backgroundColor: config.lightGreyBg,
    width: config.component_width,
    height: 52,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignSelf: 'center'
  },
  uploadedImageText: {
    flex: 1
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
  }
});
