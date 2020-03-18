import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { PostCall, getAjaxData } from 'helpers/ajax';
import {
  handleIsLoading,
  handleCommonAlertConfirmSet,
  setReduxValues as setReduxValuesCommon,
} from 'actions/Default/Common';
import { RU } from 'helpers/ramda';
import { NotificationManager } from 'react-notifications';
import {
  CASE_MEMO_SAVE_DRAFT,
  CASE_MEMO_LIST_SEARCH,
  CASE_MEMO_DETAIL_BIND,
  CASE_MEMO_DELETE_DATA,
  CASE_MEMO_CHECK_INPUT_DATA,
} from './ActionType';
import { setReduxValues } from './Action';

const { mlMessage } = RU;

function* CheckInputData(action) {
  const { payload } = action;
  const { memoDetail } = payload;
  const { content, status, owner } = memoDetail;

  const contentCheck = content.replace(/(\s*)/g, '');
  const alertMsg = [];
  if (!contentCheck) alertMsg.push('송무 메모');
  if (!status) alertMsg.push('송무 메모 상태');
  if (!owner) alertMsg.push('담당자');

  if (alertMsg.length > 0) {
    NotificationManager.info(alertMsg.join(', '), mlMessage('notification.required'));
    yield put(
      setReduxValuesCommon({
        allErrorOn: true,
      }),
    );
  }
  if (alertMsg.length === 0) {
    yield put(
      handleCommonAlertConfirmSet({
        msgObj: {
          title: mlMessage('alertDialog.save'),
          contents: '',
          isConfirm: true,
        },
        waitDatas: {
          name: 'caseMemo',
          value: { memoDetail },
        },
      }),
    );
  }
}

function* SaveDraft(action) {
  const state = yield select(state => state);
  const { case_ } = state;
  const { formMode } = case_;
  const { payload } = action;
  const { memoDetail } = payload;
  const { content, status, owner, files } = memoDetail;

  yield put(handleIsLoading(true));

  try {
    let res;
    let data;
    if (formMode === 'create') {
      res = yield call(PostCall, '/lawFirm/case/createCaseMemo', {
        Content: content,
        Status: status,
        Owner: owner,
        File: files,
      });
      data = getAjaxData(res);
      //  yield put(setReduxValues({_path: 'memoDetail', id: }))
    }
    if (formMode === 'mod') {
      res = yield call(PostCall, '/lawFirm/case/updateCaseMemo', {
        NoteSeq: id,
        Content: content,
        Status: status,
        Owner: owner,
        File: files,
      });
      data = getAjaxData(res);
    }
    if (data) {
      NotificationManager.info(
        '',
        formMode === 'create' ? mlMessage('notification.save') : mlMessage('notification.modify'),
      );
      yield put(setReduxValues({ formMode: 'detail' }));
    }
  } catch (e) {
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
}

function* ListFetch(action) {
  const { payload } = action;
  const { caseID, memoID, myMemo } = payload;
  yield put(handleIsLoading(true));
  try {
    const res = yield call(PostCall, 'lawFirm/case/searchCaseMemoList', {
      LawFirmID: MyLFID,
      CaseID: caseID,
      NoteSeq: memoID,
      myMemo,
    });
    const data = getAjaxData(res);
    yield put(setReduxValues({ memoList: data }));
  } catch (e) {
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
}

function* DetailBind(action) {
  const { payload } = action;
  const { caseID, memoID } = payload;
  yield put(handleIsLoading(true));
  try {
    const res = yield call(PostCall, 'lawFirm/case/searchCaseMemoDetail', {
      LawFirmID: MyLFID,
      CaseID: caseID,
      NoteSeq: memoID,
    });
    const data = getAjaxData(res);
    yield put(
      setReduxValues({
        _path: 'memoDetail',
        content: data.Content,
        status: data.Status,
        owner: data.Owner,
        files: data.File,
        updateDate: data.UpdateDate,
        createDate: data.CreateDate,
      }),
    );
  } catch (e) {
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
}

function* DeleteData(action) {
  const { payload } = action;
  const { caseID, memoID } = payload;
  yield put(handleIsLoading(true));
  try {
    const res = yield call(PostCall, 'lawFirm/case/deleteCaseMemo', {
      LawFirmID: MyLFID,
      CaseID: caseID,
      NoteSeq: memoID,
    });
    const data = getAjaxData(res);
  } catch (e) {
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
}

export default function* rootSaga() {
  yield all([
    takeEvery(CASE_MEMO_SAVE_DRAFT, SaveDraft),
    takeEvery(CASE_MEMO_LIST_SEARCH, ListFetch),
    takeEvery(CASE_MEMO_CHECK_INPUT_DATA, CheckInputData),
    takeEvery(CASE_MEMO_DETAIL_BIND, DetailBind),
    takeEvery(CASE_MEMO_DELETE_DATA, DeleteData),
  ]);
}
