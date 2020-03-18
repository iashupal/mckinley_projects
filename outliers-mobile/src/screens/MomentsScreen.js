import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  BackHandler,
  AsyncStorage,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import AlarmIcon from '@assets/images/btn_alarm.png';
import AddVibeIcon from '@assets/images/btn_add_moment.png';
import profilePhoto from '@assets/images/tagImage1.png';
import MomentsMyScreen from '@screens/MomentsMyScreen';
import Modal from '@components/CustomModal';

import SegmentButtons from '@components/SegmentButtons';
import MomentImage from '@components/MomentImage';
import TopBarHeader from '@components/TopBarHeader';
import ActionButton from '@components/ActionButton';
import HorizontalFlatList from '@components/HorizontalFlatList';

import icRate1 from '@assets/images/icRate1.png';
import icRate5 from '@assets/images/icRate5.png';

import icRate5Filled from '@assets/images/icRate5_filled.png';
import icRate1Filled from '@assets/images/icRate1_filled.png';

import config from '@src/config';

import { connect } from 'react-redux';
import { initiateListMoments, initiateListMyMoments } from '../store/actions';
import WithLoaderStatus from '../components/HOC/withLoaderStatus';
import momentFunc from "../services/MomentsApiService";

import Geolocation from 'react-native-geolocation-service';
import { hasLocationPermission } from '../utils/geolocation';
import { withNamespaces } from 'react-i18next';
class MomentScreen extends Component {
  willFocusSubscription;
  constructor(props) {
    super(props);
    this.state = {
      isMySelected: false,
      modalFollowUp1: false,
      modalFollowUp2: false,
      currentRate: 3,
      listMoments: {
        oneMile: [],
        threeMile: [],
        fiveMile: []
      },
      listMyMoments: {},
      userPhotos: [],
      location: {},
      city: '',
      getParams1Mile: {
        latitude: '',
        longitude: '',
        offset: 0,
        sexFilter: '',
        isFollow: 0,
        loadMore: false
      },
      getParams3Mile: {
        latitude: '',
        longitude: '',
        offset: 0,
        sexFilter: '',
        isFollow: 0,
        loadMore: false
      },
      getParams5Mile: {
        latitude: '',
        longitude: '',
        offset: 0,
        sexFilter: '',
        isFollow: 0,
        loadMore: false
      }
    };
  }

  get1MileMoments = async () => {
    const { getParams1Mile } = this.state;
    getParams1Mile.loadMore = true;
    this.setState({ getParams1Mile });
    let token = await AsyncStorage.getItem("@token:key");
    let res = await momentFunc.list1MileMoments(token, getParams1Mile);
    const { listMoments } = this.state;
    if (getParams1Mile.offset === 0) {
      listMoments.oneMile = [...res.data.Body];
    } else {
      listMoments.oneMile = [...listMoments.oneMile, ...res.data.Body];
    }
    this.setState({ listMoments });
    getParams1Mile.loadMore = false;
    this.setState({ getParams1Mile });
  }

  get3MileMoments = async () => {
    const { getParams3Mile } = this.state;
    getParams3Mile.loadMore = true;
    this.setState({ getParams3Mile });
    let token = await AsyncStorage.getItem("@token:key");
    let res = await momentFunc.list3MileMoments(token, getParams3Mile);

    const { listMoments } = this.state;
    if (getParams3Mile.offset === 0) {
      listMoments.threeMile = [...res.data.Body];
    } else {
      listMoments.threeMile = [...listMoments.threeMile, ...res.data.Body];
    }
    this.setState({ listMoments });
    getParams3Mile.loadMore = false;
    this.setState({ getParams3Mile });
  }

  get5MileMoments = async () => {
    const { getParams5Mile } = this.state;
    getParams5Mile.loadMore = true;
    this.setState({ getParams5Mile });
    let token = await AsyncStorage.getItem("@token:key");
    let res = await momentFunc.list5MileMoments(token, getParams5Mile);

    const { listMoments } = this.state;
    if (getParams5Mile.offset === 0) {
      listMoments.fiveMile = [...res.data.Body];
    } else {
      listMoments.fiveMile = [...listMoments.fiveMile, ...res.data.Body];
    }
    this.setState({ listMoments });
    getParams5Mile.loadMore = false;
    this.setState({ getParams5Mile });
  }

  fetchData = async () => {
    const hasLocationPermissionFlag = await hasLocationPermission();

    if (hasLocationPermissionFlag) {
      Geolocation.getCurrentPosition(
        position => {
          const { getParams1Mile, getParams3Mile, getParams5Mile } = this.state;
          getParams1Mile.latitude = position.coords.latitude;
          getParams1Mile.longitude = position.coords.longitude;
          getParams3Mile.latitude = position.coords.latitude;
          getParams3Mile.longitude = position.coords.longitude;
          getParams5Mile.latitude = position.coords.latitude;
          getParams5Mile.longitude = position.coords.longitude;
          this.setState({ getParams1Mile }, () => this.get1MileMoments());
          this.setState({ getParams3Mile }, () => this.get3MileMoments());
          this.setState({ getParams5Mile }, () => this.get5MileMoments());
          // this.props.initiateListMoments({
          //   latitude: position.coords.latitude,
          //   longitude: position.coords.longitude,
          //   offset: 0,
          //   sexFilter: '',
          //   isFollow: 0
          // });
          this.props.initiateListMyMoments({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            offset: 0
          });
          // offset , sex
          this.setState({ location: position.coords });
          fetch(
            'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            position.coords.latitude +
            ',' +
            position.coords.longitude +
            '&key=' +
            'AIzaSyA6F51dbSh00Ok4zKu0rP6b3YaYwRSs4H0'
          )
            .then(response => response.json())
            .then(responseJson => {
              let address = responseJson.results[3].formatted_address;
              address = address.split(',');

              this.setState({ city: address[0] + ', ' + address[1] });
              /* responseJson.results[0].address_components.forEach(
                addresscomponent => {
                  addresscomponent.types.forEach(type => {
                    if (type == "locality") {
                      this.setState({ city: addresscomponent.long_name });
                    }
                  });
                }
              );*/
            });
        },
        error => {
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
          distanceFilter: 50,
          forceRequestLocation: true
        }
      );
    } else {
      console.log('Permission Denied or revoked');
    }
  };

  applySexFilter = sex => {
    const { getParams1Mile, getParams3Mile, getParams5Mile } = this.state;
    getParams1Mile.offset = 0;
    getParams3Mile.offset = 0;
    getParams5Mile.offset = 0;
    if (sex == 'Following') {
      // this.props.initiateListMoments({
      //   latitude: this.state.location.latitude,
      //   longitude: this.state.location.longitude,
      //   offset: 0,
      //   sexFilter: '',
      //   isFollow: 1
      // });
      getParams1Mile.isFollow = 1;
      getParams1Mile.sexFilter = '';
      getParams3Mile.isFollow = 1;
      getParams3Mile.sexFilter = '';
      getParams5Mile.isFollow = 1;
      getParams5Mile.sexFilter = '';
    } else {
      // this.props.initiateListMoments({
      //   latitude: this.state.location.latitude,
      //   longitude: this.state.location.longitude,
      //   offset: 0,
      //   sexFilter: sex,
      //   isFollow: 0
      // });
      getParams1Mile.isFollow = 0;
      getParams1Mile.sexFilter = sex;
      getParams3Mile.isFollow = 0;
      getParams3Mile.sexFilter = sex;
      getParams5Mile.isFollow = 0;
      getParams5Mile.sexFilter = sex;
    }
    this.setState({ getParams1Mile, getParams3Mile, getParams5Mile }, () => {
      this.get1MileMoments();
      this.get3MileMoments();
      this.get5MileMoments();
    })
  };

  loadMore1Mile = (getParams1Mile) => {
    this.get1MileMoments();
  }

  loadMore3Mile = (getParams3Mile) => {
    this.get3MileMoments();
  }

  loadMore5Mile = (getParams5Mile) => {
    this.get5MileMoments();
  }

  async componentDidMount() {
    // this.didFocusSubscription = this.props.navigation.addListener(
    //   'didFocus',
    //   () => {
    //     this.fetchData();
    //   }
    // );
    this.fetchData();
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  componentWillUnmount() {
    this.didFocusSubscription.remove();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.listMoments != nextProps.listMoments) {
      this.setState({ listMoments: nextProps.listMoments });
    }
    if (this.props.listMyMoments != nextProps.listMyMoments) {
      this.setState({ listMyMoments: nextProps.listMyMoments });
    }
    if (this.props.userPhotos != nextProps.userPhotos) {
      this.setState({ userPhotos: nextProps.userPhotos });
    }
  }

  render() {
    const userProfilePic =
      this.props.userPhotos.length > 0
        ? this.props.userPhotos[0].url
        : config.dafaultUser;

    const { t } = this.props;

    const {
      modalFollowUp1,
      modalFollowUp2,
      isMySelected,
      currentRate,
      location
    } = this.state;

    return (
      <View style={styles.container}>
        {modalFollowUp1 && (
          <View>
            <Modal
              transparent
              shouldHideActionButton={true}
              onClose={() => {
                this.setState({ modalFollowUp1: false, modalFollowUp2: true });
              }}
            >
              <View
                style={{
                  width: 86,
                  marginVertical: 17,
                  alignSelf: 'center',
                  height: 86,
                  borderRadius: 43,
                  overflow: 'hidden'
                }}
              >
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    alignSelf: 'center',
                    resizeMode: 'contain'
                  }}
                  source={profilePhoto}
                />
              </View>

              <Text style={styles.modalHeaderText}>
                {t('momentMainScreen:timeWithUser', { value: 'JAYKIM4' })}
              </Text>
              <Text style={[styles.modalText, { color: '#666666' }]}>
                {t('momentMainScreen:timeWithUser')}
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
                  onPress={() => {
                    this.setState({
                      modalFollowUp1: false,
                      modalFollowUp2: true
                    });
                  }}
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
                      modalFollowUp2: true
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
                      modalFollowUp2: true
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
        )}
        {modalFollowUp2 && (
          <View>
            <Modal
              transparent={true}
              shouldHideActionButton={true}
              onClose={() => {
                this.setState({ modalFollowUp2: false });
              }}
            >
              <View
                style={{
                  width: '100%',
                  justifyContent: 'space-around'
                }}
              >
                <Text style={styles.modalHeaderText}>
                  {t('momentMainScreen:timeWithUser')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: 12,
                    marginBottom: 6
                  }}
                >
                  <TouchableOpacity
                    onPress={() => this.setState({ currentRate: 1 })}
                  >
                    {currentRate == 1 ? (
                      <Image
                        source={icRate1Filled}
                        style={styles.imageRateSize}
                      />
                    ) : (
                        <Image source={icRate1} style={styles.imageRateSize} />
                      )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.setState({ currentRate: 2 })}
                  >
                    {currentRate == 2 ? (
                      <View style={styles.rateSize1}>
                        <View style={styles.filledRateSize1} />
                      </View>
                    ) : (
                        <View style={styles.rateSize1} />
                      )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.setState({ currentRate: 3 })}
                  >
                    <View style={styles.rateSize2}>
                      {currentRate == 3 ? (
                        <View style={styles.filledRateSize2} />
                      ) : (
                          <View />
                        )}
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.setState({ currentRate: 4 })}
                  >
                    {currentRate == 4 ? (
                      <View style={styles.rateSize1}>
                        <View style={styles.filledRateSize1} />
                      </View>
                    ) : (
                        <View style={styles.rateSize1} />
                      )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.setState({ currentRate: 5 })}
                  >
                    {currentRate == 5 ? (
                      <Image
                        source={icRate5Filled}
                        style={styles.imageRateSize}
                      />
                    ) : (
                        <Image source={icRate5} style={styles.imageRateSize} />
                      )}
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 6,
                    marginBottom: 12,
                    justifyContent: 'space-around'
                  }}
                >
                  <Text style={styles.rateTittle}>
                    {t('momentMainScreen:notReally')}
                  </Text>
                  <Text style={styles.rateTittle}>{''}</Text>
                  <Text style={styles.rateTittle}>
                    {t('momentMainScreen:usually')}
                  </Text>
                  <Text style={styles.rateTittle}>{''}</Text>
                  <Text style={styles.rateTittle}>
                    {t('momentMainScreen:good')}
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 10, flexDirection: 'row' }}>
                <TouchableOpacity
                  style={[
                    styles.buttonStyle,
                    { borderRadius: 3, marginHorizontal: 8, height: 42 }
                  ]}
                  onPress={() => {
                    this.setState({ modalFollowUp2: false });
                  }}
                >
                  <Text style={styles.buttonText}>
                    {t('momentMainScreen:getClover')}
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        )}
        <View style={styles.navBar}>
          <TopBarHeader
            onPressLeftAction={() =>
              this.props.navigation.navigate('My', {
                backRoute: 'MomentsMain'
              })
            }
            // sectionTitle="Moment"
            sectionHeader={
              <SegmentButtons
                onPressSegement={selected => {
                  this.setState({ isMySelected: selected });
                }}
              />
            }
            profileImage={userProfilePic}
            alarmIcon={AlarmIcon}
          />
          {!isMySelected && (
            <View style={styles.secondBar}>
              <Text
                style={{
                  fontFamily: config.regularFont,
                  fontSize: 14,
                  fontWeight: 'normal',
                  fontStyle: 'normal',
                  letterSpacing: 0,
                  color: config.brownishGrey
                }}
              >
                {/* 내위치 : 강남구 도곡동 */}
                {t('momentMainScreen:myLocation')}
                {this.state.city}
              </Text>
              {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate ('MomentsMy')}
          >
            <Text style={{fontSize: 13}}>나의 Moment</Text>
          </TouchableOpacity> */}
            </View>
          )}
          {!isMySelected && (
            <View style={{ paddingHorizontal: 15, marginBottom: 5 }}>
              <HorizontalFlatList applySexFilter={this.applySexFilter} />
            </View>
          )}
        </View>
        {!isMySelected && (
          <View>
            <Text style={styles.mileSeparator}>
              {t('momentMainScreen:1mile')}
            </Text>
            <View style={styles.contentContainer}>
              <FlatList
                contentContainerStyle={
                  this.state.listMoments.oneMile.length <= 3
                    ? styles.orange
                    : styles.green
                }
                // horizontal={true}
                data={this.state.listMoments.oneMile}
                extraData={this.state.listMoments.oneMile}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) => (
                  <MomentImage
                    uri={
                      !!item.user[0].photos[item.imageIndex] &&
                      item.user[0].photos[item.imageIndex].url
                    }
                    createdAt={item.createdAt}
                    onPress={() =>
                      this.props.navigation.navigate('MomentsDetail', {
                        id: item._id,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        ownerId: item.owner
                      })
                    }
                    ismargin={
                      this.state.listMoments.oneMile.length <= 3 ? true : false
                    }
                  />
                )}
                ListEmptyComponent={
                  <View
                    style={{
                      paddingLeft: 3
                    }}
                  >
                    <Text>{t('momentMainScreen:oneMileRadius')}</Text>
                  </View>
                }
                initialNumToRender={0}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                  if (
                    !this.onEndReachedCalledDuringMomentum
                  ) {
                    const { getParams1Mile } = this.state;
                    this.loadMore1Mile(getParams1Mile)
                    getParams1Mile.offset = getParams1Mile.offset + 16;
                    this.setState({ getParams1Mile });
                  }
                }}
                onMomentumScrollBegin={() => {
                  this.onEndReachedCalledDuringMomentum = false;
                }}
              />
              {this.state.getParams1Mile.loadMore && <View style={styles.loaderCustom}><ActivityIndicator size="large" /></View>}
            </View>

            <Text style={styles.mileSeparator}>
              {t('momentMainScreen:3mile')}
            </Text>
            <View style={styles.contentContainer}>
              <FlatList
                contentContainerStyle={
                  this.state.listMoments.threeMile.length <= 3
                    ? styles.orange
                    : styles.green
                }
                // horizontal={true}
                data={this.state.listMoments.threeMile}
                extraData={this.state.listMoments.threeMile}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) => (
                  <MomentImage
                    uri={
                      !!item.user[0].photos[item.imageIndex] &&
                      item.user[0].photos[item.imageIndex].url
                    }
                    createdAt={item.createdAt}
                    onPress={() =>
                      this.props.navigation.navigate('MomentsDetail', {
                        id: item._id,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        ownerId: item.owner
                      })
                    }
                    ismargin={
                      this.state.listMoments.threeMile.length <= 3
                        ? true
                        : false
                    }
                  />
                )}
                ListEmptyComponent={
                  <View
                    style={{
                      paddingLeft: 3
                    }}
                  >
                    <Text>
                      {t('momentMainScreen:dataUnderRadius', { value: '3' })}
                    </Text>
                  </View>
                }
                initialNumToRender={0}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                  if (
                    !this.onEndReachedCalledDuringMomentum
                  ) {
                    const { getParams3Mile } = this.state;
                    this.loadMore3Mile(getParams3Mile);
                    getParams3Mile.offset = getParams3Mile.offset + 16;
                    this.setState({ getParams3Mile });
                  }
                }}
                onMomentumScrollBegin={() => {
                  this.onEndReachedCalledDuringMomentum = false;
                }}
              />
              {this.state.getParams3Mile.loadMore && <View style={styles.loaderCustom}><ActivityIndicator size="large" /></View>}
            </View>

            <Text style={styles.mileSeparator}>
              {t('momentMainScreen:5mile')}
            </Text>
            <View style={{ ...styles.contentContainer, height: 200 }}>
              <FlatList
                contentContainerStyle={
                  this.state.listMoments.fiveMile.length <= 3
                    ? styles.orange
                    : styles.green
                }
                // horizontal={true}
                // ismargin={this.props.listMoments.length < 3 ? true : false}
                data={this.state.listMoments.fiveMile}
                extraData={this.state.listMoments.fiveMile}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item }) => (
                  <MomentImage
                    uri={
                      !!item.user[0].photos[item.imageIndex] &&
                      item.user[0].photos[item.imageIndex].url
                    }
                    createdAt={item.createdAt}
                    onPress={() =>
                      this.props.navigation.navigate('MomentsDetail', {
                        id: item._id,
                        latitude: location.latitude,
                        longitude: location.longitude,
                        ownerId: item.owner
                      })
                    }
                    ismargin={
                      this.state.listMoments.fiveMile.length <= 3 ? true : false
                    }
                  />
                )}
                ListEmptyComponent={
                  <View
                    style={{
                      paddingLeft: 3
                    }}
                  >
                    <Text>
                      {t('momentMainScreen:dataUnderRadius', { value: '5+' })}
                    </Text>
                  </View>
                }
                initialNumToRender={0}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                  if (
                    !this.onEndReachedCalledDuringMomentum
                  ) {
                    const { getParams5Mile } = this.state;
                    this.loadMore5Mile(getParams5Mile)
                    getParams5Mile.offset = getParams5Mile.offset + 16;
                    this.setState({ getParams5Mile });
                  }
                }}
                onMomentumScrollBegin={() => {
                  this.onEndReachedCalledDuringMomentum = false;
                }}
              />
              {this.state.getParams5Mile.loadMore && <View style={styles.loaderCustom}><ActivityIndicator size="large" /></View>}
            </View>
          </View>
        )}
        {/* <ActionButton
        onPress1={() => this.props.navigation.navigate ('MomentUpload')}
        text="모멘트 올리기"
      /> */}
        {!isMySelected && (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('MomentUpload')}
            style={styles.addVibeButton}
          >
            <Image source={AddVibeIcon} style={{ width: 58, height: 58 }} />
          </TouchableOpacity>
        )}
        {isMySelected && (
          <MomentsMyScreen
            navigation={this.props.navigation}
            myMoments={this.state.listMyMoments}
            location={location}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filledRateSize2: {
    width: 11,
    height: 11,
    borderRadius: 5,
    backgroundColor: config.paleGold
  },
  filledRateSize1: {
    width: 14,
    height: 14,
    borderRadius: 6,
    backgroundColor: config.paleGold
  },
  rateTittle: {
    fontFamily: config.regularFont,
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    marginRight: 10,
    color: config.brownishGrey
  },
  imageRateSize: { width: 32, height: 32, resizeMode: 'contain' },
  rateSize2: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 19,
    height: 19,
    borderRadius: 9,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: config.hintText
  },
  rateSize1: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: config.hintText
  },
  modalHeaderText: {
    fontFamily: config.regularFont,
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: config.black
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
  addVibeButton: {
    width: 58,
    height: 58,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  container: {
    flex: 1
  },
  momentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  },
  navBar: {
    // height: 96,
    backgroundColor: 'white'
    // elevation: 3,
  },
  secondBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 42,
    paddingHorizontal: 15
  },
  mileSeparator: {
    fontSize: 18,
    marginVertical: 6
  },
  contentContainer: {
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    flexGrow: 1,
    height: 100,
  },
  orange: {
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width,
    flexWrap: 'wrap',
    flexDirection: 'row',
    flexGrow: 1,
    // height: 100,
    overflow: 'scroll',
  },
  green: {
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width,
    flexWrap: 'wrap',
    flexDirection: 'row',
    flexGrow: 1,
    // height: 100,
    overflow: 'scroll',
  },
  loaderCustom: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: Dimensions.get('window').width,
    backgroundColor: '#000000',
    opacity: 0.6,
    height: "100%"
  }
});

const mapStateToProps = state => {
  return {
    // loading: state.auth.loading,
    listMoments: state.moments.listMoments,
    listMyMoments: state.moments.listMyMoments,
    userPhotos: state.auth.user.photos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initiateListMoments: location => dispatch(initiateListMoments(location)),
    initiateListMyMoments: location => dispatch(initiateListMyMoments(location))
  };
};

const MomentScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(MomentScreen));

export default withNamespaces(['common', 'momentMainScreen'], {
  wait: true
})(MomentScreenHOC);
