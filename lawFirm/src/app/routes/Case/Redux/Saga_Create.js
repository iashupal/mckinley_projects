import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { PostCall, getAjaxData } from 'helpers/ajax';
import { RU } from 'helpers/ramda';
import {
  handleCommonAlertConfirmSet,
  setReduxValues as setReduxValuesCommon,
  handleIsLoading,
} from 'actions/Default/Common';
import { FileInsert, FileDelete } from 'sagas/common';
import { NotificationManager } from 'react-notifications';
import {
  CASE_CREATE_DETAIL_BIND,
  CASE_CREATE_CHECK_INPUT_DATA,
  CASE_CREATE_SAVE_DRAFT,
  CASE_CREATE_DELETE_FILE,
  CASE_CREATE_DELETE_CASE,
} from './ActionType';
import { setReduxValues } from './Action';
import CaseInfo from '../View/Create/CaseInfo';

const { getMsgStr, mlMessage, yearMonthDay, changeURL } = RU;

function* DetailBind(action) {
  const { MyLFID, formMode, caseType, caseUUID } = action.payload;

  try {
    yield put(handleIsLoading(true));

    if (formMode === 'create') {
      const res = yield call(PostCall, '/lawFirm/case/searchNewManagementNo', {
        LawFirmID: MyLFID,
        CaseType: caseType,
      });

      const data = getAjaxData(res);

      yield put(setReduxValues({ _path: 'create.caseInfo', managementNo: data[0].ManagementNo }));
    }

    if (formMode === 'mod') {
      const res = yield call(PostCall, '/lawFirm/case/searchCaseInfo', {
        LawFirmID: MyLFID,
        CaseUUID: caseUUID,
        CaseType: caseType,
      });

      const data = getAjaxData(res);
      const { caseDetail, supremeDetail, performerDetail, fileList } = data;

      yield put(
        setReduxValues({
          _path: 'create.caseInfo',
          managementNo: caseDetail.ManagementNo,
          caseTitle: caseDetail.CaseTitle,
          contractID: caseDetail.ContractID,
          contractTitle: caseDetail.ContractTitle,
          backgroundInfo: caseDetail.BackgroundInfo,
          caseStatus: caseDetail.CaseStatus,
          caseCategoryL1: caseDetail.CaseCategoryL1,
          caseCategoryL2: caseDetail.CaseCategoryL2,
          courtLevel: caseDetail.CourtLevel,
          retainedDate: caseDetail.RetainedDate,
          registerDate: caseDetail.RegisterDate,
          isTermContract: caseDetail.IsTermContract,
          isTCContract: caseDetail.IsTCContract,
          startDate: caseDetail.StartDate,
          endDate: caseDetail.EndDate,
          isUnfixedEndDate: caseDetail.IsUnfixedEndDate,
          partner: caseDetail.Partner,
          fileRefID: caseDetail.FileRefID,
          files: fileList || [],
        }),
      );

      if (supremeDetail) {
        yield put(
          setReduxValues({
            _path: 'create.supremeCourt',
            courtOrg: supremeDetail.CourtOrg,
            caseYear: supremeDetail.CaseYear,
            caseClass: supremeDetail.CaseClass,
            caseNumber: supremeDetail.CaseNumber,
            caseName: supremeDetail.CaseName,
            phoneNumber: supremeDetail.PhoneNumber,
            address: supremeDetail.Address,
            courtPanel: supremeDetail.CourtPanel,
            chiefJudge: supremeDetail.ChiefJudge,
            faxNumber: supremeDetail.FaxNumber,
            opposingPartyName: supremeDetail.OpposingPartyName,
            opposingPartyStatus: supremeDetail.OpposingPartyStatus,
            courtLocation: supremeDetail.CourtLocation,
            responsibleJudge: supremeDetail.ResponsibleJudge,
            remark: supremeDetail.Remark,
            email: supremeDetail.Email,
            isElectronicLitigation: supremeDetail.IsElectronicLitigation,
          }),
        );
      } else {
        yield put(
          setReduxValues({
            _path: 'create.supremeCourt',
            courtOrg: '',
            caseYear: '',
            caseClass: '',
            caseNumber: '',
            caseName: '',
            phoneNumber: '',
            address: '',
            courtPanel: '',
            chiefJudge: '',
            faxNumber: '',
            opposingPartyName: '',
            opposingPartyStatus: '',
            courtLocation: '',
            responsibleJudge: '',
            remark: '',
            email: '',
            isElectronicLitigation: 0,
          }),
        );
      }

      yield put(
        setReduxValues({
          _path: 'create.performer',
          list: performerDetail,
        }),
      );
    }

    yield put(handleIsLoading(false));
  } catch (error) {
    getAjaxData(error);
    yield put(handleIsLoading(false));
  }
}

function* CheckInputData(action) {
  const { save, mode, caseUUID, caseType } = action.payload;

  const { caseInfo, supremeCourt, performer } = save;

  let flag = true;
  if (caseInfo.files) {
    caseInfo.files.forEach(file => {
      if (!file.division) flag = false;
    });
  }

  //  사건 기본 정보
  const alertMsg_caseInfo = getMsgStr([
    { msg: '고유 번호', cond: !caseInfo.managementNo },
    { msg: '제목', cond: !caseInfo.caseTitle },
    { msg: '설명', cond: !caseInfo.backgroundInfo },
    { msg: mlMessage('pages.common.fileType'), cond: !flag },
  ]);

  if (alertMsg_caseInfo.length > 0) {
    NotificationManager.info(
      alertMsg_caseInfo,
      `[${caseType === 'L' ? '송무' : '자문'} 기본 정보] ${mlMessage('notification.check')}`,
    );
    yield put(
      setReduxValuesCommon({
        allErrorOn: true,
      }),
    );

    return;
  }

  // 대법원 나의 사건
  let alertMsg_supremeCourt = [];

  const supremeCourtTotalNumber = [supremeCourt.caseYear, supremeCourt.caseClass, supremeCourt.caseNumber];

  // 대법원 사건 번호에서 하나라도 없으면 등록 불가
  if (supremeCourtTotalNumber.some(e => e !== '')) {
    alertMsg_supremeCourt = getMsgStr([
      { msg: '사건 번호(년도)', cond: !supremeCourt.caseYear },
      { msg: '사건 번호(구분)', cond: !supremeCourt.caseClass },
      { msg: '사건 번호(번호)', cond: !supremeCourt.caseNumber },
    ]);
  }

  if (alertMsg_supremeCourt.length > 0) {
    NotificationManager.info(alertMsg_supremeCourt, `[대법원 나의 사건] ${mlMessage('notification.check')}`);
    yield put(
      setReduxValuesCommon({
        allErrorOn: true,
      }),
    );

    return;
  }

  // 수행자
  let alertMsg_performer = [];

  if (
    performer.list.length === 0 ||
    !performer.list.some(e => e.type === 'RL') ||
    !performer.list.some(e => e.typeDesc === '책임수행')
  ) {
    alertMsg_performer = getMsgStr([{ msg: '수임자와 책임수행자는 최소 1명씩 지정해야합니다.', cond: true }]);
  }

  if (alertMsg_performer.length > 0) {
    NotificationManager.info(alertMsg_performer, `[수행자] ${mlMessage('notification.check')}`);
    yield put(
      setReduxValuesCommon({
        allErrorOn: true,
      }),
    );

    return;
  }

  if (alertMsg_caseInfo.length === 0 && alertMsg_supremeCourt.length === 0 && alertMsg_performer.length === 0) {
    yield put(
      handleCommonAlertConfirmSet({
        msgObj: {
          title: mlMessage('alertDialog.save'),
          contents: '',
          isConfirm: true,
        },
        waitDatas: {
          name: 'case',
          value: { save, mode, caseUUID },
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
      const newFiles = files.filter(file => file.flag === 0);
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
  const { MyLFID } = auth.authUser;
  const { caseType } = case_;
  const { save, mode, caseUUID } = action.payload;

  const { caseInfo, supremeCourt, performer } = save;

  try {
    const fileID = yield SaveFile({
      payload: {
        files: caseInfo.files,
        bizCode:
          caseType === 'L'
            ? { key: 'BIZCODE_B03-C00', value: '송무/기본' }
            : { key: 'BIZCODE_B04-C00', value: '자문/기본' },
        fileRefID: caseInfo.fileRefID,
      },
    });

    yield put(handleIsLoading(true));

    let caseUUID = '';

    if (mode === 'create') {
      const res = yield call(PostCall, '/lawFirm/case/createCase', {
        LawFirmID: MyLFID,
        caseInfo: {
          LawFirmID: MyLFID,
          ManagementNo: caseInfo.managementNo,
          Title: caseInfo.caseTitle,
          ContractID: caseInfo.contractID,
          CaseType: caseType,
          BackgroundInfo: caseInfo.backgroundInfo,
          CaseStatus: caseInfo.caseStatus,
          CaseCategoryL1: caseInfo.caseCategoryL1,
          CaseCategoryL2: caseInfo.caseCategoryL2,
          CourtLevel: caseType === 'L' ? caseInfo.courtLevel : null,
          RetainedDate: caseInfo.retainedDate,
          RegisterDate: caseInfo.registerDate,
          StartDate: caseInfo.startDate,
          EndDate: caseInfo.isUnfixedEndDate === 1 ? null : caseInfo.endDate,
          IsTermContract: caseInfo.isTermContract,
          IsTCContract: caseInfo.isTCContract,
          IsUnfixedEndDate: caseInfo.isUnfixedEndDate,
          Partner: caseType === 'L' ? null : caseInfo.partner,
          FileRefID: fileID || null,
        },
        supremeCourt: {
          LawFirmID: MyLFID,
          CaseYear: supremeCourt.caseYear,
          CaseClass: supremeCourt.caseClass,
          CaseNumber: supremeCourt.caseNumber,
          CaseName: supremeCourt.caseName,
          PhoneNumber: supremeCourt.phoneNumber,
          Address: supremeCourt.address,
          CourtPanel: supremeCourt.courtPanel,
          CourtOrg: supremeCourt.courtOrg,
          ChiefJudge: supremeCourt.chiefJudge,
          FaxNumber: supremeCourt.faxNumber,
          OpposingPartyName: supremeCourt.opposingPartyName,
          OpposingPartyStatus: supremeCourt.opposingPartyStatus,
          CourtLocation: supremeCourt.courtLocation,
          ResponsibleJudge: supremeCourt.responsibleJudge,
          Remark: supremeCourt.remark,
          Email: supremeCourt.email,
          IsElectronicLitigation: supremeCourt.isElectronicLitigation,
        },
        performer: {
          LawFirmID: MyLFID,
          list: performer.list,
        },
      });

      const data = getAjaxData(res);

      caseUUID = data[0].CaseUUID;
    }

    if (mode === 'mod') {
      const res = yield call(PostCall, '/lawFirm/case/updateCase', {
        caseInfo: {
          LawFirmID: MyLFID,
          Title: caseInfo.caseTitle,
          ContractID: caseInfo.contractID,
          BackgroundInfo: caseInfo.backgroundInfo,
          CaseStatus: caseInfo.caseStatus,
          CaseCategoryL1: caseInfo.caseCategoryL1,
          CaseCategoryL2: caseInfo.caseCategoryL2,
          CourtLevel: caseType === 'L' ? caseInfo.courtLevel : null,
          RetainedDate: caseInfo.retainedDate,
          RegisterDate: caseInfo.registerDate,
          StartDate: caseInfo.startDate,
          EndDate: caseInfo.isUnfixedEndDate === 1 ? null : caseInfo.endDate,
          IsTermContract: caseInfo.isTermContract,
          IsTCContract: caseInfo.isTCContract,
          IsUnfixedEndDate: caseInfo.isUnfixedEndDate,
          Partner: caseType === 'L' ? null : caseInfo.partner,
          FileRefID: fileID || null,
          CaseUUID: action.payload.caseUUID,
        },
        supremeCourt: {
          LawFirmID: MyLFID,
          CaseYear: supremeCourt.caseYear,
          CaseClass: supremeCourt.caseClass,
          CaseNumber: supremeCourt.caseNumber,
          CaseName: supremeCourt.caseName,
          PhoneNumber: supremeCourt.phoneNumber,
          Address: supremeCourt.address,
          CourtPanel: supremeCourt.courtPanel,
          CourtOrg: supremeCourt.courtOrg,
          ChiefJudge: supremeCourt.chiefJudge,
          FaxNumber: supremeCourt.faxNumber,
          OpposingPartyName: supremeCourt.opposingPartyName,
          OpposingPartyStatus: supremeCourt.opposingPartyStatus,
          CourtLocation: supremeCourt.courtLocation,
          ResponsibleJudge: supremeCourt.responsibleJudge,
          Remark: supremeCourt.remark,
          Email: supremeCourt.email,
          IsElectronicLitigation: supremeCourt.isElectronicLitigation,
        },
        performer: {
          LawFirmID: MyLFID,
          CaseUUID: caseUUID,
          list: performer.list,
        },
      });

      const data = getAjaxData(res);

      caseUUID = action.payload.caseUUID;
    }

    changeURL(`/Case?LFID=${MyLFID}&caseType=${caseType}&caseUUID=${caseUUID}`);

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

function* deleteCase(action) {
  const state = yield select(state => state);
  const { MyLFID, caseID } = action.payload;
  const { case_ } = state;
  const { caseType } = case_;

  try {
    yield put(handleIsLoading(true));

    const res = yield call(PostCall, '/lawFirm/case/deleteCase', {
      LawFirmID: MyLFID,
      CaseID: caseID,
    });

    const data = getAjaxData(res);

    changeURL(`/CaseList?caseType=${caseType}`);

    yield put(handleIsLoading(false));
  } catch (error) {
    getAjaxData(error);
    yield put(handleIsLoading(true));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(CASE_CREATE_DETAIL_BIND, DetailBind),
    takeEvery(CASE_CREATE_CHECK_INPUT_DATA, CheckInputData),
    takeEvery(CASE_CREATE_SAVE_DRAFT, saveDraft),
    takeEvery(CASE_CREATE_DELETE_FILE, deleteFile),
    takeEvery(CASE_CREATE_DELETE_CASE, deleteCase),
  ]);
}
