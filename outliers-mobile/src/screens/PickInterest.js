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
  BackHandler
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ImagePicker from 'react-native-image-picker';
import api from './../services/AuthApiService';
// Import components
import TopBarHeader from '@components/TopBarHeader';
import ActionButton from '@components/ActionButton';
import CheckBox from '@components/CheckBox';
import InputBox from '@components/InputBox';
import IconInput from '@components/IconInput';
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
import Modal from '@components/HashtagModal';
import { withNamespaces } from 'react-i18next';
const { width } = Dimensions.get('window');

class PickInterest extends Component {
  constructor() {
    super();

    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: '이메일로 인증' },
        { key: 'second', title: '증명서로 인증' }
      ],
      loading: null,
      imageSource: null,
      interests: [],
      newInterests: [],
      newInterest: ''
    };
    this.openGallery = this.openGallery.bind(this);
    this.putUserDetails = this.putUserDetails.bind(this);
  }

  getInterrest = async () => {
    const token = await AsyncStorage.getItem('@token:key');
    const response = await api.getTagList(token);
    if (response.ok) {
      const array = response.data.Body;
      const newInterests = array.map(element => {
        return {
          _id: element._id,
          name: element.tagsName,
          isSelected: false
        };
      });
      this.setState({
        interests: newInterests
      });
    } else {
      //
    }
  };

  putUserDetails = async data => {
    // {registrationStatus: 'ModalPhotoUpload'}
    console.log([this.state.interests, this.state.newInterests]);

    const interestsList = this.state.interests
      .filter(item => item.isSelected === true)
      .map(item => {
        return item.name;
      });

    console.log(interestsList);

    if (interestsList == '') {
      alert(this.props.t('pickerInterestLang:atleast'));
    } else {
      let interestArray = interestsList.toString().split(',');
      if (interestArray.length < 3) {
        alert(this.props.t('pickerInterestLang:atleast'));
      } else {
        const token = await AsyncStorage.getItem('@token:key');
        const response = await api.putUserDetails(token, {
          ...data,
          interestedHashtags: interestsList
        });
        this.props.navigation.navigate('SelfIntroductionScreen');
      }
    }
  };

  componentDidMount() {
    this.getInterrest();
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

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
        // Alert.alert(
        //   '오류',
        //   '갤러리를 여는데 오류가 발생하였습니다.\n접근 권한을 허용하였는지 확인하세요.'
        // );
        Alert.alert(
          `${this.props.t('common:app.error')}`,
          `${this.props.t('common:app.openGallery')} {"\n"} ${this.props.t(
            'common:app.allowAccess'
          )}`
        );
      } else {
        this.setState({
          imageSource: response
        });
      }
    });
  }

  _handleIndexChange = index => {
    // const {selectedArray} = this.state;

    this.setState(
      prevState => ({
        // selectedArray: [...prevState.selectedArray, index],
      }),
      () => {
        console.log(selectedArray);
      }
    );
  };

  render() {
    const { imageSource, interests, modalVisible } = this.state;
    const { t } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <TopBarHeader
          action='back'
          sectionTitle={t('pickerInterestLang:header')}
        />
        <DotSlider numberOfSteps={3} active={2} />
        <ScrollView>
          <View style={styles.bottomContainer}>
            <View style={styles.selectItemList}>
              {interests.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    // this._handleIndexChange (index);
                    const array = [...this.state.interests];
                    array[index] = {
                      name: item.name,
                      isSelected: !item.isSelected
                    };
                    this.setState({
                      interests: array
                    });
                  }}
                  key={index}
                  style={[
                    styles.itemContainer,
                    item.isSelected && { borderColor: config.black }
                  ]}
                >
                  <Text style={styles.itemText}> {item.name} </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={() => {
                this.setState({
                  modalVisible: true
                });
              }}
              style={styles.addInterestContainer}
            >
              <Image style={styles.addIntImage} source={AddImage} />
              <Text style={styles.addIntrstText}>
                {' '}
                {t('pickerInterestLang:add')}{' '}
              </Text>
            </TouchableOpacity>

            <View style={styles.selectItemList}>
              {this.state.newInterests.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    // this._handleIndexChange (index);
                    const array = [...this.state.interests];
                    array[index] = {
                      name: item.name,
                      isSelected: !item.isSelected
                    };
                    this.setState({
                      interests: array
                    });
                  }}
                  key={index}
                  style={[
                    styles.itemContainer,
                    item.isSelected && { borderColor: config.black }
                  ]}
                >
                  <Text style={styles.itemText}> {item.name} </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: config.navyBlack
          }}
        >
          <ActionButton
            // hasTwo
            // text={t('pickerInterestLang:cancel')}
            customStyle={{
              touchableStyle: styles.bottomButtonStyle
            }}
            // onPress1={() => this.props.navigation.pop()}
            text={t('pickerInterestLang:complete')}
            onPress1={() => {
              this.putUserDetails({ registrationStatus: 'SelfIntroductionScreen' });
            }}
          />
        </View>
        {modalVisible && (
          <Modal
            transparent={true}
            hasTwo
            // icon={SendConfirmIcon}
            // heading="관심태그를 입력해 주세요."
            onCancel={() => {
              this.setState({
                modalVisible: false
              });
              this.props.navigation.navigate('PickInterest');
            }}
            onClose={() => {
              this.setState({
                modalVisible: false
              });
              this.setState({
                interests: [
                  ...this.state.interests,
                  {
                    name: this.state.newInterest,
                    isSelected: true
                  }
                ]
              });
            }}
            buttonText1={t('common:app.cancel')}
            buttonText2={t('pickerInterestLang:add')}
          >
            <Text
              style={{
                fontFamily: config.regularFont,
                fontSize: 18,
                fontWeight: 'bold',
                fontStyle: 'normal',
                lineHeight: 26,
                letterSpacing: 0,
                color: config.black,
                marginBottom: 12
              }}
            >
              {t('pickerInterestLang:writeInt')}
            </Text>
            <IconInput
              isRightImage={false}
              iconStyle={{ width: 0, margin: -10 }}
              insetShadowStyle={{ height: 0 }}
              inputStyle={{
                width: width * 0.7,
                fontFamily: config.regularFont,
                fontSize: 15,
                fontWeight: 'bold',
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: config.whiteTwo,
                fontStyle: 'normal',
                lineHeight: 20,
                letterSpacing: 0,
                color: config.black
              }}
              onChangeText={text =>
                this.setState({
                  newInterest: text
                })
              }
              placeholder={t('pickerInterestLang:financial')}
            />
          </Modal>
        )}
      </View>
    );
  }
}

export default withNamespaces(['common', 'pickerInterestLang'], {
  wait: true
})(PickInterest);

const styles = StyleSheet.create({
  addIntrstText: {
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: config.white
  },
  addIntImage: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    tintColor: config.white
  },
  addInterestContainer: {
    flexDirection: 'row',
    borderRadius: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingHorizontal: 16,
    marginRight: 8,
    marginLeft: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginVertical: 4,
    borderColor: config.selectBox,
    height: 32,
    backgroundColor: config.navyBlack
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
    paddingVertical: 8,
    borderRadius: 25,
    borderStyle: 'solid',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
    marginVertical: 4,
    borderColor: config.selectBox,
    // height: 32
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
  bottomContainer: {
    flex: 1,
    width,
    paddingHorizontal: 20,
    backgroundColor: config.white_grey
  },
  middleImage: {
    width,
    height: 180,
    marginVertical: 20,
    marginHorizontal: 80,
    resizeMode: 'contain'
  },
  exclusiveHeaderText: {
    fontFamily: config.regularFont,
    paddingHorizontal: 60,
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
  scrollContainer: { alignItems: 'center' },
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
    borderRightWidth: 0.2,
    // borderLeftColor: config.white,
    // borderleftColor: "#30363b",
    borderRightColor: config.bottombtnline,
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
  }
});
