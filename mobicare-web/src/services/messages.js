import { getRequest, postRequest, putRequest } from "./axios.service";

import {
  MESSAGES_LIST_URL,
  SEND_MESSAGE_URL,
  CHAT_MESSAGES_URL
} from "../utils/api";
import { getDoctorId } from "../utils/auth";

async function messagesList(offset = 0) {
  const addQuery = "?doctorId=" + getDoctorId() + "&offset=" + offset;
  return getRequest(MESSAGES_LIST_URL + addQuery);
}

async function sendMessage(data) {
  return postRequest(SEND_MESSAGE_URL, data);
}

async function getChatMessages(patientId, offset = 0) {
  const addQuery =
    "?doctorId=" +
    getDoctorId() +
    "&patientId=" +
    patientId +
    "&offset=" +
    offset;
  return getRequest(CHAT_MESSAGES_URL + addQuery);
}

async function updateSeen(patientId) {
  return putRequest(SEND_MESSAGE_URL, { seen: true, patientId });
}

export default {
  messagesList,
  sendMessage,
  getChatMessages,
  updateSeen
};
