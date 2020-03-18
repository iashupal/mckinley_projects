import { createAction } from 'redux-actions';
import {
  CASE_SET_REDUX_VALUES,
  CASE_MEMO_SAVE_DRAFT,
  CASE_MEMO_LIST_SEARCH,
  CASE_MEMO_DETAIL_BIND,
  CASE_MEMO_DELETE_DATA,
  CASE_MEMO_CHECK_INPUT_DATA,
  CASE_LIST_FETCH,
  CASE_LIST_SET_DETAIL_BIND,
  CASE_LIST_HANDLE_CONTRACT_ID,
  CASE_LIST_FETCH_CONTRACT_LIST,
  CASE_DUEDATE_LIST_FETCH,
  CASE_DUEDATE_CHECK_INPUT_DATA,
  CASE_DEUDATE_SAVE_DRAFT,
  CASE_DUEDATE_DETAIL_BIND,
  CASE_DUEDATE_SET_SELECT,
  CASE_DUEDATE_DELETE_DATA,
  CASE_DUEDATE_DELETE_FILE,
  CASE_CREATE_DETAIL_BIND,
  CASE_CREATE_CHECK_INPUT_DATA,
  CASE_CREATE_SAVE_DRAFT,
  CASE_CREATE_DELETE_FILE,
  CASE_CLEAR_CASE_INFO,
  CASE_LIST_SET_SELECT,
  CASE_CREATE_DELETE_CASE,
  CASE_TC_LIST_FETCH,
  CASE_TC_DETAIL_BIND_FETCH,
  CASE_TC_DETAIL_BIND,
  CASE_TC_MODIFY,
  CASE_TC_DELETE,
  CASE_TC_CLEAR_DATA,
  CASE_CREATE_HANDLE_PERFORMER,
  CASE_CREATE_HANDLE_PARTY,
} from './ActionType';

export const setReduxValues = createAction(CASE_SET_REDUX_VALUES);

// CaseMemo
export const handleSaveDraft = createAction(CASE_MEMO_SAVE_DRAFT);
export const setListSearch = createAction(CASE_MEMO_LIST_SEARCH);
export const setDetailBind = createAction(CASE_MEMO_DETAIL_BIND);
export const deleteData = createAction(CASE_MEMO_DELETE_DATA);
export const checkInputData = createAction(CASE_MEMO_CHECK_INPUT_DATA);

// CASE List
export const handleFetch = createAction(CASE_LIST_FETCH);
export const setDetailBindList = createAction(CASE_LIST_SET_DETAIL_BIND);
export const handleContractID = createAction(CASE_LIST_HANDLE_CONTRACT_ID);
export const setContractList = createAction(CASE_LIST_FETCH_CONTRACT_LIST);
export const setSelectList = createAction(CASE_LIST_SET_SELECT);

// CASE DueDate
export const setListFetchDueDate = createAction(CASE_DUEDATE_LIST_FETCH);
export const checkInputDataDueDate = createAction(CASE_DUEDATE_CHECK_INPUT_DATA);
export const handleSaveDraftDueDate = createAction(CASE_DEUDATE_SAVE_DRAFT);
export const setDetailBindDueDate = createAction(CASE_DUEDATE_DETAIL_BIND);
export const setSelectDueDate = createAction(CASE_DUEDATE_SET_SELECT);
export const deleteDataDueDate = createAction(CASE_DUEDATE_DELETE_DATA);
export const deleteFileDueDate = createAction(CASE_DUEDATE_DELETE_FILE);

// CASE Create
export const setDetailBindCreate = createAction(CASE_CREATE_DETAIL_BIND);
export const checkInputDataCreate = createAction(CASE_CREATE_CHECK_INPUT_DATA);
export const handleSaveDraftCreate = createAction(CASE_CREATE_SAVE_DRAFT);
export const deleteFileCreate = createAction(CASE_CREATE_DELETE_FILE);
export const deleteCaseCreate = createAction(CASE_CREATE_DELETE_CASE);
export const handlePerformer = createAction(CASE_CREATE_HANDLE_PERFORMER);
export const handleParty = createAction(CASE_CREATE_HANDLE_PARTY);

// CASE_DETAIL_CASEINFO 초기화 (DIALOG 용)
export const clearCaseInfo = createAction(CASE_CLEAR_CASE_INFO);

// CASE TC
export const handleTCListFetch = createAction(CASE_TC_LIST_FETCH);
export const handleTCDetailBindFetch = createAction(CASE_TC_DETAIL_BIND_FETCH);
export const handleTCDetailBind = createAction(CASE_TC_DETAIL_BIND);
export const handleTCModify = createAction(CASE_TC_MODIFY);
export const handleTCDelete = createAction(CASE_TC_DELETE);
export const handleTCClearData = createAction(CASE_TC_CLEAR_DATA);
