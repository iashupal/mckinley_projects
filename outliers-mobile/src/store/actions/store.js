import * as storeTypes from './types/storeActionTypes';

export const getPaymentInfo = () => {
  return {
    type: storeTypes.GET_PAYMENT
  };
};

export const setPaymentInfo = data => {
  return {
    type: storeTypes.SET_PAYMENT,
    data
  };
};

export const updatePaymentInfo = data => {
  return {
    type: storeTypes.UPDATE_PAYMENT,
    data
  };
};

export const savePaymentInfo = data => {
  return {
    type: storeTypes.SAVE_PAYMENT,
    data
  };
};

