import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { PostCall, getAjaxData } from 'helpers/ajax';
import { handleIsLoading } from 'actions/Default/Common';
import { CASE_TC_LIST_FETCH, CASE_TC_DETAIL_BIND_FETCH, CASE_TC_MODIFY, CASE_TC_DELETE } from './ActionType';
import {
  setReduxValues,
  handleTCDetailBind,
  handleTCListFetch,
  handleTCClearData,
  handleTCDetailBindFetch,
} from './Action';

function* SetData(action) {
  const { LawFirmID, caseID, startDate, endDate } = action.payload;
  try {
    yield put(setReduxValues({ _path: 'TC', isLoading: true }));
    const res = yield call(PostCall, '/lawFirm/timeCharge/searchTimeChargeListInCase', {
      LawFirmID,
      CaseID: caseID,
      StartDate: startDate,
      EndDate: endDate,
    });
    const data = getAjaxData(res);
    yield put(setReduxValues({ _path: 'TC', TCList: data }));
    yield put(setReduxValues({ _path: 'TC', isLoading: false }));
  } catch (error) {
    getAjaxData(error);
    yield put(setReduxValues({ _path: 'TC', isLoading: false }));
  }
}

function* FetchTC(action) {
  const { LawFirmID, caseID, startDate, endDate } = action.payload;
  yield SetData({ payload: { LawFirmID, caseID, startDate, endDate } });
}

function* FetchDetailBind(action) {
  const { LawFirmID, TSID } = action.payload;

  yield put(handleIsLoading(true));

  try {
    const res = yield call(PostCall, '/lawFirm/timeCharge/searchTimeCharge', { LawFirmID, TSID });
    const data = getAjaxData(res);
    yield put(handleTCDetailBind({ TC: data[0] }));
  } catch (e) {
    getAjaxData(e);
  }

  yield put(handleIsLoading(false));
}

function* ModifyTC(action) {
  const state = yield select(state => state);
  const { startDate, endDate } = state.case_.TC.TCSearch;
  const { LawFirmID, TSID, caseID, timeCharge, remark } = action.payload;

  yield put(handleIsLoading(true));
  try {
    const res = yield call(PostCall, '/lawFirm/timeCharge/updateTimeCharge', {
      LawFirmID,
      TSID,
      ChangedTimeCharge: timeCharge,
      Remark: remark,
    });
    getAjaxData(res);

    yield put(handleTCListFetch({ LawFirmID, caseID, startDate, endDate }));
  } catch (e) {
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
}

function* DeleteTC(action) {
  const state = yield select(state => state);
  const { startDate, endDate } = state.case_.TC.TCSearch;
  const { LawFirmID, caseID, TSID } = action.payload;
  yield put(handleIsLoading(true));
  try {
    const res = yield call(PostCall, '/lawFirm/timeCharge/updateIsActive', {
      LawFirmID,
      TSID,
      IsActive: 0,
    });
    getAjaxData(res);

    yield put(handleTCListFetch({ LawFirmID, caseID, startDate, endDate }));
  } catch (e) {
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
}

export default function* rootSaga() {
  yield all([
    takeEvery(CASE_TC_LIST_FETCH, FetchTC),
    takeEvery(CASE_TC_DETAIL_BIND_FETCH, FetchDetailBind),
    takeEvery(CASE_TC_MODIFY, ModifyTC),
    takeEvery(CASE_TC_DELETE, DeleteTC),
  ]);
}
