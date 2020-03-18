import * as authTypes from '../actions/types/authActionTypes';

const initialState = {
  user: {
    token: '',
    phoneNumber: '',
    isRegistered: false,
    otpCode: '',
    email: '',
  },
  loading: false,
  error: null,
  isConnected: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.CLEAR_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
        },
        error: null,
      };
    case authTypes.START_LOADING:
      return {
        ...state,
        user: {
          ...state.user,
        },
        loading: true, //true
      };
    case authTypes.END_LOADING:
      return {
        ...state,
        user: {
          ...state.user,
        },
        loading: false,
      };
    case authTypes.AUTH_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          token: action.token,
        },
      };
    case authTypes.SET_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.data,
        },
      };
    case authTypes.AUTH_USER_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.email,
        },
      };
    case authTypes.AUTH_FAIL:
      return {
        ...state,
        user: {
          ...state.user,
          token: null,
        },
        error: action.error,
      };
    case authTypes.SET_OTP_SERVER_CODE:
      return {
        ...state,
        user: {
          ...state.user,
          otpCode: action.otpCode,
        },
      };
    case authTypes.INVALIDATE_OTP:
      return {
        ...state,
        user: {
          ...state.user,
          otpCode: '',
        },
      };
    case authTypes.ADD_PHONE:
      return {
        ...state,
        user: {
          ...state.user,
          phoneNumber: action.phoneNumber,
        },
      };
    case authTypes.CONNECTION_STATE:
      return Object.assign ({}, state, {
        isConnected: action.isConnected,
      });
    default:
      return state;
  }
};

export default authReducer;
