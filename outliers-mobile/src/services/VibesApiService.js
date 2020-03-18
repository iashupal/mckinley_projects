import config from "@src/config";
import { create } from "apisauce";
import { uuidv4, jsonToFormData } from "../utils/utility";

// Base API Init
const api = create({
  baseURL: config.apiURL
});

// Functions list init
let func = {};

func.uploadVibe = async (token, vibe) => {
  try {
    api.setHeader("Authorization", token);
    api.setHeader("Content-Type", "application/x-www-form-urlencoded");
    let formData = new FormData();
    formData.append("hashtags", vibe.hashtags);
    formData.append("vibesimage", vibe.vibesimage);
    const response = await api.post("/vibes", formData);

    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.listVibes = async (token, params) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/vibes", params);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

func.listMyVibes = async (token, params) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/myvibes", params);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

func.listVibeDetails = async (token, params) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/vibesById", params);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

func.blockUser = async (token, params) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.post("/block", params);

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

func.hideUser = async (token, params) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.post("/hide", params);

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

func.followVibe = async (token, params) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.post("/follow", params);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

func.getUserVibeList = async (token, params) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/user-vibes", params);

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

func.getMatchedVibesList = async (token, params) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/matched-vibes", params);

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

func.getTagsSearch = async (token, params) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/tags", params);

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

func.getSearchHistory = async (token) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/recentSearch");

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

func.removeSearchHistory = async (token, key) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.delete(`/recentSearch?keyword=${key}`);

    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

func.followVibeUser = async (token, params) => {
  try {
    api.setHeader("Authorization", token);

    const payload = {
      ...params
    };

    const response = await api.put("/user-follow", payload);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

func.getFollowingList = async token => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/user-follow");
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

func.getBlockedList = async token => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/block-user");
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

func.unblockUser = async (token, params) => {
  try {
    api.setHeader("Authorization", token);

    const payload = {
      ...params
    };

    const response = await api.post("/unblock", payload);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

func.reportUser = async (token, data, image) => {
  try {
    console.log(image);

    var photo = {
      uri: image,
      type: "image/jpeg",
      name: uuidv4() + ".jpg"
    };

    var params = {
      ...data
    };

    var testJSON = {};
    var form_data = jsonToFormData(params, testJSON);
    !!image && form_data.append("report", photo);
    console.log(testJSON);

    api.setHeader("Authorization", token);
    const response = await api.post("/report", form_data);
    console.log("API respose", response);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.addReview = async (token, params) => {
  try {
    api.setHeader("Authorization", token);
    const payload = {
      ...params
    };
    const response = await api.post("/user-review", payload);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default func;
