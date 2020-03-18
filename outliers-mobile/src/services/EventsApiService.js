import config from "@src/config";
import { create } from "apisauce";
import { uuidv4, jsonToFormData } from "../utils/utility";

// Base API Init
const api = create({
    baseURL: config.apiURL
});

// Functions list init
let func = {};

func.listEvents = async (token, params) => {
    try {
        api.setHeader("Authorization", token);
        const response = await api.get("/vibes", params);
        return response;
    } catch (error) {
        console.error(error);
        return error;
    }
};

func.uploadEvent = async (token, event) => {
    console.log("recived payload at api", event);
    // try {
    // 	api.setHeader('Authorization', token);
    // 	api.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    // 	let formData = new FormData();
    // 	formData.append('hashtags', vibe.hashtags);
    // 	formData.append('vibesimage', vibe.vibesimage);
    // 	const response = await api.post('/vibes', formData);
    // 	return response;
    // } catch (e) {
    // 	console.log(e);
    // 	return e;
    // }
};

export default func;
