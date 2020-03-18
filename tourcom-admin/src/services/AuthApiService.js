import { config } from "../config/config";
import { create } from "axios";

// Base API init
const api = create({
  baseURL: config.API_URL + ""
});

// Functions list init
let func = {};

// Register API Invoke
func.register = async ({res, email, password, username, mobile, dob, affiliation }) => {
  try {
    const payload = {
      email: email,
      password: password,
      username: username,
      mobile: mobile,
      dob: dob,
      affiliation: affiliation
    };
    const response = await api.post('user', payload);
    
 
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
    return e.response;
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

export default func;
