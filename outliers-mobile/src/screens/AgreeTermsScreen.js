import React, { Fragment, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  BackHandler,
  Alert
} from 'react-native';

import { connect } from 'react-redux';
import api from './../services/AuthApiService';
// Import components
import CheckBox from '@components/CheckBox';
import ActionButton from '@components/ActionButton';
import TopBarHeader from '@components/TopBarHeader';
import config from '@src/config';
import Modal from '@components/CustomModal';
// Import config and styles

import SendConfirmIcon from '@assets/images/ic_send_confirm_b.png';
import CheckboxIcon from '@assets/images/ic_outline_checkbox.png';

function AgreeTermsScreen(props) {
  const [modalVisible, toggleModal] = useState(false);
  const [selected, setSelected] = useState(false);
  const [totalContacts, setContacts] = useState(
    props.navigation.getParam('totalContacts', 0)
  );
  //alert(totalContacts);
  const { t } = props;

  async function putUserDetails(data) {
    const token = await AsyncStorage.getItem('@token:key');
    const response = await api.putUserDetails(token, data);
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
  });

  console.log(props);
  return (
    <Fragment>
      {modalVisible && (
        <Modal
          transparent={true}
          hasTwo
          icon={SendConfirmIcon}
          shouldHideActionButton={false}
          heading={t(
            'common:register.mobileNumberVerificationScreen.phoneVerificationCompleted'
          )}
          onPress2={() => {
            toggleModal(false);
            putUserDetails({ registrationStatus: 'BasicDetails' });
            props.navigation.navigate('BasicDetails', {
              backRoute: 'AgreeTerms'
            });
            // props.navigation.navigate('AgreeTerms');

            // props.navigation.navigate('MyCategory');
          }}
          onPress1={() => {
            toggleModal(false);
            props.navigation.navigate('AgreeTerms');
          }}
          buttonText1={t('common:app.cancel')}
          buttonText2={t('common:app.confirm')}
        >
          {totalContacts > 0 ? (
            <Text style={styles.modalText}>
              {totalContacts}{' '}
              {t(
                'common:register.mobileNumberVerificationScreen.phoneVerificationCompleteModal.text'
              )}
              {'\n'}
              {t(
                'common:register.mobileNumberVerificationScreen.phoneVerificationCompleteModal.text1'
              )}
            </Text>
          ) : (
            <Text style={styles.modalText}>
              {t(
                'common:register.mobileNumberVerificationScreen.phoneVerificationCompleteModal.text1'
              )}
            </Text>
          )}
        </Modal>
      )}
      <View style={styles.mainContainer}>
        <TopBarHeader
          action={'close'}
          onPressLeftAction={() => props.navigation.navigate('Register')}
        />

        <View style={styles.container}>
          <View>
            <Text style={styles.infoText}>
              {t('common:register.agreeTermsScreen.idTitle')}
              {'\n'}
              <Text style={styles.ctaText}>{props.auth.user.email} </Text>
              {/* 입니다. */}
            </Text>
            <Text style={styles.info2Text}>
              {t('common:register.agreeTermsScreen.note')}
              {'\n'}
              {t('common:register.agreeTermsScreen.note1')}
            </Text>
          </View>
          <View>
            <View style={{ flexDirection: 'row', marginBottom: 18 }}>
              <View style={{ marginTop: 5 }}>
                <CheckBox
                  onPress={() => {
                    setSelected(!selected);
                  }}
                  normalImage={CheckboxIcon}
                  selected={selected}
                />
              </View>
              <Text style={styles.confirm}>
                {t('common:register.agreeTermsScreen.signinUpText')}{' '}
                <Text
                  onPress={() => props.navigation.navigate('TermsOfService')}
                  style={styles.underlineText}
                >
                  {t('common:register.agreeTermsScreen.termsOfService')}
                </Text>
                ,{' '}
                <Text
                  onPress={() => {
                    props.navigation.navigate('LocationTerms');
                  }}
                  style={styles.underlineText}
                >
                  {t('common:register.agreeTermsScreen.locationBased')}
                </Text>
                ,{' '}
                <Text
                  onPress={() => props.navigation.navigate('PrivacyPolicy')}
                  style={styles.underlineText}
                >
                  {t('common:register.agreeTermsScreen.privacyPolicy')}
                </Text>
                ,{' '}
                <Text
                  onPress={() =>
                    props.navigation.navigate('PersonalInformation')
                  }
                  style={styles.underlineText}
                >
                  {t('common:register.agreeTermsScreen.personalInformation')}
                </Text>{' '}
                {t('common:register.agreeTermsScreen.agree')}
              </Text>
            </View>
            {/* <Text style={styles.warningText}>
              ※{t('common:register.agreeTermsScreen.marriedCoupleWarning')}{'\n'}
              {t('common:register.agreeTermsScreen.falseInformationWarning')}
            </Text> */}
            <ActionButton
              text={t('common:register.agreeTermsScreen.agreeAndProceed')}
              onPress1={() => {
                if (selected) {
                  toggleModal(true);
                } else {
                  Alert.alert(
                    t('common:app.error'),
                    t('common:register.agreeTermsScreen.agreeError')
                  );
                }
              }}
            />
          </View>
        </View>
      </View>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgreeTermsScreen);

const styles = StyleSheet.create({
  modalText: {
    textAlign: 'center',
    fontFamily: config.regularFont,
    fontSize: 14,
    color: config.black,
    lineHeight: 18,
    paddingHorizontal: 20
  },
  mainContainer: {
    flex: 1
  },
  container: {
    padding: 20,
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 10
  },
  infoText: {
    fontSize: 16,
    color: config.black,
    lineHeight: 22,
    marginBottom: 14,
    fontFamily: config.regularFont
  },
  ctaText: {
    color: config.clearBlue,
    fontSize: 18
  },
  info2Text: {
    fontSize: 14,
    color: config.lightGrey,
    fontFamily: config.regularFont,
    lineHeight: 18
  },
  warningText: {
    lineHeight: 20,
    fontSize: 14,
    color: config.watermelon,
    fontFamily: config.regularFont,
    marginBottom: 15
  },
  confirm: {
    fontSize: 15,
    color: config.brownishGrey,
    marginLeft: 5,
    paddingRight: 20,
    fontFamily: config.regularFont,
    lineHeight: 28
  },
  underlineText: {
    textDecorationLine: 'underline',
    color: config.greyishBrown
  }
});
