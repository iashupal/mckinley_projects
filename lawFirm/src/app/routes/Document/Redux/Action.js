import { createAction } from 'redux-actions';
import {
  DOCUMENT_MNG_SET_REDUX_VALUES,
  DOCUMENT_MNG_FETCH,
  DOCUMENT_MNG_SAVE,
  DOCUMENT_MNG_DELETE,
  DOCUMENT_MNG_HANDLE_CHANGE,
  DOCUMENT_MNG_CLEAR_FILE_LIST,
  DOCUMENT_MNG_CLEAR_DIALOG_DATA,
  DOCUMENT_MNG_CLEAR_ALL_DATA,
  DOCUMENT_MNG_HANDLE_CONTRACT_LIST_FETCH,
  DOCUMENT_MNG_HANDLE_CONTRACT_FILE_FETCH,
  DOCUMENT_MNG_HANDLE_CONSULT_LIST_FETCH,
  DOCUMENT_MNG_HANDLE_CONSULT_FILE_FETCH,
  DOCUMENT_MNG_HANDLE_CASE_LIST_FETCH,
  DOCUMENT_MNG_HANDLE_CASE_FILE_FETCH,
  DOCUMENT_MNG_HANDLE_DUEDATE_LIST_FETCH,
  DOCUMENT_MNG_HANDLE_DUEDATE_FILE_FETCH,
} from './ActionType';

export const setReduxValues = createAction(DOCUMENT_MNG_SET_REDUX_VALUES);
export const handleFetch = createAction(DOCUMENT_MNG_FETCH);
export const handleSave = createAction(DOCUMENT_MNG_SAVE);
export const handleDelete = createAction(DOCUMENT_MNG_DELETE);
export const handleChange = createAction(DOCUMENT_MNG_HANDLE_CHANGE);
export const clearFileList = createAction(DOCUMENT_MNG_CLEAR_FILE_LIST);
export const clearDialogData = createAction(DOCUMENT_MNG_CLEAR_DIALOG_DATA);
export const clearAllData = createAction(DOCUMENT_MNG_CLEAR_ALL_DATA);
export const handleContractListFetch = createAction(DOCUMENT_MNG_HANDLE_CONTRACT_LIST_FETCH);
export const handleContractFileFetch = createAction(DOCUMENT_MNG_HANDLE_CONTRACT_FILE_FETCH);
export const handleConsultListFetch = createAction(DOCUMENT_MNG_HANDLE_CONSULT_LIST_FETCH);
export const handleConsultFileFetch = createAction(DOCUMENT_MNG_HANDLE_CONSULT_FILE_FETCH);
export const handleCaseListFetch = createAction(DOCUMENT_MNG_HANDLE_CASE_LIST_FETCH);
export const handleCaseFileFetch = createAction(DOCUMENT_MNG_HANDLE_CASE_FILE_FETCH);
export const handleDuedateListFetch = createAction(DOCUMENT_MNG_HANDLE_DUEDATE_LIST_FETCH);
export const handleDuedateFileFetch = createAction(DOCUMENT_MNG_HANDLE_DUEDATE_FILE_FETCH);
