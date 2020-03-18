import React, { Component } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  Platform,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  BackHandler
} from 'react-native';

import config from '@src/config';

const width = Dimensions.get('window').width - 60;

import search1Mile from '@assets/images/search1Mile.png';
import AlarmIcon from '@assets/images/btn_alarm.png';
import icProfileEmpty from '@assets/images/icProfileEmpty.png';

//Import Components
import TopBarHeader from '@components/TopBarHeader';
import ActionButton from '@components/ActionButton';

const screenWidth = Dimensions.get('screen').width;

export default class MomentLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: props.visible,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.visible != nextProps.visible) {
      this.setState({ visible: nextProps.visible });
    }
  }

  handleCloseModal = () => {
    this.setState({ visible: !this.state.visible });
    if (this.props.onClose) this.props.onClose();
    this.props.navigation.navigate('MomentsMain');
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  render() {
    const { visible } = this.state;
    const {
      icon = search1Mile,
      children,
      heading,
      buttonText1,
      hasTwo,
      buttonText2,
      shouldHideActionButton,
      outerPadding,
      containerPadding,
    } = this.props;
    return (
      <View style={styles.modalBackground}>
        <TopBarHeader
          action={"AlarmIcon"}
          //   onPressLeftAction={() => props.navigation.navigate ('My')}
          sectionTitle="Moment"
          //   profileImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIZ9mEKcetDDaR2W66vc7qSOKt1sMYeGtS3WmPzmZ4FH3qUQ7W"
          alarmIcon={AlarmIcon}
          isMoment={icProfileEmpty}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          style={[styles.modalBackground, { backgroundColor: 'transparent' }]}
        >
          <View
            style={[
              styles.contentOuter,
              {
                width: outerPadding !== undefined
                  ? screenWidth - outerPadding * 2
                  : screenWidth - 30,
              },
            ]}
          >
            <View style={[styles.contentBox, { paddingVertical: 22 }]}>

              <Image source={icon} style={styles.icon} resizeMode="contain" />

              <Text style={styles.heading}>내 위치를 확인할 수 있어야 서비스 이용이 가능합니다.</Text>
              <View style={styles.childComponent}>
                {children}
              </View>
            </View>

          </View>
          {
            <ActionButton
              text={'나의 위치 켜기'}
              onPress1={() => this.handleCloseModal()}
              customStyle={{
                touchableStyle: styles.buttonStyle,
              }}
              hasTwo={hasTwo}
              text2={buttonText2}
              onPress2={() => onPress2()}
            />
          }
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentOuter: {
    width: width,
    backgroundColor: config.charcoal_grey,
  },
  contentBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  heading: {
    fontFamily: config.regularFont,
    fontSize: 15,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    textAlign: 'center',
    color: config.black,
  },
  childComponent: {
    width: '100%',
    // paddingHorizontal: 10
  },
  icon: {
    width: 146,
    height: 122,
    marginBottom: 31,
  },
  buttonStyle: {
    width: width - 20,
    height: 54,
    borderRadius: 3,
    backgroundColor: config.navyBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundContainer: {
    backgroundColor: config.charcoal_grey,
  },
});
