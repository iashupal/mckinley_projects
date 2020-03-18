import * as vibeTypes from "../actions/types/vibeActionTypes";

const initialState = {
    listVibes: {},
    listMyVibes: [],
    listVibeDetails: {},
    userVibeList: null,
    matchedVibesList: [],
    tagSearchResults: [],
    searchHistory: [],
    followingUserList: [],
    blockedUserList: []
};

const vibeReducer = (state = initialState, action) => {
    switch (action.type) {
        case vibeTypes.SET_VIBE_LIST:
            return {
                ...state,
                listVibes: {
                    ...state.listVibes,
                    ...action.listVibes
                }
            };
        case vibeTypes.SET_MY_VIBE_LIST:
            return {
                ...state,
                listMyVibes: {
                    ...state.listMyVibes,
                    ...action.listMyVibes
                }
            };
        case vibeTypes.SET_VIBE_LIST_DETAILS:
            return {
                ...state,
                listVibeDetails: {
                    ...state.listVibeDetails,
                    ...action.listVibeDetails
                }
            };
        case vibeTypes.SET_USER_VIBES_LIST:
            return {
                ...state,
                userVibeList: action.userVibeList
            };
        case vibeTypes.SET_MATCHED_VIBES:
            return {
                ...state,
                matchedVibesList: action.matchedVibesList
            };
        case vibeTypes.SET_TAGS_SEARCH:
            return {
                ...state,
                tagSearchResults: action.tagSearchResults
            };
        case vibeTypes.SET_RECENT_SEARCH:
            return {
                ...state,
                searchHistory: action.searchHistory
            };
        case vibeTypes.SET_FOLLOWING_USER_LIST:
            return {
                ...state,
                followingUserList: action.followingUserList
            };
        case vibeTypes.SET_BLOCKED_USER_LIST:
            return {
                ...state,
                blockedUserList: action.blockedUserList
            };
        default:
            return state;
    }
};

export default vibeReducer;
