import { getRequest } from "./axios.service";
import { IMAGE_LIST_URL } from "../utils/api";

async function imageList(patientId) {
  console.log("patientId", patientId);
  let query = "?patientId=" + patientId;

  return getRequest(IMAGE_LIST_URL + query);
}

export default {
  imageList
};
