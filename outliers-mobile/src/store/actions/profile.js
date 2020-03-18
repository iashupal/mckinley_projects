import * as profileTypes from "./types/profileActionTypes";

export const getProfileById = params => {
    return {
        type: profileTypes.GET_PROFILE_BY_ID,
        params
    };
};

export const setProfileById = profile => {
    return {
        type: profileTypes.SET_PROFILE_BY_ID,
        profileDetailsById: profile
    };
};

export const getProfileNotification = () => {
    return {
        type: profileTypes.GET_PROFILE_NOTIFICATION
    };
};

export const setProfileNotification = notifications => {
    return {
        type: profileTypes.SET_PROFILE_NOTIFICATION,
        notifications
    };
};

export const getProfileMatchHistory = () => {
    return {
        type: profileTypes.GET_PROFILE_MATCH_HISTORY
    };
};

export const setProfileMatchHistory = matchHistory => {
    return {
        type: profileTypes.SET_PROFILE_MATCH_HISTORY,
        matchHistory
    };
};

export const sendProfileLikeCoffee = profile => {
    return {
        type: profileTypes.SEND_PROFILE_LIKE_COFFEE,
        profile
    };
};

export const setSendProfileLikeCoffeeStatus = status => {
    return {
        type: profileTypes.SET_PROFILE_LIKE_COFFEE_STATUS,
        profileLikeCoffeeStatus: status
    };
};

export const verifyAppearance = data => {
    return {
        type: profileTypes.APPEARANCE_VERIFICATION,
        data
    };
};

export const verifyAppearanceStatus = data => {
    return {
        type: profileTypes.APPEARANCE_VERIFICATION_STATUS,
        response: data
    };
};

export const addRequestStatus = request => {
    return {
        type: profileTypes.ADD_REQUEST_STATUS,
        request
    };
};

export const setRequestStatus = status => {
    return {
        type: profileTypes.SET_REQUEST_STATUS,
        profileRequestStatus: status
    };
};

export const getProfilePreference = () => {
    return {
        type: profileTypes.GET_PROFILE_PREFERENCES
    };
};

export const setProfilePreference = preferences => {
    return {
        type: profileTypes.SET_PROFILE_PREFERENCES,
        preferences
    };
};

export const updateProfilePreference = preferences => {
    return {
        type: profileTypes.UPDATE_PROFILE_PREFERENCES,
        updatePreferences: preferences
    };
};

export const setUpdateProfilePreferenceStatus = status => {
    return {
        type: profileTypes.SET_UPDATE_PROFILE_PREFERENCES_STATUS,
        profilePreferenceStatus: status
    };
};

export const updateSeenStatus = data => {
    return {
        type: profileTypes.UPDATE_SEEN_STATUS,
        data
    };
};

export const getCoffeeCoupon = () => {
    return {
        type: profileTypes.GET_COFFEE_COUPON
    };
};

export const setCoffeeCoupon = coupon => {
    //console.log("set coffee coupon called", coupon);
    return {
        type: profileTypes.SET_COFFEE_COUPON,
        coupon: coupon
    };
};

export const redeemCoupon = () => {
    //console.log("action called");
    //alert(JSON.stringify(coupons));
    return {
        type: profileTypes.REDEEM_COUPON,
        coupons
    };
};
