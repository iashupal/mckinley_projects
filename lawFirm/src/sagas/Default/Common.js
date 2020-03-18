import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { COMMON_GET_ALL_CODES, COMMON_ALERT_OK_CLICK } from 'constants/ActionTypes';
import { PostCall, getAjaxData, checkFakeAPI } from 'helpers/ajax';
import { setReduxValues, setInitAllReduxValues } from 'actions/Default/Common';
import {
  handleSaveDraft as handleSaveDraftNotice,
  deleteData as deleteNoticeData,
} from 'app/routes/System/NoticeMng/Redux/Action';
import {
  handleSaveDraft as handleSaveDraftUserMng,
  groupSaveDraft as handleSaveDraftUserMngGroup,
} from 'app/routes/System/UserMng/Redux/Action';
import {
  handleSaveDraft as handelSaveDraftCaseMemo,
  handleSaveDraftDueDate,
  handleSaveDraftCreate,
  deleteDataDueDate,
} from 'app/routes/Case/Redux/Action';
import { handleSaveDraftCustomer, handleSaveDraftCompany } from 'app/routes/Customer/Redux/Action';
import {
  handleSaveDraft as handleSaveDraftConsultation,
  deleteData as deleteDataConsultation,
} from 'app/routes/Consultation/Redux/Action';
import { handleDelete as handleDeleteDocument } from 'app/routes/Document/Redux/Action';
import { handleLawFirmUpdate, handleCodeSaveDraft } from 'app/routes/System/LawFirmMng/Redux/Action';

function* setMenuList() {
  const res = yield call(PostCall, '/system/menu/searchSideMenuList');
  const sideMenuList = getAjaxData(res);
  yield put(setReduxValues({ sideMenuList }));
}

export function* setCodeList() {
  const state = yield select(state => state);
  const { auth } = state;
  const { authUser } = auth;
  const res = yield call(PostCall, '/system/code/searchAllCodeList', { LFID: authUser.MyLFID });
  const data = getAjaxData(res);
  const BIZCODE_SELECT = data.BIZCODE.map(codeObj => ({ key: codeObj.FullCode, text: codeObj.CodeName }));
  const FILECAT_SELECT = data.FILECAT.map(codeObj => ({ key: codeObj.FullCode, text: codeObj.CodeName }));
  const CSCTYPE_SELECT = data.CSCTYPE.map(codeObj => ({ key: codeObj.FullCode, text: codeObj.CodeName }));
  const SUCL_SELECT = data.SUCL.map(codeObj => ({ key: codeObj.FullCode, text: codeObj.CodeName }));
  const SUCLA_SELECT = data.SUCLA.map(codeObj => ({ key: codeObj.FullCode, text: codeObj.CodeName }));
  const SUCLB_SELECT = data.SUCLB.map(codeObj => ({ key: codeObj.FullCode, text: codeObj.CodeName }));
  const SUCLAA_SELECT = data.SUCLAA.map(codeObj => ({ key: codeObj.FullCode, text: codeObj.CodeName }));
  const SUCLAB_SELECT = data.SUCLAB.map(codeObj => ({ key: codeObj.FullCode, text: codeObj.CodeName }));
  const AMDTP_SELECT = data.AMDTP.map(codeObj => ({ key: codeObj.FullCode, text: codeObj.CodeName }));
  const AMTERM_SELECT = data.AMTERM.map(codeObj => ({ key: codeObj.FullCode, text: codeObj.CodeName }));
  const CURR_SELECT = data.CURR.map(codeObj => ({ key: codeObj.FullCode, text: codeObj.CodeName }));
  const SUCFTP_SELECT = data.SUCFTP.map(codeObj => ({ key: codeObj.FullCode, text: codeObj.CodeName }));
  const DUEDTP_SELECT = data.DUEDTP.map(codeObj => ({ key: codeObj.FullCode, text: codeObj.CodeName }));
  const BIZCT_SELECT = data.BIZCT.map(codeObj => ({ key: codeObj.FullCode, text: codeObj.CodeName }));
  const CASEST_SELECT = data.CASEST.map(codeObj => ({ key: codeObj.FullCode, text: codeObj.CodeName }));
  const COURTLV_SELECT = data.COURTLV.map(codeObj => ({ key: codeObj.FullCode, text: codeObj.CodeName }));
  const ADCTL1_SELECT = data.ADCTL1.map(codeObj => ({ key: codeObj.FullCode, text: codeObj.CodeName }));
  const ADCTL2_SELECT = data.ADCTL2.map(codeObj => ({
    key: codeObj.FullCode,
    text: codeObj.CodeName,
    parentFullCode: codeObj.ParentFullCode,
  }));
  const LTCTL1_SELECT = data.LTCTL1.map(codeObj => ({ key: codeObj.FullCode, text: codeObj.CodeName }));
  const LTCTL2_SELECT = data.LTCTL2.map(codeObj => ({
    key: codeObj.FullCode,
    text: codeObj.CodeName,
    parentFullCode: codeObj.ParentFullCode,
  }));

  yield put(
    setReduxValues({
      allCodes: {
        ...data,
        BIZCODE_SELECT,
        FILECAT_SELECT,
        CSCTYPE_SELECT,
        SUCL_SELECT,
        SUCLA_SELECT,
        SUCLB_SELECT,
        SUCLAA_SELECT,
        SUCLAB_SELECT,
        AMDTP_SELECT,
        AMTERM_SELECT,
        CURR_SELECT,
        SUCFTP_SELECT,
        DUEDTP_SELECT,
        BIZCT_SELECT,
        CASEST_SELECT,
        COURTLV_SELECT,
        ADCTL1_SELECT,
        ADCTL2_SELECT,
        LTCTL1_SELECT,
        LTCTL2_SELECT,
      },
    }),
  );
}

export const SetAllCodes = function*() {
  const state = yield select(state => state);
  const { auth, common } = state;
  const { authUser } = auth;

  if (checkFakeAPI()) return;

  // 사이드 메뉴 리스트
  yield setMenuList();
  yield setCodeList();

  // 권한 리스트
  const res = yield call(PostCall, '/system/role/searchCommonRoleList');
  const roleList = getAjaxData(res);

  // MyLFID 유저 리스트
  const res2 = yield call(PostCall, '/lawFirm/lawfirm/searchAllLawFirmEmployeeList', { LawFirmID: authUser.MyLFID });
  const allUserList = getAjaxData(res2);

  // 사건 리스트 (AutoComplete)
  const res3 = yield call(PostCall, '/lawFirm/common/searchCaseListForAutoComplete', { LFID: authUser.MyLFID });
  const caseList = getAjaxData(res3);
  const litigationList = caseList.filter(item => item.CaseType === 'L');
  const adviceList = caseList.filter(item => item.CaseType === 'A');

  // 계약 리스트 (AutoComplete)
  const res4 = yield call(PostCall, '/lawFirm/common/searchContractListForAutoComplete', { LFID: authUser.MyLFID });
  const contractList = getAjaxData(res4);

  // 상담 리스트 (AutoComplete)
  const res5 = yield call(PostCall, '/lawFirm/common/searchConsultListForAutoComplete', { LFID: authUser.MyLFID });
  const consultationList = getAjaxData(res5);

  // 법무법인 직원 리스트 (AutoComplete)
  const res6 = yield call(PostCall, '/lawFirm/common/searchLawFirmEmpListForAutoComplete', { LFID: authUser.MyLFID });
  const lawFirmEmpList = getAjaxData(res6);

  // 의뢰인 리스트 (AutoComplete)
  const res7 = yield call(PostCall, '/lawFirm/common/searchClientListForAutoComplete', { LFID: authUser.MyLFID });
  const data7 = getAjaxData(res7);
  const clientList = data7.map(obj => ({ value: obj.value, label: obj.label, isMain: false, cardType: obj.CardType }));

  yield put(
    setInitAllReduxValues({
      roleList,
      allUserList,
      caseList,
      litigationList,
      adviceList,
      contractList,
      consultationList,
      lawFirmEmpList,
      clientList,
    }),
  );
};

const alertOK = function*(action) {
  const { name, value } = action.payload;
  if (name === 'contract') yield put(handleSaveDraftContract(value));
  if (name === 'law') yield put(handleSaveDraftLaw(value));
  if (name === 'userMng') yield put(handleSaveDraftUserMng(value));
  if (name === 'userMngGroup') yield put(handleSaveDraftUserMngGroup(value));
  if (name === 'notice') yield put(handleSaveDraftNotice(value));
  if (name === 'noticeDelete') yield put(deleteNoticeData(value));
  if (name === 'caseMemo') yield put(handelSaveDraftCaseMemo(value));
  if (name === 'customer') yield put(handleSaveDraftCustomer(value));
  if (name === 'company') yield put(handleSaveDraftCompany(value));
  if (name === 'consultation') yield put(handleSaveDraftConsultation(value));
  if (name === 'consultationDelete') yield put(deleteDataConsultation(value));
  if (name === 'documentDelete') yield put(handleDeleteDocument(value));
  if (name === 'lawFirmInfoModify') yield put(handleLawFirmUpdate(value));
  if (name === 'dueDate') yield put(handleSaveDraftDueDate(value));
  if (name === 'dueDateDelete') yield put(deleteDataDueDate(value));
  if (name === 'lawfirmCodeMng') yield put(handleCodeSaveDraft(value));
  if (name === 'case') yield put(handleSaveDraftCreate(value));
};

export default function* rootSaga() {
  yield all([takeEvery(COMMON_GET_ALL_CODES, SetAllCodes), takeEvery(COMMON_ALERT_OK_CLICK, alertOK)]);
}
