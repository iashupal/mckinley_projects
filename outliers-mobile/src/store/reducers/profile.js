import * as profileTypes from "../actions/types/profileActionTypes";

const initialState = {
    profileDetailsById: {},
    notifications: [],
    matchHistory: {
        accepted: [],
        receivedItems: [],
        sentItems: []
    },
    response: null,
    profileLikeCoffeeStatus: {
        status: 1
    },
    profileRequestStatus: {
        status: 1
    },
    preferences: {},
    updatePreferences: {},
    profilePreferenceStatus: {
        status: 1
    },
    coffeeCoupon: {}
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case profileTypes.SET_PROFILE_BY_ID:
            return {
                ...state,
                profileDetailsById: action.profileDetailsById
            };
        case profileTypes.SET_PROFILE_NOTIFICATION:
            return {
                ...state,
                notifications: action.notifications
            };
        case profileTypes.SET_PROFILE_MATCH_HISTORY:
            return {
                ...state,
                matchHistory: action.matchHistory
            };
        case profileTypes.APPEARANCE_VERIFICATION_STATUS:
            return {
                ...state,
                response: action.response
            };
        case profileTypes.SET_PROFILE_LIKE_COFFEE_STATUS:
            return {
                ...state,
                profileLikeCoffeeStatus: action.profileLikeCoffeeStatus
            };
        case profileTypes.SET_REQUEST_STATUS:
            return {
                ...state,
                profileRequestStatus: action.profileRequestStatus
            };
        case profileTypes.SET_PROFILE_PREFERENCES:
            return {
                ...state,
                preferences: action.preferences
            };
        case profileTypes.UPDATE_PROFILE_PREFERENCES:
            return {
                ...state,
                updatePreferences: action.updatePreferences
            };
        case profileTypes.SET_UPDATE_PROFILE_PREFERENCES_STATUS:
            return {
                ...state,
                profilePreferenceStatus: action.profilePreferenceStatus
            };
        case profileTypes.SET_COFFEE_COUPON:
            return {
                ...state,
                coffeeCoupon: action.coupon
            };
        default:
            return state;
    }
};

export default profileReducer;
