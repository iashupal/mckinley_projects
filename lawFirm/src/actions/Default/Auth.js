import { createAction } from 'redux-actions';
import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_FACEBOOK_USER,
  SIGNIN_FACEBOOK_USER_SUCCESS,
  SIGNIN_GITHUB_USER,
  SIGNIN_GITHUB_USER_SUCCESS,
  SIGNIN_GOOGLE_USER,
  SIGNIN_GOOGLE_USER_SUCCESS,
  SIGNIN_TWITTER_USER,
  SIGNIN_TWITTER_USER_SUCCESS,
  SIGNIN_USER,
  SIGNIN_USER_TOKEN,
  SIGNIN_USER_EMAIL_LINK,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  CHANGE_AUTH_VALUES,
  IP_AUTH_PHONE_CODE,
  IP_AUTH_PHONE_RE_SEND,
} from 'constants/ActionTypes';

export const userSignUp = createAction(SIGNUP_USER);
export const userSignIn = createAction(SIGNIN_USER);
export const userSignInToken = createAction(SIGNIN_USER_TOKEN);
export const userSignInEmailLink = createAction(SIGNIN_USER_EMAIL_LINK);
export const userSignOut = createAction(SIGNOUT_USER);
export const userSignUpSuccess = createAction(SIGNUP_USER_SUCCESS);
export const userSignInSuccess = createAction(SIGNIN_USER_SUCCESS);
export const userSignOutSuccess = createAction(SIGNOUT_USER_SUCCESS);
export const showAuthMessage = createAction(SHOW_MESSAGE);
export const userGoogleSignIn = createAction(SIGNIN_GOOGLE_USER);
export const userGoogleSignInSuccess = createAction(SIGNIN_GOOGLE_USER_SUCCESS);
export const userFacebookSignIn = createAction(SIGNIN_FACEBOOK_USER);
export const userFacebookSignInSuccess = createAction(SIGNIN_FACEBOOK_USER_SUCCESS);
export const setInitUrl = createAction(INIT_URL);
export const userTwitterSignIn = createAction(SIGNIN_TWITTER_USER);
export const userTwitterSignInSuccess = createAction(SIGNIN_TWITTER_USER_SUCCESS);
export const userGithubSignIn = createAction(SIGNIN_GITHUB_USER);
export const userGithubSignInSuccess = createAction(SIGNIN_GITHUB_USER_SUCCESS);
export const showAuthLoader = createAction(ON_SHOW_LOADER);
export const hideMessage = createAction(HIDE_MESSAGE);
export const hideAuthLoader = createAction(ON_HIDE_LOADER);
export const handleAuthChangeValues = createAction(CHANGE_AUTH_VALUES);
export const handleAuthIPPhoneCode = createAction(IP_AUTH_PHONE_CODE);
export const handleAuthIPPhoneReSend = createAction(IP_AUTH_PHONE_RE_SEND);
