import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  AsyncStorage,
  Alert,
  BackHandler
} from 'react-native';

var FloatingLabel = require('react-native-floating-labels');

import { connect } from 'react-redux';
import AuthActions from '../store/redux/auth';
// Import components
import CheckBox from '@components/CheckBox';
import ActionButton from '@components/ActionButton';
import TopBarHeader from '@components/TopBarHeader';
import InputWithTitle from '@components/InputWithTitle';
import Modal from '@components/CustomModal';
import DonationTagsList from '@components/DonationTagsList';

import { withNamespaces } from 'react-i18next';
import WithLoaderStatus from '../components/HOC/withLoaderStatus';
import CloseIcon from '@assets/images/ic_close.png';
import CheckboxIcon from '@assets/images/ic_outline_checkbox.png';
// Import config and styles
import config from '@src/config';

// const uniList = [
//   'University of Colombia',
//   'U University Corporation of Colombia',
//   'La Gran Colombia Univercity',
//   'National University of Colombia',
//   'Externado University of Colombia',
//   'Catholic University of Colombia',
// ];

function UnivercityNameScreen(props) {
  const [token, setToken] = useState(props.auth.user.token);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [namePlaceHolder, setNamePlaceHolder] = useState('Search University');
  const [uniList, setUniList] = useState('Search University');
  const [selected, setSelected] = useState(false);
  let [degreeType, setDegreeType] = useState('');

  const { t } = props;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack(null);
      return true;
    });
    fetchData('');
  }, []);
  const univercityTags = {
    0: [t('common:register.universityScreen.university'), false],
    1: [t('common:register.universityScreen.graduate'), false]
  };

  async function fetchData(text) {
    setSearch(text);
    //const apikey = '&apikey=thewdb';
    const token1 = await AsyncStorage.getItem('@token:key');
    const url = config.apiURL + '/university?keyword=';
    fetch(url + text, {
      headers: new Headers({
        Authorization: token1,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        setUniList([
          ...responseJson.Body,
          {
            id: 'personal',
            universityName: text
          }
        ]);
      })
      .catch(error => {
        console.log(error);
      });
  }

  function Enter() {
    return (
      <React.Fragment>
        <Text
          style={{
            borderWidth: 1,
            borderColor: config.hintText,
            borderRadius: 4,
            paddingHorizontal: 8,
            paddingVertical: 0,
            height: 20,
            marginLeft: 10,
            color: config.greyishBrown
          }}
        >
          {t('common:register.universityScreen.enter')}
          {/* Enter */}
        </Text>
      </React.Fragment>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <TopBarHeader
        // action={'back'}
        sectionTitle={t('common:register.universityScreen.header')}
        headerContainerStyle={{
          justifyContent: 'flex-start',
          textAlign: 'left'
        }}
        sectionTitleContainerStyle={{
          marginLeft: 20,
          width: 100
        }}
      />

      <View style={styles.container}>
        <View>
          {/* <Text style={styles.titleText}>{t("common:register.universityScreen.header")}</Text> */}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <InputWithTitle
              placeholder={t('common:register.universityScreen.enterSchool')}
              editable={false}
              value={search.toUpperCase()}
              pointerEvents='none'
            />
          </TouchableOpacity>
          <Text style={styles.instructionText}>
            {t('common:register.universityScreen.selectUniversity')}
          </Text>
          <DonationTagsList
            tags={univercityTags}
            multiSelection={false}
            containerStyle={{ justifyContent: 'flex-start' }}
            onchangeSelectedTags={type => {
              setDegreeType(type);
            }}
          />
          <View style={styles.checkboxContainer}>
            <CheckBox
              normalImage={CheckboxIcon}
              onPress={() => {
                setSelected(!selected);
              }}
              selected={selected}
            />
            {degreeType.toString() === '#Graduate' ? (
              <Text style={styles.confirm}>
                {t('common:register.universityScreen.attendSummerSchool')}
              </Text>
            ) : (
              <Text style={styles.confirm}>
                {t('common:register.universityScreen.attendUndergraduteSchool')}
              </Text>
            )}
          </View>
        </View>
      </View>
      <ActionButton
        text={t('common:app.next')}
        onPress1={() => {
          const isProfile = props.navigation.getParam('isProfile', false);
          if (selected) {
            if (isProfile) {
              props.navigation.navigate('EditProfile');
            } else {
              props.navigation.navigate('BasicDetails');
            }
          } else {
            Alert.alert(
              t('common:app.error'),
              t('common:register.universityScreen.checkbox')
            );
          }
          props.saveUserInfo({
            universityName: search
          });
        }}
        customStyle={{
          touchableStyle: styles.buttonStyle
        }}
      />
      {/** Search Scool Name modal*/}
      <Modal
        transparent={true}
        outerPadding={20}
        containerPadding={20}
        shouldHideActionButton
        visible={modalVisible}
        buttonText1={t('common:register.universityScreen.universityBtn')}
        onClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ height: Dimensions.get('window').height * 0.4 }}>
          <FloatingLabel
            returnKeyLabel='Done'
            returnKeyType='done'
            labelStyle={styles.labelInput}
            inputStyle={styles.input}
            style={styles.formInput}
            value={search}
            // onChangeText={text => setSearch (text)}
            onChangeText={text => {
              fetchData(text);
            }}
            onFocus={() => {
              setNamePlaceHolder(
                t('common:register.universityScreen.universityName')
              );
            }}
            onBlur={() => {
              if (search.length == 0) {
                setNamePlaceHolder(
                  t('common:register.universityScreen.searchUniversity')
                );
              }
            }}
          >
            {namePlaceHolder}
          </FloatingLabel>
          <TouchableOpacity
            style={styles.closeContainer}
            onPress={() => {
              // setSearch ('');
              setModalVisible(false);
              setNamePlaceHolder(
                t('common:register.universityScreen.searchUniversity')
              );
              setSearch('');
            }}
          >
            <Image source={CloseIcon} style={styles.closeIcon} />
          </TouchableOpacity>
          {search.length === 0 ? (
            <View style={styles.blueSubHeader}>
              <View style={styles.blueSubHeaderInnerContainer}>
                <Text style={styles.blueSubHeaderText}>
                  {t('common:register.manuallyAdd')}
                </Text>
              </View>
            </View>
          ) : (
            <View />
          )}
          {uniList.length > 0 ? (
            <FlatList
              data={uniList}
              renderItem={({ item, index }) => {
                let firstText = '';
                let searchedText = '';
                let lastText = '';
                if (search.length > 0) {
                  const searchIndex = item.universityName
                    .toLowerCase()
                    .search(search.toLowerCase());
                  firstText = item.universityName.slice(0, searchIndex);
                  searchedText = item.universityName.slice(
                    searchIndex,
                    searchIndex + search.length
                  );
                  lastText = item.universityName.slice(
                    searchIndex + search.length
                  );
                } else {
                  firstText = item.universityName;
                }
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setSearch(item.universityName);
                        setModalVisible(false);
                      }}
                      style={styles.listItem}
                    >
                      {search.length > 0 && index === uniList.length - 1 ? (
                        // <View style={{ flex: 1, flexDirection: 'row' }}>
                        //   <Text style={{ fontWeight: '700' }}>{search ? search.toUpperCase() : ''}</Text>
                        //   {search ? (
                        //     <Enter />
                        //   ) : (
                        //       <Text />
                        //     )}
                        // </View>
                        search ? (
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row'
                            }}
                          >
                            <View
                              style={{
                                width: '80%',
                                flexWrap: 'wrap'
                              }}
                            >
                              <Text style={{ fontWeight: '700' }}>
                                {search ? search.toUpperCase() : ''}
                              </Text>
                            </View>

                            <View
                              style={{
                                width: '20%',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                              }}
                            >
                              <Text
                                style={{
                                  borderWidth: 1,
                                  borderColor: '#dddddd',
                                  borderRadius: 3,
                                  paddingHorizontal: 4,
                                  paddingVertical: 2
                                }}
                              >
                                <Enter />
                              </Text>
                            </View>
                          </View>
                        ) : (
                          <View />
                        )
                      ) : index !== uniList.length - 1 ? (
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            width: '80%'
                          }}
                        >
                          <Text>
                            <Text>{firstText}</Text>
                            <Text style={{ fontWeight: '700' }}>
                              {searchedText}
                            </Text>
                            <Text>{lastText}</Text>
                          </Text>
                          {/* {item.universityName != undefined ? (
                            <Enter />
                          ) : (
                            <Text />
                          )} */}
                        </View>
                      ) : (
                        <View />
                      )}
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          ) : (
            <Text style={styles.addInstruction}>
              {this.t('common:app.manual')}
            </Text>
          )}
        </View>
      </Modal>
    </View>
  );
}

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveUserInfo: data => dispatch(AuthActions.setUserInfo(data))
  };
};

/*export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnivercityNameScreen);*/

const UnivercityNameScreenHoc = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(UnivercityNameScreen));

export default withNamespaces(['common', 'register'], { wait: true })(
  UnivercityNameScreenHoc
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  container: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flex: 1
  },
  titleText: {
    fontSize: 20,
    fontFamily: config.boldFont,
    fontWeight: 'bold',
    color: config.black,
    marginBottom: 20
  },
  instructionText: {
    lineHeight: 22,
    fontSize: 14,
    color: config.black,
    fontFamily: config.regularFont,
    marginTop: 20
  },
  confirm: {
    fontSize: 15,
    color: config.brownishGrey,
    marginLeft: 5,
    paddingRight: 20,
    fontFamily: config.regularFont
  },
  buttonStyle: {
    width: '100%',
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: config.charcoal_grey
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
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 18,
    marginTop: 30
  },
  listItem: {
    fontFamily: config.regularFont,
    fontSize: 16,
    paddingVertical: 10,
    color: config.black
  },
  enterButton: {
    borderColor: config.hintText,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 10
  },
  blueSubHeader: {
    // flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10
  },
  blueSubHeaderInnerContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  blueSubHeaderText: {
    fontSize: 15,
    fontFamily: config.regularFont,
    color: '#09ABF3',
    width: '100%'
  }
});
