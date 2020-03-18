import React, { Fragment, Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  BackHandler
} from 'react-native';

import TopBarHeader from '@components/TopBarHeader';
import MomentProfile from '@components/MomentProfile';
import ActionButton from '@components/ActionButton';
import api from '@services/MomentVibeCommentsApiService';
import Modal from '@components/CustomModal';
import AuthActions from '../store/redux/auth';
import icClover from '@assets/images/ic_clover.png';
import lockVibe from '@assets/images/icLockPhoto.png';
import storeAPI from '@services/storeApiService';
import config from '@src/config';

import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import {
  initiateListMomentDetails,
  initiateMomentVibeComments,
  addMomentVibeComment,
  addMomentVibeCommentReply,
  addMomentVibeFollow,
  addMomentVibeUnFollow,
  sendProfileLikeCoffee
} from '../store/actions';
import WithLoaderStatus from '../components/HOC/withLoaderStatus';
import Comments from '@components/Comments';

const { width, height } = Dimensions.get('window');
const keyboardVerticalOffset = Platform.OS === 'ios' ? 0 : 0;

class MomentsDetailScreen extends Component {
  textRef;
  getParams: {};

  willFocusSubscription;
  constructor(props) {
    super(props);

    this.state = {
      showProfile: false,
      listMomentDetails: {},
      comments: [],
      userPhotos: [],
      listMomentDetailsLoaded: false,
      text: '',
      newComment: {
        commentBody: '',
        ownerId: props.navigation.getParam('ownerId', ''),
        momentOrVibeId: props.navigation.getParam('id', '')
      },
      newReply: {
        replyBody: '',
        commentId: ''
      },
      replyMode: false,
      userid: '',
      userLavel: null,
      paymentData: []
    };
  }

  async componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.fetchData();
        this.getDetail();
      }
    );
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }
  getDetail = async () => {
    const token = await AsyncStorage.getItem('@token:key');
    const paymentResponse = await storeAPI.getPaymentInfo(token);
    if (paymentResponse.status === 200) {
      this.setState({ paymentData: paymentResponse.data.Body });
    }
  };
  fetchData = async () => {
    const id = this.props.navigation.getParam('id', '');
    this.getParams = {
      id,
      latitude: this.props.navigation.getParam('latitude', ''),
      longitude: this.props.navigation.getParam('longitude', ''),
      ownerId: this.props.navigation.getParam('ownerId', '')
    };
    let userid = await AsyncStorage.getItem('@userid:key');
    let userLevel = await AsyncStorage.getItem('@userLevel:key');
    // console.log("get user level", userLevel);
    this.setState({ userid: userid, mid: id, userLevel: userLevel }, () => {
      this.props.initiateListMomentDetails(this.getParams);
      this.props.initiateMomentVibeComments({ id, offset: 0, limit: 20 });
    });
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.listMomentDetails != nextProps.listMomentDetails) {
      this.setState({
        listMomentDetails: nextProps.listMomentDetails,
        listMomentDetailsLoaded: true
      });
    }
    if (this.props.comments != nextProps.comments) {
      this.setState({ comments: nextProps.comments });
    }
    if (
      this.props.status.status != nextProps.status.status &&
      nextProps.status.status == 2
    ) {
      this.props.initiateMomentVibeComments({
        id: this.props.navigation.getParam('id', ''),
        offset: 0,
        limit: 80
      });
    }
    if (
      (this.props.momentVibeFollowStatus.status !=
        nextProps.momentVibeFollowStatus.status &&
        nextProps.momentVibeFollowStatus.status == 2) ||
      (this.props.momentVibeUnFollowStatus.status !=
        nextProps.momentVibeUnFollowStatus.status &&
        nextProps.momentVibeFollowStatus.status == 2)
    ) {
      this.props.initiateListMomentDetails(this.getParams);
    }
    if (
      this.props.profileLikeCoffeeStatus.status !=
      nextProps.profileLikeCoffeeStatus.status &&
      nextProps.profileLikeCoffeeStatus.status == 2
    ) {
      Alert.alert(this.props.t('profileCommentScreen:requestSend'));
      nextProps.listMomentDetails.profileRequest.status = 'pending';
      /*this.props.navigation.navigate("ProfileSendLikeCoffee", {
        id: nextProps.listMomentDetails.Body[0].owner,
        backRoute: "MomentsDetail"
      });*/
    }
    this.setState({ userPhotos: nextProps.userPhotos });
  }

  addNewCommentOrReply = () => {
    this.textRef.blur();

    if (!this.state.text) {
      alert(this.props.t('myMomentCommenScr:enterComment'));
      return;
    } else if (this.state.replyMode) {
      this.setState(
        {
          newReply: {
            ...this.state.newReply,
            replyBody: this.state.text,
            type: 'moment'
          },
          replyMode: false
        },
        () => {
          this.props.addMomentVibeCommentReply(this.state.newReply);
          this.setState({ text: '' });
        }
      );
    } else {
      this.setState(
        {
          newComment: {
            ...this.state.newComment,
            commentBody: this.state.text,
            type: 'moment'
          }
        },
        () => {
          this.props.addMomentVibeComment(this.state.newComment);
          this.setState({ text: '' });
        }
      );
    }
  };

  replyPressed = id => {
    this.textRef.focus();
    this.setState({ replyMode: true, newReply: { commentId: id } });
  };

  deletePressed = async (type, id) => {
    let token = await AsyncStorage.getItem('@token:key');
    const mid = this.state.mid;
    if (type === 'comment') {
      const response = await api.deleteMomentVibeComment(token, id);
      if (response.status === 200) {
        //this.setState({ deleted: Math.random() });
        // this.props.initiateMomentVibeComments({ mid, offset: 0, limit: 80 });
        alert(this.props.t('profileCommentScreen:commentdeleted'));
        this.props.initiateMomentVibeComments({
          id: mid,
          offset: 0,
          limit: 80
        });
      }
    } else if (type === 'reply') {
      const response = await api.deleteMomentVibeCommentReply(token, id);
      if (response.status === 200) {
        //this.props.initiateMomentVibeComments({ mid, offset: 0, limit: 80 });
        alert(this.props.t('profileCommentScreen:replydeleted'));
        this.props.initiateMomentVibeComments({
          id: mid,
          offset: 0,
          limit: 80
        });
      }
    }
  };
  // View comment
  viewComment = async cid => {
    const { t } = this.props;
    const mid = this.state.mid;
    let token = await AsyncStorage.getItem('@token:key');
    //console.log("Requested comment id", cid);
    const response = await api.viewComment(token, { commentId: cid });
    console.log('recived resposne', typeof response.data.Body);
    if (response.data.Body == "YOU_DON'T_HAVE_ENOUGH_CLOVERS") {
      Alert.alert(t('common:app.notHaveCoupon'));
    }
    if (response.status === 200) {
      Alert.alert(t('common:app.unlockComment'));
      this.props.initiateMomentVibeComments({
        id: mid,
        offset: 0,
        limit: 80
      });
    }
  };
  render() {
    const { showProfile, listMomentDetails } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <Modal
          transparent={true}
          visible={showProfile}
          hasTwo
          onPress1={() => {
            this.setState({ showProfile: false });
          }}
          buttonText1={t('vibeDetailScreen:requestUserModal.btnOneText')}
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
              !!this.state.paymentData[0] &&
              !!this.state.paymentData[0].cloversleft &&
              this.state.paymentData[0].cloversleft > 0
            ) {
              const token = await AsyncStorage.getItem('@token:key');
              this.props.sendProfileLikeCoffee({
                receiverId: listMomentDetails.Body[0].owner,
                sentType: 'request',
                message: ''
              });

              await storeAPI.updatePaymentInfo(token, {
                id:
                  !!this.state.paymentData[0] &&
                  !!this.state.paymentData[0]._id &&
                  this.state.paymentData[0]._id,
                cloversleft: JSON.stringify(
                  parseInt(
                    !!this.state.paymentData[0] &&
                    !!this.state.paymentData[0].cloversleft &&
                    this.state.paymentData[0].cloversleft
                  ) - 2
                )
              });
              if (this.state.listMomentDetailsLoaded) {
                listMomentDetails.profileRequests = {};
                listMomentDetails.profileRequests.status = 'pending';
                listMomentDetails.profileRequests.receiverId =
                  listMomentDetails.Body[0].owner;
                listMomentDetails.profileRequests.senderId = this.state.userid;
                listMomentDetails.profileRequests.sentType = 'request';
              }
            } else {
              Alert.alert(
                t('common:app.error'),
                t('vibeDetailScreen:notEngClv')
              );
              this.props.navigation.navigate('Store');
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
        <TopBarHeader action='close' />
        <View style={styles.momentProfileContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            {this.state.listMomentDetailsLoaded && (
              <MomentProfile
                uri={
                  !!listMomentDetails.user.photos[
                  listMomentDetails.Body[0].imageIndex
                  ] &&
                  listMomentDetails.user.photos[
                    listMomentDetails.Body[0].imageIndex
                  ].url
                }
                distance={listMomentDetails.Body[0].dist.calculated}
                description={listMomentDetails.Body[0].description}
                dob={listMomentDetails.user.dob}
                createdAt={listMomentDetails.Body[0].createdAt}
                level={listMomentDetails.user.level}
                org={listMomentDetails.user.college}
              />
            )}
          </View>
          {this.state.listMomentDetailsLoaded &&
            listMomentDetails.Body[0].owner !== this.state.userid ? (
              <View>
                <ActionButton
                  customStyle={{
                    touchableStyle: styles.actionButton,
                    buttonTextStyle: styles.actionButtonText
                  }}
                  onPress1={() => {
                    if (listMomentDetails.user.profileStatus === 'public') {
                      if (
                        listMomentDetails.likeRequest.hasOwnProperty('status')
                      ) {
                        if (listMomentDetails.likeRequest.status === 'accepted') {
                          this.props.navigation.navigate('ProfileMatched', {
                            id: listMomentDetails.Body[0].owner,
                            backRoute: 'MomentsDetail'
                          });
                        } else {
                          this.props.navigation.navigate(
                            'ProfileSendLikeCoffee',
                            {
                              id: listMomentDetails.Body[0].owner,
                              backRoute: 'MomentsDetail'
                            }
                          );
                        }
                      } else {
                        this.props.navigation.navigate('ProfileSendLikeCoffee', {
                          id: listMomentDetails.Body[0].owner,
                          backRoute: 'MomentsDetail'
                        });
                      }
                    } else if (
                      listMomentDetails.profileRequest.hasOwnProperty('status')
                    ) {
                      if (listMomentDetails.profileRequest.status === 'pending') {
                        Alert.alert(
                          t('common:app.error'),
                          t('vibeDetailScreen:notAccepted')
                        );
                      } else if (
                        listMomentDetails.profileRequest.status === 'rejected'
                      ) {
                        Alert.alert(
                          t('common:app.error'),
                          t('vibeDetailScreen:rejected')
                        );
                      } else if (
                        listMomentDetails.profileRequest.status === 'accepted'
                      ) {
                        if (
                          listMomentDetails.likeRequest.hasOwnProperty('status')
                        ) {
                          if (
                            listMomentDetails.likeRequest.status === 'accepted'
                          ) {
                            this.props.navigation.navigate('ProfileMatched', {
                              id: listMomentDetails.Body[0].owner,
                              backRoute: 'MomentsDetail'
                            });
                          } else {
                            this.props.navigation.navigate(
                              'ProfileSendLikeCoffee',
                              {
                                id: listMomentDetails.Body[0].owner,
                                backRoute: 'MomentsDetail'
                              }
                            );
                          }
                        } else {
                          this.props.navigation.navigate(
                            'ProfileSendLikeCoffee',
                            {
                              id: listMomentDetails.Body[0].owner,
                              backRoute: 'MomentsDetail'
                            }
                          );
                        }
                      }
                    } else {
                      this.setState({
                        showProfile: true
                      });
                    }
                  }}
                  // text={'프로필 더보기'}
                  text={'My Profile'}
                />
                {/* <ActionButton
                customStyle={{
                  touchableStyle: styles.actionButton,
                  buttonTextStyle: styles.actionButtonText
                }}
                onPress1={() => {
                  if (listMomentDetails.isFollow) {
                    this.props.addMomentVibeUnFollow({
                      id: listMomentDetails.Body[0]._id,
                      unfollowTo: "moment"
                    });
                  } else {
                    //alert(listMomentDetails.Body[0].owner);
                    this.props.addMomentVibeFollow({
                      id: listMomentDetails.Body[0]._id,
                      followTo: "moment"
                    });
                  }
                }}
                text={listMomentDetails.isFollow ? 'Unfollow' : 'Follow'}
              /> */}
              </View>
            ) : (
              <View />
            )}
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : null}
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={{ flex: 1 }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                height: Dimensions.get('window').height * 0.6
              }}
            >
              <View style={styles.commentCountContainer}>
                <Text style={styles.commentCountText}>
                  {t('profileCommentScreen:comment')}{' '}
                  <Text style={styles.commentCountNumberText}>
                    {this.state.comments.length}
                  </Text>
                </Text>
              </View>

              <Comments
                t={t}
                comments={this.state.comments}
                replyPressed={this.replyPressed}
                deletePressed={this.deletePressed}
                userid={this.state.userid}
                userLevel={this.state.userLevel}
                viewComment={this.viewComment}
              />
              <View style={styles.leaveCommentContainer}>
                <View style={styles.leaveComment}>
                  <View style={styles.commentInputContainer}>
                    <TextInput
                      style={styles.commentInput}
                      placeholder={t('profileCommentScreen:writeComment')}
                      onChangeText={text => this.setState({ text })}
                      value={this.state.text}
                      ref={ref => (this.textRef = ref)}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.commentButton}
                    onPress={() => this.addNewCommentOrReply()}
                  >
                    {/* <Text style={styles.commentButtonText}>확인</Text> */}
                    <Text style={styles.commentButtonText}>Send</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  cloveText: {
    fontFamily: config.refularFont,
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    color: config.navyBlack
  },
  cloveImage: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    resizeMode: 'contain',
    tintColor: config.navyBlack
  },

  cloveTextWhite: {
    fontFamily: config.refularFont,
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'normal',
    lineHeight: 24,
    letterSpacing: 0,
    color: config.white
  },
  cloveImageWhite: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    resizeMode: 'contain',
    tintColor: config.navyWhite
  },
  cloveContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 12,
    width: 131,
    height: 36,
    borderRadius: 25,
    backgroundColor: config.paleGrey
  },
  textHeader: {
    fontFamily: config.regularFont,
    fontStyle: 'normal',
    marginBottom: 4,
    letterSpacing: 0,
    textAlign: 'center',
    color: config.black,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22
  },
  innerModalContainer: {
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  commentCountNumberText: {
    fontFamily: config.refularFont,
    fontSize: 13,
    fontWeight: '600',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: config.brownishGrey
  },
  momentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  momentProfileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  actionButton: {
    width: config.component_width,
    height: 46,
    borderRadius: 3,
    backgroundColor: config.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: config.btnLine
  },
  actionButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: config.black
  },
  commentCountContainer: {
    backgroundColor: 'white',
    borderBottomColor: config.whiteTwo,
    borderBottomWidth: 1
  },
  commentCountText: {
    marginHorizontal: 20,
    marginVertical: 7,
    fontFamily: config.refularFont,
    fontSize: 13,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 0,
    color: config.lightGrey,
    textTransform: 'capitalize'
  },
  leaveCommentContainer: {
    height: 64,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8'
  },
  leaveComment: {
    marginTop: 10,
    marginBottom: 12,
    marginLeft: 9,
    marginRight: 9,
    flexDirection: 'row'
  },
  commentInputContainer: {
    flex: 4,
    borderWidth: 1,
    borderColor: config.whiteTwo,
    backgroundColor: config.white_grey,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    paddingHorizontal: 12
  },
  commentInput: {
    width: '100%',
    color: 'black',
    height: 44
  },
  commentButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  commentButtonText: {
    fontFamily: 'NotoSansKR-Bold',
    color: config.charcoal_grey,
    fontSize: 14
  }
});

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    listMomentDetails: state.moments.listMomentDetails,
    userPhotos: state.auth.user.photos,
    comments: state.momentVibeComments.currentComments,
    status: state.momentVibeComments.status,
    momentVibeFollowStatus: state.momentVibeComments.momentVibeFollowStatus,
    momentVibeUnFollowStatus: state.momentVibeComments.momentVibeUnFollowStatus,
    profileLikeCoffeeStatus: state.profile.profileLikeCoffeeStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initiateListMomentDetails: location =>
      dispatch(initiateListMomentDetails(location)),
    initiateMomentVibeComments: params =>
      dispatch(initiateMomentVibeComments(params)),
    addMomentVibeComment: comment => dispatch(addMomentVibeComment(comment)),
    addMomentVibeCommentReply: reply =>
      dispatch(addMomentVibeCommentReply(reply)),
    addMomentVibeFollow: moment => dispatch(addMomentVibeFollow(moment)),
    addMomentVibeUnFollow: moment => dispatch(addMomentVibeUnFollow(moment)),
    sendProfileLikeCoffee: profile => dispatch(sendProfileLikeCoffee(profile))
  };
};

const MomentsDetailScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(MomentsDetailScreen));

export default withNamespaces(['common', 'vibeDetailScreen'], {
  wait: true
})(MomentsDetailScreenHOC);
