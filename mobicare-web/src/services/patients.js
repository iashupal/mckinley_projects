import { getRequest } from "./axios.service";

import { PATIENT_LIST_URL, PATIENT_DETAIL_URL } from "../utils/api";
import { getDoctorId } from "../utils/auth";

async function patientList(offset = 0) {
  const addQuery =
    "?doctorId=" + getDoctorId() + "&offset=" + offset + "&patient=";
  return getRequest(PATIENT_LIST_URL + addQuery);
}

async function getPatientDetail(patientId) {
  const addQuery = "/" + patientId;
  return getRequest(PATIENT_DETAIL_URL + addQuery);
}

async function searchPatient(searchQuery, offset = 0) {
  let addQuery = "";
  if (searchQuery === "") {
    addQuery = "?doctorId=" + getDoctorId() + "&offset=" + offset + "&patient=";
  } else {
    addQuery =
      "?doctorId=" +
      getDoctorId() +
      "&patient=" +
      searchQuery +
      "&offset=" +
      offset;
  }

  return getRequest(PATIENT_LIST_URL + addQuery);
}

export default {
  patientList,
  getPatientDetail,
  searchPatient
};
