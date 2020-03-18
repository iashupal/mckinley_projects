import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { PostCall, getAjaxData } from 'helpers/ajax';
import moment from 'moment';
import { FileInsert, FileDelete } from 'sagas/common';
import {
  handleCommonAlertConfirmSet,
  setReduxValues as setReduxValuesCommon,
  handleIsLoading,
} from 'actions/Default/Common';
import { NotificationManager } from 'react-notifications';
import { RU } from 'helpers/ramda';
import {
  CASE_DUEDATE_LIST_FETCH,
  CASE_DUEDATE_CHECK_INPUT_DATA,
  CASE_DEUDATE_SAVE_DRAFT,
  CASE_DUEDATE_DETAIL_BIND,
  CASE_DUEDATE_SET_SELECT,
  CASE_DUEDATE_DELETE_DATA,
  CASE_DUEDATE_DELETE_FILE,
} from './ActionType';
import { setReduxValues } from './Action';

const { getMsgStr, mlMessage, yearMonthDay } = RU;

function* listFetch(action) {
  const { LFID, caseID, searchValue, searchTypeCode } = action.payload;

  try {
    yield put(setReduxValues({ isLoading: true }));
    const res = yield call(PostCall, '/lawFirm/duedate/searchDueDateList', {
      LawFirmID: LFID,
      CaseID: caseID,
      SearchValue: searchValue,
      SearchTypeCode: searchTypeCode,
    });
    const data = getAjaxData(res);

    yield put(setReduxValues({ _path: 'dueDate.list', list: data }));

    yield put(setReduxValues({ isLoading: false }));
  } catch (error) {
    getAjaxData(error);
    yield put(setReduxValues({ isLoading: false }));
  }
}

function* detailBind(action) {
  const { LFID, caseID, dueDateSeq } = action.payload;

  try {
    const res = yield call(PostCall, '/lawFirm/duedate/searchDueDateDetail', {
      LawFirmID: LFID,
      CaseID: caseID,
      DueDateSeq: dueDateSeq,
    });

    const data = getAjaxData(res);

    const detailResult = data.detailResult[0];
    const { filesResult, attendeeResult, managerResult, sharerResult } = data;
    const onlyOneManager = managerResult[0];

    yield put(
      setReduxValues({
        _path: 'dueDate.save',
        dueDateSeq: detailResult.DueDateSeq,
        dueDate: detailResult.DueDate,
        dueDateTime: moment(detailResult.DueDateTime, 'HH:mm'),
        dueDateName: detailResult.DueDateName,
        dueDateRemark: detailResult.DueDateRemark,
        dueDateTypeCode: detailResult.DueDateTypeCode,
        pendingOrg: detailResult.PendingOrg,
        managerRefID: detailResult.ManagerRefID,
        isLimitedShare: detailResult.IsLimitedShare,
        createDate: detailResult.CreateDate,
        updateDate: detailResult.UpdateDate,
        fileRefID: detailResult.FileRefID,
        files: filesResult || [],
        dueDateAttendee: attendeeResult,
        manager: onlyOneManager,
        dueDateSharer: sharerResult,
      }),
    );
  } catch (error) {
    getAjaxData(error);
  }
}

function* checkInputData(action) {
  const state = yield select(state => state);
  const { case_ } = state;
  const { formMode } = case_;
  const { save } = action.payload;
  const {
    dueDate,
    dueDateName,
    dueDateTypeCode,
    pendingOrg,
    files,
    dueDateAttendee,
    manager,
    isLimitedShare,
    dueDateSharer,
  } = save;

  let flag = true;
  if (files) {
    files.forEach(file => {
      if (!file.division) flag = false;
    });
  }

  const alertMsg = getMsgStr([
    { msg: mlMessage('pages.case.dueDate'), cond: !dueDate },
    { msg: mlMessage('pages.case.dueDateName'), cond: !dueDateName },
    { msg: mlMessage('pages.case.dueDateType'), cond: !dueDateTypeCode },
    { msg: mlMessage('pages.common.pendingOrg'), cond: !pendingOrg },
    { msg: mlMessage('pages.common.fileType'), cond: !flag },
    { msg: mlMessage('pages.common.attendee'), cond: !dueDateAttendee.length > 0 },
    { msg: mlMessage('pages.common.manager'), cond: Object.keys(manager).length === 0 },
    { msg: mlMessage('pages.common.sharer'), cond: isLimitedShare === 1 && dueDateSharer.length === 0 },
  ]);

  if (alertMsg.length > 0) {
    NotificationManager.info(alertMsg, mlMessage('notification.check'));
    yield put(
      setReduxValuesCommon({
        allErrorOn: true,
      }),
    );

    return;
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
          name: 'dueDate',
          value: { save, formMode },
        },
      }),
    );
  }
}

function* SaveFile(action) {
  const { payload } = action;
  const { files, bizCode, fileRefID } = payload;
  let fileID;
  try {
    if (!fileRefID) {
      fileID = yield FileInsert(files, bizCode.key);
    } else {
      const newFiles = files.filter(file => file.flag === 0 || file.isModified === 1);
      fileID = yield FileInsert(newFiles, bizCode.key, fileRefID);
    }
    return fileID;
  } catch (error) {
    getAjaxData(error);
  }
}

function* saveDraft(action) {
  const state = yield select(state => state);
  const { auth, case_ } = state;
  const { caseType, common } = case_;
  const { LFID, caseID } = common.selectedCase;
  const { searchValue, searchTypeCode } = case_.dueDate.list.search;

  const { save, formMode } = action.payload;
  const {
    dueDateSeq,
    managerRefID,
    files,
    fileRefID,
    manager,
    pendingOrg,
    dueDateAttendee,
    dueDate,
    dueDateName,
    dueDateRemark,
    dueDateSharer,
    dueDateTime,
    dueDateTypeCode,
    isLimitedShare,
  } = save;

  const time = dueDateTime
    ? dueDateTime.format('H:mm')
    : moment()
        .hour(0)
        .minute(0)
        .second(0)
        .format('H:mm');

  const resultDateTime = yearMonthDay(dueDate).concat(' ', time);

  try {
    const fileID = yield SaveFile({
      payload: {
        files,
        bizCode:
          caseType === 'L'
            ? { key: 'BIZCODE_B03-C03', value: '송무/기일' }
            : { key: 'BIZCODE_B04-C03', value: '자문/기일' },

        fileRefID,
      },
    });

    yield put(handleIsLoading(true));

    if (formMode === 'create') {
      const res = yield call(PostCall, '/lawFirm/duedate/createDueDate', {
        LawFirmID: LFID,
        CaseID: caseID,
        DueDate: resultDateTime,
        DueDateName: dueDateName,
        DueDateRemark: dueDateRemark,
        DueDateTypeCode: dueDateTypeCode,
        PendingOrg: pendingOrg,
        IsLimitedShare: isLimitedShare,
        FileRefID: fileID || null,
        dueDateAttendee,
        manager,
        dueDateSharer,
      });

      const data = getAjaxData(res);
    }

    if (formMode === 'mod') {
      const res = yield call(PostCall, '/lawFirm/duedate/updateDueDate', {
        DueDateSeq: dueDateSeq,
        LawFirmID: LFID,
        CaseID: caseID,
        DueDate: resultDateTime,
        DueDateName: dueDateName,
        DueDateRemark: dueDateRemark,
        DueDateTypeCode: dueDateTypeCode,
        PendingOrg: pendingOrg,
        IsLimitedShare: isLimitedShare,
        ManagerRefID: managerRefID,
        FileRefID: fileID || null,
        dueDateAttendee,
        manager,
        dueDateSharer,
      });

      const data = getAjaxData(res);
    }

    // 기일 등록창 닫기
    yield put(setReduxValues({ formMode: '' }));

    // 기일 목록 최신화
    yield listFetch({
      payload: {
        LFID,
        caseID,
        searchValue,
        searchTypeCode,
      },
    });

    yield put(handleIsLoading(false));
  } catch (error) {
    getAjaxData(error);
    yield put(handleIsLoading(false));
  }
}

function* setSelect(action) {
  const state = yield select(state => state);
  const { case_ } = state;
  const { common, dueDate } = case_;
  const { LFID, caseID } = common.selectedCase;
  const { searchValue, searchTypeCode } = dueDate.list.search;
  const { payload } = action;

  try {
    yield listFetch({
      payload: {
        LFID,
        caseID,
        searchValue,
        searchTypeCode,
      },
    });
  } catch (error) {
    getAjaxData(error);
  }
}

function* deleteData(action) {
  const state = yield select(state => state);
  const { case_ } = state;
  const { common, dueDate } = case_;
  const { selectedCase } = common;
  const { searchValue, searchTypeCode } = dueDate.list.search;
  const { LFID, caseID, dueDateSeq } = action.payload;

  try {
    yield put(handleIsLoading(true));
    const res = yield call(PostCall, '/lawFirm/duedate/updateDueDateIsActive', {
      LawFirmID: LFID,
      CaseID: caseID,
      DueDateSeq: dueDateSeq,
    });

    const data = getAjaxData(res);

    yield listFetch({
      payload: {
        LFID: selectedCase.LFID,
        caseID: selectedCase.caseID,
        searchValue,
        searchTypeCode,
      },
    });

    // 기일 등록 창 닫기
    yield put(setReduxValues({ formMode: '' }));

    yield put(handleIsLoading(false));
  } catch (error) {
    getAjaxData(error);
    yield put(handleIsLoading(false));
  }
}

function* deleteFile(action) {
  const { payload } = action;
  const { key, fileRefID } = payload;
  try {
    yield FileDelete(key, fileRefID);
  } catch (error) {
    getAjaxData(error);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(CASE_DUEDATE_LIST_FETCH, listFetch),
    takeEvery(CASE_DUEDATE_CHECK_INPUT_DATA, checkInputData),
    takeEvery(CASE_DEUDATE_SAVE_DRAFT, saveDraft),
    takeEvery(CASE_DUEDATE_DETAIL_BIND, detailBind),
    takeEvery(CASE_DUEDATE_SET_SELECT, setSelect),
    takeEvery(CASE_DUEDATE_DELETE_DATA, deleteData),
    takeEvery(CASE_DUEDATE_DELETE_FILE, deleteFile),
  ]);
}
