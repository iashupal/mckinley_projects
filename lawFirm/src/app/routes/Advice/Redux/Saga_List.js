import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { PostCall, getAjaxData } from 'helpers/ajax';
import { ADVICE_LIST_FETCH } from './ActionType';
import { setReduxValues } from './Action';

function* SetData(action) {
  const { LFID, caseUUID } = action.payload;
  try {
    yield put(setReduxValues({ isLoading: true }));
    const res = yield call(PostCall, '/lawFirm/case/searchCaseList', { LFID, CaseType: 'A', caseUUID });
    const data = getAjaxData(res);
    if (!caseUUID) {
      yield put(setReduxValues({ _path: 'list', adviceList: [...data.map(a => ({ id: a.managementNo, ...a }))] }));
    } else {
      yield put(setReduxValues({ _path: 'common', selectedAdvice: data[0] || {} }));
    }
    yield put(setReduxValues({ isLoading: false }));
  } catch (error) {
    getAjaxData(error);
    yield put(setReduxValues({ isLoading: false }));
  }
}

function* FetchLists(action) {
  const { LFID, caseUUID } = action.payload;
  yield SetData({ payload: { LFID, caseUUID } });
}

export default function* rootSaga() {
  yield all([takeEvery(ADVICE_LIST_FETCH, FetchLists)]);
}
