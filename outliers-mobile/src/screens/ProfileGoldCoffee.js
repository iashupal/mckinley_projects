import React, { Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
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

import ReportIcon from '@assets/images/ic_report3.png';
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
// import {  } from '../store/actions';
import WithLoaderStatus from '../components/HOC/withLoaderStatus';

import { getAge } from '@utils/utility';

class ProfileGoldCoffee extends React.Component {

  willFocusSubscription;
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      userDetails: props.userDetails
    };
  }

  // async componentDidMount() {
  //   this.willFocusSubscription = this.props.navigation.addListener(
  //     'willFocus',
  //     () => {
  //       // this.fetchData();
  //     }
  //   );
  // }

  componentDidMount() {
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
      this.setState({ userDetails: nextProps.userDetails });
    }
  }

  render() {
    const { userDetails } = this.state;
    return (
      <Fragment>
        <TopBarHeader
          headerContainerStyle={{
            backgroundColor: config.navyBlack,
          }}
          tintColor={config.white}
          sectionTitle="Outliers Black"
          action="close"
          rightNavIcon={ReportIcon}
          // rightNavSecondIcon={icShare}
          onPressRightAction={() => {
            this.props.navigation.navigate("Report", {
              type: 'User',
              vibeOrMomentId: userDetails._id
            })
          }}
          rightNavIconStyle={styles.rightNavStyle}
        />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* CAROUSEL VIEW START */}
          <View
            style={{
              zIndex: 222,
              width,
              height: 300,
              justifyContent: 'flex-end',
            }}
          >
            <UserPhotoCarousel
              containerStyle={styles.carouselContainer}
              pagination
              activeSlide={this.state.activeSlide}
              onSnapToItem={index => {
                this.setState({
                  activeSlide: index,
                });
              }}
              data={!!userDetails && userDetails.photos}
            />

            <View style={[styles.userInfoPerks]}>

              <View style={[styles.userInfoPerksSingle]}>
                <View style={styles.aboutUserContainer}>
                  <Text style={styles.aboutUserText}> Photo Verified </Text>
                </View>

                <View
                  style={{
                    ...styles.aboutUserContainer,
                    borderColor: config.goldYellow,
                    marginTop: 8,
                  }}
                >
                  <Text
                    style={{ ...styles.aboutUserText, color: config.goldYellow }}
                  >
                    {' '}
                    Salary $100k+
                  </Text>
                </View>

                <Text style={styles.aboutUserAge}>
                  {!!userDetails && userDetails.username}, {getAge(userDetails && userDetails.dob)}
                </Text>
              </View>
            </View>

            <View style={styles.messageOverlayContainer}>
              <Text style={styles.messageOverlayText}>
                {'Jullia sent you a gold coffee coupon.'}
              </Text>
            </View>

          </View>
          {/* CAROUSEL VIEW END */}

          <View
            style={{
              zIndex: 400,
              position: 'absolute',
              right: '5%',
              top: '35%',
            }}
          >
            <TouchableOpacity>
              <Image
                style={{ width: 52, height: 52 }}
                source={btnCoffee}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          {/* </FullScreenHOC> */}
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
              <View style={styles.saysContainer}>
                <Text style={styles.userSaysText}>
                  0000님의 메세지 :
                </Text>
                <Text style={styles.userSaysContent}>
                  안녕하세요 블라블라 서초구에에서 000법무사를
                  다니는 000입니다. 퇴근후에는 운동을 즐기는 평범한
                  직장인입니다. 000님과 이야기를 나눠보고싶어요!
                </Text>
              </View>
            </View>

            {/* Bio */}
            <View style={{ width, marginTop: 10 }}>
              {/* One Row */}
              <View style={styles.singleBioRow}>
                <View style={styles.bioLeftContainer}>
                  <Text style={styles.bioText}> {userDetails && userDetails.location} </Text>
                </View>
                <View style={styles.bioRightContainer}>
                  <View style={styles.bioTextNImageContainer}>
                    <Text style={styles.bioText}> {userDetails && userDetails.college} </Text>
                    <Image style={styles.assuredTick} source={icSureQualify} />
                  </View>
                </View>
              </View>
              {/* One Row End */}
              {/* Second Row */}
              <View style={styles.singleBioRow}>
                <View style={styles.bioLeftContainer}>
                  {/*<Text style={styles.bioText}> 슬림, {userDetails && userDetails.height || 0} cm </Text>*/}
                </View>
                <View style={styles.bioRightContainer}>
                  <View style={styles.bioTextNImageContainer}>
                    <Text style={styles.bioText}> {userDetails && userDetails.occupation || 'Not Set'} </Text>
                    <Image style={styles.assuredTick} source={icSureQualify} />
                  </View>
                </View>
              </View>
              {/* Second Row End */}
              {/* Third Row */}
              <View style={styles.singleBioRow}>
                <View style={styles.bioLeftContainer}>
                  {/*<Text style={styles.bioText}> {userDetails && userDetails.race || 'Not Set'} </Text>*/}
                </View>
                <View style={styles.bioRightContainer}>
                  <View style={styles.bioTextNImageContainer}>
                    <Text style={styles.bioText}> {userDetails && userDetails.doSmoke ? userDetails && userDetails.doSmoke : 'No Set'} </Text>
                  </View>
                </View>
              </View>
              {/* Third Row End */}
              {/* Fourth Row */}
              <View style={styles.singleBioRow}>
                <View style={styles.bioLeftContainer}>
                  <Text style={styles.bioTextGrey}> 운동 </Text>
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
                <View style={styles.interestLIstRightContainer}>
                  {userDetails && userDetails.interestedHashtags.length == 0 &&
                    <View style={styles.interestContainer}>
                      <Text style={styles.interestText}>
                        No interest
                      </Text>
                    </View>}
                  {userDetails && userDetails.interestedHashtags.map((item, index) => (
                    <View key={index} style={styles.interestContainer}>
                      <Text style={styles.interestText}>
                        {' '}{item}{' '}
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
                    paddingVertical: 10,
                  }}
                >
                  <View style={styles.introductionContainer}>
                    <Text style={styles.bioText}>
                      안녕하세요,
                      자기소개글입니다.
                      가나다라마바사. 서울대학교를 졸업
                      공무원으로 일하고 있어요 :)
                    </Text>
                  </View>
                </View>
              </View>
              {/* 6th Row End */}
            </View>
            {/*  */}
          </View>
        </ScrollView>
        <View style={styles.buttomButton}>
          <TouchableOpacity style={styles.btnBlack}>
            <Text style={styles.btnText}> Accept </Text>
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  introductionContainer: { flexDirection: 'row', width: '80%' },
  interestText: {
    fontSize: 14,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    color: config.black,
  },
  interestContainer: {
    height: 30,
    margin: 6,
    backgroundColor: config.lightGreyBg,
    justifyContent: 'center',
  },
  interestLIstRightContainer: {
    flex: 0.9,
    flexWrap: 'wrap',
    width: '80%',
    flexDirection: 'row',
  },
  bioTextNImageContainer: { marginLeft: 30, flexDirection: 'row' },
  userSaysContent: {
    fontSize: 14,
    fontFamily: config.regularFont,
    lineHeight: 20,
    color: config.lightGrey,
  },
  userSaysText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: config.regularFont,
    fontWeight: '600',
    color: config.black,
  },
  saysContainer: {
    justifyContent: 'space-around',
    marginVertical: 14,
    marginLeft: 14,
    marginRight: 30,
  },
  aboutUserAge: {
    paddingTop: 5,
    fontFamily: config.regularFont,
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: config.white,
  },
  userInfoPerksSingle: {
    // borderWidth: 1,
    zIndex: 101,
    // width,
    paddingHorizontal: 20,
    alignSelf: 'flex-start',
  },
  userInfoPerks: {
    position: 'absolute',
    bottom: '10%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    // justifyContent: 'flex-end',
    alignSelf: 'flex-start',
  },
  carouselContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  messageOverlayText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: 'center',
    color: config.white,
  },
  messageOverlayContainer: {
    width: '100%',
    justifyContent: 'center',
    // paddingHorizontal: "20%",
    backgroundColor: config.clearBlue,
    opacity: 0.9,
  },
  hocContainer: { opacity: 0.6, backgroundColor: '#000' },
  hoctextStyle: {
    color: config.white,
    fontSize: 14,
    fontWeight: '600',
    fontStyle: 'normal',
    fontFamily: config.regularFont,
    letterSpacing: 0,
    textAlign: 'center',
  },
  scrollContainer: {
    backgroundColor: config.white,
    paddingBottom: '20%',
  },
  rightNavStyle: {
    marginLeft: 10,
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  aboutUserText: {
    height: 18,
    fontFamily: config.regularFont,
    fontSize: 11,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
    color: config.aqua_marine,
  },
  aboutUserContainer: {
    padding: 2,
    paddingHorizontal: 5,
    // aspectRatio: 2.2,
    borderRadius: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
    borderStyle: 'solid',
    borderWidth: 1,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: config.aqua_marine,
  },
  bioRightContainer: {
    flex: 0.7,
    justifyContent: 'center',
    // height: 40
  },
  bioLeftContainer: {
    flex: 0.3,
    justifyContent: 'center',
    paddingLeft: 20,
    height: 40,
  },
  singleBioRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  assuredTick: {
    marginHorizontal: 4,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  bioText: {
    fontSize: 16,
    fontWeight: '500',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    color: config.black,
  },
  bioTextGrey: {
    fontSize: 16,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: 0,
    color: config.hintText,
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
    color: config.brownishGrey,
  },
  userRatingView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
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
    bottom: 0,
  },
  imgRating: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    marginRight: '5%',
  },
  numberText: {
    fontFamily: config.boldFont,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0,
    borderColor: config.black,
  },
  numberContainer: {
    marginTop: 18,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.lightGreyBg,
  },
  subHead: {
    backgroundColor: config.paleGrey,
    paddingHorizontal: 15,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subHeadImage: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
  mainConatiner: {
    backgroundColor: config.white,
  },
  //flex direction row sub head
  oneRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    flex: 1,
    justifyContent: 'center',
  },
  subHeadText: {
    color: config.charcoal_grey,
    fontSize: 15,
  },
  subHeadTextInactive: {
    fontSize: 15,
    color: config.hintText,
  },
  pass: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fffbdf',
    borderRadius: 8,
    marginBottom: 10,
  },
  passAmount: {
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderColor: config.goldYellow,
    borderLeftWidth: 0.5,
    padding: 0,
    margin: 0,
  },
  passDetail: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  passTitle: {
    fontSize: 17,
    color: config.black,
  },
  calIcon: {
    height: 25,
    width: 25,
    marginRight: 13,
    marginTop: 10,
  },
  passDesc: {
    fontSize: 13,
  },
  amount: {
    color: config.goldYellow,
    fontSize: 17,
    fontWeight: 'bold',
  },
  passText: {
    paddingVertical: 10,
  },
  oneRow: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20,
  },
  btnText: {
    color: config.white,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btnBlack: {
    backgroundColor: config.navyBlack,
    width: '90%',
    borderRadius: 3,
    height: 48,
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    userDetails: state.auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(WithLoaderStatus(ProfileGoldCoffee));
export default ProfileGoldCoffee;
