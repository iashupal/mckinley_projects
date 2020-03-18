import * as donationTypes from "../actions/types/donationActionTypes";

const initialState = {
  donationData: []
};

const donationReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      console.log("default case called from donation reducer");
      return state;
  }
};

export default donationReducer;
