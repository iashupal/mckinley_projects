import React, { useState, useEffect } from 'react';
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
  Alert,
  FlatList,
  Item,
  BackHandler
} from 'react-native';
import config from '@src/config.js';

import { connect } from 'react-redux';
import AuthActions from '../store/redux/auth';
import { useNetInfo } from '@react-native-community/netinfo';

// Import assets
import LogoImage from '@assets/images/logoLogin.png';
import EmailIcon from '@assets/images/ic_email.png';
import LockIcon from '@assets/images/ic_lock.png';
import DownArrow from '@assets/images/ic_open_list.png';
import i18n from '../constants/i18n';
// Import components
import ActionButton from '@components/ActionButton';
import Modal from '@components/CustomModal';
import IconInput from '@components/IconInput';
import WithLoaderStatus from '../components/HOC/withLoaderStatus';
import { withNamespaces } from 'react-i18next';

const height = Dimensions.get('window').height;

const DATA = [
  {
    id: '1',
    title: 'Professional connections and friendship only'
  },
  {
    id: '2',
    title: 'Available (Single)'
  }
];

function RegisterScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [modalVisible, toggleModal] = useState(false);
  const netInfo = useNetInfo();

  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected]
  );

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
  });
  function AvailabilityItem({ id, title, selected }) {
    return (
      <TouchableOpacity onPress={() => onSelect(id)}>
        <Text
          style={[
            styles.item,
            { fontWeight: selected ? 'bold' : 'normal' },
            styles.itemBorder
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
  function submitForm() {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!netInfo.isConnected) {
      Alert.alert('', t('common:app.noNet'));
      return;
    }
    if (!email) {
      setFieldError(props.t('common:app.emailInfoMissing'));
      return toggleModal(true);
    } else if (reg.test(email) === false) {
      setFieldError(props.t('common:app.emailInvalid'));
      return toggleModal(true);
    } else if (!password) {
      setFieldError(props.t('common:app.passwordInfoMissing'));
      return toggleModal(true);
    } else if (!passwordConfirm) {
      setFieldError(props.t('common:app.passwordConfirmInfoMissing'));
      return toggleModal(true);
    } else if (password !== passwordConfirm) {
      setFieldError(props.t('common:app.passwordNotMatch'));
      return toggleModal(true);
    } else {
      props.authUser(email, password, passwordConfirm);
    }
  }

  return (
    <View style={styles.flexContainer}>
      {/* <Modal buttonText1={props.t("선택완료")}>
        <View>
          <Text style={styles.alertTitle}>{props.t("Availability")}</Text>
          <FlatList
            style={[styles.listBorder, { flexGrow: 0 }]}
            data={DATA}
            renderItem={({ item }) => (
              <AvailabilityItem
                id={item.id}
                title={item.title}
                selected={!!selected.get(item.id)}
                onSelect={onSelect}
              />
            )}
            keyExtractor={item => item.id}
            extraData={selected}
          />
        </View>
      </Modal> */}

      {modalVisible && (
        <Modal
          transparent={true}
          buttonText1={props.t('common:app.ok')}
          heading={
            props.t('common:app.error') + ' ' + fieldError ||
            props.t('common:app.signUpInfoMissing')
          }
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
            <IconInput
              icon={LockIcon}
              iconStyle={{ tintColor: 'rgba(1,0,0,0.4)' }}
              placeholder={props.t('common:app.confirmPassword')}
              target='password'
              type='password'
              secureTextEntry={true}
              keyboardType='ascii-capable'
              onChangeText={password => setPasswordConfirm(password)}
            />
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
              }}
            >
              <Text style={styles.passwordRule}>
                {props.t('common:app.passwordRule')}
              </Text>

              {/* <Text
                onPress={() => {
                  props.navigation.navigate('TermsOfService');
                }}
                style={[styles.passwordRule, { flex: 1, textAlign: 'right' }]}
              >
                {props.t('common:app.termsOfUse')}
              </Text> */}
            </View>
            {/* {props.loading && <ActivityIndicator />} */}
            {!props.loading && (
              <ActionButton
                text={props.t('common:app.join')}
                // text={props.t("common.app.join")}
                onPress1={() => submitForm()}
                // onPress1={() => props.navigation.navigate('MyCategory')}
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
                    onPress={() => props.navigation.navigate('Login')}
                  >
                    <Text style={styles.mediumFont}>
                      {props.t('common:app.login')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      i18n.language === 'en'
                        ? i18n.changeLanguage('ko')
                        : i18n.changeLanguage('en');
                    }}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                    <Text style={styles.mediumFont}>
                      {i18n.language === 'en' ? '한국어' : 'English'}
                    </Text>
                    <Image
                      source={DownArrow}
                      style={{ width: 11, height: 6, marginLeft: 3 }}
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                </View>
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
    loading: state.auth.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authUser: (email, password, passwordConfirm) =>
      dispatch(AuthActions.authUser(email, password, passwordConfirm, true))
  };
};

const RegistreScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(RegisterScreen));

export default withNamespaces(['common'], { wait: true })(RegistreScreenHOC);

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
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: config.component_width,
    marginBottom: 25
  },
  // Password Rule Text
  passwordRule: {
    fontSize: 13,
    textAlign: 'left',
    color: config.medium_grey_txt,
    flex: 3,
    marginBottom: 10,
    fontFamily: config.regularFont
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
    // borderBottomColor: config.selectBox,
    // borderBottomWidth: 1,
    borderColor: config.selectBox,
    borderWidth: 0,
    color: config.brownishGrey,
    fontFamily: config.regularFont,
    fontSize: 16
  }
});
