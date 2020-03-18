import * as storeTypes from '../actions/types/storeActionTypes';

const initialState = {
  paymentData: []
};

const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case storeTypes.SAVE_PAYMENT:
      return {
        ...state,
        paymentData: action.data
      };

    default:
      return state;
  }
};

export default storeReducer;
