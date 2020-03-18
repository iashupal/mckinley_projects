import { takeLatest, all, takeEvery } from "redux-saga/effects";

import { AuthTypes } from "../redux/auth";
import * as momentTypes from "../actions/types/momentActionTypes";
import * as vibeTypes from "../actions/types/vibeActionTypes";
import * as momentVibeCommentsTypes from "../actions/types/momentVibeCommentsActionTypes";
import * as profileTypes from "../actions/types/profileActionTypes";
import * as storeTypes from "../actions/types/storeActionTypes";
import * as donationTypes from "../actions/types/donationActionTypes";

import {
  initiateLaunch,
  initiateAuthSaga,
  invalidateTokenSaga,
  initiateUserProfileUpdate,
  requestOTP,
  savePhone,
  initiateGetUserDetails,
  initiateDeleteUser
} from "./auth";

import {
  initiateMomentUpload,
  initiateMomentList,
  initiateMyMomentList,
  initiateMomentListDetails
} from "./moments";

import {
  initiateVibeUpload,
  initiateVibeList,
  initiateMyVibeList,
  initiateVibeListDetails,
  hideUserDetails,
  blockUserDetails,
  followVibe,
  getUserVibeList,
  getMatchedVibesList,
  fetchTagsSearch,
  initiateSetRecentSearch,
  initiateFollowVibeUser,
  initiateGetFollowingList,
  initiateGetBlockedUser,
  initiateUnblockUser,
  initiateReportUser
} from "./vibes";

import {
  initiateMomentVibeComments,
  addMomentVibeComment,
  addMomentVibeCommentReply,
  addMomentVibeFollow,
  addMomentVibeUnFollow
} from "./momentVibeComments";

import {
  initiateGetPaymentInfo,
  initiateSetPaymentInfo,
  initiateUpdatePaymentInfo
} from "./store";

import { initiateDonation } from "./donation";

import {
  sendProfileLikeCoffee,
  getProfileById,
  getProfileNotification,
  getProfileMatchHistory,
  initiateAppearanceVerification,
  addRequestStatus,
  getProfilePreference,
  updateProfilePreference,
  initiateUpdateSeenStatus,
  getCoffeeCoupon,
  redeemCoupon
} from "./profile";

export function* watchAuth() {
  yield all([
    takeEvery(AuthTypes.INITIATE_CHECK_ON_LAUNCH, initiateLaunch),
    takeLatest(AuthTypes.AUTH_USER, initiateAuthSaga),
    takeLatest(AuthTypes.UPDATE_USER_PROFILE, initiateUserProfileUpdate),
    takeLatest(AuthTypes.REQUEST_OTP, requestOTP),
    takeLatest(AuthTypes.INVALIDATE_TOKEN, invalidateTokenSaga),
    takeLatest(AuthTypes.INITIATE_ADD_PHONE, savePhone),
    takeLatest(AuthTypes.GET_USER_PROFILE, initiateGetUserDetails),
    takeLatest(AuthTypes.DELETE_USER, initiateDeleteUser)
  ]);
}

export function* watchMoment() {
  yield all([
    takeLatest(momentTypes.INITIATE_MOMENT_UPLOAD, initiateMomentUpload),
    takeLatest(momentTypes.INITIATE_MOMENT_LIST, initiateMomentList),
    takeLatest(momentTypes.INITIATE_MY_MOMENT_LIST, initiateMyMomentList),
    takeLatest(
      momentTypes.INITIATE_MOMENT_LIST_DETAILS,
      initiateMomentListDetails
    )
  ]);
}

export function* watchVibe() {
  yield all([
    takeLatest(vibeTypes.INITIATE_VIBE_UPLOAD, initiateVibeUpload),
    takeLatest(vibeTypes.INITIATE_VIBE_LIST, initiateVibeList),
    takeLatest(vibeTypes.INITIATE_MY_VIBE_LIST, initiateMyVibeList),
    takeLatest(vibeTypes.INITIATE_VIBE_LIST_DETAILS, initiateVibeListDetails),
    takeLatest(vibeTypes.HIDE_USER, hideUserDetails),
    takeLatest(vibeTypes.BLOCK_USER, blockUserDetails),
    takeLatest(vibeTypes.FOLLOW_VIBES, followVibe),
    takeLatest(vibeTypes.GET_USER_VIBES_LIST, getUserVibeList),
    takeLatest(vibeTypes.GET_MATCHED_VIBES, getMatchedVibesList),
    takeLatest(vibeTypes.GET_TAGS_SEARCH, fetchTagsSearch),
    takeLatest(vibeTypes.SET_RECENT_SEARCH, initiateSetRecentSearch),
    takeLatest(vibeTypes.FOLLOW_VIBE_USER, initiateFollowVibeUser),
    takeLatest(vibeTypes.GET_FOLLOWING_USER_LIST, initiateGetFollowingList),
    takeLatest(vibeTypes.GET_BLOCKED_USER_LIST, initiateGetBlockedUser),
    takeLatest(vibeTypes.UNBLOCK_USER, initiateUnblockUser),
    takeLatest(vibeTypes.REPORT_UESR, initiateReportUser)
  ]);
}

export function* watchMomentVibeComments() {
    yield all([
        takeLatest(
            momentVibeCommentsTypes.INITIATE_MOMENT_VIBE_COMMENTS,
            initiateMomentVibeComments
        ),
        takeLatest(
            momentVibeCommentsTypes.ADD_MOMENT_VIBE_COMMENT,
            addMomentVibeComment
        ),
        takeLatest(
            momentVibeCommentsTypes.ADD_MOMENT_VIBE_COMMENT_REPLY,
            addMomentVibeCommentReply
        ),
        takeLatest(
            momentVibeCommentsTypes.ADD_MOMENT_VIBE_FOLLOW,
            addMomentVibeFollow
        ),
        takeLatest(
            momentVibeCommentsTypes.ADD_MOMENT_VIBE_UN_FOLLOW,
            addMomentVibeUnFollow
        )
    ]);
}

export function* watchProfile() {
  yield all([
    takeLatest(profileTypes.SEND_PROFILE_LIKE_COFFEE, sendProfileLikeCoffee),
    takeLatest(profileTypes.GET_PROFILE_BY_ID, getProfileById),
    takeLatest(profileTypes.GET_PROFILE_NOTIFICATION, getProfileNotification),
    takeLatest(profileTypes.GET_PROFILE_MATCH_HISTORY, getProfileMatchHistory),
    takeLatest(
      profileTypes.APPEARANCE_VERIFICATION,
      initiateAppearanceVerification
    ),
    takeLatest(profileTypes.ADD_REQUEST_STATUS, addRequestStatus),
    takeLatest(profileTypes.GET_PROFILE_PREFERENCES, getProfilePreference),
    takeLatest(
      profileTypes.UPDATE_PROFILE_PREFERENCES,
      updateProfilePreference
    ),
    takeLatest(profileTypes.UPDATE_SEEN_STATUS, initiateUpdateSeenStatus),
    takeLatest(profileTypes.GET_COFFEE_COUPON, getCoffeeCoupon),
    takeLatest(profileTypes.REDEEM_COUPON, redeemCoupon)
  ]);
}

export function* watchStore() {
  yield all([
    takeLatest(storeTypes.GET_PAYMENT, initiateGetPaymentInfo),
    takeLatest(storeTypes.SET_PAYMENT, initiateSetPaymentInfo),
    takeLatest(storeTypes.UPDATE_PAYMENT, initiateUpdatePaymentInfo)
  ]);
}

export function* watchDonation() {
  yield all([takeLatest(donationTypes.SET_DONATION, initiateDonation)]);
}
