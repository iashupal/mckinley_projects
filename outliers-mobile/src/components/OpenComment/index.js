import React, { Fragment, useState, useEffect } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  AsyncStorage
} from 'react-native';
import { withNamespaces } from 'react-i18next';
import NavigationService from '@services/NavigationService';
import config from '@src/config';
import ReportIcon from '@assets/images/ic_report.png';
import LockIcon from '@assets/images/icLockGrey.png';
import CloverIconWhite from '@assets/images/ic_cloverW.png';
import lockVibe from '@assets/images/icLockPhoto.png';
import icClover from '@assets/images/ic_clover.png';
import storeAPI from '@services/storeApiService';
import profileAPI from '@services/ProfileApiService';
import styles from './styles';
import Modal from '@components/CustomModal';
import ReplyComment from '@components/ReplyComment';
// import DeleteComment from '@components/DeleteComment';
import Level from '../Level';

function OpenComment(props) {
  const { t, i18n, userid } = props;
  const comment = props.comment
    ? props.comment
    : { reply: [], commentBody: '', level: 1 };

  const [userLavel, setuserLavel] = useState(parseInt(props.userLevel));
  const [showProfile, setshowProfile] = useState(false);
  const [paymentData, setpaymentData] = useState();
  const [receiverId, setreceiverId] = useState();
  const [momentVibeId, setmomentVibeId] = useState();

  useEffect(() => {
    getDetail();
  });

  getDetail = async () => {
    const token = await AsyncStorage.getItem('@token:key');
    const paymentResponse = await storeAPI.getPaymentInfo(token);
    if (paymentResponse.status === 200) {
      setpaymentData(paymentResponse.data.Body);
    }
  };
  deleteAlert = comment => {
    Alert.alert(
      t('common:app.warning'),
      t('common:app.wanttodelete'),
      [
        {
          text: t('common:app.no'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: t('common:app.yes'),
          onPress: () => {
            console.log('@@@@@@', comment._id);
            props.deletePressed('comment', comment._id);
          }
        }
      ],
      { cancelable: false }
    );
  };
  payAlert = cid => {
    Alert.alert(t('common:app.warning'), t('common:app.wanttodelete'), [
      {
        text: t('common:app.no'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      {
        text: t('common:app.yes'),
        onPress: () => {
          props.viewComment(cid);
        }
      }
    ]);
  };
  return (
    <View>
      <Modal
        transparent={true}
        visible={showProfile}
        hasTwo
        onPress1={() => {
          setshowProfile(false);
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
          setshowProfile(false);

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
                !!paymentData[0] && !!paymentData[0]._id && paymentData[0]._id,
              cloversleft: JSON.stringify(
                parseInt(
                  !!paymentData[0] &&
                  !!paymentData[0].cloversleft &&
                  paymentData[0].cloversleft
                ) - 2
              )
            });

            comment.profileRequests[0] = {};
            comment.profileRequests[0].status = 'pending';
            comment.profileRequests[0].receiverId = receiverId;
            comment.profileRequests[0].senderId = userid;
            comment.profileRequests[0].sentType = 'request';
            setshowProfile(false);
          } else {
            Alert.alert(t('common:app.error'), t('vibeDetailScreen:notEngClv'));
            NavigationService.navigate('Store');
          }
        }}
        onClose={() => {
          setshowProfile(false);
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
      {userid != comment.commentUserId &&
        userLavel < parseInt(comment.commentUserInfo.level) &&
        comment.cloverUsed.length === 0 ? (
          <View style={styles.container}>
            <View style={styles.commentContainerTwo}>
              <Image
                style={{ width: 11, height: 16, flexShrink: 1 }}
                source={LockIcon}
              />
              <Text style={styles.commentTextTwo}>
                {t('profileCommentScreen:noPermission')}
              </Text>
              <TouchableOpacity
                style={styles.greyButton}
                onPress={() => this.payAlert(comment._id)}
              >
                <Text style={styles.greyButtonText}>
                  {t('profileCommentScreen:example')}
                </Text>
                <Image style={styles.iconClover} source={CloverIconWhite} />
                <Text style={styles.greyButtonText}>x</Text>
                <Text style={styles.greyButtonText}>1</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.container}>
              <View style={styles.commentContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if (userid === comment.commentUserId) {
                      NavigationService.navigate('My', {
                        backRoute: 'ProfileComments'
                      });
                    } else if (
                      comment.commentUserInfo.profileStatus === 'public'
                    ) {
                      if (comment.likes.hasOwnProperty('status')) {
                        if (comment.likes.status === 'accepted') {
                          NavigationService.navigate('ProfileMatched', {
                            id: comment.commentUserId,
                            backRoute: 'ProfileComments'
                          });
                        } else {
                          NavigationService.navigate('ProfileSendLikeCoffee', {
                            id: comment.commentUserId,
                            backRoute: 'ProfileComments'
                          });
                        }
                      } else {
                        NavigationService.navigate('ProfileSendLikeCoffee', {
                          id: comment.commentUserId,
                          backRoute: 'ProfileComments'
                        });
                      }
                    } else if (
                      comment.profileRequests.length > 0 &&
                      comment.profileRequests[0].hasOwnProperty('status')
                    ) {
                      if (comment.profileRequests[0].status === 'pending') {
                        Alert.alert(
                          t('common:app.error'),
                          t('vibeDetailScreen:notAccepted')
                        );
                      } else if (
                        comment.profileRequests[0].status === 'rejected'
                      ) {
                        Alert.alert(
                          t('common:app.error'),
                          t('vibeDetailScreen:rejected')
                        );
                      } else if (
                        comment.profileRequests[0].status === 'accepted'
                      ) {
                        if (
                          comment.likes.length > 0 &&
                          comment.likes[0].hasOwnProperty('status')
                        ) {
                          if (comment.likes[0].status === 'accepted') {
                            NavigationService.navigate('ProfileMatched', {
                              id: comment.commentUserId,
                              backRoute: 'ProfileComments'
                            });
                          } else {
                            NavigationService.navigate('ProfileSendLikeCoffee', {
                              id: comment.commentUserId,
                              backRoute: 'ProfileComments'
                            });
                          }
                        } else {
                          NavigationService.navigate('ProfileSendLikeCoffee', {
                            id: comment.commentUserId,
                            backRoute: 'ProfileComments'
                          });
                        }
                      }
                    } else {
                      setshowProfile(true);
                      setreceiverId(comment.commentUserId);
                      setmomentVibeId(comment.momentOrVibeId);
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
                    source={{ uri: comment.commentUserInfo.photos[0].url }}
                  // source={{
                  //   uri:
                  //     comment.commentUserInfo.length > 0
                  //       ? comment.commentUserInfo.photos[0].url
                  //       : ''
                  // }}
                  />

                  {(comment.commentUserInfo.profileStatus !== 'public' ||
                    (comment.profileRequests.hasOwnProperty('status') &&
                      comment.profileRequests[0].status !== 'accepted')) &&
                    userid != comment.commentUserId ? (
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

                <Text style={styles.commentText}>{comment.commentBody}</Text>
                {userid != comment.commentUserId ? (
                  <TouchableOpacity
                    style={styles.commentIconWrapper}
                    onPress={() => NavigationService.navigate('Report', {
                      type: 'Comment',
                      vibeOrMomentId: comment._id
                    })}
                  >
                    <Image style={styles.reportButton} source={ReportIcon} />
                  </TouchableOpacity>
                ) : (
                    <Text style={{ width: 20, height: 14 }} />
                  )}
              </View>
              <View style={styles.footerContainer}>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                    borderWidth: 0
                  }}
                />
                <View
                  style={{
                    marginLeft: 0,
                    width: '85%',
                    paddingLeft: 10,
                    flexDirection: 'row'
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      props.replyPressed(comment._id);
                    }}
                  >
                    <Text style={styles.replyButton}>
                      {t('common:app.reply')}
                    </Text>
                  </TouchableOpacity>

                  {comment.ownerId == userid ||
                    userid == comment.commentUserId ? (
                      <TouchableOpacity
                        onPress={() => {
                          this.deleteAlert(comment);
                        }}
                      >
                        <Text style={styles.deleteButton}>
                          {t('common:app.delete')}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <Text />
                    )}
                </View>
                {/* <View style={{ marginRight: 0 }}>
               
              </View> */}
              </View>
            </View>
            {comment.reply.map((value, index) => {
              return (
                <View>
                  <ReplyComment
                    t={t}
                    onPressed={{
                      replyPressed: () => {
                        props.replyPressed(comment._id);
                      }
                    }}
                    reply={value}
                    key={index}
                    deletePressed={props.deletePressed}
                    userid={userid}
                    ownerId={comment.ownerId}
                    paymentData={paymentData}
                  />
                </View>
              );
            })}
          </View>
        )}
    </View>
  );
}
export default withNamespaces(['common'], { wait: true })(OpenComment);
