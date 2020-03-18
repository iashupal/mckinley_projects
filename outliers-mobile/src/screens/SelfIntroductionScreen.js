import React, { Fragment, Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  AsyncStorage,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { withNamespaces, translate } from 'react-i18next';
import api from './../services/AuthApiService';
import config from '@src/config';

// Import assets
import LogoImage from '@assets/images/logoLogin.png';

// Import components
import TopBarHeader from '@components/TopBarHeader';
import IconInput from '@components/IconInput';
import ActionButton from '@components/ActionButton';
import DotSlider from '@components/DotSlider';
import { TextInput } from 'react-native-gesture-handler';

class SelfIntroductionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intro: '',
      validate: false,
      disabledDone: true
    };
  }
  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  validateInput = text => {
    if (text.length >= 100) {
      this.setState({ disabledDone: false });
    } else {
      this.setState({ disabledDone: true });
    }
    this.setState({ intro: text });
  }

  submit = async () => {
    const token = await AsyncStorage.getItem('@token:key');

    const response = await api.putUserDetails(token, {
      introduction: this.state.intro,
      registrationStatus: 'Complete'
    });

    if (response.status === 200) {
      this.props.navigation.navigate('VibesMain');
    }
  };
  render() {
    const { disabledDone, intro } = this.state;
    return (
      // <Fragment>
      <View style={styles.flexContainer}>
        <View style={styles.navBar}>
          <TopBarHeader
            sectionTitle={this.props.t('common:app.aboutMe')}
            action='back'
          />
          <Text style={[styles.doneText, !disabledDone ? styles.doneTextActive : styles.doneTextDisabled]}>{this.props.t('common:app.done')}</Text>
        </View>
        <DotSlider numberOfSteps={3} active={3} />
        <KeyboardAvoidingView
          keyboardShouldPersistTaps='handled'
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View style={styles.mainOuter}>
              <TextInput onChangeText={text => this.validateInput(text)} style={styles.textInputContainer} placeholderTextColor={'#666666'} multiline={true} placeholder={this.props.t('storeLang:introYourself')} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <KeyboardAvoidingView keyboardVerticalOffset={50} behavior="position" enabled>
          <View style={styles.charCountContainer}>
            <Text style={{ fontSize: 16 }}>{this.props.t('common:app.char100')}</Text>
            <Text style={{ fontSize: 16 }}>(<Text style={!disabledDone ? styles.doneTextActive : null}>{intro.length}</Text>/500)</Text>
          </View>
        </KeyboardAvoidingView>
        <ActionButton
          text={this.props.t('common:app.done')}
          customStyle={{
            touchableStyle: !disabledDone ? styles.buttonStyle : styles.disabledButtonStyle
          }}
          onPress1={() => !disabledDone ? this.submit() : ''}
        />
      </View>
      // </Fragment>
    );
  }
}

export default withNamespaces(['common'], { wait: true })(
  SelfIntroductionScreen
);

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
  // Logo container
  logoContainer: {
    flex: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: config.divide
  },
  // Logo Image
  logoImage: {
    resizeMode: 'contain',
    // width: Dimensions.get('window').width - 128,
    aspectRatio: 1.78,
    marginTop: 0
  },
  // Input Field Container
  inputContainer: {
    // flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: config.component_width,
    marginBottom: 25
  },
  // Find ID - Password Button
  userActionButton: {
    marginTop: 10,
    color: config.medium_grey_txt,
    width: config.component_width,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  mediumFont: {
    fontFamily: config.mediumFont,
    color: config.brownishGrey,
    fontSize: 15
  },

  // Form
  mainOuter: {
    // flex: 2.5,
    // backgroundColor: config.divide,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    // minHeight: 800
    flex: 1,
    width: Dimensions.get('window').width,
    marginTop: 10
  },
  textInputContainer: {
    backgroundColor: config.divide,
    zIndex: 200,
    textAlignVertical: 'top',
    marginHorizontal: 8,
    marginVertical: 4,
    marginBottom: 20,
    padding: 10,
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    overflow: 'scroll',
    fontSize: 15,
    borderColor: '#e1dfdb',
    borderWidth: 1,
    borderRadius: 5,
    color: '#000000'
  },
  reportButton: {
    width: '100%',
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  reportButtonText: {
    color: 'white',
    fontFamily: 'NotoSansKR-Bold',
    fontSize: 17
  },
  btnText: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    color: '#f83447'
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
  doneText: {
    position: 'absolute',
    right: 0,
    fontSize: 16,
    alignSelf: 'center',
    top: 16,
    fontWeight: '700',
    marginRight: 16
  },
  doneTextDisabled: {
    color: '#d4d4d4'
  },
  doneTextActive: {
    color: '#12a9f3'
  },
  charCountContainer: {
    // flex: 1,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 400,
    backgroundColor: '#F2F8FF',
    paddingVertical: 10,
    paddingHorizontal: 10
  }
});
