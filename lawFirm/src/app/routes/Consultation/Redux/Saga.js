import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { PostCall, getAjaxData } from 'helpers/ajax';
import { RU } from 'helpers/ramda';
import { FileInsert, FileDelete } from 'sagas/common';
import {
  handleIsLoading,
  handleCommonAlertConfirmSet,
  setReduxValues as setReduxValuesCommon,
} from 'actions/Default/Common';
import { NotificationManager } from 'react-notifications';
import moment from 'moment';
import {
  CONSULTATION_MNG_SAVE_DRAFT,
  CONSULTATION_MNG_CHECK_INPUT,
  CONSULTATION_MNG_SAVE_MANAGER,
  CONSULTATION_MNG_SAVE_RELATEDCASE_CONTRACT,
  CONSULTATION_MNG_SAVE_CLIENT,
  CONSULTATION_MNG_LIST_FETCH,
  CONSULTATION_MNG_DETAIL_BIND,
  CONSULTATION_MNG_DELETE_FILE,
  CONSULTATION_MNG_DELETE_DATA,
  CONSULTATION_MNG_SET_CASELIST,
  CONSULTATION_MNG_SET_CONTRACTLIST,
  CONSULTATION_MNG_MAPPING_CASE_CONTRACT,
} from './ActionType';
import { setReduxValues } from './Action';

const { mlMessage, yearMonthDay, getMsgStr } = RU;

function* ListFetch(action) {
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;
  const { MyLFID } = authUser;
  const { payload } = action;
  yield put(setReduxValues({ isLoading: true }));
  const { startDate, endDate, searchValue, bizCode, CaseUUID } = payload;
  let res;
  let data;
  try {
    if (bizCode) {
      if (bizCode.key === 'BIZCODE_B03-C06') {
        res = yield call(PostCall, '/lawFirm/consultation/searchCaseConsultationList', {
          startDate,
          endDate,
          SearchValue: searchValue,
          LawFirmID: MyLFID,
          CaseUUID,
        });
        data = getAjaxData(res);
      }
    } else {
      res = yield call(PostCall, '/lawFirm/consultation/searchConsultationList', {
        startDate,
        endDate,
        SearchValue: searchValue,
        LawFirmID: MyLFID,
      });
      data = getAjaxData(res);
    }
    yield put(setReduxValues({ list: data }));
  } catch (e) {
    getAjaxData(e);
  }
  yield put(setReduxValues({ isLoading: false }));
}

function* DetailBind(action) {
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;
  const { MyLFID } = authUser;

  const { payload } = action;
  const { consultationID, formMode } = payload;
  if (formMode === 'create') {
    yield put(
      setReduxValues({
        _path: 'save',
        selectCase: 1,
        consultationID: '',
        checkCase: true,
        checkContract: true,
        relatedContract: { ContractUUID: '', Title: '' },
        relatedCase: { CaseUUID: '', Title: '' },
        client: [],
        counselor: '',
        owner: [],
        managerRefID: '',
        title: '',
        contents: '',
        date: '',
        time: '',
        spentMinute: '',
        files: [],
        fileRefID: '',
        chargeTypeCode: 'CSCTYPE_F',
        lawFirmPrice: '',
        clientPrice: '',
        targetPrice: '',
        isPublic: false,
      }),
    );
  } else {
    try {
      const res = yield call(PostCall, '/lawFirm/consultation/searchConsultationDetail', {
        ConsultUUID: consultationID,
        LawFirmID: MyLFID,
      });
      const data = getAjaxData(res);
      const spentTime = `${parseInt(data.res[0].SpentMinute / 60, 10)}:${parseInt(data.res[0].SpentMinute % 60, 10)}`;
      yield put(
        setReduxValues({
          _path: 'save',
          consultationID: data.res[0].id,
          checkCase: !data.relatedCase[0],
          checkContract: !data.relatedContract[0],
          relatedContract: data.relatedContract[0],
          relatedCase: data.relatedCase[0],
          selectCase:
            data.relatedCase[0] && data.relatedCase[0].CaseType && data.relatedCase[0].CaseType === 'A' ? 2 : 1,
          client: [...data.client.map(a => ({ ...a, isMain: a.isMain === 1 }))],
          managerRefID: data.res[0].ManagerRefID,
          owner: data.res[0].owner[0].value ? data.res[0].owner : [],
          title: data.res[0].Title,
          contents: data.res[0].Contents,
          date: data.res[0].date,
          time: moment(data.res[0].time, 'HH:mm'),
          spentMinute: moment(spentTime, 'HH:mm'),
          files: data.files || [],
          fileRefID: data.res[0].FileRefID,
          chargeTypeCode: data.res[0].ChargeTypeCode,
          lawFirmPrice: data.res[0].LawFirmPrice,
          clientPrice: data.res[0].ClientPrice,
          targetPrice: data.res[0].TargetPrice,
          isPublic: data.res[0].IsPublic === 1,
        }),
      );
    } catch (e) {
      getAjaxData(e);
    }
  }
}

function* SaveRelatedCaseContract(action) {
  const { payload } = action;
  const { ConsultID, relatedCase, relatedContract, LawFirmID } = payload;
  try {
    if (relatedCase) {
      const res = yield call(PostCall, '/lawFirm/consultation/createRelationCase', {
        ConsultID,
        relatedCase,
        LawFirmID,
      });
    }
    if (relatedContract) {
      const res = yield call(PostCall, '/lawFirm/consultation/createRelationContract', {
        ConsultID,
        relatedContract,
        LawFirmID,
      });
    }
  } catch (error) {
    getAjaxData(error);
  }
}

function* MappingCaseContract(action) {
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;
  const { MyLFID } = authUser;
  const { payload } = action;
  const { type, value } = payload;
  if (type === 'case') {
    try {
      const res = yield call(PostCall, '/lawFirm/consultation/setMappingCaseContract', {
        LawFirmID: MyLFID,
        CaseUUID: value.CaseUUID,
      });
      const data = getAjaxData(res);
      if (res.status === 200) {
        yield put(
          setReduxValues({
            _path: 'save',
            relatedContract: data || { ContractUUID: '', Title: '' },
            checkContract: data === null,
          }),
        );
      }
    } catch (error) {
      getAjaxData(error);
    }
  }
  if (type === 'contract') {
    try {
      const res = yield call(PostCall, '/lawFirm/consultation/setMappingContractCase', {
        LawFirmID: MyLFID,
        ContractUUID: value.ContractUUID,
      });
      const data = getAjaxData(res);
      if (res.status === 200) {
        yield put(
          setReduxValues({
            _path: 'save',
            relatedCase: data || { CaseUUID: '', Title: '' },
            checkCase: data === null,
          }),
        );
      }
    } catch (error) {
      getAjaxData(error);
    }
  }
}

function* SaveFile(action) {
  const { payload } = action;
  const { files, bizCode, fileRefID } = payload;
  try {
    let fileID = null;
    if (!fileRefID) {
      fileID = yield FileInsert(files, bizCode.key);
    } else {
      fileID = yield FileInsert(files, bizCode.key, fileRefID);
    }
    return fileID;
  } catch (error) {
    getAjaxData(error);
  }
}

function* SaveManager(action) {
  const { payload } = action;
  const { formMode, managerRefID, owner, LawFirmID } = payload;
  let result = null;
  let data;
  try {
    if (formMode === 'mod' && managerRefID)
      yield call(PostCall, '/lawFirm/consultation/deleteManager', { ManagerRefID: managerRefID, LawFirmID });
    if (owner.length > 0) {
      const res = yield call(PostCall, '/lawFirm/consultation/createManager', {
        ManagerRefID: managerRefID,
        Manager: owner,
        LawFirmID,
      });
      data = getAjaxData(res);
      if (!managerRefID) {
        result = data.insertId;
      } else result = data;
    }
    return result;
  } catch (error) {
    getAjaxData(error);
  }
}

function* SaveClient(action) {
  const { payload } = action;
  const { formMode, LawFirmID, ConsultID, Client } = payload;
  try {
    if (formMode === 'mod') yield call(PostCall, '/lawFirm/consultation/deleteClient', { ConsultID, LawFirmID });
    const res = yield call(PostCall, '/lawFirm/consultation/createClient', { ConsultID, LawFirmID, Client });
    const data = getAjaxData(res);
  } catch (error) {
    getAjaxData(error);
  }
}

function* CheckInputValue(action) {
  const { payload } = action;
  const { save, formMode, bizCode, CaseUUID } = payload;
  const { title, contents, client, date, time, spentMinute, chargeTypeCode, targetPrice, files } = save;
  const titleCheck = title.replace(/(\s*)/g, '');
  const contentsCheck = contents.replace(/(\s*)/g, '');
  let flag = true;
  if (files) {
    files.forEach(file => {
      if (!file.division) flag = false;
    });
  }
  const alertMsg = getMsgStr([
    { msg: '의뢰인', cond: client.length === 0 },
    { msg: '제목', cond: !titleCheck },
    { msg: '내용', cond: !contentsCheck },
    { msg: '비용 청구 금액', cond: chargeTypeCode !== 'CSCTYPE_F' && !targetPrice },
    { msg: '상담 시간', cond: !spentMinute },
    { msg: '문서 구분', cond: !flag },
  ]);
  if (alertMsg.length > 0) {
    NotificationManager.info(alertMsg);
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
          name: 'consultation',
          value: { save, formMode, bizCode, CaseUUID },
        },
      }),
    );
  }
}

function* SaveDraft(action) {
  const { payload } = action;
  const { save, formMode, bizCode, CaseUUID, ContractUUID } = payload;
  const state = yield select(state => state);
  const { auth, consultationMng } = state;
  const { search } = consultationMng;
  const { startDate, endDate } = search;
  const { authUser } = auth;
  const { MyLFID } = authUser;
  const {
    consultationID,
    relatedContract,
    relatedCase,
    client,
    managerRefID,
    owner,
    title,
    contents,
    date,
    time,
    spentMinute,
    files,
    fileRefID,
    chargeTypeCode,
    targetPrice,
    isPublic,
  } = save;
  const consultDate = date ? yearMonthDay(date) : yearMonthDay(new Date());
  const consultTime = time
    ? time.format('H:mm')
    : moment()
        .hour(0)
        .minute(0)
        .second(0)
        .format('H:mm');
  const ConsultDateTime = consultDate.concat(' ', consultTime);
  const SpentMinuteArray = moment(spentMinute)
    .format('H:mm')
    .split(':');
  const SpentHour = parseInt(SpentMinuteArray[0], 10) * 60;
  const SpentMinute = parseInt(SpentMinuteArray[1], 10);
  const fileID = yield SaveFile({
    payload: { files, bizCode: { key: 'BIZCODE_B01-C00', value: '상담' }, fileRefID },
  });
  const ManagerID = yield SaveManager({ payload: { formMode, managerRefID, owner, LawFirmID: MyLFID } });
  yield put(handleIsLoading(true));
  try {
    let res;
    let data;
    if (formMode === 'create') {
      res = yield call(PostCall, '/lawFirm/consultation/createConsultation', {
        ManagerRefID: ManagerID,
        Title: title,
        Contents: contents,
        ConsultDateTime,
        SpentMinute: SpentHour + SpentMinute,
        FileRefID: fileID || null,
        ChargeTypeCode: chargeTypeCode,
        LawFirmPrice: 0,
        ClientPrice: 0,
        TargetPrice: targetPrice,
        IsPublic: isPublic === true ? 1 : 0,
        LawFirmID: MyLFID,
      });
      data = getAjaxData(res);
    }
    if (formMode === 'mod') {
      res = yield call(PostCall, '/lawFirm/consultation/updateConsultation', {
        ConsultUUID: consultationID,
        ManagerRefID: ManagerID,
        Title: title,
        Contents: contents,
        ConsultDateTime,
        SpentMinute: SpentHour + SpentMinute,
        FileRefID: fileID || null,
        ChargeTypeCode: chargeTypeCode,
        LawFirmPrice: 0,
        ClientPrice: 0,
        TargetPrice: targetPrice,
        IsPublic: isPublic === true ? 1 : 0,
        LawFirmID: MyLFID,
      });
      data = getAjaxData(res);
    }
    yield SaveClient({
      payload: { formMode, ConsultID: data.ConsultID, LawFirmID: MyLFID, Client: client },
    });
    if (relatedContract || relatedCase) {
      yield SaveRelatedCaseContract({
        payload: {
          ConsultID: data.ConsultID,
          relatedCase: relatedCase && relatedCase.CaseUUID,
          relatedContract: relatedContract && relatedContract.ContractUUID,
          LawFirmID: MyLFID,
        },
      });
    }
    yield DetailBind({
      payload: {
        consultationID: '',
        formMode: 'create',
      },
    });
    yield ListFetch({
      payload: {
        startDate,
        endDate,
        searchValue: '',
        bizCode,
        CaseUUID,
      },
    });
  } catch (e) {
    getAjaxData(e);
  }
  yield put(handleIsLoading(false));
}

function* DeleteFile(action) {
  const { payload } = action;
  const { key, fileRefID } = payload;
  try {
    yield FileDelete(key, fileRefID);
  } catch (error) {
    getAjaxData(error);
  }
}

function* DeleteData(action) {
  const state = yield select(state => state);
  const { auth, consultationMng } = state;
  const { authUser } = auth;
  const { MyLFID } = authUser;
  const { search } = consultationMng;
  const { startDate, endDate } = search;

  const { payload } = action;
  const { id, bizCode, CaseUUID } = payload;
  try {
    const res = yield call(PostCall, '/lawFirm/consultation/deleteConsultation', {
      ConsultUUID: id,
      LawFirmID: MyLFID,
    });
    if (res.status === 200) {
      yield ListFetch({
        payload: {
          startDate,
          endDate,
          searchValue: '',
          bizCode,
          CaseUUID,
        },
      });
    }
  } catch (error) {
    getAjaxData(error);
  }
}

function* FetchCaseList(action) {
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;
  const { MyLFID } = authUser;
  const { payload } = action;
  const { caseType } = payload;
  try {
    const res = yield call(PostCall, '/lawFirm/case/searchCaseList', {
      LFID: MyLFID,
      CaseType: caseType === 1 ? 'L' : 'A',
    });
    const data = getAjaxData(res);
    yield put(setReduxValues({ caseList: [...data.map(a => ({ id: a.caseUUID, ...a }))] }));
  } catch (e) {
    getAjaxData(e);
  }
}

function* FetchContractList(action) {
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;
  const { MyLFID } = authUser;
  const { searchText } = action.payload;
  try {
    const res = yield call(PostCall, '/lawFirm/contract/searchContractList', {
      LFID: MyLFID,
      startDate: '',
      endDate: '',
      searchText,
    });
    const data = getAjaxData(res);
    yield put(setReduxValues({ contractList: [...data.map(a => ({ id: a.contractID, ...a }))] }));
  } catch (e) {
    getAjaxData(e);
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(CONSULTATION_MNG_SAVE_DRAFT, SaveDraft),
    takeEvery(CONSULTATION_MNG_CHECK_INPUT, CheckInputValue),
    takeEvery(CONSULTATION_MNG_SAVE_MANAGER, SaveManager),
    takeEvery(CONSULTATION_MNG_SAVE_RELATEDCASE_CONTRACT, SaveRelatedCaseContract),
    takeEvery(CONSULTATION_MNG_SAVE_CLIENT, SaveClient),
    takeEvery(CONSULTATION_MNG_LIST_FETCH, ListFetch),
    takeEvery(CONSULTATION_MNG_DETAIL_BIND, DetailBind),
    takeEvery(CONSULTATION_MNG_DELETE_FILE, DeleteFile),
    takeEvery(CONSULTATION_MNG_DELETE_DATA, DeleteData),
    takeEvery(CONSULTATION_MNG_SET_CASELIST, FetchCaseList),
    takeEvery(CONSULTATION_MNG_SET_CONTRACTLIST, FetchContractList),
    takeEvery(CONSULTATION_MNG_MAPPING_CASE_CONTRACT, MappingCaseContract),
  ]);
}
