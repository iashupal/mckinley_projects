import React, { Fragment, Component } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Picker,
  TouchableOpacity,
  Platform,
  ScrollView,
  FlatList,
  BackHandler
} from 'react-native';

import TopBarHeader from '@components/TopBarHeader';
import ActionButton from '@components/ActionButton';
import config from '@src/config';
import DatePicker from 'react-native-date-picker';
import { connect } from 'react-redux';
import WithLoaderStatus from '../components/HOC/withLoaderStatus';
import { initiateMomentUpload } from '../store/actions';
import InputWithTitle from '@components/InputWithTitle';
import Geolocation from 'react-native-geolocation-service';
import { hasLocationPermission } from '../utils/geolocation';
import Modal from '@components/CustomModal';
import CurrentLocationIcon from '@assets/images/ic_current_location.png';
import moment from 'moment';
import TagInput from 'react-native-tag-input';
import RegisterPhoto from '@components/RegisterPhoto';
import { initiateEventUpload } from '../store/actions';
import icClover from '@assets/images/ic_clover.png';
import ic_open_list from '@assets/images/ic_open_list.png';

const inputProps = {
  keyboardType: 'default',
  placeholder: 'hashtags',
  autoFocus: false,
  style: {
    fontSize: 14,
    marginVertical: Platform.OS == 'ios' ? 10 : -2
  }
};

const locationList = [
  'No preferences',
  'Asian',
  'Arab',
  'Black/African-descent',
  'Hispanic/Latin',
  'Native American'
];
const typeList = ['All', 'Party', 'Activity', 'Personal'];
const personList = ['1명', '2명', '3명', '4명'];
class NewEventScreen extends Component {
  tagInputRef;
  constructor(props) {
    super(props);
    this.state = {
      newEvent: {
        imageIndex: 0,
        owner: props.owner,
        location: {
          type: 'Point',
          coordinates: []
        }
      },
      title: '',
      description: '',
      eventDate: new Date(),
      disabled: false,
      hashtags: [],
      text: '',
      eventsimage: '',
      ageModalVisible: false,
      pickerDate: new Date(),
      country: '',
      cca2: 'US',
      locationModelVisible: false,
      typeModalVisible: false,
      // locationValue: !!this.props.userDetails ? this.props.userDetails.locationValue : "Asian",
      // person: !!this.props.userDetails ? this.props.userDetails.doPerson : "1",
      personModalVisible: false
    };
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
    this.setState({ userPhotos: this.props.userPhotos });
    const hasLocationPermissionFlag = await hasLocationPermission();
    if (hasLocationPermissionFlag) {
      Geolocation.getCurrentPosition(
        position => {
          this.setState({
            newEvent: {
              ...this.state.newEvent,
              location: {
                type: 'Point',
                coordinates: [
                  position.coords.latitude,
                  position.coords.longitude
                ]
              }
            }
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
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      userPhotos: nextProps.userPhotos,
      dob: nextProps.dob
    });
  }

  changedSelectedImage = index => {
    this.setState({ newEvent: { ...this.state.newEvent, imageIndex: index } });
  };

  renderEventsDateModel() {
    return (
      <Modal
        visible={this.state.ageModalVisible}
        buttonText1='선택 완료'
        onClose={() => {
          this.setState({ ageModalVisible: false });
        }}
      >
        <View>
          <Text style={styles.alertTitle}>
            나이를 선택해 주세요.{'\n'}
            <Text style={styles.regularFont}>생년월일</Text>
          </Text>
        </View>
        {/* <View> */}
        <View style={styles.datePickerContainer}>
          <DatePicker
            initialDate={this.state.newEvent.eventDate}
            // maximumDate={new Date()}
            date={this.state.eventDate}
            style={{ fontSize: 12 }}
            onDateChange={date => {
              console.log('selected date and time', date);
              this.setState({
                eventDate: date
              });
            }}
            mode='datetime'
            locale='ko'
            style={styles.datePicker}
          />
        </View>
        {/* </View> */}
      </Modal>
    );
  }
  renderLocationModal() {
    return (
      <Modal
        visible={this.state.locationModelVisible}
        buttonText1='선택 완료'
        onClose={() => {
          this.setState({ locationModelVisible: false });
        }}
      >
        <View>
          <Text style={editStyle.alertTitle}>체형을 선택해 주세요.</Text>
          <FlatList
            style={[editStyle.listBorder]}
            data={locationList}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      locationModelVisible: false,
                      locationValue: item
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

  renderTypeModal() {
    return (
      <Modal
        visible={this.state.typeModalVisible}
        buttonText1='선택 완료'
        onClose={() => {
          this.setState({ typeModalVisible: false });
        }}
      >
        <View>
          <Text style={editStyle.alertTitle}>체형을 선택해 주세요.</Text>
          <FlatList
            style={[editStyle.listBorder, { flexGrow: 0 }]}
            data={typeList}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ typeModalVisible: false, typeValue: item })
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

  renderPersonSelectModal() {
    return (
      <Modal
        visible={this.state.personModalVisible}
        buttonText1='선택완료'
        onClose={() => {
          this.setState({ personModalVisible: false });
        }}
      >
        <View>
          <Text style={editStyle.alertTitle}>흡연 여부를 선택해 주세요</Text>
          <FlatList
            style={[editStyle.listBorder, { flexGrow: 0 }]}
            data={personList}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ personModalVisible: false, person: item })
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
  addTag = () => {
    if (this.state.text != '') {
      const textWithHash =
        this.state.text.indexOf('#') === 0
          ? this.state.text
          : '#' + this.state.text;
      this.setState({
        hashtags: [...this.state.hashtags, textWithHash],
        text: ''
      });
    } else {
      this.tagInputRef.focus();
    }
  };
  addNewEvent = () => {
    let event = {
      title: this.state.title,
      description: this.state.description,
      date: this.state.eventDate,
      // hashtags: this.state.hashtags.join(),
      eventsimage: this.state.eventsimage
    };
    this.props.initiateEventUpload(event);
    // this.props.navigation.navigate('VibesMain')
  };

  onChangeTags = hashtags => {
    this.setState({ hashtags });
  };

  onChangeText = text => {
    this.setState({ text });

    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [',', ' ', ';', '\n'];

    if (parseWhen.indexOf(lastTyped) > -1) {
      const textWithHash =
        this.state.text.indexOf('#') === 0
          ? this.state.text
          : '#' + this.state.text;
      this.setState({
        hashtags: [...this.state.hashtags, textWithHash],
        text: ''
      });
    }
  };

  labelExtractor = tag => tag;

  setPhoto = response => {
    //console.log('image response', response);
    this.setState({ eventsimage: response });
  };
  updateCounter = () => {
    console.log('counter');
  };
  render() {
    console.log(this.state);
    const { eventDate, locationValue, person, typeValue } = this.setState;
    //console.log("Age", ageValue, this.calculate_age(ageValue));
    return (
      <Fragment>
        <TopBarHeader sectionTitle='새로운 이벤트' action='close' />
        <ScrollView style={styles.container}>
          <View style={{ marginBottom: 10 }}>
            <Text>※ 이벤트 참여자가 없을 시 모든 클로버를 돌려드립니다.</Text>
          </View>
          {/* Moment title */}
          <View style={[styles.events, styles.eventsTitle]}>
            <TextInput
              style={styles.momentDetailsInput}
              placeholder='이벤트 제목'
              type='text'
              value={this.state.title}
              onChangeText={title => this.setState({ title: title })}
            />
          </View>
          {/** Location will add here Race button */}
          <View style={styles.eventsTitle}>
            <TouchableOpacity
              onPress={() => this.setState({ locationModelVisible: true })}
            >
              <InputWithTitle
                title='위치'
                placeholder='서울시 강남구'
                disabled
                title='위치'
                editable={false}
                iconRight={ic_open_list}
                pointerEvents='none'
                value={locationValue}
              />
            </TouchableOpacity>
          </View>
          {/* Date picker */}
          {/* <View > */}
          <View style={styles.eventsTitle}>
            <TouchableOpacity
              onPress={() => this.setState({ ageModalVisible: true })}
            >
              <InputWithTitle
                title='나이'
                placeholder='선택해주세요'
                disabled
                containerStyle={{
                  marginTop: 10,
                  fontSize: 15,
                  fontWeight: 'bold',
                  fontFamily: config.boldFont
                }}
                editable={false}
                iconRight={ic_open_list}
                pointerEvents='none'
                placeholder={'선택해주세요'}
                value={moment(eventDate).format('YYYY DD, MMMM,  h:mm')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.eventPickerWrapper} />
          {/** Select person button */}
          <View style={styles.eventsTitle}>
            <TouchableOpacity
              onPress={() => this.setState({ personModalVisible: true })}
            >
              <InputWithTitle
                title='인원'
                placeholder='1명'
                disabled
                iconRight={ic_open_list}
                containerStyle={{
                  marginTop: 10,
                  backgroundColor: config.white_grey
                }}
                editable={false}
                pointerEvents='none'
                value={person}
              />
            </TouchableOpacity>
          </View>
          {/* event type button */}
          <View style={styles.eventsTitle}>
            <TouchableOpacity
              onPress={() => this.setState({ typeModalVisible: true })}
            >
              <InputWithTitle
                title='Type'
                placeholder='All'
                disabled
                iconRight={ic_open_list}
                containerStyle={{
                  marginTop: 10,
                  backgroundColor: config.white_grey
                }}
                editable={false}
                pointerEvents='none'
                value={typeValue}
              />
            </TouchableOpacity>
          </View>
          {/* HashTag */}
          <View style={styles.tagsContainer}>
            <TagInput
              value={this.state.hashtags}
              onChange={this.onChangeTags}
              labelExtractor={this.labelExtractor}
              text={this.state.text}
              onChangeText={this.onChangeText}
              inputProps={inputProps}
              maxHeight={75}
              placeholder='#태그입력'
              ref={ref => (this.tagInputRef = ref)}
            />
            <TouchableOpacity
              style={styles.addTagContainer}
              onPress={this.addTag}
            >
              <Text style={[styles.tagText, { color: config.white }]}>
                추가
              </Text>
            </TouchableOpacity>
          </View>
          {/* Image upload button */}
          <View style={styles.eventUpload}>
            <RegisterPhoto
              isVibe
              title={<Text style={styles.photoGalleryText}>사진 업로드</Text>}
              changedVibeImage={this.changedVibeImage}
              updateCounter={this.updateCounter}
              setPhoto={this.setPhoto}
            />
          </View>
          {/* Moment description */}
          <View style={styles.momentDetails}>
            <TextInput
              style={styles.momentDetailsInput}
              scrollEnabled={true}
              placeholder='소개글을 남겨주세요 :)'
              multiline={true}
              textAlignVertical={'top'}
              onChangeText={description =>
                this.setState({ description: description })
              }
              value={this.description}
            />
          </View>
        </ScrollView>
        {/* Create events button */}
        <View style={styles.eventButtonWrapper}>
          <ActionButton
            hasTwo
            text='일반 이벤트'
            customStyle={{
              touchableStyle: styles.bottomButtonStyle
            }}
            hasTwoIcon={icClover}
            sideIcon={icClover}
            sideIconText={' x 5'}
            hasTwoIconText={' x 12'}
            onPress1={() => this.addNewEvent()}
            text2='일반 이벤트'
            onPress2={() => {}}
          />
        </View>
        {this.renderEventsDateModel()}
        {this.renderLocationModal()}
        {this.renderPersonSelectModal()}
        {this.renderTypeModal()}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
  eventUpload: {
    marginBottom: 10,
    overflow: 'hidden'
  },
  bio: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    marginVertical: 10
  },
  momentDetails: {
    height: 152,
    backgroundColor: config.white,
    borderWidth: 1,
    borderColor: config.whiteTwo,
    borderRadius: 4,
    marginBottom: 10
  },
  eventsTime: {
    width: '49%',
    marginRight: 5
  },
  eventsTitle: {
    width: '100%'
  },
  tagsContainer: {
    marginHorizontal: 0,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 1,
    paddingLeft: 8,
    fontSize: 14,
    height: 48,
    fontFamily: config.boldFont,
    fontWeight: 'bold',
    borderColor: 'rgb(232,232,232)',
    backgroundColor: config.white_grey,
    borderRadius: 3
  },
  events: {
    backgroundColor: config.white,
    borderWidth: 1,
    borderColor: config.whiteTwo,
    borderRadius: 4,
    height: 50,
    marginBottom: 10,
    fontSize: 15
  },
  eventsInput: {
    width: '49%'
  },
  datePickerContainer: {
    // borderWidth: 1,
    width: '100%',
    // borderColor: config.selectBox,
    // borderRadius: 4,
    marginTop: 10,
    // width: 250,
    alignItems: 'center',
    fontSize: 12
  },
  datePicker: {
    // borderRadius: 4,
    width: config.component_width - 60,
    // overflow: "hidden",
    // width: 250,
    fontSize: 12
  },
  momentDetailsInput: {
    flex: 1,
    paddingLeft: 8,
    backgroundColor: config.white_grey,
    fontFamily: config.boldFont,
    fontSize: 14,
    fontWeight: 'bold'
  },
  warningText: {
    textAlign: 'left',
    lineHeight: 17,
    marginTop: -30,
    color: config.soft_blue,
    fontSize: 13
  },
  eventPickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  addTagContainer: {
    marginTop: 7,
    marginRight: 7,
    height: 32,
    borderRadius: 3,
    backgroundColor: config.navyBlack,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15
  },
  tagText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: '600',
    color: config.brownishGrey
  },
  eventButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  buttonStyle: {
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 0,
    fontSize: 14
  },
  bottomButtonStyle: {
    flex: 1,
    height: 54,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 0.2,
    borderLeftColor: config.white,
    backgroundColor: config.navyBlack,
    borderRadius: 0
  },
  photoGalleryText: {
    fontSize: 14,
    color: 'rgb(34,34,34)',
    fontFamily: config.regularFont,
    paddingTop: 10
  }
});

const editStyle = StyleSheet.create({
  alertTitle: {
    fontSize: 18,
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
    borderBottomColor: config.selectBox,
    borderBottomWidth: 1,
    color: config.brownishGrey,
    fontFamily: config.regularFont,
    fontSize: 16
  }
});
const mapStateToProps = state => {
  console.log(state);
  return {
    loading: state.auth.loading,
    owner: state.auth.user._id,
    userPhotos: state.auth.user.photos,
    dob: state.auth.user.dob
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // initiateEventUpload: event => dispatch(initiateEventUpload(event)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(NewEventScreen));
