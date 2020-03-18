import React, { Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage,
  BackHandler,
  Platform,
  Alert,
  Linking
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
const { width } = Dimensions.get('window');
import * as HOC from '../components/HOC';
const FullScreenHOC = HOC.FullScreenHoc(View);

//Importing assets
import icRate1 from '@assets/images/icRate1.png';
import icRate2 from '@assets/images/icRate2.png';
import icRate3 from '@assets/images/icRate3.png';
import icRate4 from '@assets/images/icRate4.png';
import icRate5 from '@assets/images/icRate5.png';
import icRateBullet0 from '@assets/images/icRateBullet.png';
import IconInput from '@components/IconInput';
import icSureQualify from '@assets/images/icSureQualify.png';

import ReportIcon from '@assets/images/btnReport1.png';
import BlockIcon from '@assets/images/btnBlock.png';
import Pass1Month from './../assets/images/ic_1_month_pass.png';
import Pass2Week from './../assets/images/ic_2_weeks_pass.png';
import Image1 from './../assets/images/tagImage2.png';
import Pass14days from './../assets/images/ic_pass_14.png';
import alarm from './../assets/images/btn_alarm.png';
import icClover from '@assets/images/ic_clover.png';
import profilePhoto from '@assets/images/tagImage1.png';

import icRate5Filled from '@assets/images/icRate5_filled.png';
import icRate1Filled from '@assets/images/icRate1_filled.png';
import icRateBulletFilled from '@assets/images/icRateBullet_filled.png';

import icRateBullet_1 from '@assets/images/icRateBullet_1.png';
import icRateBullet_1_Filled from '@assets/images/icRateBullet_1_filled.png';

import icRateBullet_2 from '@assets/images/icRateBullet_2.png';
import icRateBullet_2_Filled from '@assets/images/icRateBullet_2_filled.png';

import icRateBullet_3 from '@assets/images/icRateBullet_3.png';
import icRateBullet_3_Filled from '@assets/images/icRateBullet_3_filled.png';

//Import components
import StoreItem from '@components/StoreItem';
import InputBox from '@components/InputBox';
import TopBarHeader from '@components/TopBarHeader';
import config from '@src/config';
import UserPhotoCarousel from '@components/UserPhotoCarousel';
import Modal from '@components/CustomModal';

import { connect } from 'react-redux';
import { getProfileById } from '../store/actions';
import WithLoaderStatus from '../components/HOC/withLoaderStatus';

import { getAge } from '@utils/utility';
import { withNamespaces } from 'react-i18next';
import func from '../services/VibesApiService';
import { T } from 'ramda';

class ProfileMatchedScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
      userDetails: {},
      userDetailsLoaded: false,
      blockModalVisible: false,
      modalFollowUp1: false,
      modalFollowUp2: false,
      modalFollowUp3: false,
      currentRate1: '1',
      currentRate2: '1',
      ratingType: 'talked',
      description: '',
      isBlocked: true,
      isReviewed: true
    };
  }

  async componentDidMount() {
    const id = this.props.navigation.getParam('id', '');
    this.props.getProfileById({ id });
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userDetails != nextProps.userDetails) {
      this.setState({
        userDetails: nextProps.userDetails,
        userDetailsLoaded: true,
        isBlocked: nextProps.userDetails.isBlocked,
        isReviewed: nextProps.userDetails.isReviewed
      });
    }
  }

  blockUser = async (id, msg) => {
    this.setState({ blockModalVisible: true });
  };

  addReview = async () => {
    let token = await AsyncStorage.getItem('@token:key');
    let res = await func.addReview(token, {
      reviewTo: this.state.userDetails.userInfo._id,
      description: this.state.description,
      ratingType: this.state.ratingType,
      rating1: this.state.currentRate1,
      rating2: this.state.currentRate2
    });
    if (res.status === 200) {
      this.setState({ isReviewed: true });
      Alert.alert('Your review have been submitted successfully');
      // alert(`${this.props.t("common:app.submitReview")}`);
    }
  };

  render() {
    const userDetails = this.state.userDetails.userInfo;
    const { userDetailsLoaded } = this.state;
    const { t } = this.props;
    console.log('current------', this.state.currentRate1);
    return (
      <Fragment>
        <TopBarHeader
          sectionTitle={t('profileMatchLang:header')}
          action='back'
          rightNavBlockIcon={this.state.isBlocked === false ? BlockIcon : false}
          rightNavIcon={ReportIcon}
          onPressRightAction2={() => {
            this.blockUser(userDetails._id, t('profileMatchLang:userBlocked'));
          }}
          onPressRightAction={() => {
            this.props.navigation.navigate('Report', {
              type: 'User',
              vibeOrMomentId: userDetails._id
            });
          }}
          rightNavBlockIconStyle={{
            width: 24,
            height: 24,
            resizeMode: 'cover'
          }}
          rightNavIconStyle={{
            width: 24,
            height: 24,
            marginLeft: 8,
            resizeMode: 'cover'
          }}
        />
        {/* BLOCK MODAL*/}
        <Modal
          transparent={true}
          visible={this.state.blockModalVisible}
          hasTwo
          // onPress1={() => {
          //   setShowProfile (false);
          // }}
          buttonText1={t('otherUserVibes:blockModal.btnOneText')}
          buttonText2={t('otherUserVibes:blockModal.btnTwoText')}
          onPress2={async () => {
            let token = await AsyncStorage.getItem('@token:key');
            let res = await func.blockUser(token, {
              blockedUserId: userDetails._id
            });
            this.setState({ blockModalVisible: false, isBlocked: true });
          }}
          onClose={() => {
            this.setState({ blockModalVisible: false });
          }}
        >
          <View
            style={{
              paddingHorizontal: 0,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* <Image style={styles.headerImage} source={imgStopMoment} /> */}
            <Text
              style={{
                fontFamily: config.regularFont,
                fontSize: 18,
                fontWeight: 'bold',
                fontStyle: 'normal',
                letterSpacing: 0,
                textAlign: 'center',
                marginBottom: 16,
                color: config.black
              }}
            >
              {t('otherUserVibes:blockModal.headerText', {
                value: userDetails && userDetails.username
              })}
            </Text>
            <View
              style={{
                width: width * 0.8,
                height: 1,
                backgroundColor: config.whiteTwo
              }}
            />
            <Text
              style={{
                fontFamily: config.regularFont,
                fontSize: 14,
                marginTop: 16,
                marginBottom: 8,
                fontWeight: 'bold',
                fontStyle: 'normal',
                lineHeight: 18,
                letterSpacing: 0,
                textAlign: 'center',
                color: config.black
              }}
            >
              {t('otherUserVibes:blockModal.messageh4')}
            </Text>
            <Text
              style={{
                fontFamily: config.regularFont,
                fontSize: 14,
                fontWeight: 'normal',
                fontStyle: 'normal',
                lineHeight: 18,
                letterSpacing: 0,
                textAlign: 'center',
                color: config.brownishGrey
              }}
            >
              {t('otherUserVibes:blockModal.messageh6')}
            </Text>
          </View>
        </Modal>
        {/* END */}
        {/* 3 modal start */}
        <View>
          <Modal
            transparent={true}
            shouldHideActionButton={true}
            // onClose={() => {
            //   this.setState({ modalFollowUp1: false, modalFollowUp2: true });
            // }}
            visible={this.state.modalFollowUp3}
          >
            <Text style={styles.modalHeaderHeading}>
              {t('momentMainScreen:userManners', {
                value: userDetailsLoaded
                  ? userDetails.firstName + ' ' + userDetails.lastName
                  : ''
              })}
            </Text>

            <View
              style={{
                marginTop: 14,
                height: 100
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  marginTop: 12,
                  marginBottom: 26
                }}
              >
                <View style={styles.smileyBox1}>
                  <TouchableOpacity
                    style={styles.smileyBoxInner}
                    onPress={() => this.setState({ currentRate1: '1' })}
                  >
                    {this.state.currentRate1 === '1' ? (
                      <Image
                        source={icRate1Filled}
                        style={styles.imageRateSize}
                      />
                    ) : (
                        <Image source={icRate1} style={styles.imageRateSize} />
                      )}
                    <Text style={styles.smileyBoxText}>
                      {t('momentMainScreen:notReally')}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.smileyBox1}>
                  <TouchableOpacity
                    style={styles.smileyBoxInner}
                    onPress={() => this.setState({ currentRate1: '2' })}
                  >
                    {this.state.currentRate1 === '2' ? (
                      <Image
                        source={icRateBulletFilled}
                        style={styles.imageRateSize}
                      />
                    ) : (
                        <Image
                          source={icRateBullet0}
                          style={styles.imageRateSize}
                        />
                      )}
                    <Text style={styles.smileyBoxText} />
                  </TouchableOpacity>
                </View>

                <View style={styles.smileyBox1}>
                  <TouchableOpacity
                    style={styles.smileyBoxInner}
                    onPress={() => this.setState({ currentRate1: '3' })}
                  >
                    {this.state.currentRate1 === '3' ? (
                      <Image
                        source={icRateBulletFilled}
                        style={styles.imageRateSize}
                      />
                    ) : (
                        <Image
                          source={icRateBullet0}
                          style={styles.imageRateSize}
                        />
                      )}
                    <Text style={styles.smileyBoxText}>
                      {t('momentMainScreen:usually')}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.smileyBox1}>
                  <TouchableOpacity
                    style={styles.smileyBoxInner}
                    onPress={() => this.setState({ currentRate1: '4' })}
                  >
                    {this.state.currentRate1 === '4' ? (
                      <Image
                        source={icRateBulletFilled}
                        style={styles.imageRateSize}
                      />
                    ) : (
                        <Image
                          source={icRateBullet0}
                          style={styles.imageRateSize}
                        />
                      )}
                    <Text style={styles.smileyBoxText} />
                  </TouchableOpacity>
                </View>

                <View style={styles.smileyBox1}>
                  <TouchableOpacity
                    style={styles.smileyBoxInner}
                    onPress={() => this.setState({ currentRate1: '5' })}
                  >
                    {this.state.currentRate1 === '5' ? (
                      <Image
                        source={icRate5Filled}
                        style={styles.imageRateSize}
                      />
                    ) : (
                        <Image source={icRate5} style={styles.imageRateSize} />
                      )}
                    <Text style={styles.smileyBoxText}>
                      {t('momentMainScreen:good')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Text style={styles.modalHeaderHeading}>
              {t('momentMainScreen:userPhoto', {
                value: userDetailsLoaded
                  ? userDetails.firstName + ' ' + userDetails.lastName
                  : ''
              })}
            </Text>

            <View
              style={{
                marginTop: 14,
                height: 260
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  marginTop: 12,
                  marginBottom: 0
                }}
              >
                <View style={styles.smileyBox1}>
                  <TouchableOpacity
                    style={styles.smileyBoxInner}
                    onPress={() => this.setState({ currentRate2: '1' })}
                  >
                    {this.state.currentRate2 === '1' ? (
                      <Image
                        source={icRate1Filled}
                        style={styles.imageRateSize}
                      />
                    ) : (
                        <Image source={icRate1} style={styles.imageRateSize} />
                      )}
                    <Text style={styles.smileyBoxText}>
                      {t('momentMainScreen:notReally')}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.smileyBox1}>
                  <TouchableOpacity
                    style={styles.smileyBoxInner}
                    onPress={() => this.setState({ currentRate2: '2' })}
                  >
                    {this.state.currentRate2 === '2' ? (
                      <Image
                        source={icRateBulletFilled}
                        style={styles.imageRateSize}
                      />
                    ) : (
                        <Image
                          source={icRateBullet0}
                          style={styles.imageRateSize}
                        />
                      )}
                    <Text style={styles.smileyBoxText} />
                  </TouchableOpacity>
                </View>

                <View style={styles.smileyBox1}>
                  <TouchableOpacity
                    style={styles.smileyBoxInner}
                    onPress={() => this.setState({ currentRate2: '3' })}
                  >
                    {this.state.currentRate2 === '3' ? (
                      <Image
                        source={icRateBulletFilled}
                        style={styles.imageRateSize}
                      />
                    ) : (
                        <Image
                          source={icRateBullet0}
                          style={styles.imageRateSize}
                        />
                      )}
                    <Text style={styles.smileyBoxText}>
                      {t('momentMainScreen:itsSimilar')}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.smileyBox1}>
                  <TouchableOpacity
                    style={styles.smileyBoxInner}
                    onPress={() => this.setState({ currentRate2: '4' })}
                  >
                    {this.state.currentRate2 === '4' ? (
                      <Image
                        source={icRateBulletFilled}
                        style={styles.imageRateSize}
                      />
                    ) : (
                        <Image
                          source={icRateBullet0}
                          style={styles.imageRateSize}
                        />
                      )}
                    <Text style={styles.smileyBoxText} />
                  </TouchableOpacity>
                </View>

                <View style={styles.smileyBox1}>
                  <TouchableOpacity
                    style={styles.smileyBoxInner}
                    onPress={() => this.setState({ currentRate2: '5' })}
                  >
                    {this.state.currentRate2 === '5' ? (
                      <Image
                        source={icRate5Filled}
                        style={styles.imageRateSize}
                      />
                    ) : (
                        <Image source={icRate5} style={styles.imageRateSize} />
                      )}
                    <Text style={styles.smileyBoxText}>
                      {t('momentMainScreen:liveBetter')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.comment}>
                <IconInput
                  isRightImage={false}
                  multiline
                  iconStyle={{ width: 0, margin: -10 }}
                  insetShadowStyle={{ height: 0 }}
                  inputStyle={{
                    width: Platform.OS == 'ios' ? 255 : 240,
                    // width: width * 0.7,
                    fontFamily: config.boldFont,
                    fontSize: 14,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: config.whiteTwo,
                    fontStyle: 'normal',
                    lineHeight: 18,
                    marginBottom: 10,
                    letterSpacing: 0,
                    height: 70,
                    color: config.black
                  }}
                  onChangeText={text =>
                    this.setState({
                      description: text
                    })
                  }
                  placeholder={this.props.t('profileMatchLang:optional')}
                />
              </View>
              <TouchableOpacity
                style={[styles.buttonStyle, { borderRadius: 3, height: 42 }]}
                onPress={() => {
                  this.addReview();
                  this.setState({
                    modalFollowUp1: false,
                    modalFollowUp2: false,
                    modalFollowUp3: false
                  });
                }}
              >
                <Text style={styles.buttonText}>
                  {t('momentMainScreen:submitReviewBtn1')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    modalFollowUp1: false,
                    modalFollowUp2: false,
                    modalFollowUp3: false
                  });
                }}
              >
                <Text style={styles.modalFooterLink}>
                  {t('vibeModals:skip')}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        {/* 3 modal end */}

        {/* 2 modal start */}
        <View>
          <Modal
            transparent={true}
            shouldHideActionButton={true}
            // onClose={() => {
            //   this.setState({ modalFollowUp1: false, modalFollowUp2: true });
            // }}
            visible={this.state.modalFollowUp2}
          >
            <Text style={styles.modalHeaderHeading}>
              {t('momentMainScreen:userManners', {
                value: userDetailsLoaded
                  ? userDetails.firstName + ' ' + userDetails.lastName
                  : ''
              })}
            </Text>

            <View
              style={{
                marginTop: 14,
                height: 260
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  marginTop: 12,
                  marginBottom: 0
                }}
              >
                <View style={styles.smileyBox1}>
                  <TouchableOpacity
                    style={styles.smileyBoxInner}
                    onPress={() => {
                      this.setState({ currentRate1: '1' });
                    }}
                  >
                    {this.state.currentRate1 === '1' ? (
                      <Image
                        source={icRate1Filled}
                        style={styles.imageRateSize}
                      />
                    ) : (
                        <Image source={icRate1} style={styles.imageRateSize} />
                      )}
                    <Text style={styles.smileyBoxText}>
                      {t('momentMainScreen:notReally')}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.smileyBox1}>
                  <TouchableOpacity
                    style={styles.smileyBoxInner}
                    onPress={() => {
                      this.setState({ currentRate1: '2' });
                    }}
                  >
                    {this.state.currentRate1 === '2' ? (
                      <Image
                        source={icRateBullet_1_Filled}
                        style={styles.imageRateSize}
                      />
                    ) : (
                        <Image
                          source={icRateBullet_1}
                          style={styles.imageRateSize}
                        />
                      )}
                    <Text style={styles.smileyBoxText} />
                  </TouchableOpacity>
                </View>

                <View style={styles.smileyBox1}>
                  <TouchableOpacity
                    style={styles.smileyBoxInner}
                    onPress={() => this.setState({ currentRate1: '3' })}
                  >
                    {this.state.currentRate1 === '3' ? (
                      <Image
                        source={icRateBullet_2_Filled}
                        style={styles.imageRateSize}
                      />
                    ) : (
                        <Image
                          source={icRateBullet_2}
                          style={styles.imageRateSize}
                        />
                      )}
                    <Text style={styles.smileyBoxText}>
                      {t('momentMainScreen:usually')}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.smileyBox1}>
                  <TouchableOpacity
                    style={styles.smileyBoxInner}
                    onPress={() => this.setState({ currentRate1: '4' })}
                  >
                    {this.state.currentRate1 === '4' ? (
                      <Image
                        source={icRateBullet_3_Filled}
                        style={styles.imageRateSize}
                      />
                    ) : (
                        <Image
                          source={icRateBullet_3}
                          style={styles.imageRateSize}
                        />
                      )}
                    <Text style={styles.smileyBoxText} />
                  </TouchableOpacity>
                </View>

                <View style={styles.smileyBox1}>
                  <TouchableOpacity
                    style={styles.smileyBoxInner}
                    onPress={() => this.setState({ currentRate1: '5' })}
                  >
                    {this.state.currentRate1 === '5' ? (
                      <Image
                        source={icRate5Filled}
                        style={styles.imageRateSize}
                      />
                    ) : (
                        <Image source={icRate5} style={styles.imageRateSize} />
                      )}
                    <Text style={styles.smileyBoxText}>
                      {t('momentMainScreen:good')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.comment}>
                <IconInput
                  isRightImage={false}
                  multiline
                  iconStyle={{ width: 0, margin: -10 }}
                  insetShadowStyle={{ height: 0 }}
                  inputStyle={{
                    width: Platform.OS == 'ios' ? 255 : 240,
                    // width: width * 0.7,
                    fontFamily: config.boldFont,
                    fontSize: 14,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    borderWidth: 1,
                    borderColor: config.whiteTwo,
                    fontStyle: 'normal',
                    lineHeight: 18,
                    marginBottom: 10,
                    letterSpacing: 0,
                    height: 70,
                    color: config.black
                  }}
                  onChangeText={text =>
                    this.setState({
                      description: text
                    })
                  }
                  placeholder={this.props.t('profileMatchLang:optional')}
                />
              </View>
              <TouchableOpacity
                style={[styles.buttonStyle, { borderRadius: 3, height: 42 }]}
                onPress={() => {
                  this.addReview();
                  this.setState({
                    modalFollowUp1: false,
                    modalFollowUp2: false,
                    modalFollowUp3: false
                  });
                }}
              >
                <Text style={styles.buttonText}>
                  {t('momentMainScreen:submitReviewBtn1')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    modalFollowUp1: false,
                    modalFollowUp2: false,
                    modalFollowUp3: false
                  });
                }}
              >
                <Text style={styles.modalFooterLink}>
                  {t('vibeModals:skip')}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        {/* 2 modal end */}

        {/* 1 modal start */}
        <View>
          <Modal
            transparent={true}
            shouldHideActionButton={true}
            // onClose={() => {
            //   this.setState({ modalFollowUp1: false, modalFollowUp2: true });
            // }}
            visible={this.state.modalFollowUp1}
          >
            <View
              style={{
                marginBottom: 17,
                alignSelf: 'center',
                overflow: 'hidden'
              }}
            >
              <Image
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 80 / 2
                }}
                source={{
                  uri: userDetailsLoaded ? userDetails.photos[0].url : ''
                }}
              />
            </View>

            <Text style={styles.modalHeaderText}>
              {t('momentMainScreen:timeWithUser', {
                value: userDetailsLoaded
                  ? userDetails.firstName + ' ' + userDetails.lastName
                  : ''
              })}
            </Text>
            <View
              style={{
                marginTop: 18,
                height: 140
              }}
            >
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: config.navyBlack,
                    height: 42,
                    backgroundColor: config.white
                  }
                ]}
                onPress={() => this.setState({ modalFollowUp1: false })}
              >
                <Text
                  style={{
                    ...styles.buttonText,
                    color: config.navyBlack
                  }}
                >
                  {t('momentMainScreen:notMet')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.buttonStyle,
                  {
                    borderRadius: 3,
                    height: 42,
                    marginVertical: 8
                  }
                ]}
                onPress={() => {
                  this.setState({
                    modalFollowUp1: false,
                    modalFollowUp2: true,
                    ratingType: 'talked'
                  });
                }}
              >
                <Text style={styles.buttonText}>
                  {t('momentMainScreen:justTalked')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonStyle, { borderRadius: 3, height: 42 }]}
                onPress={() => {
                  this.setState({
                    modalFollowUp1: false,
                    modalFollowUp3: true,
                    ratingType: 'met'
                  });
                }}
              >
                <Text style={styles.buttonText}>
                  {t('momentMainScreen:metYou')}
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
        {/* 1 modal end */}

        {userDetailsLoaded && (
          <ScrollView contentContainerStyle={{ paddingBottom: '30%' }}>
            {/*
           HOC COMPONENT
           @active : active need to be True(1) for bottom bar to be visible
         */}

            <View style={styles.carouselHolderContainer}>
              <View style={[styles.absoluteCarouselContainer]}>
                {/* <View style={styles.aboutUserContainer}>
                  <Text style={styles.aboutUserText}>
                    {t('profileMatchLang:photoVer')}
                  </Text>
                </View> */}
                {userDetails.appearanceVerified && (
                  <View style={styles.aboutUserContainer}>
                    <Text style={styles.aboutUserText}>
                      {userDetails.appearanceVerified
                        ? t('common:myScreen.photoVerified')
                        : ''}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    ...styles.aboutUserContainerSalary,
                    borderColor: config.goldYellow,
                    marginRight: 5,
                    display:
                      userDetails.wealthVerified !== 'accepted' ||
                        !userDetails.wealthCriteria
                        ? 'none'
                        : 'flex'
                  }}
                >
                  <Text
                    style={{
                      ...styles.aboutUserText,
                      color: config.goldYellow
                    }}
                  >
                    {userDetails.wealthVerified === 'accepted'
                      ? userDetails.wealthCriteria.replace('#', '')
                      : ''}
                  </Text>
                </View>
                {/* {userDetails &&
                userDetails.wealthVerified === 'accepted'
                ? (
                  <View
                    style={{
                      ...styles.aboutUserContainerSalary,
                      borderColor: config.goldYellow,
                      marginTop: 8
                    }}
                  >
                    <Text
                      style={{
                        ...styles.aboutUserText,
                        color: config.goldYellow
                      }}
                    >
                      {' '}
                      {userDetails && userDetails.wealthCriteria}
                      
                    </Text>
                  </View>
                ) : (
                  <View />
                )} */}

                <Text style={styles.aboutUserTextH2}>
                  {userDetails.firstName + ' ' + userDetails.lastName},{' '}
                  {getAge(userDetails && userDetails.dob)}
                </Text>
              </View>

              <UserPhotoCarousel
                containerStyle={styles.carouselContainer}
                pagination
                activeSlide={this.state.activeSlide}
                onSnapToItem={index => {
                  this.setState({
                    activeSlide: index
                  });
                }}
                data={userDetails.photos}
              />

              <View style={styles.messageOverlayContainer}>
                <Text style={styles.messageOverlayText}>
                  {/* {'Jullia sent you a gold coffee coupon.'} */}
                  {t('profileMatchLang:sucMth')}
                </Text>
              </View>
            </View>
            {/* Store container */}

            {/* Contact Number Container */}
            <View style={styles.mainConatiner}>
              <View style={styles.numberContainer}>
                <View style={{ borderBottomWidth: 2 }}>
                  <Text
                    style={styles.numberText}
                    onPress={() => {
                      Linking.openURL(`tel:${userDetails.phoneNumber}`);
                    }}
                  >
                    {userDetails.phoneNumber}
                  </Text>
                </View>
              </View>

              {/* Text Heading */}

              {/*<Text style={styles.rateHeader}>*/}
              {/*  {t('profileMatchLang:rate')}*/}
              {/*</Text>*/}

              {/* User Rating */}
              {/*<View style={styles.userRatingView}>*/}
              {/*  <Image style={styles.imgRating} source={icRate1} />*/}
              {/*  <Image style={styles.imgRating} source={icRate2} />*/}
              {/*  <Image style={styles.imgRating} source={icRate3} />*/}
              {/*  <Image style={styles.imgRating} source={icRate4} />*/}
              {/*  <Image style={styles.imgRating} source={icRate5} />*/}
              {/*</View>*/}

              {/* Bio */}
              <View
                style={{
                  width,
                  marginTop: 10,
                  paddingHorizontal: 18
                }}
              >
                {/* Top Row */}
                <View style={[styles.topRow]}>
                  <View style={styles.topRowLeftContainer}>
                    <Text style={styles.bioText}>{userDetails.location}</Text>
                  </View>
                  <View style={styles.topRowRightContainer}>
                    <View
                      style={{
                        marginLeft: 0,
                        flexDirection: 'row'
                      }}
                    >
                      <Image
                        style={styles.assuredTick}
                        source={icSureQualify}
                      />
                      <Text style={styles.bioText}>{userDetails.college}</Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.topRow]}>
                  <View style={styles.topRowLeftContainer}>
                    <Text style={styles.bioText}>
                      {userDetails && userDetails.height}{' '}
                      {t('idealSettingScreen:cm')}
                    </Text>
                  </View>
                  <View style={styles.topRowRightContainer}>
                    <View
                      style={{
                        marginLeft: 0,
                        flexDirection: 'row'
                      }}
                    >
                      <Image
                        style={styles.assuredTick}
                        source={icSureQualify}
                      />
                      <Text style={styles.bioText}>
                        {userDetails && userDetails.showOccupation === 'title'
                          ? userDetails && userDetails.occupation
                          : userDetails &&
                            userDetails.showOccupation === 'company'
                            ? userDetails.company
                            : userDetails && userDetails.showOccupation === 'both'
                              ? userDetails.occupation + ', ' + userDetails.company
                              : 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.topRow]}>
                  <View style={styles.topRowLeftContainer}>
                    <Text style={styles.bioText}>
                      {userDetails && userDetails.religion
                        ? userDetails.religion
                        : 'N/A'}
                    </Text>
                  </View>
                  <View style={styles.topRowRightContainer}>
                    <View
                      style={{
                        marginLeft: 0,
                        flexDirection: 'row'
                      }}
                    >
                      <Text style={styles.bioText}>
                        {userDetails.doSmoke ? userDetails.doSmoke : 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* Top Row */}

                {/* One Row */}
                <View style={[styles.singleBioRow]}>
                  <View style={styles.bioLeftContainer}>
                    <Text style={styles.bioTextGrey}>
                      {t('profileSenfCoffeeLang:race')}
                    </Text>
                  </View>
                  <View style={styles.bioRightContainer}>
                    <View
                      style={{
                        marginLeft: 0,
                        flexDirection: 'row'
                      }}
                    >
                      <Text style={styles.bioText}>
                        {userDetails && userDetails.race}{' '}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* One Row End */}

                {/* One Row */}
                <View style={[styles.singleBioRow]}>
                  <View style={styles.bioLeftContainer}>
                    <Text style={styles.bioTextGrey}>
                      {t('profileSenfCoffeeLang:drinking')}
                    </Text>
                  </View>
                  <View style={styles.bioRightContainer}>
                    <View
                      style={{
                        marginLeft: 0,
                        flexDirection: 'row'
                      }}
                    >
                      <Text style={styles.bioText}>
                        {userDetails && userDetails.doDrink}{' '}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* One Row End */}
                {/* One Row */}
                <View style={[styles.singleBioRow]}>
                  <View style={styles.bioLeftContainer}>
                    <Text style={styles.bioTextGrey}>
                      {t('profileSenfCoffeeLang:available')}
                    </Text>
                  </View>
                  <View style={styles.bioRightContainer}>
                    <View
                      style={{
                        marginLeft: 0,
                        flexDirection: 'row'
                      }}
                    >
                      <Text style={styles.bioText}>
                        {userDetails && userDetails.doAvailable}{' '}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* One Row End */}

                {/* Fourth Row */}
                <View style={styles.singleBioRow}>
                  <View style={styles.bioLeftContainer}>
                    <Text style={styles.bioTextGrey}>
                      {t('profileMatchLang:fitness')}
                    </Text>
                  </View>
                  <View style={styles.bioRightContainer}>
                    <View
                      style={{
                        marginLeft: 0,
                        flexDirection: 'row'
                      }}
                    >
                      <Text style={styles.bioText}>
                        {t('profileMatchLang:time')}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* Fourth Row End */}

                {/* Fifth Row */}
                <View style={styles.singleBioRow}>
                  <View style={styles.bioLeftContainer}>
                    <Text style={styles.bioTextGrey}>
                      {t('profileMatchLang:interest')}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      textAlign: 'left'
                    }}
                  >
                    {userDetails.interestedHashtags.length == 0 && (
                      <View style={styles.interestContainer}>
                        <Text style={styles.interestText}>
                          {t('profileMatchLang:noInt')}
                        </Text>
                      </View>
                    )}
                    {userDetails.interestedHashtags.map((item, index) => (
                      <View
                        key={index}
                        style={{
                          height: 30,
                          marginRight: 6,
                          marginBottom: 6,
                          marginLeft: 6,
                          marginLeft: 0,
                          borderRadius: 4,
                          backgroundColor: config.lightGreyBg,
                          justifyContent: 'center',
                          textAlign: 'center',
                          paddingHorizontal: 5
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: '500',
                            fontStyle: 'normal',
                            lineHeight: 18,
                            letterSpacing: 0,
                            color: config.black,
                            justifyContent: 'center',
                            textAlign: 'center'
                          }}
                        >
                          #{item}{' '}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
                {/* 6th Row */}
                <View style={[styles.singleBioRow]}>
                  <View style={[styles.bioLeftContainer]}>
                    <Text style={styles.bioTextGrey}>
                      {t('profileSenfCoffeeLang:intro')}
                    </Text>
                  </View>
                  <View
                    style={{
                      ...styles.bioRightContainer
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '98%'
                      }}
                    >
                      <Text style={styles.bioText}>
                        {userDetails && userDetails.introduction
                          ? userDetails.introduction
                          : 'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* 6th Row End */}
                {/* Fifth Row End */}

                {/* Interest Row */}
                {/* <View style={styles.singleBioRow}>
                  <View style={styles.bioLeftContainer}>
                    <Text style={styles.bioTextGrey}>
                      {t('profileMatchLang:interest')}
                    </Text>
                  </View>
                  <View style={styles.userInterestsContainer}>
                    {userDetails.interestedHashtags.length == 0 && (
                      <View style={styles.interestContainer}>
                        <Text style={styles.interestText}>
                          {t('profileMatchLang:noInt')}
                        </Text>
                      </View>
                    )}
                    {userDetails.interestedHashtags.map((item, index) => (
                      <View key={index} style={styles.interestContainer}>
                        <Text style={styles.interestText}> {item} </Text>
                      </View>
                    ))}
                  </View>
                </View> */}
                {/* Interest Row End */}
              </View>
            </View>
          </ScrollView>
        )}
        {/* Bottom Button */}
        {this.state.isReviewed === false ? (
          <View style={styles.buttomButton}>
            <TouchableOpacity
              style={styles.btnBlack}
              onPress={() => {
                this.setState({
                  modalFollowUp1: true
                });
              }}
            >
              <Text style={styles.btnText}>{t('profileMatchLang:levRvw')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
            <View />
          )}

        {/* Bottom Button */}
        {/* <View style={styles.buttomButton}>
          <TouchableOpacity style={styles.btnCloverBlack}>
            <Text style={styles.btnText}>{t('profileMatchLang:accept')}</Text>
            <Image style={styles.cloveImage} source={icClover} />
            <Text style={styles.cloveText}>x 7</Text>
          </TouchableOpacity>
        </View> */}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  absoluteCarouselContainer: {
    zIndex: 101,
    position: 'absolute',
    // width,
    paddingHorizontal: 20,
    bottom: '12%'
    // alignSelf: 'center',
  },
  carouselHolderContainer: {
    zIndex: 222,
    width,
    height: 300,
    justifyContent: 'flex-end'
  },
  aboutUserTextH2: {
    paddingTop: 5,
    fontFamily: config.regularFont,
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: config.white,
    textTransform: 'capitalize'
  },
  messageOverlayText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'center',
    color: config.black
  },
  messageOverlayContainer: {
    width: '100%',
    justifyContent: 'center',
    // paddingHorizontal: "20%",
    backgroundColor: '#fcd86f',
    opacity: 0.9
  },
  carouselContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  interestText: {
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    color: config.black
  },
  interestContainer: {
    height: 30,
    margin: 6,
    backgroundColor: config.lightGreyBg,
    justifyContent: 'center'
  },
  userInterestsContainer: {
    flex: 0.9,
    flexWrap: 'wrap',
    width: '80%',
    flexDirection: 'row'
  },
  aboutUserText: {
    // height: 18,
    fontFamily: config.regularFont,
    fontSize: 11,
    fontWeight: '500',
    fontStyle: 'normal',
    // lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
    color: config.aqua_marine
  },
  aboutUserContainer: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    // aspectRatio: 2.2,
    borderRadius: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
    borderStyle: 'solid',
    borderWidth: 1,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: config.aqua_marine,
    marginBottom: 8
  },
  aboutUserContainerSalary: {
    width: 105,
    aspectRatio: 2.2,
    borderRadius: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderColor: config.aqua_marine
  },
  singleBioRow: {
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 0
  },
  bioLeftContainer: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  bioRightContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left'
    // height: 40
  },

  topRow: {
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 0
  },

  topRowLeftContainer: {
    flex: 1.6,
    justifyContent: 'flex-start'
  },
  topRowRightContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left',
    paddingRight: 10
  },
  assuredTick: {
    marginHorizontal: 4,
    marginTop: 2,
    width: 18,
    height: 18,
    lineHeight: 22,
    resizeMode: 'contain'
  },
  bioText: {
    fontSize: 15,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    color: config.black,
    textAlign: 'left',
    paddingRight: 20
  },
  bioTextGrey: {
    fontSize: 15,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    color: config.hintText
  },
  rateHeader: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    marginTop: 18,
    marginBottom: 8,
    color: config.brownishGrey
  },
  userRatingView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  buttomButton: {
    position: 'absolute',
    backgroundColor: config.white,
    height: DeviceInfo.hasNotch() ? 90 : 70,
    width,
    paddingVertical: 11,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    bottom: 0
  },
  // comment: {
  //   paddingHorizontal: 10
  // },
  imgRating: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    marginRight: '5%'
  },
  numberText: {
    fontFamily: config.boldFont,
    color: config.black,
    fontSize: 20,
    marginBottom: -4,
    fontWeight: 'bold',
    letterSpacing: 0,
    borderColor: config.black
  },
  numberContainer: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.lightGreyBg
  },
  subHead: {
    backgroundColor: config.paleGrey,
    paddingHorizontal: 15,

    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subHeadImage: {
    height: 20,
    width: 20,
    marginRight: 5
  },
  mainConatiner: {
    backgroundColor: config.white
  },
  //flex direction row sub head
  oneRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'center'
  },
  subHeadText: {
    color: config.charcoal_grey,
    fontSize: 15
  },
  subHeadTextInactive: {
    fontSize: 15,
    color: config.hintText
  },
  pass: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fffbdf',
    borderRadius: 8,
    marginBottom: 10
  },
  passAmount: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderColor: config.goldYellow,
    borderLeftWidth: 0.5,
    padding: 0,
    margin: 0
  },
  passDetail: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 25
  },
  passTitle: {
    fontSize: 17,
    color: config.black
  },
  calIcon: {
    height: 25,
    width: 25,
    marginRight: 13,
    marginTop: 10
  },
  passDesc: {
    fontSize: 13
  },
  amount: {
    color: config.goldYellow,
    fontSize: 17,
    fontWeight: 'bold'
  },
  passText: {
    paddingVertical: 10
  },
  oneRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20
  },
  btnText: {
    color: config.white,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  btnBlack: {
    backgroundColor: config.charcoal_grey,
    width: '90%',
    borderRadius: 3,
    height: 44,
    justifyContent: 'center'
  },
  btnCloverBlack: {
    backgroundColor: config.charcoal_grey,
    width: '90%',
    borderRadius: 3,
    height: 44,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  cloveImage: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    // resizeMode: 'contain',
    tintColor: 'white'
  },
  cloveText: {
    fontSize: 18,
    color: 'white'
  },

  buttonStyle: {
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  buttonText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: config.white
  },
  modalText: {
    textAlign: 'center',
    fontFamily: config.regularFont,
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: config.lightGrey
  },
  modalHeaderHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalFooterLink: {
    fontSize: 14,
    color: '#30363b',
    textAlign: 'center',
    marginTop: 15
  },
  smileyBox1: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    textAlign: 'center',
    height: 80,
    flex: 1
  },
  smileyBoxInner: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  smileyBoxText: {
    color: '#666666',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,

    width: 50,
    height: 40,
    flexWrap: 'wrap',
    overflow: 'hidden'
  },
  imageRateSize: {
    width: 32,
    height: 32,
    resizeMode: 'contain'
  }
});

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    userDetails: state.profile.profileDetailsById
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfileById: id => dispatch(getProfileById(id))
  };
};

const ProfileMatchedScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(ProfileMatchedScreen));

export default withNamespaces(['common', 'profileMatchLang'], {
  wait: true
})(ProfileMatchedScreenHOC);
