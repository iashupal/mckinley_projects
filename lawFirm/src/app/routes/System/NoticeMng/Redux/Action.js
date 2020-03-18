import { createAction } from 'redux-actions';
import {
  NOTICEMNG_SET_REDUX_VALUES,
  NOTICEMNG_LIST_FETCH,
  NOTICEMNG_SAVE_DRAFT,
  NOTICEMNG_CHECK_INPUT_DATA,
  NOTICEMNG_DETAIL_BIND,
  NOTICEMNG_DELETE_DATA,
  NOTICEMNG_SET_SELECT,
} from './ActionType';

export const setReduxValues = createAction(NOTICEMNG_SET_REDUX_VALUES);
export const handleSaveDraft = createAction(NOTICEMNG_SAVE_DRAFT);
export const setListFetch = createAction(NOTICEMNG_LIST_FETCH);
export const checkInputData = createAction(NOTICEMNG_CHECK_INPUT_DATA);
export const setDetailBind = createAction(NOTICEMNG_DETAIL_BIND);
export const deleteData = createAction(NOTICEMNG_DELETE_DATA);
export const setSelect = createAction(NOTICEMNG_SET_SELECT);
