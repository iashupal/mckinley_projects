import { getRequest, patchRequest } from "./axios.service";

import { NOTIFICATION_LIST_URL } from "../utils/api";
import { getDoctorId } from "../utils/auth";

async function notificationList(offset = 0) {
  const addQuery = "?doctorId=" + getDoctorId() + "&offset=" + offset;
  return getRequest(NOTIFICATION_LIST_URL + addQuery);
}

async function updateNotification(notificationId) {
  return patchRequest(NOTIFICATION_LIST_URL, { id: notificationId });
}

export default {
  notificationList,
  updateNotification
};
