import { createAction } from 'redux-actions';

import {
  TIMESHEET_SET_REDUX_VALUES,
  TIMESHEET_TIME_CHANGE,
  TIMESHEET_FETCH,
  TIMESHEET_SAVE,
  TIMESHEET_MODIFY,
  TIMESHEET_REMOVE,
  TIMESHEET_CLEAR_DATA,
  TIMESHEET_DETAIL_BIND_FETCH,
  TIMESHEET_DETAIL_BIND,
  TIMESHEET_CHANGE_SEARCH_SELECT_BOX_CATEGORY,
  TIMESHEET_SEARCH_TIME_CHARGE,
  TIMESHEET_HANDLE_CONTRACT_LIST_FETCH,
  TIMESHEET_HANDLE_CONSULT_LIST_FETCH,
  TIMESHEET_HANDLE_CASE_LIST_FETCH,
} from './ActionType';

export const setReduxValues = createAction(TIMESHEET_SET_REDUX_VALUES);
export const handleTimeChange = createAction(TIMESHEET_TIME_CHANGE);
export const handleTimeSheetFetch = createAction(TIMESHEET_FETCH);
export const handleTimeSheetSave = createAction(TIMESHEET_SAVE);
export const handleTimeSheetModify = createAction(TIMESHEET_MODIFY);
export const handleTimeSheetDelete = createAction(TIMESHEET_REMOVE);
export const clearData = createAction(TIMESHEET_CLEAR_DATA);
export const fetchDetailBind = createAction(TIMESHEET_DETAIL_BIND_FETCH);
export const setDetailBind = createAction(TIMESHEET_DETAIL_BIND);
export const handleChangeCategory = createAction(TIMESHEET_CHANGE_SEARCH_SELECT_BOX_CATEGORY);
export const handleSearchTimeCharge = createAction(TIMESHEET_SEARCH_TIME_CHARGE);
export const handleContractListFetch = createAction(TIMESHEET_HANDLE_CONTRACT_LIST_FETCH);
export const handleConsultListFetch = createAction(TIMESHEET_HANDLE_CONSULT_LIST_FETCH);
export const handleCaseListFetch = createAction(TIMESHEET_HANDLE_CASE_LIST_FETCH);
