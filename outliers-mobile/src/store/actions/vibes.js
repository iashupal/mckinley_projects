import * as vibeTypes from './types/vibeActionTypes';

export const initiateVibeUpload = (
    vibe
) => {
    return {
        type: vibeTypes.INITIATE_VIBE_UPLOAD,
        vibe
    };
};

export const initiateListVibes = params => {
    return {
        type: vibeTypes.INITIATE_VIBE_LIST,
        params
    };
};

export const setListVibes = vibes => {
    return {
        type: vibeTypes.SET_VIBE_LIST,
        listVibes: vibes,
    };
};

export const initiateListMyVibes = params => {
    return {
        type: vibeTypes.INITIATE_MY_VIBE_LIST,
        params
    };
};

export const setListMyVibes = vibes => {
    return {
        type: vibeTypes.SET_MY_VIBE_LIST,
        listMyVibes: vibes,
    };
};

export const initiateListVibeDetails = params => {
    return {
        type: vibeTypes.INITIATE_VIBE_LIST_DETAILS,
        detailParams: params
    };
};

export const setListVibeDetails = vibe => {
    return {
        type: vibeTypes.SET_VIBE_LIST_DETAILS,
        listVibeDetails: vibe,
    };
};

export const hideUser = userId => {
    return {
        type: vibeTypes.HIDE_USER,
        userId: userId
    };
};

export const blockUser = userId => {
    return {
        type: vibeTypes.BLOCK_USER,
        userId: userId
    };
};

export const followVibe = (id, callback) => {
    return {
        type: vibeTypes.FOLLOW_VIBES,
        id: id,
        callback: response => callback(response)
    };
};

export const getUserVibeList = (params) => {
    return {
        type: vibeTypes.GET_USER_VIBES_LIST,
        params
    };
};

export const setUserVibeList = (response) => {
    return {
        type: vibeTypes.SET_USER_VIBES_LIST,
        userVibeList: response
    };
};

export const getMatchedVibes = (params) => {
    return {
        type: vibeTypes.GET_MATCHED_VIBES,
        params
    };
};

export const setMatchedVibes = (response) => {
    return {
        type: vibeTypes.SET_MATCHED_VIBES,
        matchedVibesList: response
    };
};

export const getTagsSearch = (params) => {
    return {
        type: vibeTypes.GET_TAGS_SEARCH,
        params
    };
};

export const setTagsSearch = (response) => {
    return {
        type: vibeTypes.SET_TAGS_SEARCH,
        tagSearchResults: response
    };
};

export const setRecentSearch = (data) => {
    return {
        type: vibeTypes.SET_RECENT_SEARCH,
        searchHistory: data
    };
};

export const followVibeUser = (params) => {
    return {
        type: vibeTypes.FOLLOW_VIBE_USER,
        params
    };
};

export const unFollowVibeuser = (params) => {
    return {
        type: vibeTypes.UNFOLLOW_VIBE_UESR,
        params
    };
};

export const getFollowingUserList = () => {
    return {
        type: vibeTypes.GET_FOLLOWING_USER_LIST,
    };
};

export const setFollowingUserList = (data) => {
    return {
        type: vibeTypes.SET_FOLLOWING_USER_LIST,
        followingUserList: data
    };
};

export const getBlockedListUser = () => {
    return {
        type: vibeTypes.GET_BLOCKED_USER_LIST,
    };
};

export const setBlockedListUser = (data) => {
    return {
        type: vibeTypes.SET_BLOCKED_USER_LIST,
        blockedUserList: data
    };
};

export const unblockUser = (data) => {
    return {
        type: vibeTypes.UNBLOCK_USER,
        params: data
    };
};

export const reportUser = (data, image) => {
    return {
        type: vibeTypes.REPORT_UESR,
        params: data,
        image
    };
};

