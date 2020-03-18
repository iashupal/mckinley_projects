// UI State Change Actions
export const TYPE_INPUT = 'TYPE_INPUT';

//Connection State
export const CONNECTION_STATE = 'CHANGE_CONNECTION_STATUS';

// Loading Toggle Actions
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

// Error
export const CLEAR_ERROR = 'CLEAR_ERROR';

// User Authentication Actions
export const INITIATE_CHECK_ON_LAUNCH = 'INITIATE_CHECK_ON_LAUNCH';
export const CHECK_ON_LAUNCH = 'CHECK_ON_LAUNCH';
export const AUTH_USER = 'AUTH_USER';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const SET_USER_INFO = 'SET_USER_INFO';
export const AUTH_USER_EMAIL = "AUTH_USER_EMAIL";
export const AUTH_FAIL = 'AUTH_FAIL';
export const INVALIDATE_TOKEN = 'INVALIDATE_TOKEN';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

// User Details Actions
// 1) OTP & Phone Number
export const REQUEST_OTP = 'REQUEST_OTP';
export const SET_OTP_SERVER_CODE = 'SET_OTP_SERVER_CODE';
export const INVALIDATE_OTP = 'INVALIDATE_OTP';
export const INITIATE_ADD_PHONE = 'INITIATE_ADD_PHONE';
export const ADD_PHONE = 'ADD_PHONE';
// 2) Details and Photo
export const ADD_DETAIL_USER = 'ADD_DETAIL_USER';
export const UPLOAD_PHOTO_USER = 'UPLOAD_PHOTO_USER';
export const GET_USER_PROFILE = 'GET_USER_PROFILE';
export const DELETE_USER = 'DELETE_USER';
// 3) Verification Document Upload
