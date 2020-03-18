import config from '@src/config';
import { create } from 'apisauce';

// Base API Init
const api = create({
	baseURL: config.apiURL
});

// Functions list init
let func = {};

func.uploadMoment = async (token, moment) => {
	try {
		api.setHeader('Authorization', token);
		const response = await api.post('/moments', moment);
		return response;
	} catch (e) {
		console.log(e);
		return e;
	}
};

func.listMoments = async (token, location) => {
	try {
		api.setHeader('Authorization', token);
		const response = await api.get('/moments', location);
		return response;
	} catch (error) {
		console.error(error);
		return error;
	}
};

func.list1MileMoments = async (token, location) => {
	try {
		api.setHeader('Authorization', token);
		const response = await api.get('/moments-one-mile', location);
		return response;
	} catch (error) {
		console.error(error);
		return error;
	}
};

func.list3MileMoments = async (token, location) => {
	try {
		api.setHeader('Authorization', token);
		const response = await api.get('/moments-three-mile', location);
		return response;
	} catch (error) {
		console.error(error);
		return error;
	}
};

func.list5MileMoments = async (token, location) => {
	try {
		api.setHeader('Authorization', token);
		const response = await api.get('/moments-five-mile', location);
		return response;
	} catch (error) {
		console.error(error);
		return error;
	}
};

func.listMyMoments = async (token, location) => {
	try {
		api.setHeader('Authorization', token);
		const response = await api.get('/mymoments', location);
		return response;
	} catch (error) {
		console.error(error);
		return error;
	}
};

func.listMomentDetails = async (token, params) => {
	try {
		api.setHeader('Authorization', token);
		const response = await api.get('/momentById', params);
		return response;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export default func;
