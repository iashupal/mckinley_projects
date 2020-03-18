import React, { Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  AsyncStorage,
  BackHandler
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
const { width } = Dimensions.get('window');
import * as HOC from '../components/HOC';

const BottomOverlayMessageHOC = HOC.BottomOverlayMessageHOC(View);

const FullScreenHOC = HOC.FullScreenHoc(View);
import Carousel, { Pagination } from 'react-native-snap-carousel';

//Importing assets
import icRate1 from '@assets/images/icRate1.png';
import icRate2 from '@assets/images/icRate2.png';
import icRate3 from '@assets/images/icRate3.png';
import icRate4 from '@assets/images/icRate4.png';
import icRate5 from '@assets/images/icRate5.png';

import btnCoffee from '@assets/images/btnCoffee3.png';
import bgBubbleDay from '@assets/images/bgBubbleDay.png';

import icSureQualify from '@assets/images/icSureQualify.png';
import icShare from '@assets/images/ic_share.png';

// import icRate5_filled from "@assets/images/icRate5_filled.png"
// import icRate4_filled from "@assets/images/icRate4_filled.png"
// import icRate3_filled from "@assets/images/icRate3_filled.png"
// import icRate2_filled from "@assets/images/icRate2_filled.png"
// import icRate1_filled from "@assets/images/icRate1_filled.png"

import ReportIcon from '@assets/images/btnReport1.png';
import BlockIcon from '@assets/images/btnBlock.png';
import Pass1Month from './../assets/images/ic_1_month_pass.png';
import Pass2Week from './../assets/images/ic_2_weeks_pass.png';
import Image1 from './../assets/images/tagImage2.png';
import Pass14days from './../assets/images/ic_pass_14.png';
import alarm from './../assets/images/btn_alarm.png';

//Import components
import StoreItem from '@components/StoreItem';
import InputBox from '@components/InputBox';
import TopBarHeader from '@components/TopBarHeader';
import config from '@src/config';

import UserPhotoCarousel from '@components/UserPhotoCarousel';

import { connect } from 'react-redux';
import { getProfileById } from '../store/actions';
import WithLoaderStatus from '../components/HOC/withLoaderStatus';
import func from '../services/VibesApiService';

import { getAge } from '@utils/utility';
class ProfileSend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
      userDetails: {},
      userDetailsLoaded: false
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

  // componentWillUnmount() {
  //   this.willFocusSubscription.remove();
  // }

  componentWillReceiveProps(nextProps) {
    if (this.props.userDetails != nextProps.userDetails) {
      this.setState({
        userDetails: nextProps.userDetails,
        userDetailsLoaded: true
      });
    }
  }

  blockUser = async (id, msg) => {
    let token = await AsyncStorage.getItem('@token:key');
    let res = await func.blockUser(token, { blockedUserId: id });
    if (res) {
      alert(msg);
    }
  };

  render() {
    const userDetails = this.state.userDetails.userInfo;
    const { userDetailsLoaded } = this.state;
    const { t } = this.props;
    console.log('userDetails profile send');
    return (
      <FullScreenHOC
        active={1}
        textContainerStyle={{ opacity: 0.96, backgroundColor: config.eggShell }}
        textStyle={{
          fontFamily: config.regularFont,
          fontSize: 13,
          fontWeight: '600',
          fontStyle: 'normal',
          letterSpacing: 0,
          textAlign: 'center',
          color: config.dullOrange
        }}
        text={t('profileSenfCoffeeLang:expressInt')}
      >
        <Fragment>
          <TopBarHeader
            sectionTitle='프로필 상세'
            action='close'
            rightNavBlockIcon={BlockIcon}
            rightNavIcon={ReportIcon}
            onPressRightAction2={() => {
              this.blockUser(
                userDetails._id,
                t('profileMatchLang:userBlocked')
              );
            }}
            // rightNavSecondIcon={icShare}
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
              resizeMode: 'contain'
            }}
            onPressRightAction={() => {
              this.props.navigation.navigate('Report', {
                userId: !!userDetails._id
                  ? userDetails._id
                  : '5d9d601680b7c9676c91849a' //TODO: MISSING IN API
              });
            }}
          />
          {userDetailsLoaded && (
            <ScrollView
              contentContainerStyle={{
                backgroundColor: config.white,
                paddingBottom: '45%'
              }}
            >
              <View style={styles.carouselHolderContainer}>
                <View style={[styles.absoluteCarouselContainer]}>
                  <View style={styles.aboutUserContainer}>
                    <Text style={styles.aboutUserText}>
                      {t('profileMatchLang:certificate')}
                    </Text>
                  </View>
                  <Text style={styles.aboutUserTextH2}>
                    {userDetails.username},{' '}
                    {getAge(userDetails && userDetails.dob)}세
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
                    {t('profileMatchLang:liked')}
                  </Text>
                </View>
              </View>
              {/* Store container */}

              {/* Contact Number Container */}
              <View style={styles.mainConatiner}>
                {/* Text Heading */}

                {/*<Text style={styles.rateHeader}> 호감도를 평가해주세요 </Text>*/}

                {/* User Rating */}
                {/*<View style={styles.userRatingView}>*/}
                {/*  <Image style={styles.imgRating} source={icRate1} />*/}
                {/*  <Image style={styles.imgRating} source={icRate2} />*/}
                {/*  <Image style={styles.imgRating} source={icRate3} />*/}
                {/*  <Image style={styles.imgRating} source={icRate4} />*/}
                {/*  <Image style={styles.imgRating} source={icRate5} />*/}
                {/*</View>*/}

                <View style={styles.numberContainer}>
                  <View
                    style={{
                      justifyContent: 'space-around',
                      marginVertical: 14,
                      marginLeft: 14,
                      marginRight: 30
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        lineHeight: 20,
                        fontFamily: config.regularFont,
                        fontWeight: '600',
                        color: config.black
                      }}
                    >
                      {t('profileMatchLang:says')}
                      {/* 0000님의 메세지 : */}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: config.regularFont,
                        lineHeight: 20,
                        color: config.lightGrey
                      }}
                    >
                      {t('profileMatchLang:ordinaryExercise')}
                      {/* 안녕하세요 블라블라 서초구에에서 000법무사를 다니는 000입니다. 퇴근후에는 운동을 즐기는 평범한
                      직장인입니다. 000님과 이야기를 나눠보고싶어요! */}
                    </Text>
                  </View>
                </View>

                {/* Bio */}
                <View style={{ width, marginTop: 10 }}>
                  {/* One Row */}
                  <View style={styles.singleBioRow}>
                    <View style={styles.bioLeftContainer}>
                      <Text style={styles.bioText}>
                        {' '}
                        {userDetails.location}{' '}
                      </Text>
                    </View>
                    <View style={styles.bioRightContainer}>
                      <View
                        style={{
                          marginLeft: 0,
                          flexDirection: 'row',
                          width: '92%'
                        }}
                      >
                        <Text style={styles.bioText}>
                          {' '}
                          {userDetails.college}{' '}
                        </Text>
                        <Image
                          style={styles.assuredTick}
                          source={icSureQualify}
                        />
                      </View>
                    </View>
                  </View>
                  {/* One Row End */}
                  {/* Second Row */}
                  <View style={styles.singleBioRow}>
                    <View style={styles.bioLeftContainer}>
                      {/*<Text style={styles.bioText}> 슬림, {userDetails.height || 0} cm </Text>*/}
                    </View>
                    <View style={styles.bioRightContainer}>
                      <View
                        style={{
                          marginLeft: 0,
                          flexDirection: 'row'
                        }}
                      >
                        <Text style={styles.bioText}>
                          {' '}
                          {userDetails.occupation || 'Not Set'}{' '}
                        </Text>
                        <Image
                          style={styles.assuredTick}
                          source={icSureQualify}
                        />
                      </View>
                    </View>
                  </View>
                  {/* Second Row End */}
                  {/* Third Row */}
                  <View style={styles.singleBioRow}>
                    <View style={styles.bioLeftContainer}>
                      {/*<Text style={styles.bioText}> {userDetails.race || 'Not Set'} </Text>*/}
                    </View>
                    <View style={styles.bioRightContainer}>
                      <View
                        style={{
                          marginLeft: 0,
                          flexDirection: 'row'
                        }}
                      >
                        <Text style={styles.bioText}>
                          {' '}
                          {userDetails.doSmoke
                            ? userDetails.doSmoke
                            : 'No Smoker'}{' '}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* Third Row End */}
                  {/* Fourth Row */}
                  <View style={styles.singleBioRow}>
                    <View style={styles.bioLeftContainer}>
                      <Text style={styles.bioTextGrey}>
                        {t('profileMatchLang:exercise')}{' '}
                      </Text>
                    </View>
                    <View style={{ ...styles.bioRightContainer, flex: 0.9 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.bioText}> 주 2~3회 </Text>
                      </View>
                    </View>
                  </View>
                  {/* Fourth Row End */}
                  {/* Fifth Row */}
                  <View style={styles.singleBioRow}>
                    <View style={styles.bioLeftContainer}>
                      <Text style={styles.bioTextGrey}> 관심사 </Text>
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
                          <Text style={styles.interestText}>No interest</Text>
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
                            #{item}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                  {/* Fifth Row End */}
                  {/* 6th Row */}
                  <View style={[styles.singleBioRow]}>
                    <View style={[styles.bioLeftContainer]}>
                      <Text style={styles.bioTextGrey}> 자기소개 </Text>
                    </View>
                    <View
                      style={{
                        ...styles.bioRightContainer,
                        flex: 0.9,
                        paddingVertical: 10
                      }}
                    >
                      <View style={{ flexDirection: 'row', width: '80%' }}>
                        <Text style={styles.bioText}>
                          안녕하세요, 자기소개글입니다. 가나다라마바사.
                          서울대학교를 졸업 공무원으로 일하고 있어요 :)
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* 6th Row End */}
                </View>
                {/*  */}
              </View>
            </ScrollView>
          )}
          {/* Bottom Button */}
          <View
            style={{
              width,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: '14%'
            }}
          >
            <TouchableOpacity>
              <Image
                style={{ width: 66, height: 66 }}
                source={btnCoffee}
                resizeMode='contain'
              />
              {/* <Text style={styles.btnText}> 리뷰남기기 </Text> */}
              <TouchableOpacity
                style={{ position: 'absolute', top: 0, right: -20 }}
              >
                <ImageBackground
                  style={{
                    paddingTop: '5%',
                    width: 39,
                    height: 26,
                    alignItems: 'center'
                  }}
                  source={bgBubbleDay}
                  resizeMode='cover'
                >
                  <Text
                    style={{
                      fontFamily: config.regularFont,
                      fontSize: 13,
                      fontWeight: '200',
                      fontStyle: 'normal',
                      letterSpacing: 0,
                      color: config.white
                    }}
                  >
                    D-3
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <View style={styles.buttomButton}>
            <TouchableOpacity style={styles.btnBlack}>
              <Text style={styles.btnText}>
                {t('profileMatchLang:leaveReview')}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </Fragment>
      </FullScreenHOC>
    );
  }
}

const styles = StyleSheet.create({
  absoluteCarouselContainer: {
    zIndex: 101,
    position: 'absolute',
    width,
    paddingHorizontal: 20,
    bottom: '12%',
    alignSelf: 'center'
  },
  carouselHolderContainer: {
    backgroundColor: 'black',
    zIndex: 222,
    width,
    height: 300,
    justifyContent: 'flex-end'
  },
  carouselContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
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
  aboutUserText: {
    width: 39,
    height: 18,
    fontFamily: config.regularFont,
    fontSize: 11,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
    color: config.aqua_marine
  },
  aboutUserContainer: {
    width: 55,
    aspectRatio: 2.2,
    borderRadius: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: config.aqua_marine
  },
  messageOverlayText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'center',
    color: config.white
  },
  messageOverlayContainer: {
    width: '100%',
    justifyContent: 'center',
    opacity: 0.9,
    backgroundColor: '#000'
  },
  singleBioRow: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10
  },
  bioLeftContainer: {
    flex: 1.5,
    justifyContent: 'flex-start'
  },
  bioRightContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    textAlign: 'left'
    // height: 40
  },
  assuredTick: {
    marginHorizontal: 4,
    width: 20,
    height: 20,
    resizeMode: 'contain'
  },
  bioText: {
    fontSize: 15,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    color: config.black,
    textAlign: 'left'
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
  imgRating: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    marginRight: '5%'
  },
  numberText: {
    fontFamily: config.boldFont,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0,
    borderColor: config.black
  },
  numberContainer: {
    marginTop: 18,
    marginHorizontal: 20,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(ProfileSend));
