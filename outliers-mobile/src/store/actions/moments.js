import * as momentTypes from './types/momentActionTypes';

export const initiateMomentUpload = (
	moment
) => {
	return {
		type: momentTypes.INITIATE_MOMENT_UPLOAD,
		moment
	};
};

export const initiateListMoments = location => {
	return {
		type: momentTypes.INITIATE_MOMENT_LIST,
		location
	};
};

export const setListMoments = moments => {
	return {
		type: momentTypes.SET_MOMENT_LIST,
		listMoments: moments,
	};
};

export const initiateListMyMoments = location => {
	return {
		type: momentTypes.INITIATE_MY_MOMENT_LIST,
		location
	};
};

export const setListMyMoments = moments => {
	return {
		type: momentTypes.SET_MY_MOMENT_LIST,
		listMyMoments: moments,
	};
};

export const initiateListMomentDetails = params => {
	return {
		type: momentTypes.INITIATE_MOMENT_LIST_DETAILS,
		detailParams: params
	};
};

export const setListMomentDetails = moment => {
	return {
		type: momentTypes.SET_MOMENT_LIST_DETAILS,
		listMomentDetails: moment,
	};
};

export const followMoment = (id, callback) => {
	return {
			type: vibeTypes.FOLLOW_VIBES,
			id: id,
			callback: response => callback(response)
	};
};