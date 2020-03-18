import config from "@src/config";
import { create } from "apisauce";
import { uuidv4 } from "../utils/utility";

// Base API Init
const api = create({
  baseURL: config.apiURL
});

// Functions list init
let func = {};

func.sendProfileLikeCoffee = async (token, profile) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.post("/sendLikeCoffeeRequest", profile);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.getProfileNotification = async token => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/notifications");
    console.log("notifications - ", response);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

/**
 * @param token : Require user authentication token.
 * @param data : Require notification id to update seen status *** {"id": "5da000607741ec136c4a23d8"}
 * @description : Used to update seen status
 */
func.updateSeenStatus = async (token, data) => {
  try {
    api.setHeader("Authorization", token);

    const payload = {
      ...data
    };

    const response = await api.put("/notifications", payload);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.getProfileById = async (token, params) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/user-profile", params);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.getProfileMatchHistory = async token => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/match-history");
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.getProfileViewRequest = async token => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/profile-request");
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.verifyAppearance = async (token, data) => {
  try {
    var photo = {
      uri: data.uri,
      type: "image/jpeg",
      name: uuidv4() + ".jpg"
    };
    var fdata = new FormData();
    !!data.uri && fdata.append("image", photo);
    fdata.append("verifyType", data.type); //picture  // passport
    api.setHeader("Authorization", token);
    const response = await api.post("/appearance-verification", fdata);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.addRequestStatus = async (token, request) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.patch("/request", request);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.getProfilePreference = async (token, params) => {
  console.log("payload==>>>>>", params);
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/preference", params);
    return response;
    console.log("response=>>>>>>", response);
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.updateProfilePreference = async (token, request) => {
  console.log("payload========>>>>>", request);
  try {
    api.setHeader("Authorization", token);
    const response = await api.post("/preference", request);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.getCoffeeCoupon = async token => {
  console.log("dfghj");
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/user/coffee/coupons");

    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.redeemCoupon = async (token, request) => {
  console.log("payload at api", request);
  try {
    api.setHeader("Authorization", token);
    const response = await api.patch("/user/coffee/use", {
      couponIds: request
    });
    console.log("Api response", response);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

export default func;
