import { prod, reducerSelector2, prodSetReduxValues2 } from 'helpers/immer';
import { R, RU } from 'helpers/ramda';
import {
  USERMNG_SET_REDUX_VALUES,
  USERMNG_SET_ROLECODE,
  USERMNG_SET_SELECT,
  USERGROUPMNG_SET_SELECT,
} from './ActionType';

const initial = {
  loading: false,
  search: {
    workingStatus: [],
    roleCode: [],
    employeeType: [],
    keyword: '',
  },
  emailCheck: false,
  list: [],
  save: {
    UserID: '',
    Email: '',
    Profile: '',
    Password: '',
    PhotoURL: '',
    FirstName: '',
    LastName: '',
    OfficeMobilePhoneNumber: '',
    TimeCharge: '',
    CreateDate: '',
    OfficePhoneNumber: '',
    Address: '',
    Address2: '',
    ZipCode: '',
    WorkingStatusCode: 'WORKST_WORK',
    EmployeeTypeCode: 'EMPTYPE_ETC',
    TCShareLevelCode: 'TCSRLVL_ALLSR',
    RoleCodeList: [],
    GroupCodeList: [],
  },
  nowMode: 'list',
  group: {
    formMode: '',
    isOpenDetail: false,
    groupList: [],
    save: {
      groupID: '',
      groupName: '',
      isActive: '',
      groupMember: [],
    },
    search: {
      searchIsActive: [],
      searchValue: '',
    },
  },
};

const handlers = {
  [USERMNG_SET_REDUX_VALUES]: prodSetReduxValues2,
  [USERMNG_SET_ROLECODE]: (state, draft, payload) => {
    if (payload.checked) {
      draft.save.RoleCodeList.push(payload.value);
    } else {
      const index = state.save.RoleCodeList.findIndex(a => a === payload.value);
      draft.save.RoleCodeList.splice(index, 1);
    }
  },
  [USERMNG_SET_SELECT]: (state, draft, payload) => {
    const { list, name, o } = payload;
    const { key, text, selected } = o;

    if (selected) {
      draft[name][list].push(key);
    } else {
      const removeIndex = draft[name][list].findIndex(a => a === key);
      if (removeIndex !== -1) draft[name][list].splice(removeIndex, 1);
    }
  },
  [USERGROUPMNG_SET_SELECT]: (state, draft, payload) => {
    const { list, o } = payload;
    const { key, text, selected } = o;

    if (selected) {
      draft.group.search[list].push(key);
    } else {
      const removeIndex = draft.group.search[list].findIndex(a => a === key);
      if (removeIndex !== -1) draft.group.search[list].splice(removeIndex, 1);
    }
  },
};

export default reducerSelector2(initial, handlers);
