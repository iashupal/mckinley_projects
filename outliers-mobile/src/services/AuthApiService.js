import config from "@src/config";
import { create } from "apisauce";
import { generateOtp, uuidv4, jsonToFormData } from "../utils/utility";
import { returnStatement } from "@babel/types";

// Base API init
const api = create({
  baseURL: config.apiURL
});

// Functions list init
let func = {};

// Register API Invoke
func.register = async ({ email, password, passwordConfirm }) => {
  try {
    const payload = {
      email: email,
      password: password,
      confirmPassword: passwordConfirm
    };
    console.log("register payload : " + payload);
    const response = await api.post("/register", payload);
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

// Login API Invoke
func.login = async ({ email, password }) => {
  try {
    const payload = {
      email: email,
      password: password
    };
    const response = await api.post("/login", payload);
    return response;
  } catch (e) {
    console.log(e);
  }
};

func.validateToken = async token => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.post("/validate-token");

    return response;
  } catch (e) {
    console.log(e);
  }
};

func.getUserDetails = async token => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/profile");

    return response;
  } catch (e) {
    console.log(e);
  }
};

func.getUsernameAvailabilty = async (token, keyword) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/unique-username?keyword=" + keyword);

    return response;
  } catch (e) {
    console.log(e);
  }
};

func.getSubscribedId = async phoneNumber => {
  try {
    // api.setHeader('Authorization', token);
    const response = await api.get("/find-userid?phoneNumber=" + phoneNumber);

    return response;
  } catch (e) {
    console.log(e);
  }
};

func.getPasswordFromEmail = async email => {
  try {
    // api.setHeader('Authorization', token);
    const response = await api.get("/get-password?email=" + email);

    return response;
  } catch (e) {
    console.log(e);
  }
};

func.getTagList = async token => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.get("/tags");

    return response;
  } catch (e) {
    console.log(e);
  }
};

func.putUserDetails = async (token, data) => {
  try {
    api.setHeader("Authorization", token);

    const payload = {
      ...data
    };
    const response = await api.put("/user", payload);

    return response;
  } catch (e) {
    console.log(e);
  }
};

func.deleteUser = async token => {
  try {
    api.setHeader("Authorization", token);

    const response = await api.delete("/user");
    return response;
  } catch (e) {
    console.log(e);
  }
};

func.deactivateUser = async token => {
  try {
    api.setHeader("Authorization", token);

    const response = await api.patch("/deactivate");
    return response;
  } catch (e) {
    console.log(e);
  }
};

func.updateProfileDetails = async (token, data, uri) => {
  try {
    var photo = {
      uri: uri,
      type: "image/jpeg",
      name: uuidv4() + ".jpg"
    };

    var params = {
      ...data
    };

    var testJSON = {};
    var form_data = jsonToFormData(params, testJSON);
    !!uri && form_data.append("userimage", photo);
    console.log("update profile data", testJSON, form_data, uri);

    api.setHeader("Authorization", token);
    const response = await api.put("/edit-profile", form_data);

    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.requestOTP = async (phoneNumber, otpCode, token) => {
  try {
    api.setHeader("Authorization", token);
    const payload = {
      // Must change
      otpCode,
      phoneNumber: phoneNumber // phoneNumber
    };
    const response = await api.post("/mobile-otp", payload);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.generateOTP = () => {
  const OTP = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  return OTP;
}

func.callFinishEditingAPI = async (uri, token, index) => {
  try {
    var photo = {
      uri: uri,
      type: "image/jpeg",
      name: uuidv4() + ".jpg"
    };

    var fdata = new FormData();

    fdata.append("userimage", photo);
    fdata.append("imageIndex", index);

    api.setHeader("Authorization", token);
    const response = await api.post("/upload", fdata);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};
/**
 * @uri : image uri
 * @token : Bearer Token of user via Async or props
 * @returns : "SUCCESSFULLY_VERIFIED" - Only Message
 * @param data : {data}
 */
func.veifyDocument = async (uri, token, data) => {
  try {
    var photo = {
      uri: uri,
      type: "image/jpeg",
      name: uuidv4() + ".jpg"
    };

    var fdata = new FormData();
    !!uri ? fdata.append("document", photo) : fdata.append("document", "");
    fdata.append("verifyType", data.type); //university
    fdata.append("verifyMode", data.mode); //via email
    fdata.append("verifiedEmail", data.emailId); //email
    fdata.append("wealthCriteria", data.wealthCriteria); //wealthCriteria

    api.setHeader("Authorization", token);
    const response = await api.post("/verify", fdata);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.requestEmailOTP = async (email, otpCode, token) => {
  try {
    //TODO - Unhardcode this token when implementing proper authentication
    api.setHeader("Authorization", token);
    const payload = {
      // Must change
      otp: otpCode,
      email
    };
    const response = await api.post("/otp-email", payload);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

// Update user
func.updateUser = async (token, user) => {
  try {
    api.setHeader("Authorization", token);
    const response = await api.post("/update", user);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

// Verify Referral code
func.verifyReferral = async (token, code) => {
  try {
    api.setHeader("Authorization", token);
    api.setHeader("Content-Type", "application/json");
    const response = await api.patch("/user/referral", {
      referralCode: code
    });
    //console.log("review response", response);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

// Change Password
func.changePassword = async (token, payload) => {
  try {
    api.setHeader("Authorization", token);
    api.setHeader("Content-Type", "application/json");
    const response = await api.put("/change-password", payload);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

// Update Interest Tags
func.updateInterestTags = async (token, payload) => {
  try {
    api.setHeader("Authorization", token);
    api.setHeader("Content-Type", "application/json");
    const response = await api.patch("/interested-hashtags", payload);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.getReferralCode = async token => {
  try {
    api.setHeader("Authorization", token);
    api.setHeader("Content-Type", "application/json");
    const response = await api.get("/user-referral");
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.checkWelcomeStatus = async token => {
  try {
    api.setHeader("Authorization", token);
    api.setHeader("Content-Type", "application/json");
    const response = await api.get("/welcome-alert");
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.registrationStatus = async token => {
  try {
    api.setHeader("Authorization", token);
    api.setHeader("Content-Type", "application/json");
    const response = await api.get("/registrationStatus");
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.getPublicProfile = async token => {
  try {
    api.setHeader("Authorization", token);
    api.setHeader("Content-Type", "application/json");
    const response = await api.get("/public-profile");
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.getPrivateProfile = async token => {
  try {
    api.setHeader("Authorization", token);
    api.setHeader("Content-Type", "application/json");
    const response = await api.get("/private-profile");
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};

func.deleteVibe = async (token, id) => {
  try {
    api.setHeader("Authorization", token);
    api.setHeader("Content-Type", "application/json");
    const response = await api.delete("/deletevibe?id=" + id);
    console.log("deleteVibe", response);
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};
export default func;
