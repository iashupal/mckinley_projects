import * as momentVibeCommentsTypes from "./types/momentVibeCommentsActionTypes";

export const initiateMomentVibeComments = params => {
  return {
    type: momentVibeCommentsTypes.INITIATE_MOMENT_VIBE_COMMENTS,
    params
  };
};

export const setMomentVibeComments = comments => {
  return {
    type: momentVibeCommentsTypes.SET_MOMENT_VIBE_COMMENTS_LIST,
    comments
  };
};

export const addMomentVibeComment = comment => {
  return {
    type: momentVibeCommentsTypes.ADD_MOMENT_VIBE_COMMENT,
    comment
  };
};

export const addMomentVibeCommentReply = reply => {
  return {
    type: momentVibeCommentsTypes.ADD_MOMENT_VIBE_COMMENT_REPLY,
    reply
  };
};

export const deleteMomentVibeCommentReply = del => {
  return {
    type: momentVibeCommentsTypes.DELETE_MOMENT_VIBE_COMMENT_REPLY,
    del
  };
};

export const setAddMomentVibeCommentsStatus = status => {
  return {
    type: momentVibeCommentsTypes.SET_ADD_MOMENT_VIBE_COMMENTS_STATUS,
    status
  };
};

export const addMomentVibeFollow = momentVibe => {
  return {
    type: momentVibeCommentsTypes.ADD_MOMENT_VIBE_FOLLOW,
    momentVibe
  };
};

export const setAddMomentVibeFollowStatus = status => {
  return {
    type: momentVibeCommentsTypes.SET_ADD_MOMENT_VIBE_FOLLOW_STATUS,
    momentVibeFollowStatus: status
  };
};

export const addMomentVibeUnFollow = momentVibe => {
  return {
    type: momentVibeCommentsTypes.ADD_MOMENT_VIBE_UN_FOLLOW,
    momentVibe
  };
};

export const setAddMomentVibeUnFollowStatus = status => {
  return {
    type: momentVibeCommentsTypes.SET_ADD_MOMENT_VIBE_UN_FOLLOW_STATUS,
    momentVibeFollowStatus: status
  };
};
