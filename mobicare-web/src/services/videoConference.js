import { getRequest } from "./axios.service";

import { VIDEO_CONF_URL } from "../utils/api";
import { getDoctorId } from "../utils/auth";
async function getVideoUrl(dataObject) {
    let add = '';
    let query = '?';
    for (let key in dataObject) {
      query += `${add}${key}=${dataObject[key]}`;
      add = '&'
    }
    query += `&userId=${getDoctorId()}`
  return getRequest(VIDEO_CONF_URL + query);
}

export default {
  getVideoUrl
};
