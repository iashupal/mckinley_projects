import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  AsyncStorage,
  BackHandler
} from 'react-native';

import { connect } from 'react-redux';
import AuthActions from '../store/redux/auth';

var FloatingLabel = require('react-native-floating-labels');

// Import components
import CheckBox from '@components/CheckBox';
import ActionButton from '@components/ActionButton';
import TopBarHeader from '@components/TopBarHeader';
import InputWithTitle from '@components/InputWithTitle';
import Modal from '@components/CustomModal';
import DonationTagsList from '@components/DonationTagsList';

import CloseIcon from '@assets/images/ic_close.png';
import { withNamespaces } from 'react-i18next';
import WithLoaderStatus from '../components/HOC/withLoaderStatus';
// Import config and styles
import config from '@src/config';

// const jobList = ['삼성 물산', '삼성 전자', '삼성 제일모직', '삼성 확학섬유', '삼성 건설', '삼성 화재보험'];

class SelectOccupationScreen extends Component {
  univercityTags = {};
  t;
  constructor(props) {
    super(props);
    this.t = props.t;

    this.univercityTags = {
      0: [this.t('common:register.occupationScreen.tags.onlyWorkspace'), false],
      1: [this.t('common:register.occupationScreen.tags.occupation'), false],
      2: [this.t('common:register.occupationScreen.tags.both'), false]
    };
    this.state = {
      modalVisible: false,
      search: '',
      career: '',
      token: '',
      jobList: [],
      occupationModalVisible: false,
      occupationList: []
    };
  }

  componentDidMount() {
    this.setState({
      token: this.props.auth.user.token
    });
    this.fetchData('');
    this.fetchJobData('');
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.career && this.props.career != nextProps.career) {
      this.setState({ career: nextProps.career });
    }
  }

  async fetchData(text) {
    this.setState({ search: text });
    const apikey = '&apikey=thewdb';
    const url = config.apiURL + '/company?keyword=';

    const token1 = await AsyncStorage.getItem('@token:key'); //FIXME: NOT GETTING TOKEN FROM PROPS
    fetch(url + text, {
      headers: new Headers({
        Authorization: token1,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          jobList: [
            ...responseJson.Body,
            {
              id: 'personal',
              companyName: this.state.search
            }
          ]
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  async fetchJobData(text) {
    this.setState({ career: text });
    const apikey = '&apikey=thewdb';
    const url = config.apiURL + '/occupation?search=';

    const token1 = await AsyncStorage.getItem('@token:key'); //FIXME: NOT GETTING TOKEN FROM PROPS
    fetch(url + text, {
      headers: new Headers({
        Authorization: token1,
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          occupationList: [
            ...responseJson.Body,
            {
              id: 'personal',
              occupationName: this.state.career
            }
          ]
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const setJobTitle = this.props.navigation.getParam('setOccuption', '');
    const { career } = this.state;
    const { t } = this.props;
    function Enter() {
      return (
        <React.Fragment>
          <Text
            style={{
              borderWidth: 1,
              borderColor: config.hintText,
              borderRadius: 4,
              paddingHorizontal: 8,
              marginLeft: 10,
              color: config.greyishBrown
            }}
          >
            {t('common:register.occupationScreen.enter')}
            {/* Enter */}
          </Text>
        </React.Fragment>
      );
    }
    return (
      <View style={styles.mainContainer}>
        <TopBarHeader
          // action={'back'}
          sectionTitle={t('common:register.occupationScreen.header')}
          headerContainerStyle={{
            justifyContent: 'flex-start',
            textAlign: 'left'
          }}
          sectionTitleContainerStyle={{
            marginLeft: 20,
            width: 150
          }}
        />

        <View style={styles.container}>
          <View>
            {/* <Text style={styles.titleText}>
              {this.t('common:register.occupationScreen.header')}
            </Text> */}
            <Text style={styles.instructionText}>
              {this.t('common:register.occupationScreen.public')}
            </Text>
            <TouchableOpacity
              onPress={() => this.setState({ modalVisible: true })}
            >
              <InputWithTitle
                title={this.t(
                  'common:register.occupationScreen.companyWorkspace'
                )}
                placeholder={this.t('common:app.placeholder')}
                editable={false}
                value={this.state.search.toUpperCase()}
                pointerEvents='none'
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({ occupationModalVisible: true })}
            >
              <InputWithTitle
                title={this.t('common:register.basicDetailsScreen.profession')}
                placeholder={this.t('common:app.placeholder')}
                // pointerEvents="none"
                value={this.state.career.toUpperCase()}
                containerStyle={{ marginTop: 10 }}
                editable={false}
                pointerEvents='none'
              />
            </TouchableOpacity>
            {/* <Text style={styles.instructionText}>{this.t("common:register.occupationScreen.public")}</Text> */}
            <DonationTagsList
              tags={this.univercityTags}
              multiSelection={false}
              containerStyle={{ justifyContent: 'flex-start' }}
            />
          </View>
        </View>
        <ActionButton
          text={this.t('common:app.next')}
          onPress1={() => {
            const isProfile = this.props.navigation.getParam(
              'isProfile',
              false
            );

            setJobTitle(career);
            this.props.saveUserInfo({ occupation: this.state.career });

            if (isProfile) {
              this.props.navigation.navigate('EditProfile');
            } else {
              this.props.navigation.navigate('BasicDetails');
            }
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
          visible={this.state.modalVisible}
          buttonText1={this.t('common:register.occupationScreen.completeInput')}
          onClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <View style={{ height: Dimensions.get('window').height * 0.4 }}>
            <FloatingLabel
              returnKeyLabel='Done'
              returnKeyType='done'
              labelStyle={styles.labelInput}
              inputStyle={styles.input}
              style={styles.formInput}
              value={this.state.search}
              // onChangeText={text => this.setState ({search: text})}
              onChangeText={text => {
                this.fetchData(text);
              }}
            >
              {this.t('common:register.occupationScreen.searchJob')}
            </FloatingLabel>
            <TouchableOpacity
              style={styles.closeContainer}
              onPress={() => {
                this.setState({ modalVisible: false, search: '' });
              }}
            >
              <Image source={CloseIcon} style={styles.closeIcon} />
            </TouchableOpacity>
            {this.state.search.length === 0 ? (
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
            {this.state.jobList.length > 0 ? (
              <FlatList
                data={this.state.jobList}
                renderItem={({ item, index }) => {
                  let firstText = '';
                  let searchedText = '';
                  let lastText = '';
                  if (this.state.search.length > 0) {
                    const searchIndex = item.companyName
                      .toLowerCase()
                      .search(this.state.search.toLowerCase());
                    firstText = item.companyName.slice(0, searchIndex);
                    searchedText = item.companyName.slice(
                      searchIndex,
                      searchIndex + this.state.search.length
                    );
                    lastText = item.companyName.slice(
                      searchIndex + this.state.search.length
                    );
                  } else {
                    firstText = item.companyName;
                  }
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.saveUserInfo({
                            companyName: item.companyName
                          });
                          this.setState({
                            search: item.companyName,
                            modalVisible: false
                          });
                        }}
                        style={styles.listItem}
                      >
                        {index === this.state.jobList.length - 1 ? (
                          this.state.search ? (
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
                                  {this.state.search.toUpperCase()}
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
                        ) : (
                          <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text>
                              <Text>{firstText}</Text>
                              <Text style={{ fontWeight: '700' }}>
                                {searchedText}
                              </Text>
                              <Text>{lastText}</Text>
                            </Text>
                            {/* <Enter /> */}
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            ) : (
              <View>
                {/* <Text style={styles.addInstruction}>
                    {this.t('common:app.manual')}
                  </Text> */}
              </View>
            )}
          </View>
        </Modal>

        {/** Search Scool Name modal*/}
        <Modal
          transparent={true}
          outerPadding={20}
          containerPadding={20}
          shouldHideActionButton
          visible={this.state.occupationModalVisible}
          buttonText1={this.t('common:register.occupationScreen.completeInput')}
          onClose={() => {
            this.setState({ occupationModalVisible: false });
          }}
        >
          <View style={{ height: Dimensions.get('window').height * 0.4 }}>
            <FloatingLabel
              returnKeyLabel='Done'
              returnKeyType='done'
              labelStyle={styles.labelInput}
              inputStyle={styles.input}
              style={styles.formInput}
              value={this.state.career}
              onChangeText={text => {
                this.fetchJobData(text);
              }}
            >
              {this.t('common:register.occupationScreen.searchOccupation')}
            </FloatingLabel>
            <TouchableOpacity
              style={styles.closeContainer}
              onPress={() => {
                this.setState({ occupationModalVisible: false, career: '' });
              }}
            >
              <Image source={CloseIcon} style={styles.closeIcon} />
            </TouchableOpacity>
            {this.state.career.length === 0 ? (
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
            {this.state.occupationList.length > 0 ? (
              <FlatList
                data={this.state.occupationList}
                renderItem={({ item, index }) => {
                  let firstText = '';
                  let searchedText = '';
                  let lastText = '';
                  if (this.state.career.length > 0) {
                    const searchIndex = item.occupationName
                      .toLowerCase()
                      .search(this.state.career.toLowerCase());
                    firstText = item.occupationName.slice(0, searchIndex);
                    searchedText = item.occupationName.slice(
                      searchIndex,
                      searchIndex + this.state.career.length
                    );
                    lastText = item.occupationName.slice(
                      searchIndex + this.state.career.length
                    );
                  } else {
                    firstText = item.occupationName;
                  }
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          this.props.saveUserInfo({
                            occupation: this.state.career
                          });
                          this.setState({
                            career: item.occupationName,
                            occupationModalVisible: false
                          });
                        }}
                        style={styles.listItem}
                      >
                        {index === this.state.occupationList.length - 1 ? (
                          this.state.career ? (
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
                                  {this.state.career.toUpperCase()}
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
                        ) : (
                          <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text>
                              <Text>{firstText}</Text>
                              <Text style={{ fontWeight: '700' }}>
                                {searchedText}
                              </Text>
                              <Text>{lastText}</Text>
                            </Text>
                            {/* <Enter /> */}
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            ) : (
              <View>
                {/* <Text style={styles.addInstruction}>
                    {this.t('common:app.manual')}
                  </Text> */}
              </View>
            )}
          </View>
        </Modal>
      </View>
    );
  }
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
)(SelectOccupationScreen);*/

const SelectOccupationScreenHoc = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(SelectOccupationScreen));

export default withNamespaces(['common', 'register'], { wait: true })(
  SelectOccupationScreenHoc
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
    marginBottom: 20
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
