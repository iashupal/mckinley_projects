import { reducerSelector2, prodSetReduxValues2 } from 'helpers/immer';
import {
  DOCUMENT_MNG_SET_REDUX_VALUES,
  DOCUMENT_MNG_HANDLE_CHANGE,
  DOCUMENT_MNG_CLEAR_FILE_LIST,
  DOCUMENT_MNG_CLEAR_DIALOG_DATA,
  DOCUMENT_MNG_CLEAR_ALL_DATA,
} from './ActionType';

const initial = {
  files: [],
  fetchFiles: [],
  documentSave: {
    fileDivision: { key: '', value: '' },
    fileInflux: { key: '', value: '' },
  },
  documentSearch: {
    fileDivision: [],
    fileInflux: [],
    searchText: { key: '', value: '' },
  },
  dialogListInfo: {
    contractList: [],
    consultList: [],
    litigationList: [],
    adviceList: [],
    dueDateList: [],
    isLoading: false,
    selectedItem: {
      id: '',
      title: '',
      fileRefID: '',
    },
  },
  isTotalDocMode: true,
  existingFileIDOfSelectedCase: '',
  isLoading: false,
};

const handlers = {
  [DOCUMENT_MNG_SET_REDUX_VALUES]: prodSetReduxValues2,
  [DOCUMENT_MNG_HANDLE_CHANGE]: (state, draft, payload) => {
    if (payload.flag === 'FLAG_SEARCH_SELECT_BOX_DIVISION') {
      let flag = true;
      state.documentSearch.fileDivision.forEach(obj => {
        if (payload.key === obj.key) flag = false;
      });

      if (flag) {
        draft.documentSearch.fileDivision.push({ key: payload.key, value: payload.value });
      } else {
        draft.documentSearch.fileDivision = state.documentSearch.fileDivision.filter(obj => obj.key !== payload.key);
      }
    }

    if (payload.flag === 'FLAG_SEARCH_SELECT_BOX_INFLUX') {
      let flag = true;
      state.documentSearch.fileInflux.forEach(obj => {
        if (payload.key === obj.key) flag = false;
      });

      if (flag) {
        draft.documentSearch.fileInflux.push({ key: payload.key, value: payload.value });
      } else {
        draft.documentSearch.fileInflux = state.documentSearch.fileInflux.filter(obj => obj.key !== payload.key);
      }
    }

    if (payload.flag === 'FLAG_SEARCH_INPUT_BOX') {
      draft.documentSearch.searchText = { key: payload.key, value: payload.value };
    }

    if (payload.flag === 'FLAG_SAVE_SELECT_BOX_INFLUX') {
      draft.documentSave.fileInflux.key = payload.key;
      draft.documentSave.fileInflux.value = payload.value;
      draft.dialogListInfo.selectedItem = { id: '', title: '', fileRefID: '' };
    }

    if (payload.flag === 'FLAG_SAVE_INPUT_BOX_CASE') {
      draft.documentSave.caseName = payload.value;
    }
  },
  [DOCUMENT_MNG_CLEAR_FILE_LIST]: (state, draft, payload) => {
    draft.files = [];
  },
  [DOCUMENT_MNG_CLEAR_DIALOG_DATA]: (state, draft, payload) => {
    if (state.isTotalDocMode) {
      draft.documentSave = {
        fileDivision: { key: '', value: '' },
        fileInflux: { key: '', value: '' },
      };
    } else {
      draft.documentSave.fileDivision = { key: '', value: '' };
    }
    draft.dialogListInfo.selectedItem = { id: '', title: '', fileRefID: '' };
  },
  [DOCUMENT_MNG_CLEAR_ALL_DATA]: (state, draft, payload) => {
    const { bizCode } = payload;

    draft.files = [];
    draft.fetchFiles = [];
    draft.documentSave = {
      fileDivision: { key: '', value: '' },
      fileInflux: { key: bizCode ? bizCode.key : '', value: bizCode ? bizCode.value : '' },
    };
    draft.documentSearch = {
      fileDivision: [],
      fileInflux: [],
      searchText: { key: '', value: '' },
    };
    draft.dialogListInfo = {
      contractList: [],
      consultList: [],
      litigationList: [],
      adviceList: [],
      dueDateList: [],
      isLoading: false,
      selectedItem: {
        id: '',
        title: '',
        fileRefID: '',
      },
    };
    draft.isTotalDocMode = true;
    draft.existingFileIDOfSelectedCase = '';
    draft.isLoading = false;
  },
};

export default reducerSelector2(initial, handlers);
