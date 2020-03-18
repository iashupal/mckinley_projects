import React, { Fragment, Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  AsyncStorage,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  BackHandler
} from 'react-native';

import TopBarHeader from '@components/TopBarHeader';
import MomentProfile from '@components/MomentProfile';
import ActionButton from '@components/ActionButton';

import Modal from '@components/CustomModal';

import icClover from '@assets/images/ic_clover.png';
import api from '@services/MomentVibeCommentsApiService';
import config from '@src/config';

import { connect } from 'react-redux';
import {
  initiateMomentVibeComments,
  addMomentVibeComment,
  addMomentVibeCommentReply,
  setAddMomentVibeCommentsStatus,
  deleteMomentVibeCommentReply
} from '../store/actions';
import WithLoaderStatus from '../components/HOC/withLoaderStatus';
import Comments from '@components/Comments';
import { withNamespaces } from 'react-i18next';

const { width, height } = Dimensions.get('window');
const keyboardVerticalOffset = Platform.OS === 'ios' ? 10 : 0;

class ProfileComments extends Component {
  textRef;
  constructor(props) {
    super(props);
    this.state = {
      showProfile: false,
      comments: [],
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
      deleteReply: {
        commentId: ''
      },
      mid: '',
      userid: '',
      userLevel: null
    };
  }

  async componentDidMount() {
    let userid = await AsyncStorage.getItem('@userid:key');
    let userLevel = await AsyncStorage.getItem('@userLevel:key');
    this.setState({ userid: userid }, () => {
      const id = this.props.navigation.getParam('id', '');
      this.setState({ mid: id, userLevel: userLevel });
      this.props.initiateMomentVibeComments({ id, offset: 0, limit: 80 });
    });
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

  componentWillReceiveProps(nextProps) {
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
            type: 'vibe'
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
            type: 'vibe'
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
        this.props.initiateMomentVibeComments({
          id: mid,
          offset: 0,
          limit: 80
        });
        alert(this.props.t('profileCommentScreen:commentdeleted'));
        // this.props.dispatch(
        //     initiateMomentVibeComments({ mid, offset: 0, limit: 80 })
        // );
      }
    } else if (type === 'reply') {
      const response = await api.deleteMomentVibeCommentReply(token, id);
      if (response.status === 200) {
        this.props.initiateMomentVibeComments({
          id: mid,
          offset: 0,
          limit: 80
        });
        alert(this.props.t('profileCommentScreen:replydeleted'));
        // this.props.dispatch(
        //     initiateMomentVibeComments({ mid, offset: 0, limit: 80 })
        // );
      }
    }
  };
  // View comment
  viewComment = async cid => {
    const { t } = this.props;
    const mid = this.state.mid;
    let token = await AsyncStorage.getItem('@token:key');
    const response = await api.viewComment(token, { commentId: cid });
    if (
      response.status === 400 &&
      response.data.Body === "YOU_DON'T_HAVE_ENOUGH_CLOVERS"
    ) {
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
    const { showProfile } = this.state;
    const { t } = this.props;
    return (
      <Fragment>
        <TopBarHeader
          sectionTitle={t('profileCommentScreen:header', {
            value: this.state.comments.length
          })}
          action={'back'}
        // action="close"
        // rightNavIcon={BlockIcon}
        // onPressRightAction={() => {
        //   setModal (!modalVisible);
        // }}
        />
        {/* <View style={styles.momentProfileContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <MomentProfile />
        </View>
        <ActionButton
          customStyle={{
            touchableStyle: styles.actionButton,
            buttonTextStyle: styles.actionButtonText,
          }}
          onPress1={() => {
            setShowProfile (true);
          }}
          text={'프로필 더보기'}
        />
      </View> */}
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: config.divide
          }}
        />
        {/* <View style={styles.commentCountContainer}>
        <Text style={styles.commentCountText}>
          댓글 <Text style={styles.commentCountNumberText}>
            24
          </Text>
        </Text>
      </View> */}

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : null}
          keyboardVerticalOffset={keyboardVerticalOffset}
          style={{ flex: 1 }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                height: Dimensions.get('window').height * 0.8
              }}
            >
              <Comments
                t={t}
                comments={this.state.comments}
                replyPressed={this.replyPressed}
                deletePressed={this.deletePressed}
                userid={this.state.userid}
                userLevel={this.state.userLevel}
                viewComment={this.viewComment}
                refreshCommentList={this.refreshCommentList}
              />
            </View>
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
                  <Text style={styles.commentButtonText}>
                    {t('common:app.confirm')}
                  </Text>
                </TouchableOpacity>
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
    color: config.lightGrey
  },
  leaveCommentContainer: {
    flex: 1,
    // height: Dimensions.get('window').height * 0.3,
    borderTopWidth: 1,
    borderTopColor: '#afafaf',
    justifyContent: 'flex-end'
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
    owner: state.auth.user._id,
    comments: state.momentVibeComments.currentComments,
    status: state.momentVibeComments.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initiateMomentVibeComments: params =>
      dispatch(initiateMomentVibeComments(params)),
    addMomentVibeComment: comment => dispatch(addMomentVibeComment(comment)),
    addMomentVibeCommentReply: reply =>
      dispatch(addMomentVibeCommentReply(reply)),
    deleteMomentVibeCommentReply: del =>
      dispatch(deleteMomentVibeCommentReply(del)),
    setAddMomentVibeCommentsStatus: status =>
      dispatch(setAddMomentVibeCommentsStatus(status))
  };
};

const ProfileCommentsHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(ProfileComments));

export default withNamespaces(['common', 'profileCommentScreen'], {
  wait: true
})(ProfileCommentsHOC);
