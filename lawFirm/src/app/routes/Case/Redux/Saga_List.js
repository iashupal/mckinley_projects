import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { PostCall, getAjaxData } from 'helpers/ajax';
import { handleIsLoading } from 'actions/Default/Common';
import { R, RU } from 'helpers/ramda';
import {
  CASE_LIST_FETCH,
  CASE_LIST_SET_DETAIL_BIND,
  CASE_LIST_HANDLE_CONTRACT_ID,
  CASE_LIST_FETCH_CONTRACT_LIST,
} from './ActionType';
import { setReduxValues } from './Action';

function* DetailBind(action) {
  const { LFID, caseUUID, caseType } = action.payload;

  try {
    yield put(handleIsLoading(true));

    // 해당 사건의 수행자 및 고객 목록
    const resList = yield call(PostCall, '/lawFirm/case/searchtPerformerList', { LawFirmID: LFID, CaseUUID: caseUUID });
    const performerListdata = getAjaxData(resList);

    // 해당 사건의 수행자 목록
    yield put(setReduxValues({ _path: 'common', performerList: performerListdata[0] }));

    // 해당 사건의 담당자 가능 목록
    yield put(setReduxValues({ _path: 'common', managerList: performerListdata[1] }));

    const resDetail = yield call(PostCall, '/lawFirm/case/searchCaseDetail', {
      LawFirmID: LFID,
      CaseUUID: caseUUID,
      CaseType: caseType,
    });
    const detailData = getAjaxData(resDetail);

    const { caseDetail, partyResult, fileList } = detailData;

    // 해당 사건의 사건 상세 정보
    yield put(
      setReduxValues({
        _path: 'detail.caseInfo',
        managementNo: caseDetail.ManagementNo,
        contractID: caseDetail.ContractID,
        caseType: caseDetail.CaseType,
        title: caseDetail.Title,
        contractTitle: caseDetail.ContractTitle,
        contractUUID: caseDetail.ContractUUID,
        backgroundInfo: caseDetail.BackgroundInfo,
        caseStatus: caseDetail.CaseStatus,
        courtLevel: caseDetail.CourtLevel,
        caseCategoryL1: caseDetail.CaseCategoryL1,
        caseCategoryL2: caseDetail.CaseCategoryL2,
        retainedDate: caseDetail.RetainedDate,
        isTermContract: caseDetail.IsTermContract,
        isTCContract: caseDetail.IsTCContract,
        startDate: caseDetail.StartDate,
        isUnfixedEndDate: caseDetail.IsUnfixedEndDate,
        endDate: caseDetail.EndDate,
        partner: caseDetail.Partner,
        fileRefID: caseDetail.FileRefID,
        files: fileList || [],
      }),
    );

    // 해당 사건의 대법원 정보
    yield put(
      setReduxValues({
        _path: 'detail.supremeCourt',
        courtOrg: caseDetail.CourtOrg,
        courtLocation: caseDetail.CourtLocation,
        caseNumber: caseDetail.CaseNumber,
        caseName: caseDetail.CaseName,
        courtPanel: caseDetail.CourtPanel,
        isElectronicLitigation: caseDetail.IsElectronicLitigation,
        phoneNumber: caseDetail.PhoneNumber,
      }),
    );

    // 해당 사건의 의뢰인/상대방 정보
    yield put(
      setReduxValues({
        _path: 'detail.party',
        client: partyResult.Client,
        mobilePhoneNumber: partyResult.MobilePhoneNumber,
        email: partyResult.Email,
        opposing: partyResult.Opposing,
        third: partyResult.Third,
      }),
    );

    yield put(handleIsLoading(false));
  } catch (error) {
    getAjaxData(error);
    yield put(handleIsLoading(false));
  }
}

function* SetData(action) {
  const { LFID, caseUUID, caseType, searchValue, statusCode, searchRL, searchClient } = action.payload;

  const handleSearchRL = searchRL && searchRL.length > 0 ? searchRL.join('|') : [];

  try {
    yield put(setReduxValues({ isLoading: true }));
    const res = yield call(PostCall, '/lawFirm/case/searchCaseList', {
      LFID,
      CaseType: caseType,
      caseUUID,
      SearchValue: searchValue,
      CaseStatusCode: statusCode,
      SearchRL: handleSearchRL,
      SearchClient: searchClient,
    });

    const data = getAjaxData(res);

    const res2 = yield call(PostCall, '/lawFirm/case/searchValuesList', {
      LawFirmID: LFID,
      RelationshipType: 'RL',
      CaseType: caseType,
    });

    const data2 = getAjaxData(res2);

    if (!caseUUID) {
      yield put(setReduxValues({ _path: 'list', caseList: [...data.map(a => ({ id: a.managementNo, ...a }))] }));
      yield put(setReduxValues({ _path: 'list', RL_List: data2.RelationShipList }));
      yield put(setReduxValues({ _path: 'list', clientList: data2.ClientList }));
    } else {
      yield put(setReduxValues({ _path: 'common', selectedCase: data[0] || {} }));
    }

    yield put(setReduxValues({ isLoading: false }));
  } catch (error) {
    getAjaxData(error);
    yield put(setReduxValues({ isLoading: false }));
  }
}

function* FetchLists(action) {
  const { LFID, caseUUID, caseType, searchValue, statusCode, searchRL, searchClient } = action.payload;
  yield SetData({ payload: { LFID, caseUUID, caseType, searchValue, statusCode, searchRL, searchClient } });
}

function* setContractListFetch(action) {
  const state = yield select(state => state);
  const { auth, case_ } = state;
  const { MyLFID } = auth.authUser;
  const { caseType } = case_;
  const { searchValue } = action.payload;

  try {
    yield put(handleIsLoading(true));

    const data = yield call(PostCall, '/lawFirm/case/searchContractList', {
      LawFirmID: MyLFID,
      CaseType: caseType,
      SearchValue: searchValue,
    });
    const result = getAjaxData(data);

    yield put(setReduxValues({ _path: 'common', contractList: result }));

    yield put(handleIsLoading(false));
  } catch (error) {
    getAjaxData(error);
    yield put(handleIsLoading(false));
  }
}

function* handleContractID(action) {
  const { LawFirmID, CaseID, ContractID, CaseUUID, CaseType } = action.payload;

  try {
    yield put(handleIsLoading(true));

    const data = yield call(PostCall, '/lawFirm/case/updateContractID', { LawFirmID, CaseID, ContractID });
    const result = getAjaxData(data);

    // 상세 정보 최신화
    yield DetailBind({ payload: { LFID: LawFirmID, caseUUID: CaseUUID, caseType: CaseType } });

    yield put(handleIsLoading(false));
  } catch (error) {
    getAjaxData(error);
    yield put(handleIsLoading(false));
  }
}

export default function* rootSaga() {
  yield all([
    takeEvery(CASE_LIST_FETCH, FetchLists),
    takeEvery(CASE_LIST_SET_DETAIL_BIND, DetailBind),
    takeEvery(CASE_LIST_HANDLE_CONTRACT_ID, handleContractID),
    takeEvery(CASE_LIST_FETCH_CONTRACT_LIST, setContractListFetch),
  ]);
}
