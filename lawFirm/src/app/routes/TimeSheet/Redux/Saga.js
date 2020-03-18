import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { PostCall, getAjaxData } from 'helpers/ajax';
import { handleIsLoading } from 'actions/Default/Common';
import {
  TIMESHEET_SAVE,
  TIMESHEET_FETCH,
  TIMESHEET_DETAIL_BIND_FETCH,
  TIMESHEET_MODIFY,
  TIMESHEET_REMOVE,
  TIMESHEET_SEARCH_TIME_CHARGE,
  TIMESHEET_HANDLE_CONTRACT_LIST_FETCH,
  TIMESHEET_HANDLE_CONSULT_LIST_FETCH,
  TIMESHEET_HANDLE_CASE_LIST_FETCH,
} from './ActionType';
import {
  setReduxValues,
  handleTimeSheetFetch,
  clearData,
  setDetailBind,
  handleChangeCategory,
  handleSearchTimeCharge,
} from './Action';

function* SetData(action) {
  const { LFID, startDate, endDate, searchText, category } = action.payload;
  try {
    yield put(setReduxValues({ isLoading: true }));
    const res = yield call(PostCall, '/lawFirm/timesheet/searchTimeSheetList', {
      LFID,
      startDate,
      endDate,
      searchText,
      category,
    });
    const data = getAjaxData(res);
    yield put(setReduxValues({ fetchTimeSheets: data }));
    yield put(setReduxValues({ isLoading: false }));
  } catch (error) {
    getAjaxData(error);
    yield put(setReduxValues({ isLoading: false }));
  }
}

function* FetchTimeSheet(action) {
  const { LFID, startDate, endDate, searchText, category, categoryFlag } = action.payload;
  if (categoryFlag) {
    yield put(handleChangeCategory({ value: category.text, key: category.key }));
    const state = yield select(state => state);
    const { timeSheetSearch } = state.timeSheet;
    yield SetData({ payload: { LFID, startDate, endDate, searchText, category: timeSheetSearch.category } });
  } else {
    yield SetData({ payload: { LFID, startDate, endDate, searchText, category } });
  }
}

function* FetchDetailBind(action) {
  const { LFID, TSID, formMode } = action.payload;
  const state = yield select(state => state);
  const { UserID } = state.auth.authUser;

  yield put(handleIsLoading(true));
  if (formMode === 'create') {
    yield put(clearData({ managerID: UserID }));
    yield put(handleSearchTimeCharge({ LFID, userID: UserID }));
  } else {
    try {
      const res = yield call(PostCall, '/lawFirm/timesheet/searchTimesheet', { LFID, TSID });
      const data = getAjaxData(res);
      yield put(setDetailBind({ timeSheet: data[0] }));
    } catch (e) {
      getAjaxData(e);
    }
  }
  yield put(handleIsLoading(false));
}

function* SaveTimeSheet(action) {
  const state = yield select(state => state);
  const { UserID } = state.auth.authUser;

  const {
    LFID,
    runningTime,
    billableTime,
    bizCategoryCode,
    bizID,
    manager,
    contents,
    excutionDate,
    isBillable,
    startDate,
    endDate,
    searchText,
    category,
    defaultTimeCharge,
    changedTimeCharge,
    remark,
  } = action.payload;

  yield put(handleIsLoading(true));
  try {
    const res = yield call(PostCall, '/lawFirm/timesheet/createTimeSheet', {
      LFID,
      ManagerID: manager.value,
      RunDate: excutionDate,
      Contents: contents,
      RunningTime: runningTime,
      BillableTime: billableTime,
      IsBillable: isBillable ? 1 : 0,
      BizCategoryCode: bizCategoryCode,
      BizID: bizID,
      DefaultTimeCharge: defaultTimeCharge,
      ChangedTimeCharge: changedTimeCharge,
      Remark: remark,
    });
    getAjaxData(res);
    yield put(handleTimeSheetFetch({ LFID, startDate, endDate, searchText, category }));
    // yield put(clearData({ managerID: UserID }));
    yield put(handleSearchTimeCharge({ LFID, userID: UserID }));
  } catch (e) {
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
}

function* ModifyTimeSheet(action) {
  const {
    LFID,
    TSID,
    runningTime,
    billableTime,
    bizCategoryCode,
    bizID,
    manager,
    contents,
    excutionDate,
    isBillable,
    startDate,
    endDate,
    searchText,
    category,
    changedTimeCharge,
    remark,
  } = action.payload;

  yield put(handleIsLoading(true));
  try {
    const res = yield call(PostCall, '/lawFirm/timesheet/updateTimeSheet', {
      LFID,
      TSID,
      ManagerID: manager.value,
      RunDate: excutionDate,
      Contents: contents,
      RunningTime: runningTime,
      BillableTime: billableTime,
      IsBillable: isBillable ? 1 : 0,
      BizCategoryCode: bizCategoryCode,
      BizID: bizID,
      ChangedTimeCharge: changedTimeCharge,
      Remark: remark,
    });
    getAjaxData(res);

    yield put(handleTimeSheetFetch({ LFID, startDate, endDate, searchText, category }));
    // yield put(clearData({ managerID: null }));
  } catch (e) {
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
}

function* DeleteTimeSheet(action) {
  const { LFID, TSID, isActive, startDate, endDate, searchText, category } = action.payload;
  yield put(handleIsLoading(true));
  try {
    const res = yield call(PostCall, '/lawFirm/timesheet/updateIsActive', {
      LFID,
      TSID,
      IsActive: isActive,
    });
    getAjaxData(res);
    yield put(handleTimeSheetFetch({ LFID, startDate, endDate, searchText, category }));
  } catch (e) {
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
}

function* SearchTimeCharge(action) {
  const { LFID, userID } = action.payload;
  try {
    const res = yield call(PostCall, '/lawFirm/timesheet/searchTimeCharge', {
      LFID,
      userID,
    });
    const data = getAjaxData(res);
    yield put(
      setReduxValues({
        _path: 'timeSheetDetail',
        defaultTimeCharge: data && data.length === 1 ? data[0].TimeCharge : 0,
        changedTimeCharge: data && data.length === 1 ? data[0].TimeCharge : 0,
      }),
    );
  } catch (e) {
    getAjaxData(e);
  }
}

function* FetchContractList(action) {
  const { LFID, startDate, endDate, searchText } = action.payload;
  yield put(setReduxValues({ _path: 'dialogListInfo', isLoading: false }));
  try {
    const res = yield call(PostCall, '/lawFirm/contract/searchContractList', { LFID, startDate, endDate, searchText });
    const data = getAjaxData(res);
    yield put(setReduxValues({ _path: 'dialogListInfo', contractList: data }));
  } catch (e) {
    getAjaxData(e);
  }
  yield put(setReduxValues({ _path: 'dialogListInfo', isLoading: false }));
}

function* FetchConsultList(action) {
  const { LFID, startDate, endDate, searchText } = action.payload;
  yield put(setReduxValues({ _path: 'dialogListInfo', isLoading: false }));
  try {
    const res = yield call(PostCall, '/lawFirm/consultation/searchConsultationList', {
      LawFirmID: LFID,
      startDate,
      endDate,
      SearchValue: searchText,
    });
    const data = getAjaxData(res);
    yield put(setReduxValues({ _path: 'dialogListInfo', consultList: data }));
  } catch (e) {
    getAjaxData(e);
  }
  yield put(setReduxValues({ _path: 'dialogListInfo', isLoading: false }));
}

function* FetchCaseList(action) {
  const { LFID, caseType, searchText } = action.payload;
  yield put(setReduxValues({ _path: 'dialogListInfo', isLoading: false }));
  try {
    const res = yield call(PostCall, '/lawFirm/case/searchCaseList', {
      LFID,
      CaseType: caseType,
      SearchValue: searchText,
    });
    const data = getAjaxData(res);
    if (caseType === 'L') {
      yield put(setReduxValues({ _path: 'dialogListInfo', litigationList: data }));
    } else {
      yield put(setReduxValues({ _path: 'dialogListInfo', adviceList: data }));
    }
  } catch (e) {
    getAjaxData(e);
  }
  yield put(setReduxValues({ _path: 'dialogListInfo', isLoading: false }));
}

export default function* rootSaga() {
  yield all([
    takeEvery(TIMESHEET_SAVE, SaveTimeSheet),
    takeEvery(TIMESHEET_FETCH, FetchTimeSheet),
    takeEvery(TIMESHEET_DETAIL_BIND_FETCH, FetchDetailBind),
    takeEvery(TIMESHEET_MODIFY, ModifyTimeSheet),
    takeEvery(TIMESHEET_REMOVE, DeleteTimeSheet),
    takeEvery(TIMESHEET_SEARCH_TIME_CHARGE, SearchTimeCharge),
    takeEvery(TIMESHEET_HANDLE_CONTRACT_LIST_FETCH, FetchContractList),
    takeEvery(TIMESHEET_HANDLE_CONSULT_LIST_FETCH, FetchConsultList),
    takeEvery(TIMESHEET_HANDLE_CASE_LIST_FETCH, FetchCaseList),
  ]);
}
