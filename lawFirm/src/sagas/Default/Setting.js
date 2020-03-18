import { all, put, takeEvery } from 'redux-saga/effects';
import { SWITCH_LANGUAGE } from 'constants/ActionTypes';
import { R, RU } from 'helpers/ramda';
import { handleIsLoading } from 'actions/Default/Common';
import { SetAllCodes } from './Common';

function* SetSwtichCode(action) {
  const { payload } = action;
  const { locale } = payload;
  yield put(handleIsLoading(true));

  const language = R.cond([[R.equals('ko'), R.always('KOR')], [R.equals('en'), R.always('ENG')]])(locale.locale);
  localStorage.setItem('language', language);

  yield SetAllCodes();
  yield put(handleIsLoading(false));
}

export default function* rootSaga() {
  yield all([takeEvery(SWITCH_LANGUAGE, SetSwtichCode)]);
}
