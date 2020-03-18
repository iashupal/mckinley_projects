import { createAction } from 'redux-actions';
import {
  COMMON_MESSAGE_ADD,
  COMMON_IS_LOADING,
  COMMON_GET_ALL_CODES,
  COMMON_GET_ALL_CODES_SUCCESS,
  COMMON_PROFILE_DIALOG_OPEN,
  COMMON_ALERT_OK_CLICK,
  COMMON_ALERT_CONFIRM_SET,
  COMMON_SET_REDUX_VALUES,
  COMMON_SET_ALL_INIT_VALUES,
  COMMON_SIDE_MENU_LIST_FETCH,
} from 'constants/ActionTypes';

export const setReduxValues = createAction(COMMON_SET_REDUX_VALUES);
export const setInitAllReduxValues = createAction(COMMON_SET_ALL_INIT_VALUES);
export const handleCommonMessageAdd = createAction(COMMON_MESSAGE_ADD);
export const handleCommonAlertOK = createAction(COMMON_ALERT_OK_CLICK);
export const handleIsLoading = createAction(COMMON_IS_LOADING);
export const handleProfileDialogOpen = createAction(COMMON_PROFILE_DIALOG_OPEN);
export const handleGetAllCodes = createAction(COMMON_GET_ALL_CODES);
export const handleGetAllCodesSuccess = createAction(COMMON_GET_ALL_CODES_SUCCESS);
export const handleCommonAlertConfirmSet = createAction(COMMON_ALERT_CONFIRM_SET);
export const handleSideMenuListFetch = createAction(COMMON_SIDE_MENU_LIST_FETCH);
