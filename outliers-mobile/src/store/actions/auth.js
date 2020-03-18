import * as authTypes from './types/authActionTypes';
import api from '../../services/AuthApiService';
export const clearError = () => {
  return {
    type: authTypes.CLEAR_ERROR,
  };
};

export const connectionState = ({ status }) => {
  return { type: authTypes.CONNECTION_STATE, isConnected: status };
};

export const startLoading = () => {
  return {
    type: authTypes.START_LOADING,
  };
};
export const endLoading = () => {
  return {
    type: authTypes.END_LOADING,
  };
};

export const initiateCheckOnLaunch = () => {
  return {
    type: authTypes.INITIATE_CHECK_ON_LAUNCH,
  };
};

export const checkOnLaunch = (token, phoneNumber, isRegistered) => {
  return {
    type: authTypes.CHECK_ON_LAUNCH,
    token: token,
    phoneNumber: phoneNumber,
    isRegistered: isRegistered,
  };
};

export const authUser = (email, password, passwordConfirm, isRegistration) => {
  return {
    type: authTypes.AUTH_USER,
    email: email,
    password: password,
    passwordConfirm: passwordConfirm,
    isRegistration: isRegistration,
  };
};

export const authSuccess = token => {
  return {
    type: authTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const saveUserInfo = data => {
  return {
    type: authTypes.SET_USER_INFO,
    data,
  };
};

export const getUserInfo = () => {
  return {
    type: authTypes.GET_USER_PROFILE
  };
};

// export const userLevelInfo = () => {
//   return{
//     type: authTypes.
//   }
// }
export const saveUserEmail = email => {
  return {
    type: authTypes.AUTH_USER_EMAIL,
    email,
  };
};

export const authFail = error => {
  return {
    type: authTypes.AUTH_FAIL,
    error: error,
  };
};

export const invalidateToken = () => {
  return {
    type: authTypes.INVALIDATE_TOKEN,
  };
};

export const requestOTP = phoneNumber => {
  return {
    type: authTypes.REQUEST_OTP,
    phoneNumber: phoneNumber,
  };
};

export const setOTPServerCode = otpCode => {
  return {
    type: authTypes.SET_OTP_SERVER_CODE,
    otpCode: otpCode,
  };
};

export const invalidateOTP = () => {
  return {
    type: authTypes.INVALIDATE_OTP,
  };
};

export const initiateAddPhone = phoneNumber => {
  return {
    type: authTypes.INITIATE_ADD_PHONE,
    phoneNumber: phoneNumber,
  };
};

export const addPhone = phoneNumber => {
  return {
    type: authTypes.ADD_PHONE,
    phoneNumber: phoneNumber,
  };
};

export const updateUserProfile = (data, uri) => {
  return {
    type: authTypes.UPDATE_USER_PROFILE,
    data: data,
    uri
  };
};

export const deleteUser = () => {
  return {
    type: authTypes.DELETE_USER,
  };
};