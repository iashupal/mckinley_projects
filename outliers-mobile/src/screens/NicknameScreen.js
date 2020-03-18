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
  Dimensions,
  AsyncStorage,
  BackHandler
} from 'react-native';
import { connect } from 'react-redux';
import AuthFunc from '../services/AuthApiService';
import icCheckConfirm from '@assets/images/icCheckConfirm.png';
import config from '@src/config.js';

// Import components
import ActionButton from '@components/ActionButton';
import TopBarHeader from '@components/TopBarHeader';
import InputWithTitle from '@components/InputWithTitle';
import DotSlider from '@components/DotSlider';
class NicknameScreen extends Component {
  constructor(props) {
    super(props);
    this.t = props.t;
    this.state = {
      nickName: '',
      nickNameModalVisible: false,
      available: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });

  }

  putUserDetails = async data => {
    const token = await AsyncStorage.getItem('@token:key');
    const response = await AuthFunc.putUserDetails(token, data);
  };



  handleSearch = text => {
    let format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    let specialChar = format.test(text);

    if (specialChar) {
      this.setState({ nickName: this.state.nickName });
    } else {
      this.setState({ nickName: text, available: false }, async () => {
        if (this.state.nickName.length >= 3) {
          const token = await AsyncStorage.getItem('@token:key');
          const response = await AuthFunc.getUsernameAvailabilty(token, text);
          if (response.data.Body === 'USERNAME_AVAILABLE') {
            this.setState({ available: true });
          } else {
            this.setState({ available: false });
          }
        }
      });
    }
  };

  submitForm() {
    const { navigate } = this.props.navigation;
    const { nickName } = this.state;
    this.putUserDetails({
      username: nickName,
      registrationStatus: 'PickInterest'
    });
    navigate('PickInterest', { backRoute: 'Nickname' });
  }

  render() {
    const {
      available,
      nickName
    } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.flexContainer}>
        <View style={styles.navBar}>
          <TopBarHeader
            action='back'
            sectionTitle={this.t('common:register.nicknameScreen.header')}
          />
        </View>
        <DotSlider numberOfSteps={3} active={1} />
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
              <InputWithTitle
                placeholder={this.t('common:register.basicDetailsScreen.nickname')}
                onChangeText={text => this.handleSearch(text)}
                inputStyle={{ marginRight: 40 }}
                containerStyle={{
                  marginTop: 12,
                  borderWidth: 1
                }}
                value={nickName}
              />
              {available &&
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
                />}
              <Text style={nickName.length < 3 ? styles.nickNameAlertMsg : styles.nickNameAvailabilityMsg}>
                {nickName.length < 3
                  ? this.t('common:register.nicknameScreen.char3Alert')
                  : available
                    ? this.t('common:register.nicknameScreen.availableAlert')
                    : ''}
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {this.props.loading && <ActivityIndicator />}
        {!this.props.loading && (
          <ActionButton
            text={this.t('common:register.nextButton')}
            customStyle={{
              touchableStyle: available ? styles.buttonStyle : styles.disabledButtonStyle
            }}
            onPress1={() => available ? this.submitForm() : ''}
          />
        )}
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
)(NicknameScreen);

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
