import {
  COMMON_MESSAGE_ADD,
  COMMON_IS_LOADING,
  COMMON_GET_ALL_CODES_SUCCESS,
  COMMON_PROFILE_DIALOG_OPEN,
  COMMON_ALERT_CONFIRM_SET,
  COMMON_SET_REDUX_VALUES,
  COMMON_SET_ALL_INIT_VALUES,
} from 'constants/ActionTypes';
import { RU } from 'helpers/ramda';
import { reducerSelector2, prodSetReduxValues2 } from 'helpers/immer';

const { getEnv } = RU;
const isMC_MyCompanyMode = localStorage.getItem('isMC_MyCompanyMode') === 'true';

const envStr = getEnv(); // prod dev master localhost
const initial = {
  messages: [],
  isLoading: false,
  isProfileOpen: false,
  alertMsgOpen: false, // designed alert or confirm dialog.
  alertWaitDatas: {},
  alertMsg: {
    title: '',
    contents: '',
    isConfirm: false,
  },
  allCodes: {},
  allUserList: [],
  allErrorOn: false, // 모든 입력형 페이지에서, 필수값들을 최초 체크 한 이후, 각 컴포넌트에서 error (붉은색, TextField.. 등)를 표기하기 위함.
  myRoleArr: [], // ["Role.Legal.ContractAdmin", "Role.Legal.ExternalLawyer", "Role.Legal.InternalLawyer", "Role.Legal.SuperAdmin"]
  isDemoMode: envStr === 'dev' || envStr === 'localhost',
  companyPayInfo: {},
  enableSave: false,
  isMC_MyCompanyMode, // MultiCompany 유저가 자신의 회사만으로 동작하기 모드.

  sideMenuList: '',
  roleList: [],
  autoComplete: {
    caseList: [],
    litigationList: [],
    adviceList: [],
    consultationList: [],
    contractList: [],
    lawFirmEmpList: [],
    clientList: [],
  },
};

const handlers = {
  [COMMON_SET_REDUX_VALUES]: prodSetReduxValues2,
  [COMMON_SET_ALL_INIT_VALUES]: (state, draft, payload) => {
    const {
      roleList,
      allUserList,
      caseList,
      litigationList,
      adviceList,
      consultationList,
      contractList,
      lawFirmEmpList,
      clientList,
    } = payload;

    draft.roleList = roleList;
    draft.allUserList = allUserList;
    draft.autoComplete.caseList = caseList;
    draft.autoComplete.litigationList = litigationList;
    draft.autoComplete.adviceList = adviceList;
    draft.autoComplete.consultationList = consultationList;
    draft.autoComplete.contractList = contractList;
    draft.autoComplete.lawFirmEmpList = lawFirmEmpList;
    draft.autoComplete.clientList = clientList;
  },
  [COMMON_ALERT_CONFIRM_SET]: (state, draft, payload) => {
    draft.alertMsg = payload.msgObj; // { title: '저장 하시겠습니까?', contents: '', isConfirm: true }
    draft.alertMsgOpen = true;
    draft.alertWaitDatas = payload.waitDatas; // { name: 'contract', value: {isDraft: false, contractSave, detailID, isUpdateMode }
  },
  [COMMON_MESSAGE_ADD]: (state, draft, payload) => {
    draft.messages.push(payload);
  },
  [COMMON_IS_LOADING]: (state, draft, payload) => {
    draft.isLoading = payload;
  },
  [COMMON_GET_ALL_CODES_SUCCESS]: (state, draft, payload) => {
    draft.allCodes = payload;
  },
  [COMMON_PROFILE_DIALOG_OPEN]: (state, draft, payload) => {
    draft.isProfileOpen = payload;
  },
};

export default reducerSelector2(initial, handlers);
