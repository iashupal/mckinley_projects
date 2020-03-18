import config from "@src/config";
import { create } from "apisauce";

// Base API Init
const api = create({
  baseURL: config.apiURL
});

// Functions list init
let func = {};

func.listMomentVibeComments = async (token, params) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/comment", params);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

func.addMomentVibeComment = async (token, comment) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.post("/comment", comment);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.addMomentVibeCommentReply = async (token, reply) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.post("/reply", reply);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.deleteMomentVibeCommentReply = async (token, id) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.delete("/reply?id=" + id);
    console.log("API del", response);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.deleteMomentVibeComment = async (token, id) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.delete("/comment?id=" + id);
    console.log("API del", response);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.addMomentVibeFollow = async (token, momentvibe) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.post("/follow", momentvibe);
    return response;
  } catch (e) {
    console.error(e);
    return e;
  }
};

func.addMomentVibeUnFollow = async (token, momentvibe) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.put("/unfollow", momentvibe);
    return response;
  } catch (e) {
    console.error(e);
    return e;
  }
};

func.deleteReply = async (token, replyId) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.delete("/reply?id=" + replyId);
    return response;
  } catch (e) {
    console.error(e);
    return e;
  }
};
// To see a hidden comment
func.viewComment = async (token, data) => {
  try {
    console.log("view comment called");
    api.setHeader("Authorization", token);
    const response = await api.post("/comment-payment", data);
    console.log("API resposne of comment view", response);
    return response;
  } catch (e) {
    console.error(e);
    return e;
  }
};
export default func;
