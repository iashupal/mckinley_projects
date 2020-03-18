import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { PostCall, getAjaxData } from 'helpers/ajax';
import { FileInsert, FileDelete } from 'sagas/common';
import { handleIsLoading } from 'actions/Default/Common';
import { RU } from 'helpers/ramda';
import { handleFetch as handleCaseFetch } from 'app/routes/Case/Redux/Action';
import {
  DOCUMENT_MNG_FETCH,
  DOCUMENT_MNG_SAVE,
  DOCUMENT_MNG_DELETE,
  DOCUMENT_MNG_HANDLE_CONTRACT_LIST_FETCH,
  DOCUMENT_MNG_HANDLE_CONTRACT_FILE_FETCH,
  DOCUMENT_MNG_HANDLE_CONSULT_LIST_FETCH,
  DOCUMENT_MNG_HANDLE_CONSULT_FILE_FETCH,
  DOCUMENT_MNG_HANDLE_CASE_LIST_FETCH,
  DOCUMENT_MNG_HANDLE_CASE_FILE_FETCH,
  DOCUMENT_MNG_HANDLE_DUEDATE_LIST_FETCH,
  DOCUMENT_MNG_HANDLE_DUEDATE_FILE_FETCH,
} from './ActionType';
import { setReduxValues, clearFileList, clearDialogData } from './Action';

function* SetData(action) {
  const { LFID, fileID, bizCode, categoryCode, searchText } = action.payload;
  yield put(setReduxValues({ isLoading: true }));
  try {
    const res = yield call(PostCall, '/file/searchFile', { LFID, fileID, bizCode, categoryCode, searchText });
    const data = getAjaxData(res);
    yield put(setReduxValues({ fetchFiles: data }));
  } catch (error) {
    getAjaxData(error);
  }
  yield put(setReduxValues({ isLoading: false }));
}

function* FetchFiles(action) {
  const { LFID, bizCode, categoryCode, searchText, newFileRefID } = action.payload;
  const state = yield select(state => state);
  const { isTotalDocMode } = state.documentMng;
  const { selectedCase } = state.case_.common;

  if (isTotalDocMode) {
    yield SetData({ payload: { LFID, bizCode, categoryCode, searchText } });
  } else if (newFileRefID) {
    yield SetData({ payload: { LFID, fileID: newFileRefID, categoryCode, searchText } });
  } else {
    const { fileRefID } = selectedCase;
    yield SetData({ payload: { LFID, fileID: fileRefID, categoryCode, searchText } });
  }
}

function* SaveFile(action) {
  const { files, LFID, bizCode, fileRefID, id, isNewFileRefID } = action.payload;
  const state = yield select(state => state);
  const { fileDivision, fileInflux, searchText } = state.documentMng.documentSearch;
  const { caseType, common } = state.case_;
  const { caseUUID } = common.selectedCase;

  yield put(handleIsLoading(true));
  try {
    if (!fileRefID) {
      const fileID = yield FileInsert(files, bizCode);

      // 상담
      if (bizCode === 'BIZCODE_B01-C00' && id) {
        yield call(PostCall, '/lawFirm/consultation/updateFileRefID', { LFID, consultID: id, fileRefID: fileID });
      }

      // 계약
      if (bizCode === 'BIZCODE_B02-C00' && id) {
        yield call(PostCall, '/lawFirm/contract/updateFileRefID', { LFID, contractID: id, fileRefID: fileID });
      }

      // 송무, 자문
      if ((bizCode === 'BIZCODE_B03-C00' || bizCode === 'BIZCODE_B04-C00') && id) {
        yield call(PostCall, '/lawFirm/case/updateFileRefID', { LFID, caseID: id, fileRefID: fileID });
        if (isNewFileRefID) {
          yield put(handleCaseFetch({ LFID, caseUUID, caseType, searchValue: '' }));
        }
      }

      // 송무/기일, 자문/기일
      if ((bizCode === 'BIZCODE_B03-C03' || bizCode === 'BIZCODE_B04-C03') && id) {
        const { caseID, dueDateSeq } = id;
        yield call(PostCall, '/lawFirm/duedate/updateFileRefID', { LFID, caseID, dueDateSeq, fileRefID: fileID });
      }

      yield FetchFiles({
        payload: {
          LFID,
          newFileRefID: fileID,
          bizCode: fileInflux,
          categoryCode: fileDivision,
          searchText,
        },
      });
    } else {
      yield FileInsert(files, bizCode, fileRefID);
      yield FetchFiles({
        payload: { LFID, bizCode: fileInflux, categoryCode: fileDivision, searchText },
      });
    }

    yield put(clearFileList({}));
    yield put(clearDialogData({}));
  } catch (error) {
    getAjaxData(error);
  }
  yield put(handleIsLoading(false));
}

function* DeleteFile(action) {
  const { key, fileRefID, LFID, noListFetch } = action.payload;
  const state = yield select(state => state);
  const { isTotalDocMode, documentSearch } = state.documentMng;
  const { fileDivision, fileInflux, searchText } = documentSearch;
  const { selectedCase } = state.case_.common;

  yield put(handleIsLoading(true));
  try {
    if (noListFetch) {
      yield FileDelete(key, fileRefID);
    } else if (isTotalDocMode && !noListFetch) {
      yield FileDelete(key, fileRefID);
      yield FetchFiles({ payload: { LFID, bizCode: fileInflux, categoryCode: fileDivision, searchText } });
    } else {
      const { fileRefID: caseFileRefID } = selectedCase;
      yield FileDelete(key, caseFileRefID);
      yield FetchFiles({ payload: { LFID, fileID: fileRefID, categoryCode: fileDivision, searchText } });
    }
  } catch (error) {
    getAjaxData(error);
  }
  yield put(handleIsLoading(false));
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

function* FetchContractFile(action) {
  const { LFID, contractID } = action.payload;

  yield put(handleIsLoading(true));
  try {
    const res = yield call(PostCall, '/lawFirm/contract/searchContractFile', { LFID, contractID });
    const data = getAjaxData(res);

    yield put(setReduxValues({ files: data }));
  } catch (e) {
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
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

function* FetchConsultFile(action) {
  const { LFID, consultID } = action.payload;

  yield put(handleIsLoading(true));
  try {
    const res = yield call(PostCall, '/lawFirm/consultation/searchConsultFile', { LFID, consultID });
    const data = getAjaxData(res);
    yield put(setReduxValues({ files: data }));
  } catch (e) {
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
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

function* FetchCaseFile(action) {
  const { LFID, caseID } = action.payload;

  yield put(handleIsLoading(true));
  try {
    const res = yield call(PostCall, '/lawFirm/case/searchCaseFile', { LFID, caseID });
    const data = getAjaxData(res);
    yield put(setReduxValues({ files: data }));
  } catch (e) {
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
}

function* FetchDuedateList(action) {
  const { LFID, caseType, searchText } = action.payload;
  yield put(setReduxValues({ _path: 'dialogListInfo', isLoading: false }));
  try {
    const res = yield call(PostCall, '/lawFirm/duedate/searchCaseDueDateData', {
      LawFirmID: LFID,
      caseType,
      searchText,
    });
    const data = getAjaxData(res);

    yield put(setReduxValues({ _path: 'dialogListInfo', dueDateList: data }));
  } catch (e) {
    getAjaxData(e);
  }
  yield put(setReduxValues({ _path: 'dialogListInfo', isLoading: false }));
}

function* FetchDuedateFile(action) {
  const { LawFirmID, caseID, dueDateSeq } = action.payload;
  yield put(handleIsLoading(true));
  try {
    const res = yield call(PostCall, '/lawFirm/duedate/searchDueDateFile', { LawFirmID, caseID, dueDateSeq });
    const data = getAjaxData(res);
    yield put(setReduxValues({ files: data }));
  } catch (e) {
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
}

export default function* rootSaga() {
  yield all([
    takeEvery(DOCUMENT_MNG_FETCH, FetchFiles),
    takeEvery(DOCUMENT_MNG_SAVE, SaveFile),
    takeEvery(DOCUMENT_MNG_DELETE, DeleteFile),
    takeEvery(DOCUMENT_MNG_HANDLE_CONTRACT_LIST_FETCH, FetchContractList),
    takeEvery(DOCUMENT_MNG_HANDLE_CONTRACT_FILE_FETCH, FetchContractFile),
    takeEvery(DOCUMENT_MNG_HANDLE_CONSULT_LIST_FETCH, FetchConsultList),
    takeEvery(DOCUMENT_MNG_HANDLE_CONSULT_FILE_FETCH, FetchConsultFile),
    takeEvery(DOCUMENT_MNG_HANDLE_CASE_LIST_FETCH, FetchCaseList),
    takeEvery(DOCUMENT_MNG_HANDLE_CASE_FILE_FETCH, FetchCaseFile),
    takeEvery(DOCUMENT_MNG_HANDLE_DUEDATE_LIST_FETCH, FetchDuedateList),
    takeEvery(DOCUMENT_MNG_HANDLE_DUEDATE_FILE_FETCH, FetchDuedateFile),
  ]);
}
