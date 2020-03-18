import { reducerSelector2, prodSetReduxValues2 } from 'helpers/immer';
import { RU, R } from 'helpers/ramda';
import {
  TIMESHEET_SET_REDUX_VALUES,
  TIMESHEET_TIME_CHANGE,
  TIMESHEET_CLEAR_DATA,
  TIMESHEET_DETAIL_BIND,
  TIMESHEET_CHANGE_SEARCH_SELECT_BOX_CATEGORY,
} from './ActionType';

const { yearMonthDay } = RU;

const initial = {
  fetchTimeSheets: [],
  timeSheetDetail: {
    runningTimeHM: { H: 0, M: 0 },
    runningTime: '',
    formattedRunningTime: '',
    billableTimeHM: { H: 0, M: 0 },
    billableTime: '',
    formattedBillableTime: '',
    case: { value: '', label: '' },
    contract: { value: '', label: '' },
    consult: { value: '', label: '' },
    bizCategoryCode: 'BIZCT_B00',
    manager: { value: '', label: '' },
    contents: '',
    excutionDate: yearMonthDay(new Date()),
    isBillable: false,
    TSID: '',
    defaltTimeCharg: '',
    changedTimeCharge: '',
    remark: '',
  },
  timeSheetSearch: {
    startDate: '',
    endDate: '',
    searchText: '',
    category: [],
  },
  dialogListInfo: {
    contractList: [],
    consultList: [],
    litigationList: [],
    adviceList: [],
    isLoading: false,
    selectedItem: {
      id: '',
      title: '',
    },
  },
  isLoading: false,
};

const handlers = {
  [TIMESHEET_SET_REDUX_VALUES]: prodSetReduxValues2,
  [TIMESHEET_TIME_CHANGE]: (state, draft, payload) => {
    const { path, label, time } = payload;
    let hour = 0;
    if (label === 'H') {
      draft.timeSheetDetail[path].H = time;
      hour += Number(time) * 60;
      hour += Number(state.timeSheetDetail[path].M);
    } else if (label === 'M') {
      draft.timeSheetDetail[path].M = time;
      hour += Number(state.timeSheetDetail[path].H) * 60;
      hour += Number(time);
    }

    if (path === 'runningTimeHM') draft.timeSheetDetail.runningTime = hour;
    if (path === 'billableTimeHM') draft.timeSheetDetail.billableTime = hour;

    if (path === 'billableTimeHM' && hour === 0) {
      draft.timeSheetDetail.isBillable = false;
    } else if (path === 'billableTimeHM' && hour > 0) {
      draft.timeSheetDetail.isBillable = true;
    }
  },
  [TIMESHEET_CLEAR_DATA]: (state, draft, payload) => {
    const { managerID } = payload;
    draft.timeSheetDetail = {
      runningTimeHM: { H: 0, M: 0 },
      runningTime: '',
      formattedRunningTime: '',
      billableTimeHM: { H: 0, M: 0 },
      billableTime: '',
      formattedBillableTime: '',
      case: { value: '', label: '' },
      contract: { value: '', label: '' },
      consult: { value: '', label: '' },
      bizCategoryCode: 'BIZCT_B00',
      manager: { value: managerID || '', label: '' },
      contents: '',
      excutionDate: yearMonthDay(new Date()),
      isBillable: false,
      TSID: '',
      defaultTimeCharge: '',
      changedTimeCharge: '',
      remark: '',
    };
    draft.dialogListInfo = {
      contractList: [],
      consultList: [],
      litigationList: [],
      adviceList: [],
      isLoading: false,
      selectedItem: {
        id: '',
        title: '',
      },
    };
  },
  [TIMESHEET_DETAIL_BIND]: (state, draft, payload) => {
    const {
      RunningTime,
      FormattedRunningTime,
      BillableTime,
      FormattedBillableTime,
      BizCategoryCode,
      BizID,
      TSID,
      Contents,
      IsBillable,
      RunDate,
      UserID,
      DefaultTimeCharge,
      ChangedTimeCharge,
      Remark,
    } = payload.timeSheet;

    draft.timeSheetDetail = {
      runningTimeHM: { H: Math.floor(RunningTime / 60), M: RunningTime % 60 },
      runningTime: RunningTime,
      formattedRunningTime: FormattedRunningTime,
      billableTimeHM: { H: Math.floor(BillableTime / 60), M: BillableTime % 60 },
      billableTime: BillableTime,
      formattedBillableTime: FormattedBillableTime,
      case:
        BizCategoryCode === 'BIZCT_B03' || BizCategoryCode === 'BIZCT_B04'
          ? { value: BizID, label: '' }
          : { value: '', label: '' },
      contract: BizCategoryCode === 'BIZCT_B02' ? { value: BizID, label: '' } : { value: '', label: '' },
      consult: BizCategoryCode === 'BIZCT_B01' ? { value: BizID, label: '' } : { value: '', label: '' },
      bizCategoryCode: BizCategoryCode,
      manager: { value: UserID, label: '' },
      contents: Contents,
      excutionDate: yearMonthDay(RunDate),
      isBillable: IsBillable === 1,
      TSID,
      defaultTimeCharge: DefaultTimeCharge,
      changedTimeCharge: ChangedTimeCharge,
      remark: Remark,
    };
    draft.dialogListInfo.selectedItem.id = BizID;
  },
  [TIMESHEET_CHANGE_SEARCH_SELECT_BOX_CATEGORY]: (state, draft, payload) => {
    let flag = true;
    state.timeSheetSearch.category.forEach(obj => {
      if (payload.key === obj.key) flag = false;
    });

    if (flag) {
      draft.timeSheetSearch.category.push({ key: payload.key, value: payload.value });
    } else {
      draft.timeSheetSearch.category = state.timeSheetSearch.category.filter(obj => obj.key !== payload.key);
    }
  },
};

export default reducerSelector2(initial, handlers);
