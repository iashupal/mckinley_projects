import * as donationTypes from "./types/donationActionTypes";

export const initiateDonation = donation => {
  return {
    type: donationTypes.SET_DONATION,
    donation
  };
};
