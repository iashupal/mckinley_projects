import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { PostCall, getAjaxData } from 'helpers/ajax';
import { FileInsert, FileDelete } from 'sagas/common';
import { handleIsLoading } from 'actions/Default/Common';
import {
  CONTRACT_FETCH,
  CONTRACT_SAVE,
  CONTRACT_MODIFY,
  CONTRACT_REMOVE,
  CONTRACT_DETAIL_BIND_FETCH,
  CONTRACT_FILE_REMOVE,
  CONTRACT_CONSULTATION_FETCH,
} from './ActionType';
import { setReduxValues, setDetailBind, clearData, handleFetch } from './Action';

function* SaveFile(action) {
  const { payload } = action;
  const { files, bizCode, fileRefID } = payload;
  try {
    const fileID = yield FileInsert(files, bizCode, fileRefID);
    return fileID;
  } catch (error) {
    getAjaxData(error);
  }
}

function* SetData(action) {
  const { LFID, startDate, endDate, searchText } = action.payload;
  yield put(setReduxValues({ isLoading: true }));
  try {
    const res = yield call(PostCall, '/lawFirm/contract/searchContractList', { LFID, startDate, endDate, searchText });
    const data = getAjaxData(res);
    yield put(setReduxValues({ fetchContracts: data }));
  } catch (error) {
    getAjaxData(error);
  }
  yield put(setReduxValues({ isLoading: false }));
}

function* FetchContracts(action) {
  const { LFID, startDate, endDate, searchText } = action.payload;
  yield SetData({ payload: { LFID, startDate, endDate, searchText } });
}

function* FetchDetailBind(action) {
  const { LFID, contractID, formMode } = action.payload;
  yield put(handleIsLoading(true));

  if (formMode === 'create') {
    yield put(clearData());
  } else {
    try {
      const res = yield call(PostCall, '/lawFirm/contract/searchContract', {
        LFID,
        contractID,
      });
      const data = getAjaxData(res);
      yield put(setDetailBind({ contract: data }));
    } catch (e) {
      getAjaxData(e);
    }
  }
  yield put(handleIsLoading(false));
}

function* SaveContract(action) {
  const { LFID, contractData, startDate, endDate, searchText } = action.payload;
  yield put(handleIsLoading(true));
  try {
    const { files } = contractData.common;
    let fileRefID = null;
    if (files && files.length > 0) {
      fileRefID = yield SaveFile({ payload: { files, bizCode: 'BIZCODE_B02-C00' } });
    }

    const res = yield call(PostCall, '/lawFirm/contract/saveContract', {
      LFID,
      contractData,
      fileRefID,
    });
    getAjaxData(res);

    yield put(handleFetch({ LFID, startDate, endDate, searchText }));
    // yield put(clearData());
  } catch (e) {
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
}

function* ModifyContract(action) {
  const { LFID, contractData, startDate, endDate, searchText } = action.payload;
  yield put(handleIsLoading(true));
  try {
    const { fileRefID, files } = contractData.common;
    let filteredFileRefID = null;
    if (files && files.length > 0) {
      if (!fileRefID) {
        filteredFileRefID = yield SaveFile({ payload: { files, bizCode: 'BIZCODE_B02-C00' } });
      } else {
        filteredFileRefID = fileRefID;
        yield SaveFile({ payload: { files, bizCode: 'BIZCODE_B02-C00', fileRefID } });
      }
    }

    const res = yield call(PostCall, '/lawFirm/contract/updateContract', {
      LFID,
      contractData,
      fileRefID: filteredFileRefID,
    });

    getAjaxData(res);

    yield put(handleFetch({ LFID, startDate, endDate, searchText }));
    // yield put(clearData());
  } catch (e) {
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
}

function* DeleteContract(action) {
  const { LFID, contractID, isActive, startDate, endDate, searchText } = action.payload;
  yield put(handleIsLoading(true));
  try {
    const res = yield call(PostCall, '/lawFirm/contract/updateContractIsActive', {
      LFID,
      contractID,
      isActive,
    });

    getAjaxData(res);

    yield put(handleFetch({ LFID, startDate, endDate, searchText }));
    yield put(clearData());
  } catch (e) {
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
}

function* DeleteFile(action) {
  const { key, fileRefID } = action.payload;
  yield put(handleIsLoading(true));
  try {
    yield FileDelete(key, fileRefID);
  } catch (error) {
    getAjaxData(error);
  }
  yield put(handleIsLoading(false));
}

function* FetchConsultationList(action) {
  const { LFID, searchText } = action.payload;
  yield put(handleIsLoading(true));
  try {
    const res = yield call(PostCall, '/lawFirm/consultation/searchConsultationList', {
      LawFirmID: LFID,
      startDate: '',
      endDate: '',
      SearchValue: searchText,
      isConsultationContract: true,
    });
    const data = getAjaxData(res);
    yield put(setReduxValues({ fetchConsultations: data }));
  } catch (e) {
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
}

export default function* rootSaga() {
  yield all([
    takeEvery(CONTRACT_FETCH, FetchContracts),
    takeEvery(CONTRACT_DETAIL_BIND_FETCH, FetchDetailBind),
    takeEvery(CONTRACT_SAVE, SaveContract),
    takeEvery(CONTRACT_MODIFY, ModifyContract),
    takeEvery(CONTRACT_FILE_REMOVE, DeleteFile),
    takeEvery(CONTRACT_REMOVE, DeleteContract),
    takeEvery(CONTRACT_CONSULTATION_FETCH, FetchConsultationList),
  ]);
}
