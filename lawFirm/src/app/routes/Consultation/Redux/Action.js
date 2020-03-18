import { createAction } from 'redux-actions';
import {
  CONSULTATION_MNG_SET_REDUX_VALUES,
  CONSULTATION_MNG_PUSH_VALUES,
  CONSULTATION_MNG_REMOVE_VALUES,
  CONSULTATION_MNG_SAVE_DRAFT,
  CONSULTATION_MNG_CHECK_INPUT,
  CONSULTATION_MNG_SAVE_MANAGER,
  CONSULTATION_MNG_SAVE_RELATEDCASE_CONTRACT,
  CONSULTATION_MNG_SAVE_CLIENT,
  CONSULTATION_MNG_LIST_FETCH,
  CONSULTATION_MNG_DETAIL_BIND,
  CONSULTATION_MNG_DELETE_FILE,
  CONSULTATION_MNG_DELETE_DATA,
  CONSULTATION_MNG_SET_CASELIST,
  CONSULTATION_MNG_SET_CONTRACTLIST,
  CONSULTATION_MNG_MAPPING_CASE_CONTRACT,
  CONSULTATION_MNG_CLEAR_SAVE_DATA,
} from './ActionType';

export const checkInputValue = createAction(CONSULTATION_MNG_CHECK_INPUT);
export const setReduxValues = createAction(CONSULTATION_MNG_SET_REDUX_VALUES);
export const handleRemoveValue = createAction(CONSULTATION_MNG_REMOVE_VALUES);
export const handlePushValue = createAction(CONSULTATION_MNG_PUSH_VALUES);
export const handleSaveDraft = createAction(CONSULTATION_MNG_SAVE_DRAFT);
export const handleSaveManager = createAction(CONSULTATION_MNG_SAVE_MANAGER);
export const handleSaveRelatedCaseContract = createAction(CONSULTATION_MNG_SAVE_RELATEDCASE_CONTRACT);
export const handleSaveClient = createAction(CONSULTATION_MNG_SAVE_CLIENT);
export const setListFetch = createAction(CONSULTATION_MNG_LIST_FETCH);
export const setDetailBind = createAction(CONSULTATION_MNG_DETAIL_BIND);
export const deleteFile = createAction(CONSULTATION_MNG_DELETE_FILE);
export const deleteData = createAction(CONSULTATION_MNG_DELETE_DATA);
export const setCaseList = createAction(CONSULTATION_MNG_SET_CASELIST);
export const setContractList = createAction(CONSULTATION_MNG_SET_CONTRACTLIST);
export const handleMappingCaseContract = createAction(CONSULTATION_MNG_MAPPING_CASE_CONTRACT);
export const handleClearSaveData = createAction(CONSULTATION_MNG_CLEAR_SAVE_DATA);
