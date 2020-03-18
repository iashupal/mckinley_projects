import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Picker,
  TouchableOpacity,
  Dimensions,
  FlatList,
  AsyncStorage,
  BackHandler,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
var FloatingLabel = require('react-native-floating-labels');
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { WheelPicker } from 'react-native-wheel-picker-android';
import api from './../services/AuthApiService';
import CloseIcon from '@assets/images/ic_close.png';
import icCheckConfirm from '@assets/images/icCheckConfirm.png';
import deepDiffer from 'react-native/lib/deepDiffer';
import config from '@src/config.js';
import i18next from 'i18next';
//import * as ScreenshotDetector from "react-native-screenshot-detect";
import GenderIcon from '@assets/images/ic_gender.png';
import AgeIcon from '@assets/images/ic_age.png';
import NickIcon from '@assets/images/ic_nick.png';
import LocationIcon from '@assets/images/ic_location.png';
import BodyShapeIcon from '@assets/images/ic_bodyshape.png';
import HeightIcon from '@assets/images/ic_height.png';
import UnivercityIcon from '@assets/images/ic_univ.png';
import JobIcon from '@assets/images/ic_job.png';
import RaceIcon from '@assets/images/ic_race.png';
import SmokeIcon from '@assets/images/ic_smoke.png';
import DrinkIcon from '@assets/images/ic_drink.png';
import AvailableIcon from '@assets/images/ic_available.png';
//ßimport AvailableIcon from '@assets/images/ic_available.png';
import CurrentLocationIcon from '@assets/images/ic_current_location.png';

// Import components
import ActionButton from '@components/ActionButton';
import TopBarHeader from '@components/TopBarHeader';
import InputWithTitle from '@components/InputWithTitle';
import DotSlider from '@components/DotSlider';
import GenderSelection from '@components/GenderSelection';
import Modal from '@components/CustomModal';
import ModalOne from '@components/HashtagModal';
import DonationTagsList from '@components/DonationTagsList';
// import {
//   handleAndroidBackButton,
//   removeAndroidBackButtonHandler
// } from '../components/Backview/previousView';

const jobList = [
  '삼성 물산',
  '삼성 전자',
  '삼성 제일모직',
  '삼성 확학섬유',
  '삼성 건설',
  '삼성 화재보험'
];

const raceList = [
  'American Indian/Alaska Native',
  'Asian',
  'Arab',
  'Black/African-descent',
  'Caucasian',
  'Hispanic/Latino',
  'Native Hawaiian/Other Pacific Islander',
  'Other',
  'Prefer Not to Answer'
];

const arr = Array.from({ length: 200 }, (v, k) => `${k + 1}cm`);
const workOutList = props => {
  return props.i18n.language === 'en'
    ? [
        '0 times a week',
        '1-2 times a week',
        '3-4 times a week',
        '5 or more times a week'
      ]
    : ['주 0회 ', '주 1~2회', '주 3~4회', '주 5회 이상'];
};
const religionsList = props => {
  const { t } = props;
  return [
    t('common:editProfileScreen.religionModal.religionsList.atheist'),
    t('common:editProfileScreen.religionModal.religionsList.catholic'),
    t('common:editProfileScreen.religionModal.religionsList.christian'),
    t('common:editProfileScreen.religionModal.religionsList.buddhism'),
    t('common:editProfileScreen.religionModal.religionsList.hinduism'),
    t('common:editProfileScreen.religionModal.religionsList.islam'),
    t('common:editProfileScreen.religionModal.religionsList.judaism')
  ];
};

const genderList = props => {
  const { t } = props;
  return [
    t('common:editProfileScreen.genderModal.genderList.male'),
    t('common:editProfileScreen.genderModal.genderList.female'),
    t('common:editProfileScreen.genderModal.genderList.others')
  ];
};
class BasicDetailsScreen extends Component {
  t;
  bodyTypeTags;
  smokeList = [];
  drinkList = [];
  availbilityList = [];
  constructor(props) {
    super(props);
    this.t = props.t;
    /* this.eventEmitter = ScreenshotDetector.subscribe(captureScreen, () => {
      alert("screenshot");
    });*/
    this.bodyTypeTags = {
      0: [
        this.t(
          'common:register.basicDetailsScreen.bodyTypeModal.bodyTypeList.skinny'
        ),
        false
      ],
      1: [
        this.t(
          'common:register.basicDetailsScreen.bodyTypeModal.bodyTypeList.slim'
        ),
        false
      ],
      2: [
        this.t(
          'common:register.basicDetailsScreen.bodyTypeModal.bodyTypeList.fit'
        ),
        false
      ],
      3: [
        this.t(
          'common:register.basicDetailsScreen.bodyTypeModal.bodyTypeList.slimThick'
        ),
        false
      ],
      4: [
        this.t(
          'common:register.basicDetailsScreen.bodyTypeModal.bodyTypeList.thick'
        ),
        false
      ],
      5: [
        this.t(
          'common:register.basicDetailsScreen.bodyTypeModal.bodyTypeList.bulk'
        ),
        false
      ]
    };
    this.smokeList = [
      this.t(
        'common:register.basicDetailsScreen.smokingModal.smokeList.smoking'
      ),
      this.t(
        'common:register.basicDetailsScreen.smokingModal.smokeList.nonSmoking'
      )
      // this.t('common:register.basicDetailsScreen.smokingModal.smokeList.electronicSmoke'),
      // this.t('common:register.basicDetailsScreen.smokingModal.smokeList.dontLikeHangUp')
    ];
    this.drinkList = [
      this.t(
        'common:register.basicDetailsScreen.drinkingModal.drinkList.rareDrinker'
      ),
      this.t(
        'common:register.basicDetailsScreen.drinkingModal.drinkList.oneToTwoInWeek'
      ),
      this.t(
        'common:register.basicDetailsScreen.drinkingModal.drinkList.threeToFourInWeek'
      ),
      this.t(
        'common:register.basicDetailsScreen.drinkingModal.drinkList.fiveOrMoreInWeek'
      )
    ];
    this.availbilityList = [
      this.t(
        'common:register.basicDetailsScreen.availbilityModal.availbilityList.nonavailabe'
      ),
      this.t(
        'common:register.basicDetailsScreen.availbilityModal.availbilityList.availabe'
      )
    ];

    this.state = {
      modalVisible: false,
      ageModalVisible: false,
      ageValue: this.props.user.dob ? this.props.user.dob : '',
      pickerDate: new Date('1992-07-04'),
      // pickerDate: "1990-07-04",
      nickName: '',
      religion: '',
      nickNameModalVisible: false,
      locationModalVisible: false,
      bodyTypeModalVisible: false,
      bodyType: this.props.user.physique ? this.props.user.physique : '',
      workOut: this.props.user.doWorkOut ? this.props.user.doWorkOut : '',
      workOutModalVisible: false,
      heightModalVisible: false,
      height: this.props.user.height ? parseInt(this.props.user.height) : 159,
      // religion: !!this.props.userDetails ? this.props.userDetails.religion : "입력해주세요",
      // religion: !!this.props.userDetails
      //   ? props.i18n.language === "en"
      //     ? this.props.userDetails.religion
      //     : this.props.userDetails.religion === "Does not matter"
      //       ? "상관없음"
      //       : this.props.userDetails.religion === "Christian"
      //         ? "기독교"
      //         : this.props.userDetails.religion === "Protestantism"
      //           ? "개신교"
      //           : this.props.userDetails.religion === "Buddhism"
      //             ? "불교"
      //             : this.props.userDetails.religion === "Catholic"
      //               ? "천주교"
      //               : ""
      //   : "선택하기",
      religionModalVisible: false,
      religionInputModalVisible: false,
      genderModalVisible: false,
      jobNameModalVisible: false,
      jobName: '',
      search: '',
      raceModelVisible: false,
      race: '',
      smoke: '',
      drink: '',
      availability: '',
      gender: this.props.user.sex ? this.props.user.sex : '',
      smokeModalVisible: false,
      drinkModalVisible: false,
      availableModalVisible: false,
      occupationAlert: false,
      locationName: '',
      universityName: !!this.props.user.universityName
        ? this.props.user.universityName
        : this.props.user.college
        ? this.props.user.college
        : '',
      occupationName: !!this.props.user.companyName
        ? this.props.user.companyName
        : this.props.user.occupation
        ? this.props.user.occupation
        : '',
      isUnique: false,
      isSpacialChar: false,
      error: true,
      disableNext: false
    };
  }

  async componentDidMount() {
    setInterval(() => {
      const {
        gender,
        ageValue,
        height,
        locationName,
        race,
        smoke,
        workOut,
        drink,
        available,
        religion
      } = this.state;
      if (
        !gender ||
        !ageValue ||
        !locationName ||
        !workOut ||
        !height ||
        !race ||
        !smoke ||
        !drink ||
        !available ||
        !religion ||
        !this.props.user.universityName ||
        !this.props.user.companyName
      ) {
        this.setState({ disableNext: true });
      } else {
        this.setState({ disableNext: false });
      }
    }, 1000);
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });

    const token = await AsyncStorage.getItem('@token:key');
    const response = await api.getUserDetails(token);

    if (response.status == 200) {
      const body = response.data.Body;

      this.setState({
        gender: body.sex,
        ageValue: body.dob,
        nickname: body.nickname,
        locationName: body.location,
        latitude: body.latitude,
        longitude: body.longitude,
        bodyType: body.physique,
        universityName: body.college,
        occupationName: body.company,
        occupation: body.occupation,
        height: body.height,
        race: body.race,
        smoke: doSmoke.doSmoke,
        drink: body.doDrink,
        workOut: body.doWorkOut,
        available: body.doAvailable
      });
    }
  }

  putUserDetails = async data => {
    const token = await AsyncStorage.getItem('@token:key');
    const response = await api.putUserDetails(token, data);
  };

  setOccuption = text => {
    this.setState({
      title: text
    });
  };

  setUniversity = text => {
    this.setState({
      universityName: text
    });
  };

  renderAgePickerModel() {
    return (
      <Modal
        hasTwo
        transparent={true}
        visible={this.state.ageModalVisible}
        // buttonText1={this.t('common:register.basicDetailsScreen.selected')}

        buttonText1={this.t('profileSenfCoffeeLang:sendlikeModal.cancel')}
        buttonText2={this.t('common:register.basicDetailsScreen.selected')}
        onPress1={() => {
          this.setState({
            ageValue: ''
          });
          this.setState({ ageModalVisible: false });
        }}
        onPress2={() => {
          this.setState({
            ageValue: this.state.ageValue ? this.state.ageValue : '1992-07-04'
          });
          this.setState({ ageModalVisible: false });
        }}

        // onClose={() => {
        //   this.setState({ ageModalVisible: false });
        // }}
      >
        <View>
          <Text style={styles.alertTitle}>
            {this.t('common:register.basicDetailsScreen.ageModal.dob')}
            {/* {'\n'}
            <Text style={styles.regularFont}>
              {this.t('common:register.basicDetailsScreen.ageModal.dob')}
            </Text> */}
          </Text>
        </View>
        <View>
          <View style={styles.datePickerContainer}>
            <DatePicker
              initialDate={this.state.pickerDate}
              maximumDate={new Date()}
              date={this.state.pickerDate}
              onDateChange={date => {
                this.setState({
                  ageValue: date,
                  pickerDate: date
                });
              }}
              mode='date'
              locale={i18next.language}
              style={styles.datePicker}
            />
          </View>
        </View>
      </Modal>
    );
  }

  handleSearch = async text => {
    this.setState({ nickName: text });

    let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    let specialChar = format.test(text);
    if (specialChar) {
      this.setState({ isSpacialChar: true, error: true });
    } else {
      if (this.state.nickName.length >= 2) {
        const token = await AsyncStorage.getItem('@token:key');
        const response = await api.getUsernameAvailabilty(token, text);
        if (response.data.Body === 'USERNAME_AVAILABLE') {
          this.setState({ isUnique: true, isSpacialChar: false, error: false });
        } else {
          this.setState({ isUnique: false, isSpacialChar: false, error: true });
        }
      } else {
        this.setState({ isUnique: false, isSpacialChar: false, error: true });
      }
    }
  };

  renderNickNameModal() {
    return (
      <Modal
        transparent={true}
        hasTwo
        visible={this.state.nickNameModalVisible}
        buttonText1={this.props.t('profileSenfCoffeeLang:sendlikeModal.cancel')}
        buttonText2={this.t(
          'common:register.basicDetailsScreen.nicknameModal.nicknameBtn'
        )}
        onPress1={() => {
          this.setState({ nickName: '' });
          this.setState({ nickNameModalVisible: false });
        }}
        onPress2={() => {
          if (this.state.nickName.length < 3 && this.state.isUnique) {
            Alert.alert(
              this.t('common:app.error'),
              this.t(
                'common:register.basicDetailsScreen.nicknameModal.minNickName'
              ),
              [
                {
                  text: this.t('common:app.confirm'),
                  onPress: () => {}
                }
              ],
              { cancelable: false }
            );
            //this.setState({ nickNameModalVisible: false });
          } else if (!this.state.isUnique) {
            Alert.alert(
              this.t('common:app.error'),
              this.t(
                'common:register.basicDetailsScreen.nicknameModal.nicknameNotAvailable'
              ),
              [
                {
                  text: this.t('common:app.confirm'),
                  onPress: () => {}
                }
              ],
              { cancelable: false }
            );
          } else if (this.state.isSpacialChar && this.state.isUnique) {
            Alert.alert(
              this.t('common:app.error'),
              this.t(
                'common:register.basicDetailsScreen.nicknameModal.specialChars'
              ),
              [
                {
                  text: this.t('common:app.confirm'),
                  onPress: () => {}
                }
              ],
              { cancelable: false }
            );
          } else {
            this.setState({ nickNameModalVisible: false });
          }
        }}
      >
        <Text style={styles.alertTitle}>
          {this.t('common:register.basicDetailsScreen.enterNickname')}
        </Text>
        <View
          style={{
            marginTop: 12,
            flexDirection: 'row'
          }}
        >
          <InputWithTitle
            placeholder={this.t('common:register.basicDetailsScreen.nickname')}
            onChangeText={text => this.handleSearch(text)}
            inputStyle={{ marginRight: 40 }}
            containerStyle={{
              width: Dimensions.get('window').width * 0.7,
              marginTop: 12,
              borderWidth: 1,
              position: 'relative'
            }}
            value={this.state.nickName}
            icon2={icCheckConfirm}
          />
          {this.state.nickName.length > 2 &&
            this.state.isUnique &&
            !this.state.isSpacialChar && (
              <Image
                style={{
                  position: 'absolute',
                  width: 16,
                  height: 16,
                  right: 20,
                  alignSelf: 'center',
                  top: 30,
                  resizeMode: 'contain'
                }}
                source={icCheckConfirm}
              />
            )}
        </View>
        <Text
          style={
            this.state.error
              ? styles.nickNameAlertMsg
              : this.state.nickName.length < 3
              ? styles.nickNameAlertMsg
              : styles.nickNameAvailabilityMsg
          }
        >
          {this.state.isSpacialChar
            ? this.t(
                'common:register.basicDetailsScreen.nicknameModal.specialChars'
              )
            : this.state.isUnique && this.state.nickName.length > 2
            ? this.t(
                'common:register.basicDetailsScreen.nicknameModal.nicknameAvailable'
              )
            : this.state.nickName.length < 3
            ? this.t(
                'common:register.basicDetailsScreen.nicknameModal.minNickName'
              )
            : this.state.nickName.length > 2 && !this.state.isUnique
            ? this.t('common:register.basicDetailsScreen.nicknameModal.unique')
            : this.t(
                'common:register.basicDetailsScreen.nicknameModal.enterNickName'
              )}
        </Text>
      </Modal>
    );
  }

  renderLocatinoModal() {
    return (
      <Modal
        transparent={true}
        shouldHideActionButton={false}
        visible={this.state.locationModalVisible}
        buttonText1={this.t('profileSenfCoffeeLang:sendlikeModal.cancel')}
        onClose={() => {
          this.setState({ locationModalVisible: false });
        }}
      >
        <Text style={styles.alertTitle}>
          {this.t('common:register.basicDetailsScreen.locationModal.header')}
        </Text>

        <TouchableOpacity
          style={[styles.locationSelectionBtn, { flexDirection: 'row' }]}
          onPress={() => {
            this.props.navigation.navigate('LocationAutocomplete', {
              direct: false
            });
          }}
        >
          <Image
            source={CurrentLocationIcon}
            style={{ width: 10, height: 10, marginRight: 5 }}
          />
          <Text style={styles.locationBtnTitle}>
            {this.t(
              'common:register.basicDetailsScreen.locationModal.selectCurrentLocation'
            )}
          </Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 10 }}>
          {this.t(
            'common:register.basicDetailsScreen.locationModal.yourLocation'
          )}
        </Text>
      </Modal>
    );
  }

  renderBodyShapeModal() {
    return (
      <Modal
        hasTwo
        transparent={true}
        visible={this.state.bodyTypeModalVisible}
        // buttonText1={this.t('common:register.basicDetailsScreen.selected')}

        buttonText1={this.t('profileSenfCoffeeLang:sendlikeModal.cancel')}
        buttonText2={this.t('common:register.basicDetailsScreen.selected')}
        onPress1={() => this.setState({ bodyTypeModalVisible: false })}
        onPress2={() => this.setState({ bodyTypeModalVisible: false })}
        // onClose={() => {
        //   this.setState({ bodyTypeModalVisible: false });
        // }}
      >
        <Text style={styles.alertTitle}>
          {this.t('common:register.basicDetailsScreen.bodyTypeModal.header')}
        </Text>
        <DonationTagsList
          tags={this.bodyTypeTags}
          multiSelection={false}
          containerStyle={{ justifyContent: 'flex-start' }}
          onchangeSelectedTags={tags => this.setState({ bodyType: tags[0] })}
        />
      </Modal>
    );
  }

  renderHeightModel() {
    return (
      <Modal
        hasTwo
        transparent={true}
        visible={this.state.heightModalVisible}
        // buttonText1={this.t('common:register.basicDetailsScreen.selected')}
        // onClose={() => {
        //   this.setState({ heightModalVisible: false });
        // }}

        buttonText1={this.t('common:register.basicDetailsScreen.cancel')}
        buttonText2={this.t('rfrScrLang:cnfrm')}
        onPress1={() => {
          this.setState({ height: 159 });
          this.setState({ heightModalVisible: false });
        }}
        onPress2={() => this.setState({ heightModalVisible: false })}
      >
        <View>
          <Text style={styles.alertTitle}>
            {this.t('common:register.basicDetailsScreen.heightModal.header')}
          </Text>
        </View>

        {Platform.OS === 'ios' ? (
          <View style={styles.datePickerContainer}>
            <Picker
              selectedValue={arr[this.state.height]}
              style={styles.datePicker}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({ height: itemIndex });
              }}
            >
              {arr.map((val, index) => {
                return <Picker.Item label={val} value={val} />;
              })}
            </Picker>
          </View>
        ) : (
          <View
            style={[
              styles.datePickerContainer,
              { justifyContent: 'center', height: 200 }
            ]}
          >
            <WheelPicker
              itemTextSize={16}
              selectedItemTextSize={18}
              itemTextColor={config.selectBox}
              selectedItemTextColor={config.black}
              isCyclic={false}
              indicatorColor={config.selectBox}
              style={[styles.datePicker, { height: 150 }]}
              initPosition={this.state.height}
              data={arr}
              onItemSelected={selectedItem =>
                this.setState({ height: selectedItem })
              }
            />
          </View>
        )}
      </Modal>
    );
  }

  renderRaceModal() {
    return (
      <Modal
        transparent={true}
        visible={this.state.raceModelVisible}
        buttonText1={this.t('common:register.basicDetailsScreen.cancel')}
        onClose={() => {
          this.setState({ raceModelVisible: false });
        }}
      >
        <View>
          <Text style={styles.alertTitle}>
            {this.t('common:register.basicDetailsScreen.raceModal.header')}
          </Text>
          <FlatList
            style={[styles.listBorder]}
            data={raceList}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ raceModelVisible: false, race: item })
                  }
                >
                  <Text style={styles.itemBorder}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    );
  }

  renderSmokeModal() {
    return (
      <Modal
        transparent={true}
        visible={this.state.smokeModalVisible}
        buttonText1={this.t('common:register.basicDetailsScreen.cancel')}
        onClose={() => {
          this.setState({ smokeModalVisible: false });
        }}
      >
        <View>
          <Text style={styles.alertTitle}>
            {this.t('common:register.basicDetailsScreen.smokingModal.header')}
          </Text>
          <FlatList
            style={[styles.listBorder, { flexGrow: 0 }]}
            data={this.smokeList}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ smokeModalVisible: false, smoke: item })
                  }
                >
                  <Text style={styles.itemBorder}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    );
  }

  renderWorkOutModal() {
    return (
      <Modal
        transparent={true}
        visible={this.state.workOutModalVisible}
        buttonText1={this.t('common:register.basicDetailsScreen.cancel')}
        onClose={() => {
          this.setState({ workOutModalVisible: false });
        }}
      >
        <View>
          <Text style={styles.alertTitle}>
            {this.props.t('common:editProfileScreen.chooseWorkOut')}
          </Text>
          <FlatList
            style={[styles.listBorder, { flexGrow: 0 }]}
            data={workOutList(this.props)}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ workOutModalVisible: false, workOut: item })
                  }
                >
                  <Text style={styles.itemBorder}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    );
  }

  renderDrinkModal() {
    return (
      <Modal
        transparent={true}
        visible={this.state.drinkModalVisible}
        buttonText1={this.t('common:register.basicDetailsScreen.cancel')}
        onClose={() => {
          this.setState({ drinkModalVisible: false });
        }}
      >
        <View>
          <Text style={styles.alertTitle}>
            {this.t('common:register.basicDetailsScreen.drinkingModal.header')}
          </Text>
          <FlatList
            style={[styles.listBorder, { flexGrow: 0 }]}
            data={this.drinkList}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ drinkModalVisible: false, drink: item })
                  }
                >
                  <Text style={styles.itemBorder}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    );
  }
  renderAvailableModal() {
    return (
      <Modal
        transparent={true}
        visible={this.state.availableModalVisible}
        buttonText1={this.t('common:register.basicDetailsScreen.cancel')}
        onClose={() => {
          this.setState({ availableModalVisible: false });
        }}
      >
        <View>
          <Text style={styles.alertTitle}>
            {this.t(
              'common:register.basicDetailsScreen.availbilityModal.header'
            )}
          </Text>
          <FlatList
            style={[styles.listBorder, { flexGrow: 0 }]}
            data={this.availbilityList}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      availableModalVisible: false,
                      available: item
                    })
                  }
                >
                  <Text style={styles.itemBorder}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={{ display: 'flex', marginTop: 10 }}>
          <Text>
            {this.t('common:register.basicDetailsScreen.availbilityModal.wrn')}
          </Text>
          <Text style={{ color: 'red' }}>
            {this.t(
              'common:register.basicDetailsScreen.availbilityModal.wrnflsy'
            )}
          </Text>
        </View>
      </Modal>
    );
  }

  renderJobNameModal() {
    return (
      <Modal
        transparent={true}
        outerPadding={20}
        containerPadding={20}
        shouldHideActionButton
        visible={this.state.jobNameModalVisible}
        onClose={() => {
          this.setState({ jobNameModalVisible: false });
        }}
      >
        <View style={{ height: Dimensions.get('window').height * 0.4 }}>
          <FloatingLabel
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            style={styles.formInput}
            value={this.state.search}
            onChangeText={text => this.setState({ search: text })}
          >
            {this.t('common:register.basicDetailsScreen.jobNameModal.jobName')}
          </FloatingLabel>
          <TouchableOpacity
            style={styles.closeContainer}
            onPress={() => {
              this.setState({ jobNameModalVisible: false, search: '' });
            }}
          >
            <Image source={CloseIcon} style={styles.closeIcon} />
          </TouchableOpacity>
          {this.state.search.length > 0 ? (
            <FlatList
              data={jobList}
              renderItem={({ item, index }) => {
                return (
                  <View>
                    <Text style={styles.listItem}>{item}</Text>
                  </View>
                );
              }}
            />
          ) : (
            <Text style={styles.addInstruction}>
              {this.t(
                'common:register.basicDetailsScreen.jobNameModal.addManually'
              )}
            </Text>
          )}
        </View>
      </Modal>
    );
  }

  renderGenderModal() {
    return (
      <Modal
        transparent={true}
        visible={this.state.genderModalVisible}
        buttonText1={this.props.t('common:editProfileScreen.cancel')}
        onClose={() => {
          this.setState({ genderModalVisible: false });
        }}
      >
        <View>
          <Text style={editStyle.alertTitle}>
            {this.props.t('common:editProfileScreen.genderModal.header')}
          </Text>
          <FlatList
            style={[editStyle.listBorder, { flexGrow: 0 }]}
            data={genderList(this.props)}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      genderModalVisible: false,
                      gender: item
                    })
                  }
                >
                  <Text style={editStyle.itemBorder}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    );
  }

  renderReligionModal() {
    return (
      <Modal
        transparent={true}
        visible={this.state.religionModalVisible}
        buttonText1={this.props.t('common:editProfileScreen.cancel')}
        onClose={() => {
          this.setState({ religionModalVisible: false });
        }}
      >
        <View>
          <Text style={editStyle.alertTitle}>
            {this.props.t('common:editProfileScreen.religionModal.header')}
          </Text>
          <FlatList
            style={[editStyle.listBorder, { flexGrow: 0, paddingBottom: 0 }]}
            data={religionsList(this.props)}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      religionModalVisible: false,
                      religion: item
                    })
                  }
                >
                  <Text style={editStyle.itemBorder}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
          <TouchableOpacity
            style={{ alignItems: 'center', paddingVertical: 15 }}
            onPress={() =>
              this.setState({
                religionInputModalVisible: true,
                religionModalVisible: false
              })
            }
          >
            <Text style={editStyle.inputTitle}>
              {this.props.t(
                'common:editProfileScreen.religionModal.inputReligion'
              )}
            </Text>
          </TouchableOpacity>
        </View>
        {/* {this.renderReligionInputModal()} */}
      </Modal>
    );
  }

  renderReligionInputModal() {
    return (
      <ModalOne
        transparent={true}
        hasTwo
        visible={this.state.religionInputModalVisible}
        buttonText1={this.props.t('profileSenfCoffeeLang:sendlikeModal.cancel')}
        buttonText2={this.t('common:register.basicDetailsScreen.done')}
        onCancel={() => {
          this.setState({ religion: '' });
          this.setState({ religionInputModalVisible: false });
        }}
        onClose={() => {
          this.setState({
            religionInputModalVisible: false,
            religionModalVisible: false
            // religion: item
          });
        }}
      >
        <Text style={styles.alertTitle}>
          {this.t('common:register.basicDetailsScreen.religionAddHeading')}
        </Text>
        <View
          style={{
            marginTop: 0,
            flexDirection: 'row'
          }}
        >
          <InputWithTitle
            placeholder={this.t(
              'common:register.basicDetailsScreen.religionText'
            )}
            onChangeText={text => this.setState({ religion: text })}
            // onChangeText={text => this.handleSearch(text)}
            inputStyle={{ marginRight: 40 }}
            containerStyle={{
              width: Dimensions.get('window').width * 0.7,
              marginTop: 12,
              borderWidth: 1,
              position: 'relative'
            }}
            value={this.state.religion}
            icon2={icCheckConfirm}
          />
        </View>
      </ModalOne>
    );
  }
  // TODO above modal never used

  calculate_age(birthday) {
    // birthday is a date
    let formattedDate = moment(birthday).format('LL');
    let dateDiff = moment().diff(formattedDate, 'years');

    console.log(dateDiff);
    return dateDiff;

    // var ageDifMs = Date.now() - birthday.getTime();
    // var ageDate = new Date(ageDifMs); // miliseconds from epoch
    // return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  componentWillReceiveProps(nextProps) {
    // if (!deepDiffer(prevProps.user, nextProps.user)) {
    this.setState({
      // ageValue: this.props.user.dob ? this.props.user.dob : new Date(),
      // nickName: this.props.user.username ? this.props.user.username : '',
      // bodyType: this.props.user.physique ? this.props.user.physique : '',
      // height: this.props.user.height ? parseInt(this.props.user.height) : 159,
      // race: this.props.user.race ? this.props.user.race : '',
      // smoke: this.props.user.doSmoke ? this.props.user.doSmoke : '',
      // gender: this.props.user.sex ? this.props.user.sex : '',
      locationName: this.props.user.locationName
        ? this.props.user.locationName
        : this.props.user.location
        ? this.props.user.location
        : '',
      universityName: !!this.props.user.universityName
        ? this.props.user.universityName
        : this.props.user.college
        ? this.props.user.college
        : '',
      occupationName: !!this.props.user.companyName
        ? this.props.user.companyName
        : this.props.user.company
        ? this.props.user.company
        : ''
    });
  }

  renderOccupationAlert = t => {
    return (
      <Modal
        transparent={true}
        shouldHideActionButton={false}
        visible={this.state.occupationAlert}
        buttonText1={t(
          'common:register.basicDetailsScreen.occupationAlert.quit'
        )}
        onPress1={() => {
          this.setState({ occupationAlert: false });
        }}
      >
        <View style={alert.innerModalContainer}>
          <Text style={alert.infoText1}>
            {t('common:register.basicDetailsScreen.occupationAlert.text1')}
          </Text>
          <Text style={alert.infoText1}>
            {t('common:register.basicDetailsScreen.occupationAlert.text2')}
          </Text>
        </View>
      </Modal>
    );
  };

  submitForm() {
    const { navigate } = this.props.navigation;
    const {
      gender,
      ageValue,
      isUnique,
      bodyType,
      nickName,
      height,
      locationName,
      race,
      occupationName,
      college,
      smoke,
      workOut,
      drink,
      available,
      religion
    } = this.state;
    if (!gender) {
      Alert.alert(
        this.t('common:app.error'),
        this.t('common:register.basicDetailsScreen.errorMessage.gender')
      );
    } else if (!ageValue) {
      Alert.alert(
        this.t('common:app.error'),
        this.t('common:register.basicDetailsScreen.errorMessage.ageRequired')
      );
    } else if (this.calculate_age(ageValue) < 18) {
      Alert.alert(
        this.t('common:app.error'),
        this.t('common:register.basicDetailsScreen.errorMessage.age')
      );
      // } else if (!nickName) {
      //   Alert.alert(
      //     this.t('common:app.error'),
      //     this.t('common:register.basicDetailsScreen.errorMessage.nickname')
      //   );
    } else if (!locationName) {
      Alert.alert(
        this.t('common:app.error'),
        this.t('common:register.basicDetailsScreen.errorMessage.locationName')
      );
    } else if (!workOut) {
      Alert.alert(
        this.t('common:app.error'),
        this.t('common:register.basicDetailsScreen.errorMessage.bodyType')
      );
    } else if (!height) {
      Alert.alert(
        this.t('common:app.error'),
        this.t('common:register.basicDetailsScreen.errorMessage.height')
      );
    } else if (!this.props.user.universityName && college) {
      Alert.alert(
        this.t('common:app.error'),
        this.t('common:register.basicDetailsScreen.errorMessage.universityName')
      );
    } else if (!occupationName || this.props.user.occupation === '') {
      // Alert.alert(
      //   this.t('common:app.error'),
      //   this.t('common:register.basicDetailsScreen.errorMessage.occupationName')
      // );
      this.setState({ occupationAlert: true });
    } else if (!race) {
      Alert.alert(
        this.t('common:app.error'),
        this.t('common:register.basicDetailsScreen.errorMessage.race')
      );
    } else if (!smoke) {
      Alert.alert(
        this.t('common:app.error'),
        this.t('common:register.basicDetailsScreen.errorMessage.smoke')
      );
    } else if (!drink) {
      Alert.alert(
        this.t('common:app.error'),
        this.t('common:register.basicDetailsScreen.errorMessage.drink')
      );
    } else if (!available) {
      Alert.alert(
        this.t('common:app.error'),
        this.t('common:register.basicDetailsScreen.errorMessage.available')
      );
    } else {
      this.putUserDetails({
        sex: this.state.gender,
        dob: ageValue,
        // username: nickName,
        location: locationName,
        latitude: this.props.user.latitude ? this.props.user.latitude : '',
        longitude: this.props.user.longitude ? this.props.user.longitude : '',
        physique: bodyType,
        college: this.props.user.universityName
          ? this.props.user.universityName
          : this.state.college,
        company: occupationName,
        occupation: this.props.user.occupation
          ? this.props.user.occupation
          : this.state.occupation,
        height: height,
        race: race ? race : '',
        doSmoke: smoke ? smoke : '',
        doDrink: drink ? drink : '',
        doWorkOut: workOut ? workOut : '',
        doAvailable: available ? available : '',
        registrationStatus: 'PhotoUpload',
        religion: religion ? religion : '',
        gender: gender ? gender : ''
      });
      navigate('PhotoUpload', { backRoute: 'BasicDetails' });
    }
  }

  render() {
    const {
      modalVisible,
      ageValue,
      bodyType,
      height,
      race,
      smoke,
      drink,
      available,
      workOut,
      religion,
      gender,
      universityName,
      occupationName,
      disableNext
    } = this.state;
    const { navigate } = this.props.navigation;
    console.log('Age', ageValue, this.calculate_age(ageValue));
    return (
      <View style={styles.flexContainer}>
        {modalVisible && (
          <Modal
            transparent={true}
            heading={this.t(
              'common:register.basicDetailsScreen.errorMessage.signUpInformation'
            )}
            onClose={() => {
              this.setState({ modalVisible: false });
            }}
          />
        )}
        {/* TODO above modal is never used */}
        <View style={styles.navBar}>
          <TopBarHeader
            action='back'
            sectionTitle={this.t('common:register.basicDetailsScreen.header')}
          />
        </View>
        <DotSlider numberOfSteps={5} active={3} />
        <KeyboardAvoidingView
          keyboardShouldPersistTaps='handled'
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View style={styles.inputContainer}>
              {/* <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={GenderIcon}
                    style={{ width: 16, height: 16 }}
                  />
                  <Text
                    style={{
                      color: config.black,
                      fontFamily: config.regularFont,
                      fontSize: 15,
                      marginLeft: 6
                    }}
                  >
                    {this.t('common:register.basicDetailsScreen.sex')}
                  </Text>
                </View>
              </View> */}

              {/** gender Selection Component */}
              {/* <GenderSelection
                value={
                  this.props.user.sex ? this.props.user.sex : this.state.gender
                }
                onSelectGender={gender => {
                  console.log('===========' + gender);
                  this.setState({
                    gender: gender
                  });
                }}
              /> */}

              {/** Select Gender button */}
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    genderModalVisible: true
                  })
                }
              >
                <InputWithTitle
                  multiline
                  // icon={AvailableIcon}
                  title={this.t('common:register.basicDetailsScreen.gender')}
                  placeholder={this.t(
                    'common:register.basicDetailsScreen.select'
                  )}
                  // containerStyle={{ marginTop: 10 }}
                  editable={false}
                  pointerEvents='none'
                  value={gender}
                />
              </TouchableOpacity>

              {/** Select Birth date button */}
              <TouchableOpacity
                onPress={() => this.setState({ ageModalVisible: true })}
              >
                <InputWithTitle
                  multiline
                  // icon={AgeIcon}
                  title={this.t('common:register.basicDetailsScreen.age')}
                  placeholder={this.t(
                    'common:register.basicDetailsScreen.select'
                  )}
                  editable={false}
                  containerStyle={{ marginTop: 10 }}
                  pointerEvents='none'
                  // value={moment(ageValue).format('YYYY DD, MMMM')}
                  value={
                    ageValue !== ''
                      ? `${this.calculate_age(ageValue)}  ${this.t(
                          'common:register.basicDetailsScreen.ageLabel'
                        )}`
                      : ''
                  }
                />
              </TouchableOpacity>
              {/** Update Nickname button */}
              {/* <TouchableOpacity
                onPress={() => this.setState({ nickNameModalVisible: true })}
              >
                <InputWithTitle
                  multiline
                  // icon={NickIcon}
                  title={this.t('common:register.basicDetailsScreen.nickname')}
                  placeholder={this.t(
                    'common:register.basicDetailsScreen.enterNickname'
                  )}
                  editable={false}
                  pointerEvents='none'
                  value={this.state.nickName}
                  containerStyle={{ marginTop: 10 }}
                />
              </TouchableOpacity> */}

              {/** Current Location button */}
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('LocationAutocomplete', {
                    direct: false
                  })
                }
              >
                <InputWithTitle
                  multiline
                  numberOflines={12}
                  // icon={LocationIcon}
                  title={this.t('common:register.basicDetailsScreen.location')}
                  placeholder={this.t(
                    'common:register.basicDetailsScreen.select'
                  )}
                  containerStyle={{ marginTop: 10, height: 'auto' }}
                  editable={false}
                  value={
                    this.props.user.locationName
                      ? this.props.user.locationName
                      : this.props.user.location
                      ? this.props.user.location
                      : ''
                  }
                  pointerEvents='none'
                />
              </TouchableOpacity>
              {/** Select body type button */}
              <TouchableOpacity
                onPress={() => this.setState({ workOutModalVisible: true })}
              >
                <InputWithTitle
                  multiline
                  // icon={BodyShapeIcon}
                  title={this.t('common:register.basicDetailsScreen.workout')}
                  placeholder={this.t(
                    'common:register.basicDetailsScreen.select'
                  )}
                  containerStyle={{ marginTop: 10 }}
                  editable={false}
                  pointerEvents='none'
                  value={
                    workOut
                      ? workOut
                      : this.props.user.doWorkOut
                      ? this.props.user.doWorkOut
                      : ''
                  }
                />
              </TouchableOpacity>
              {/** Select body type button */}
              <TouchableOpacity
                onPress={() => this.setState({ heightModalVisible: true })}
              >
                <InputWithTitle
                  multiline
                  // icon={HeightIcon}
                  title={this.t('common:register.basicDetailsScreen.height')}
                  placeholder={this.t(
                    'common:register.basicDetailsScreen.select'
                  )}
                  containerStyle={{ marginTop: 10 }}
                  editable={false}
                  pointerEvents='none'
                  value={arr[height]}
                />
              </TouchableOpacity>

              {/** Update Highschool Name button */}
              <TouchableOpacity
                onPress={() =>
                  navigate('UnivercityName', {
                    setUniversity: text => {
                      this.setUniversity(text);
                    }
                  })
                }
              >
                <InputWithTitle
                  multiline
                  // icon={UnivercityIcon}
                  title={this.t('common:register.basicDetailsScreen.school')}
                  placeholder={this.t(
                    'common:register.basicDetailsScreen.select'
                  )}
                  containerStyle={{ marginTop: 10 }}
                  editable={false}
                  pointerEvents='none'
                  value={
                    this.props.user.universityName
                      ? this.props.user.universityName
                      : this.props.user.college
                      ? this.props.user.college
                      : ''
                  }
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigate('SelectOccupation', {
                    setOccuption: text => this.setOccuption(text)
                  })
                }
              >
                <InputWithTitle
                  multiline
                  // icon={JobIcon}
                  title={this.t(
                    'common:register.basicDetailsScreen.profession'
                  )}
                  placeholder={this.t(
                    'common:register.basicDetailsScreen.select'
                  )}
                  containerStyle={{ marginTop: 10 }}
                  editable={false}
                  pointerEvents='none'
                  value={
                    this.props.user.companyName
                      ? this.props.user.companyName
                      : this.props.user.company
                      ? this.props.user.company
                      : ''
                  }
                />
              </TouchableOpacity>

              {/** Select Race button */}
              <TouchableOpacity
                onPress={() => this.setState({ raceModelVisible: true })}
              >
                <InputWithTitle
                  multiline
                  numberOflines={12}
                  // icon={RaceIcon}
                  title={this.t('common:register.basicDetailsScreen.ethnicity')}
                  placeholder={this.t(
                    'common:register.basicDetailsScreen.select'
                  )}
                  containerStyle={{ marginTop: 10 }}
                  editable={false}
                  pointerEvents='none'
                  value={race}
                />
              </TouchableOpacity>
              {/** Select Smoke button */}
              <TouchableOpacity
                onPress={() => this.setState({ smokeModalVisible: true })}
              >
                <InputWithTitle
                  multiline
                  // icon={SmokeIcon}
                  title={this.t('common:register.basicDetailsScreen.smoking')}
                  placeholder={this.t(
                    'common:register.basicDetailsScreen.select'
                  )}
                  containerStyle={{ marginTop: 10 }}
                  editable={false}
                  pointerEvents='none'
                  value={smoke}
                />
              </TouchableOpacity>
              {/** Select drink button */}
              <TouchableOpacity
                onPress={() => this.setState({ drinkModalVisible: true })}
              >
                <InputWithTitle
                  multiline
                  // icon={DrinkIcon}
                  title={this.t('common:register.basicDetailsScreen.drinking')}
                  placeholder={this.t(
                    'common:register.basicDetailsScreen.select'
                  )}
                  containerStyle={{ marginTop: 10 }}
                  editable={false}
                  pointerEvents='none'
                  value={drink}
                />
              </TouchableOpacity>

              {/** Select Religion button */}
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    religionModalVisible: true
                  })
                }
              >
                <InputWithTitle
                  multiline
                  // icon={AvailableIcon}
                  title={this.t('common:register.basicDetailsScreen.religion')}
                  placeholder={this.t(
                    'common:register.basicDetailsScreen.select'
                  )}
                  containerStyle={{ marginTop: 10 }}
                  editable={false}
                  pointerEvents='none'
                  value={religion}
                />
              </TouchableOpacity>

              {/** Select Available button */}
              <TouchableOpacity
                onPress={() => this.setState({ availableModalVisible: true })}
              >
                <InputWithTitle
                  multiline
                  // icon={AvailableIcon}
                  title={this.t('common:register.basicDetailsScreen.available')}
                  placeholder={this.t(
                    'common:register.basicDetailsScreen.select'
                  )}
                  containerStyle={{ marginTop: 10 }}
                  editable={false}
                  pointerEvents='none'
                  value={available}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {this.props.loading && <ActivityIndicator />}
        {!this.props.loading && (
          <ActionButton
            text={this.t('common:register.nextButton')}
            customStyle={{
              touchableStyle: !disableNext
                ? styles.buttonStyle
                : styles.disabledButtonStyle
            }}
            onPress1={() => (!disableNext ? this.submitForm() : '')}
          />
        )}
        {this.renderAgePickerModel()}
        {this.renderNickNameModal()}
        {this.renderLocatinoModal()}
        {this.renderBodyShapeModal()}
        {this.renderHeightModel()}
        {this.renderRaceModal()}
        {this.renderDrinkModal()}
        {this.renderAvailableModal()}
        {this.renderSmokeModal()}
        {this.renderWorkOutModal()}
        {this.renderReligionModal()}
        {this.renderReligionInputModal()}
        {this.renderGenderModal()}
        {this.renderOccupationAlert(this.t)}
      </View>
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicDetailsScreen);

const styles = StyleSheet.create({
  // Entire screen container
  flexContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: config.white
  },
  navBar: {
    width: '100%',
    backgroundColor: 'white'
  },
  // Input Field Container
  inputContainer: {
    flex: 1,
    width: config.component_width,
    marginTop: 10
  },
  instruction: {
    textAlign: 'center',
    width: config.component_width,
    color: config.btnLine,
    marginBottom: 18,
    marginTop: 26,
    fontFamily: config.regularFont
  },
  nickNameAlertMsg: {
    color: '#f83447',
    fontSize: 14,
    fontFamily: config.regularFont,
    marginTop: 8
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
  },
  buttonStyle: {
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  disabledButtonStyle: {
    height: 54,
    backgroundColor: '#BDBDBD',
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
  },
  buttonStyle: {
    width: '100%',
    marginHorizontal: 0,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: config.charcoal_grey
  },
  disabledButtonStyle: {
    height: 54,
    backgroundColor: '#BDBDBD',
    marginHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  datePickerContainer: {
    // borderWidth: 1,
    // borderColor: config.selectBox,
    borderRadius: 4,
    marginTop: 10,
    alignItems: 'center'
  },
  datePicker: {
    // width: config.component_width - 80,
    width: 240,
    borderRadius: 4,
    overflow: 'hidden',
    borderColor: config.selectBox,
    borderWidth: 1
  },
  alertTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: config.boldFont,
    fontWeight: 'bold',
    color: config.black
  },

  regularFont: {
    fontFamily: config.regularFont,
    fontWeight: 'normal'
  },
  nickNameAvailabilityMsg: {
    fontSize: 14,
    color: config.lightGrey,
    fontFamily: config.regularFont,
    marginTop: 8
  },
  locationSelectionBtn: {
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: config.navyBlack,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  locationBtnTitle: {
    fontWeight: config.regularFont,
    fontSize: 16,
    fontWeight: '500',
    color: config.black
  },
  labelInput: {
    color: config.black,
    paddingLeft: 0,
    paddingBottom: 0,
    color: config.hintText,
    fontFamily: config.regularFont
  },
  formInput: {
    borderBottomWidth: 1,
    borderColor: config.selectBox
  },
  input: {
    borderWidth: 0,
    paddingLeft: 0,
    paddingBottom: 0,
    fontWeight: 'bold',
    color: config.black
  },
  inputTitle: {
    // flex: 1,
    fontSize: 16,
    lineHeight: 20,
    fontFamily: config.boldFont,
    fontWeight: '700',
    color: config.black,
    margin: '10px auto',
    textDecorationLine: 'underline',
    alignSelf: 'center'
    // flexDirection: 'row',
    // textAlign: 'center'
  },
  addInstruction: {
    color: config.clearBlue,
    fontFamily: config.regularFont,
    fontSize: 14,
    marginTop: 5
  },
  closeContainer: {
    alignSelf: 'flex-end',
    position: 'absolute'
  },
  closeIcon: {
    width: 24,
    height: 24
  },
  listItem: {
    fontFamily: config.regularFont,
    fontSize: 16,
    paddingVertical: 10,
    color: config.black
  },
  listBorder: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: config.selectBox,
    marginTop: 10
  },
  itemBorder: {
    paddingVertical: 10,
    paddingLeft: 15,
    borderColor: config.selectBox,
    borderWidth: 0,
    color: config.brownishGrey,
    fontFamily: config.regularFont,
    fontSize: 16
  }
});

const editStyle = StyleSheet.create({
  alertTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: config.boldFont,
    fontWeight: 'bold',
    color: config.black
  },
  listBorder: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: config.selectBox,
    marginTop: 10
  },
  itemBorder: {
    paddingVertical: 10,
    paddingLeft: 15,
    // borderBottomColor: config.selectBox,
    // borderBottomWidth: 1,
    borderColor: config.selectBox,
    borderWidth: 0,
    color: config.brownishGrey,
    fontFamily: config.regularFont,
    fontSize: 16
  },
  inputTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: config.boldFont,
    fontWeight: '700',
    color: config.black,
    textDecorationLine: 'underline',
    alignSelf: 'center'
  }
});

const alert = StyleSheet.create({
  infoText1: {
    marginBottom: 5,
    //width,
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 18,
    letterSpacing: 0,
    textAlign: 'center',
    color: config.black
  },
  innerModalContainer: {
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
