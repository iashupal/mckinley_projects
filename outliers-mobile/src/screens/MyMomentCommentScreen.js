import React, { Fragment, Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  BackHandler
} from "react-native";

import TopBarHeader from "@components/TopBarHeader";
import MomentProfile from "@components/MomentProfile";

import Modal from "@components/CustomModal";

import icClover from "@assets/images/ic_clover.png";

import config from "@src/config";

import { connect } from "react-redux";
import {
  initiateListMomentDetails,
  initiateMomentVibeComments,
  addMomentVibeComment,
  addMomentVibeCommentReply,
  setAddMomentVibeCommentsStatus
} from "../store/actions";
import WithLoaderStatus from "../components/HOC/withLoaderStatus";
import Comments from "@components/Comments";
import { withNamespaces } from "react-i18next";

class MyMomentCommentScreen extends Component {
  textRef;
  constructor(props) {
    super(props);
    this.state = {
      showProfile: false,
      listMomentDetails: {},
      comments: [],
      userPhotos: [],
      listMomentDetailsLoaded: false,
      text: "",
      newComment: {
        commentBody: "",
        ownerId: props.navigation.getParam("ownerId", ""),
        momentOrVibeId: props.navigation.getParam("id", "")
      },
      newReply: {
        replyBody: "",
        commentId: ""
      },
      replyMode: false
    };
  }

  async componentDidMount() {
    const id = this.props.navigation.getParam("id", "");
    const getParams = {
      id,
      latitude: this.props.navigation.getParam("latitude", ""),
      longitude: this.props.navigation.getParam("longitude", ""),
      ownerId: this.props.navigation.getParam("ownerId", "")
    };
    this.props.initiateListMomentDetails(getParams);
    this.props.initiateMomentVibeComments({ id, offset: 0, limit: 20 });
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack(null);
      return true;
    });
  }

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
        id: this.props.navigation.getParam("id", ""),
        offset: 0,
        limit: 20
      });
    }
    this.setState({ userPhotos: nextProps.userPhotos });
  }

  addNewCommentOrReply = () => {
    this.textRef.blur();

    if (!this.state.text) {
      alert(this.props.t("myMomentCommenScr:enterComment"));
      return;
    } else if (this.state.replyMode) {
      this.setState(
        {
          newReply: {
            ...this.state.newReply,
            replyBody: this.state.text,
            type: "moment"
          },
          replyMode: false
        },
        () => {
          this.props.addMomentVibeCommentReply(this.state.newReply);
          this.setState({ text: "" });
        }
      );
    } else {
      this.setState(
        {
          newComment: {
            ...this.state.newComment,
            commentBody: this.state.text,
            type: "moment"
          }
        },
        () => {
          this.props.addMomentVibeComment(this.state.newComment);
          this.setState({ text: "" });
        }
      );
    }
  };

  replyPressed = id => {
    this.textRef.focus();
    this.setState({ replyMode: true, newReply: { commentId: id } });
  };
  render() {
    const { showProfile, listMomentDetails } = this.state;
    return (
      <Fragment>
        <TopBarHeader
          action="close"
          onProfileView={() => {
            this.props.navigation.navigate("ProfileViewRequest");
          }}
          onDelete={() => {
            //TODO: DELETE POST
          }}
          onDeleteText={this.props.t("myMomentCommenScr:delete")}
          isMyCommentScreen={this.props.t("myMomentCommenScr:moreApplicants")}
        />
        <View style={styles.momentProfileContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            {this.state.listMomentDetailsLoaded && (
              <MomentProfile
                uri={
                  this.state.userPhotos[listMomentDetails.Body[0].imageIndex]
                    .url
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
          {/* <ActionButton
            customStyle={{
              touchableStyle: styles.actionButton,
              buttonTextStyle: styles.actionButtonText,
            }}
            onPress1={() => {
              this.setState({ showProfile: true })
            }}
            text={'프로필 더보기'}
          /> */}
        </View>
        <View
          style={{
            width: "100%",
            height: 8,
            backgroundColor: config.divide
          }}
        />
        <View style={styles.commentCountContainer}>
          <Text style={styles.commentCountText}>
            {this.props.t("myMomentCommenScr:comment")}{" "}
            <Text style={styles.commentCountNumberText}>
              {this.state.comments.length}
            </Text>
          </Text>
        </View>
        <Comments
          comments={this.state.comments}
          replyPressed={this.replyPressed}
        />
        <View style={styles.leaveCommentContainer}>
          <View style={styles.leaveComment}>
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder={t("profileCommentScreen:writeComment")}
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
                ref={ref => (this.textRef = ref)}
              />
            </View>
            <TouchableOpacity
              style={styles.commentButton}
              onPress={() => {
                this.addNewCommentOrReply();
              }}
            >
              <Text style={styles.commentButtonText}>
                {this.props.t("common:app.confirm")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  cloveText: {
    fontFamily: config.refularFont,
    fontSize: 18,
    fontWeight: "300",
    fontStyle: "normal",
    lineHeight: 24,
    letterSpacing: 0,
    color: config.navyBlack
  },
  cloveImage: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
    resizeMode: "contain",
    tintColor: config.navyBlack
  },
  cloveContainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 12,
    width: 131,
    height: 36,
    borderRadius: 25,
    backgroundColor: config.paleGrey
  },
  textHeader: {
    fontFamily: config.regularFont,
    fontStyle: "normal",
    marginBottom: 4,
    letterSpacing: 0,
    textAlign: "center",
    color: config.black,
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22
  },
  innerModalContainer: {
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  commentCountNumberText: {
    fontFamily: config.refularFont,
    fontSize: 13,
    fontWeight: "600",
    fontStyle: "normal",
    letterSpacing: 0,
    color: config.brownishGrey
  },
  momentContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  momentProfileContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  },
  actionButton: {
    width: config.component_width,
    height: 46,
    borderRadius: 3,
    backgroundColor: config.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: config.btnLine
  },
  actionButtonText: {
    fontWeight: "bold",
    fontSize: 18,
    color: config.black
  },
  commentCountContainer: {
    backgroundColor: "white",
    borderBottomColor: config.whiteTwo,
    borderBottomWidth: 1
  },
  commentCountText: {
    marginHorizontal: 20,
    marginVertical: 7,
    fontFamily: config.refularFont,
    fontSize: 13,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    color: config.lightGrey
  },
  leaveCommentContainer: {
    height: 64,
    borderTopWidth: 1,
    borderTopColor: "#afafaf"
  },
  leaveComment: {
    marginTop: 10,
    marginBottom: 12,
    marginLeft: 9,
    marginRight: 9,
    flexDirection: "row"
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
    width: "100%",
    color: "black",
    height: 44
  },
  commentButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  commentButtonText: {
    fontFamily: "NotoSansKR-Bold",
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
    status: state.momentVibeComments.status
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
    setAddMomentVibeCommentsStatus: status =>
      dispatch(setAddMomentVibeCommentsStatus(status))
  };
};

const MyMomentCommentScreenHOC = connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoaderStatus(MyMomentCommentScreen));

export default withNamespaces(["common", "myMomentCommenScr"], {
  wait: true
})(MyMomentCommentScreenHOC);
