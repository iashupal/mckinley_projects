import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
const { width } = Dimensions.get('window');
import config from '@src/config';

import icUpArrow from '@assets/images/icUpArrow.png';

export default class TopModalAlert extends Component {
  state = {
    modalVisible: false,
    isBlocked: false,
    isHidden: false,
    isHiddenTapped: false,
    isBlockTapped: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentWillReceiveProps(nextProps) {
    const { userId, user, isHidden } = this.props;
    if (
      !!user.blockedUsers &&
      user.blockedUsers.filter(item => item._id === userId).length > 0
    ) {
      this.setState({
        isBlocked: true,
        isBlockTapped: false,
        isHiddenTapped: false
      });
    } else {
      this.setState({
        isBlocked: false,
        isBlockTapped: false,
        isHiddenTapped: false
      });
    }

    if (
      !!user.hiddenUsers &&
      user.hiddenUsers.filter(item => item._id === userId).length > 0
    ) {
      this.setState({
        isHidden: true,
        isBlockTapped: false,
        isHiddenTapped: false
      });
    } else {
      this.setState({
        isHidden: false,
        isBlockTapped: false,
        isHiddenTapped: false
      });
    }
  }

  render() {
    const { modalVisible, t } = this.props;
    const { isBlockTapped, isHiddenTapped } = this.state;
    return modalVisible ? (
      <View style={styles.modalContainer}>
        <Image style={styles.upArrowImage} source={icUpArrow} />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            disabled={this.state.isBlocked}
            onPress={() => {
              this.setState({
                isBlockTapped: true
              });
              this.props.onBlockPress();
            }}
            style={styles.acceptButton}
          >
            <Text style={styles.acceptText}>
              {this.props.loading
                ? isBlockTapped
                  ? t('otherUserVibes:topModalAlert.blocking')
                  : t('otherUserVibes:topModalAlert.block')
                : !this.state.isBlocked
                ? t('otherUserVibes:topModalAlert.block')
                : t('otherUserVibes:topModalAlert.blocked') + ''}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={this.state.isHidden}
            onPress={() => {
              this.setState({
                isHiddenTapped: true
              });
              this.props.onHidePress();
            }}
            style={styles.acceptButton}
          >
            <Text style={styles.acceptText}>
              {this.props.loading
                ? isHiddenTapped
                  ? t('otherUserVibes:topModalAlert.hide')
                  : t('otherUserVibes:topModalAlert.notfollowing')
                : this.state.isHidden
                ? t('otherUserVibes:topModalAlert.notfollowing')
                : t('otherUserVibes:topModalAlert.hiding')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View />
    );
  }
}

const styles = StyleSheet.create({
  upArrowImage: {
    zIndex: 1,
    width: 15,
    height: 15,
    position: 'absolute',
    top: -10,
    right: 20
  },
  modalContainer: {
    zIndex: 1000,
    position: 'absolute',
    width,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: config.whiteTwo
  },
  matchText: {
    marginVertical: 5,
    fontFamily: config.regularFont,
    fontSize: 16,
    fontWeight: '300',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: config.navyBlack
  },
  acceptText: {
    fontFamily: config.regularFont,
    fontSize: 14,
    fontWeight: '500',
    paddingHorizontal: 10,
    textAlign: 'center',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: config.white
  },
  acceptButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.navyBlack,
    // marginTop: 5,
    // width: 143,
    marginRight: '2%',
    height: 42,
    borderRadius: 3,
    borderStyle: 'solid',

    borderColor: config.navyBlack
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  leftSideProfileView: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
