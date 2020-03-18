import { createAction } from 'redux-actions';
import {
  LAWFIRM_MNG_SET_REDUX_VALUES,
  LAWFIRM_MNG_FETCH_BY_LAWFIRM_ID,
  LAWFIRM_MNG_UPDATE,
  LAWFIRM_MNG_CODE_MNG_FETCH_GROUPLIST,
  LAWFIRM_MNG_CODE_MNG_FETCH_CODELIST,
  LAWFIRM_MNG_CODE_MNG_SET_SELECT,
  LAWFIRM_MNG_CODE_MNG_SAVE_DRAFT,
  LAWFIRM_MNG_CODE_MNG_CHECK_INPUT,
  LAWFIRM_MNG_CASE_FETCH_VALUES,
  LAWFIRM_MNG_CASE_SAVE_DRAFT,
} from './ActionType';

export const setReduxValues = createAction(LAWFIRM_MNG_SET_REDUX_VALUES);
export const handleFetchByLawFirmID = createAction(LAWFIRM_MNG_FETCH_BY_LAWFIRM_ID);
export const handleLawFirmUpdate = createAction(LAWFIRM_MNG_UPDATE);
export const handleFetchGroupCodeList = createAction(LAWFIRM_MNG_CODE_MNG_FETCH_GROUPLIST);
export const handleFetchCodeList = createAction(LAWFIRM_MNG_CODE_MNG_FETCH_CODELIST);
export const setSelectLawFirmCodeMng = createAction(LAWFIRM_MNG_CODE_MNG_SET_SELECT);
export const handleCodeSaveDraft = createAction(LAWFIRM_MNG_CODE_MNG_SAVE_DRAFT);
export const checkInputValues = createAction(LAWFIRM_MNG_CODE_MNG_CHECK_INPUT);

// 사건 관리
export const caseMngFetchValues = createAction(LAWFIRM_MNG_CASE_FETCH_VALUES);
export const caseMnghandleSaveDraft = createAction(LAWFIRM_MNG_CASE_SAVE_DRAFT);
