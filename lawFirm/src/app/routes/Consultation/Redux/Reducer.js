import { reducerSelector2, prodSetReduxValues2 } from 'helpers/immer';
import { R } from 'helpers/ramda';
import {
  CONSULTATION_MNG_SET_REDUX_VALUES,
  CONSULTATION_MNG_PUSH_VALUES,
  CONSULTATION_MNG_REMOVE_VALUES,
  CONSULTATION_MNG_CLEAR_SAVE_DATA,
} from './ActionType';

const initial = {
  formMode: '',
  isLoading: false,
  list: [],
  caseList: [],
  contractList: [],
  clientList: [],
  managerList: [],
  save: {
    selectCase: 1,
    consultationID: '',
    checkCase: true,
    checkContract: true,
    relatedContract: { ContractUUID: '', Title: '' },
    relatedCase: { CaseUUID: '', Title: '' },
    client: [],
    counselor: '',
    managerRefID: '',
    owner: [],
    title: '',
    contents: '',
    date: '',
    time: '',
    spentMinute: '',
    files: [],
    fileRefID: null,
    fileDivision: { key: '', value: '' },
    chargeTypeCode: 'CSCTYPE_F',
    lawFirmPrice: '',
    clientPrice: '',
    targetPrice: '',
    isPublic: false,
  },
  search: {
    startDate: '',
    endDate: '',
    searchValue: '',
  },
};

const handlers = {
  [CONSULTATION_MNG_SET_REDUX_VALUES]: prodSetReduxValues2,
  [CONSULTATION_MNG_PUSH_VALUES]: (state, draft, payload) => {
    const { name, selectedOption } = payload;
    const { value } = selectedOption;
    const ids = draft.save[name].map(a => a.value);
    const isExistValue = R.includes(value, ids);
    if (!isExistValue) {
      draft.save[name].push(selectedOption);
    }
  },
  [CONSULTATION_MNG_REMOVE_VALUES]: (state, draft, payload) => {
    const { name, value } = payload;
    draft.save[name] = draft.save[name].filter(a => a.value !== value);
  },
  [CONSULTATION_MNG_CLEAR_SAVE_DATA]: (state, draft, payload) => {
    draft.save = {
      selectCase: 1,
      consultationID: '',
      checkCase: true,
      checkContract: true,
      relatedContract: { ContractUUID: '', Title: '' },
      relatedCase: { CaseUUID: '', Title: '' },
      client: [],
      counselor: '',
      managerRefID: '',
      owner: [],
      title: '',
      contents: '',
      date: '',
      time: '',
      spentMinute: '',
      files: [],
      fileRefID: null,
      fileDivision: { key: '', value: '' },
      chargeTypeCode: 'CSCTYPE_F',
      lawFirmPrice: '',
      clientPrice: '',
      targetPrice: '',
      isPublic: false,
    };
  },
};

export default reducerSelector2(initial, handlers);
