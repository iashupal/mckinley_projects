import { createAction } from 'redux-actions';
import {
  CUSTOMER_MNG_SET_REDUX_VALUES,
  CUSTOMER_MNG_SET_LIST_FETCH_CUSTOMER,
  CUSTOMER_MNG_SET_LIST_FETCH_COMPANY,
  CUSTOMER_MNG_SET_LIST_FETCH_COMPANY_MEMBER,
  CUSTOMER_MNG_SET_LIST_FETCH_INDIVIDUAL,
  CUSTOMER_MNG_SET_LIST_FETCH_COMMON_COMPANY,
  CUSTOMER_MNG_CHECK_INPUT_DATA_CUSTOMER,
  CUSTOMER_MNG_CHECK_INPUT_DATA_COMPANY,
  CUSTOMER_MNG_SAVE_DRAFT_CUSTOMER,
  CUSTOMER_MNG_SAVE_DRAFT_COMPANY,
  CUSTOMER_MNG_SET_DETAIL_BIND_CUSTOMER,
  CUSTOMER_MNG_SET_DETAIL_BIND_COMPANY,
  CUSTOMER_MNG_HANDLE_DATA_COMPANY_MEMBER,
  CUSTOMER_MNG_HANDLE_DATA_INDIVIDUAL,
  CUSTOMER_UPLOAD_SAVE_DRAFT,
  COMPANY_UPLOAD_SAVE_DRAFT,
} from './ActionType';

export const setReduxValues = createAction(CUSTOMER_MNG_SET_REDUX_VALUES);
export const setListFetchCustomer = createAction(CUSTOMER_MNG_SET_LIST_FETCH_CUSTOMER);
export const setListFetchCompany = createAction(CUSTOMER_MNG_SET_LIST_FETCH_COMPANY);
export const setListFetchCompanyMember = createAction(CUSTOMER_MNG_SET_LIST_FETCH_COMPANY_MEMBER);
export const setListFetchIndividual = createAction(CUSTOMER_MNG_SET_LIST_FETCH_INDIVIDUAL);
export const setListFetchCommonCompany = createAction(CUSTOMER_MNG_SET_LIST_FETCH_COMMON_COMPANY);
export const setDetailBindCustomer = createAction(CUSTOMER_MNG_SET_DETAIL_BIND_CUSTOMER);
export const setDetailBindCompany = createAction(CUSTOMER_MNG_SET_DETAIL_BIND_COMPANY);
export const checkInputDataCustomer = createAction(CUSTOMER_MNG_CHECK_INPUT_DATA_CUSTOMER);
export const checkInpuatDataCompany = createAction(CUSTOMER_MNG_CHECK_INPUT_DATA_COMPANY);
export const handleSaveDraftCustomer = createAction(CUSTOMER_MNG_SAVE_DRAFT_CUSTOMER);
export const handleSaveDraftCompany = createAction(CUSTOMER_MNG_SAVE_DRAFT_COMPANY);
export const handleDataCompanyMember = createAction(CUSTOMER_MNG_HANDLE_DATA_COMPANY_MEMBER);
export const handleDataIndividual = createAction(CUSTOMER_MNG_HANDLE_DATA_INDIVIDUAL);

// 일괄 업로드
export const handleSaveDraftCustomerUpload = createAction(CUSTOMER_UPLOAD_SAVE_DRAFT);
export const handleSaveDraftCompanyUpload = createAction(COMPANY_UPLOAD_SAVE_DRAFT);
