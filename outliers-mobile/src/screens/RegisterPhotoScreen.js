import React, { Fragment, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  BackHandler,
  Alert,
  ActivityIndicator
} from 'react-native';

//Import components
import CheckBox from '@components/CheckBox';
import TopBarHeader from '@components/TopBarHeader';
import ActionButton from '@components/ActionButton';
import RegisterPhoto from '@components/RegisterPhoto';
import DotSlider from '@components/DotSlider';
import Modal from '@components/CustomModal';
import { connect } from 'react-redux';
import api from './../services/AuthApiService';

import CautionIcon from '@assets/images/ic_caution.png';
import CheckboxIcon from '@assets/images/ic_outline_checkbox.png';

import config from '@src/config';

function RegisterPhotoScreen(props) {
  const [modalVisible, toggleModal] = useState(true);
  const [registerModal, toggleRegisterModal] = useState(false);
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userPhoto, setuserPhoto] = useState([]);
  const [count, setCount] = useState(0);
  const { t } = props;

  let imageArray = [
    <Text style={styles.imagePickerInstruction}>
      <Text style={styles.blueText}>[{t('common:app.required')}]</Text>{' '}
      {t('common:register.photoUploadScreen.facePhoto')}
      {'\n'}
      <Text style={styles.noDuplicateText}>
        {t('common:register.photoUploadScreen.noduplicatephoto')}
      </Text>
    </Text>,
    <Text style={styles.imagePickerInstruction}>
      <Text style={styles.blueText}>[{t('common:app.required')}]</Text>{' '}
      {t('common:register.photoUploadScreen.fullBodyPhoto')}
      {'\n'}
      <Text style={styles.noDuplicateText}>
        {t('common:register.photoUploadScreen.noduplicatephoto')}
      </Text>
    </Text>,
    <Text style={styles.imagePickerInstruction}>
      <Text style={styles.blueText}>[{t('common:app.required')}]</Text>{' '}
      {t('common:register.photoUploadScreen.profilePhoto')}
      {'\n'}
      <Text style={styles.noDuplicateText}>
        {t('common:register.photoUploadScreen.noduplicatephoto')}
      </Text>
    </Text>,
    <Text style={styles.imagePickerInstruction}>
      <Text style={styles.imagePickerInstruction}>
        [{t('common:app.optional')}]
      </Text>{' '}
      {t('common:register.photoUploadScreen.optionalHobbyPhoto')}
      {'\n'}
      <Text style={styles.noDuplicateText}>
        {t('common:register.photoUploadScreen.noduplicatephoto')}
      </Text>
    </Text>,
    <Text style={styles.imagePickerInstruction}>
      <Text style={styles.imagePickerInstruction}>
        [{t('common:app.optional')}]
      </Text>{' '}
      {t('common:register.photoUploadScreen.optionalPetPhoto')}
      {'\n'}
      <Text style={styles.noDuplicateText}>
        {t('common:register.photoUploadScreen.noduplicatephoto')}
      </Text>
    </Text>,
    <Text style={styles.imagePickerInstruction}>
      <Text style={styles.imagePickerInstruction}>
        [{t('common:app.optional')}]
      </Text>{' '}
      {t('common:register.photoUploadScreen.optionalWorkOutPhoto')}
      {'\n'}
      <Text style={styles.noDuplicateText}>
        {t('common:register.photoUploadScreen.noduplicatephoto')}
      </Text>
    </Text>,
    <Text />
  ];

  useEffect(() => {
    this.getUserPhoto();
    var data = props.navigation.getParam('showModal', false);
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
    if (data === true) {
      props.navigation.setParams({ showModal: null });
      toggleRegisterModal(true);
    }
  });

  function updateCounter() {
    setCount(count + 1);
  }

  getUserPhoto = async () => {
    const token = await AsyncStorage.getItem('@token:key');
    const response = await api.getUserDetails(token);
    if (response.status == 200) {
      setuserPhoto(response.data.Body.photos);
    }
  };

  async function putUserDetails(data) {
    const token = await AsyncStorage.getItem('@token:key');
    const response = await api.putUserDetails(token, data);
  }

  async function uploadPhoto(uri, index) {
    setLoading(true);
    const token = await AsyncStorage.getItem('@token:key');
    const response = await api.callFinishEditingAPI(uri, token, index);
    // alert(userPhoto[0].url);
    if (response.status == 200) {
      let photoArray = userPhoto;
      if (photoArray[index] != '') {
        photoArray.push({ url: response.data.response[0] });
      } else {
        photoArray[index] = { url: response.data.response[0] };
      }
      setuserPhoto(photoArray);
    }
    setLoading(false);
    return response;
  }

  return (
    //console.log(imageArray),
    <Fragment>
      {registerModal && (
        <Modal
          transparent={true}
          shouldHideActionButton={true}
          onClose={() => {
            toggleRegisterModal(false);
            props.navigation.navigate('ReferralScreen');
          }}
        >
          <Text
            style={[
              styles.modalText,
              {
                color: config.black,
                fontSize: 18,
                lineHeight: 30,
                fontWeight: 'bold'
              }
            ]}
          >
            {t('common:register.photoUploadScreen.authenticateWith')}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'column',
              minHeight: 190
            }}
          >
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                { borderRadius: 3, height: 42, marginVertical: 5 }
              ]}
              onPress={() => {
                toggleRegisterModal(false);
                //GOTO UNIVERSITY VERIFICATIONS
                props.navigation.navigate('VerifySchool');
                putUserDetails({ registrationStatus: 'VerifySchool' });
              }}
            >
              <Text style={styles.buttonText}>
                {t('common:register.photoUploadScreen.verify.school')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                {
                  borderRadius: 3,
                  height: 42,
                  marginVertical: 5
                }
              ]}
              onPress={() => {
                toggleRegisterModal(false);
                props.navigation.navigate('VerifyJob');
                putUserDetails({ registrationStatus: 'VerifyJob' });
              }}
            >
              <Text style={styles.buttonText}>
                {t('common:register.photoUploadScreen.verify.job')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                { borderRadius: 3, height: 42, marginVertical: 5 }
              ]}
              onPress={() => {
                toggleRegisterModal(false);
                props.navigation.navigate('VerfiyNetworth');
                putUserDetails({ registrationStatus: 'VerfiyNetworth' });
              }}
            >
              <Text style={styles.buttonText}>
                {t('common:register.photoUploadScreen.verify.property')}
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            onPress={() => {
              toggleRegisterModal(false);
              putUserDetails({ registrationStatus: 'PhotoUpload' });
            }}
            style={[styles.modalText, { color: config.black, marginTop: 16 }]}
          >
            {t('common:editProfileScreen.cancel')}
          </Text>
        </Modal>
      )}

      {modalVisible && (
        <Modal
          transparent={true}
          icon={CautionIcon}
          buttonText1={t('common:register.photoUploadScreen.header')}
          onClose={() => {
            toggleModal(false);
          }}
        >
          <Text style={styles.alertTitle}>
            {t('common:register.photoUploadScreen.getCrushOnBody')}
          </Text>
          <Text style={styles.modalText}>
            {t('common:register.photoUploadScreen.excessive')}
            {'\n'}
            {t('common:register.photoUploadScreen.notPerson')}
          </Text>
        </Modal>
      )}

      <TopBarHeader
        action='back'
        sectionTitle={t('common:register.photoUploadScreen.header')}
      />

      <DotSlider numberOfSteps={5} active={4} />
      {loading ? (
        <View
          pointerEvents={'none'}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator size='large' />
        </View>
      ) : null}
      <FlatList
        numColumns={2}
        style={{ flex: 1, marginLeft: 20, marginRight: 10 }}
        keyExtractor={({ index }) => `${index}`}
        data={imageArray}
        renderItem={({ item, index }) => {
          if (index === 6) {
            return <View style={styles.blankView} />;
          } else if (index === 5 || index === 4 || index === 3) {
            return (
              <RegisterPhoto
                setPhoto={uri => {
                  return uploadPhoto(uri, index).then(function(response) {
                    return response;
                  });
                }}
                updateCounter={uri => {
                  updateCounter();
                  //return uploadPhoto(uri);
                }}
                tintColor={config.selectBox}
                title={item}
              />
            );
          }
          return (
            <RegisterPhoto
              setPhoto={uri => {
                return uploadPhoto(uri, index).then(function(response) {
                  return response;
                });
              }}
              updateCounter={() => {
                updateCounter();
              }}
              title={item}
            />
          );
        }}
      />

      <View style={styles.textBox}>
        {/* <CheckBox
          normalImage={CheckboxIcon}
          onPress={() => {
            setSelected(!selected)
          }}
          selected={selected}
        />
        <Text style={styles.black_txt}>{t('common:register.photoUploadScreen.makePublic')}</Text>
        <Text style={styles.linkText}>
          {' '}
          ({t('common:register.photoUploadScreen.appealMoreMembers')})
        </Text> */}
      </View>
      <ActionButton
        customStyle={{
          touchableStyle: styles.buttonStyle
        }}
        onPress1={() => {
          if (count >= 3) {
            // , profileStatus: selected ? "public" : "private"
            putUserDetails({ registrationStatus: 'ModalPhotoUpload' });
            toggleRegisterModal(true);
          } else {
            Alert.alert(
              t('common:app.error'),
              t('common:register.photoUploadScreen.minimumPhotos')
            );
          }
        }}
        text={t('common:register.photoUploadScreen.agreedProceed')}
      />
    </Fragment>
  );
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
)(RegisterPhotoScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  photos: {
    // flexDirection: 'row',
    flexWrap: 'wrap'
    // justifyContent: 'space-evenly'
  },
  warning: {
    color: 'red'
  },
  textBox: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: config.whiteTwo,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center'
  },
  linkText: {
    color: config.soft_blue,
    fontSize: 14
  },
  black_txt: {
    color: config.black,
    fontSize: 14,
    paddingLeft: 8
  },
  blankView: {
    flex: 1,
    margin: 7,
    aspectRatio: 1
  },
  imagePickerInstruction: {
    fontFamily: config.regularFont,
    fontWeight: '500',
    fontSize: 12,
    color: config.greyishBrown,
    position: 'absolute',
    top: 15,
    left: 10,
    right: 10,
    textAlign: 'center'
  },
  blueText: {
    color: config.clearBlue,
    fontSize: 12
  },
  noDuplicateText: {
    color: '#888888',
    fontSize: 12,
    lineHeight: 20
  },
  buttonStyle: {
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  modalText: {
    textAlign: 'center',
    fontFamily: config.regularFont,
    color: config.pointRed,
    fontSize: 14,
    lineHeight: 18,
    marginHorizontal: 7
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 23,
    textAlign: 'center',
    color: config.black,
    marginBottom: 28
  },
  buttonText: {
    fontFamily: config.regularFont,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: config.white
  }
});
