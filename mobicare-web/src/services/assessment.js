import { getRequest } from "./axios.service";

import { ASSESSMENT_LIST_URL } from "../utils/api";

async function assessmentList(patientId) {
  let query = "?patientId=" + patientId;

  return getRequest(ASSESSMENT_LIST_URL + query);
}

export default {
  assessmentList
};
