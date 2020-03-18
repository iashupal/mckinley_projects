import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import config from '@src/config.js';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import AuthActions from '../store/redux/auth';

import { useNetInfo } from '@react-native-community/netinfo';
// Import assets
import LogoImage from '@assets/images/logoLogin.png';
import EmailIcon from '@assets/images/ic_email.png';
import LockIcon from '@assets/images/ic_lock.png';
import DownArrow from '@assets/images/ic_open_list.png';

// Import components';
import IconInput from '@components/IconInput';
import ActionButton from '@components/ActionButton';
import Modal from '@components/CustomModal';
import WithLoaderStatus from '../components/HOC/withLoaderStatus';
import i18n from '../constants/i18n';

function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, toggleModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const { t, i18n } = props;
  const netInfo = useNetInfo();

  function submitForm() {
    console.log(t, i18n);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!netInfo.isConnected) {
      Alert.alert('', t('common:app.noNet'));
      return;
    }
    if (!email) {
      setAlertMsg(props.t('common:app.emailInfoMissing'));
      return toggleModal(true);
    } else if (reg.test(email) === false) {
      setAlertMsg(props.t('common:app.emailInvalid'));
      return toggleModal(true);
    } else if (!password) {
      setAlertMsg(props.t('common:app.passwordInfoMissing'));
      return toggleModal(true);
    } else {
      props.authUser(email, password, false);
    }
  }

  return (
    <View style={styles.flexContainer}>
      {modalVisible && (
        <Modal
          transparent={true}
          buttonText1={props.t('common:app.ok')}
          heading={props.t('common:app.error') + ' ' + alertMsg}
          onClose={() => {
            toggleModal(false);
          }}
        />
      )}
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <Image source={LogoImage} style={styles.logoImage} />
          </View>
          <View style={styles.inputContainer}>
            <IconInput
              icon={EmailIcon}
              placeholder={props.t('common:app.email')}
              target='email'
              type='emailAddress'
              value={email}
              keyboardType='email-address'
              onChangeText={email => setEmail(email)}
            />
            <IconInput
              icon={LockIcon}
              placeholder={props.t('common:app.password')}
              target='password'
              type='password'
              value={password}
              secureTextEntry={true}
              keyboardType='ascii-capable'
              onChangeText={password => setPassword(password)}
            />
            {/* {props.loading && <ActivityIndicator />} */}
            {!props.loading && (
              <ActionButton
                text='로그인하기'
                text={t('common:app.login')}
                // onPress1={() => props.navigation.navigate("ReEntry")}
                onPress1={() => submitForm()}
              />
            )}
            {!props.loading && (
              <View style={styles.userActionButton}>
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('ForgotPassword')}
                  >
                    <Text style={styles.mediumFont}>
                      {props.t('common:app.forgotPassword')}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.mediumFont}> | </Text>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate('Register')}
                  >
                    <Text style={styles.mediumFont}>
                      {props.t('common:app:signUp')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {}}
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <Text
                    onPress={() => {
                      console.log(i18n.language === 'en' ? 'ko' : 'en');
                      AsyncStorage.setItem(
                        '@appLang:key',
                        i18n.language === 'en' ? 'ko' : 'en'
                      ).then(() => {
                        i18n.language === 'en'
                          ? i18n.changeLanguage('ko')
                          : i18n.changeLanguage('en');
                      });
                    }}
                    style={styles.mediumFont}
                  >
                    {i18n.language === 'en' ? '한국어' : 'English'}
                  </Text>
                  <Image
                    source={DownArrow}
                    style={{ width: 11, height: 6, marginLeft: 3 }}
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    email: state.auth.user.email,
    password: state.auth.user.password,
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authUser: (email, password) =>
      dispatch(AuthActions.authUser(email, password, password)),
    initiateCheckOnLaunch: () => dispatch(AuthActions.initiateCheckOnLaunch()),
    clearError: () => dispatch(AuthActions.clearError())
  };
};

const LoginScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(LoginScreen));

export default withNamespaces(['common'], { wait: true })(LoginScreenHOC);

const styles = StyleSheet.create({
  // Entire screen container
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefdfb'
  },
  // Logo container
  logoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  // Logo Image
  logoImage: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width - 128,
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
  }
});
