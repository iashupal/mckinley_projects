import React, { Component, Fragment } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Button,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';
import NavigationService from '@services/NavigationService';
import api from '@services/MomentVibeCommentsApiService';
import ReportIcon from '@assets/images/ic_report.png';
import Modal from '@components/CustomModal';
import styles from './styles';
import lockVibe from '@assets/images/icLockPhoto.png';
import icClover from '@assets/images/ic_clover.png';
import storeAPI from '@services/storeApiService';
import profileAPI from '@services/ProfileApiService';
export default class ReplyComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfile: false,
      receiverId: ''
    };
  }
  deleteAlert = reply => {
    Alert.alert(
      this.props.t('common:app.warning'),
      this.props.t('common:app.wanttodelete'),
      [
        {
          text: 'no',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'yes',
          onPress: () => this.props.deletePressed('reply', reply._id)
        }
      ],
      { cancelable: false }
    );
  };
  render() {
    const { t, i18n, userid, ownerId, paymentData } = this.props;
    const reply = this.props.reply
      ? this.props.reply
      : { replyBody: '', level: 1 };
    return (
      <View style={styles.container}>
        <Modal
          transparent={true}
          visible={this.state.showProfile}
          hasTwo
          onPress1={() => {
            this.setState({ showProfile: false });
          }}
          buttonText1={t('vibeDetailScreen:requestUserModal.btnOneText')}
          // buttonText2={t('vibeDetailScreen:requestUserModal.btnTwoText')}
          buttonText2={
            <Fragment style={styles.cloveContainer}>
              <Text>{t('vibeDetailScreen:requestUserModal.btnTwoText')}</Text>
              <Image style={styles.cloveImageWhite} source={icClover} />
              <Text style={styles.cloveTextWhite}>x 2</Text>
            </Fragment>
          }
          onPress2={async () => {
            this.setState({ showProfile: false });

            if (
              !!paymentData[0] &&
              !!paymentData[0].cloversleft &&
              paymentData[0].cloversleft > 0
            ) {
              const token = await AsyncStorage.getItem('@token:key');
              const x = await profileAPI.sendProfileLikeCoffee(token, {
                receiverId: receiverId,
                sentType: 'request',
                message: ''
              });

              await storeAPI.updatePaymentInfo(token, {
                id:
                  !!paymentData[0] &&
                  !!paymentData[0]._id &&
                  paymentData[0]._id,
                cloversleft: JSON.stringify(
                  parseInt(
                    !!paymentData[0] &&
                      !!paymentData[0].cloversleft &&
                      paymentData[0].cloversleft
                  ) - 2
                )
              });

              reply.profileRequests[0] = {};
              reply.profileRequests[0].status = 'pending';
              reply.profileRequests[0].receiverId = receiverId;
              reply.profileRequests[0].senderId = userid;
              reply.profileRequests[0].sentType = 'request';
              this.setState({ showProfile: false });
            } else {
              Alert.alert(
                t('common:app.error'),
                t('vibeDetailScreen:notEngClv')
              );
              NavigationService.navigate('Store');
            }
          }}
          onClose={() => {
            this.setState({ showProfile: false });
          }}
        >
          <View style={styles.innerModalContainer}>
            {/* <Image style={styles.headerImage} source={imgStopMoment} /> */}
            <Text style={styles.textHeader}>
              {t('profileCommentScreen:requestProfile')}
            </Text>
            <View style={styles.cloveContainer}>
              <Image style={styles.cloveImage} source={icClover} />
              <Text style={styles.cloveText}>x 2</Text>
            </View>
          </View>
        </Modal>
        <View style={styles.commentContainer}>
          <View style={styles.commentLevelContainer}>
            <TouchableOpacity
              onPress={() => {
                if (userid === reply.repliedById) {
                  NavigationService.navigate('My', {
                    backRoute: 'ProfileComments'
                  });
                } else if (reply.userInfo.profileStatus === 'public') {
                  if (reply.like.hasOwnProperty('status')) {
                    if (reply.like.status === 'accepted') {
                      NavigationService.navigate('ProfileMatched', {
                        id: reply.repliedById,
                        backRoute: 'ProfileComments'
                      });
                    } else {
                      NavigationService.navigate('ProfileSendLikeCoffee', {
                        id: reply.repliedById,
                        backRoute: 'ProfileComments'
                      });
                    }
                  } else {
                    NavigationService.navigate('ProfileSendLikeCoffee', {
                      id: reply.repliedById,
                      backRoute: 'ProfileComments'
                    });
                  }
                } else if (
                  reply.request.length > 0 &&
                  reply.request[0].hasOwnProperty('status')
                ) {
                  if (reply.request[0].status === 'pending') {
                    Alert.alert(
                      t('common:app.error'),
                      t('vibeDetailScreen:notAccepted')
                    );
                  } else if (reply.request[0].status === 'rejected') {
                    Alert.alert(
                      t('common:app.error'),
                      t('vibeDetailScreen:rejected')
                    );
                  } else if (reply.request[0].status === 'accepted') {
                    if (
                      reply.like.length > 0 &&
                      reply.like[0].hasOwnProperty('status')
                    ) {
                      if (reply.like[0].status === 'accepted') {
                        NavigationService.navigate('ProfileMatched', {
                          id: reply.repliedById,
                          backRoute: 'ProfileComments'
                        });
                      } else {
                        NavigationService.navigate('ProfileSendLikeCoffee', {
                          id: reply.repliedById,
                          backRoute: 'ProfileComments'
                        });
                      }
                    } else {
                      NavigationService.navigate('ProfileSendLikeCoffee', {
                        id: reply.repliedById,
                        backRoute: 'ProfileComments'
                      });
                    }
                  }
                } else {
                  this.setState({ showProfile: true });
                  this.setState({ receiverId: reply.repliedById });
                }
              }}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderColor: '#e8e8e8',
                  borderWidth: 1
                }}
                source={{ uri: reply && reply.userInfo ? reply.userInfo.photos[0].url : '' }}
              />

              {((reply && reply.userInfo && reply.userInfo.profileStatus !== 'public') ||
                (reply.request.hasOwnProperty('status') &&
                  reply.request[0].status !== 'accepted')) &&
              userid !== reply.repliedById ? (
                <View
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <Image
                    style={{ width: 12, resizeMode: 'contain' }}
                    source={lockVibe}
                  />
                </View>
              ) : (
                <View />
              )}
            </TouchableOpacity>
            {/* <Text style={styles.commentLevel}>{reply.level || 1}</Text> */}
          </View>
          <Text style={styles.commentText}>{reply.replyBody}</Text>
          {userid !== reply.repliedById ? (
            <TouchableOpacity
              style={styles.commentIconWrapper}
              onPress={() => NavigationService.navigate('Report'), {
                type: 'Reply',
                vibeOrMomentId: reply._id
              }}
            >
              <Image style={styles.reportButton} source={ReportIcon} />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 20, height: 20 }} />
          )}
        </View>
        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={() => this.props.onPressed.replyPressed()}>
            <Text style={styles.replyButton}>{t('common:app.reply')}</Text>
          </TouchableOpacity>
          {userid == ownerId || userid == reply.repliedById ? (
            <TouchableOpacity
              onPress={() => {
                this.deleteAlert(reply);
              }}
            >
              <Text style={styles.deleteButton}>{t('common:app.delete')}</Text>
            </TouchableOpacity>
          ) : (
            <Text />
          )}
        </View>
      </View>
    );
  }
}
