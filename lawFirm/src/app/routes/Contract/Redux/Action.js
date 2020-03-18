import { createAction } from 'redux-actions';
import {
  CONTRACT_SET_REDUX_VALUES,
  CONTRACT_FETCH,
  CONTRACT_SAVE,
  CONTRACT_MODIFY,
  CONTRACT_REMOVE,
  CONTRACT_DETAIL_BIND_FETCH,
  CONTRACT_DETAIL_BIND,
  CONTRACT_CLEAR_DATA,
  CONTRACT_ADD_SUCCESS_DATA_FORM,
  CONTRACT_REMOVE_SUCCESS_DATA_FORM,
  CONTRACT_CHANGE_SUCCESS_DATA,
  CONTRACT_BILLING_TYPE_FILTER,
  CONTRACT_FILE_REMOVE,
  CONTRACT_CONSULTATION_FETCH,
  CONTRACT_SAVE_CONSULTATION_RELATION,
} from './ActionType';

export const setReduxValues = createAction(CONTRACT_SET_REDUX_VALUES);
export const handleFetch = createAction(CONTRACT_FETCH);
export const handleSave = createAction(CONTRACT_SAVE);
export const handleModify = createAction(CONTRACT_MODIFY);
export const handleDelete = createAction(CONTRACT_REMOVE);
export const handleDetailBindFetch = createAction(CONTRACT_DETAIL_BIND_FETCH);
export const setDetailBind = createAction(CONTRACT_DETAIL_BIND);
export const clearData = createAction(CONTRACT_CLEAR_DATA);
export const handleAddSuccessDataForm = createAction(CONTRACT_ADD_SUCCESS_DATA_FORM);
export const handleRemoveSuccessDataForm = createAction(CONTRACT_REMOVE_SUCCESS_DATA_FORM);
export const handleChangeSuccessData = createAction(CONTRACT_CHANGE_SUCCESS_DATA);
export const handleBillingTypeFilter = createAction(CONTRACT_BILLING_TYPE_FILTER);
export const handleRemoveFile = createAction(CONTRACT_FILE_REMOVE);
export const handleConsultationFetch = createAction(CONTRACT_CONSULTATION_FETCH);
export const handleSaveConsulationRelation = createAction(CONTRACT_SAVE_CONSULTATION_RELATION);
