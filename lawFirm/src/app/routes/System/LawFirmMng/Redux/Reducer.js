import { reducerSelector2, prodSetReduxValues2 } from 'helpers/immer';
import { LAWFIRM_MNG_SET_REDUX_VALUES, LAWFIRM_MNG_CODE_MNG_SET_SELECT } from './ActionType';

const initial = {
  LawFirmDetail: {
    lawFirmID: '',
    lawFirmBrand: '',
    lawFirmLogoURL: '',
    address: '',
    address2: '',
    zipCode: '',
    phoneNumber: '',
    fax: '',
    email: '',
    webSiteURL: '',
  },
  CodeMng: {
    isLoading: false,
    formMode: '',
    groupCodeList: [],
    groupCode: '',
    isCustomizedGroupCode: 0,
    codeList: [],
    search: {
      searchIsActive: [],
    },
    detail: {
      code: '',
      codeNameKOR: '',
      codeNameENG: '',
      parentFullCode: '',
      remark: '',
      sortOrder: 0,
      isActive: 1,
    },
  },
  CaseMng: {
    managementNoFormat: '',
  },
};

const handlers = {
  [LAWFIRM_MNG_SET_REDUX_VALUES]: prodSetReduxValues2,
  [LAWFIRM_MNG_CODE_MNG_SET_SELECT]: (state, draft, payload) => {
    const { list, o } = payload;
    const { key, text, selected } = o;

    if (selected) {
      draft.CodeMng.search[list].push(key);
    } else {
      const removeIndex = draft.CodeMng.search[list].findIndex(a => a === key);
      if (removeIndex !== -1) draft.CodeMng.search[list].splice(removeIndex, 1);
    }
  },
};

export default reducerSelector2(initial, handlers);
