import { postRequest } from "./axios.service";

import {
  LOGIN_URL,
  SIGNUP_URL,
  SEND_EMAIL_FORGOT_PASSWORD_URL,
  RESET_PASSWORD_URL
} from "../utils/api";

async function signUp(data) {
  return postRequest(SIGNUP_URL, data);
}

async function login(data) {
  return postRequest(LOGIN_URL, data);
}

async function sendForgotEmail(data) {
  return postRequest(SEND_EMAIL_FORGOT_PASSWORD_URL, data);
}

async function resetPassword(data) {
  const query = `?email=${data.email}&token=${data.token}`;
  return postRequest(RESET_PASSWORD_URL + query, { password: data.password });
}

export default {
  signUp,
  login,
  sendForgotEmail,
  resetPassword
};
