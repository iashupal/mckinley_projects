import { all, call, fork, put, takeEvery, delay } from 'redux-saga/effects';
import {
  SIGNIN_USER,
  SIGNIN_USER_TOKEN,
  SIGNIN_USER_EMAIL_LINK,
  SIGNOUT_USER,
  IP_AUTH_PHONE_CODE,
  IP_AUTH_PHONE_RE_SEND,
} from 'constants/ActionTypes';
import {
  showAuthMessage,
  userSignInSuccess,
  userSignOutSuccess,
  handleAuthChangeValues,
  hideAuthLoader,
} from 'actions/Default/Auth';
import { PostCall, getAjaxData, checkFakeAPI } from 'helpers/ajax';
import { R, RU } from 'helpers/ramda';
import axios from 'axios';

const { isEng } = RU;
const sampleUser = {
  user: {
    LFIDList: [{ LFID: 1, LawFirmBrand: '철옹성 법률사무소', FirstName: '현호', LastName: '김' }],
    LoginID: 'kimhh@humaxit.com',
    MyLFID: 1,
    UserID: 1,
    NickName: '김현호',
    __site: 'LawFirm',
  },
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfX3NpdGUiOiJMYXdGaXJtIiwiTG9naW5JRCI6ImtpbWhoQGh1bWF4aXQuY29tIiwiVXNlcklEIjoxLCJpYXQiOjE1NjQ5NzExMzcsImV4cCI6MTU2NTU3NTkzN30.KBcl5piywNztRCqyv3fjO-ahSTtPZ55gAFcMAZ9EpCo',
};

const mygetAuthUserObj = result => {
  const { user, token } = result;
  const { MyLFID, LFIDList } = user;
  const MyLFIDInfo = LFIDList.filter(a => a.LFID === MyLFID)[0];
  return { ...user, MyLFIDInfo, token };
};

let resetCount = false;
function* countDown(num) {
  while (!resetCount && num > -1) {
    yield put(handleAuthChangeValues({ ipInfo_phone_expired: num-- }));
    yield delay(1000);
  }
}

const mysetLocalStorage = (user, token) => {
  const { LoginID, UserID } = user;
  localStorage.setItem('LoginID', LoginID);
  localStorage.setItem('UserID', UserID);
  localStorage.setItem('token', token);
};

function* signInUserWithEmailPassword({ payload }) {
  const { email, password } = payload;

  let result;
  if (checkFakeAPI()) {
    result = sampleUser;
  } else {
    const res = yield call(PostCall, '/auth/login', { LoginID: email, Password: password });
    result = getAjaxData(res);
  }

  if (result) {
    const signInUser = yield mygetAuthUserObj(result);
    mysetLocalStorage(result.user, result.token);
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`; // 토큰 재설정
    yield put(userSignInSuccess(signInUser));
  }

  yield put(hideAuthLoader());
}

function* signInUserWithToken() {
  let result;
  if (checkFakeAPI()) {
    result = sampleUser;
  } else {
    const res = yield call(PostCall, '/auth/loginWithToken');
    result = getAjaxData(res);
  }

  if (result) {
    const signInUser = yield mygetAuthUserObj(result);
    mysetLocalStorage(result.user, result.token);
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`; // 토큰 재설정
    yield put(userSignInSuccess(signInUser));
  } else {
    window.location = '#/signin'; // Token 에 문제가 있을 경우, 로그인 페이지로..
  }
}

function* signInUserWithEmailLink({ payload }) {
  const { qsEmail, qsUUID } = payload;

  const res = yield call(PostCall, '/auth/loginWithLoginUUID', {
    loginID: qsEmail,
    loginUUID: qsUUID,
    language: isEng() ? 'ENG' : 'KOR',
  });

  const result = getAjaxData(res);

  if (result) {
    yield mygetAuthUserObj(result);
    mysetLocalStorage(result.user, result.token);
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`; // 토큰 재설정
    window.location = '/'; // token 로그인이 사용되도록 refresh ..
  }
}

function* signOut() {
  try {
    R.map(key => localStorage.removeItem(key), ['token']);
    yield put(userSignOutSuccess({ token: '' }));
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* PhoneCode({ payload }) {
  const { email, password, code, recognitionUUID } = payload;

  const res = yield call(PostCall, '/auth/checkRecognitionNumber', {
    loginID: email,
    pass: password,
    recognitionUUID,
    recognitionNumber: parseInt(code, 10),
  });

  const result = getAjaxData(res);
  if (result) {
    yield put(handleAuthChangeValues({ isOpenIP_Phone: false }));
    yield put(handleAuthChangeValues({ isOpenIP_Email: true }));
  }
}

function* PhoneReSend({ payload }) {
  const { email, password } = payload;

  const res = yield call(PostCall, '/auth/getRecognitionNumber', {
    loginID: email,
    pass: password,
  });

  const result = getAjaxData(res);

  const { type, code, message, data } = result;
  const { ip, loginID, phone, validityPeriod, recognitionUUID } = data;

  if (result) {
    yield put(handleAuthChangeValues({ ipInfo_email: loginID }));
    yield put(handleAuthChangeValues({ ipInfo_ip: ip }));
    yield put(handleAuthChangeValues({ ipInfo_phone: phone }));
    yield put(
      handleAuthChangeValues({
        ipInfo_recognitionUUID: recognitionUUID,
      }),
    );
    yield put(handleAuthChangeValues({ isOpenIP_Phone: true }));

    yield put(showAuthMessage('[재발송] 인증번호가 다시 발송 되었습니다.'));

    resetCount = true;
    yield delay(1200); // 다시 Count 시에 기존 Count 와 겹치는 문제로 delay 처리함.
    resetCount = false;
    yield call(countDown, validityPeriod);
  }
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signInUserWithEmailPassword);
}
export function* signInUserToken() {
  yield takeEvery(SIGNIN_USER_TOKEN, signInUserWithToken);
}
export function* signInUserEmailLink() {
  yield takeEvery(SIGNIN_USER_EMAIL_LINK, signInUserWithEmailLink);
}
export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}
export function* AuthIPPhoneCode() {
  yield takeEvery(IP_AUTH_PHONE_CODE, PhoneCode);
}
export function* AuthIPPhoneReSend() {
  yield takeEvery(IP_AUTH_PHONE_RE_SEND, PhoneReSend);
}

export default function* rootSaga() {
  yield all([
    fork(signInUser),
    fork(signInUserToken),
    fork(signInUserEmailLink),
    fork(signOutUser),
    fork(AuthIPPhoneCode),
    fork(AuthIPPhoneReSend),
  ]);
}
