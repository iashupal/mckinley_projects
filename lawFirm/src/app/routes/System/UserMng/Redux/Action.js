import { createAction } from 'redux-actions';
import {
    USERMNG_SET_REDUX_VALUES,
    USERMNG_SET_LIST_FETCH,
    USERMNG_SET_DETAIL_BIND,
    USERMNG_SET_ROLECODE,
    USERMNG_SAVE_DRAFT,
    USERMNG_CHECK_EMAIL,
    USERMNG_CHECK_INPUT_DATA,
    USERMNG_UPDATE_PHOTOURL,
    USERMNG_SET_SELECT,
    USERGROUPMNG_SAVE_DRAFT,
    USERGROUPMNG_CHECK_INPUT,
    USERGROUPMNG_LIST_FETCH,
    USERGROUPMNG_DETAIL_BIND,
    USERGROUPMNG_SET_SELECT,
} from './ActionType';

export const setReduxValues = createAction(USERMNG_SET_REDUX_VALUES);
export const setListFetch = createAction(USERMNG_SET_LIST_FETCH);
export const setDetailBind = createAction(USERMNG_SET_DETAIL_BIND);
export const setRoleCode = createAction(USERMNG_SET_ROLECODE);
export const handleSaveDraft = createAction(USERMNG_SAVE_DRAFT);
export const checkEmail = createAction(USERMNG_CHECK_EMAIL);
export const checkInputData = createAction(USERMNG_CHECK_INPUT_DATA);
export const updatePhotoURL = createAction(USERMNG_UPDATE_PHOTOURL);
export const setSelect = createAction(USERMNG_SET_SELECT);

export const groupSaveDraft = createAction(USERGROUPMNG_SAVE_DRAFT);
export const groupCheckInputData = createAction(USERGROUPMNG_CHECK_INPUT);
export const groupListFetch = createAction(USERGROUPMNG_LIST_FETCH);
export const groupDetailBind = createAction(USERGROUPMNG_DETAIL_BIND);
export const groupSetSelect = createAction(USERGROUPMNG_SET_SELECT);