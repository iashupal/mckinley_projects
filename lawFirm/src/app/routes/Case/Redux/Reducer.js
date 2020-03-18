import moment from 'moment';
import { RU, R } from 'helpers/ramda';
import { prod, reducerSelector2, prodSetReduxValues2 } from 'helpers/immer';
import { NotificationManager } from 'react-notifications';
import { setReduxValues as setReduxValuesCommon } from 'actions/Default/Common';
import {
  CASE_SET_REDUX_VALUES,
  CASE_DUEDATE_SET_SELECT,
  CASE_LIST_SET_SELECT,
  CASE_CLEAR_CASE_INFO,
  CASE_TC_DETAIL_BIND,
  CASE_TC_CLEAR_DATA,
  CASE_CREATE_HANDLE_PERFORMER,
  CASE_CREATE_HANDLE_PARTY,
} from './ActionType';

const initial = {
  caseType: '', // L : 송무 , A : 자문
  isLoading: false,
  formMode: '',
  // managementNoFormat: '',
  common: {
    selectedCase: {}, // 리스트에서 해당 사건을 클릭했을 때 해당 사건 상세정보
    performerList: {}, // 해당 사건의 수행자 목록
    managerList: {}, // 해당 사건의 담당자 가능 목록
    contractList: [], // 송무, 자문(caseType) 에 다른 계약서 목록
  },
  create: {
    caseInfo: {
      managementNo: '',
      caseTitle: '',
      contractID: null,
      caseType: '',
      contractTitle: null,
      backgroundInfo: '',
      caseStatus: 'CASEST_001',
      caseCategoryL1: null,
      caseCategoryL2: null,
      courtLevel: 'COURTLV_001',
      retainedDate: new Date(),
      registerDate: new Date(),
      isTermContract: 0,
      isTCContract: 0,
      startDate: new Date(),
      endDate: new Date(),
      isUnfixedEndDate: 1,
      partner: '',
      fileRefID: null,
      files: [],
    }, // 사건 기본 정보
    supremeCourt: {
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
    }, // 나의 대법원 정보
    party: {
      clientList: [],
      partyDesc: '',
    }, // 당사자
    performer: {
      type: 'AS',
      typeDesc: '보조',
      list: [],
      searchList: null,
    }, // 수행자
  },
  detail: {
    caseInfo: {
      managementNo: '',
      contractID: '',
      title: '',
      contractTitle: '',
      contractUUID: '',
      backgroundInfo: '',
      caseStatus: '',
      courtLevel: '',
      caseCategoryL1: '',
      caseCategoryL2: '',
      retainedDate: '',
      isTermContract: false,
      isTCContract: false,
      startDate: '',
      isUnfixedEndDate: false,
      endDate: '',
      partner: '',
      fileRefID: '',
      files: [],
    }, // 사건 상세 정보
    supremeCourt: {
      courtOrg: '',
      courtLocation: '',
      caseNumber: '',
      caseName: '',
      courtPanel: '',
      isElectronicLitigation: null,
      phoneNumber: '',
    }, // 대법원 정보
    party: {
      client: '',
      mobilePhoneNumber: '',
      email: '',
      opposing: '',
      third: '',
    }, // 의뢰인, 상대방 정보
  },
  memo: {
    memoList: [
      {
        id: 1,
        date: '2019-07-11',
        content: '메모 내용',
        priority: 'progress',
        admin: '김아무개',
      },
      {
        id: 2,
        date: '2019-07-11',
        content: '메모 내용',
        priority: 'finish',
        admin: '김아무개',
      },
      {
        id: 3,
        date: '2019-07-11',
        content: '메모 내용',
        priority: 'finish',
        admin: '김아무개',
      },
      {
        id: 4,
        date: '2019-07-11',
        content: '메모 내용',
        priority: 'open',
        admin: '김아무개',
      },
      {
        id: 5,
        date: '2019-07-11',
        content: '메모 내용',
        priority: 'progress',
        admin: '김아무개',
      },
      {
        id: 6,
        date: '2019-07-11',
        content: '메모 내용',
        priority: 'open',
        admin: '김아무개',
      },
    ],
    myMemo: '',
    memoDetail: {
      id: '',
      content: '송무 메모',
      status: 'open',
      owner: '김변호사',
      files: '',
      updateDate: '',
      createDate: '',
    },
  },
  list: {
    caseList: [],
    RL_List: [],
    clientList: [],
    search: {
      searchClient: [],
      searchRL: [],
      statusCode: [],
      searchValue: '',
    },
  },
  excelUpload: {
    caseList: [],
  },
  SMS: {
    isDialogOpen: false,
    formMode: '',
  },
  dueDate: {
    list: {
      list: [],
      search: {
        searchValue: '',
        searchTypeCode: [],
      },
    },
    save: {
      dueDateSeq: null,
      dueDate: new Date(),
      dueDateTime: '',
      dueDateName: '',
      dueDateRemark: '',
      dueDateTypeCode: 'DUEDTP_01',
      pendingOrg: '',
      managerRefID: null,
      dueDateAttendee: [],
      manager: {},
      dueDateSharer: [],
      isLimitedShare: 0,
      files: [],
      fileRefID: null,
      createDate: '',
      updateDate: '',
    },
  },
  TC: {
    TCList: [],
    TCDetail: {
      LFID: '',
      TSID: '',
      name: '',
      empType: '',
      timeCharge: '',
      runningTime: '',
      formattedRunningTime: '',
      billingAmount: '',
      remark: '',
      runDate: '',
      updateDate: '',
      createDate: '',
    },
    TCSearch: {
      startDate: '',
      endDate: '',
    },
    isLoading: false,
  },
};

const handlers = {
  [CASE_SET_REDUX_VALUES]: prodSetReduxValues2,
  [CASE_DUEDATE_SET_SELECT]: (state, draft, payload) => {
    const { list, o } = payload;
    const { key, text, selected } = o;

    if (selected) {
      draft.dueDate.list.search[list].push(key);
    } else {
      const removeIndex = draft.dueDate.list.search[list].findIndex(a => a === key);
      if (removeIndex !== -1) draft.dueDate.list.search[list].splice(removeIndex, 1);
    }
  },
  [CASE_CLEAR_CASE_INFO]: (state, draft, payload) => {
    draft.detail.caseInfo = {
      managementNo: '',
      contractID: '',
      contractTitle: '',
      contractUUID: '',
      backgroundInfo: '',
      caseStatus: '',
      courtLevel: '',
      caseCategory: '',
      retainedDate: '',
      isTermContract: false,
      isTCContract: false,
      startDate: '',
      isUnfixedEndDate: false,
      endDate: '',
      fileRefID: '',
      files: [],
    };
  },
  [CASE_LIST_SET_SELECT]: (state, draft, payload) => {
    const { list, o } = payload;
    const { key, text, selected } = o;

    if (selected) {
      draft.list.search[list].push(key);
    } else {
      const removeIndex = draft.list.search[list].findIndex(a => a === key);
      if (removeIndex !== -1) draft.list.search[list].splice(removeIndex, 1);
    }
  },
  [CASE_TC_DETAIL_BIND]: (state, draft, payload) => {
    const { TC } = payload;
    const {
      LawFirmID,
      TSID,
      ManagerName,
      EmpType,
      TimeCharge,
      BillableTime,
      BillingAmount,
      FormattedBillableTime,
      Remark,
      RunDate,
      CreateDate,
      UpdateDate,
    } = TC;

    draft.TC.TCDetail = {
      LFID: LawFirmID,
      TSID,
      name: ManagerName,
      empType: EmpType,
      timeCharge: TimeCharge,
      runningTime: BillableTime,
      formattedRunningTime: FormattedBillableTime,
      billingAmount: BillingAmount,
      remark: Remark,
      runDate: RunDate,
      updateDate: UpdateDate,
      createDate: CreateDate,
    };
  },
  [CASE_TC_CLEAR_DATA]: (state, draft, payload) => {
    draft.TC.TCDetail = {
      LFID: '',
      TSID: '',
      name: '',
      empType: '',
      timeCharge: '',
      runningTime: '',
      formattedRunningTime: '',
      billingAmount: '',
      remark: '',
      runDate: '',
      updateDate: '',
      createDate: '',
    };
  },
  [CASE_CREATE_HANDLE_PERFORMER]: (state, draft, payload) => {
    const { type, typeDesc, selected, mode } = payload;

    // isExist 가 -1이면 보조,수임,수행 중에 맡은 타입이 없음 -> 타임 선정 가능, -1이 아니면 다른 타입 수행중이므로 선정 불가능
    const isExist = R.findIndex(R.propEq('id', selected.value))(draft.create.performer.list);

    if (mode === 'delete') {
      draft.create.performer.list.splice(isExist, 1);
    } else if (isExist === -1) {
      // 책임수행일 경우
      if (type === 'mainRS') {
        draft.create.performer.list.push({
          id: selected.value,
          name: selected.label,
          type: 'RS',
          typeDesc: '책임수행',
          IsMain: 1,
        });
      } else {
        draft.create.performer.list.push({ id: selected.value, name: selected.label, type, typeDesc, IsMain: 0 });
      }
    } else {
      NotificationManager.info(
        [`${selected.label} 님은 [${draft.create.performer.list[isExist].typeDesc}]으로 이미 등록되어 있습니다`],
        `[수행자]`,
      );

      setReduxValuesCommon({
        allErrorOn: true,
      });
    }
  },
  [CASE_CREATE_HANDLE_PARTY]: (state, draft, payload) => {
    const { selected } = payload;

    if (draft.create.party.clientList.length === 0) {
      draft.create.party.partyDesc = selected.label;
    }

    const isExist = R.findIndex(R.propEq('value', selected.value))(draft.create.party.clientList);

    if (isExist === -1) {
      draft.create.party.clientList.push({ value: selected.value, label: selected.label });
    }

    if (Array.isArray(selected.value)) {
      draft.create.party.clientList = selected.value;
    }
  },
};

export default reducerSelector2(initial, handlers);
