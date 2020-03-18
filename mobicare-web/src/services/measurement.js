import { getRequest } from "./axios.service";

import { MEASUREMENT_LIST_URL } from "../utils/api";

async function measurementList(patientId) {
  let query = "?patientId=" + patientId;

  return getRequest(MEASUREMENT_LIST_URL + query);
}

export default {
  measurementList
};
