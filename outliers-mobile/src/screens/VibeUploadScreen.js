import React, { Fragment, Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  BackHandler
} from 'react-native';

//Import components
import TopBarHeader from '@components/TopBarHeader';
import ActionButton from '@components/ActionButton';
import AddImage from '@assets/images/icAddInterestW.png';
import DeleteImage from '@assets/images/icDeleteInterest.png';
import RegisterPhoto from '@components/RegisterPhoto';
import HashtagModal from '@components/HashtagModal';
import IconInput from '@components/IconInput';
const { width, height } = Dimensions.get('window');

import CloseIcon from '@assets/images/ic_close.png';
import config from '@src/config';

import { connect } from 'react-redux';
import WithLoaderStatus from '../components/HOC/withLoaderStatus';
import { initiateVibeUpload } from '../store/actions';

import TagInput from 'react-native-tag-input';
import { withNamespaces } from 'react-i18next';
import AuthFunc from '../services/AuthApiService';
import AuthActions from '../store/redux/auth';

const inputProps = {
  keyboardType: 'default',
  placeholder: 'hashtags',
  autoFocus: false,
  style: {
    fontSize: 14,
    marginVertical: Platform.OS == 'ios' ? 10 : -2
  }
};

class VibeUploadScreen extends Component {
  tagInputRef;
  constructor(props) {
    super(props);
    this.state = {
      hashtags: [],
      text: '',
      vibesimage: '',
      hashtagModalVisible: false
    };
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
    this.defaultHashtags();
  }

  componentWillReceiveProps(nextProps) {}

  addNewVibe = () => {
    if (this.state.vibesimage === '') {
      Alert.alert(
        this.props.t('common:app.error'),
        this.props.t('common:app.attachImage')
      );
      return;
    } else if (this.state.hashtags.length == 0) {
      Alert.alert(
        this.props.t('common:app.error'),
        this.props.t('common:app.hashTagVAlidation')
      );
      return;
    } else {
      this.props.initiateVibeUpload({
        hashtags: this.state.hashtags.join(','),
        vibesimage: this.state.vibesimage
      });
    }
    // this.props.navigation.navigate('VibesMain')
  };

  defaultHashtags = () => {
    const { userDetails } = this.props;
    let hashtags = this.state.hashtags;
    if (userDetails.dob && hashtags.length < 3) {
      hashtags.push(this.getAge(userDetails.dob));
    }
    if (userDetails.universityName && hashtags.length < 3) {
      hashtags.push(userDetails.universityName);
    }
    if (userDetails.college && hashtags.length < 3) {
      hashtags.push(userDetails.college);
    }
    if (userDetails.companyName && hashtags.length < 3) {
      hashtags.push(userDetails.companyName);
    }
    if (userDetails.occupation && hashtags.length < 3) {
      hashtags.push(userDetails.occupation);
    }
    this.setState({ hashtags });
  };

  getAge = dob => {
    let birthday = new Date(dob);
    return new Number(
      (new Date().getTime() - birthday.getTime()) / 31536000000
    ).toFixed(0);
  };

  onChangeTags = hashtags => {
    this.setState({ hashtags });
  };

  onChangeText = text => {
    if (text && text !== ' ' && text !== ',' && text !== ';') {
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
    }
  };

  onChangeHashtag = text => {
    this.setState({ text });
  };

  setHashtags = () => {
    const { text, hashtags } = this.state;
    if (text !== '') {
      if (
        text.search(' ') !== -1 ||
        text.search(',') !== -1 ||
        text.search(';') !== -1
      ) {
        let newHashtags =
          text.search(' ') !== -1
            ? text.split(' ')
            : text.search(',') !== -1
            ? text.split(',')
            : text.split(';');
        this.setState({
          hashtags: [...hashtags, ...newHashtags]
        });
      } else {
        this.setState({
          hashtags: [...hashtags, text]
        });
      }
      this.setState({
        text: ''
      });
    }
  };

  removeHashtag = index => {
    let { hashtags } = this.state;
    hashtags.splice(index, 1);
    this.setState({ hashtags });
  };

  labelExtractor = tag => tag;

  changedVibeImage = response => {
    this.setState({ vibesimage: response });
  };

  renderHashtagModal = () => {
    const { hashtags } = this.state;
    return (
      <HashtagModal
        transparent={true}
        // icon={SendConfirmIcon}
        // heading="관심태그를 입력해 주세요."
        visible={this.state.hashtagModalVisible}
        hasTwo
        buttonText1={this.props.t('vibeUploadSrc:cancel')}
        onCancel={() => {
          this.setState({
            hashtagModalVisible: false,
            text: ''
          });
        }}
        onClose={() => {
          this.setState({
            hashtagModalVisible: false
          });
          this.setHashtags();
        }}
        buttonText2={this.props.t('vibeUploadSrc:add')}
      >
        {/* <Text
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
					{this.props.t('common:editProfileScreen.writeInterest')}
				</Text> */}
        {hashtags.map(item => {
          <Text>{item}</Text>;
        })}
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
          value={this.state.text}
          onChangeText={this.onChangeHashtag}
          placeholder={'hashtags'}
        />
      </HashtagModal>
    );
  };

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
  render() {
    const { t } = this.props;
    const { hashtags } = this.state;
    return (
      <Fragment>
        <View style={styles.flexContainer}>
          <TopBarHeader
            sectionTitle={t('vibeUploadSrc:header')}
            action='close'
          />
          <ScrollView style={styles.container}>
            <RegisterPhoto isVibe changedVibeImage={this.changedVibeImage} />
            <View style={{ ...styles.tagsContainer, marginBottom: 10 }}>
              {/* <TagInput
							value={this.state.hashtags}
							onChange={this.onChangeTags}
							tagContainerStyle={{ height: 30 }}
							labelExtractor={this.labelExtractor}
							text={this.state.text}
							onChangeText={this.onChangeText}
							inputProps={inputProps}
							maxHeight={75}
							ref={ref => (this.tagInputRef = ref)}
						/> */}
              {hashtags.map((item, index) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: index <= 2 ? '#f1f8ff' : '#eee',
                      borderRadius: 3,
                      paddingVertical: 6,
                      paddingHorizontal: 10,
                      marginRight: 6,
                      marginBottom: 6
                    }}
                  >
                    <Text>
                      {'#'}
                      {item}{' '}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        this.removeHashtag(index);
                      }}
                    >
                      <Image
                        source={DeleteImage}
                        style={{ width: 12, height: 12, marginRight: 0 }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
            <ActionButton
              iconStyle={styles.addImageIcon}
              icon={AddImage}
              customStyle={{
                touchableStyle: styles.addImageButton,
                buttonTextStyle: styles.addImageText
              }}
              onPress1={() => {
                this.setState({
                  hashtagModalVisible: true
                });
              }}
              text={' ' + t('vibeUploadSrc:add')}
            />
          </ScrollView>
          <View style={styles.TipContainer}>
            <Text style={styles.tipLable}>{t('vibeUploadSrc:tip')}</Text>
            <Text style={styles.tip}>{t('vibeUploadSrc:tipNote')}</Text>
          </View>
          <ActionButton
            customStyle={{
              touchableStyle: styles.buttonStyle
            }}
            onPress1={() => this.addNewVibe()}
            text={t('vibeUploadSrc:upload')}
          />
        </View>
        {this.renderHashtagModal()}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
  TipContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  tipLable: {
    borderRadius: 3,
    borderWidth: 1,
    borderColor: config.brownishGrey,
    // fontFamily: config.regularFont,
    paddingVertical: 3,
    paddingHorizontal: 5,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: config.brownishGrey
  },
  tip: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: '500',
    color: config.lightGrey,
    marginLeft: 5,
    flexWrap: 'wrap',
    position: 'absolute',
    paddingHorizontal: 20,
    marginLeft: 40,
    width: '95%'
  },
  buttonStyle: {
    height: 54,
    backgroundColor: config.charcoal_grey,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  normalTag: {
    backgroundColor: config.veryLightPink,
    borderWidth: 0
  },
  tagsContainer: {
    marginHorizontal: 0,
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 16
  },
  tagTextContainer: {
    height: 32,
    borderRadius: 3,
    backgroundColor: config.veryLightPink,
    alignItems: 'center',
    marginRight: 6,
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  tagText: {
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: '600',
    color: config.brownishGrey
  },
  addTagContainer: {
    height: 32,
    width: 88,
    borderRadius: 3,
    backgroundColor: config.navyBlack,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 11,
    paddingVertical: 6
  },
  addImageIcon: {
    width: 18,
    height: 18,
    resizeMode: 'contain'
  },
  addImageButton: {
    paddingHorizontal: 10,
    textAlign: 'center',
    width: 'auto',
    height: 32,
    backgroundColor: config.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: config.white,
    fontSize: 15,
    paddingLeft: 0,
    paddingTop: 3,
    paddingRight: 4
  }
});

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    userDetails: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initiateVibeUpload: vibe => dispatch(initiateVibeUpload(vibe)),
    getUserInfo: () => dispatch(AuthActions.getUserInfo())
  };
};

const VibeUploadScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(VibeUploadScreen));

export default withNamespaces(['common', 'vibeUploadSrc'], {
  wait: true
})(VibeUploadScreenHOC);
