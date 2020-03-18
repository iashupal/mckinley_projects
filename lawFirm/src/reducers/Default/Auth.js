import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_FACEBOOK_USER_SUCCESS,
  SIGNIN_GITHUB_USER_SUCCESS,
  SIGNIN_GOOGLE_USER_SUCCESS,
  SIGNIN_TWITTER_USER_SUCCESS,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER_SUCCESS,
  CHANGE_AUTH_VALUES,
} from 'constants/ActionTypes';
import { reducerSelector2, prodSetReduxValues2 } from 'helpers/immer';

// 주의 ! 아래 형태가 아닌 reducerSelector2 공통 func 형태로 개발.
const INIT_STATE = {
  loader: false,
  alertMessage: '',
  showMessage: false,
  initURL: '',
  authUser: null,
  isOpenIP_Phone: false,
  isOpenIP_Email: false,
  ipInfo_email: 'swgo@humaxdigital.com',
  ipInfo_ip: '123.123.123.123',
  ipInfo_phone: '010-1234-1234',
  ipInfo_phone_expired: 60,
  ipInfo_recognitionUUID: '',
  ipInfo_email_expired: 15 * 60,
  ipInfo_input_code: '',
};

const handlers = {
  [CHANGE_AUTH_VALUES] : prodSetReduxValues2,
  [SIGNUP_USER_SUCCESS] :(state, draft, payload) => {
    draft.loader = false;
    draft.authUser = payload;
  },
  [SIGNIN_USER_SUCCESS] : (state, draft, payload) => {
    draft.loader = false;
    draft.authUser = payload;
  },
  [INIT_URL] : (state, draft, payload) => {
    draft.initURL = payload;
  },
  [SIGNOUT_USER_SUCCESS] : (state, draft, payload) => {
    draft.authUser = null;
    draft.initURL = '/';
    draft.loader = false;
  },
  [SHOW_MESSAGE] :(state, draft, payload) => {
    draft.alertMessage = payload;
    draft.showMessage = true;
    draft.loader = false;
  },
  [HIDE_MESSAGE] : (state, draft, payload) => {
    draft.alertMessage = '';
    draft.showMessage = false;
    draft.loader = false;
  },
  [SIGNIN_GOOGLE_USER_SUCCESS] : (state, draft, payload) => {
    draft.loader = false;
    draft.authUser = payload;
  },
  [SIGNIN_FACEBOOK_USER_SUCCESS] : (state, draft, payload) => {
    draft.loader = false;
    draft.authUser = payload;
  },
  [SIGNIN_TWITTER_USER_SUCCESS] : (state, draft, payload) => {
    draft.loader = false;
    draft.authUser = payload;
  },
  [SIGNIN_GITHUB_USER_SUCCESS] : (state, draft, payload) => {
    draft.loader = false;
    draft.authUser = payload;
  },
  [ON_SHOW_LOADER] : (state, draft, payload) => {
    draft.loader = true;
  },
  [ON_HIDE_LOADER] : (state, draft, payload) => {
    draft.loader = false;
  },
}

export default reducerSelector2(INIT_STATE, handlers);